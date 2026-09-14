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
  AlertCircle,
  Loader2,
  MousePointerClick
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
// PDF Canvas Viewer Component (Mobile, Pixel Fold, & Fullscreen Optimized)
// ============================================================================
interface PdfCanvasViewerProps {
  fileUrl: string;
  title: string;
  isFullscreen: boolean;
}

const PdfCanvasViewer: React.FC<PdfCanvasViewerProps> = ({ fileUrl, isFullscreen }) => {
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
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
        setErrorMsg('Could not render document canvas. Please download the PDF directly.');
        setLoading(false);
      });

    return () => {
      isMounted = false;
      try {
        loadingTask.destroy();
      } catch {}
    };
  }, [fileUrl]);

  // Render current slide onto canvas (fits both width & height dynamically)
  const renderPage = useCallback(
    async (pageNum: number) => {
      if (!pdfDoc || !canvasRef.current || !stageRef.current) return;

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

        const stageWidth = stageRef.current.clientWidth || 800;
        const stageHeight = stageRef.current.clientHeight || (isFullscreen ? window.innerHeight - 120 : 600);
        const baseViewport = page.getViewport({ scale: 1.0 });

        // Available area with responsive margins
        const paddingX = stageWidth < 500 ? 12 : 24;
        const paddingY = isFullscreen ? 16 : 24;
        const availableWidth = Math.max(260, stageWidth - paddingX);
        const availableHeight = Math.max(260, stageHeight - paddingY);

        // Fit both width and height so the slide is fully visible without clipping
        const scaleX = availableWidth / baseViewport.width;
        const scaleY = availableHeight / baseViewport.height;
        const fitScale = Math.min(scaleX, scaleY > 0 ? scaleY : scaleX);
        const scale = fitScale * zoomLevel;

        const viewport = page.getViewport({ scale });
        const pixelRatio = window.devicePixelRatio || 1;

        // High-DPI canvas resolution
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
    [pdfDoc, zoomLevel, isFullscreen]
  );

  useEffect(() => {
    if (pdfDoc) {
      renderPage(currentPage);
    }
  }, [pdfDoc, currentPage, zoomLevel, isFullscreen, renderPage]);

  // Re-render when window or fullscreen state changes (e.g. Pixel Fold fold/unfold)
  useEffect(() => {
    const handleResize = () => {
      if (pdfDoc) {
        renderPage(currentPage);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pdfDoc, currentPage, renderPage]);

  // Keyboard navigation (Arrow keys / PageUp / PageDown)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        setCurrentPage((prev) => Math.min(totalPages, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentPage((prev) => Math.max(1, prev - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalPages]);

  const goToPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goToNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  return (
    <div
      className={`flex flex-col ${isFullscreen ? 'h-full w-full flex-1 min-h-0' : 'space-y-3'}`}
      ref={containerRef}
    >
      {/* Navigation Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900/95 border border-slate-800 rounded-xl shrink-0 shadow-sm">
        {/* Left: Previous / Next Slide Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={goToPrev}
            disabled={currentPage <= 1 || loading}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-200 transition"
            title="Previous Slide (Left Arrow / Click Left Half)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1 text-xs font-mono text-slate-300 px-1">
            <span className="font-bold text-indigo-400">Slide {currentPage}</span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-400">{totalPages}</span>
          </div>

          <button
            onClick={goToNext}
            disabled={currentPage >= totalPages || loading}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-200 transition"
            title="Next Slide (Right Arrow / Click Right Half)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Center: Slide Quick Slider for Pixel Fold scrubbing */}
        <div className="flex items-center gap-2 flex-1 max-w-xs min-w-[120px] px-2">
          <input
            type="range"
            min={1}
            max={totalPages || 1}
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
            disabled={loading}
            className="w-full accent-indigo-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            title="Slide scrubber"
          />
        </div>

        {/* Right: Zoom & Quick Click Hint */}
        <div className="flex items-center gap-1.5">
          <div className="hidden md:flex items-center gap-1 text-[10px] text-slate-400 font-medium px-2 py-1 bg-slate-950 rounded-lg border border-slate-800 mr-1">
            <MousePointerClick className="w-3 h-3 text-indigo-400" />
            <span>Click left/right on slide to navigate</span>
          </div>

          <button
            onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.15))}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono text-slate-400 px-1 min-w-[40px] text-center">
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
            title="Reset Zoom to Fit Screen"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Document Canvas Stage (Full Height when Fullscreen) */}
      <div
        ref={stageRef}
        className={`relative select-none overflow-hidden flex items-center justify-center ${
          isFullscreen
            ? 'flex-1 w-full h-full min-h-0 bg-slate-950 rounded-xl border border-slate-800/80 p-2 sm:p-4 shadow-2xl'
            : 'min-h-[460px] sm:min-h-[620px] max-h-[85vh] bg-slate-950 border border-slate-800/80 rounded-2xl p-2 sm:p-4 shadow-inner'
        }`}
      >
        {loading && (
          <div className="flex flex-col items-center justify-center gap-3 p-12 text-slate-400">
            <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
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
          <div className="relative inline-block max-w-full max-h-full">
            {/* The rendered High-DPI Canvas */}
            <canvas
              ref={canvasRef}
              className="rounded-lg shadow-2xl border border-slate-800/80 max-w-full max-h-full bg-white object-contain block mx-auto"
            />

            {/* Interactive Left Click Zone: Navigate to Previous Slide */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              disabled={currentPage <= 1}
              className={`absolute left-0 top-0 bottom-0 w-1/2 flex items-center justify-start pl-3 sm:pl-6 group transition-opacity z-20 ${
                currentPage <= 1
                  ? 'cursor-default opacity-0'
                  : 'cursor-w-resize opacity-0 hover:opacity-100 active:opacity-95'
              }`}
              title="Click left side: Previous Slide"
              aria-label="Previous Slide"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/90 text-white border border-slate-700 shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform ring-1 ring-white/10">
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-300" />
              </div>
            </button>

            {/* Interactive Right Click Zone: Navigate to Next Slide */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              disabled={currentPage >= totalPages}
              className={`absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-end pr-3 sm:pr-6 group transition-opacity z-20 ${
                currentPage >= totalPages
                  ? 'cursor-default opacity-0'
                  : 'cursor-e-resize opacity-0 hover:opacity-100 active:opacity-95'
              }`}
              title="Click right side: Next Slide"
              aria-label="Next Slide"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/90 text-white border border-slate-700 shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform ring-1 ring-white/10">
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-300" />
              </div>
            </button>
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
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const fullscreenContainerRef = useRef<HTMLDivElement>(null);

  // Synchronize active document
  const activeDoc = documents.find((d) => d.id === selectedDocId) || documents[0] || null;

  // Toggle Fullscreen using standard Fullscreen API with full viewport scaling
  const toggleFullscreen = async () => {
    if (!fullscreenContainerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await fullscreenContainerRef.current.requestFullscreen();
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

  return (
    <div
      ref={fullscreenContainerRef}
      className={
        isFullscreen
          ? 'fixed inset-0 z-50 bg-slate-950 flex flex-col h-screen w-screen p-3 sm:p-4 overflow-hidden'
          : `space-y-4 animate-fade-in ${className}`
      }
    >
      {/* Document Selector & Action Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm shrink-0">
        {/* Document Switcher Tabs if multiple documents exist */}
        {documents.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 border-b border-slate-800/60">
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

        {/* Document Metadata & Controls */}
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
                  {activeDoc.pageCount && <span>{activeDoc.pageCount} Slides</span>}
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

            {/* Action Buttons: Download, New Tab, Fullscreen */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
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
                className={`p-2 rounded-xl border transition ${
                  isFullscreen
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700/80'
                }`}
                title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen (Full Height)'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Embedded Document Stage */}
      {activeDoc && (
        <div
          className={`bg-slate-900/90 border border-slate-800 rounded-2xl shadow-md ${
            isFullscreen ? 'flex-1 h-full min-h-0 p-2 sm:p-3 flex flex-col' : 'p-3 sm:p-4'
          }`}
        >
          <PdfCanvasViewer
            fileUrl={activeDoc.fileUrl}
            title={activeDoc.title}
            isFullscreen={isFullscreen}
          />
        </div>
      )}
    </div>
  );
};

export default DocumentsTemplate;
