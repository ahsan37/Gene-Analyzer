export interface GenotypeInterpretation {
  [genotype: string]: string;
}

export interface SNP {
  rsid: string;
  traitName: string;
  genotypeInterpretation: Record<string, string>;
  queryTemplate: string;
  priority: 'high' | 'medium' | 'low';
  evidenceScore: number;
  actionabilityScore: number;
}

// Add a new interface for enriched SNPs
export interface EnrichedSNP extends SNP {
  userGenotype: string;
  interpretation: string;
}

