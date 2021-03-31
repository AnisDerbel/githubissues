import { IFormState } from './components/InputForm';

export const validate = (values: IFormState) => {
  const error = {
    organization: '',
    repository: '',
  };
  if (values.organization === undefined || values.organization === '') {
    error.organization = 'field is required';
  }
  if (values.repository === undefined || values.repository === '') {
    error.repository = 'field is required';
  }
  return error;
};
