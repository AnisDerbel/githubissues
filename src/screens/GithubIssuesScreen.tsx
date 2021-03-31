import React, { useEffect, useRef } from 'react';
import { FlatList, View, Text, StyleSheet, Linking } from 'react-native';
import { Divider, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { IApplicationState } from '../redux/appReducer';
import { Issue } from '../redux/repo/reducer';
import Pagination from '../components/Pagination';
import IssueItem from '../components/IssueItem';
import { getCurrentIssues } from '../redux/repo/selectors';

const GithubIssuesScreen = () => {
  const theme = useTheme();
  const refList = useRef<FlatList>(null);
  const { page } = useSelector((state: IApplicationState) => state.repo);
  const issues = useSelector(getCurrentIssues);
  const {
    form: { values },
  } = useSelector((state: IApplicationState) => state.form);

  useEffect(() => {
    refList?.current?.scrollToOffset({ offset: 0 });
  }, [page]);

  const onPress = (url: string) => {
    Linking.openURL(url);
  };

  const renderItem = ({ item }: { item: Issue }) => <IssueItem onPress={onPress} item={item} />;

  const ItemSeparatorComponent = () => (
    <Divider
      style={{
        marginVertical: theme.spacing.m,
        backgroundColor: theme.colors.divider,
      }}
    />
  );

  const EmptyComponent = () => (
    <View style={styles.center}>
      <Text>No issues found!</Text>
    </View>
  );
  return (
    <View>
      {values && (
        <Text
          testID="repo_title"
          style={[theme.variants.h1, { margin: theme.spacing.m, color: theme.colors.primary }]}
        >{`${values.organization}/${values.repository}`}</Text>
      )}

      <FlatList
        ref={refList}
        keyExtractor={(item) => item.node_id}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListFooterComponent={Pagination}
        ListEmptyComponent={EmptyComponent}
        renderItem={renderItem}
        data={issues}
      />
    </View>
  );
};

export default GithubIssuesScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
  center: {
    alignItems: 'center',
  },
});
