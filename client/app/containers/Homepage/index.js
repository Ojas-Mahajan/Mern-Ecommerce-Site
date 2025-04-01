/**
 *
 * Homepage
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import actions from '../../actions';
import banners from './banners.json';
import CarouselSlider from '../../components/Common/CarouselSlider';
import { responsiveOneItemCarousel } from '../../components/Common/CarouselSlider/utils';

class Homepage extends React.PureComponent {
  render() {
    return (
      <div className='homepage'>
        <Row className='flex-row'>
          <Col xs='12' lg='6' className='order-lg-2 mb-3 px-3 px-md-2'>
            <div className='home-carousel'>
              <CarouselSlider
                swipeable={true}
                showDots={true}
                infinite={true}
                autoPlay={false}
                slides={banners}
                responsive={responsiveOneItemCarousel}
              >
                {banners.map((item, index) => (
                  <img key={index} src={item.imageUrl} />
                ))}
              </CarouselSlider>
            </div>
          </Col>
          <Col xs='12' lg='3' className='order-lg-2 mb-1 px-1 px-md-1'>
            <div className='d-flex flex-column h-70 justify-content-between'>
              <img src='/images/banners/perfume/1.png' className='mb-1' />
              <img src='/images/banners/perfume/2.png' />
            </div>
          </Col>
          <Col xs='12' lg='3' className='order-lg-2 mb-1 px-1 px-md-1'>
            <div className='d-flex flex-column h-70 justify-content-between'>
              <img src='/images/banners/perfume/3.png' className='mb-1' />
              <img src='/images/banners/perfume/4.png' />
            </div>

          </Col>

        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, actions)(Homepage);
