import { createSelector } from 'reselect';

/**
 * Direct selector to the signin state domain
 */
const selectSigninDomain = (state) => state.get('signin');

const globalState = (state) => state.get('global');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Signin
 */

const makeSelectSignin = () => createSelector(
  selectSigninDomain,
  (substate) => substate.toJS()
);

const makeAuthState = () => createSelector(
  globalState,
  (substate) => substate.get('isAuthenticated')
);

// export default makeSelectSignin;
export {
  makeSelectSignin,
  makeAuthState,
};
