import { sendSuccessResponse, sendFailedResponse, sendErrorResponse } from './responseHelpers';

async function sendPaginatedList(res, Model, filter, pageNo, limit, select, mapping) {
  try {
    const nameDesc = Object.values(mapping);
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
    const dispatchedProduct = filteredProduct.map((elem) => {
      const { [nameDesc[0]]: name, [nameDesc[1]]: description, ...rest } = elem._doc;
      rest.name = name;
      if (description) {
        rest.description = description;
        delete elem._doc[nameDesc[1]];
      }
      delete elem._doc[nameDesc[0]];
      return { ...rest };
    });
    return sendSuccessResponse(res, message, {
      count: filteredProductCount,
      pageCount: Math.ceil(filteredProductCount / pageNo),
      list: dispatchedProduct,
    });
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default sendPaginatedList;
