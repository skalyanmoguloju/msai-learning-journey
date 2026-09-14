import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  FileText,
  Download,
  ExternalLink,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Layers,
  Sparkles,
  AlertCircle,
  Loader2,
  Monitor
} from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

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

// Set up PDF.js worker
try {
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  pdfjsLib.GlobalWorkerOptions.workerSrc = `${cleanBase}pdf.worker.min.js`;
} catch (e) {
  console.warn('PDF.js worker initialization error:', e);
}

// ============================================================================
// PDF Canvas Viewer Component (Mobile & Pixel Fold Optimized)
// ============================================================================
interface PdfCanvasViewerProps {
  fileUrl: string;
  title: string;
  pageCountHint?: number;
}

const PdfCanvasViewer: React.FC<PdfCanvasViewerProps> = ({ fileUrl, title }) => {
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [viewMode, setViewMode] = useState<'single' | 'continuous'>('single');
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<any>(null);

  // Load PDF Document
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setErrorMsg(null);
    setCurrentPage(1);

    const resolved = resolveAssetUrl(fileUrl);
    const loadingTask = pdfjsLib.getDocument(resolved);

    loadingTask.promise
      .then((doc: any) => {
        if (!isMounted) return;
        setPdfDoc(doc);
        setTotalPages(doc.numPages);
        setLoading(false);
      })
      .catch((err: any) => {
        if (!isMounted) return;
        console.error('Failed to load PDF via pdfjs:', err);
        setErrorMsg('Could not render document canvas. You can switch to Google Docs Viewer or download the PDF.');
        setLoading(false);
      });

    return () => {
      isMounted = false;
      try {
        loadingTask.destroy();
      } catch {}
    };
  }, [fileUrl]);

  // Render single page onto canvas
  const renderPage = useCallback(
    async (pageNum: number) => {
      if (!pdfDoc || !canvasRef.current || !containerRef.current) return;

      try {
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }
      } catch {}

      try {
        const page = await pdfDoc.getPage(pageNum);
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Container width measurement
        const containerWidth = containerRef.current.clientWidth || 800;
        const baseViewport = page.getViewport({ scale: 1.0 });

        // Calculate fit-to-width scale (with padding allowance)
        const padding = containerWidth < 500 ? 16 : 32;
        const availableWidth = Math.max(280, containerWidth - padding);
        const fitScale = availableWidth / baseViewport.width;
        const scale = fitScale * zoomLevel;

        const viewport = page.getViewport({ scale });
        const pixelRatio = window.devicePixelRatio || 1;

        // High-DPI canvas sizing
        canvas.width = Math.floor(viewport.width * pixelRatio);
        canvas.height = Math.floor(viewport.height * pixelRatio);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        ctx.save();
        ctx.scale(pixelRatio, pixelRatio);

        const renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        };

        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;
        await renderTask.promise;
        ctx.restore();
      } catch (err: any) {
        if (err?.name !== 'RenderingCancelledException') {
          console.warn('Canvas render error:', err);
        }
      }
    },
    [pdfDoc, zoomLevel]
  );

  useEffect(() => {
    if (pdfDoc && viewMode === 'single') {
      renderPage(currentPage);
    }
  }, [pdfDoc, currentPage, zoomLevel, viewMode, renderPage]);

  // Re-render on window resize (e.g. folding/unfolding Pixel Fold)
  useEffect(() => {
    const handleResize = () => {
      if (pdfDoc && viewMode === 'single') {
        renderPage(currentPage);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pdfDoc, currentPage, viewMode, renderPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        setCurrentPage((prev) => Math.min(totalPages, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentPage((prev) => Math.max(1, prev - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalPages]);

  return (
    <div className="space-y-3" ref={containerRef}>
      {/* Viewer Navigation & Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900/95 border border-slate-800 rounded-xl">
        {/* Left: Page Navigator */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1 || loading}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-200 transition"
            title="Previous Page (Left Arrow)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1 text-xs font-mono text-slate-300 px-1">
            <span className="font-bold text-indigo-400">Slide {currentPage}</span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-400">{totalPages}</span>
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages || loading}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-200 transition"
            title="Next Page (Right Arrow)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Center: Slide Quick Slider for Pixel Fold Scrubbing */}
        <div className="flex items-center gap-2 flex-1 max-w-xs min-w-[120px] px-2">
          <input
            type="range"
            min={1}
            max={totalPages || 1}
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
            disabled={loading}
            className="w-full accent-indigo-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            title="Scrub slides"
          />
        </div>

        {/* Right: Zoom & Mode Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.15))}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono text-slate-400 px-1 min-w-[42px] text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(2.2, z + 0.15))}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(1.0)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            title="Reset Zoom to Fit Width"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Canvas Document Stage */}
      <div className="relative min-h-[420px] sm:min-h-[580px] bg-slate-950 border border-slate-800/80 rounded-2xl overflow-auto flex items-center justify-center p-2 sm:p-4 shadow-inner">
        {loading && (
          <div className="flex flex-col items-center justify-center gap-3 p-12 text-slate-400">
            <Loader2 className="w-7 h-7 text-indigo-400 animate-spin" />
            <p className="text-xs font-medium">Rendering document slides...</p>
          </div>
        )}

        {errorMsg && (
          <div className="p-6 bg-red-950/40 border border-red-800/60 rounded-xl text-center space-y-3 max-w-md mx-auto">
            <AlertCircle className="w-8 h-8 text-red-400 mx-auto" />
            <p className="text-xs text-red-300">{errorMsg}</p>
            <a
              href={resolveAssetUrl(fileUrl)}
              download
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF Directly</span>
            </a>
          </div>
        )}

        {!loading && !errorMsg && (
          <div className="flex justify-center w-full">
            <canvas
              ref={canvasRef}
              className="rounded-lg shadow-2xl border border-slate-800 max-w-full bg-white"
            />
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// Main DocumentsTemplate Component
// ============================================================================
export const DocumentsTemplate: React.FC<DocumentsTemplateProps> = ({
  documents,
  className = '',
}) => {
  const [selectedDocId, setSelectedDocId] = useState<string>(
    () => documents[0]?.id || ''
  );
  const [viewerEngine, setViewerEngine] = useState<'canvas' | 'google' | 'native'>('canvas');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Synchronize active doc
  const activeDoc = documents.find((d) => d.id === selectedDocId) || documents[0] || null;

  // Toggle fullscreen
  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.warn('Fullscreen error:', err);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  if (documents.length === 0) {
    return (
      <div className={`rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center space-y-3 ${className}`}>
        <div className="w-12 h-12 mx-auto rounded-xl bg-slate-800/80 flex items-center justify-center text-slate-400">
          <FileText className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-200">No documents available</h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Study documents and lecture slides will appear here.
        </p>
      </div>
    );
  }

  const resolvedUrl = activeDoc ? resolveAssetUrl(activeDoc.fileUrl) : '';
  const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
    window.location.origin + resolvedUrl
  )}&embedded=true`;

  return (
    <div className={`space-y-4 animate-fade-in ${className}`} ref={containerRef}>
      {/* Document Selector & Action Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm">
        {/* Row 1: Multiple Document Tabs if > 1 */}
        {documents.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 border-b border-slate-800/60 pb-3">
            {documents.map((doc) => (
              <button
                key={doc.id}
                onClick={() => setSelectedDocId(doc.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                  doc.id === activeDoc?.id
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-600/30 ring-1 ring-indigo-400/40'
                    : 'bg-slate-950/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-indigo-300" />
                <span className="truncate max-w-[220px]">{doc.title}</span>
              </button>
            ))}
          </div>
        )}

        {/* Row 2: Document Info & Quick Action Buttons */}
        {activeDoc && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-slate-100 truncate">
                  {activeDoc.title}
                </h3>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono mt-0.5">
                  {activeDoc.pageCount && <span>{activeDoc.pageCount} Pages</span>}
                  {activeDoc.fileSize && (
                    <>
                      <span>•</span>
                      <span>{activeDoc.fileSize}</span>
                    </>
                  )}
                  {activeDoc.category && (
                    <>
                      <span>•</span>
                      <span className="text-indigo-400">{activeDoc.category}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions: Engine Selector, Download, External Tab, Fullscreen */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              {/* Viewer Engine Switcher */}
              <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl p-0.5 text-[11px]">
                <button
                  onClick={() => setViewerEngine('canvas')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition ${
                    viewerEngine === 'canvas'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Mobile & Pixel Fold Optimized Canvas Reader"
                >
                  Slides
                </button>
                <button
                  onClick={() => setViewerEngine('google')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition ${
                    viewerEngine === 'google'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Google Docs Cloud Viewer"
                >
                  Cloud
                </button>
                <button
                  onClick={() => setViewerEngine('native')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition ${
                    viewerEngine === 'native'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Native Browser Frame"
                >
                  Native
                </button>
              </div>

              <a
                href={resolvedUrl}
                download={activeDoc.fileName || `${activeDoc.title}.pdf`}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition"
                title="Download PDF"
              >
                <Download className="w-4 h-4" />
              </a>

              <a
                href={resolvedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition"
                title="Open in new browser tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition"
                title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Embedded Document Stage */}
      {activeDoc && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 sm:p-4 shadow-md">
          {viewerEngine === 'canvas' && (
            <PdfCanvasViewer
              fileUrl={activeDoc.fileUrl}
              title={activeDoc.title}
              pageCountHint={activeDoc.pageCount}
            />
          )}

          {viewerEngine === 'google' && (
            <div className="w-full h-[650px] rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              <iframe
                src={googleViewerUrl}
                title={activeDoc.title}
                className="w-full h-full border-0"
              />
            </div>
          )}

          {viewerEngine === 'native' && (
            <div className="w-full h-[650px] rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              <iframe
                src={`${resolvedUrl}#toolbar=1&navpanes=1`}
                title={activeDoc.title}
                className="w-full h-full border-0"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentsTemplate;
