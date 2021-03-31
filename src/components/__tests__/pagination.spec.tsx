import 'jest';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { mount, ReactWrapper, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
import Pagination from '../Pagination';
import { Provider } from 'react-redux';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';

import { initialState } from '../../redux/repo/reducer';
import theme from '../../theme';
import { repoActions } from '../../redux/repo/actions';
import { Store } from 'redux';

const getRepoIssuesMock = jest.spyOn(repoActions, 'getRepoIssues');

const mockStore = configureMockStore();
let mockedStore: MockStoreEnhanced;
type ComponentWrapper = ReactWrapper<void, void, React.Component>;

let component: ComponentWrapper;
const onPress = jest.fn();
const getPreviousButton = () => component.find({ testID: 'previous__button' }).first();
const getNextButton = () => component.find({ testID: 'next__button' }).first();

describe('Pagination', () => {
  const renderComponent = (store: Store): ComponentWrapper =>
    mount(
      <PaperProvider theme={theme}>
        <Pagination />
      </PaperProvider>,
      {
        wrappingComponent: Provider,
        wrappingComponentProps: { store },
      },
    );

  describe('initial state', () => {
    const repoState = {
      ...initialState,
      page: 1,
    };
    beforeEach(() => {
      Pagination.prototype.onPressNext = onPress;
      mockedStore = mockStore({ repo: repoState }) as MockStoreEnhanced;
      component = renderComponent(mockedStore);
    });

    it('should show disabled previous button', () => {
      expect(getPreviousButton().props()).toMatchObject({
        children: expect.anything(),
        disabled: true,
        mode: 'contained',
        onPress: expect.any(Function),
      });
    });
    describe('on press next button', () => {
      beforeEach(() => {
        getNextButton().props().onPress();
        mockedStore = mockStore({
          repo: {
            ...initialState,
            isLoading: true,
          },
        }) as MockStoreEnhanced;
        component = renderComponent(mockedStore);
      });
      it('should dispatch getRepoIssues action with incremented page number ', async () => {
        expect(getRepoIssuesMock).toHaveBeenCalledTimes(1);
        expect(getRepoIssuesMock).toHaveBeenCalledWith({ page: repoState.page + 1 });
      });
      it('should be disabled + loading', () => {
        expect(getNextButton().props()).toMatchObject({
          children: expect.anything(),
          disabled: true,
          loading: true,
          mode: 'contained',
          onPress: expect.any(Function),
        });
        expect(getPreviousButton().props()).toMatchObject({
          children: expect.anything(),
          disabled: true,
          mode: 'contained',
          onPress: expect.any(Function),
        });
      });
    });
    describe('on press previous button', () => {
      beforeEach(() => {
        getPreviousButton().props().onPress();
      });
      it('should dispatch getRepoIssues action with decremented page number ', () => {
        expect(getRepoIssuesMock).toHaveBeenCalled();
        expect(getRepoIssuesMock).toHaveBeenCalledWith({ page: repoState.page - 1 });
      });
    });
  });
});
