function apiKeyMiddleware(req, res, next) {
    const apiKey = req.header('X-API-Key');
    if (apiKey !== 'your-secret-api-key') {
      return res.status(401).json({ error: 'Invalid API Key' });
    }
    next();
  }
  
  module.exports = apiKeyMiddleware;
