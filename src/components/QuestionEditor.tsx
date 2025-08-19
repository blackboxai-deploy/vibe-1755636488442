'use client';

import { useState, useEffect } from 'react';
import { Question, QuestionOption } from '@/types/test';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

interface QuestionEditorProps {
  question: Question | null;
  onSave: (question: Question) => void;
  onCancel: () => void;
}

export function QuestionEditor({ question, onSave, onCancel }: QuestionEditorProps) {
  const [formData, setFormData] = useState<Question>({
    id: '',
    number: 1,
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
  });

  useEffect(() => {
    if (question) {
      setFormData(question);
    }
  }, [question]);

  const updateFormField = (field: keyof Question, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateOption = (optionId: string, field: keyof QuestionOption, value: any) => {
    if (!formData.options) return;
    
    const updatedOptions = formData.options.map(option => 
      option.id === optionId ? { ...option, [field]: value } : option
    );
    
    setFormData(prev => ({
      ...prev,
      options: updatedOptions
    }));
  };

  const setCorrectAnswer = (optionId: string) => {
    if (!formData.options) return;
    
    const updatedOptions = formData.options.map(option => ({
      ...option,
      isCorrect: option.id === optionId
    }));
    
    const correctOption = updatedOptions.find(opt => opt.isCorrect);
    const correctAnswer = correctOption ? `${correctOption.id}) ${correctOption.text}` : '';
    
    setFormData(prev => ({
      ...prev,
      options: updatedOptions,
      correctAnswer
    }));
  };

  const handleSave = () => {
    // Validation
    if (!formData.text.trim()) {
      alert('Please enter a question text');
      return;
    }

    if (formData.type === 'multiple-choice') {
      if (!formData.options?.some(opt => opt.isCorrect)) {
        alert('Please select a correct answer');
        return;
      }
      if (formData.options?.some(opt => !opt.text.trim())) {
        alert('Please fill in all answer options');
        return;
      }
    }

    if ((formData.type === 'fill-blank' || formData.type === 'short-answer' || formData.type === 'true-false') && !formData.correctAnswer.trim()) {
      alert('Please provide the correct answer');
      return;
    }

    // Ensure ID is set for new questions
    const questionToSave = {
      ...formData,
      id: formData.id || crypto.randomUUID()
    };

    onSave(questionToSave);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {question?.id ? 'Edit Question' : 'Add New Question'}
        </h2>
        <div className="space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Question
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Question Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Question Type and Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="type">Question Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => updateFormField('type', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                  <SelectItem value="fill-blank">Fill in the Blank</SelectItem>
                  <SelectItem value="true-false">True/False</SelectItem>
                  <SelectItem value="short-answer">Short Answer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select
                value={formData.difficulty}
                onValueChange={(value) => updateFormField('difficulty', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="points">Points</Label>
              <Input
                id="points"
                type="number"
                min="1"
                value={formData.points}
                onChange={(e) => updateFormField('points', parseInt(e.target.value) || 1)}
              />
            </div>
          </div>

          {/* Question Text */}
          <div>
            <Label htmlFor="text">Question Text</Label>
            <Textarea
              id="text"
              value={formData.text}
              onChange={(e) => updateFormField('text', e.target.value)}
              placeholder="Enter your question here..."
              rows={4}
            />
          </div>

          {/* Answer Options Based on Type */}
          {formData.type === 'multiple-choice' && (
            <div>
              <Label>Answer Options</Label>
              <div className="space-y-3 mt-2">
                {formData.options?.map((option) => (
                  <div key={option.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Checkbox
                      checked={option.isCorrect}
                      onCheckedChange={() => setCorrectAnswer(option.id)}
                    />
                    <Badge variant="outline">{option.id})</Badge>
                    <Input
                      value={option.text}
                      onChange={(e) => updateOption(option.id, 'text', e.target.value)}
                      placeholder={`Option ${option.id.toUpperCase()}`}
                      className="flex-1"
                    />
                    {option.isCorrect && (
                      <Badge variant="default" className="bg-green-500">
                        Correct
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Select the checkbox next to the correct answer
              </p>
            </div>
          )}

          {formData.type === 'fill-blank' && (
            <div>
              <Label htmlFor="correctAnswer">Correct Answer</Label>
              <Input
                id="correctAnswer"
                value={formData.correctAnswer}
                onChange={(e) => updateFormField('correctAnswer', e.target.value)}
                placeholder="Enter the correct answer..."
              />
              <p className="text-sm text-gray-500 mt-1">
                For fill-in-the-blank questions, use _______ in your question text to indicate where the answer goes.
              </p>
            </div>
          )}

          {formData.type === 'true-false' && (
            <div>
              <Label>Correct Answer</Label>
              <div className="flex space-x-4 mt-2">
                <Button
                  variant={formData.correctAnswer === 'True' ? 'default' : 'outline'}
                  onClick={() => updateFormField('correctAnswer', 'True')}
                >
                  True
                </Button>
                <Button
                  variant={formData.correctAnswer === 'False' ? 'default' : 'outline'}
                  onClick={() => updateFormField('correctAnswer', 'False')}
                >
                  False
                </Button>
              </div>
            </div>
          )}

          {formData.type === 'short-answer' && (
            <div>
              <Label htmlFor="correctAnswer">Sample Correct Answer</Label>
              <Textarea
                id="correctAnswer"
                value={formData.correctAnswer}
                onChange={(e) => updateFormField('correctAnswer', e.target.value)}
                placeholder="Provide a sample correct answer or key points..."
                rows={3}
              />
              <p className="text-sm text-gray-500 mt-1">
                This will be used in the answer key for grading reference.
              </p>
            </div>
          )}

          {/* Explanation */}
          <div>
            <Label htmlFor="explanation">Explanation (Optional)</Label>
            <Textarea
              id="explanation"
              value={formData.explanation || ''}
              onChange={(e) => updateFormField('explanation', e.target.value)}
              placeholder="Provide an explanation for the correct answer..."
              rows={3}
            />
            <p className="text-sm text-gray-500 mt-1">
              This explanation will appear in the answer key to help with grading and feedback.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Question Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <Badge variant="outline">Q{formData.number}</Badge>
              <Badge variant={formData.difficulty === 'easy' ? 'default' : 
                           formData.difficulty === 'medium' ? 'secondary' : 'destructive'}>
                {formData.difficulty}
              </Badge>
              <span className="text-sm text-gray-500">
                {formData.points} {formData.points === 1 ? 'point' : 'points'}
              </span>
            </div>
            
            <p className="font-medium mb-3 whitespace-pre-wrap">{formData.text || 'Enter question text...'}</p>
            
            {formData.type === 'multiple-choice' && formData.options && (
              <div className="ml-4 space-y-1">
                {formData.options.map((option) => (
                  <div key={option.id} className="text-sm">
                    {option.id}) {option.text || `Option ${option.id.toUpperCase()}`}
                  </div>
                ))}
              </div>
            )}
            
            {formData.type === 'fill-blank' && (
              <div className="ml-4 text-sm text-gray-600">
                Student fills in: _____________________
              </div>
            )}
            
            {formData.type === 'true-false' && (
              <div className="ml-4 space-y-1 text-sm">
                <div>( ) True</div>
                <div>( ) False</div>
              </div>
            )}
            
            {formData.type === 'short-answer' && (
              <div className="ml-4 text-sm text-gray-600">
                Answer: ___________________________________
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}