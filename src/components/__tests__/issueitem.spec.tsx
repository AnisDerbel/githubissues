import React from 'react';
import { mount, ReactWrapper, configure } from 'enzyme';
import IssueItem, { IssueItemProps } from '../IssueItem';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider as PaperProvider } from 'react-native-paper';
import { Issue } from '../../redux/repo/reducer';
import { repoIssuesMock } from '../../__mocks__/repo';
import theme from '../../theme';
import Labels from '../Labels';
import Open from '../../assets/svgs/open.svg';
import Close from '../../assets/svgs/closed.svg';

configure({ adapter: new Adapter() });
type ComponentWrapper = ReactWrapper<IssueItemProps, void, React.Component>;

let component: ComponentWrapper;
const onPress = jest.fn();

const getOpenIcon = () => component.find(Open);
const getCloseIcon = () => component.find(Close);
const getLabels = () => component.find(Labels);
describe('IssueItem', () => {
  const renderComponent = (item: Issue): ComponentWrapper =>
    mount(
      <PaperProvider theme={theme}>
        <IssueItem item={item} onPress={onPress} />
      </PaperProvider>,
    );
  beforeEach(() => {
    component = renderComponent(repoIssuesMock.data[0]).find(IssueItem);
  });

  it('should be pressable', () => {
    component.props().onPress(repoIssuesMock.data[0].html_url);
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onPress).toHaveBeenCalledWith(repoIssuesMock.data[0].html_url);
  });

  it('should render Labels correctly', () => {
    expect(getLabels().exists()).toBeTruthy();
  });

  describe('no labels available', () => {
    beforeEach(() => {
      component = renderComponent({
        ...repoIssuesMock.data[0],
        labels: [],
      }).find(IssueItem);
    });

    it('should not render Labels', () => {
      expect(getLabels().exists()).toBeFalsy();
    });
  });
  describe('open issue', () => {
    beforeEach(() => {
      component = renderComponent({
        ...repoIssuesMock.data[0],
        state: 'open',
      }).find(IssueItem);

      console.log(component.props());
    });

    it('should show open icon when state is open', () => {
      expect(getOpenIcon().exists()).toBeTruthy();
    });
  });
  describe('close issue', () => {
    beforeEach(() => {
      component = renderComponent({
        ...repoIssuesMock.data[0],
        state: 'closed',
      }).find(IssueItem);
    });

    it('should show close icon when state is closed', () => {
      expect(getCloseIcon().exists()).toBeTruthy();
    });
  });
});
