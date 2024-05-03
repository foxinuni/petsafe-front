import { connectRouter } from 'connected-react-router';
import layout from 'modules/layout/layoutReducers';
import auth from 'modules/auth/authReducers';
import user from 'modules/user/userReducers';
import auditLog from 'modules/auditLog/auditLogReducers';
import rol from 'modules/rol/rolReducers';
import pet from 'modules/pet/petReducers';
import error from 'modules/error/errorReducers';
import booking from 'modules/booking/bookingReducers';
import { combineReducers } from 'redux';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    layout,
    auth,
    user,
    auditLog,
    pet,
    rol,
    error,
    booking,
  });
