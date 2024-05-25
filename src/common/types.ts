export interface Message {
    id: number;
    text: string;
    user: User;
    time: string;
    date: Date;
    
  }
  
  export interface User {
    id: number;
    username: string;
    email: string;
    avatar: string;
  }
  
  export interface MessageHolderProps {
    message: Message;
  }