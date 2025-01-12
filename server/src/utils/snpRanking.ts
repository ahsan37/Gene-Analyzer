import { SNP } from '../types/snps';

export function rankAndFilterSNPs(snps: SNP[], maxResults: number = 10): SNP[] {
    // First try high and medium priority SNPs
    const filteredSNPs = snps
        .filter(snp => 
            // Make sure we have the required properties
            snp.priority && 
            snp.evidenceScore !== undefined && 
            snp.actionabilityScore !== undefined &&
            (
                snp.priority === 'high' || 
                (snp.priority === 'medium' && (snp.evidenceScore + snp.actionabilityScore > 3))
            )
        )
        .map(snp => ({
            ...snp,
            totalScore: snp.evidenceScore + snp.actionabilityScore,
            weightedScore: (snp.evidenceScore + snp.actionabilityScore) * 
                ({ high: 1.5, medium: 1.2, low: 1.0 }[snp.priority] || 1.0)
        }))
        .sort((a, b) => b.weightedScore - a.weightedScore)
        .slice(0, maxResults);

    // If we don't have enough high/medium priority SNPs, add low priority ones
    if (filteredSNPs.length < maxResults) {
        const lowPrioritySNPs = snps
            .filter(snp => 
                snp.priority === 'low' && 
                snp.evidenceScore !== undefined && 
                snp.actionabilityScore !== undefined
            )
            .map(snp => ({
                ...snp,
                totalScore: snp.evidenceScore + snp.actionabilityScore,
                weightedScore: snp.evidenceScore + snp.actionabilityScore
            }))
            .sort((a, b) => b.weightedScore - a.weightedScore);
        
        return [...filteredSNPs, ...lowPrioritySNPs].slice(0, maxResults);
    }

    return filteredSNPs;
}

