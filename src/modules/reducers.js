import { connectRouter } from 'connected-react-router';
import layout from 'modules/layout/layoutReducers';
import auth from 'modules/auth/authReducers';
import user from 'modules/user/userReducers';
import rol from 'modules/rol/rolReducers';
import error from 'modules/error/errorReducers';
import pets from 'modules/pet/petReducers';
import { combineReducers } from 'redux';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    layout,
    auth,
    user,
    rol,
    pets,
    error,
  });
