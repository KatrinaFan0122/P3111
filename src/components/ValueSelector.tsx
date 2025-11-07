import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { X } from 'lucide-react';

interface ValueSelectorProps {
  existingValues: Array<{ name: string; definition: string }>;
  onAdd: (name: string, definition: string) => void;
  onClose: () => void;
}

const predefinedValues = [
  { name: '用户至上', definitions: [
    '我们始终将用户需求放在首位，用数据和反馈驱动决策。',
    '我们深入理解用户痛点，持续优化产品体验。',
  ]},
  { name: '创新', definitions: [
    '我们鼓励每一次大胆的尝试和失败。',
    '我们保持好奇心，快速迭代以超越用户期望。',
  ]},
  { name: '诚信', definitions: [
    '我们坦诚沟通，言出必行，建立信任关系。',
    '我们对客户和团队成员保持透明，不隐瞒问题。',
  ]},
  { name: '协作', definitions: [
    '我们相信团队的力量大于个人，鼓励跨部门合作。',
    '我们倾听不同声音，通过建设性讨论达成共识。',
  ]},
  { name: '卓越', definitions: [
    '我们追求高标准，不满足于"足够好"。',
    '我们持续学习和改进，力求在每个细节上做到最好。',
  ]},
];

export default function ValueSelector({ existingValues, onAdd, onClose }: ValueSelectorProps) {
  const [selectedValue, setSelectedValue] = useState('');
  const [customValueName, setCustomValueName] = useState('');
  const [selectedDefinition, setSelectedDefinition] = useState('');
  const [customDefinition, setCustomDefinition] = useState('');

  const currentValue = selectedValue === 'custom' 
    ? null 
    : predefinedValues.find(v => v.name === selectedValue);

  const handleSubmit = () => {
    const valueName = selectedValue === 'custom' ? customValueName : selectedValue;
    const definition = selectedDefinition === 'custom' ? customDefinition : selectedDefinition;

    if (valueName.trim() && definition.trim()) {
      onAdd(valueName.trim(), definition.trim());
    }
  };

  const isValid = selectedValue === 'custom' 
    ? customValueName.trim() && (selectedDefinition === 'custom' ? customDefinition.trim() : selectedDefinition)
    : selectedValue && selectedDefinition;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
          <h2>选择或定义核心价值观</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Step 1: Select Value */}
          <div>
            <h3 className="mb-4">选择一个价值观</h3>
            <div className="space-y-2">
              {predefinedValues.map((value) => {
                const isDisabled = existingValues.some(v => v.name === value.name);
                return (
                  <button
                    key={value.name}
                    onClick={() => !isDisabled && setSelectedValue(value.name)}
                    disabled={isDisabled}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedValue === value.name
                        ? 'border-blue-500 bg-blue-50'
                        : isDisabled
                        ? 'border-slate-200 bg-slate-50 opacity-50 cursor-not-allowed'
                        : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <span className={selectedValue === value.name ? 'text-blue-700' : ''}>
                      {value.name}
                    </span>
                    {isDisabled && <span className="ml-2 text-slate-400">(已添加)</span>}
                  </button>
                );
              })}
              
              <button
                onClick={() => setSelectedValue('custom')}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedValue === 'custom'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-blue-300'
                }`}
              >
                <span className={selectedValue === 'custom' ? 'text-blue-700' : ''}>
                  自定义价值观...
                </span>
              </button>

              {selectedValue === 'custom' && (
                <div className="mt-2">
                  <Input
                    value={customValueName}
                    onChange={(e) => setCustomValueName(e.target.value)}
                    placeholder="输入您的自定义价值观名称..."
                  />
                </div>
              )}
            </div>
          </div>

          {/* Step 2: Define Value */}
          {selectedValue && currentValue && (
            <div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 mb-4 border border-blue-200">
                <div className="flex items-start gap-3">
                  <span className="text-xl">💡</span>
                  <div>
                    <p className="mb-2">
                      <strong className="text-blue-900">您选择了"{currentValue.name}"。</strong>
                    </p>
                    <p className="text-slate-700 mb-2">
                      为了让它指导行动，Co-Fo 为您推荐了以下定义：
                    </p>
                    <div className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs">
                      🤖 AI 辅助定义（预填充选项）
                    </div>
                  </div>
                </div>
              </div>

              <RadioGroup value={selectedDefinition} onValueChange={setSelectedDefinition}>
                <div className="space-y-3">
                  {currentValue.definitions.map((def, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 rounded-lg border border-slate-200 hover:border-blue-300 transition-all">
                      <RadioGroupItem value={def} id={`def-${index}`} className="mt-1" />
                      <Label htmlFor={`def-${index}`} className="cursor-pointer flex-1">
                        {def}
                      </Label>
                    </div>
                  ))}
                  
                  <div className="flex items-start space-x-3 p-4 rounded-lg border border-slate-200 hover:border-blue-300 transition-all">
                    <RadioGroupItem value="custom" id="def-custom" className="mt-1" />
                    <Label htmlFor="def-custom" className="cursor-pointer flex-1">
                      自定义定义...
                    </Label>
                  </div>
                </div>
              </RadioGroup>

              {selectedDefinition === 'custom' && (
                <div className="mt-3">
                  <Input
                    value={customDefinition}
                    onChange={(e) => setCustomDefinition(e.target.value)}
                    placeholder="输入您的自定义定义..."
                  />
                </div>
              )}
            </div>
          )}

          {selectedValue === 'custom' && customValueName && (
            <div>
              <Label className="mb-2 block">为"{customValueName}"定义含义</Label>
              <Input
                value={customDefinition}
                onChange={(e) => setCustomDefinition(e.target.value)}
                placeholder="输入价值观的定义..."
              />
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-6 flex gap-3">
          <Button onClick={onClose} variant="outline" className="flex-1">
            取消
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!isValid}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            添加至画布
          </Button>
        </div>
      </div>
    </div>
  );
}
