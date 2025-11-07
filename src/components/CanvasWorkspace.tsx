import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Info, Plus, Check } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import ValueSelector from './ValueSelector';
import GuidelineBuilder from './GuidelineBuilder';
import WireframeVisualization from './WireframeVisualization';
import AISummaryPanel from './AISummaryPanel';

interface CanvasWorkspaceProps {
  onComplete: (data: {
    vision: string;
    mission: string;
    values: Array<{ name: string; definition: string }>;
    guidelines: string[];
  }) => void;
}

export default function CanvasWorkspace({ onComplete }: CanvasWorkspaceProps) {
  const [activeBlock, setActiveBlock] = useState<1 | 2 | 3>(1);
  const [vision, setVision] = useState('成为行业领先的创新解决方案提供商，用技术改善人们的生活质量');
  const [mission, setMission] = useState('通过持续创新和用户至上的理念，为客户创造卓越价值，推动行业进步');
  const [values, setValues] = useState<Array<{ name: string; definition: string }>>([]);
  const [guidelines, setGuidelines] = useState<string[]>([]);
  const [showValueSelector, setShowValueSelector] = useState(false);
  const [showGuidelineBuilder, setShowGuidelineBuilder] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'idle'>('idle');

  // Auto-save functionality
  const handleAutoSave = () => {
    setAutoSaveStatus('saving');
    setTimeout(() => {
      setAutoSaveStatus('saved');
      setTimeout(() => setAutoSaveStatus('idle'), 2000);
    }, 500);
  };

  const handleBlock1Complete = () => {
    if (vision.trim() && mission.trim()) {
      handleAutoSave();
      setActiveBlock(2);
    }
  };

  const handleAddValue = (name: string, definition: string) => {
    setValues([...values, { name, definition }]);
    setShowValueSelector(false);
    handleAutoSave();
    if (values.length === 0) {
      setTimeout(() => setActiveBlock(3), 500);
    }
  };

  const handleAddGuideline = (guideline: string) => {
    setGuidelines([...guidelines, guideline]);
    setShowGuidelineBuilder(false);
    handleAutoSave();
  };

  const handleComplete = () => {
    onComplete({ vision, mission, values, guidelines });
  };

  const isBlock1Complete = vision.trim() && mission.trim();
  const isBlock2Complete = values.length > 0;
  const isBlock3Complete = guidelines.length > 0;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Canvas Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="mb-0">北极星画布</h1>
                {autoSaveStatus !== 'idle' && (
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    autoSaveStatus === 'saving' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {autoSaveStatus === 'saving' ? '保存中...' : '✓ 已保存'}
                  </span>
                )}
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm">🤖</span>
                  </div>
                  <div>
                    <p className="mb-1"><strong className="text-blue-900">AI 智能提炼</strong></p>
                    <p className="text-slate-700">
                      Co-Fo 将引导您从上至下，逐步完成画布的三个核心部分。您已在「可」和「事」模块中完成了深入的思考，Co-Fo 已为您智能提炼了初稿。
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Wireframe Visualization */}
              <WireframeVisualization 
                isBlock1Complete={isBlock1Complete}
                isBlock2Complete={isBlock2Complete}
                isBlock3Complete={isBlock3Complete}
                activeBlock={activeBlock}
              />
            </div>

            {/* Block 1: Vision & Mission */}
            <div 
              className={`rounded-lg border-2 p-6 transition-all duration-500 ${
                activeBlock === 1 
                  ? 'bg-white border-blue-500 shadow-lg scale-[1.01]' 
                  : isBlock1Complete
                  ? 'bg-gradient-to-br from-white to-green-50 border-green-400 shadow-md'
                  : 'bg-slate-50/50 border-slate-300 border-dashed opacity-40 grayscale'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isBlock1Complete ? 'bg-green-500' : activeBlock === 1 ? 'bg-blue-500' : 'bg-slate-300'
                  }`}>
                    {isBlock1Complete ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <span className="text-white">1</span>
                    )}
                  </div>
                  <div>
                    <h3 className={activeBlock !== 1 && !isBlock1Complete ? 'text-slate-400' : ''}>
                      项目愿景与使命
                    </h3>
                    <p className="text-slate-500">您项目的灵魂宣言</p>
                  </div>
                </div>
                {isBlock1Complete && (
                  <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    ✓ 已完成
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="block">愿景 Vision</label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs cursor-help">
                            <span className="text-xs">🤖</span>
                            <span>AI 溯源</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-sm bg-purple-50 border-purple-200">
                          <div className="space-y-2">
                            <p><strong className="text-purple-900">AI 溯源注释（透明度）：</strong></p>
                            <p className="text-slate-700">此初稿提炼自您在「事」模块的"核心创业想法"和「可」模块的"个人驱动力"。Co-Fo 确保您的思考一脉相承。</p>
                            <div className="pt-2 border-t border-purple-200 text-xs text-slate-600">
                              <p>数据来源：</p>
                              <p>• 「事」模块 → 核心创业想法</p>
                              <p>• 「可」模块 → 个人驱动力</p>
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="relative">
                    <Textarea 
                      value={vision}
                      onChange={(e) => setVision(e.target.value)}
                      placeholder="输入您的项目愿景..."
                      className={`min-h-24 transition-all ${
                        vision && activeBlock === 1 ? 'bg-blue-50 border-blue-300' : ''
                      }`}
                      disabled={activeBlock !== 1}
                    />
                    {vision && activeBlock === 1 && (
                      <div className="absolute top-2 right-2 text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                        AI 预填充
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="block">使命 Mission</label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs cursor-help">
                            <span className="text-xs">🤖</span>
                            <span>AI 溯源</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-sm bg-purple-50 border-purple-200">
                          <div className="space-y-2">
                            <p><strong className="text-purple-900">AI 溯源注释（透明度）：</strong></p>
                            <p className="text-slate-700">此初稿提炼自您在「事」模块的"核心创业想法"和「可」模块的"个人驱动力"。Co-Fo 确保您的思考一脉相承。</p>
                            <div className="pt-2 border-t border-purple-200 text-xs text-slate-600">
                              <p>数据来源：</p>
                              <p>• 「事」模块 → 核心创业想法</p>
                              <p>• 「可」模块 → 个人驱动力</p>
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="relative">
                    <Textarea 
                      value={mission}
                      onChange={(e) => setMission(e.target.value)}
                      placeholder="输入您的项目使命..."
                      className={`min-h-24 transition-all ${
                        mission && activeBlock === 1 ? 'bg-blue-50 border-blue-300' : ''
                      }`}
                      disabled={activeBlock !== 1}
                    />
                    {mission && activeBlock === 1 && (
                      <div className="absolute top-2 right-2 text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                        AI 预填充
                      </div>
                    )}
                  </div>
                </div>

                {activeBlock === 1 && (
                  <Button 
                    onClick={handleBlock1Complete}
                    className="w-full"
                    disabled={!vision.trim() || !mission.trim()}
                  >
                    确认并继续
                  </Button>
                )}
              </div>
            </div>

            {/* Block 2: Core Values */}
            <div 
              className={`rounded-lg border-2 p-6 transition-all duration-500 ${
                activeBlock === 2 
                  ? 'bg-white border-blue-500 shadow-lg scale-[1.01]' 
                  : isBlock2Complete
                  ? 'bg-gradient-to-br from-white to-green-50 border-green-400 shadow-md'
                  : activeBlock > 2
                  ? 'bg-white border-slate-300'
                  : 'bg-slate-50/50 border-slate-300 border-dashed opacity-40 grayscale'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isBlock2Complete ? 'bg-green-500' : activeBlock === 2 ? 'bg-blue-500' : 'bg-slate-300'
                  }`}>
                    {isBlock2Complete ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <span className="text-white">2</span>
                    )}
                  </div>
                  <div>
                    <h3 className={activeBlock !== 2 && !isBlock2Complete && activeBlock < 2 ? 'text-slate-400' : ''}>
                      核心价值观
                    </h3>
                    <p className="text-slate-500">您项目坚守的原则</p>
                  </div>
                </div>
                {isBlock2Complete && (
                  <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    ✓ 已完成
                  </span>
                )}
              </div>

              <div className="space-y-4">
                {values.length === 0 && activeBlock >= 2 && (
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 mb-4">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">💡</span>
                      <div>
                        <p className="mb-1"><strong className="text-amber-900">AI 辅助定义</strong></p>
                        <p className="text-slate-700 text-sm">
                          Co-Fo 将为您提供预填充选项，帮助您快速定义核心价值观。
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {values.map((value, index) => (
                  <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full">
                        {value.name}
                      </div>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                        🤖 AI 辅助
                      </span>
                    </div>
                    <p className="text-slate-700">{value.definition}</p>
                  </div>
                ))}

                {activeBlock >= 2 && (
                  <Button 
                    onClick={() => setShowValueSelector(true)}
                    variant="outline"
                    className="w-full border-dashed border-2 hover:border-blue-500 hover:bg-blue-50"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    添加价值观
                  </Button>
                )}
              </div>
            </div>

            {/* Block 3: Guidelines */}
            <div 
              className={`rounded-lg border-2 p-6 transition-all duration-500 ${
                activeBlock === 3 
                  ? 'bg-white border-blue-500 shadow-lg scale-[1.01]' 
                  : isBlock3Complete
                  ? 'bg-gradient-to-br from-white to-green-50 border-green-400 shadow-md'
                  : 'bg-slate-50/50 border-slate-300 border-dashed opacity-40 grayscale'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isBlock3Complete ? 'bg-green-500' : activeBlock === 3 ? 'bg-blue-500' : 'bg-slate-300'
                  }`}>
                    {isBlock3Complete ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <span className="text-white">3</span>
                    )}
                  </div>
                  <div>
                    <h3 className={activeBlock !== 3 && !isBlock3Complete ? 'text-slate-400' : ''}>
                      行为准则
                    </h3>
                    <p className="text-slate-500">价值观在具体行动中的体现</p>
                  </div>
                </div>
                {isBlock3Complete && (
                  <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    ✓ 已完成
                  </span>
                )}
              </div>

              <div className="space-y-4">
                {guidelines.length === 0 && activeBlock >= 3 && (
                  <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 mb-4">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">🎯</span>
                      <div>
                        <p className="mb-1"><strong className="text-amber-900">场景化建议</strong></p>
                        <p className="text-slate-700 text-sm">
                          Co-Fo 将基于您的价值观，为具体场景提供行为准则建议。
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {guidelines.map((guideline, index) => (
                  <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200 flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-700 mb-1">{guideline}</p>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                        🤖 AI 场景化建议
                      </span>
                    </div>
                  </div>
                ))}

                {activeBlock >= 3 && (
                  <Button 
                    onClick={() => setShowGuidelineBuilder(true)}
                    variant="outline"
                    className="w-full border-dashed border-2 hover:border-blue-500 hover:bg-blue-50"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    添加准则
                  </Button>
                )}
              </div>
            </div>

            {/* Complete Button */}
            {isBlock1Complete && isBlock2Complete && isBlock3Complete && (
              <div className="pt-6">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border-2 border-amber-300 mb-4">
                  <p className="mb-2"><strong className="text-amber-900">🔗 模块桥梁提示：</strong></p>
                  <p className="text-slate-700 text-sm mb-3">
                    您定义的北极星将成为后续模块的决策依据
                  </p>
                  <div className="space-y-1 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                      <span>能力与策略 → 将引用您的愿景</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                      <span>融资策略 → 将引用您的价值观</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                      <span>任务与进展 → 将引用您的准则</span>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={handleComplete}
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  保存并完成北极星
                </Button>
              </div>
            )}
          </div>

          {/* Co-Fo Dialogue Area */}
          <div className="lg:col-span-1 space-y-4">
            {/* AI Summary Panel */}
            <div className="sticky top-6">
              <AISummaryPanel activeBlock={activeBlock} />
            </div>

            {/* Co-Fo Contextual Guidance */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 sticky top-[28rem]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-white">Co</span>
                </div>
                <div>
                  <p>Co-Fo</p>
                  <p className="text-slate-500">AI 助手</p>
                </div>
              </div>

              <div className="space-y-4">

                {activeBlock === 1 && (
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <p className="mb-2"><strong>Co-Fo 校验建议：</strong></p>
                    <p className="text-slate-700">
                      一份好的愿景应鼓舞人心（Energizing）。您可以尝试使用更积极、明确的词汇来优化。
                    </p>
                  </div>
                )}

                {activeBlock === 2 && (
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <p className="mb-2"><strong>当前步骤：</strong></p>
                    <p className="text-slate-700">
                      选择您的核心价值观。每个价值观都需要一个清晰的定义，以便团队理解和践行。
                    </p>
                    <div className="mt-3 pt-3 border-t border-blue-200">
                      <p className="text-sm text-slate-600">
                        💡 Co-Fo 将提供 <strong>AI 辅助定义（预填充选项）</strong>，您也可以自定义。
                      </p>
                    </div>
                  </div>
                )}

                {activeBlock === 3 && (
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <p className="mb-2"><strong>当前步骤：</strong></p>
                    <p className="text-slate-700">
                      制定行为准则，将价值观转化为可执行的行动指南。
                    </p>
                    <div className="mt-3 pt-3 border-t border-blue-200">
                      <p className="text-sm text-slate-600">
                        🎯 Co-Fo 将基于您的价值观提供 <strong>场景化建议</strong>。
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Value Selector Modal */}
      {showValueSelector && (
        <ValueSelector 
          existingValues={values}
          onAdd={handleAddValue}
          onClose={() => setShowValueSelector(false)}
        />
      )}

      {/* Guideline Builder Modal */}
      {showGuidelineBuilder && (
        <GuidelineBuilder 
          values={values}
          onAdd={handleAddGuideline}
          onClose={() => setShowGuidelineBuilder(false)}
        />
      )}
    </div>
  );
}
