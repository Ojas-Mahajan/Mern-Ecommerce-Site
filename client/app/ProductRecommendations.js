import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecommendations } from '../../actions/product';
import ProductCard from '../components/ProductCard';

const ProductRecommendations = () => {
  const dispatch = useDispatch();
  const recommendations = useSelector(state => state.product.recommendations);

  useEffect(() => {
    dispatch(fetchRecommendations());
  }, [dispatch]);

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="product-recommendations">
      <h2>Recommended Products</h2>
      <div className="products-grid">
        {recommendations.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductRecommendations;