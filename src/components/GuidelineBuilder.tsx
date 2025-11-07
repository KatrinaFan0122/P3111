import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { X, Sparkles } from 'lucide-react';

interface GuidelineBuilderProps {
  values: Array<{ name: string; definition: string }>;
  onAdd: (guideline: string) => void;
  onClose: () => void;
}

const scenarios = [
  {
    name: '意见分歧',
    description: '当团队出现意见分歧时...',
    suggestions: {
      '协作': '我们秉持开放沟通，鼓励不同声音，最终通过建设性讨论达成共识。',
      '诚信': '我们坦诚表达不同观点，基于事实和数据进行理性讨论，不回避问题。',
      '用户至上': '我们回归用户需求本质，用数据验证哪个方案更符合用户利益。',
    }
  },
  {
    name: '项目延期',
    description: '当项目进度落后于计划时...',
    suggestions: {
      '诚信': '我们及时透明地向相关方沟通实际情况，不粉饰问题，共同寻找解决方案。',
      '卓越': '我们分析根本原因，优化流程，确保质量的同时提高效率。',
      '协作': '我们动员团队资源，跨部门协作，共同攻克难关。',
    }
  },
  {
    name: '新机会出现',
    description: '当遇到诱人但偏离方向的新机会时...',
    suggestions: {
      '用户至上': '我们评估新机会是否真正为核心用户创造价值，避免被短期利益诱惑。',
      '创新': '我们保持开放心态评估机会，但确保创新方向与长期愿景一致。',
      '卓越': '我们聚焦核心业务，确保在主要方向上做到最好，再考虑多元化。',
    }
  },
  {
    name: '资源紧张',
    description: '当面临预算或人力资源限制时...',
    suggestions: {
      '用户至上': '我们优先投入到直接影响用户体验的关键功能上。',
      '卓越': '我们专注于少数高优先级项目，确保每个项目都能做到极致。',
      '协作': '我们优化团队分工，通过更高效的协作来弥补资源不足。',
    }
  },
];

export default function GuidelineBuilder({ values, onAdd, onClose }: GuidelineBuilderProps) {
  const [selectedScenario, setSelectedScenario] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState('');
  const [customGuideline, setCustomGuideline] = useState('');

  const currentScenario = scenarios.find(s => s.name === selectedScenario);
  const availableSuggestions = currentScenario 
    ? Object.entries(currentScenario.suggestions).filter(([valueName]) => 
        values.some(v => v.name === valueName)
      )
    : [];

  const handleAddSuggestion = () => {
    if (selectedSuggestion) {
      onAdd(selectedSuggestion);
    }
  };

  const handleAddCustom = () => {
    if (customGuideline.trim()) {
      onAdd(customGuideline.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
          <h2>制定行为准则</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Co-Fo Guidance */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white">🎯</span>
              </div>
              <div>
                <p className="mb-2"><strong className="text-green-900">AI 场景化建议</strong></p>
                <p className="text-slate-700 mb-2">
                  请设想一个场景，Co-Fo 将基于您的价值观提供建议。
                </p>
                <div className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs">
                  🤖 核心 AI 能力 #4
                </div>
              </div>
            </div>
          </div>

          {/* Scenario Selection */}
          <div>
            <h3 className="mb-4">选择一个场景</h3>
            <div className="grid grid-cols-1 gap-3">
              {scenarios.map((scenario) => (
                <button
                  key={scenario.name}
                  onClick={() => {
                    setSelectedScenario(scenario.name);
                    setSelectedSuggestion('');
                  }}
                  className={`text-left p-4 rounded-lg border-2 transition-all ${
                    selectedScenario === scenario.name
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <p className={`mb-1 ${selectedScenario === scenario.name ? 'text-blue-700' : ''}`}>
                    <strong>{scenario.name}</strong>
                  </p>
                  <p className="text-slate-600">{scenario.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* AI Suggestions */}
          {selectedScenario && availableSuggestions.length > 0 && (
            <div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-4 mb-4 border-2 border-amber-300">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="mb-2">
                      <strong className="text-amber-900">AI 场景化建议已生成</strong>
                    </p>
                    <p className="text-slate-700">
                      基于您的价值观，Co-Fo 为"{selectedScenario}"场景提供以下建议：
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {availableSuggestions.map(([valueName, suggestion]) => (
                  <button
                    key={valueName}
                    onClick={() => setSelectedSuggestion(suggestion)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedSuggestion === suggestion
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                        基于"{valueName}"
                      </span>
                    </div>
                    <p className={selectedSuggestion === suggestion ? 'text-blue-900' : 'text-slate-700'}>
                      {suggestion}
                    </p>
                  </button>
                ))}
              </div>

              {selectedSuggestion && (
                <Button 
                  onClick={handleAddSuggestion}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  将此建议添加至画布
                </Button>
              )}
            </div>
          )}

          {selectedScenario && availableSuggestions.length === 0 && (
            <div className="bg-amber-50 rounded-lg p-4">
              <p className="text-slate-700">
                Co-Fo 暂时无法为此场景提供建议，因为您尚未定义相关的核心价值观。您可以自定义一个准则。
              </p>
            </div>
          )}

          {/* Custom Guideline */}
          <div className="border-t border-slate-200 pt-6">
            <h3 className="mb-4">或者，自定义行为准则</h3>
            <Textarea
              value={customGuideline}
              onChange={(e) => setCustomGuideline(e.target.value)}
              placeholder="描述您的行为准则..."
              className="min-h-24 mb-4"
            />
            <Button 
              onClick={handleAddCustom}
              disabled={!customGuideline.trim()}
              variant="outline"
              className="w-full"
            >
              添加自定义准则
            </Button>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-6">
          <Button onClick={onClose} variant="outline" className="w-full">
            关闭
          </Button>
        </div>
      </div>
    </div>
  );
}
