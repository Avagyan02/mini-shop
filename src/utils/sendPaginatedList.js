import { sendSuccessResponse, sendFailedResponse, sendErrorResponse } from './responseHelpers';

async function sendPaginatedList(res, Model, filter, pageNo, limit, select, mapping) {
  try {
    const mapKeys = Object.keys(mapping);
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
    const filteredProduct = await Model.find(filter, { __v: 0 }).skip((pageNo - 1) * limit).limit(limit).select(select);
    const itemList = filteredProduct.map((elem) => {
      mapKeys.forEach((key) => {
        if (elem[key]) {
          elem[mapping[key]] = elem[key];
          delete elem[key];
        }
      });
      return elem;
    });
    return sendSuccessResponse(res, message, {
      count: filteredProductCount,
      pageCount: Math.ceil(filteredProductCount / pageNo),
      list: itemList,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default sendPaginatedList;
