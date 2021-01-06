import '../styles/styles.css';

import * as React from 'react';

export interface HelloWorldProps {
  userName: string;
  lang: string;
}

export const App = (props: HelloWorldProps) => {
  const { userName, lang } = props;
  return (
    <h1>
      Hi
      { userName }
      from React! Welcome to
      { lang }
      !
    </h1>
  );
};
