import Product from '../../../models/product';
import sendPaginatedList from '../../../utils/sendPaginatedList';
import { sendErrorResponse } from '../../../utils/responseHelpers';

async function readMany(req, res) {
  try {
    const limit = +req.query.limit;
    const pageNo = +req.query.pageNo;
    const priceTo = +req.query.priceTo;
    const priceFrom = +req.query.priceFrom;
    const { search } = req.query;
    const { notSelectedLanguages, selectedLanguage } = req;
    const filter = { deleted: false };
    const regexpSearch = { $regex: `${search}`, $options: 'i' };

    const dispatchedLanguage = {
      [`name${selectedLanguage}`]: 'name',
      [`description${selectedLanguage}`]: 'description',
    };

    if (search) {
      filter['$or'] = [
        { [`name${selectedLanguage}`]: regexpSearch },
        { [`name${notSelectedLanguages[0]}`]: regexpSearch },
        { [`name${notSelectedLanguages[1]}`]: regexpSearch },
        { [`description${selectedLanguage}`]: regexpSearch },
        { [`description${notSelectedLanguages[0]}`]: regexpSearch },
        { [`description${notSelectedLanguages[1]}`]: regexpSearch },
      ];
    }

    if (priceTo && priceFrom) {
      filter.price = { $gte: priceFrom, $lte: priceTo };
    } else if (priceTo) {
      filter.price = { $lte: priceTo };
    } else if (priceFrom) {
      filter.price = { $gte: priceFrom };
    }

    const select = `-name${notSelectedLanguages[0]} -name${notSelectedLanguages[1]} -description${notSelectedLanguages[0]} -description${notSelectedLanguages[1]}`;
    return await sendPaginatedList(res, Product, filter, pageNo, limit, select, dispatchedLanguage);
  } catch (error) {
    sendErrorResponse(error, res);
  }
}

export default readMany;
