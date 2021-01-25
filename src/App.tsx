import * as React from 'react';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';

import Footer from 'Components/Footer';
import * as MyModels from 'Store/types';
import Header from 'Components/Header';
import MainView from 'Components/MainView';
import { fetchTasksJSON } from 'Store/task/actions';
import LoginModal from 'Components/LoginModal';

export default function App(): JSX.Element {
  const dispatch = useDispatch();
  const isloggingIn = useSelector((state: MyModels.RootReducer) => {
    const { user: { loggingIn } } = state;
    return loggingIn;
  });

  useEffect(() => {
    dispatch(fetchTasksJSON());
    // eslint-disable-next-line
  }, []);

  return (
    <Container fluid className="app-container">
      <Header />
      <MainView />
      <LoginModal isVisible={!isloggingIn} />
      <Footer />
    </Container>
  );
}
