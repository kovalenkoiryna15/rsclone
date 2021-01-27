import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import auth from 'Store/user/src/firebase';
import Container from 'react-bootstrap/Container';

import Footer from 'Components/Footer';
import * as MyModels from 'Store/types';
import Header from 'Components/Header';
import MainView from 'Components/MainView';
import { fetchTasksJSON } from 'Store/task/actions';
import LoginModal from 'Components/LoginModal';
import { fetchProjects } from 'Store/project/actions';

export default function App(): JSX.Element {
  const dispatch = useDispatch();
  const isloggingIn = useSelector((state: MyModels.RootReducer) => {
    const { user: { loggingIn } } = state;
    return loggingIn;
  });

  useEffect(() => {
    if (isloggingIn) {
      if (auth.currentUser) {
        auth.currentUser.getIdToken(/* forceRefresh */ true)
          .then((idToken) => {
            dispatch(fetchProjects(idToken));
          })
          .catch((error: Error | null) => {
            if (error && 'message' in error) {
              console.log(error.message);
            }
          });
      }
    }
    dispatch(fetchTasksJSON());
    // eslint-disable-next-line
  }, [isloggingIn]);

  return (
    <Container fluid className="app-container">
      <Header />
      <MainView />
      <LoginModal />
      <Footer />
    </Container>
  );
}
