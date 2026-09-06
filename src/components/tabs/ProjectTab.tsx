import React from 'react';
import { 
  Rocket, 
  GitBranch, 
  ExternalLink, 
  Database, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  BarChart3, 
  Calendar,
  Layers,
  Cpu
} from 'lucide-react';
import { Course } from '../../types/course';

interface ProjectTabProps {
  course: Course;
  toggleDeliverable: (courseId: string, deliverableId: string) => void;
}

export const ProjectTab: React.FC<ProjectTabProps> = ({
  course,
  toggleDeliverable,
}) => {
  const { project } = course;
  const completedDeliverables = project.deliverables.filter(d => d.completed).length;

  return (
    <div className="space-y-6">
      
      {/* Project Overview Card */}
      <div className="rounded-2xl p-6 lg:p-8 bg-gradient-to-br from-slate-900 via-blue-950/20 to-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold">
              <Rocket className="w-3.5 h-3.5 text-blue-400" />
              Course Capstone Project
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
            <p className="text-xs text-indigo-300 font-medium">{project.subtitle}</p>
          </div>

          <div className="flex items-center gap-2.5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all"
              >
                <GitBranch className="w-4 h-4 text-emerald-400" />
                <span>Repository</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all"
              >
                <Rocket className="w-4 h-4" />
                <span>Live System Demo</span>
                <ExternalLink className="w-3 h-3 text-indigo-200" />
              </a>
            )}
          </div>
        </div>

        <p className="text-xs lg:text-sm text-slate-300 leading-relaxed pt-2">
          {project.abstract}
        </p>

        {/* Problem Formulation callout */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
            Problem Formulation & Engineering Challenge
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            {project.problemStatement}
          </p>
        </div>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-slate-500" /> Stack:
          </span>
          {project.techStack.map((tech, idx) => (
            <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 text-blue-200 border border-slate-700/60 font-mono">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Quantitative Benchmark Metrics */}
      <div className="space-y-3">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <BarChart3 className="w-3.5 h-3.5 text-cyan-400" /> Empirical Benchmark Performance & Evaluation
        </span>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {project.metrics.map((metric, idx) => (
            <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between gap-2 shadow-md">
              <span className="text-xs text-slate-400">{metric.label}</span>
              <div>
                <div className="text-xl font-extrabold text-white font-mono">{metric.value}</div>
                {metric.baseline && (
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Baseline: {metric.baseline}
                  </div>
                )}
              </div>
              {metric.change && (
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-900/60 w-fit">
                  {metric.change}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* End-to-End System Pipeline Flow */}
      <div className="rounded-2xl p-5 lg:p-6 bg-slate-900/90 border border-slate-800 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-base font-bold text-white tracking-tight">System Architecture & Pipeline Stages</h4>
            <p className="text-xs text-slate-400">Sequential end-to-end data and model processing workflow</p>
          </div>
          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
            {project.pipelineSteps.length} Stages
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {project.pipelineSteps.map((step, idx) => (
            <div
              key={step.step}
              className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between gap-3 relative group hover:border-blue-500/50 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-6 h-6 rounded-full bg-blue-900/60 text-blue-300 font-bold text-xs flex items-center justify-center border border-blue-600/40">
                    {step.step}
                  </span>
                  {idx < project.pipelineSteps.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 hidden md:block" />
                  )}
                </div>
                <h5 className="text-xs font-bold text-white mb-1">{step.title}</h5>
                <p className="text-[11px] text-slate-300 leading-snug">{step.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-[10px] text-indigo-300 font-mono block truncate">
                  {step.tool}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deliverables & Milestones Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Deliverables Checklist */}
        <div className="lg:col-span-2 rounded-2xl p-5 bg-slate-900/80 border border-slate-800 shadow-md space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" /> Milestone Deliverables Tracker
              </h5>
              <p className="text-[11px] text-slate-400">Click to toggle milestone completion</p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-800/60">
              {completedDeliverables} / {project.deliverables.length} Done
            </span>
          </div>

          <div className="space-y-2">
            {project.deliverables.map((deliv) => (
              <div
                key={deliv.id}
                onClick={() => toggleDeliverable(course.id, deliv.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  deliv.completed
                    ? 'bg-emerald-950/20 border-emerald-800/60 text-slate-200'
                    : 'bg-slate-950/40 border-slate-800 hover:bg-slate-800/50 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  {deliv.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                  <span className={`text-xs font-semibold ${deliv.completed ? 'text-white' : 'text-slate-300'}`}>
                    {deliv.title}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 shrink-0 font-mono">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  <span>Due: {deliv.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dataset & Evaluation Info */}
        <div className="rounded-2xl p-5 bg-slate-900/80 border border-slate-800 shadow-md flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-blue-400" /> Corpus & Data Provenance
            </span>

            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 space-y-2">
              <h6 className="text-xs font-bold text-white">Dataset Description</h6>
              <p className="text-xs text-slate-300 leading-relaxed">
                {project.datasetInfo}
              </p>
            </div>

            <div className="text-[11px] text-slate-400 space-y-1">
              <p>• Data splits: 70% Train, 15% Validation, 15% Test</p>
              <p>• Evaluated with nested 5-Fold Stratified Cross-Validation</p>
              <p>• Reproducibility seed: 42</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};