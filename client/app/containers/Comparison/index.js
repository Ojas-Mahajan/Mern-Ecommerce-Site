/*
 *
 * Comparison
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import actions from '../../actions';
import Button from '../../components/Common/Button';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';
import { BagIcon } from '../../components/Common/Icon';

class Comparison extends React.PureComponent {
  componentDidMount() {
    document.body.classList.add('comparison-page');
  }

  componentWillUnmount() {
    document.body.classList.remove('comparison-page');
  }

  render() {
    const {
      compareItems,
      isLoading,
      removeFromCompare,
      handleAddToCart,
      authenticated
    } = this.props;

    return (
      <div className='comparison'>
        <h2>Product Comparison</h2>
        {isLoading ? (
          <LoadingIndicator />
        ) : compareItems.length > 0 ? (
          <div className='comparison-table-container'>
            <div className='comparison-table'>
              <div className='comparison-row comparison-header'>
                <div className='comparison-cell feature-name'></div>
                {compareItems.map((item, index) => (
                  <div key={index} className='comparison-cell product-cell'>
                    <div className='product-image'>
                      <img
                        src={`${
                          item.imageUrl
                            ? item.imageUrl
                            : '/images/placeholder-image.png'
                        }`}
                        alt={item.name}
                      />
                    </div>
                    <div className='product-details'>
                      <h4>
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </h4>
                      <div className='product-price'>${item.price}</div>
                      <div className='product-actions'>
                        <Button
                          variant='primary'
                          text='Add To Bag'
                          className='bag-btn'
                          icon={<BagIcon />}
                          onClick={() => handleAddToCart(item)}
                        />
                        <button
                          type='button'
                          className='remove-btn'
                          onClick={() => removeFromCompare(item)}
                        >
                          <i className='fa fa-trash' aria-hidden='true'></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='comparison-row'>
                <div className='comparison-cell feature-name'>Brand</div>
                {compareItems.map((item, index) => (
                  <div key={index} className='comparison-cell'>
                    {item.brand && item.brand.name ? item.brand.name : 'N/A'}
                  </div>
                ))}
              </div>
              <div className='comparison-row'>
                <div className='comparison-cell feature-name'>Description</div>
                {compareItems.map((item, index) => (
                  <div key={index} className='comparison-cell'>
                    {item.description}
                  </div>
                ))}
              </div>
              <div className='comparison-row'>
                <div className='comparison-cell feature-name'>Price</div>
                {compareItems.map((item, index) => (
                  <div key={index} className='comparison-cell'>
                    ${item.price}
                  </div>
                ))}
              </div>
              <div className='comparison-row'>
                <div className='comparison-cell feature-name'>Rating</div>
                {compareItems.map((item, index) => (
                  <div key={index} className='comparison-cell'>
                    {item.totalReviews > 0 ? (
                      <div className='product-rating'>
                        <span className='rating-value'>
                          {parseFloat(item?.averageRating).toFixed(1)}
                        </span>
                        <span
                          className='fa fa-star checked'
                          style={{ color: '#ffb302' }}
                        ></span>
                        <span className='total-reviews'>
                          ({item.totalReviews} reviews)
                        </span>
                      </div>
                    ) : (
                      'No reviews yet'
                    )}
                  </div>
                ))}
              </div>
              <div className='comparison-row'>
                <div className='comparison-cell feature-name'>Availability</div>
                {compareItems.map((item, index) => (
                  <div key={index} className='comparison-cell'>
                    {item.inventory > 0 ? (
                      <span className='in-stock'>In Stock</span>
                    ) : (
                      <span className='out-of-stock'>Out of Stock</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <NotFound message='Your comparison list is empty.' />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    compareItems: state.comparison.compareItems,
    isLoading: state.product.isLoading,
    authenticated: state.authentication.authenticated
  };
};

export default connect(mapStateToProps, actions)(Comparison);