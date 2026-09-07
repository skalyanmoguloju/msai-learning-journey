import React, { useMemo } from 'react';
import katex from 'katex';

export const MathText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const html = useMemo(() => {
    if (!text) return '';
    let res = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, latex) => {
      try {
        return katex.renderToString(latex.trim(), { displayMode: true, throwOnError: false });
      } catch {
        return latex;
      }
    });
    res = res.replace(/\$([^\$\n]+?)\$/g, (_, latex) => {
      try {
        return katex.renderToString(latex.trim(), { displayMode: false, throwOnError: false });
      } catch {
        return latex;
      }
    });
    res = res.replace(/\\\\/g, '<br/>');
    return res;
  }, [text]);

  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
};
