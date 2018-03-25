import { createSelector } from 'reselect';

/**
 * Direct selector to the signout state domain
 */
const selectSignoutDomain = (state) => state.get('signout');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Signout
 */

const makeSelectSignout = () => createSelector(
  selectSignoutDomain,
  (substate) => substate.toJS()
);

export default makeSelectSignout;
export {
  selectSignoutDomain,
};
