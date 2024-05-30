export interface Message {
  senderID: number;
  recipientID: number;
  recipient: string;
  text: string;
  date: Date;
}

export interface User {
  id: number;
  username: string;
  email: string;
  avatar: string;
  messages?: Message[];
}

export interface MessageHolderProps {
  message: Message;
  sender: User;
}

export interface ModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLogout: boolean;
}
