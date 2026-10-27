export interface AuroraSession {
  id: string;
  date: string;       // e.g. "Oct 26"
  fullDate: string;   // e.g. "2026-10-26"
  task: string;
  hourDuration: number;
}

export interface AuroraWeek {
  id: string;         // 'week-1', 'week-2', etc.
  weekNumber: number;
  label: string;      // "Week 1"
  title: string;      // "Setup"
  dateRange: string;  // "October 26–November 1"
  startDate: string;  // "2026-10-26"
  endDate: string;    // "2026-11-01"
  deliverable: string;// "working data pipeline & verified forward pass"
  deliverableId: string;
  saveForDecember: string;
  sessions: AuroraSession[];
}

export interface DecemberDeliverable {
  id: string;
  section: string;
  details: string;
}

export interface WritingScheduleItem {
  step: number;
  title: string;
  duration: string;
}

export const AURORA_WEEKS: AuroraWeek[] = [
  {
    id: 'week-1',
    weekNumber: 1,
    label: 'Week 1',
    title: 'Setup',
    dateRange: 'October 26–November 1',
    startDate: '2026-10-26',
    endDate: '2026-11-01',
    deliverable: 'working data pipeline & verified forward pass',
    deliverableId: 'aurora-w1-deliv',
    saveForDecember: 'environment specifications, dataset statistics, tokenization pipeline, data loader dimensions, and setup documentation.',
    sessions: [
      { id: 'aurora-1', date: 'Oct 26', fullDate: '2026-10-26', task: 'Create folders and install libraries', hourDuration: 1 },
      { id: 'aurora-2', date: 'Oct 27', fullDate: '2026-10-27', task: 'Load and inspect the SST-2 dataset', hourDuration: 1 },
      { id: 'aurora-3', date: 'Oct 28', fullDate: '2026-10-28', task: 'Implement tokenization', hourDuration: 1 },
      { id: 'aurora-4', date: 'Oct 29', fullDate: '2026-10-29', task: 'Create data loaders', hourDuration: 1 },
      { id: 'aurora-5', date: 'Oct 30', fullDate: '2026-10-30', task: 'Load roberta-base', hourDuration: 1 },
      { id: 'aurora-6', date: 'Oct 31', fullDate: '2026-10-31', task: 'Test one forward pass', hourDuration: 1 },
      { id: 'aurora-7', date: 'Nov 1',  fullDate: '2026-11-01', task: 'Clean and document the setup', hourDuration: 1 },
    ]
  },
  {
    id: 'week-2',
    weekNumber: 2,
    label: 'Week 2',
    title: 'Full fine-tuning',
    dateRange: 'November 2–8',
    startDate: '2026-11-02',
    endDate: '2026-11-08',
    deliverable: 'trained full fine-tuning baseline results',
    deliverableId: 'aurora-w2-deliv',
    saveForDecember: 'classification head architecture, training and evaluation loops, accuracy and F1 metrics, and baseline results.',
    sessions: [
      { id: 'aurora-8',  date: 'Nov 2', fullDate: '2026-11-02', task: 'Create the classification model', hourDuration: 1 },
      { id: 'aurora-9',  date: 'Nov 3', fullDate: '2026-11-03', task: 'Write the training loop', hourDuration: 1 },
      { id: 'aurora-10', date: 'Nov 4', fullDate: '2026-11-04', task: 'Write the evaluation loop', hourDuration: 1 },
      { id: 'aurora-11', date: 'Nov 5', fullDate: '2026-11-05', task: 'Add accuracy and F1 metrics', hourDuration: 1 },
      { id: 'aurora-12', date: 'Nov 6', fullDate: '2026-11-06', task: 'Run a small debugging experiment', hourDuration: 1 },
      { id: 'aurora-13', date: 'Nov 7', fullDate: '2026-11-07', task: 'Run full fine-tuning', hourDuration: 1 },
      { id: 'aurora-14', date: 'Nov 8', fullDate: '2026-11-08', task: 'Save baseline results', hourDuration: 1 },
    ]
  },
  {
    id: 'week-3',
    weekNumber: 3,
    label: 'Week 3',
    title: 'LoRA',
    dateRange: 'November 9–15',
    startDate: '2026-11-09',
    endDate: '2026-11-15',
    deliverable: 'trained LoRA adapter benchmark & parameter profiles',
    deliverableId: 'aurora-w3-deliv',
    saveForDecember: 'LoRA linear formulation (ΔW = BA), trainable parameter counts, training time, memory profile, and LoRA vs Full FT comparison.',
    sessions: [
      { id: 'aurora-15', date: 'Nov 9',  fullDate: '2026-11-09', task: 'Study ΔW = BA', hourDuration: 1 },
      { id: 'aurora-16', date: 'Nov 10', fullDate: '2026-11-10', task: 'Add LoRA to RoBERTa', hourDuration: 1 },
      { id: 'aurora-17', date: 'Nov 11', fullDate: '2026-11-11', task: 'Check trainable parameters', hourDuration: 1 },
      { id: 'aurora-18', date: 'Nov 12', fullDate: '2026-11-12', task: 'Test LoRA on a small subset', hourDuration: 1 },
      { id: 'aurora-19', date: 'Nov 13', fullDate: '2026-11-13', task: 'Train LoRA', hourDuration: 1 },
      { id: 'aurora-20', date: 'Nov 14', fullDate: '2026-11-14', task: 'Measure time and memory', hourDuration: 1 },
      { id: 'aurora-21', date: 'Nov 15', fullDate: '2026-11-15', task: 'Save and compare LoRA results', hourDuration: 1 },
    ]
  },
  {
    id: 'week-4',
    weekNumber: 4,
    label: 'Week 4',
    title: 'AuroRA',
    dateRange: 'November 16–22',
    startDate: '2026-11-16',
    endDate: '2026-11-22',
    deliverable: 'integrated AuroRA nonlinear adapter module',
    deliverableId: 'aurora-w4-deliv',
    saveForDecember: 'AuroRA adapter design, matrix A/B implementations, GELU/SiLU nonlinear activations, dimension and gradient verification notes.',
    sessions: [
      { id: 'aurora-22', date: 'Nov 16', fullDate: '2026-11-16', task: 'Design the AuroRA adapter', hourDuration: 1 },
      { id: 'aurora-23', date: 'Nov 17', fullDate: '2026-11-17', task: 'Implement matrix A', hourDuration: 1 },
      { id: 'aurora-24', date: 'Nov 18', fullDate: '2026-11-18', task: 'Implement GELU or SiLU', hourDuration: 1 },
      { id: 'aurora-25', date: 'Nov 19', fullDate: '2026-11-19', task: 'Implement matrix B', hourDuration: 1 },
      { id: 'aurora-26', date: 'Nov 20', fullDate: '2026-11-20', task: 'Combine the adapter with the base layer', hourDuration: 1 },
      { id: 'aurora-27', date: 'Nov 21', fullDate: '2026-11-21', task: 'Test dimensions and gradients', hourDuration: 1 },
      { id: 'aurora-28', date: 'Nov 22', fullDate: '2026-11-22', task: 'Integrate AuroRA into RoBERTa', hourDuration: 1 },
    ]
  },
  {
    id: 'week-5',
    weekNumber: 5,
    label: 'Week 5',
    title: 'Final experiments',
    dateRange: 'November 23–29',
    startDate: '2026-11-23',
    endDate: '2026-11-29',
    deliverable: 'trained AuroRA model, comparison tables & checkpoints',
    deliverableId: 'aurora-w5-deliv',
    saveForDecember: 'instability fixes, convergence curves, comparison tables, final accuracy/F1/memory metrics, plots, and saved checkpoints.',
    sessions: [
      { id: 'aurora-29', date: 'Nov 23', fullDate: '2026-11-23', task: 'Run a small AuroRA test', hourDuration: 1 },
      { id: 'aurora-30', date: 'Nov 24', fullDate: '2026-11-24', task: 'Fix errors and instability', hourDuration: 1 },
      { id: 'aurora-31', date: 'Nov 25', fullDate: '2026-11-25', task: 'Train the main AuroRA model', hourDuration: 1 },
      { id: 'aurora-32', date: 'Nov 26', fullDate: '2026-11-26', task: 'Repeat failed or suspicious runs', hourDuration: 1 },
      { id: 'aurora-33', date: 'Nov 27', fullDate: '2026-11-27', task: 'Measure all final metrics', hourDuration: 1 },
      { id: 'aurora-34', date: 'Nov 28', fullDate: '2026-11-28', task: 'Create comparison tables', hourDuration: 1 },
      { id: 'aurora-35', date: 'Nov 29', fullDate: '2026-11-29', task: 'Create plots and save checkpoints', hourDuration: 1 },
    ]
  },
  {
    id: 'week-freeze',
    weekNumber: 6,
    label: 'Final Freeze',
    title: 'Verification & freeze',
    dateRange: 'November 30',
    startDate: '2026-11-30',
    endDate: '2026-11-30',
    deliverable: 'complete experimental evaluation package',
    deliverableId: 'aurora-freeze-deliv',
    saveForDecember: 'verified code, results, logs, comparison tables, plots, and reproducibility checklist.',
    sessions: [
      { id: 'aurora-36', date: 'Nov 30', fullDate: '2026-11-30', task: 'Verify code, results, logs, tables, plots, and reproducibility', hourDuration: 1 },
    ]
  }
];

export const TOTAL_AURORA_SESSIONS_COUNT = 36;

export const DECEMBER_AURORA_DELIVERABLES: DecemberDeliverable[] = [
  { id: 'ad-1', section: 'Introduction', details: 'problem, motivation, and PEFT objective' },
  { id: 'ad-2', section: 'Dataset & Setup', details: 'SST-2 dataset, tokenization, and dataloaders' },
  { id: 'ad-3', section: 'Full Fine-Tuning Baseline', details: 'classification model, training setup, and baseline results' },
  { id: 'ad-4', section: 'LoRA Implementation', details: 'ΔW = BA derivation, parameter reduction, time, and memory' },
  { id: 'ad-5', section: 'AuroRA Adapter', details: 'matrix A, GELU/SiLU nonlinear layer, matrix B, and RoBERTa integration' },
  { id: 'ad-6', section: 'Evaluation & Metrics', details: 'accuracy, F1 score, training time, and GPU memory usage' },
  { id: 'ad-7', section: 'Results & Comparison', details: 'comparison tables (Full FT vs LoRA vs AuroRA), plots, and error fixes' },
  { id: 'ad-8', section: 'Conclusion & Defense', details: 'reproducibility summary, conclusions, and presentation defense' },
];

export const SIX_HOUR_AURORA_WRITING_SCHEDULE: WritingScheduleItem[] = [
  { step: 1, title: 'Introduction, problem, and PEFT objectives', duration: 'Hour 1' },
  { step: 2, title: 'SST-2 dataset, tokenization, and setup documentation', duration: 'Hour 2' },
  { step: 3, title: 'Full fine-tuning and LoRA baseline results', duration: 'Hour 3' },
  { step: 4, title: 'AuroRA adapter design, nonlinear layers, and architecture', duration: 'Hour 4' },
  { step: 5, title: 'Experimental metrics, comparison tables, and plots', duration: 'Hour 5' },
  { step: 6, title: 'Final report proofreading, formatting, and presentation deck', duration: 'Hour 6' },
];
