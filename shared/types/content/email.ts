import type { BaseEntity } from '../core/base';

export interface EmailMessage extends BaseEntity {
  from: string;
  to: string[];
  cc?: string[];
  subject: string;
  body: string;
  timestamp: string;
  encrypted: boolean;
  importance: 'low' | 'normal' | 'high';
  isEvidence: boolean;
  attachments?: EmailAttachment[];
  clueIds?: string[];
  folder?: 'inbox' | 'sent' | 'drafts' | 'trash' | 'important';
}

export interface EmailAttachment {
  name: string;
  size: string;
  type: string;
  content?: string;
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
