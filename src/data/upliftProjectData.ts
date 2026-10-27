export interface UpliftSession {
  id: string;
  date: string;       // e.g. "Oct 26"
  fullDate: string;   // e.g. "2026-10-26"
  task: string;
  hourDuration: number;
}

export interface UpliftWeek {
  id: string;         // 'week-1', 'week-2', etc.
  weekNumber: number;
  label: string;      // "Week 1"
  title: string;      // "Setup and problem definition"
  dateRange: string;  // "October 26–November 1"
  startDate: string;  // "2026-10-26"
  endDate: string;    // "2026-11-01"
  deliverable: string;// "initial modeling table"
  deliverableId: string;
  saveForDecember: string;
  sessions: UpliftSession[];
}

export interface DecemberDeliverable {
  id: string;
  section: string;
  details: string;
  iconName?: string;
}

export interface WritingScheduleItem {
  step: number;
  title: string;
  duration: string;
}

export const UPLIFT_WEEKS: UpliftWeek[] = [
  {
    id: 'week-1',
    weekNumber: 1,
    label: 'Week 1',
    title: 'Setup and problem definition',
    dateRange: 'October 26–November 1',
    startDate: '2026-10-26',
    endDate: '2026-11-01',
    deliverable: 'initial modeling table',
    deliverableId: 'w1-deliv',
    saveForDecember: 'data dictionary, treatment definition, outcome definition, timeline example, and first-table explanation.',
    sessions: [
      { id: 'u-1', date: 'Oct 26', fullDate: '2026-10-26', task: 'Set up Python, Jupyter, libraries, and project folders', hourDuration: 1 },
      { id: 'u-2', date: 'Oct 27', fullDate: '2026-10-27', task: 'Load portfolio, profile, and transcript files', hourDuration: 1 },
      { id: 'u-3', date: 'Oct 28', fullDate: '2026-10-28', task: 'Inspect columns, events, missing values, and duplicates', hourDuration: 1 },
      { id: 'u-4', date: 'Oct 29', fullDate: '2026-10-29', task: 'Reconstruct chronological customer timelines', hourDuration: 1 },
      { id: 'u-5', date: 'Oct 30', fullDate: '2026-10-30', task: 'Define treatment groups using pre-conversion information', hourDuration: 1 },
      { id: 'u-6', date: 'Oct 31', fullDate: '2026-10-31', task: 'Define the conversion outcome and time window', hourDuration: 1 },
      { id: 'u-7', date: 'Nov 1',  fullDate: '2026-11-01', task: 'Build the first customer-offer modeling table', hourDuration: 1 },
    ]
  },
  {
    id: 'week-2',
    weekNumber: 2,
    label: 'Week 2',
    title: 'Data pipeline and features',
    dateRange: 'November 2–8',
    startDate: '2026-11-02',
    endDate: '2026-11-08',
    deliverable: 'clean modeling dataset',
    deliverableId: 'w2-deliv',
    saveForDecember: 'preprocessing decisions, feature list, leakage checks, dataset sizes, and train/validation/test split logic.',
    sessions: [
      { id: 'u-8',  date: 'Nov 2', fullDate: '2026-11-02', task: 'Remove duplicates, invalid events, and post-treatment leakage', hourDuration: 1 },
      { id: 'u-9',  date: 'Nov 3', fullDate: '2026-11-03', task: 'Create demographic and membership features', hourDuration: 1 },
      { id: 'u-10', date: 'Nov 4', fullDate: '2026-11-04', task: 'Create historical transaction features', hourDuration: 1 },
      { id: 'u-11', date: 'Nov 5', fullDate: '2026-11-05', task: 'Create historical offer-interaction features', hourDuration: 1 },
      { id: 'u-12', date: 'Nov 6', fullDate: '2026-11-06', task: 'Encode categorical and scale numerical variables', hourDuration: 1 },
      { id: 'u-13', date: 'Nov 7', fullDate: '2026-11-07', task: 'Create train, validation, and test splits', hourDuration: 1 },
      { id: 'u-14', date: 'Nov 8', fullDate: '2026-11-08', task: 'Validate rows, treatments, outcomes, leakage, and missingness', hourDuration: 1 },
    ]
  },
  {
    id: 'week-3',
    weekNumber: 3,
    label: 'Week 3',
    title: 'Exploration and standard baselines',
    dateRange: 'November 9–15',
    startDate: '2026-11-09',
    endDate: '2026-11-15',
    deliverable: 'baseline benchmarks',
    deliverableId: 'w3-deliv',
    saveForDecember: 'EDA plots, treatment counts, conversion table, baseline settings, predictions, and first observations.',
    sessions: [
      { id: 'u-15', date: 'Nov 9',  fullDate: '2026-11-09', task: 'Explore age, income, tenure, spending, and frequency', hourDuration: 1 },
      { id: 'u-16', date: 'Nov 10', fullDate: '2026-11-10', task: 'Analyze treatment-group distribution', hourDuration: 1 },
      { id: 'u-17', date: 'Nov 11', fullDate: '2026-11-11', task: 'Analyze conversion rates by treatment', hourDuration: 1 },
      { id: 'u-18', date: 'Nov 12', fullDate: '2026-11-12', task: 'Check feature balance between treatment groups', hourDuration: 1 },
      { id: 'u-19', date: 'Nov 13', fullDate: '2026-11-13', task: 'Implement random-targeting baseline', hourDuration: 1 },
      { id: 'u-20', date: 'Nov 14', fullDate: '2026-11-14', task: 'Train logistic-regression response model', hourDuration: 1 },
      { id: 'u-21', date: 'Nov 15', fullDate: '2026-11-15', task: 'Train LightGBM and save baseline results', hourDuration: 1 },
    ]
  },
  {
    id: 'week-4',
    weekNumber: 4,
    label: 'Week 4',
    title: 'Uplift evaluation and T-Learner',
    dateRange: 'November 16–22',
    startDate: '2026-11-16',
    endDate: '2026-11-22',
    deliverable: 'causal baseline',
    deliverableId: 'w4-deliv',
    saveForDecember: 'AUUC/Qini formulas, metric code, plots, T-Learner design, model settings, and baseline comparison table.',
    sessions: [
      { id: 'u-22', date: 'Nov 16', fullDate: '2026-11-16', task: 'Implement uplift-gain calculation', hourDuration: 1 },
      { id: 'u-23', date: 'Nov 17', fullDate: '2026-11-17', task: 'Implement AUUC and uplift curve', hourDuration: 1 },
      { id: 'u-24', date: 'Nov 18', fullDate: '2026-11-18', task: 'Implement Qini curve and Qini score', hourDuration: 1 },
      { id: 'u-25', date: 'Nov 19', fullDate: '2026-11-19', task: 'Understand and plan the T-Learner', hourDuration: 1 },
      { id: 'u-26', date: 'Nov 20', fullDate: '2026-11-20', task: 'Implement one outcome model per treatment arm', hourDuration: 1 },
      { id: 'u-27', date: 'Nov 21', fullDate: '2026-11-21', task: 'Generate treatment-specific uplift predictions', hourDuration: 1 },
      { id: 'u-28', date: 'Nov 22', fullDate: '2026-11-22', task: 'Evaluate T-Learner using AUUC, Qini, and uplift-at-k', hourDuration: 1 },
    ]
  },
  {
    id: 'week-5',
    weekNumber: 5,
    label: 'Week 5',
    title: 'Multi-tower PyTorch model',
    dateRange: 'November 23–29',
    startDate: '2026-11-23',
    endDate: '2026-11-29',
    deliverable: 'trained main model and ablation',
    deliverableId: 'w5-deliv',
    saveForDecember: 'architecture diagram, loss explanation, hyperparameters, training curves, model outputs, utility formula, and ablation results.',
    sessions: [
      { id: 'u-29', date: 'Nov 23', fullDate: '2026-11-23', task: 'Convert features, treatment, and outcome into PyTorch tensors', hourDuration: 1 },
      { id: 'u-30', date: 'Nov 24', fullDate: '2026-11-24', task: 'Build the shared representation network', hourDuration: 1 },
      { id: 'u-31', date: 'Nov 25', fullDate: '2026-11-25', task: 'Add control and treatment-specific output towers', hourDuration: 1 },
      { id: 'u-32', date: 'Nov 26', fullDate: '2026-11-26', task: 'Implement observed-arm binary-cross-entropy loss', hourDuration: 1 },
      { id: 'u-33', date: 'Nov 27', fullDate: '2026-11-27', task: 'Train, debug, and validate the neural model', hourDuration: 1 },
      { id: 'u-34', date: 'Nov 28', fullDate: '2026-11-28', task: 'Generate uplift predictions and add utility ranking', hourDuration: 1 },
      { id: 'u-35', date: 'Nov 29', fullDate: '2026-11-29', task: 'Estimate propensities and train the IPS ablation', hourDuration: 1 },
    ]
  },
  {
    id: 'week-freeze',
    weekNumber: 6,
    label: 'Final Freeze',
    title: 'Final results freeze',
    dateRange: 'November 30',
    startDate: '2026-11-30',
    endDate: '2026-11-30',
    deliverable: 'complete experimental package',
    deliverableId: 'freeze-deliv',
    saveForDecember: 'final results folder, final figures, final comparison table, model settings, and a short explanation of the best model.',
    sessions: [
      { id: 'u-36', date: 'Nov 30', fullDate: '2026-11-30', task: 'Finalize AUUC, Qini, uplift-at-k, profit, ROI, plots, tables, and reproducibility checks', hourDuration: 1 },
    ]
  }
];

export const TOTAL_SESSIONS_COUNT = 36;

export const DECEMBER_DELIVERABLES: DecemberDeliverable[] = [
  { id: 'd-1', section: 'Introduction', details: 'problem, motivation, and objective' },
  { id: 'd-2', section: 'Dataset', details: 'files, features, treatments, and outcome' },
  { id: 'd-3', section: 'Methodology', details: 'preprocessing and causal assumptions' },
  { id: 'd-4', section: 'Models', details: 'baselines, T-Learner, and multi-tower network' },
  { id: 'd-5', section: 'Evaluation', details: 'AUUC, Qini, uplift-at-k, profit, and ROI' },
  { id: 'd-6', section: 'Results', details: 'tables, plots, comparison, and observations' },
  { id: 'd-7', section: 'Limitations', details: 'observational data, positivity, and no live A/B test' },
  { id: 'd-8', section: 'Conclusion', details: 'findings and possible future work' },
];

export const SIX_HOUR_WRITING_SCHEDULE: WritingScheduleItem[] = [
  { step: 1, title: 'Introduction, problem, and objectives', duration: 'Hour 1' },
  { step: 2, title: 'Dataset, preprocessing, treatment, and outcome', duration: 'Hour 2' },
  { step: 3, title: 'Baseline models and multi-tower architecture', duration: 'Hour 3' },
  { step: 4, title: 'Metrics, experiments, and results', duration: 'Hour 4' },
  { step: 5, title: 'Discussion, limitations, and conclusion', duration: 'Hour 5' },
  { step: 6, title: 'Figures, references, formatting, and proofreading', duration: 'Hour 6' },
];
