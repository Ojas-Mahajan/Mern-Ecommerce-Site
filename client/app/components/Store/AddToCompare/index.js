/**
 *
 * AddToCompare
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';

const AddToCompare = props => {
  const { id, compareItems, addToCompare, authenticated } = props;

  const isProductInCompare = compareItems.some(item => item._id === id);

  const handleAddToCompare = () => {
    if (authenticated) {
      addToCompare(id);
      return;
    }

    props.toggleCompareMenu();
  };

  return (
    <div className='add-to-compare'>
      <button
        className={`compare-icon ${isProductInCompare ? 'active' : ''}`}
        type='button'
        onClick={handleAddToCompare}
      >
        <i className='fa fa-exchange' aria-hidden='true'></i>
        <span className='btn-tooltip'>
          {isProductInCompare ? 'Remove From Compare' : 'Add To Compare'}
        </span>
      </button>
    </div>
  );
};

export default AddToCompare;