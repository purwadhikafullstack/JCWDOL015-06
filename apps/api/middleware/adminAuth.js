import jwt from 'jsonwebtoken';

export default function adminAuth(handler) {
  return async (req, res) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      // Verifikasi token
      const token = authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Cek apakah role adalah admin
      if (decoded.role !== 'SUPER_ADMIN' && decoded.role !== 'STORE_ADMIN') {
        return res.status(403).json({ message: 'Not authorized' });
      }

      // Lanjutkan ke handler berikutnya
      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
}
