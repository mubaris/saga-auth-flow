
import { fromJS } from 'immutable';
import signoutReducer from '../reducer';

describe('signoutReducer', () => {
  it('returns the initial state', () => {
    expect(signoutReducer(undefined, {})).toEqual(fromJS({}));
  });
});
