import 'jest';
import React from 'react';
import { Button, Provider as PaperProvider } from 'react-native-paper';
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
import InputForm from '../InputForm';
const mockStore = configureMockStore();
let mockedStore: MockStoreEnhanced;
type ComponentWrapper = ReactWrapper<void, void, React.Component>;
let component: ComponentWrapper;

const onSuccess = jest.fn();
describe('InputForm', () => {
  const renderComponent = (store: Store): ComponentWrapper =>
    mount(
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <InputForm onSuccess={onSuccess} />
        </PaperProvider>
      </Provider>,
    );

  describe('when fetch issues is failed', async () => {
    const repoState = {
      ...initialState,
      page: 1,
      error: true,
      isLoading: false,
    };
    beforeEach(() => {
      mockedStore = mockStore({ repo: repoState, form: formMock }) as MockStoreEnhanced;
      renderComponent(mockedStore);
    });

    it('should not call on Success', () => {
      expect(onSuccess).toHaveBeenCalledTimes(0);
    });
  });
  describe('when fetch issues is success', async () => {
    const repoState = {
      ...initialState,
      page: 1,
      error: false,
      isLoading: false,
      issues: { 1: repoIssuesMock.data },
    };
    beforeEach(() => {
      mockedStore = mockStore({ repo: repoState, form: formMock }) as MockStoreEnhanced;
      renderComponent(mockedStore);
    });

    it('should call on Success', () => {
      expect(onSuccess).toHaveBeenCalledTimes(1);
    });
  });

  describe('when fetching issues', async () => {
    const repoState = {
      ...initialState,
      page: 1,
      isLoading: true,
    };
    beforeEach(() => {
      mockedStore = mockStore({ repo: repoState, form: formMock }) as MockStoreEnhanced;
      component = renderComponent(mockedStore);
    });

    it('should disable the button + show loading ', () => {
      expect(component.find(Button).props()).toMatchObject({
        children: expect.anything(),
        onPress: expect.any(Function),
        disabled: true,
        loading: true,
      });
    });
  });
});
