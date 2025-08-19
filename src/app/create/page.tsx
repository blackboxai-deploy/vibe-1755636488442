'use client';

import { useState } from 'react';
import { TestCreator } from '@/components/TestCreator';
import { TestPreview } from '@/components/TestPreview';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TestTemplate } from '@/types/test';
import { defaultQuestions } from '@/lib/questionBank';

export default function CreateTestPage() {
  const [currentTest, setCurrentTest] = useState<TestTemplate>({
    id: crypto.randomUUID(),
    title: 'Prova de Língua Inglesa - 6º Ano',
    subject: 'English',
    gradeLevel: '6º Ano',
    instructions: 'Leia cada questão com atenção. Escolha a melhor alternativa para responder.',
    questions: defaultQuestions,
    studentInfo: {
      name: '',
      class: '',
      date: '',
      grade: ''
    },
    createdAt: new Date(),
    estimatedTime: 45,
    totalPoints: defaultQuestions.reduce((sum, q) => sum + q.points, 0)
  });

  const [activeTab, setActiveTab] = useState('create');

  const handleTestUpdate = (updatedTest: TestTemplate) => {
    setCurrentTest(updatedTest);
  };

  const handleExport = async (format: 'pdf' | 'docx' | 'print', includeAnswerKey: boolean = false) => {
    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          test: currentTest,
          format,
          includeAnswerKey
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${currentTest.title.replace(/\s+/g, '_')}.${format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        console.error('Export failed');
      }
    } catch (error) {
      console.error('Export error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Test Creator</h1>
          <p className="text-gray-600 mt-2">Create and customize your English language test</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={() => handleExport('pdf', false)}
          >
            Export PDF
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleExport('pdf', true)}
          >
            Export with Answer Key
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Panel - Test Info */}
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Test Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Title:</span>
                  <span className="font-medium">{currentTest.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Grade:</span>
                  <span className="font-medium">{currentTest.gradeLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Questions:</span>
                  <span className="font-medium">{currentTest.questions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Points:</span>
                  <span className="font-medium">{currentTest.totalPoints}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Est. Time:</span>
                  <span className="font-medium">{currentTest.estimatedTime} min</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Export Options */}
          <Card>
            <CardHeader>
              <CardTitle>Export Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full" 
                onClick={() => handleExport('pdf')}
              >
                Export Student Version (PDF)
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleExport('pdf', true)}
              >
                Export with Answer Key (PDF)
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleExport('docx')}
              >
                Export as DOCX
              </Button>
              <Button 
                variant="ghost" 
                className="w-full"
                onClick={() => window.print()}
              >
                Print Preview
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Tabs */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="create">Edit Test</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="create" className="mt-6">
              <TestCreator 
                test={currentTest} 
                onTestUpdate={handleTestUpdate}
              />
            </TabsContent>
            <TabsContent value="preview" className="mt-6">
              <TestPreview test={currentTest} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}