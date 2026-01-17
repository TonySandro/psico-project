import { useState, useCallback, useEffect, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import type { UseMutationResult } from '@tanstack/react-query';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface UseAutosaveOptions {
    reportId: string;
    updateMutation: UseMutationResult<unknown, Error, { id: string; data: Record<string, unknown> }, unknown>;
    debounceMs?: number;
}

interface UseAutosaveReturn {
    save: (content: Record<string, unknown>) => void;
    saveNow: (content: Record<string, unknown>) => void;
    status: SaveStatus;
    lastSaved: Date | null;
    error: Error | null;
}

export const useAutosave = ({
    reportId,
    updateMutation,
    debounceMs = 2000
}: UseAutosaveOptions): UseAutosaveReturn => {
    const [status, setStatus] = useState<SaveStatus>('idle');
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const pendingContentRef = useRef<Record<string, unknown> | null>(null);

    // Manual save (not debounced)
    const saveNow = useCallback((content: Record<string, unknown>) => {
        if (!reportId) return;

        setStatus('saving');
        setError(null);

        updateMutation.mutate(
            { id: reportId, data: { content } },
            {
                onSuccess: () => {
                    setStatus('saved');
                    setLastSaved(new Date());
                    setError(null);
                    pendingContentRef.current = null;
                },
                onError: (err) => {
                    setStatus('error');
                    setError(err as Error);
                }
            }
        );
    }, [reportId, updateMutation]);

    const debouncedSave = useDebouncedCallback((content: Record<string, unknown>) => {
        saveNow(content);
    }, debounceMs);

    const save = useCallback((content: Record<string, unknown>) => {
        if (!reportId) return;

        pendingContentRef.current = content;
        setStatus('saving');
        debouncedSave(content);
    }, [reportId, debouncedSave]);

    useEffect(() => {
        return () => {
            if (pendingContentRef.current) {
                debouncedSave.flush();
            }
        };
    }, [debouncedSave]);

    return {
        save,
        saveNow,
        status,
        lastSaved,
        error
    };
};
