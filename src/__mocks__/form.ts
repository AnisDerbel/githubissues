import { FormStateMap } from 'redux-form';

export default {
  form: {
    registeredFields: [
      {
        count: 1,
        name: 'organization',
        type: 'Field',
      },
      {
        count: 1,
        name: 'repository',
        type: 'Field',
      },
    ],
    syncErrors: {
      organization: 'field is required',
      repository: 'field is required',
    },
    values: {
      organization: 'facebook',
      repository: 'react-native',
    },
  },
} as FormStateMap;
