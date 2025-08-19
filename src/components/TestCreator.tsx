'use client';

import { useState } from 'react';
import { TestTemplate, Question } from '@/types/test';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuestionEditor } from '@/components/QuestionEditor';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface TestCreatorProps {
  test: TestTemplate;
  onTestUpdate: (test: TestTemplate) => void;
}

export function TestCreator({ test, onTestUpdate }: TestCreatorProps) {
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [showQuestionEditor, setShowQuestionEditor] = useState(false);

  const updateTestField = (field: keyof TestTemplate, value: any) => {
    onTestUpdate({
      ...test,
      [field]: value
    });
  };

  const addNewQuestion = () => {
    const newQuestion: Question = {
      id: crypto.randomUUID(),
      number: test.questions.length + 1,
      type: 'multiple-choice',
      text: '',
      options: [
        { id: 'a', text: '', isCorrect: false },
        { id: 'b', text: '', isCorrect: false },
        { id: 'c', text: '', isCorrect: false },
        { id: 'd', text: '', isCorrect: false }
      ],
      correctAnswer: '',
      explanation: '',
      difficulty: 'easy',
      points: 1
    };
    setEditingQuestion(newQuestion);
    setShowQuestionEditor(true);
  };

  const editQuestion = (question: Question) => {
    setEditingQuestion(question);
    setShowQuestionEditor(true);
  };

  const saveQuestion = (question: Question) => {
    const updatedQuestions = editingQuestion && test.questions.find(q => q.id === editingQuestion.id)
      ? test.questions.map(q => q.id === question.id ? question : q)
      : [...test.questions, question];

    // Renumber questions
    const renumberedQuestions = updatedQuestions.map((q, index) => ({
      ...q,
      number: index + 1
    }));

    onTestUpdate({
      ...test,
      questions: renumberedQuestions,
      totalPoints: renumberedQuestions.reduce((sum, q) => sum + q.points, 0)
    });

    setShowQuestionEditor(false);
    setEditingQuestion(null);
  };

  const deleteQuestion = (questionId: string) => {
    const updatedQuestions = test.questions
      .filter(q => q.id !== questionId)
      .map((q, index) => ({ ...q, number: index + 1 }));

    onTestUpdate({
      ...test,
      questions: updatedQuestions,
      totalPoints: updatedQuestions.reduce((sum, q) => sum + q.points, 0)
    });
  };

  const moveQuestion = (questionId: string, direction: 'up' | 'down') => {
    const currentIndex = test.questions.findIndex(q => q.id === questionId);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === test.questions.length - 1)
    ) {
      return;
    }

    const newQuestions = [...test.questions];
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    [newQuestions[currentIndex], newQuestions[newIndex]] = [newQuestions[newIndex], newQuestions[currentIndex]];

    // Renumber questions
    const renumberedQuestions = newQuestions.map((q, index) => ({
      ...q,
      number: index + 1
    }));

    onTestUpdate({
      ...test,
      questions: renumberedQuestions
    });
  };

  if (showQuestionEditor) {
    return (
      <QuestionEditor
        question={editingQuestion}
        onSave={saveQuestion}
        onCancel={() => {
          setShowQuestionEditor(false);
          setEditingQuestion(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Test Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Test Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Test Title</Label>
              <Input
                id="title"
                value={test.title}
                onChange={(e) => updateTestField('title', e.target.value)}
                placeholder="Enter test title..."
              />
            </div>
            <div>
              <Label htmlFor="gradeLevel">Grade Level</Label>
              <Input
                id="gradeLevel"
                value={test.gradeLevel}
                onChange={(e) => updateTestField('gradeLevel', e.target.value)}
                placeholder="e.g., 6º Ano"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="instructions">Instructions</Label>
            <Textarea
              id="instructions"
              value={test.instructions}
              onChange={(e) => updateTestField('instructions', e.target.value)}
              placeholder="Enter test instructions..."
              rows={3}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={test.subject}
                onChange={(e) => updateTestField('subject', e.target.value)}
                placeholder="e.g., English"
              />
            </div>
            <div>
              <Label htmlFor="estimatedTime">Estimated Time (minutes)</Label>
              <Input
                id="estimatedTime"
                type="number"
                value={test.estimatedTime}
                onChange={(e) => updateTestField('estimatedTime', parseInt(e.target.value) || 0)}
                placeholder="45"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Questions ({test.questions.length})</CardTitle>
            <Button onClick={addNewQuestion}>Add Question</Button>
          </div>
        </CardHeader>
        <CardContent>
          {test.questions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No questions added yet.</p>
              <Button className="mt-4" onClick={addNewQuestion}>
                Add Your First Question
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {test.questions.map((question, index) => (
                <div
                  key={question.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">Q{question.number}</Badge>
                      <Badge
                        variant={question.difficulty === 'easy' ? 'default' : 
                                question.difficulty === 'medium' ? 'secondary' : 'destructive'}
                      >
                        {question.difficulty}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {question.points} {question.points === 1 ? 'point' : 'points'}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveQuestion(question.id, 'up')}
                        disabled={index === 0}
                      >
                        ↑
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => moveQuestion(question.id, 'down')}
                        disabled={index === test.questions.length - 1}
                      >
                        ↓
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => editQuestion(question)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteQuestion(question.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <p className="font-medium mb-2">{question.text}</p>
                    {question.type === 'multiple-choice' && question.options && (
                      <div className="ml-4 space-y-1">
                        {question.options.map((option) => (
                          <div
                            key={option.id}
                            className={`text-sm ${option.isCorrect ? 'text-green-600 font-medium' : 'text-gray-600'}`}
                          >
                            {option.id}) {option.text}
                            {option.isCorrect && ' ✓'}
                          </div>
                        ))}
                      </div>
                    )}
                    {(question.type === 'fill-blank' || question.type === 'short-answer') && (
                      <div className="ml-4 text-green-600 font-medium">
                        Answer: {question.correctAnswer}
                      </div>
                    )}
                    {question.type === 'true-false' && (
                      <div className="ml-4 text-green-600 font-medium">
                        Answer: {question.correctAnswer}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Test Summary */}
      {test.questions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Test Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{test.questions.length}</div>
                <div className="text-sm text-gray-600">Total Questions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{test.totalPoints}</div>
                <div className="text-sm text-gray-600">Total Points</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{test.estimatedTime}</div>
                <div className="text-sm text-gray-600">Minutes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {test.questions.filter(q => q.difficulty === 'easy').length}/
                  {test.questions.filter(q => q.difficulty === 'medium').length}/
                  {test.questions.filter(q => q.difficulty === 'hard').length}
                </div>
                <div className="text-sm text-gray-600">Easy/Med/Hard</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}