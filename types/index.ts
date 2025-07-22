/*
 * Types Organization - OOP Structure
 * 
 * This directory contains type definitions organized by domain responsibility:
 * 
 * - story.ts: Main story structure and settings
 * - characters.ts: Character and suspect definitions 
 * - evidence.ts: Evidence types (files, database records, conversations, messages)
 * - applications.ts: Custom story applications and data
 * - investigation.ts: Objectives and timeline events
 * - chat.ts: Interactive chat application UI types (separate from evidence)
 * - content.ts: Re-exports all story types for backward compatibility
 * - auth.ts: User authentication and profile types
 * - game.ts: Game state and story progress types
 * - laptop.ts: Laptop simulation and app management types
 * 
 * Each category is closed for modification but open for extension.
 */

export * from './content';
export * from './auth';
export * from './game';
export * from './laptop';