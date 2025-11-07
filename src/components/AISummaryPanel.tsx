import { Sparkles, Eye, Lightbulb, Target } from 'lucide-react';

interface AISummaryPanelProps {
  activeBlock: 1 | 2 | 3;
}

export default function AISummaryPanel({ activeBlock }: AISummaryPanelProps) {
  const aiActions = [
    {
      id: 1,
      name: '智能提炼',
      description: '从「可」和「事」模块提炼愿景与使命',
      icon: Sparkles,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      active: activeBlock === 1
    },
    {
      id: 2,
      name: 'AI 溯源注释',
      description: '透明展示数据来源，确保思考一脉相承',
      icon: Eye,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      active: activeBlock === 1
    },
    {
      id: 3,
      name: 'AI 辅助定义',
      description: '提供预填充选项，快速定义核心价值观',
      icon: Lightbulb,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      active: activeBlock === 2
    },
    {
      id: 4,
      name: '场景化建议',
      description: '基于价值观，为具体场景提供行为准则',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      active: activeBlock === 3
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg p-5 border-2 border-blue-200 shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
          <span className="text-white text-sm">🤖</span>
        </div>
        <h3 className="text-blue-900">AI 四大核心能力</h3>
      </div>
      
      <div className="space-y-3">
        {aiActions.map((action) => {
          const Icon = action.icon;
          return (
            <div 
              key={action.id}
              className={`rounded-lg p-3 border-2 transition-all ${
                action.active 
                  ? `${action.bgColor} border-current shadow-sm scale-[1.02]` 
                  : 'bg-white border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full ${action.active ? action.bgColor : 'bg-slate-100'} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <Icon className={`w-4 h-4 ${action.active ? action.color : 'text-slate-400'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className={`${action.active ? action.color : 'text-slate-600'}`}>
                      <strong>#{action.id} {action.name}</strong>
                    </p>
                    {action.active && (
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    )}
                  </div>
                  <p className="text-slate-600 text-sm leading-snug">
                    {action.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-blue-200">
        <p className="text-xs text-slate-600 text-center">
          Co-Fo 全程陪伴，确保专业与通俗的完美融合
        </p>
      </div>
    </div>
  );
}
