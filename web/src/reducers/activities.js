import { arrToObj, generateKey as defaultGenerateKey } from '../util';

// Make this thing injectible for testing.
let generateKey = defaultGenerateKey;
export const setKeyGenerator = fn => {
  generateKey = fn;
};

export const newGoal = () => ({
  key: generateKey(),
  initialCollapsed: false,
  description: '',
  objective: ''
});

export const newMilestone = (milestone = '', endDate = '') => ({
  initialCollapsed: false,
  key: generateKey(),
  milestone,
  endDate
});

export const statePersonDefaultYear = () => ({ amt: '', perc: '' });
export const newStatePerson = years => ({
  key: generateKey(),
  initialCollapsed: false,
  title: '',
  description: '',
  years: arrToObj(years, statePersonDefaultYear())
});

export const contractorDefaultYear = () => 0;
export const contractorDefaultHourly = () => ({ hours: '', rate: '' });
export const newContractor = years => ({
  key: generateKey(),
  initialCollapsed: false,
  name: '',
  description: '',
  start: '',
  end: '',
  files: [],
  totalCost: 0,
  years: arrToObj(years, contractorDefaultYear()),
  hourly: {
    useHourly: false,
    data: arrToObj(years, contractorDefaultHourly())
  }
});

export const expenseDefaultYear = () => 0;

export const newExpense = years => ({
  key: generateKey(),
  initialCollapsed: false,
  category: 'Hardware, software, and licensing',
  description: '',
  years: arrToObj(years, expenseDefaultYear())
});

export const costAllocationEntry = (other = 0, federal = 90, state = 10) => ({
  other,
  ffp: { federal, state }
});

export const quarterlyFFPEntry = () =>
  [1, 2, 3, 4].reduce(
    (acc, quarter) => ({
      ...acc,
      [quarter]: {
        state: 25,
        contractors: 25,
        combined: 25
      }
    }),
    {}
  );

export const newActivity = ({
  name = '',
  fundingSource = 'HIT',
  years = [],
  ...rest
} = {}) => ({
  alternatives: '',
  contractorResources: [newContractor(years)],
  costAllocation: arrToObj(years, costAllocationEntry()),
  costAllocationNarrative: {
    methodology: '',
    otherSources: ''
  },
  description: '',
  expenses: [newExpense(years)],
  fundingSource,
  goals: [newGoal()],
  initialCollapsed: false,
  key: generateKey(),
  name,
  plannedEndDate: '',
  plannedStartDate: '',
  schedule: [newMilestone()],
  statePersonnel: [newStatePerson(years)],
  summary: '',
  standardsAndConditions: {
    modularity: '',
    mita: '',
    industryStandards: '',
    leverage: '',
    businessResults: '',
    reporting: '',
    interoperability: '',
    mitigationStrategy: '',
    keyPersonnel: '',
    documentation: '',
    minimizeCost: ''
  },
  quarterlyFFP: arrToObj(years, quarterlyFFPEntry()),
  years,
  meta: {
    expanded: name === 'Program Administration'
  },
  ...rest
});
