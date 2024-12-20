import { Request, Response } from 'express';
import { OrderServices } from './order.service';

//Create  Order
const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, product, quantity, totalPrice } = req.body;

    if (!email || !product || !quantity || !totalPrice) {
      return res.status(400).json({
        success: false,
        message: 'All fields are needed',
      });
    }

    const result = await OrderServices.createOrderIntoDB({
      email,
      product,
      quantity,
      totalPrice,
    });

    //send response
    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'An error occurred while placing the order',
    });
  }
};

//Calculate Rvenew
const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await OrderServices.calculateRevenueFromDB();

    res.status(200).json({
      message: 'Revenew calculated Successfully',
      status: true,
      data: {
        totalRevenue,
      },
    });
  } catch (err: any) {
    res.status(400).json({
      message: err.message || 'fail to calculate reveneue',
      status: false,
    });
  }
};

export const OrderController = {
  createOrder,
  calculateRevenue
};
