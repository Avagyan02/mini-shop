import { sendFailedResponse } from '../utils/responseHelpers';

function validateLanguage(req, res, next) {
  const language = req.headers.language;
  const languageNames = ['En', 'Ru', 'Hy'];
  if (language && language === languageNames[0]
    || language === languageNames[1]
    || language === languageNames[2]) {
    languageNames.splice(languageNames.indexOf(language), languageNames.indexOf(language) + 1);
    req.notSelectedLanguages = languageNames;
    return next();
  }
  return sendFailedResponse(res);
}

export default validateLanguage;
