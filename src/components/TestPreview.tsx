'use client';

import { TestTemplate } from '@/types/test';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface TestPreviewProps {
  test: TestTemplate;
  showAnswers?: boolean;
}

export function TestPreview({ test, showAnswers = false }: TestPreviewProps) {
  const [viewMode, setViewMode] = useState<'student' | 'answer-key'>('student');

  const formatDate = () => {
    const today = new Date();
    return `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
  };

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Test Preview</h2>
        <div className="space-x-2">
          <Button
            variant={viewMode === 'student' ? 'default' : 'outline'}
            onClick={() => setViewMode('student')}
            size="sm"
          >
            Student View
          </Button>
          <Button
            variant={viewMode === 'answer-key' ? 'default' : 'outline'}
            onClick={() => setViewMode('answer-key')}
            size="sm"
          >
            Answer Key
          </Button>
        </div>
      </div>

      {/* Test Paper Preview */}
      <Card className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none print:max-w-none">
        <CardContent className="p-8 print:p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-4">{test.title}</h1>
          </div>

          {/* Student Information Table */}
          <div className="mb-6">
            <table className="w-full border border-gray-300 mb-4">
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium bg-gray-50 w-20">Nome:</td>
                  <td className="border border-gray-300 p-2 min-h-[2rem]">
                    {viewMode === 'answer-key' ? '________________________________________' : '________________________________________'}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 font-medium bg-gray-50">Turma:</td>
                  <td className="border border-gray-300 p-2 min-h-[2rem]">
                    {viewMode === 'answer-key' ? '_____' : '_____'}
                  </td>
                </tr>
              </tbody>
            </table>
            
            <div className="flex justify-between text-sm mb-6">
              <span>Data: {formatDate()}</span>
              <span>Nota: _____</span>
            </div>
          </div>

          {/* Instructions */}
          {test.instructions && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2">Instruções:</h2>
              <p className="text-sm leading-relaxed">
                {test.instructions.split('melhor').map((part, index, array) => (
                  <span key={index}>
                    {part}
                    {index < array.length - 1 && <strong>melhor</strong>}
                  </span>
                ))}
              </p>
            </div>
          )}

          {/* Questions */}
          <div className="space-y-6">
            {test.questions.map((question, index) => (
              <div key={question.id} className="mb-6">
                {/* Question Header */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-base">
                    {question.number}. {question.text}
                  </h3>
                  {viewMode === 'answer-key' && (
                    <div className="flex space-x-1 ml-4">
                      <Badge variant="outline" className="text-xs">
                        {question.difficulty}
                      </Badge>
                      <Badge variant="default" className="text-xs">
                        {question.points} pts
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Question Content */}
                <div className="ml-6">
                  {question.type === 'multiple-choice' && question.options && (
                    <div className="space-y-2">
                      {question.options.map((option) => (
                        <div
                          key={option.id}
                          className={`text-sm ${
                            viewMode === 'answer-key' && option.isCorrect
                              ? 'font-bold text-green-700 bg-green-50 p-1 rounded'
                              : ''
                          }`}
                        >
                          {option.id}) {option.text}
                          {viewMode === 'answer-key' && option.isCorrect && ' ✓'}
                        </div>
                      ))}
                    </div>
                  )}

                  {question.type === 'fill-blank' && (
                    <div className="space-y-2">
                      <div className="text-sm">
                        Resposta: ___________________________________
                      </div>
                      {viewMode === 'answer-key' && (
                        <div className="text-sm font-bold text-green-700 bg-green-50 p-2 rounded">
                          Resposta correta: {question.correctAnswer}
                        </div>
                      )}
                    </div>
                  )}

                  {question.type === 'true-false' && (
                    <div className="space-y-2">
                      <div className="text-sm space-y-1">
                        <div className={viewMode === 'answer-key' && question.correctAnswer === 'True' ? 'font-bold text-green-700' : ''}>
                          ( ) Verdadeiro {viewMode === 'answer-key' && question.correctAnswer === 'True' && '✓'}
                        </div>
                        <div className={viewMode === 'answer-key' && question.correctAnswer === 'False' ? 'font-bold text-green-700' : ''}>
                          ( ) Falso {viewMode === 'answer-key' && question.correctAnswer === 'False' && '✓'}
                        </div>
                      </div>
                    </div>
                  )}

                  {question.type === 'short-answer' && (
                    <div className="space-y-2">
                      <div className="text-sm">
                        Resposta:
                      </div>
                      <div className="border-b border-gray-300 min-h-[3rem] mb-2"></div>
                      {viewMode === 'answer-key' && (
                        <div className="text-sm font-bold text-green-700 bg-green-50 p-2 rounded">
                          Resposta esperada: {question.correctAnswer}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Explanation in Answer Key */}
                  {viewMode === 'answer-key' && question.explanation && (
                    <div className="mt-2 text-sm text-blue-700 bg-blue-50 p-2 rounded">
                      <strong>Explicação:</strong> {question.explanation}
                    </div>
                  )}
                </div>

                {/* Add space between questions */}
                {index < test.questions.length - 1 && <div className="mt-6"></div>}
              </div>
            ))}
          </div>

          {/* Answer Key Section (when in answer key mode) */}
          {viewMode === 'answer-key' && (
            <div className="mt-12 pt-8 border-t-2 border-gray-300">
              <h2 className="text-xl font-bold mb-4 text-center">GABARITO</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                {test.questions.map((question, index) => (
                  <div key={question.id} className="flex justify-between p-2 bg-gray-50 rounded">
                    <span className="font-medium">{question.number}.</span>
                    <span>{question.correctAnswer}</span>
                  </div>
                ))}
              </div>
              
              {/* Summary Statistics */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
                <div className="bg-blue-50 p-3 rounded">
                  <div className="font-bold text-blue-700">{test.questions.length}</div>
                  <div className="text-blue-600">Total Questions</div>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <div className="font-bold text-green-700">{test.totalPoints}</div>
                  <div className="text-green-600">Total Points</div>
                </div>
                <div className="bg-purple-50 p-3 rounded">
                  <div className="font-bold text-purple-700">{test.estimatedTime}</div>
                  <div className="text-purple-600">Minutes</div>
                </div>
                <div className="bg-orange-50 p-3 rounded">
                  <div className="font-bold text-orange-700">
                    {test.questions.filter(q => q.difficulty === 'easy').length}/
                    {test.questions.filter(q => q.difficulty === 'medium').length}/
                    {test.questions.filter(q => q.difficulty === 'hard').length}
                  </div>
                  <div className="text-orange-600">E/M/H</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Print Instructions */}
      <div className="text-center text-sm text-gray-500 print:hidden">
        <p>Use your browser's print function (Ctrl+P) to print this test</p>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body { margin: 0; }
          .container { max-width: none !important; }
          .print\\:hidden { display: none !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:max-w-none { max-width: none !important; }
          .print\\:p-6 { padding: 1.5rem !important; }
          
          /* Ensure proper page breaks */
          .space-y-6 > div {
            break-inside: avoid;
          }
          
          /* Remove backgrounds for printing */
          .bg-gray-50, .bg-green-50, .bg-blue-50, .bg-purple-50, .bg-orange-50 {
            background-color: transparent !important;
          }
        }
      `}</style>
    </div>
  );
}