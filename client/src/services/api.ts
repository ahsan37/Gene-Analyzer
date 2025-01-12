import { UploadResponse } from '../types/results';

export const uploadGenomeFile = async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('genomeFile', file);

    const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Upload failed');
    }

    return response.json();
};