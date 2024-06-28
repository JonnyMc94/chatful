import express from 'express';
import { Response, Request } from 'express';
const router = express.Router();

let message: string = "";
let messages: Array<string> = [];

router.get('/', (req, res) => {
    res.send('Chat home page');
});

//Get a users message by ID
router.get('/message/:userID/:id', (req: Request, res: Response) => {
    res.json(message);
});

//Get all messages for a user
router.get('/messages/:userID', (req: Request, res: Response) => {
    res.json(messages);
        
});

//Post a new message
router.get('/message', (req: Request, res: Response) => {
    // Handle a new message
});

//Edits a message
router.get('/message/:id', (req: Request, res: Response) => {
    // Handle a new message
});

//Deltes a message
router.get('/message/:id', (req: Request, res: Response) => {
    // Handle a new message
});

export default router;