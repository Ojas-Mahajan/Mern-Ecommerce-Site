/**
 *
 * CompareIcon
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';

const CompareIcon = props => {
  const { compareItems, toggleCompareMenu } = props;
  const compareItemsCount = compareItems.length;

  return (
    <div className='compare-icon'>
      <button
        className='compare-icon-btn'
        onClick={toggleCompareMenu}
        type='button'
      >
        <i className='fa fa-exchange' aria-hidden='true'></i>
        {compareItemsCount > 0 && (
          <span className='compare-badge'>{compareItemsCount}</span>
        )}
      </button>
    </div>
  );
};

export default CompareIcon;