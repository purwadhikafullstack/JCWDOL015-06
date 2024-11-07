import prisma from '../../../lib/prisma';
import adminAuth from '../../../middleware/adminAuth';

const handler = async (req, res) => {
  // Cek apakah user Super Admin
  if (req.user.role !== 'SUPER_ADMIN') {
    return res.status(403).json({ message: 'Access denied' });
  }

  // Fetch semua user
  const users = await prisma.user.findMany();
  return res.status(200).json(users);
};

export default adminAuth(handler);
