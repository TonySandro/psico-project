import { useState, useCallback, useEffect, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import type { UseMutationResult } from '@tanstack/react-query';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';
type SaveSource = 'auto' | 'manual' | null;

interface UseAutosaveOptions {
    patientId: string;
    accountId: string;
    updateMutation: UseMutationResult<unknown, Error, { patientId: string; accountId: string; data: Record<string, unknown> }, unknown>;
    debounceMs?: number;
}

interface UseAutosaveReturn {
    save: (content: Record<string, unknown>) => void;
    saveNow: (content: Record<string, unknown>, isManual?: boolean) => void;
    status: SaveStatus;
    lastSaved: Date | null;
    error: Error | null;
    saveSource: SaveSource;
}

export const useAutosave = ({
    patientId,
    accountId,
    updateMutation,
    debounceMs = 2000
}: UseAutosaveOptions): UseAutosaveReturn => {
    const [status, setStatus] = useState<SaveStatus>('idle');
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [saveSource, setSaveSource] = useState<SaveSource>(null);
    const pendingContentRef = useRef<Record<string, unknown> | null>(null);

    // Manual save (not debounced)
    const saveNow = useCallback((content: Record<string, unknown>, isManual: boolean = false) => {
        if (!patientId || !accountId) return;

        setStatus('saving');
        setError(null);
        setSaveSource(isManual ? 'manual' : 'auto');

        updateMutation.mutate(
            { patientId, accountId, data: { content } },
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
    }, [patientId, accountId, updateMutation]);

    const debouncedSave = useDebouncedCallback((content: Record<string, unknown>) => {
        saveNow(content, false);
    }, debounceMs);

    const save = useCallback((content: Record<string, unknown>) => {
        if (!patientId || !accountId) return;

        pendingContentRef.current = content;
        setStatus('saving');
        debouncedSave(content);
    }, [patientId, accountId, debouncedSave]);

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
        error,
        saveSource
    };
};
