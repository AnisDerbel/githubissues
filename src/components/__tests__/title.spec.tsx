import React from 'react';
import { mount, ReactWrapper, configure } from 'enzyme';
import { IssueItemProps } from '../IssueItem';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider as PaperProvider } from 'react-native-paper';
import { repoIssuesMock } from '../../__mocks__/repo';
import theme from '../../theme';
import Title, { renderText } from '../Title';
import ParsedText from 'react-native-parsed-text';

configure({ adapter: new Adapter() });
type ComponentWrapper = ReactWrapper<IssueItemProps, void, React.Component>;

let component: ComponentWrapper;

describe('Title', () => {
  const renderComponent = (title: string): ComponentWrapper =>
    mount(
      <PaperProvider theme={theme}>
        <Title>{title}</Title>
      </PaperProvider>,
    );
  beforeEach(() => {
    component = renderComponent(repoIssuesMock.data[0].title);
  });

  it('should render title correctly', () => {
    expect(component.find(ParsedText).text()).toEqual(repoIssuesMock.data[0].title);
  });

  it('should return plain text if surrounding with quotes', () => {
    expect(renderText('`this is highlighted`')).toEqual('this is highlighted');
    expect(renderText('`this is not highlighted')).toEqual('`this is not highlighted');
    expect(renderText('this is not highlighted')).toEqual('this is not highlighted');
  });
});
