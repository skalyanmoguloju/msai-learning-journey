import React from 'react';
import { Clock, AlertCircle, BookOpen } from 'lucide-react';

interface IncompleteModuleViewProps {
  moduleNumber: number;
  title: string;
  estimatedTime: string;
}

export const IncompleteModuleView: React.FC<IncompleteModuleViewProps> = ({
  moduleNumber,
  title,
  estimatedTime
}) => {
  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 text-center space-y-4 shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
          <Clock className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
            <AlertCircle className="w-3.5 h-3.5" /> Incomplete &bull; Awaiting Content
          </div>
          <h2 className="text-xl font-bold text-slate-100">
            Module {moduleNumber}: {title}
          </h2>
          <p className="text-sm text-slate-400">
            Estimated Study Time: <span className="font-semibold text-slate-300">{estimatedTime}</span>
          </p>
        </div>

        <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400 leading-relaxed">
          Course material for this module has not been added yet. When the module HTML/notes are ready, they will be loaded here.
        </div>
      </div>
    </div>
  );
};
