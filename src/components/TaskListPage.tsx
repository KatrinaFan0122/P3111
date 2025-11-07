import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Check, Circle, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface TaskListPageProps {
  onBackToIntro: () => void;
}

export default function TaskListPage({ onBackToIntro }: TaskListPageProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCoFoMessage, setShowCoFoMessage] = useState(false);

  useEffect(() => {
    // Trigger confetti animation
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setShowCoFoMessage(true);
    }, 2000);
  }, []);

  const tasks = [
    {
      id: 'L3-P3.1.1-1',
      name: '愿景与准则',
      description: '定义项目的北极星 - 愿景、使命、价值观与准则',
      status: 'completed',
      tool: '北极星画布',
      unlocked: true
    },
    {
      id: 'L3-P3.1.1-2',
      name: '能力与策略',
      description: '构建团队蓝图，明确核心能力与战略方向',
      status: 'available',
      tool: '能力矩阵',
      unlocked: true
    },
    {
      id: 'L3-P3.1.1-3',
      name: '团队组建',
      description: '规划团队结构，定义关键角色与职责',
      status: 'locked',
      tool: '组织架构图',
      unlocked: false
    },
    {
      id: 'L3-P3.1.1-4',
      name: '文化建设',
      description: '建立团队文化，制定协作规范',
      status: 'locked',
      tool: '文化手册',
      unlocked: false
    }
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-white">人</span>
            </div>
            <div>
              <h1>「人」模块</h1>
              <p className="text-slate-600">构建您的团队基石</p>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-4 mb-8">
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-lg p-6 shadow-sm border-2 transition-all ${
                task.status === 'completed'
                  ? 'border-green-300 bg-green-50/30'
                  : task.status === 'available'
                  ? 'border-blue-300 bg-blue-50/30'
                  : 'border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Status Icon */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  task.status === 'completed'
                    ? 'bg-green-100'
                    : task.status === 'available'
                    ? 'bg-blue-100'
                    : 'bg-slate-100'
                }`}>
                  {task.status === 'completed' ? (
                    <Check className="w-6 h-6 text-green-600" />
                  ) : task.status === 'available' ? (
                    <Circle className="w-6 h-6 text-blue-600" />
                  ) : (
                    <Circle className="w-6 h-6 text-slate-400" />
                  )}
                </div>

                {/* Task Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="mb-1">{task.name}</h3>
                      <p className="text-slate-600">{task.description}</p>
                    </div>
                    {task.status === 'completed' && (
                      <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        已完成
                      </span>
                    )}
                    {task.status === 'available' && index === 1 && (
                      <motion.span 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                      >
                        已解锁 ✨
                      </motion.span>
                    )}
                  </div>

                  {/* Tool Wireframe Visualization */}
                  <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className={`w-4 h-4 ${task.unlocked ? 'text-blue-600' : 'text-slate-400'}`} />
                      <span className={task.unlocked ? 'text-slate-700' : 'text-slate-400'}>
                        核心工具: {task.tool}
                      </span>
                    </div>
                    {/* Wireframe representation */}
                    <div className={`h-16 rounded border-2 ${
                      task.status === 'completed'
                        ? 'border-green-400 bg-gradient-to-r from-green-100 to-green-50'
                        : task.unlocked
                        ? 'border-blue-400 bg-gradient-to-r from-blue-100 to-blue-50'
                        : 'border-dashed border-slate-300 bg-slate-100'
                    }`}>
                      <div className="h-full flex items-center justify-center">
                        {task.status === 'completed' ? (
                          <span className="text-green-600">✓ 工具已完成</span>
                        ) : task.unlocked ? (
                          <span className="text-blue-600">⚡ 工具已激活</span>
                        ) : (
                          <span className="text-slate-400">🔒 待解锁</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Co-Fo Message */}
        {showCoFoMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-6 shadow-lg border-2 border-blue-300"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white">Co</span>
              </div>
              <div className="flex-1">
                <p className="mb-1">Co-Fo</p>
                <p className="text-slate-700">
                  "北极星"已点亮。您已开启「人」模块。接下来，我们将进入「能力与策略」，开始构建您的团队蓝图。
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Back Button (for demo purposes) */}
        <div className="mt-8 text-center">
          <Button 
            onClick={onBackToIntro}
            variant="outline"
          >
            返回开始 (演示用)
          </Button>
        </div>
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: -20,
                rotate: 0
              }}
              animate={{ 
                y: window.innerHeight + 20,
                rotate: 360
              }}
              transition={{ 
                duration: 2 + Math.random() * 2,
                ease: 'linear'
              }}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'][Math.floor(Math.random() * 5)],
                left: Math.random() * 100 + '%'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
