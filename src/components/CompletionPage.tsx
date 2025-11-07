import { Button } from './ui/button';
import { Check, Download, Sparkles } from 'lucide-react';

interface CompletionPageProps {
  data: {
    vision: string;
    mission: string;
    values: Array<{ name: string; definition: string }>;
    guidelines: string[];
  };
  onSubmit: () => void;
}

export default function CompletionPage({ data, onSubmit }: CompletionPageProps) {
  const handleDownload = () => {
    // Simulate PDF download
    alert('北极星报告 PDF 已准备好下载');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="mb-4">您的项目"北极星"已点亮</h1>
          <p className="text-slate-600">
            您已成功定义了项目的"北极星"。这不仅是您的团队宣言，更是您未来在 Co-Fo 中决策的向导。
          </p>
        </div>

        {/* North Star Report Preview */}
        <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-8 mb-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-blue-600" />
              <h2>北极星报告</h2>
            </div>
          </div>

          {/* Vision & Mission */}
          <div className="mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <h3>愿景 Vision</h3>
                </div>
                <p className="text-slate-700 leading-relaxed">{data.vision}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <h3>使命 Mission</h3>
                </div>
                <p className="text-slate-700 leading-relaxed">{data.mission}</p>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-8">
            <h3 className="mb-4">核心价值观</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {data.values.map((value, index) => (
                <div key={index} className="bg-slate-50 rounded-lg p-4 border-l-4 border-blue-600">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-700">{index + 1}</span>
                    </div>
                    <p className="text-blue-700">{value.name}</p>
                  </div>
                  <p className="text-slate-600 ml-8">{value.definition}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Guidelines */}
          <div>
            <h3 className="mb-4">行为准则</h3>
            <div className="space-y-3">
              {data.guidelines.map((guideline, index) => (
                <div key={index} className="bg-slate-50 rounded-lg p-4 flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-slate-700">{guideline}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={handleDownload}
            variant="outline"
            className="flex-1"
          >
            <Download className="w-4 h-4 mr-2" />
            下载北极星报告 (PDF)
          </Button>
          <Button 
            onClick={onSubmit}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            提交并点亮任务
          </Button>
        </div>
      </div>
    </div>
  );
}
