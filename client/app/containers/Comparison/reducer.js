/*
 *
 * Comparison reducer
 *
 */

import {
  ADD_TO_COMPARE,
  REMOVE_FROM_COMPARE,
  CLEAR_COMPARE,
  TOGGLE_COMPARE_MENU
} from './constants';

const initialState = {
  compareItems: [],
  isCompareOpen: false
};

const comparisonReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_COMPARE:
      return {
        ...state,
        compareItems: action.payload
      };
    case REMOVE_FROM_COMPARE:
      return {
        ...state,
        compareItems: action.payload
      };
    case CLEAR_COMPARE:
      return {
        ...state,
        compareItems: []
      };
    case TOGGLE_COMPARE_MENU:
      return {
        ...state,
        isCompareOpen: action.payload
      };
    default:
      return state;
  }
};

export default comparisonReducer;