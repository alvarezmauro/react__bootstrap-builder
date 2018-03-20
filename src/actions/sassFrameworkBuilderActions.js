/* eslint-disable no-console */
import * as types from '../constants/actionTypes';
import * as mockApi from '../api/mockApi';
import {beginAjaxCall, ajaxCallError} from "./ajaxStatusActions";

export function loadSassFrameworkDataSuccess(sassFrameworkData) {
  return {type: types.LOAD_SASS_FRAMEWORK_DATA_SUCCESS, sassFrameworkData};
}

/*
 * Return a promise with the mockup data
 */
export function loadSassFrameworkData(id){
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return mockApi.getSassFrameworkData(id).then(sassFrameworkData => {
      dispatch(loadSassFrameworkDataSuccess(sassFrameworkData));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw (error);
    });
  };
}
