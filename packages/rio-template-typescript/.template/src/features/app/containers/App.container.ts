import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getIdToken, getLanguageData, getLocale, isUserSessionExpired } from '../../../configuration';
import { config } from '../../../config';
import { State } from '../../../types';
import App from '../components/App';
import { hideSessionExpiredDialog } from '../actions/App.actions';
import { getSessionExpiredAcknowledged } from '../selectors/App.selector';
import { AppPropertiesFromDispatch, AppPropertiesFromState } from './types';

function mapDispatchToProps(dispatch: Dispatch): AppPropertiesFromDispatch {
    return {
        hideSessionDialog: () => dispatch(hideSessionExpiredDialog()),
    };
}

function mapStateToProps(state: State): AppPropertiesFromState {
    return {
        idToken: getIdToken(state),
        homeRoute: config.homeRoute as string,
        languageData: getLanguageData(state),
        showSessionExpired: isUserSessionExpired(state) && !getSessionExpiredAcknowledged(state),
        userLocale: getLocale(state),
    };
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default AppContainer;
