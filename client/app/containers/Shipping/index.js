import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import actions from '../../actions';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';

class Shipping extends React.PureComponent {

    handleSubmit = async (event) => {
        event.preventDefault();
        const { addShippingDetails, shippingFormData } = this.props;



        await addShippingDetails(shippingFormData);
    };

    render() {
        const {
            shippingFormData,
            formErrors,
            shippingChange,
            isSubmitting,
            isLoading,
        } = this.props;

        return (
            <div className="shipping">
                {isLoading && <LoadingIndicator />}
                <h3 className="text-uppercase">Set Up Your Shipping Details</h3>
                <hr />


                <form onSubmit={this.handleSubmit}>
                    <Row>

                        <Col xs="12" md="6">
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    className="form-control"
                                    value={shippingFormData.username || ''}
                                    onChange={e => shippingChange('username', e.target.value)}
                                    placeholder="Enter your username"
                                />
                                {formErrors.username && (
                                    <p className="text-danger">{formErrors.username}</p>
                                )}
                            </div>
                        </Col>


                        <Col xs="12" md="6">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control"
                                    value={shippingFormData.email || ''}
                                    onChange={e => shippingChange('email', e.target.value)}
                                    placeholder="Enter your email"
                                />
                                {formErrors.email && (
                                    <p className="text-danger">{formErrors.email}</p>
                                )}
                            </div>
                        </Col>


                        <Col xs="12" md="6">
                            <div className="form-group">
                                <label htmlFor="shippingAddress">Shipping Address</label>
                                <input
                                    type="text"
                                    id="shippingAddress"
                                    className="form-control"
                                    value={shippingFormData.shippingAddress || ''}
                                    onChange={e => shippingChange('shippingAddress', e.target.value)}
                                    placeholder="Enter your shipping address"
                                />
                                {formErrors.shippingAddress && (
                                    <p className="text-danger">{formErrors.shippingAddress}</p>
                                )}
                            </div>
                        </Col>

                        <Col xs="12" md="6">
                            <div className="form-group">
                                <label htmlFor="shippingMethod">Shipping Method</label>
                                <select
                                    id="shippingMethod"
                                    className="form-control"
                                    value={shippingFormData.shippingMethod || ''}
                                    onChange={e => shippingChange('shippingMethod', e.target.value)}
                                >
                                    <option value="">Select a shipping method</option>
                                    <option value="Standard">Standard</option>
                                    <option value="Express">Express</option>
                                </select>
                                {formErrors.shippingMethod && (
                                    <p className="text-danger">{formErrors.shippingMethod}</p>
                                )}
                            </div>
                        </Col>
                    </Row>

                    <hr />


                    <div className="shipping-actions">
                        <Button
                            type="submit"
                            text={isSubmitting ? 'Submitting...' : 'Submit'}
                            disabled={isSubmitting}
                        />
                    </div>
                </form>


                <Row className="mt-5">
                    <Col xs="12" md="6" className="text-md-center">
                        <div className="shipping-banner-text">
                            <h3>Set up your shipping preferences</h3>
                            <h5>Ship your products globally with MERN Store</h5>
                            <b>Start Today</b>
                        </div>
                    </Col>

                    <Col xs="12" md="6" className="text-center">
                        <img
                            className="shipping-banner"
                            src="/images/banners/shipping.jpeg"
                            alt="shipping banner"
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        shippingFormData: state.shipping.shippingFormData,
        formErrors: state.shipping.formErrors,
        isSubmitting: state.shipping.isSubmitting,
        isLoading: state.shipping.isLoading,
    };
};

export default connect(mapStateToProps, actions)(Shipping);
