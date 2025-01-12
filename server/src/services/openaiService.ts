import type { ChatCompletionMessageParam } from 'openai/resources/chat';
import { openai } from '../config/openai';

export function refineQuery(baseQuery: string, genotype: string, traitName: string, interpretation: string, rsid: string): string {
    return `Here's the latest research and recommendations regarding ${baseQuery} for individuals with ${interpretation} , specifically for people with genotype ${genotype} (SNP ${rsid} - ${traitName}):`;
}

export async function summarizeExaResults(refinedQuery: string, exaResults: any[]): Promise<{ summary: string, topResult: { title: string, url: string } }> {
    // console.log('Exa Results:', JSON.stringify(exaResults, null, 2));
    const topResult = exaResults
        .map(result => ({
            ...result,
            // calculate weighted score of links and the highlights. 
            weightedScore: (result.score * 0.6) + 
                ((result.highlightScores?.reduce((a: number, b: number) => a + b, 0) / (result.highlightScores?.length || 1)) * 0.4)
        }))
        .sort((a, b) => b.weightedScore - a.weightedScore) 
        .slice(0, 1)
        .map(result => ({
            title: result.title,
            highlights: result.highlights || [],
            url: result.url,
            score: result.score,
            highlightScores: result.highlightScores,
            weightedScore: result.weightedScore,
            abstract: result.abstract
        }))[0];


     // summarize highlights from exa results
    const messages: ChatCompletionMessageParam[] = [
        {
            role: 'system',
            content: `You are a research summarizer focusing on genetic studies. Your task is to create a clear, 
                     accessible summary based primarily on the provided research highlights. The summary should:
                     1. Focus on explaining the key findings from the highlights in simple terms
                     2. Be as relevant as possible to the query: "${refinedQuery}"
                     3. Provide actionable advice for the user
                     
                     Important: Base your summary primarily on the content found in the 'highlights' section.`,
        },
        {
            role: 'user',
            content: `Search result: ${JSON.stringify({
                title: topResult.title,
                highlights: topResult.highlights || [],
                url: topResult.url
            }, null, 2)}`,
        },
    ];

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages,
            max_tokens: 800,
            temperature: 0.7,
        });

        const summary = response.choices[0].message.content?.trim() ?? '';
        
        return {
            summary,
            topResult: {
                title: topResult.title,
                url: topResult.url
            }
        };
    } catch (err) {
        console.error('OpenAI summarization error:', err);
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        return {
            summary: `Summary error: ${errorMessage}`,
            topResult: {
                title: topResult.title,
                url: topResult.url
            }
        };
    }
}