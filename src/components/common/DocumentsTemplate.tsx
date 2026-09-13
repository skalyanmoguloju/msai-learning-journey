import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  Eye,
  Download,
  ExternalLink,
  Maximize2,
  Minimize2,
  X
} from 'lucide-react';

export interface CourseDocumentItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  fileUrl: string;
  fileName?: string;
  fileSize?: string;
  pageCount?: number;
  category?: string;
  topics?: string[];
  badge?: string;
  date?: string;
}

export interface DocumentsTemplateProps {
  title?: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  documents: CourseDocumentItem[];
  onBackToStudy?: () => void;
  className?: string;
}

export const resolveAssetUrl = (path: string): string => {
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('blob:') ||
    path.startsWith('data:')
  ) {
    return path;
  }
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

export const DocumentsTemplate: React.FC<DocumentsTemplateProps> = ({
  documents,
  className = '',
}) => {
  const [activeViewerDoc, setActiveViewerDoc] = useState<CourseDocumentItem | null>(null);
  const [isBrowserFullscreen, setIsBrowserFullscreen] = useState(false);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  // Escape key handler to close PDF viewer popup
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeViewerDoc) {
        setActiveViewerDoc(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeViewerDoc]);

  // Listen to fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsBrowserFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!modalContainerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await modalContainerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.warn('Fullscreen request failed:', err);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Vertical Documents List */}
      {documents.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-xl bg-slate-800/80 flex items-center justify-center text-slate-400">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-200">No documents available</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Study documents and lecture slides will appear here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {documents.map((doc) => {
            const resolvedUrl = resolveAssetUrl(doc.fileUrl);
            return (
              <div
                key={doc.id}
                className="group relative rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 p-4 sm:p-5 transition-all duration-300 space-y-3"
              >
                {/* Row 1: Title + Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <FileText className="w-4 h-4" />
                    </div>
                    <h3
                      onClick={() => setActiveViewerDoc(doc)}
                      className="text-sm sm:text-base font-bold text-slate-100 group-hover:text-indigo-300 transition-colors cursor-pointer truncate"
                      title={doc.title}
                    >
                      {doc.title}
                    </h3>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => setActiveViewerDoc(doc)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all active:scale-[0.98] whitespace-nowrap"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Document</span>
                    </button>

                    <a
                      href={resolvedUrl}
                      download={doc.fileName || `${doc.title}.pdf`}
                      className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition-all text-xs flex items-center justify-center shrink-0"
                      title="Download PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={resolvedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition-all text-xs flex items-center justify-center shrink-0"
                      title="Open in New Tab"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Row 2: Detail Badges & Topics */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/60 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                    PDF
                  </span>
                  {doc.category && (
                    <span className="text-[10px] font-medium text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      {doc.category}
                    </span>
                  )}
                  {doc.pageCount && (
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700/40">
                      {doc.pageCount} Pages
                    </span>
                  )}
                  {doc.fileSize && (
                    <span className="text-[11px] font-mono text-slate-500 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700/40">
                      {doc.fileSize}
                    </span>
                  )}

                  {/* Topic Chips */}
                  {doc.topics && doc.topics.length > 0 && (
                    <>
                      <span className="text-slate-600 hidden sm:inline">•</span>
                      <div className="flex flex-wrap gap-1.5 items-center">
                        {doc.topics.map((topic, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Fullscreen PDF Viewer Popup Modal */}
      {activeViewerDoc && (
        <div
          ref={modalContainerRef}
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col animate-in fade-in duration-200"
        >
          {/* Top Bar Controls */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-slate-900 border-b border-slate-800 shrink-0 shadow-lg">
            {/* Title & Info */}
            <div className="flex items-center gap-3 min-w-0 pr-4">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xs sm:text-sm font-bold text-white truncate">
                  {activeViewerDoc.title}
                </h2>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                  {activeViewerDoc.pageCount && (
                    <span>{activeViewerDoc.pageCount} Pages</span>
                  )}
                  {activeViewerDoc.fileSize && (
                    <>
                      <span>•</span>
                      <span>{activeViewerDoc.fileSize}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Actions: Download, External Tab, Fullscreen, Close */}
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={resolveAssetUrl(activeViewerDoc.fileUrl)}
                download={activeViewerDoc.fileName || `${activeViewerDoc.title}.pdf`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
                title="Download PDF file"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download</span>
              </a>

              <a
                href={resolveAssetUrl(activeViewerDoc.fileUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
                title="Open in a new browser tab"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">New Tab</span>
              </a>

              <button
                onClick={toggleFullscreen}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                title={isBrowserFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              >
                {isBrowserFullscreen ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={() => setActiveViewerDoc(null)}
                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition ml-1"
                title="Close Viewer (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Viewer Body: Embedded PDF iframe */}
          <div className="flex-1 w-full h-full relative bg-slate-950">
            <iframe
              src={`${resolveAssetUrl(activeViewerDoc.fileUrl)}#toolbar=1&navpanes=1`}
              title={activeViewerDoc.title}
              className="w-full h-full border-0 bg-slate-900"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsTemplate;
