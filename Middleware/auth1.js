const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization'); 
  if (!token) {
    res.status(401).json({ error: 'Unauthorized: Missing Token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
     res.status(401).json({ error: 'Unauthorized: Invalid Token' });
  }
};

module.exports = authMiddleware;
