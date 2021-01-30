import * as React from 'react';
import { useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
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
  const isStillLoading = useSelector((state: MyModels.RootState) => {
    const { projects: { isLoading } } = state;
    return isLoading;
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
          .catch(() => {});
      }
    }
    dispatch(fetchTasksJSON());
  }, [isAuth, dispatch]);

  if (isAuth && isStillLoading) {
    return (
      <div className="vw-100 vh-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status" variant="primary" />
      </div>
    );
  }

  return (
    <Container fluid className="app-container">
      <Header />
      <MainView />
      <LoginModal />
      <Footer />
    </Container>
  );
}
