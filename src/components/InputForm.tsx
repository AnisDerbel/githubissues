import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { reduxForm, Field, InjectedFormProps } from 'redux-form';
import { Button, useTheme } from 'react-native-paper';
import Input from './Input';
import { validate } from '../validate';
import { IApplicationState } from '../redux/appReducer';
import { repoActions } from '../redux/repo/actions';

export interface IFormState {
  repository: string;
  organization: string;
}

interface IProps {
  onSuccess: () => void;
}
const InputForm = (props: InjectedFormProps<IFormState> & IProps) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: IApplicationState) => state.repo);
  const theme = useTheme();
  const { handleSubmit, onSuccess } = props;
  const onSubmit = () => {
    dispatch(repoActions.getRepoIssues({ page: 1, reset: true }));
  };

  useEffect(() => {
    if (!isLoading && error === false) onSuccess();
  }, [isLoading, error, onSuccess]);

  return (
    <View>
      <Field
        errorColor={theme.colors.error}
        maxLength={60}
        label="organization*"
        name="organization"
        component={Input}
      />
      <Field
        errorColor={theme.colors.error}
        maxLength={100}
        label="repository*"
        name="repository"
        component={Input}
      />
      <Button
        disabled={isLoading}
        loading={isLoading}
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        mode="contained"
      >
        get issues
      </Button>
    </View>
  );
};

export default reduxForm<IFormState, IProps>({
  form: 'form',
  validate,
})(InputForm as any);

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  button: {
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    marginVertical: 20,
  },
});
