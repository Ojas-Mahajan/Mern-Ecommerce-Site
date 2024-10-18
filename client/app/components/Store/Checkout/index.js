import React, { useState } from 'react';
import Button from '../../Common/Button';
// Import your payment processing library here (e.g., Stripe)
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const Checkout = props => {
  const { authenticated, handleShopping, handleCheckout, placeOrder } = props;
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
    } else {
      // Proceed with placing the order, using paymentMethod.id for the payment processing
      placeOrder(paymentMethod.id);
    }
  };

  return (
    <div className='easy-checkout'>
      <form onSubmit={handlePayment}>
        <CardElement />
        {error && <div className='error'>{error}</div>}
        <div className='checkout-actions'>
          <Button
            variant='primary'
            text='Continue shopping'
            onClick={() => handleShopping()}
          />
          {authenticated ? (
            <Button
              variant='primary'
              type='submit'  // Change to submit for payment processing
              text='Place Order'
            />
          ) : (
            <Button
              variant='primary'
              text='Proceed To Checkout'
              onClick={() => handleCheckout()}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default Checkout;
