import type { BaseEntity } from '..';

export interface EmailMessage extends BaseEntity {
  from: string;
  to: string[];
  cc?: string[];
  subject: string;
  body: string;
  timestamp: Date;
  encrypted: boolean;
  importance: 'low' | 'normal' | 'high';
  isEvidence: boolean;
  attachments?: string[];
  clueIds?: string[];
  folder?: 'inbox' | 'sent' | 'drafts' | 'trash' | 'important';
}

export interface EmailAttachment {
  name: string;
  size: string;
  type: string;
  content?: string;
  fileId?: string;
}

export interface ProcessedEmail extends BaseEntity {
  sender: string;
  recipient: string;
  subject: string;
  preview: string;
  content: string;
  timestamp: Date;
  read: boolean;
  important: boolean;
  hasAttachment: boolean;
  attachments: EmailAttachment[];
  folder: string;
}

export interface EmailFolder extends BaseEntity {
  name: string;
  icon: string;
  unread: number;
}

export interface EmailAppData {
  emails: EmailMessage[];
}