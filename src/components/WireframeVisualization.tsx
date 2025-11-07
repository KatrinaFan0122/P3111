interface WireframeVisualizationProps {
  isBlock1Complete: boolean;
  isBlock2Complete: boolean;
  isBlock3Complete: boolean;
  activeBlock: 1 | 2 | 3;
}

export default function WireframeVisualization({ 
  isBlock1Complete, 
  isBlock2Complete, 
  isBlock3Complete,
  activeBlock 
}: WireframeVisualizationProps) {
  const blocks = [
    { id: 1, name: '愿景与使命', complete: isBlock1Complete },
    { id: 2, name: '核心价值观', complete: isBlock2Complete },
    { id: 3, name: '行为准则', complete: isBlock3Complete }
  ];

  return (
    <div className="bg-white rounded-lg p-5 border border-slate-200 mb-4">
      <div className="flex items-center justify-between mb-4">
        <p><strong>北极星画布 - 线框图涂色进度</strong></p>
        <span className="text-sm text-slate-500">
          {blocks.filter(b => b.complete).length} / 3 完成
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {blocks.map((block) => (
          <div key={block.id} className="text-center">
            <div className="mb-2">
              <div 
                className={`h-24 rounded-lg border-2 transition-all duration-500 ${
                  block.complete
                    ? 'border-green-400 bg-gradient-to-br from-green-50 to-green-100 shadow-md'
                    : activeBlock === block.id
                    ? 'border-blue-500 bg-blue-50 shadow-lg animate-pulse'
                    : 'border-dashed border-slate-300 bg-slate-50/50 opacity-50 grayscale'
                }`}
              >
                <div className="h-full flex flex-col items-center justify-center p-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                    block.complete 
                      ? 'bg-green-500 text-white' 
                      : activeBlock === block.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-300 text-slate-500'
                  }`}>
                    {block.complete ? '✓' : block.id}
                  </div>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-6 h-1 rounded-full transition-all ${
                          block.complete 
                            ? 'bg-green-400' 
                            : activeBlock === block.id
                            ? 'bg-blue-400'
                            : 'bg-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <p className={`text-sm ${
              block.complete || activeBlock === block.id ? 'text-slate-700' : 'text-slate-400'
            }`}>
              {block.name}
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border-2 border-dashed border-slate-300 bg-slate-50"></div>
            <span className="text-slate-600">待填充</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border-2 border-blue-500 bg-blue-50"></div>
            <span className="text-slate-600">进行中</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border-2 border-green-400 bg-gradient-to-br from-green-50 to-green-100"></div>
            <span className="text-slate-600">已完成</span>
          </div>
        </div>
      </div>
    </div>
  );
}
