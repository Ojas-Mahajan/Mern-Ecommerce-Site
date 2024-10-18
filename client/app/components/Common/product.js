import axios from 'axios';
import { FETCH_RECOMMENDATIONS } from '../../constants';

export const fetchRecommendations = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get('/api/product/recommendations');
      dispatch({ type: FETCH_RECOMMENDATIONS, payload: response.data.recommendations });
    } catch (error) {
      console.log('Error fetching recommendations:', error);
    }
  };
};
