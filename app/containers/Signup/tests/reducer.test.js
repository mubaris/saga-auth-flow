
import { fromJS } from 'immutable';
import signupReducer from '../reducer';

describe('signupReducer', () => {
  it('returns the initial state', () => {
    expect(signupReducer(undefined, {})).toEqual(fromJS({}));
  });
});
