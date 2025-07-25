import type { BaseEntity } from '..';

export interface Email extends BaseEntity {
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

export interface EmailFolder extends BaseEntity {
  name: string;
  icon: string;
  unread: number;
}