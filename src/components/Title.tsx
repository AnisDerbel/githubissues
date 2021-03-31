import React from 'react';
import { useTheme } from 'react-native-paper';
import ParsedText from 'react-native-parsed-text';

export const renderText = (matchingString: string) => {
  const pattern = /`([^`]*)`/;
  const match = matchingString.match(pattern);
  return match && match.length > 1 ? match[1] : matchingString;
};

const Title = ({ children }: { children: string }) => {
  const theme = useTheme();
  return (
    <ParsedText
      style={[theme.variants.body, { color: theme.colors.primary, marginRight: theme.spacing.m }]}
      parse={[
        {
          pattern: /`([^`]*)`/,
          style: {
            backgroundColor: theme.colors.accent,
            color: theme.colors.badge,
          },
          renderText,
        },
      ]}
    >
      {children}
    </ParsedText>
  );
};

export default Title;
