import { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot: HTMLElement | null = document.getElementById('modal-root');

export default class ModalWindow extends Component<
{ children?: JSX.Element }, { el: HTMLDivElement }
> {
  public static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  constructor(props: any) {
    super(props);
    const el = document.createElement('div');
    this.state = { el };
  }

  componentDidMount() {
    const { el } = this.state;
    if (modalRoot) {
      modalRoot.appendChild(el);
    }
  }

  componentWillUnmount() {
    const { el } = this.state;
    if (modalRoot) {
      modalRoot.removeChild(el);
    }
  }

  render() {
    const { el } = this.state;
    const { children } = this.props;
    return ReactDOM.createPortal(
      children,
      el,
    );
  }
}

ModalWindow.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
