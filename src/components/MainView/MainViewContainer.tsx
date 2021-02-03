import { connect } from 'react-redux';

import * as Types from 'Store/types';
import MainView from './MainView';

const mapStateToProps = (state: Types.RootState) => ({
  isLoading: state.firebase.isLoading,
  isAuth: state.user.isAuthorized,
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default connect(mapStateToProps)(MainView);
