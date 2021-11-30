import Order from '../../../models/order';
import { sendSuccessResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function createOrder(req, res) {
  const { productList } = req.body;
  const { orderProducts, user } = req;
  const order = { userId: user._id, productList: [] };
  let allPrice = 0;

  const updatedProducts = orderProducts.map((elem, i) => {
    order.productList[i] = { id: elem._id, price: elem.price };
    order.productList[i].quantity = productList[i].quantity;
    allPrice += elem.price * productList[i].quantity;
    elem.quantity -= productList[i].quantity;
    return elem.save();
  });

  try {
    order.price = allPrice;
    await Promise.all([Order.create(order), ...updatedProducts]);
    sendSuccessResponse(res, 'Order created');
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default createOrder;
