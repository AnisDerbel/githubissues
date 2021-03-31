import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '../redux/appReducer';
import { repoActions } from '../redux/repo/actions';
import { Button } from 'react-native-paper';

const Pagination = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { page, hasMoreIssues, isLoading } = useSelector((state: IApplicationState) => state.repo);
  const isPreviousDisabled = page === 1 || isLoading;
  const isNextDisabled = hasMoreIssues === false || isLoading;

  const onPressNext = () => {
    dispatch(repoActions.getRepoIssues({ page: page + 1 }));
  };
  const onPressPrevious = () => {
    dispatch(repoActions.getRepoIssues({ page: page - 1 }));
  };

  return (
    <View style={[styles.row, { margin: theme.spacing.l }]}>
      <Button
        testID="previous__button"
        disabled={isPreviousDisabled}
        onPress={onPressPrevious}
        mode="contained"
      >
        Previous
      </Button>
      <Button
        testID="next__button"
        disabled={isNextDisabled}
        loading={isLoading}
        onPress={onPressNext}
        mode="contained"
      >
        Next
      </Button>
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
