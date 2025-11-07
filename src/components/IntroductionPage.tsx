import { Button } from './ui/button';
import { Sparkles, PlayCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface IntroductionPageProps {
  onStart: () => void;
}

export default function IntroductionPage({ onStart }: IntroductionPageProps) {
  const [hasSavedProgress, setHasSavedProgress] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('northStarData');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.vision || data.mission || data.values?.length > 0 || data.guidelines?.length > 0) {
          setHasSavedProgress(true);
        }
      } catch (e) {
        // Ignore
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-6">
            <Sparkles className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="mb-8">点亮你的项目"北极星"</h1>
        </div>

        <div className="space-y-6 mb-12">
          {/* Co-Fo Introduction */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
            <p className="text-slate-700 mb-6">
              你好。在开始定义您项目的愿景与准则之前，Co-Fo 需要向您说明它的核心价值和重要性：
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                <div>
                  <p className="mb-1"><strong>您的"北极星"：</strong></p>
                  <p className="text-slate-600">它是项目最长远的指引，确保您在各种选择和诱惑面前不迷失方向。</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                <div>
                  <p className="mb-1"><strong>团队的"磁场"：</strong></p>
                  <p className="text-slate-600">清晰的愿景能吸引志同道合的伙伴、客户和投资者。</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                <div>
                  <p className="mb-1"><strong>决策的"准绳"：</strong></p>
                  <p className="text-slate-600">当遇到困难或冲突时，您的愿景与准则将是您衡量一切、做出决定的最根本依据。</p>
                </div>
              </div>
            </div>
          </div>

          {/* Module Bridge - Important */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6 shadow-md border-2 border-amber-300">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white">🔗</span>
              </div>
              <div>
                <p className="mb-3"><strong className="text-amber-900">模块的"基石"（全局框架可见）：</strong></p>
                <p className="text-slate-700 mb-4">
                  您在此处定义的内容，将在后续模块中被 Co-Fo 实时引用，以确保您后续的决策与初心保持一致：
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-700">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    <span><strong>L3-P3.1.1-2 能力与策略</strong> - 基于您的愿景定义团队核心能力</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    <span><strong>L3-P4.1.1-4 融资策略</strong> - 用价值观筛选投资人匹配度</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    <span><strong>L3-P5.1.1-2 任务与进展</strong> - 用准则衡量里程碑决策</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          {hasSavedProgress && (
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <PlayCircle className="w-5 h-5 text-blue-600" />
                <p className="text-blue-900">检测到未完成的进度</p>
              </div>
              <p className="text-slate-600 text-sm">您可以继续之前的编辑（断点续传）</p>
            </div>
          )}
          <Button 
            onClick={onStart}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
          >
            {hasSavedProgress ? '继续构建北极星' : '开始构建北极星'}
          </Button>
        </div>
      </div>
    </div>
  );
}
