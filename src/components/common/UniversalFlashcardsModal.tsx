import React, { useState, useEffect, useMemo, useRef } from 'react';
import katex from 'katex';
import {
  Sparkles,
  X,
  CreditCard,
  Grid,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Shuffle
} from 'lucide-react';
export interface UniversalFlashcard {
  id: string;
  category: string;
  title: string;
  frontPrompt: string;
  backFormula: string;
  backExplanation: string;
  useCase?: string;
  remark?: string;
}

// KaTeX inline & block helper
const MathText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
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

// Display-mode formula renderer for cards
const FlashcardFormula: React.FC<{ tex: string; className?: string }> = ({ tex, className = '' }) => {
  const html = useMemo(() => {
    if (!tex) return '';
    const cleanTex = tex.trim().replace(/^\$\$([\s\S]*)\$\$$/, '$1').replace(/^\$([\s\S]*)\$$/, '$1');
    try {
      return katex.renderToString(cleanTex, {
        displayMode: true,
        throwOnError: false
      });
    } catch (err) {
      console.error('KaTeX rendering error:', err);
      return `<span class="text-rose-400 font-mono text-sm">${tex}</span>`;
    }
  }, [tex]);

  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
};

export interface UniversalFlashcardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  cards?: UniversalFlashcard[];
  flashcards?: UniversalFlashcard[];
  storageKey?: string;
  initialCategory?: string;
  activeModuleId?: string | number;
}

export const UniversalFlashcardsModal: React.FC<UniversalFlashcardsModalProps> = ({
  isOpen,
  onClose,
  title = 'VIP Concept & Formula Flashcards',
  subtitle = 'Master core theoretical definitions, algebraic proofs, and empirical formulations',
  cards: rawCards,
  flashcards: rawFlashcards,
  storageKey = 'universal_flashcards_mastered',
  initialCategory = 'All',
  activeModuleId
}) => {
  const cards = useMemo(() => rawCards || rawFlashcards || [], [rawCards, rawFlashcards]);
  const [cardCategory, setCardCategory] = useState<string>(initialCategory);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'deck' | 'grid'>('deck');


  // Mastered state synced to localStorage
  const [masteredCards, setMasteredCards] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || '[]');
    } catch {
      return [];
    }
  });

  // Re-sync if storageKey changes
  useEffect(() => {
    try {
      setMasteredCards(JSON.parse(localStorage.getItem(storageKey) || '[]'));
    } catch {
      setMasteredCards([]);
    }
  }, [storageKey]);

  const toggleMastered = (cardId: string) => {
    setMasteredCards(prev => {
      const next = prev.includes(cardId) ? prev.filter(id => id !== cardId) : [...prev, cardId];
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Derive categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    cards.forEach(c => {
      if (c.category) set.add(c.category);
    });
    return ['All', ...Array.from(set)];
  }, [cards]);

  // Filtered cards based on active category
  const filteredCards = useMemo(() => {
    if (cardCategory === 'All') return cards;
    return cards.filter(c => c.category === cardCategory);
  }, [cardCategory, cards]);

  // When modal opens, match activeModuleId or initialCategory to category
  const prevIsOpenRef = useRef(false);
  useEffect(() => {
    if (isOpen && !prevIsOpenRef.current) {
      if (activeModuleId !== undefined && activeModuleId !== '') {
        const numMatch = String(activeModuleId).match(/\d+/);
        const modNum = numMatch ? numMatch[0] : String(activeModuleId);
        const regex = new RegExp(`(^|\\b)(module|mod|step)\\s*${modNum}(\\b|:)`, 'i');
        const match = categories.find((c) => regex.test(c));
        if (match) {
          setCardCategory(match);
        } else if (initialCategory && categories.includes(initialCategory)) {
          setCardCategory(initialCategory);
        }
      } else if (initialCategory && categories.includes(initialCategory)) {
        setCardCategory(initialCategory);
      }
    }
    prevIsOpenRef.current = isOpen;
  }, [isOpen, activeModuleId, initialCategory, categories]);

  const activeCard = filteredCards[currentCardIndex] || filteredCards[0] || cards[0];

  // Reset current index when category changes
  useEffect(() => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
  }, [cardCategory]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.code === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (filteredCards.length > 0) {
          setCurrentCardIndex(prev => (prev + 1) % filteredCards.length);
          setIsFlipped(false);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (filteredCards.length > 0) {
          setCurrentCardIndex(prev => (prev - 1 + filteredCards.length) % filteredCards.length);
          setIsFlipped(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCards.length, onClose]);

  if (!isOpen || cards.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full p-5 sm:p-7 shadow-2xl space-y-6 relative max-h-[92vh] flex flex-col justify-between my-auto">

        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />
              <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                {title}
              </h3>
            </div>
            <p className="text-xs text-slate-400 max-w-xl line-clamp-1">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* View Mode Toggle: Deck vs Grid */}
            <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setViewMode('deck')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  viewMode === 'deck'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Deck Flip View"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Deck</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  viewMode === 'grid'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Grid Overview"
              >
                <Grid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
            </div>

            {/* Mastered Counter */}
            <div className="px-3 py-1.5 rounded-xl bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 text-xs font-bold font-mono">
              {masteredCards.length}/{cards.length} Mastered
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar shrink-0">
          {categories.map((cat) => {
            const isSelected = cardCategory === cat;
            const count = cat === 'All' ? cards.length : cards.filter(c => c.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setCardCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap shrink-0 transition border flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                    : 'bg-slate-950/60 text-slate-400 hover:text-white border-slate-800 hover:bg-slate-800/40'
                }`}
              >
                <span>{cat}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 font-mono">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Modal Body: Scrollable Area */}
        <div className="flex-1 overflow-y-auto pr-1">

          {/* DECK VIEW */}
          {viewMode === 'deck' && activeCard && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>
                  Card <strong className="text-white">{currentCardIndex + 1}</strong> of {filteredCards.length}
                </span>
                <span className="text-indigo-400 font-semibold">{activeCard.category}</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${((currentCardIndex + 1) / filteredCards.length) * 100}%` }}
                />
              </div>

              {/* Interactive Flip Card */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="cursor-pointer min-h-[300px] sm:min-h-[340px] bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 sm:p-8 shadow-xl transition-all relative flex flex-col justify-between group select-none"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {activeCard.category}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMastered(activeCard.id);
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                      masteredCards.includes(activeCard.id)
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700/60'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{masteredCards.includes(activeCard.id) ? 'Mastered' : 'Mark Mastered'}</span>
                  </button>
                </div>

                <div className="my-5 space-y-3 text-center">
                  {!isFlipped ? (
                    <div className="space-y-3 animate-fade-in">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                        Question / Concept Prompt
                      </span>
                      <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        <MathText text={activeCard.title} />
                      </h4>
                      <div className="text-sm sm:text-base text-slate-200 font-medium max-w-xl mx-auto leading-relaxed">
                        <MathText text={activeCard.frontPrompt} />
                      </div>
                      <p className="text-xs text-indigo-400/80 italic pt-1">
                        (Click card or press Space to reveal formula &amp; derivation)
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 animate-fade-in">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block">
                        Formula &amp; Theoretical Derivation
                      </span>
                      <h4 className="text-base font-bold text-indigo-300">
                        <MathText text={activeCard.title} />
                      </h4>
                      <div className="bg-slate-950 p-3 sm:p-4 rounded-xl border border-slate-800 text-slate-100 text-sm sm:text-base overflow-x-auto shadow-inner max-w-2xl mx-auto font-mono">
                        <FlashcardFormula tex={activeCard.backFormula} />
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                        <MathText text={activeCard.backExplanation} />
                      </p>
                      {activeCard.useCase && (
                        <div className="inline-block bg-blue-950/40 text-blue-300 border border-blue-800/60 px-2.5 py-0.5 rounded-lg text-[11px] font-semibold">
                          💡 <strong>Use Case:</strong> {activeCard.useCase}
                        </div>
                      )}
                      {activeCard.remark && (
                        <p className="text-[11px] text-slate-400 italic max-w-lg mx-auto">
                          Remark: <MathText text={activeCard.remark} />
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-800/80">
                  <span>Press Space / Enter to Flip</span>
                  <span>Use ← → Arrow Keys to Navigate</span>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => {
                    setCurrentCardIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
                    setIsFlipped(false);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition text-xs font-semibold flex items-center gap-1.5 border border-slate-700/60 shadow-sm"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Prev
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/30"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{isFlipped ? 'Show Front' : 'Flip to Formula'}</span>
                  </button>
                  <button
                    onClick={() => {
                      const rand = Math.floor(Math.random() * filteredCards.length);
                      setCurrentCardIndex(rand);
                      setIsFlipped(false);
                    }}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition border border-slate-700/60"
                    title="Shuffle Cards"
                  >
                    <Shuffle className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => {
                    setCurrentCardIndex((prev) => (prev + 1) % filteredCards.length);
                    setIsFlipped(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white transition text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-blue-600/30"
                >
                  Next <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* GRID VIEW */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredCards.map((card) => {
                const isMastered = masteredCards.includes(card.id);
                return (
                  <div
                    key={card.id}
                    className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-4 shadow-sm space-y-3 flex flex-col justify-between transition-all"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          {card.category}
                        </span>
                        <button
                          onClick={() => toggleMastered(card.id)}
                          className={`p-1 rounded-lg text-xs transition ${
                            isMastered ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4 className="font-bold text-white text-xs">
                        <MathText text={card.title} />
                      </h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        <MathText text={card.frontPrompt} />
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                      <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center text-xs overflow-x-auto text-indigo-200 font-mono">
                        <FlashcardFormula tex={card.backFormula} />
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        <MathText text={card.backExplanation} />
                      </p>
                      {card.useCase && (
                        <p className="text-[10px] text-blue-300 font-medium">
                          💡 {card.useCase}
                        </p>
                      )}
                      {card.remark && (
                        <p className="text-[10px] text-slate-400 italic">
                          Remark: <MathText text={card.remark} />
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
