import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';

import Header from 'Components/Header';
import MainView from 'Components/MainView';
import { fetchTasksJSON } from 'Store/task/actions';

export default function App(): JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasksJSON());
    // eslint-disable-next-line
  }, []);

  return (
    <Container fluid className="app-container">
      <Header />
      <MainView />
    </Container>
  );
}
