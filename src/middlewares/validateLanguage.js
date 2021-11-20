import { sendFailedResponse } from '../utils/responseHelpers';

function validateLanguage(req, res, next) {
  const language = req.headers.language;
  const languageNames = ['En', 'Ru', 'Hy'];
  switch (language) {
    case languageNames[0]:
    case languageNames[1]:
    case languageNames[2]:
      languageNames.splice(languageNames.indexOf(language), languageNames.indexOf(language) + 1);
      req.notSelectedLanguages = languageNames;
      next();
      break;
    default:
      return sendFailedResponse(res);
  }
}

export default validateLanguage;
