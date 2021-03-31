import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import moment from 'moment';
import Labels from '../components/Labels';
import Title from '../components/Title';
import Open from '../assets/svgs/open.svg';
import Closed from '../assets/svgs/closed.svg';
import { Issue } from '../redux/repo/reducer';

export interface IssueItemProps {
  item: Issue;
  onPress: (url: string) => void;
}
const IssueItem = ({ item, onPress }: IssueItemProps) => {
  const theme = useTheme();

  const onPressIssue = () => {
    onPress(item.html_url);
  };
  return (
    <TouchableOpacity onPress={onPressIssue}>
      <View style={[{ marginHorizontal: theme.spacing.m }, styles.row]}>
        <View style={{ top: theme.spacing.xs }}>
          {item.state === 'open' ? <Open /> : <Closed />}
        </View>
        <View style={{ marginLeft: theme.spacing.m }}>
          <Title>{item.title}</Title>
          {item.labels && item.labels.length > 0 && <Labels items={item.labels} />}
          <Text
            style={[theme.variants.info, { color: theme.colors.text, marginTop: theme.spacing.s }]}
          >
            #{item.number} opened {moment(item.created_at).fromNow()} by {item.user.login}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(IssueItem);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});
