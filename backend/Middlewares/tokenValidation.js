// tokenValidation.js

const jwt = require('jsonwebtoken');
const Key = process.env.SECRET_TOKEN;

const authMiddleware = (req, res, next) => {
  const accessToken = req.cookies ? req.cookies['access_token'] : null;

  if (req.path === '/users/register' && req.method === 'POST') {
    return next();
  }

  if (!accessToken) {
    return res.status(401).json({ error: 'User not authenticated - Missing token' });
  }

  try {
    const decodedToken = jwt.verify(accessToken, Key);

    if (decodedToken) {
      req.authenticated = true;
      return next();
    } else {
      return res.status(401).json({ error: 'User not authenticated - Invalid token' });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ error: 'User not authenticated - Token verification failed' });
  }
};

module.exports = authMiddleware;
