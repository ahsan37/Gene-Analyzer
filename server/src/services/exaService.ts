import Exa from 'exa-js'

if (!process.env.EXASEARCH_API_KEY) {
    console.error('Missing EXASEARCH_API_KEY environment variable');
}

const exa = new Exa(process.env.EXASEARCH_API_KEY || '')

const searchOptions = {
    useAutoprompt: true,
    type: "auto",
    category: "research paper",
    numResults: 10,
    startPublishedDate: "2021-01-01",
    contents: {
        highlights: {
            numSentences: 3,
            highlightsPerUrl: 3,
            query: "Key findings and conclusions"
        }
    },
};

export async function searchExa(query: string) {
    try{
        const result = await exa.searchAndContents(query, searchOptions);
        return result.results || []
    } catch (error) {
        console.error('Error searching Exa:', error);
        return [];
    }
}