import Order from '../../../models/order';
import { sendSuccessResponse, sendErrorResponse } from '../../../utils/responseHelpers';

async function createOrder(req, res) {
  const { productList } = req.body;
  const { orderProducts, user } = req;
  const order = { userId: user._id, productList: [] };
  const updatedProducts = [];
  let allPrice = 0;
  let quantityOrderItem;

  orderProducts.forEach((elem, i) => {
    order.productList[i] = { id: elem._id, price: elem.price };
    quantityOrderItem = productList.find((item) => item.id === order.productList[i].id.toString());
    order.productList[i].quantity = quantityOrderItem.quantity;
    allPrice += elem.price * quantityOrderItem.quantity;
    elem.quantity -= quantityOrderItem.quantity;
    updatedProducts.push(elem.save());
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
