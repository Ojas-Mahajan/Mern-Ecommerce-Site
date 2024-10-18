import {
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  FETCH_RECOMMENDATIONS,
  // ... other imports ...
} from '../actions/constants';

const initialState = {
  products: [],
  product: {},
  recommendations: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_RECOMMENDATIONS:
      return {
        ...state,
        recommendations: action.payload
      };
    default:
      return state;
  }
}