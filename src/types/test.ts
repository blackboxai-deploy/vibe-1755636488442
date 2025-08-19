export interface StudentInfo {
  name: string;
  class: string;
  date: string;
  grade?: string;
}

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  number: number;
  type: 'multiple-choice' | 'fill-blank' | 'true-false' | 'short-answer';
  text: string;
  options?: QuestionOption[];
  correctAnswer: string;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export interface TestTemplate {
  id: string;
  title: string;
  subject: string;
  gradeLevel: string;
  instructions: string;
  questions: Question[];
  studentInfo: StudentInfo;
  createdAt: Date;
  estimatedTime: number; // in minutes
  totalPoints: number;
}

export interface ExportOptions {
  format: 'pdf' | 'docx' | 'print';
  includeAnswerKey: boolean;
  separateAnswerSheet: boolean;
  randomizeQuestions: boolean;
  randomizeOptions: boolean;
}

export interface QuestionBankItem {
  id: string;
  question: Question;
  tags: string[];
  subject: string;
  gradeLevel: string;
  dateAdded: Date;
}

export interface TestPreferences {
  showNumbers: boolean;
  showPoints: boolean;
  showInstructions: boolean;
  paperSize: 'A4' | 'Letter';
  fontFamily: string;
  fontSize: number;
}