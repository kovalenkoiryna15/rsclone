import * as React from 'react';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';

import Footer from 'Components/Footer';
import Header from 'Components/Header';
import LoginModal from 'Components/LoginModal';
import MainView from 'Components/MainView';
import { fetchProjects } from 'Store/project/actions';
import { fetchTasksJSON } from 'Store/task/actions';
import * as MyModels from 'Store/types';
import { auth } from 'Store/src/firebase';

export default function App(): JSX.Element {
  const dispatch = useDispatch();
  const isAuth = useSelector((state: MyModels.RootState) => {
    const { user: { isAuthorized } } = state;
    return isAuthorized;
  });

  useEffect(() => {
    if (isAuth) {
      if (auth.currentUser) {
        auth.currentUser.getIdToken(/* forceRefresh */ true)
          .then((idToken) => {
            if (auth.currentUser) {
              dispatch(fetchProjects(idToken, String(auth.currentUser.uid)));
            }
          })
          .catch((error: Error) => {
            if (error && 'message' in error) {
              console.log(error.message);
            }
          });
      }
    }
    dispatch(fetchTasksJSON());
  }, [isAuth, dispatch]);

  return (
    <Container fluid className="app-container">
      <Header />
      <MainView />
      <LoginModal />
      <Footer />
    </Container>
  );
}
