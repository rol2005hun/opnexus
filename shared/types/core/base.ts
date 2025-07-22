/**
 * Base types used across the entire application
 */

export interface BaseEntity {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

export type DifficultyLevel = 'Rookie' | 'Agent' | 'Senior Agent' | 'Special Agent' | 'Supervisor' | 'Section Chief' | 'Deputy Director' | 'Director';

export type SecurityClearanceLevel = 1 | 2 | 3 | 4 | 5;
