import { useState } from 'react';
import { uploadGenomeFile } from '../services/api';

export const useUpload = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploadComplete, setUploadComplete] = useState(false);

    const handleUpload = async (file: File) => {
        try {
            setIsLoading(true);
            setError(null);
            await uploadGenomeFile(file);
            setUploadComplete(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Upload failed');
        } finally {
            setIsLoading(false);
        }
    };

    return { handleUpload, isLoading, error, uploadComplete };
};