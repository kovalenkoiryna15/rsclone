import * as React from 'react';
import { Row, Col } from 'react-bootstrap';

import GitHubLogo from 'Assets/icons/github-logo.svg';
import RsSchoolLogo from 'Assets/icons/rsschool-logo.svg';

export default function Footer(): JSX.Element {
  return (
    <footer className="footer bg-dark text-center row">
      <Col className="footer-col" md={3} sm={12}>
        RSClone Tracking Time, 2021 (JS2020Q3)
      </Col>
      <Col className="footer-col" md={7} sm={12}>
        <Row className="flex-grow-1">
          <Col>
            <a
              className="collaborator"
              href="https://github.com/aplatkouski"
              target="blank"
            >
              &copy; Artsiom Platkouski &nbsp;
              <img alt="GitHub logo" src={GitHubLogo} />
            </a>
          </Col>
          <Col>
            <a
              className="collaborator"
              href="https://github.com/kovalenkoiryna15"
              target="blank"
            >
              &copy; Iryna Kavalenka &nbsp;
              <img alt="GitHub logo" src={GitHubLogo} />
            </a>
          </Col>
          <Col>
            <a
              className="collaborator"
              href="https://github.com/DmitryBogdan90"
              target="blank"
            >
              &copy; Dmitry Bogdan &nbsp;
              <img alt="GitHub logo" src={GitHubLogo} />
            </a>
          </Col>
        </Row>
      </Col>
      <Col className="footer-col" md={2} sm={12}>
        <a className="rsschool-logo" href="https://rs.school/js/" target="blank">
          <img alt="RSSchool logo" src={RsSchoolLogo} />
        </a>
      </Col>
    </footer>
  );
}
