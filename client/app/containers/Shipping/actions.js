/*
 *
 * Shipping actions
 *
 */

import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
    SHIPPING_FORM_CHANGE,
    SET_SHIPPING_FORM_ERRORS,
    SHIPPING_FORM_RESET
} from './constants';

import handleError from '../../utils/error';
import { allFieldsValidation } from '../../utils/validation';
import { API_URL } from '../../constants';

export const shippingChange = (name, value) => {
    let formData = {};
    formData[name] = value;

    return {
        type: SHIPPING_FORM_CHANGE,
        payload: formData
    };
};

export const addShippingDetails = () => {
    return async (dispatch, getState) => {
        try {
            const rules = {
                shippingAddress: 'required',
                shippingMethod: 'required',
                username: 'required',
                email: 'required|email'
            };

            const shipping = getState().shipping.shippingFormData;

            const { isValid, errors } = allFieldsValidation(shipping, rules, {
                'required.username': 'Username is required.',
                'required.email': 'Email is required.',
                'required.shippingAddress': 'Shipping address is required.',
                'required.shippingMethod': 'Shipping method is required.',


            });

            if (!isValid) {
                return dispatch({ type: SET_SHIPPING_FORM_ERRORS, payload: errors });
            }
            const payload = {
                username: shipping.username,
                email: shipping.email,
                address: shipping.shippingAddress,
                method: shipping.shippingMethod,
            };

            const response = await axios.post(`${API_URL}/shipping/add`, payload);

            const successOptions = {
                title: `${response.data.message || 'Shipping details submitted successfully!'}`,
                position: 'tr',
                autoDismiss: 2
            };

            dispatch({ type: SHIPPING_FORM_RESET });
            dispatch(success(successOptions));
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};
