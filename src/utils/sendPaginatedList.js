import { sendSuccessResponse, sendFailedResponse, sendErrorResponse } from './responseHelpers';

async function sendPaginatedList(res, Model, filter, pageNo, limit, select, mapping) {
  try {
    const mapKeys = Object.keys(mapping);
    const message = 'List fetched';
    const filteredItemCount = await Model.countDocuments(filter);
    if (!filteredItemCount) {
      return sendSuccessResponse(res, message,
        {
          count: 0,
          pageCount: 1,
          list: [],
        });
    }
    const filteredItem = await Model.find(filter).skip((pageNo - 1) * limit).limit(limit).select(select);
    const itemList = filteredItem.map((elem) => {
      mapKeys.forEach((key) => {
        if (elem[key]) {
          elem[mapping[key]] = elem[key];
          delete elem[key];
        }
      });
      return elem;
    });
    return sendSuccessResponse(res, message, {
      count: filteredItemCount,
      pageCount: Math.ceil(filteredItemCount / pageNo),
      list: itemList,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default sendPaginatedList;
