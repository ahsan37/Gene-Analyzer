export interface ExaResult {
    title: string;
    url: string;
    highlights?: string[];
}

export interface AnalysisResult {
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

export type UploadResponse = AnalysisResult[];
