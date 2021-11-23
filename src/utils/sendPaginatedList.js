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

    const pageCount = Math.ceil(filteredItemCount / limit);
    if (pageCount < pageNo) {
      return sendFailedResponse(res, 'It is not possible to split into so many elements');
    }
    const filteredItemList = await Model.find(filter).skip((pageNo - 1) * limit).limit(limit).select(select);
    const itemList = filteredItemList.map((elem) => {
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
      pageCount,
      list: itemList,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default sendPaginatedList;
