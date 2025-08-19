import { Question } from '@/types/test';

export const defaultQuestions: Question[] = [
  {
    id: '1',
    number: 1,
    type: 'multiple-choice',
    text: 'Complete a frase com a alternativa correta:\n\n"This _______ my brother. His name _______ John."',
    options: [
      { id: 'a', text: 'is / is', isCorrect: true },
      { id: 'b', text: 'are / is', isCorrect: false },
      { id: 'c', text: 'is / are', isCorrect: false },
      { id: 'd', text: 'am / is', isCorrect: false }
    ],
    correctAnswer: 'a) is / is',
    explanation: 'Use "is" with singular subjects (this, he, she, it)',
    difficulty: 'easy',
    points: 1
  },
  {
    id: '2',
    number: 2,
    type: 'multiple-choice',
    text: 'Leia a frase e escolha a opção que a completa corretamente:\n\n"I _______ Brazilian. My parents _______ from Italy."',
    options: [
      { id: 'a', text: 'am / is', isCorrect: false },
      { id: 'b', text: 'is / are', isCorrect: false },
      { id: 'c', text: 'am / are', isCorrect: true },
      { id: 'd', text: 'are / is', isCorrect: false }
    ],
    correctAnswer: 'c) am / are',
    explanation: 'Use "am" with "I" and "are" with plural subjects',
    difficulty: 'easy',
    points: 1
  },
  {
    id: '3',
    number: 3,
    type: 'multiple-choice',
    text: 'Qual das alternativas abaixo está INCORRETA?',
    options: [
      { id: 'a', text: 'We are students.', isCorrect: false },
      { id: 'b', text: 'You is a good athlete.', isCorrect: true },
      { id: 'c', text: 'They are my friends.', isCorrect: false },
      { id: 'd', text: 'She is my teacher.', isCorrect: false }
    ],
    correctAnswer: 'b) You is a good athlete.',
    explanation: 'Should be "You are a good athlete" - use "are" with "you"',
    difficulty: 'medium',
    points: 1
  },
  {
    id: '4',
    number: 4,
    type: 'multiple-choice',
    text: 'Complete with the correct form of the verb:\n\n"He _______ soccer every afternoon."',
    options: [
      { id: 'a', text: 'play', isCorrect: false },
      { id: 'b', text: 'playing', isCorrect: false },
      { id: 'c', text: 'plays', isCorrect: true },
      { id: 'd', text: 'played', isCorrect: false }
    ],
    correctAnswer: 'c) plays',
    explanation: 'Use "plays" with third person singular (he, she, it) in simple present',
    difficulty: 'easy',
    points: 1
  },
  {
    id: '5',
    number: 5,
    type: 'multiple-choice',
    text: 'Choose the correct verb form:\n\n"She _______ her teeth every morning."',
    options: [
      { id: 'a', text: 'brush', isCorrect: false },
      { id: 'b', text: 'brushes', isCorrect: true },
      { id: 'c', text: 'brushing', isCorrect: false },
      { id: 'd', text: 'brushed', isCorrect: false }
    ],
    correctAnswer: 'b) brushes',
    explanation: 'Add "-es" to verbs ending in "-sh" for third person singular',
    difficulty: 'easy',
    points: 1
  },
  {
    id: '6',
    number: 6,
    type: 'multiple-choice',
    text: 'What does this imperative sentence mean?\n\n"Use your hand to open the door this way."',
    options: [
      { id: 'a', text: 'Fechar a porta com cuidado.', isCorrect: false },
      { id: 'b', text: 'Bater na porta antes de entrar.', isCorrect: false },
      { id: 'c', text: 'Use sua mão para abrir a porta desta forma.', isCorrect: true },
      { id: 'd', text: 'Trancar a porta ao sair.', isCorrect: false }
    ],
    correctAnswer: 'c) Use sua mão para abrir a porta desta forma.',
    explanation: 'Imperative sentences give instructions or commands',
    difficulty: 'medium',
    points: 1
  },
  {
    id: '7',
    number: 7,
    type: 'multiple-choice',
    text: 'O que significa "Roll the dice" em português?',
    options: [
      { id: 'a', text: 'Guardar o dado.', isCorrect: false },
      { id: 'b', text: 'Comprar dados novos.', isCorrect: false },
      { id: 'c', text: 'Jogar o dado.', isCorrect: true },
      { id: 'd', text: 'Contar os dados.', isCorrect: false }
    ],
    correctAnswer: 'c) Jogar o dado.',
    explanation: '"Roll" means to throw or move something by turning it over',
    difficulty: 'easy',
    points: 1
  },
  {
    id: '8',
    number: 8,
    type: 'multiple-choice',
    text: 'Which sentence shows a daily routine?',
    options: [
      { id: 'a', text: 'They are eating lunch right now.', isCorrect: false },
      { id: 'b', text: 'They will eat lunch tomorrow.', isCorrect: false },
      { id: 'c', text: 'They eat lunch at 12 p.m. every day.', isCorrect: true },
      { id: 'd', text: 'They ate lunch yesterday.', isCorrect: false }
    ],
    correctAnswer: 'c) They eat lunch at 12 p.m. every day.',
    explanation: 'Simple present tense with "every day" indicates routine',
    difficulty: 'medium',
    points: 1
  },
  {
    id: '9',
    number: 9,
    type: 'multiple-choice',
    text: 'What does "Look at page 10 of your books" mean in Portuguese?',
    options: [
      { id: 'a', text: 'Fechar o livro na página 10.', isCorrect: false },
      { id: 'b', text: 'Escrever na página 10 do livro.', isCorrect: false },
      { id: 'c', text: 'Olhar a página 10 de seus livros.', isCorrect: true },
      { id: 'd', text: 'Arrancar a página 10 do livro.', isCorrect: false }
    ],
    correctAnswer: 'c) Olhar a página 10 de seus livros.',
    explanation: '"Look at" means to direct your eyes toward something',
    difficulty: 'easy',
    points: 1
  },
  {
    id: '10',
    number: 10,
    type: 'multiple-choice',
    text: 'Choose the correct question form:',
    options: [
      { id: 'a', text: 'Are you from Mexico?', isCorrect: true },
      { id: 'b', text: 'You are from Mexico?', isCorrect: false },
      { id: 'c', text: 'From Mexico you are?', isCorrect: false },
      { id: 'd', text: 'Is you from Mexico?', isCorrect: false }
    ],
    correctAnswer: 'a) Are you from Mexico?',
    explanation: 'In questions, put the auxiliary verb (are) before the subject (you)',
    difficulty: 'medium',
    points: 1
  }
];

export const additionalQuestions: Question[] = [
  {
    id: '11',
    number: 11,
    type: 'multiple-choice',
    text: 'What is the plural of "child"?',
    options: [
      { id: 'a', text: 'childs', isCorrect: false },
      { id: 'b', text: 'children', isCorrect: true },
      { id: 'c', text: 'childes', isCorrect: false },
      { id: 'd', text: 'child', isCorrect: false }
    ],
    correctAnswer: 'b) children',
    explanation: '"Child" has an irregular plural form: children',
    difficulty: 'easy',
    points: 1
  },
  {
    id: '12',
    number: 12,
    type: 'multiple-choice',
    text: 'Complete the sentence:\n\n"There _______ many books on the table."',
    options: [
      { id: 'a', text: 'is', isCorrect: false },
      { id: 'b', text: 'are', isCorrect: true },
      { id: 'c', text: 'am', isCorrect: false },
      { id: 'd', text: 'be', isCorrect: false }
    ],
    correctAnswer: 'b) are',
    explanation: 'Use "are" with plural nouns (many books)',
    difficulty: 'easy',
    points: 1
  },
  {
    id: '13',
    number: 13,
    type: 'fill-blank',
    text: 'Complete the sentence with the correct possessive adjective:\n\n"This is _______ book." (referring to Mary)',
    correctAnswer: 'her',
    explanation: 'Use "her" for female possession',
    difficulty: 'easy',
    points: 1
  },
  {
    id: '14',
    number: 14,
    type: 'true-false',
    text: 'The sentence "I can to swim" is grammatically correct.',
    correctAnswer: 'False',
    explanation: 'After modal verbs like "can", use the base form without "to": "I can swim"',
    difficulty: 'medium',
    points: 1
  }
];

export const getAllQuestions = (): Question[] => {
  return [...defaultQuestions, ...additionalQuestions];
};

export const getQuestionsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): Question[] => {
  return getAllQuestions().filter(q => q.difficulty === difficulty);
};

export const getRandomQuestions = (count: number, difficulty?: 'easy' | 'medium' | 'hard'): Question[] => {
  const questions = difficulty ? getQuestionsByDifficulty(difficulty) : getAllQuestions();
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((q, index) => ({ ...q, number: index + 1 }));
};