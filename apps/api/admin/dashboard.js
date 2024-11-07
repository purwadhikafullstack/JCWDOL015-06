import adminAuth from '../../../middleware/adminAuth';

const handler = async (req, res) => {
  return res.status(200).json({ message: 'Welcome to the admin dashboard!' });
};

export default adminAuth(handler);
