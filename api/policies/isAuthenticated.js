module.exports = function (req, res, next) {
  if(req.header('Authorization')) {
    var token = req.header('Authorization').split('Bear ')[1];
    if(!token){
      return res.redirect('/');
    }

    return JWTService.verifyJWT(token, function(err, payload){
      if(err) {
        return res.redirect('/');
      }
      if(!payload.id) {
        return res.redirect('/');
      }
    });
  } else if(req.header('Logout')) {
    return next();
  }

  if (req.wantsJSON) {
    return res.send(401);
  }

  return res.redirect('/');
};