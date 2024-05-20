const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { firebaseConfig } = require("../../src/envPackager.cjs");

const app = initializeApp(firebaseConfig(process.env));
const auth = getAuth(app);

// Middleware to verify JWT token for the orders
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = await auth.verifyIdToken(token);
    req.user = { uid: decoded.uid };
    console.log("req.user:", req.user);
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(403).json({ message: 'Unauthorized' });
  }
};

/** 
 * Checks for user w/ admin priviledges
 * pair w/ verifyToken to achieve intended security benefits 
 * */
const requireAdmin = (req, res, next) => {
  // TODO: convert for use w/ Firebase

  // if (req.user?.isAdmin) next();
  // else res.status(403).json({ message: 'Not authorized for Admin priviledges' });
};

module.exports = { verifyToken/*, requireAdmin*/ }