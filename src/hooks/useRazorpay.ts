import { useEffect } from 'react';
import { toast } from 'sonner';

const useRazorpay = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const openPaymentGateway = (
    amount: number,
    options: any,
    callback: (response: any) => void
  ) => {
    const razorpayOptions = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: amount * 100,
      currency: 'INR',
      name: 'Your Company Name',
      description: 'Test Transaction',
      image: 'https://example.com/your_logo.jpg',
      handler: callback,
      prefill: {
        name: 'Test User',
        email: 'test.user@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
      ...options,
    };

    const rzp = new (window as any).Razorpay(razorpayOptions);
    rzp.open();
  };

  return { openPaymentGateway };
};

export default useRazorpay;
