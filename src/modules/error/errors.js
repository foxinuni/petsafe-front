import Message from 'view/shared/message';
import { getHistory } from 'modules/store';
import { ourOwn, messages } from 'modules/error/errorMessages';

const DEFAULT_ERROR_MESSAGE =
  'Lo lamentamos, sucedio un error, no sabemos la causa';

export const actions = {
  ERROR_SENT: 'ERROR_SENT',
};

export default class Errors {
  static async handle(error, dispatch, path) {
    if (ourOwn.includes(error?.response?.status)) {
      const errorTag = error.response.data.error.replaceAll('-', '');
      const errorObj = messages[errorTag.split('.')[0]][errorTag.split('.')[1]];
      Message.error(errorObj.message || DEFAULT_ERROR_MESSAGE);

      if (path) {
        getHistory().push(path);
        return;
      }
      if (!errorObj.redirect) return;
    }
    if (path) {
      Message.error(error.message || DEFAULT_ERROR_MESSAGE);
      getHistory().push(path);
      return;
    }
    dispatch({
      type: actions.ERROR_SENT,
      payload: {
        error: {
          message: error?.message || DEFAULT_ERROR_MESSAGE,
          code: error?.response?.status || 500,
        },
      },
    });
    getHistory().push('/error');
    return;
  }
}
