import { UploadResponse } from '../types/results';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const uploadGenomeFile = async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('genomeFile', file);

    const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Upload failed');
    }

    return response.json();
};