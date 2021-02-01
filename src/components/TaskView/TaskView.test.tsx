import * as React from 'react';
import { render } from '@testing-library/react';

import ITask from 'Entities/task-entities';
import TaskView from './TaskView';

test('renders TaskView', () => {
  let isVisibleTaskView = true;
  const setVisibleTaskView = jest
    .fn()
    .mockImplementationOnce(() => {
      isVisibleTaskView = false;
    })
    .mockImplementationOnce(() => {
      isVisibleTaskView = true;
    })
    .mockImplementationOnce(() => 'second call')
    .mockName('setVisibleTaskView');
  const addTask = jest.fn().mockName('addTask');
  const updateTask = jest.fn().mockName('updateTask');
  const newTask: ITask = {
    id: '',
    title: '',
    isCompleted: false,
  };
  const { getByText } = render(
    <TaskView
      task={newTask}
      isVisible={isVisibleTaskView}
      handleShow={setVisibleTaskView}
      addTask={addTask}
      updateTask={updateTask}
    />,
  );

  expect(getByText(/Task Name/i)).toBeInTheDocument();
});
