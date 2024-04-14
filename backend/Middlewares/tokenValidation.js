const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  // Extract the token from the request headers, cookies, or wherever it's sent
  const token = req.cookies.access_token;

  // If no token is provided, respond with an error
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the decoded user information to the request object for later use
    req.user = decoded;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // If verification fails (e.g., token expired or invalid), respond with an error
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = validateToken;
