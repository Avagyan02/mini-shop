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
    const filter = { deleted: false };

    const dispatchedLanguage = {
      name: `name${req.headers.language}`,
      description: `description${req.headers.language}`,
    };
    const nameLanguages = ['nameHy', 'nameRu', 'nameEn'];
    const descLanguages = ['descriptionHy', 'descriptionRu', 'descriptionEn'];
    const name = nameLanguages.splice(
      nameLanguages.indexOf(dispatchedLanguage.name),
      nameLanguages.indexOf(dispatchedLanguage.name) + 1,
    )[0];
    const description = descLanguages.splice(
      descLanguages.indexOf(dispatchedLanguage.description),
      descLanguages.indexOf(dispatchedLanguage.description) + 1,
    )[0];
    const select = `-${nameLanguages[0]} -${nameLanguages[1]} -${descLanguages[0]} -${descLanguages[1]}`;
    filter['$or'] = [
      { [`${name}`]: { $regex: `${search}`, $options: 'i' } },
      { [`${description}`]: { $regex: `${search}`, $options: 'i' } },
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
