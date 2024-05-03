import list from 'modules/booking/list/bookingListReducers';
import form from 'modules/booking/form/bookingFormReducers';
import view from 'modules/booking/view/bookingViewReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
});
