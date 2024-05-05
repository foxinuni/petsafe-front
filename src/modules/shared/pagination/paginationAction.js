import Errors from 'modules/error/errors';
import { momentToUnix } from 'modules/shared/dates';

export default (prefix, fetchFn, selectors) => {
  const actions = {
    FETCH_STARTED: `${prefix}_FETCH_STARTED`,
    FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
    FETCH_ERROR: `${prefix}_FETCH_ERROR`,

    RESETED: `${prefix}_RESETED`,
    SELECTEDS_CHANGED: `${prefix}_SELECTEDS_CHANGED`,

    PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,
    SORTER_CHANGED: `${prefix}_SORTER_CHANGED`,

    doReset: () => async (dispatch) => {
      dispatch({
        type: actions.RESETED,
      });

      dispatch(actions.doFetch());
    },

    doChangePaginationAndSort:
      (pagination, filter, sorter, token, orderBy) =>
      async (dispatch, getState) => {
        dispatch({
          type: actions.PAGINATION_CHANGED,
          payload: pagination,
        });
        dispatch(actions.doFetch(filter, token, true, orderBy));
      },

    doFetch:
      (filter, token, keepPagination = false, orderBy) =>
      async (dispatch, getState) => {
        for (const key in filter) {
          if (filter[key] instanceof Array) {
            filter[key] = {
              since: momentToUnix(filter[key][0]),
              to: momentToUnix(filter[key][1]),
            };
          }
        }
        try {
          dispatch({
            type: actions.FETCH_STARTED,
            payload: { filter, keepPagination },
          });

          const response = await fetchFn(
            filter,
            orderBy,
            selectors.selectLimit(getState()),
            selectors.selectOffset(getState()),
            token,
          );

          dispatch({
            type: actions.FETCH_SUCCESS,
            payload: {
              rows: response.rows,
              count: response.count,
            },
          });
        } catch (error) {
          Errors.handle(error, dispatch, '/');

          dispatch({
            type: actions.FETCH_ERROR,
          });
        }
      },
  };

  return actions;
};
