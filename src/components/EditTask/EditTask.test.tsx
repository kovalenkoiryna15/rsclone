import { render } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import store from 'Store/store';

import ITask from 'Entities/task-entities';
import EditTask from './EditTask';

test('renders EditTask', () => {
  let isVisibleEditTask = true;
  const setVisibleEditTask = jest
    .fn()
    .mockImplementationOnce(() => {
      isVisibleEditTask = false;
    })
    .mockImplementationOnce(() => {
      isVisibleEditTask = true;
    })
    .mockImplementationOnce(() => 'second call')
    .mockName('setVisibleEditTask');
  const addTask = jest.fn().mockName('addTask');
  const updateTask = jest.fn().mockName('updateTask');
  const newTask: ITask = {
    id: '',
    title: '',
    isCompleted: false,
  };
  const { getByText } = render(
    <Provider store={store}>
      <EditTask
        task={newTask}
        userID=""
        isVisible={isVisibleEditTask}
        handleShow={setVisibleEditTask}
        addTask={addTask}
        updateTask={updateTask}
      />
    </Provider>,
  );

  expect(getByText(/Task Name/i)).toBeInTheDocument();
});
