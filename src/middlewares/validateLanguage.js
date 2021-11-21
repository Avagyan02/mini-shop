import { Languages } from '../utils/constants';
import { sendFailedResponse } from '../utils/responseHelpers';

function validateLanguage(req, res, next) {
  const language = +req.headers.language;
  const languageNames = ['Hy', 'Ru', 'En'];
  switch (language) {
    case Languages.Hy:
    case Languages.En:
    case Languages.Ru:
      const { [languageNames[language - 1]]: name, ...rest } = Languages;
      req.notSelectedLanguages = rest;
      next();
      break;
    default:
      return sendFailedResponse(res);
  }
}

export default validateLanguage;
