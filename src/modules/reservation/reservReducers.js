import list from 'modules/booking/list/bookingListReducers';
import form from 'modules/booking/form/bookingFormReducers';
import view from 'modules/booking/view/bookingViewReducers';
import actions from 'modules/reservation/reservListActions';
import paginationReducer from 'modules/shared/pagination/paginationReducer';
import { combineReducers } from 'redux';

export default combineReducers({
  list: paginationReducer(actions),
  form,
  view,
});
