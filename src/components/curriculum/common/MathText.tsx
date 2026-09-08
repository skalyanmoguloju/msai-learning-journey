import React, { useMemo } from 'react';
import katex from 'katex';

export interface MathTextProps {
  text: string;
  className?: string;
  displayMode?: boolean;
}

export const MathText: React.FC<MathTextProps> = ({
  text,
  className = '',
  displayMode = false
}) => {
  const html = useMemo(() => {
    if (!text) return '';

    // If explicit displayMode is requested (or text is wrapped in $$)
    if (displayMode) {
      const cleanLatex = text
        .replace(/^\$\$([\s\S]*)\$\$$/, '$1')
        .replace(/^\$([\s\S]*)\$$/, '$1')
        .trim();
      try {
        return katex.renderToString(cleanLatex, { displayMode: true, throwOnError: false });
      } catch {
        return text;
      }
    }

    // Check if text has $ delimiters
    if (text.includes('$')) {
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
    }

    // If no $ delimiters, but string contains LaTeX commands (e.g. \mathcal, \sum, \theta, \frac) or math notation
    if (
      text.includes('\\') ||
      (/^([a-zA-Z0-9_^{}()[\]\s=+\-*/|<>]+)$/.test(text) && /[=_{}^]/.test(text))
    ) {
      try {
        return katex.renderToString(text.trim(), { displayMode: false, throwOnError: false });
      } catch {
        return text;
      }
    }

    return text;
  }, [text, displayMode]);

  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
};

