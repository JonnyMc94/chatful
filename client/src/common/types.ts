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

export interface UserSelectionModalProps {
  users: User[];
  onSelectUser: (user: User) => void;
  onClose: () => void;
}

export interface ChatCardProps {
  chatCardUser: User;
}

export interface MessageHolderProps {
  message: Message;
  sender: User;
}

export interface MessageHolderPropsWithSender extends MessageHolderProps {
  sender: User;
}

export interface ModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLogout: boolean;
  showModal: boolean;
}
