import React, { useState } from 'react';
import { X, BookPlus } from 'lucide-react';
import { Course } from '../../types/course';

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  semesterName: string;
  semesterId: string;
  onAddCourse: (semesterId: string, course: Course) => void;
}

export const AddCourseModal: React.FC<AddCourseModalProps> = ({
  isOpen,
  onClose,
  semesterName,
  semesterId,
  onAddCourse,
}) => {
  const [code, setCode] = useState('');
  const [section, setSection] = useState('Sec 01');
  const [name, setName] = useState('');
  const [canvasUrl, setCanvasUrl] = useState('');
  const [instructorName, setInstructorName] = useState('');
  const [instructorEmail, setInstructorEmail] = useState('');
  const [schedule, setSchedule] = useState('Tue / Thu 6:00 PM - 7:15 PM');
  const [credits, setCredits] = useState(3);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !name.trim()) return;

    const courseId = `${code.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${section.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

    const newCourse: Course = {
      id: courseId,
      code: code.toUpperCase().trim(),
      section: section.trim(),
      name: name.trim(),
      canvasUrl: canvasUrl.trim() || undefined,
      instructor: {
        name: instructorName.trim() || 'SJSU Faculty',
        email: instructorEmail.trim() || 'faculty@sjsu.edu',
        officeHours: 'By appointment via Zoom / Canvas'
      },
      schedule: schedule.trim(),
      credits: Number(credits) || 3,
      grading: [
        { item: 'Term Project', weight: 35 },
        { item: 'Final Exam', weight: 25 },
        { item: 'Midterm', weight: 20 },
        { item: 'Assignments & Labs', weight: 20 }
      ],
      textbooks: [
        {
          title: 'Reference Course Materials & Syllabus',
          author: instructorName || 'SJSU Faculty'
        }
      ],
      modules: [
        {
          id: `${courseId}-m1`,
          week: 'Week 01-02',
          title: 'Course Introduction & Foundations',
          description: 'Overview of core objectives, prerequisite review, and tooling setup.',
          topics: ['Introduction', 'Environment Setup', 'Foundational Reading'],
          status: 'in-progress'
        }
      ],
      concepts: [
        {
          id: `${courseId}-c1`,
          name: `${code} Core Theory`,
          category: 'Fundamentals',
          mastered: false,
          description: 'Foundational framework and algorithmic methods introduced in the course.'
        }
      ],
      notes: [
        {
          id: `${courseId}-n1`,
          title: `Introductory Notes for ${code}`,
          week: 'Week 01',
          date: new Date().toISOString().split('T')[0],
          summary: `Initial learning notes and objectives for ${name}.`,
          keyPoints: ['Review syllabus requirements', 'Set up development environments and SDKs'],
          mathFormulas: [],
          codeSnippets: [],
          tags: ['Overview', 'Introduction']
        }
      ],
      project: {
        title: `${code} Applied Capstone Project`,
        subtitle: 'Scalable Implementation and Empirical Study',
        abstract: 'Course term research project applying theoretical principles to solve real-world problems.',
        problemStatement: 'Formulating end-to-end solutions, selecting appropriate models, and tuning performance.',
        pipelineSteps: [
          { step: 1, title: 'Data Ingestion', description: 'Collecting and cleaning target dataset.', tool: 'Python' },
          { step: 2, title: 'Modeling', description: 'Architecting models and training algorithms.', tool: 'PyTorch' },
          { step: 3, title: 'Evaluation', description: 'Benchmarking performance metrics.', tool: 'Scikit-Learn' }
        ],
        techStack: ['Python', 'PyTorch', 'Git'],
        metrics: [
          { label: 'Target Accuracy', value: '90%+' },
          { label: 'Latency SLA', value: '< 100ms' }
        ],
        githubUrl: '',
        demoUrl: '',
        datasetInfo: 'Course provided or publicly sourced benchmark dataset.',
        deliverables: [
          { id: 'cd-1', title: 'Project Proposal', completed: false, dueDate: '2026-10-01' },
          { id: 'cd-2', title: 'Final Report & Code', completed: false, dueDate: '2026-12-05' }
        ]
      },
      presentation: {
        title: `${code} Final Project Presentation`,
        slidesCount: 3,
        videoUrl: '',
        executiveSummary: `Executive summary covering project goals and outcomes for ${code}.`,
        keyFindings: ['Key milestone completed with positive experimental verification.'],
        qaChecklist: [
          { question: 'What was the main technical challenge?', answer: 'Ensuring model convergence and generalization.' }
        ],
        slides: [
          {
            slideNumber: 1,
            title: `${code}: Project Title`,
            subtitle: 'MSAI Graduate Defense',
            bulletPoints: ['Problem formulation', 'Proposed methodology', 'Target benchmarks'],
            speakerNotes: 'Introduction to our project objectives.'
          }
        ]
      }
    };

    onAddCourse(semesterId, newCourse);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <BookPlus className="w-5 h-5 text-blue-400" />
            <h3 className="text-base font-bold text-white">
              Add Course to {semesterName}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Course Code</label>
              <input
                type="text"
                placeholder="e.g. CMPE-258"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-800 border border-slate-700 text-slate-100 uppercase focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Section</label>
              <input
                type="text"
                placeholder="e.g. Sec 01"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Course Name / Title</label>
            <input
              type="text"
              placeholder="e.g. Deep Learning"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Canvas URL (Optional)</label>
            <input
              type="url"
              placeholder="https://sjsu.instructure.com/courses/..."
              value={canvasUrl}
              onChange={(e) => setCanvasUrl(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Instructor Name</label>
              <input
                type="text"
                placeholder="e.g. Dr. John Doe"
                value={instructorName}
                onChange={(e) => setInstructorName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Units (Credits)</label>
              <input
                type="number"
                value={credits}
                onChange={(e) => setCredits(Number(e.target.value))}
                min={1}
                max={6}
                className="w-full px-3 py-2 text-xs rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Schedule & Room</label>
            <input
              type="text"
              placeholder="e.g. Mon / Wed 7:30 PM - 8:45 PM (Engr 337)"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30"
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};