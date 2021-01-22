import * as React from 'react';
import Container from 'react-bootstrap/Container';

import Header from 'Components/Header';
import MainView from 'Components/MainView';

export default function App(): JSX.Element {
  return (
    <Container fluid>
      <Header />
      <MainView />
    </Container>
  );
}
