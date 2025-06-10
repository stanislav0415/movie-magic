export const tempData = (req, res, next) => {

  res.dataRedirect = function(url, tempData) {
     req.session.tempData = tempData;
     req.session.isFirstRequest = true;


    return res.redirect(url);
  }
  if (!req.session.tempData) {
    return next();
  }

  if (req.session.isFirstRequest) {
    res.session.isFirstRequest = false;
    res.locals = Object.assign(req.session.tempData);
  }else {
    req.session.tempData = null;
    req.session.isFirstRequest = null;
  }
}