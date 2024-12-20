import { Request, Response } from 'express';
import { ProductServices } from './product.service';

//Create  product
const createProduct = async (req: Request, res: Response) => {
  try {
    const { products: productData } = req.body;

    //call service to send data
    const result = await ProductServices.createProcutIntoDB(productData);

    //send response
    res.status(200).json({
      success: true,
      message: 'Product created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      message: err.message || 'Somethin went wrong',
      status: false,
    });
  }
};

//GetAll Products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getProcutFromDB();

    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      message: err.message || 'Somethign went wrong',
      status: false,
    });
  }
};

//get single products
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await ProductServices.getSingleProcutFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product is retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      message: err.message || 'Somethign went wrong',
      status: false,
    });
  }
};

//get update products
const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const update = req.body;
    const result = await ProductServices.updateProdutFromDB(productId, update);

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      message: err.message || 'Somethign went wrong',
      status: false,
    });
  }
};

//Delete products
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await ProductServices.deleteProdutFromDB(productId);

    res.status(200).json({
      success: true,
      message: 'Product Deleted successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      message: err.message || 'Somethign went wrong',
      status: false,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
