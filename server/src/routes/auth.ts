import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { RegisterRequestBody, LoginRequestBody } from '../types/auth';
import { CreationAttributes } from 'sequelize/types';

const router = Router();

router.post('/register', async (req: Request<{}, {}, RegisterRequestBody>, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({ username, password } as CreationAttributes<User>);
    res.status(201).send('User registered');
  } catch (error) {
    res.status(400).send('Error registering user');
  }
});

router.post('/login', async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).send('Invalid credentials');
    }
    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(400).send('Error logging in');
  }
});

export default router;