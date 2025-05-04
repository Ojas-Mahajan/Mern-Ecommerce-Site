/*
 *
 * Shipping reducer
 *
 */

import {
    SHIPPING_FORM_CHANGE,
    SET_SHIPPING_FORM_ERRORS,
    SHIPPING_FORM_RESET
} from './constants';

const initialState = {
    shippingFormData: {
        username: '',
        email: '',
        shippingAddress: '',
        shippingMethod: '',

    },
    formErrors: {}
};

const shippingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHIPPING_FORM_CHANGE:
            return {
                ...state,
                shippingFormData: { ...state.shippingFormData, ...action.payload }
            };
        case SET_SHIPPING_FORM_ERRORS:
            return {
                ...state,
                formErrors: action.payload
            };
        case SHIPPING_FORM_RESET:
            return {
                ...state,
                shippingFormData: {
                    username: '',
                    email: '',
                    shippingAddress: '',
                    shippingMethod: '',

                },
                formErrors: {}
            };
        default:
            return state;
    }
};

export default shippingReducer;
