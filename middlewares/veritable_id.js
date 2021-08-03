const {sendCustomResponse} = require('../helpers');
const constStatus = require('../constants/constants');

function testId(req,res,next){
  const Id = req.params.id;
  const regexpId = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
  if(regexpId.test(Id)){
    return next()
  }
  return sendCustomResponse(res,'Not correct Id', constStatus.STATUS_CODE_NOT_FOUND);
}

module.exports = testId;