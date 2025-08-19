'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function HomePage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const templates = [
    {
      id: 'english-6th-grade',
      title: 'English - 6th Grade',
      description: 'Grammar and vocabulary test for 6th grade students',
      questions: 10,
      estimatedTime: '45 minutes',
      difficulty: 'Easy',
      subjects: ['Grammar', 'Vocabulary', 'Reading']
    },
    {
      id: 'english-7th-grade',
      title: 'English - 7th Grade',
      description: 'Intermediate English test with mixed question types',
      questions: 15,
      estimatedTime: '60 minutes',
      difficulty: 'Medium',
      subjects: ['Grammar', 'Reading Comprehension', 'Writing']
    },
    {
      id: 'custom-test',
      title: 'Custom Test',
      description: 'Create your own test from scratch',
      questions: 'Variable',
      estimatedTime: 'Variable',
      difficulty: 'Custom',
      subjects: ['Customizable']
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          English Test Generator
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Create professional English language tests with customizable questions, 
          automatic answer keys, and multiple export formats.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <Card className="bg-white shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600">Ready Questions</div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">3</div>
            <div className="text-gray-600">Export Formats</div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">4</div>
            <div className="text-gray-600">Question Types</div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">Auto</div>
            <div className="text-gray-600">Answer Keys</div>
          </CardContent>
        </Card>
      </div>

      {/* Template Selection */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose a Template</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card 
              key={template.id} 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedTemplate === template.id 
                  ? 'ring-2 ring-blue-500 bg-blue-50' 
                  : 'bg-white'
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{template.title}</CardTitle>
                  <Badge variant={template.difficulty === 'Easy' ? 'default' : 
                                 template.difficulty === 'Medium' ? 'secondary' : 'destructive'}>
                    {template.difficulty}
                  </Badge>
                </div>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Questions:</span>
                    <span className="font-medium">{template.questions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-medium">{template.estimatedTime}</span>
                  </div>
                  <div className="mt-3">
                    <div className="text-xs text-gray-500 mb-1">Subjects:</div>
                    <div className="flex flex-wrap gap-1">
                      {template.subjects.map((subject) => (
                        <Badge key={subject} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="text-center space-x-4">
        <Link href="/create">
          <Button 
            size="lg" 
            className="px-8 py-3"
            disabled={!selectedTemplate}
          >
            Create Test
          </Button>
        </Link>
        <Link href="/question-bank">
          <Button variant="outline" size="lg" className="px-8 py-3">
            Browse Question Bank
          </Button>
        </Link>
      </div>

      {/* Features */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📝</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Multiple Question Types</h3>
          <p className="text-gray-600">
            Multiple choice, fill-in-the-blank, true/false, and short answer questions.
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📄</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Export Options</h3>
          <p className="text-gray-600">
            Generate PDF, DOCX files, or print-ready formats with professional layouts.
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔑</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Automatic Answer Keys</h3>
          <p className="text-gray-600">
            Generate answer keys with explanations automatically for easy grading.
          </p>
        </div>
      </div>
    </div>
  );
}