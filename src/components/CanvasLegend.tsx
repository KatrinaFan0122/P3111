export default function CanvasLegend() {
  return (
    <div className="bg-white rounded-lg p-4 border border-slate-200 mb-4">
      <p className="mb-3"><strong>线框图涂色体验：</strong></p>
      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded border-2 border-dashed border-slate-300 bg-slate-50 flex-shrink-0"></div>
          <span className="text-slate-600">待填充</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded border-2 border-blue-500 bg-blue-50 flex-shrink-0"></div>
          <span className="text-slate-600">进行中</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded border-2 border-green-400 bg-gradient-to-br from-white to-green-50 flex-shrink-0"></div>
          <span className="text-slate-600">已完成</span>
        </div>
      </div>
    </div>
  );
}
