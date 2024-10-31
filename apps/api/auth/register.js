// pages/api/auth/register.js
import prisma from '../../../lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, role } = req.body;

    // Cek jika input kosong
    if (!email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      // Hash password sebelum disimpan
      const hashedPassword = await bcrypt.hash(password, 10);

      // Simpan user baru ke dalam database
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role, // SUPER_ADMIN atau STORE_ADMIN
        },
      });

      // Buat token JWT (opsional jika kamu ingin langsung mengotentikasi)
      const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
      return res.status(500).json({ error: 'Error registering user' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
