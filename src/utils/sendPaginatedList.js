import { sendSuccessResponse, sendFailedResponse, sendErrorResponse } from './responseHelpers';

async function sendPaginatedList(res, Model, filter, pageNo, limit) {
  try {
    const message = 'List fetched';
    const filteredProductCount = await Model.countDocuments(filter);
    if (!filteredProductCount) {
      return sendSuccessResponse(res, message,
        {
          count: 0,
          pageCount: 1,
          list: [],
        });
    }
    if (limit * pageNo > filteredProductCount) {
      return sendFailedResponse(res, 'It is not possible to split into so many elements');
    }
    const filteredProduct = await Model.find(filter).skip((pageNo - 1) * limit).limit(limit);
    return sendSuccessResponse(res, message, {
      count: filteredProductCount,
      pageCount: Math.ceil(filteredProductCount / pageNo),
      list: filteredProduct,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default sendPaginatedList;
