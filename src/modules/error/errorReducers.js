import { actions } from 'modules/error/errors';

const initialData = {
  errorMessage: null,
  errorCode: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.ERROR_SENT) {
    console.log('a ver en que momento se usa el reducer');
    console.log(payload);
    return {
      ...state,
      errorMessage: payload.error.message,
      errorCode: payload.error.code,
    };
  }

  return state;
};
