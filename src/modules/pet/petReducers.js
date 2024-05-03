import list from 'modules/pet/list/petListReducers';
import form from 'modules/pet/form/petFormReducers';
import view from 'modules/pet/view/petViewReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
});
