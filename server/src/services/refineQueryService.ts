export async function buildFinalQuery(
  baseQuery: string, 
  genotype: string, 
  traitName: string
): Promise<string> {
  // Implement your query building logic here
  return `${baseQuery} for ${traitName} with genotype ${genotype}`;
}
