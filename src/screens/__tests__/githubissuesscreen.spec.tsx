import 'jest';
import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { mount, ReactWrapper, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
import { Provider } from 'react-redux';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import formMock from '../../__mocks__/form';
import { repoIssuesMock } from '../../__mocks__/repo';
import { initialState } from '../../redux/repo/reducer';
import theme from '../../theme';
import { Store } from 'redux';
import GithubIssuesScreen from '../GithubIssuesScreen';
import { FlatList } from 'react-native';
import IssueItem from '../../components/IssueItem';
const mockStore = configureMockStore();
let mockedStore: MockStoreEnhanced;
type ComponentWrapper = ReactWrapper<void, void, React.Component>;
let component: ComponentWrapper;

const getTitle = () => component.find({ testID: 'repo_title' }).first();

describe('GithubIssuesScreen', () => {
  const renderComponent = (store: Store): ComponentWrapper =>
    mount(
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <GithubIssuesScreen />
        </PaperProvider>
      </Provider>,
    );

  describe('render first page', async () => {
    const repoState = {
      ...initialState,
      page: 1,
      issues: { 1: repoIssuesMock.data },
    };
    beforeEach(() => {
      mockedStore = mockStore({ repo: repoState, form: formMock }) as MockStoreEnhanced;
      component = renderComponent(mockedStore);
    });

    it('should render title correctly', () => {
      expect(getTitle().text()).toEqual(
        `${formMock.form.values?.organization}/${formMock.form.values?.repository}`,
      );
    });

    it('should render rows based on issues returned per page', () => {
      expect(component.find(FlatList).length).toBe(1);
      expect(component.find(IssueItem).length).toBe(repoIssuesMock.data.length);
    });
  });
});
