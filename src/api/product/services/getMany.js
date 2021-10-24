import Product from '../../../models/product';
import sendPaginatedList from '../../../utils/sendPaginatedList';
import { sendErrorResponse } from '../../../utils/responseHelpers';

async function readMany(req, res) {
  try {
    const limit = +req.query.limit;
    const pageNo = +req.query.pageNo;
    const filter = { deleted: false };

    return sendPaginatedList(res, Product, filter, pageNo, limit);
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default readMany;
