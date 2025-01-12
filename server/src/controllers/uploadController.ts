import { Request, Response } from 'express';
import * as parseService from '../services/parseService';
import { searchExa } from '../services/exaService';
import curatedSNPS from '../data/SNPS.json';
import { SNP, EnrichedSNP } from '../types/snps';
import { rankAndFilterSNPs } from '../utils/snpRanking';
import { refineQuery, summarizeExaResults } from '../services/openaiService';

interface UploadResult {
  rsid: string;
  traitName: string;
  userGenotype: string;
  interpretation: string;
  paper: {
    title: string;
    url: string;
  };
  summary: string;
}

export async function handleUpload(req: Request, res: Response): Promise<Response> {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const userGenotypes = await parseService.parse23andMe(req.file.buffer);
    console.log('Parsed genotypes:', Object.keys(userGenotypes).length, 'genotypes found.');

    const enrichedSNPs: EnrichedSNP[] = [];
    
    // filter SNPs and find user matching genotypes
    for (const snp of curatedSNPS as unknown as SNP[]) {
      const userGenotype = userGenotypes[snp.rsid];
      if (userGenotype && snp.genotypeInterpretation[userGenotype]) {
        const interpretation = snp.genotypeInterpretation[userGenotype];
        if (interpretation) {
          enrichedSNPs.push({
            ...snp,
            userGenotype,
            interpretation
          });
        }
      }
    }


    const topSNPs = rankAndFilterSNPs(enrichedSNPs, 10) as EnrichedSNP[];
    console.log('\n=== Selected Top 10 SNPs ===');
    topSNPs.forEach((snp, index) => {
      console.log(`\n${index + 1}. ${snp.rsid} - ${snp.traitName}`);
      console.log(`   Genotype: ${snp.userGenotype}`);
      console.log(`   Interpretation: ${snp.interpretation}`);
      console.log(`   Priority: ${snp.priority}`);
    });

    const results: UploadResult[] = [];

    // for each SNP, pass through query template and get results from Exa/Openai 
    for (const snp of topSNPs) {
      try {
        const refinedQuery = await refineQuery(
          snp.queryTemplate,
          snp.userGenotype,
          snp.traitName,
          snp.interpretation,
          snp.rsid
        );
        console.log('Refined Query:', refinedQuery);
        const exaResults = await searchExa(refinedQuery);
        const { summary, topResult } = await summarizeExaResults(refinedQuery, exaResults);
        
        console.log('Top Paper:', topResult.title);
        console.log('OpenAI Summary:', summary);

        results.push({
          rsid: snp.rsid,
          traitName: snp.traitName,
          userGenotype: snp.userGenotype,
          interpretation: snp.interpretation,
          paper: {
            title: topResult.title,
            url: topResult.url
          },
          summary,
        });

      } catch (error) {
        console.error(`Error processing SNP ${snp.rsid}:`, error);
      }
    }
    console.log('Final Results:', results);
    return res.json(results);
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ error: 'Server error processing file.' });
  }
}
  