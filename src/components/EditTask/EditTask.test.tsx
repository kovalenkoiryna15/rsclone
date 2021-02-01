import * as React from 'react';
import { render } from '@testing-library/react';

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
    <EditTask
      task={newTask}
      isVisible={isVisibleEditTask}
      handleShow={setVisibleEditTask}
      addTask={addTask}
      updateTask={updateTask}
    />,
  );

  expect(getByText(/Task Name/i)).toBeInTheDocument();
});
