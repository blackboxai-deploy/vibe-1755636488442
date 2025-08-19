import { NextRequest, NextResponse } from 'next/server';
import { TestTemplate } from '@/types/test';

export async function POST(request: NextRequest) {
  try {
    const { test, format, includeAnswerKey } = await request.json() as {
      test: TestTemplate;
      format: 'pdf' | 'docx' | 'print';
      includeAnswerKey: boolean;
    };

    if (format === 'pdf') {
      return await generatePDF(test, includeAnswerKey);
    } else if (format === 'docx') {
      return await generateDOCX(test, includeAnswerKey);
    } else {
      return NextResponse.json({ error: 'Unsupported format' }, { status: 400 });
    }
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Export failed' }, { status: 500 });
  }
}

async function generatePDF(test: TestTemplate, includeAnswerKey: boolean) {
  // For now, return a simple HTML that can be converted to PDF by the browser
  const html = generateTestHTML(test, includeAnswerKey);
  
  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
      'Content-Disposition': `attachment; filename="${test.title.replace(/\s+/g, '_')}.html"`
    }
  });
}

async function generateDOCX(test: TestTemplate, includeAnswerKey: boolean) {
  // Generate a simple HTML that can be saved as DOCX
  const html = generateTestHTML(test, includeAnswerKey);
  
  return new NextResponse(html, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename="${test.title.replace(/\s+/g, '_')}.docx"`
    }
  });
}

function generateTestHTML(test: TestTemplate, includeAnswerKey: boolean): string {
  const formatDate = () => {
    const today = new Date();
    return `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
  };

  const questionsHTML = test.questions.map(question => {
    let questionContent = `<h3 style="margin-bottom: 10px; font-weight: bold;">${question.number}. ${question.text}</h3>`;
    
    if (question.type === 'multiple-choice' && question.options) {
      questionContent += '<div style="margin-left: 20px;">';
      question.options.forEach(option => {
        const isCorrect = includeAnswerKey && option.isCorrect;
        questionContent += `<div style="margin-bottom: 5px; ${isCorrect ? 'font-weight: bold; color: #059669;' : ''}">${option.id}) ${option.text}${isCorrect ? ' ✓' : ''}</div>`;
      });
      questionContent += '</div>';
    } else if (question.type === 'fill-blank') {
      questionContent += '<div style="margin-left: 20px; margin-bottom: 5px;">Resposta: ___________________________________</div>';
      if (includeAnswerKey) {
        questionContent += `<div style="margin-left: 20px; font-weight: bold; color: #059669; background-color: #f0fdf4; padding: 8px; border-radius: 4px;">Resposta correta: ${question.correctAnswer}</div>`;
      }
    } else if (question.type === 'true-false') {
      questionContent += '<div style="margin-left: 20px;">';
      const trueIsCorrect = includeAnswerKey && question.correctAnswer === 'True';
      const falseIsCorrect = includeAnswerKey && question.correctAnswer === 'False';
      questionContent += `<div style="margin-bottom: 5px; ${trueIsCorrect ? 'font-weight: bold; color: #059669;' : ''}">( ) Verdadeiro${trueIsCorrect ? ' ✓' : ''}</div>`;
      questionContent += `<div style="margin-bottom: 5px; ${falseIsCorrect ? 'font-weight: bold; color: #059669;' : ''}">( ) Falso${falseIsCorrect ? ' ✓' : ''}</div>`;
      questionContent += '</div>';
    } else if (question.type === 'short-answer') {
      questionContent += '<div style="margin-left: 20px;">';
      questionContent += '<div style="margin-bottom: 5px;">Resposta:</div>';
      questionContent += '<div style="border-bottom: 1px solid #d1d5db; min-height: 60px; margin-bottom: 10px;"></div>';
      if (includeAnswerKey) {
        questionContent += `<div style="font-weight: bold; color: #059669; background-color: #f0fdf4; padding: 8px; border-radius: 4px;">Resposta esperada: ${question.correctAnswer}</div>`;
      }
      questionContent += '</div>';
    }

    if (includeAnswerKey && question.explanation) {
      questionContent += `<div style="margin-left: 20px; margin-top: 10px; color: #1d4ed8; background-color: #eff6ff; padding: 8px; border-radius: 4px;"><strong>Explicação:</strong> ${question.explanation}</div>`;
    }

    return `<div style="margin-bottom: 30px;">${questionContent}</div>`;
  }).join('');

  const answerKeyHTML = includeAnswerKey ? `
    <div style="margin-top: 60px; padding-top: 30px; border-top: 2px solid #d1d5db;">
      <h2 style="text-align: center; font-size: 20px; font-weight: bold; margin-bottom: 20px;">GABARITO</h2>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
        ${test.questions.map(question => `
          <div style="display: flex; justify-content: space-between; padding: 8px; background-color: #f9fafb; border-radius: 4px;">
            <span style="font-weight: 600;">${question.number}.</span>
            <span>${question.correctAnswer}</span>
          </div>
        `).join('')}
      </div>
    </div>
  ` : '';

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${test.title}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
          line-height: 1.6;
          color: #111827;
        }
        h1 {
          text-align: center;
          font-size: 24px;
          margin-bottom: 30px;
          font-weight: bold;
        }
        h2 {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 15px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        td {
          border: 1px solid #d1d5db;
          padding: 8px;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          font-size: 14px;
        }
        .instructions {
          margin-bottom: 30px;
        }
        .instructions p {
          margin: 0;
          line-height: 1.6;
        }
        @media print {
          body { margin: 0; padding: 20px; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <h1>${test.title}</h1>
      
      <table>
        <tr>
          <td style="font-weight: bold; background-color: #f9fafb; width: 80px;">Nome:</td>
          <td style="min-height: 30px;">________________________________________</td>
        </tr>
        <tr>
          <td style="font-weight: bold; background-color: #f9fafb;">Turma:</td>
          <td style="min-height: 30px;">_____</td>
        </tr>
      </table>
      
      <div class="info-row">
        <span>Data: ${formatDate()}</span>
        <span>Nota: _____</span>
      </div>
      
      ${test.instructions ? `
        <div class="instructions">
          <h2>Instruções:</h2>
          <p>${test.instructions.replace(/melhor/g, '<strong>melhor</strong>')}</p>
        </div>
      ` : ''}
      
      <div>
        ${questionsHTML}
      </div>
      
      ${answerKeyHTML}
    </body>
    </html>
  `;
}