import { createSelector } from 'reselect';

/**
 * Direct selector to the signin state domain
 */
const selectSigninDomain = (state) => state.get('signin');

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

export default makeSelectSignin;
export {
  selectSigninDomain,
};
