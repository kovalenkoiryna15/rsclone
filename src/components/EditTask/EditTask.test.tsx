import { render } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';
import store from 'States/store';

import ITask from 'Entities/task-entities';
import EditTask from './EditTask';

test('renders EditTask', () => {
  const TASK_TITLE = 'TASK_TITLE';
  let isVisibleEdit = true;
  const hideEdit = jest
    .fn()
    .mockImplementationOnce(() => {
      isVisibleEdit = false;
    })
    .mockImplementationOnce(() => 'second call')
    .mockName('hideEdit');
  const deselectTask = jest.fn().mockName('deselectTask');
  const addTask = jest.fn().mockName('addTask');
  const updateTask = jest.fn().mockName('updateTask');
  const newTask: ITask = {
    id: '',
    title: TASK_TITLE,
    isCompleted: false,
  };
  const { getByText } = render(
    <Provider store={store}>
      <EditTask
        addTask={addTask}
        deselectTask={deselectTask}
        hideEdit={hideEdit}
        isVisible={isVisibleEdit}
        task={newTask}
        updateTask={updateTask}
        userID=""
      />
    </Provider>
  );

  expect(getByText(/Task Name/i)).toBeInTheDocument();
});
