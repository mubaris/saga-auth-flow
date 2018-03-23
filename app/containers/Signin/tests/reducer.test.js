
import { fromJS } from 'immutable';
import signinReducer from '../reducer';

describe('signinReducer', () => {
  it('returns the initial state', () => {
    expect(signinReducer(undefined, {})).toEqual(fromJS({}));
  });
});
