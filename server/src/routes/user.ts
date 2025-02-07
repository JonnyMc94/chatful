import { Router, Request, Response } from 'express';
import { User } from '../models/user';

const router = Router();

router.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await User.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send('Error retrieving users');
  }
});

export default router;