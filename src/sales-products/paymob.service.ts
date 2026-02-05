import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PaymobService {
  private readonly baseUrl =
    process.env.PAYMOB_BASE_URL || 'https://accept.paymob.com/api';

  async authenticate(): Promise<string> {
    try {
      console.log('API Key:', process.env.PAYMOB_API_KEY);
      const response = await axios.post(`${this.baseUrl}/auth/tokens`, {
        api_key: process.env.PAYMOB_API_KEY,
      });
      console.log('Auth Token:', response.data.token);
      return response.data.token;
    } catch (error) {
      console.log('Auth Error:', error.response?.data);
      throw new Error(error.response?.data?.detail || 'Authentication failed');
    }
  }

  async createPaymentIntent(
    amount: number,
    orderId: string,
    billingData: any,
  ): Promise<{ paymentKey: string; orderId: string }> {
    try {
      var myHeaders: Headers = new Headers();
      myHeaders.append(
        'Authorization',
        `Token ${process.env.PAYMOB_SECRET_KEY}`,
      );
      myHeaders.append('Content-Type', 'application/json');

      return {
        paymentKey: 'responsePaymentKey.data.token',
        orderId: 'paymobOrderId',
      };
    } catch (error) {
      console.log('Payment Intent Error:', error.response?.data);
      throw new Error(
        error.response?.data?.detail || 'Payment intent creation failed',
      );
    }
  }
}
