import React, { useMemo } from 'react';
import katex from 'katex';

interface MathFormulaProps {
  latex: string;
  inline?: boolean;
  className?: string;
}

export const MathFormula: React.FC<MathFormulaProps> = ({
  latex,
  inline = false,
  className = '',
}) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(latex, {
        displayMode: !inline,
        throwOnError: false,
      });
    } catch (error) {
      console.error('KaTeX rendering error:', error);
      return `<span class="text-rose-400 font-mono text-sm">${latex}</span>`;
    }
  }, [latex, inline]);

  if (inline) {
    return (
      <span
        className={`inline-math px-1 py-0.5 rounded bg-slate-800/60 text-indigo-200 font-medium ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <div
      className={`my-3 p-3 overflow-x-auto rounded-lg bg-slate-950/80 border border-slate-800 text-indigo-100 shadow-inner flex justify-center items-center ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};