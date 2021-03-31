import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { getColor } from '../utils/utils';
import { Label } from '../redux/repo/reducer';

const Labels = ({ items }: { items: Array<Label> }) => {
  const theme = useTheme();

  return (
    <View style={styles.wrapper}>
      {items.map((item) => {
        const backgroundColor = `#${item.color}`;
        const borderWidth = item.color === 'ffffff' ? 0.5 : 0;
        return (
          <View
            key={item.id}
            style={[
              {
                backgroundColor,
                borderWidth,
              },
              styles.tag,
            ]}
          >
            <Text style={[theme.variants.tag, { color: getColor(item.color) }]}>{item.name}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default Labels;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tag: {
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 5,
    borderColor: '#363636',
    marginBottom: 5,
  },
});
