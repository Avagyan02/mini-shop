import { Languages } from '../utils/constants';
import { sendFailedResponse } from '../utils/responseHelpers';

function validateLanguage(req, res, next) {
  const language = +req.headers.language;
  switch (language) {
    case Languages.Hy:
    case Languages.En:
    case Languages.Ru:
      const languageNames = Object.keys(Languages);
      const languageValues = Object.values(Languages);
      if (languageValues.includes(language)) {
        req.selectedLanguages = languageNames.splice(languageValues.indexOf(language), 1)[0];
        req.notSelectedLanguages = languageNames;
      }
      next();
      break;
    default:
      return sendFailedResponse(res);
  }
}

export default validateLanguage;
