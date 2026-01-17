import { useEffect, useState } from 'react';
import type { Editor } from '@tiptap/react';

export const useWordCount = (editor: Editor | null) => {
    const [wordCount, setWordCount] = useState(0);

    useEffect(() => {
        if (!editor) return;

        const updateWordCount = () => {
            const text = editor.state.doc.textContent;
            const words = text
                .trim()
                .split(/\s+/)
                .filter(word => word.length > 0);
            setWordCount(words.length);
        };

        editor.on('update', updateWordCount);
        updateWordCount();

        return () => {
            editor.off('update', updateWordCount);
        };
    }, [editor]);

    return wordCount;
};
