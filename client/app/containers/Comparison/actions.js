/*
 *
 * Comparison actions
 *
 */

import { 
  ADD_TO_COMPARE, 
  REMOVE_FROM_COMPARE, 
  CLEAR_COMPARE,
  TOGGLE_COMPARE_MENU
} from './constants';

import handleError from '../../utils/error';
import { toggleCart } from '../Cart/actions';
import { allFieldsValidation } from '../../utils/validation';

// add product to comparison
export const addToCompare = product => {
  return (dispatch, getState) => {
    const { comparison } = getState();
    const isAdded = comparison.compareItems.some(item => item._id === product._id);

    if (isAdded) {
      return dispatch({
        type: ADD_TO_COMPARE,
        payload: comparison.compareItems
      });
    }

    // Limit to 4 products for comparison
    if (comparison.compareItems.length >= 4) {
      return dispatch(handleError('You can compare up to 4 products at a time.'));
    }

    const compareItems = [...comparison.compareItems, product];

    dispatch({
      type: ADD_TO_COMPARE,
      payload: compareItems
    });
  };
};

// remove product from comparison
export const removeFromCompare = product => {
  return (dispatch, getState) => {
    const { comparison } = getState();
    const compareItems = comparison.compareItems.filter(
      item => item._id !== product._id
    );

    dispatch({
      type: REMOVE_FROM_COMPARE,
      payload: compareItems
    });
  };
};

// clear comparison list
export const clearCompare = () => {
  return (dispatch, getState) => {
    dispatch({
      type: CLEAR_COMPARE
    });
  };
};

// toggle comparison menu
export const toggleCompareMenu = () => {
  return (dispatch, getState) => {
    const { comparison, cart } = getState();

    // If cart menu is open, close it
    if (cart.isCartOpen) {
      dispatch(toggleCart());
    }

    dispatch({
      type: TOGGLE_COMPARE_MENU,
      payload: !comparison.isCompareOpen
    });
  };
};