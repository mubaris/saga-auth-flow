import { fromJS } from 'immutable';

const initialState = fromJS({
  isAuthenticated: !!localStorage.getItem('token'),
});

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
