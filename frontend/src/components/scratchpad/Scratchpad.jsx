import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Code2 } from 'lucide-react';

const Scratchpad = ({ fullScale = false }) => {
    const [code, setCode] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const savedCode = localStorage.getItem('scratchpad_code');
        if (savedCode) setCode(savedCode);
        setIsLoaded(true);
    }, []);

    const handleEditorChange = (value) => {
        setCode(value);
        localStorage.setItem('scratchpad_code', value);
    };

    if (!isLoaded) return null;

    return (
        <div className={`flex flex-col w-full h-full ${!fullScale ? 'rounded-[2rem] bg-[var(--surface-container-lowest)] p-6 shadow-[var(--shadow-focus)] max-h-[450px]' : ''}`}>
            {/* Header */}
            {fullScale && (
                <div className="flex items-start justify-between gap-4 mb-10">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center rounded-full bg-[rgba(0,106,60,0.12)] text-[var(--primary)] h-14 w-14">
                            <Code2 size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <p className="text-[0.85rem] uppercase tracking-[0.35em] text-[var(--on-surface-variant)]">Editor</p>
                            <h2 className="mt-2 text-4xl font-semibold tracking-tight text-[var(--on-surface)]">Scratchpad</h2>
                        </div>
                    </div>
                </div>
            )}

            {/* Editor Area */}
            <div className={`flex-1 min-h-0 w-full overflow-hidden ${fullScale ? 'bg-transparent' : 'rounded-2xl border border-[var(--surface-container-low)] bg-[#ffffff]'}`}>
                <Editor
                    height="100%"
                    language="javascript"
                    theme="light"
                    value={code}
                    onChange={handleEditorChange}
                    options={{
                        minimap: { enabled: false },
                        overviewRulerBorder: false,
                        hideCursorInOverviewRuler: true,
                        fontSize: fullScale ? 15 : 13,
                        lineHeight: fullScale ? 24 : 22,
                        wordWrap: 'on',
                        padding: { top: 16, bottom: 16 },
                        scrollBeyondLastLine: false,
                        smoothScrolling: true,
                        cursorBlinking: "smooth",
                        fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
                        renderLineHighlight: "none",
                        roundedSelection: true,
                        scrollbar: {
                            verticalScrollbarSize: 8,
                            horizontalScrollbarSize: 8,
                        }
                    }}
                    loading={<div className="h-full w-full flex items-center justify-center text-[var(--on-surface-variant)] bg-transparent">Loading editor...</div>}
                />
            </div>
        </div>
    );
};

export default Scratchpad;
