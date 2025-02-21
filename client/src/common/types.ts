export interface Message {
  id: number;
  senderId: number;
  recipientId: number;
  message: string;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
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

export interface Conversation {
  id: number;
  user1Id: number;
  user2Id: number;
  lastMessage: string;
}

export interface ChatCardProps {
  conversation: Conversation;
  isActive: boolean;
}

export interface ModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLogout: boolean;
  showModal: boolean;
}
