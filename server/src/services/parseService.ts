import { Readable } from 'stream';
import readline from 'readline';
import fs from 'fs';

interface GenotypeMap {
  [rsid: string]: string;
}

export async function parse23andMe(fileBuffer: Buffer): Promise<GenotypeMap> {
  return new Promise((resolve, reject) => {
    const userGenotypes: GenotypeMap = {};
    const stream = Readable.from(fileBuffer.toString());
    const rl = readline.createInterface({ input: stream });

    rl.on('line', (line: string) => {
      if (line.startsWith('#') || !line.trim()) return;
      const [rsid, chromosome, position, genotype] = line.split(/\s+/);
      userGenotypes[rsid] = genotype;
    });

    rl.on('close', () => {
      resolve(userGenotypes);
    });

    rl.on('error', (err) => reject(err));
  });
}

if (require.main === module) {
  const filePath = './test-data/genome_Marika_Forsythe.txt';
  const fileBuffer = fs.readFileSync(filePath);
  parse23andMe(fileBuffer)
    .then((result) => {
      console.log('Parsed Genotypes:', result);
    })
    .catch((err) => {
      console.error('Error parsing file:', err.message);
    });
}

module.exports = {
    parse23andMe
}