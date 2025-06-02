/**
 *
 * CompareMenu
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../Common/Button';

const CompareMenu = props => {
  const { compareItems, isCompareOpen, toggleCompareMenu, removeFromCompare } = props;

  const handleRemoveFromCompare = product => {
    removeFromCompare(product);
  };

  const handleGoToCompare = () => {
    toggleCompareMenu();
  };

  return (
    <div className={`compare-menu ${isCompareOpen ? 'open' : ''}`}>
      <div className='compare-menu-header'>
        <h1>Compare Products</h1>
        <button
          type='button'
          onClick={toggleCompareMenu}
          className='close-compare-menu'
        >
          <i className='fa fa-close' aria-hidden='true'></i>
        </button>
      </div>
      {compareItems.length > 0 ? (
        <div className='compare-menu-body'>
          <div className='compare-items'>
            {compareItems.map((item, index) => (
              <div key={index} className='compare-item'>
                <div className='compare-item-image'>
                  <img
                    src={`${
                      item.imageUrl
                        ? item.imageUrl
                        : '/images/placeholder-image.png'
                    }`}
                    alt={item.name}
                  />
                </div>
                <div className='compare-item-details'>
                  <h4>{item.name}</h4>
                  <div className='compare-item-price'>${item.price}</div>
                </div>
                <button
                  type='button'
                  className='compare-item-remove'
                  onClick={() => handleRemoveFromCompare(item)}
                >
                  <i className='fa fa-close' aria-hidden='true'></i>
                </button>
              </div>
            ))}
          </div>
          <div className='compare-menu-footer'>
            <Link
              to='/comparison'
              className='compare-button'
              onClick={handleGoToCompare}
            >
              Compare Now
            </Link>
          </div>
        </div>
      ) : (
        <div className='compare-menu-body'>
          <p className='empty-compare-msg'>Your comparison list is empty.</p>
        </div>
      )}
    </div>
  );
};

export default CompareMenu;