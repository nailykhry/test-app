const jwt = require('jsonwebtoken')
function checkUserRole(role) {
    return (req, res, next) => {
      const bearerHeader = req.header('Authorization')
      try {
        const bearerToken = bearerHeader.split(' ')[1]
        const decoded = jwt.verify(bearerToken, process.env.SECRET_KEY)
        userRole = decoded.role
        if (userRole == role) {
          next();
        } else {
          res.status(403).send({ message: 'Unauthorized', userRole });
        }
      } catch (err) {
        console.error(err);
        res.status(403).send({ message: 'Unauthorized' });
      }
    }
}

module.exports = checkUserRole;
