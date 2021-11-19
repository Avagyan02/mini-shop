import Product from '../../../models/product';
import sendPaginatedList from '../../../utils/sendPaginatedList';
import { sendErrorResponse } from '../../../utils/responseHelpers';

async function readMany(req, res) {
  try {
    const limit = +req.query.limit;
    const pageNo = +req.query.pageNo;
    const priceTo = +req.query.priceTo;
    const priceFrom = +req.query.priceFrom;
    const { language } = req.headers;
    const { search } = req.query;
    const { notSelectedLanguages } = req;
    const filter = { deleted: false };

    const dispatchedLanguage = {
      [`name${req.headers.language}`]: 'name',
      [`description${req.headers.language}`]: 'description',
    };

    const select = `-name${notSelectedLanguages[0]} -name${notSelectedLanguages[1]} -description${notSelectedLanguages[0]} -description${notSelectedLanguages[1]}`;
    filter['$or'] = [
      { [`name${language}`]: { $regex: `${search}`, $options: 'i' } },
      { [`name${notSelectedLanguages[0]}`]: { $regex: `${search}`, $options: 'i' } },
      { [`name${notSelectedLanguages[1]}`]: { $regex: `${search}`, $options: 'i' } },
      { [`description${language}`]: { $regex: `${search}`, $options: 'i' } },
      { [`description${notSelectedLanguages[0]}`]: { $regex: `${search}`, $options: 'i' } },
      { [`description${notSelectedLanguages[1]}`]: { $regex: `${search}`, $options: 'i' } },
    ];

    if (priceTo) {
      filter.price = { $lte: priceTo };
    } else if (priceFrom) {
      filter.price = { $gte: priceFrom };
    }
    return sendPaginatedList(res, Product, filter, pageNo, limit, select, dispatchedLanguage);
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default readMany;
