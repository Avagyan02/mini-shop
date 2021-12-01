import Order from '../models/order';
import { sendErrorResponse, sendFailedResponse, sendSuccessResponse } from "./responseHelpers";

async function sendPaginatedOrderList(res, limit, pageNo, filter) {
  try {
    const filteredItemCount = await Order.countDocuments(filter);
    if (!filteredItemCount) {
      return sendSuccessResponse(res, 'List fetched',
        {
          count: 0,
          pageCount: 1,
          list: [],
        });
    }

    const pageCount = Math.ceil(filteredItemCount / limit);
    if (pageNo > pageCount) {
      return sendFailedResponse(res);
    }

    const orderList = await Order.find(filter).skip((pageNo - 1) * limit).limit(limit);
    return sendSuccessResponse(res, 'List fetched', {
      count: filteredItemCount,
      pageCount,
      list: orderList,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default sendPaginatedOrderList;
