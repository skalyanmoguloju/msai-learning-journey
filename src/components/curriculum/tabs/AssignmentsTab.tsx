import React, { useState, useEffect, useMemo } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Calendar, 
  FileText, 
  ExternalLink, 
  GitBranch, 
  Rocket, 
  Database, 
  BarChart3, 
  ArrowRight, 
  Search, 
  Layers, 
  Cpu, 
  CheckSquare, 
  Sparkles,
  Award,
  BookOpen,
  ClipboardList
} from 'lucide-react';
import { Course, AssignmentMilestone, AssignmentDocumentLink } from '../../../types/course';

interface AssignmentsTabProps {
  course: Course;
  toggleDeliverable?: (courseId: string, deliverableId: string) => void;
}

export const AssignmentsTab: React.FC<AssignmentsTabProps> = ({
  course,
  toggleDeliverable,
}) => {
  // 1. Gather or fallback milestones
  const milestones: AssignmentMilestone[] = useMemo(() => {
    if (course.assignments && course.assignments.length > 0) {
      return course.assignments;
    }
    // Fallback if course doesn't have custom assignments defined
    if (course.project?.deliverables) {
      return course.project.deliverables.map((deliv, idx) => ({
        id: deliv.id,
        title: deliv.title,
        category: (idx === 0 ? 'Proposal' : idx === course.project.deliverables.length - 1 ? 'Report' : 'Milestone') as AssignmentMilestone['category'],
        dueDate: deliv.dueDate,
        status: deliv.completed ? 'completed' : 'pending',
        weight: '20%',
        description: `Deliverable milestone for course capstone project: "${course.project.title}". Ensure all experimental validation and code requirements are fulfilled.`,
        requirements: [
          'Review assignment specifications and instructor guidelines.',
          'Complete implementation and verify unit tests.',
          'Format deliverables and submit required documentation.'
        ],
        documents: [
          ...(course.project.githubUrl ? [{
            title: 'Project Repository',
            url: course.project.githubUrl,
            type: 'github' as const,
            description: 'Course codebase & experiment tracking',
          }] : []),
          ...(course.canvasUrl ? [{
            title: 'Canvas Assignment Portal',
            url: course.canvasUrl,
            type: 'canvas' as const,
            description: 'SJSU Canvas submission link',
          }] : []),
        ],
        relatedProjectDeliverableId: deliv.id,
      }));
    }
    return [];
  }, [course]);

  // Active milestone selection state with localStorage persistence
  const storageKeySelectedMilestone = `msai_active_milestone_${course.id}`;
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>(() => {
    const saved = localStorage.getItem(storageKeySelectedMilestone);
    if (saved && milestones.some(m => m.id === saved)) {
      return saved;
    }
    return milestones[0]?.id || '';
  });

  // Keep selected milestone in sync if course changes
  useEffect(() => {
    if (milestones.length > 0 && !milestones.some(m => m.id === selectedMilestoneId)) {
      setSelectedMilestoneId(milestones[0].id);
    }
  }, [milestones, selectedMilestoneId]);

  const handleSelectMilestone = (id: string) => {
    setSelectedMilestoneId(id);
    localStorage.setItem(storageKeySelectedMilestone, id);
  };

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'in-progress' | 'pending'>('all');

  // Interactive Checklist Subtasks State (stored in localStorage)
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(`msai_checklist_${course.id}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Milestone Status overrides (stored in localStorage)
  const [milestoneStatusOverrides, setMilestoneStatusOverrides] = useState<Record<string, 'completed' | 'in-progress' | 'pending'>>(() => {
    try {
      const saved = localStorage.getItem(`msai_milestone_status_${course.id}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Toggle individual checklist requirement
  const toggleRequirement = (milestoneId: string, reqIndex: number) => {
    const key = `${milestoneId}_${reqIndex}`;
    setChecklistState(prev => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem(`msai_checklist_${course.id}`, JSON.stringify(next));
      return next;
    });
  };

  // Toggle milestone overall status
  const cycleMilestoneStatus = (milestone: AssignmentMilestone) => {
    const currentStatus = milestoneStatusOverrides[milestone.id] || milestone.status;
    let nextStatus: 'completed' | 'in-progress' | 'pending' = 'pending';
    if (currentStatus === 'pending') nextStatus = 'in-progress';
    else if (currentStatus === 'in-progress') nextStatus = 'completed';
    else nextStatus = 'pending';

    setMilestoneStatusOverrides(prev => {
      const next = { ...prev, [milestone.id]: nextStatus };
      localStorage.setItem(`msai_milestone_status_${course.id}`, JSON.stringify(next));
      return next;
    });

    // Also sync with course project deliverables if bound
    if (milestone.relatedProjectDeliverableId && toggleDeliverable) {
      const isCompletedNow = nextStatus === 'completed';
      const existingDeliv = course.project?.deliverables.find(d => d.id === milestone.relatedProjectDeliverableId);
      if (existingDeliv && existingDeliv.completed !== isCompletedNow) {
        toggleDeliverable(course.id, milestone.relatedProjectDeliverableId);
      }
    }
  };

  // Resolve status of any milestone
  const getMilestoneStatus = (m: AssignmentMilestone): 'completed' | 'in-progress' | 'pending' => {
    if (milestoneStatusOverrides[m.id]) {
      return milestoneStatusOverrides[m.id];
    }
    // Check if related deliverable is marked in course
    if (m.relatedProjectDeliverableId && course.project?.deliverables) {
      const d = course.project.deliverables.find(del => del.id === m.relatedProjectDeliverableId);
      if (d) return d.completed ? 'completed' : 'pending';
    }
    return m.status;
  };

  // Filtered milestones
  const filteredMilestones = useMemo(() => {
    return milestones.filter(m => {
      const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const st = getMilestoneStatus(m);
      const matchesFilter = statusFilter === 'all' || st === statusFilter;

      return matchesSearch && matchesFilter;
    });
  }, [milestones, searchQuery, statusFilter, milestoneStatusOverrides, course.project?.deliverables]);

  const activeMilestone = milestones.find(m => m.id === selectedMilestoneId) || milestones[0];

  // Calculate overall stats
  const totalCount = milestones.length;
  const completedCount = milestones.filter(m => getMilestoneStatus(m) === 'completed').length;
  const inProgressCount = milestones.filter(m => getMilestoneStatus(m) === 'in-progress').length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Active milestone checklist stats
  const activeReqs = activeMilestone?.requirements || [];
  const activeCompletedReqs = activeReqs.filter((_, idx) => !!checklistState[`${activeMilestone?.id}_${idx}`]).length;
  const activeReqsPct = activeReqs.length > 0 ? Math.round((activeCompletedReqs / activeReqs.length) * 100) : 0;

  // Helper icon for document type
  const renderDocIcon = (type: AssignmentDocumentLink['type']) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-4 h-4 text-rose-400" />;
      case 'notebook':
        return <Cpu className="w-4 h-4 text-amber-400" />;
      case 'github':
        return <GitBranch className="w-4 h-4 text-emerald-400" />;
      case 'dataset':
        return <Database className="w-4 h-4 text-blue-400" />;
      case 'rubric':
        return <Award className="w-4 h-4 text-purple-400" />;
      case 'canvas':
        return <ExternalLink className="w-4 h-4 text-amber-300" />;
      default:
        return <BookOpen className="w-4 h-4 text-indigo-400" />;
    }
  };

  const activeStatus = activeMilestone ? getMilestoneStatus(activeMilestone) : 'pending';

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Course Assignments Overview & Progress */}
      <div className="rounded-2xl p-5 sm:p-6 lg:p-7 bg-gradient-to-br from-slate-900 via-indigo-950/20 to-slate-900 border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold">
              <ClipboardList className="w-3.5 h-3.5 text-indigo-400" />
              <span>Assignments & Milestone Hub</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {course.name} Coursework
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Track your assignments, homework submissions, project proposal milestones, and exams. Select any milestone to inspect task checklists, rubrics, starter notebooks, and document links.
            </p>
          </div>

          {/* Overall Progress Stat Card */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between gap-2 min-w-[220px]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Completion Rate</span>
              <span className="font-bold font-mono text-cyan-400">{progressPct}%</span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span className="text-emerald-400 font-semibold">{completedCount} Completed</span>
              {inProgressCount > 0 && <span className="text-amber-400 font-semibold">{inProgressCount} In-Progress</span>}
              <span className="text-slate-500">{totalCount - completedCount - inProgressCount} Pending</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Milestones Master List (4 cols on lg) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-3">
          
          {/* Search & Filter Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 space-y-3 shadow-md">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search milestones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/70 transition-all"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {(['all', 'in-progress', 'completed', 'pending'] as const).map((filter) => {
                const isActive = statusFilter === filter;
                const label = filter === 'all' ? `All (${totalCount})` 
                  : filter === 'in-progress' ? `In-Progress (${inProgressCount})` 
                  : filter === 'completed' ? `Done (${completedCount})` 
                  : `Pending (${totalCount - completedCount - inProgressCount})`;
                return (
                  <button
                    key={filter}
                    onClick={() => setStatusFilter(filter)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-all capitalize ${
                      isActive 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800/80'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Milestones Scrollable List */}
          <div className="space-y-2.5 max-h-[calc(100vh-280px)] overflow-y-auto pr-1 no-scrollbar">
            {filteredMilestones.length === 0 ? (
              <div className="text-center py-10 bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl text-slate-400 text-xs">
                No assignments match your search filter.
              </div>
            ) : (
              filteredMilestones.map((milestone) => {
                const isSelected = milestone.id === activeMilestone?.id;
                const status = getMilestoneStatus(milestone);

                return (
                  <div
                    key={milestone.id}
                    onClick={() => handleSelectMilestone(milestone.id)}
                    className={`group p-3.5 rounded-xl border transition-all cursor-pointer text-left relative overflow-hidden ${
                      isSelected
                        ? 'bg-gradient-to-r from-indigo-950/70 via-slate-900 to-indigo-950/40 border-indigo-500/70 shadow-lg shadow-indigo-950/40 ring-1 ring-indigo-500/40'
                        : 'bg-slate-900/70 hover:bg-slate-850 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-indigo-400 to-cyan-400" />
                    )}

                    <div className="flex items-start justify-between gap-3 pl-1">
                      {/* Status Icon */}
                      <button
                        type="button"
                        title={`Status: ${status} (Click to change)`}
                        onClick={(e) => {
                          e.stopPropagation();
                          cycleMilestoneStatus(milestone);
                        }}
                        className="mt-0.5 shrink-0 hover:scale-110 transition-transform"
                      >
                        {status === 'completed' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 drop-shadow-sm" />
                        ) : status === 'in-progress' ? (
                          <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-500 hover:text-slate-300" />
                        )}
                      </button>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                            milestone.category.toLowerCase().includes('project')
                              ? 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                              : milestone.category.toLowerCase().includes('exam')
                              ? 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                              : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                          }`}>
                            {milestone.category}
                          </span>
                          {milestone.weight && (
                            <span className="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded">
                              {milestone.weight}
                            </span>
                          )}
                        </div>

                        <h4 className={`text-xs sm:text-sm font-semibold leading-snug line-clamp-2 ${
                          isSelected ? 'text-white font-bold' : 'text-slate-200 group-hover:text-white'
                        }`}>
                          {milestone.title}
                        </h4>

                        <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400 font-mono">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-500 shrink-0" />
                            {milestone.dueDate}
                          </span>
                          {milestone.documents && milestone.documents.length > 0 && (
                            <span className="flex items-center gap-1 text-slate-400">
                              <FileText className="w-3 h-3 text-slate-500 shrink-0" />
                              {milestone.documents.length} docs
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right Chevron */}
                      <ArrowRight className={`w-3.5 h-3.5 mt-1 shrink-0 transition-transform ${
                        isSelected ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'
                      }`} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Selected Milestone Detail Workspace (7 cols on lg, 8 on xl) */}
        {activeMilestone ? (
          <div className="lg:col-span-7 xl:col-span-8 space-y-5">
            
            {/* Milestone Header Card */}
            <div className="rounded-2xl p-5 sm:p-6 bg-slate-900 border border-slate-800 shadow-xl space-y-4 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {activeMilestone.category}
                    </span>
                    {activeMilestone.weight && (
                      <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-md bg-slate-800 text-amber-300 border border-slate-700">
                        Weight: {activeMilestone.weight}
                      </span>
                    )}
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1 bg-slate-950/60 px-2.5 py-0.5 rounded border border-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      Due: <strong className="text-slate-200">{activeMilestone.dueDate}</strong>
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight">
                    {activeMilestone.title}
                  </h2>
                </div>

                {/* Status Toggle Button & Action */}
                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    onClick={() => cycleMilestoneStatus(activeMilestone)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all active:scale-95 ${
                      activeStatus === 'completed'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                        : activeStatus === 'in-progress'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {activeStatus === 'completed' ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Completed</span>
                      </>
                    ) : activeStatus === 'in-progress' ? (
                      <>
                        <Clock className="w-4 h-4 text-amber-400 animate-spin" />
                        <span>In Progress</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-4 h-4 text-slate-400" />
                        <span>Mark Done</span>
                      </>
                    )}
                  </button>

                  {/* Submission Portal / Canvas link */}
                  {activeMilestone.submissionUrl ? (
                    <a
                      href={activeMilestone.submissionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all shrink-0"
                    >
                      <span>Submit Assignment</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : course.canvasUrl ? (
                    <a
                      href={course.canvasUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all shrink-0"
                    >
                      <span>Canvas Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : null}
                </div>
              </div>

              {/* Milestone Description */}
              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Overview & Objectives
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeMilestone.description}
                </p>
              </div>
            </div>

            {/* Checklist of Requirements & Tasks */}
            {activeReqs.length > 0 && (
              <div className="rounded-2xl p-5 sm:p-6 bg-slate-900 border border-slate-800 shadow-md space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <CheckSquare className="w-4 h-4 text-cyan-400" />
                      Requirements & Submission Checklist
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Check off individual tasks as you make progress on this assignment
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      {activeCompletedReqs} / {activeReqs.length} Done ({activeReqsPct}%)
                    </span>
                  </div>
                </div>

                {/* Subtask Progress bar */}
                <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${activeReqsPct}%` }}
                  />
                </div>

                <div className="space-y-2">
                  {activeReqs.map((req, idx) => {
                    const isChecked = !!checklistState[`${activeMilestone.id}_${idx}`];
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleRequirement(activeMilestone.id, idx)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                          isChecked
                            ? 'bg-emerald-950/20 border-emerald-800/60 text-slate-200'
                            : 'bg-slate-950/50 border-slate-800/80 hover:bg-slate-850 text-slate-300'
                        }`}
                      >
                        <button
                          type="button"
                          className="mt-0.5 shrink-0 text-slate-400 hover:text-white"
                        >
                          {isChecked ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-500" />
                          )}
                        </button>
                        <span className={`text-xs leading-relaxed ${isChecked ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                          {req}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Documents & Resource Links Grid */}
            <div className="rounded-2xl p-5 sm:p-6 bg-slate-900 border border-slate-800 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-400" />
                    Assignment Documents & References
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Direct access to assignment specs, starter notebooks, grading rubrics, and portals
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
                  {activeMilestone.documents?.length || 0} Links
                </span>
              </div>

              {(!activeMilestone.documents || activeMilestone.documents.length === 0) ? (
                <div className="p-4 bg-slate-950/50 border border-dashed border-slate-800 rounded-xl text-center text-xs text-slate-400">
                  No direct document attachments configured for this milestone. Check SJSU Canvas for updates.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeMilestone.documents.map((doc, idx) => (
                    <a
                      key={idx}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-3.5 rounded-xl bg-slate-950/60 hover:bg-slate-850 border border-slate-800/90 hover:border-indigo-500/50 transition-all flex flex-col justify-between gap-3"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            {renderDocIcon(doc.type)}
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                              {doc.type}
                            </span>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-300 transition-colors" />
                        </div>
                        <h5 className="text-xs font-bold text-white group-hover:text-indigo-200 transition-colors">
                          {doc.title}
                        </h5>
                        {doc.description && (
                          <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                            {doc.description}
                          </p>
                        )}
                      </div>

                      {doc.size && (
                        <div className="pt-2 border-t border-slate-900 text-[10px] text-slate-500 font-mono">
                          Size: {doc.size}
                        </div>
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Course Project Pipeline & Benchmarks (if project details exist for course) */}
            {course.project && (
              <div className="rounded-2xl p-5 sm:p-6 bg-slate-900/90 border border-slate-800 shadow-md space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Rocket className="w-4 h-4 text-blue-400" />
                      Capstone Project Architecture & Benchmark Targets
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Technical specs for &ldquo;{course.project.title}&rdquo;
                    </p>
                  </div>
                  {course.project.githubUrl && (
                    <a
                      href={course.project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 transition-all"
                    >
                      <GitBranch className="w-3.5 h-3.5" />
                      <span>Codebase</span>
                    </a>
                  )}
                </div>

                {/* Metrics Grid */}
                {course.project.metrics && course.project.metrics.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <BarChart3 className="w-3.5 h-3.5 text-cyan-400" /> Target Evaluation Benchmarks
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {course.project.metrics.map((m, idx) => (
                        <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
                          <span className="text-[11px] text-slate-400 block truncate">{m.label}</span>
                          <div className="text-lg font-extrabold text-white font-mono mt-0.5">{m.value}</div>
                          {m.baseline && (
                            <div className="text-[10px] text-slate-500 mt-0.5 truncate">
                              Base: {m.baseline}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pipeline Steps Flow */}
                {course.project.pipelineSteps && course.project.pipelineSteps.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-indigo-400" /> End-to-End Pipeline Stages
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5">
                      {course.project.pipelineSteps.map((step, idx) => (
                        <div
                          key={step.step}
                          className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex flex-col justify-between gap-2"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="w-5 h-5 rounded-full bg-blue-900/60 text-blue-300 font-bold text-[10px] flex items-center justify-center border border-blue-600/40">
                                {step.step}
                              </span>
                              {idx < course.project.pipelineSteps.length - 1 && (
                                <ArrowRight className="w-3 h-3 text-slate-600 hidden md:block" />
                              )}
                            </div>
                            <h6 className="text-[11px] font-bold text-white mb-0.5">{step.title}</h6>
                            <p className="text-[10px] text-slate-400 leading-snug">{step.description}</p>
                          </div>
                          <div className="pt-1.5 border-t border-slate-900 text-[10px] text-indigo-300 font-mono truncate">
                            {step.tool}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        ) : (
          <div className="lg:col-span-7 xl:col-span-8 p-12 text-center bg-slate-900/60 border border-slate-800 rounded-2xl text-slate-400">
            Please select a milestone from the list to view its details.
          </div>
        )}

      </div>

    </div>
  );
};
