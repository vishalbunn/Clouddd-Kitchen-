import React, { useState } from 'react';
import Layout from '../components/Layout';
import useRazorpay from '../hooks/useRazorpay';
import { toast } from 'sonner';

const PaymentPage = () => {
  const [amount, setAmount] = useState(100);
  const { openPaymentGateway } = useRazorpay();

  const handlePayment = () => {
    openPaymentGateway(
      amount,
      {},
      (response) => {
        toast.success(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
      }
    );
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold">Payment</h1>
      <div className="mt-4">
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="p-2 border"
        />
      </div>
      <button
        onClick={handlePayment}
        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
      >
        Pay Now
      </button>
    </Layout>
  );
};

export default PaymentPage;
