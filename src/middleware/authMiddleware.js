import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        console.log('Authorization header missing');
        return res.status(401).json({ message: 'Access token is missing or invalid' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Token received:', token);

    if (!token) {
        console.log('Token missing');
        return res.status(401).json({ message: 'Access token is missing or invalid' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);

        req.user = decoded;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.log('Error verifying token:', error.message);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

export const authorizeRole = (roles) => {
    return (req, res, next) => {
      const userRole = req.user.role; // Assuming req.user is set by authenticateJWT
  
      if (!roles.includes(userRole)) {
        return res.status(403).json({ message: "Access denied" });
      }
  
      next(); // User has the required role
    };
  };
  



