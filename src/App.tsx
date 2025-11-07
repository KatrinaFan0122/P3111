import { useState, useEffect } from 'react';
import IntroductionPage from './components/IntroductionPage';
import CanvasWorkspace from './components/CanvasWorkspace';
import CompletionPage from './components/CompletionPage';
import TaskListPage from './components/TaskListPage';
import { toast } from 'sonner@2.0.3';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'intro' | 'canvas' | 'completion' | 'tasklist'>('intro');
  const [northStarData, setNorthStarData] = useState({
    vision: '',
    mission: '',
    values: [] as Array<{ name: string; definition: string }>,
    guidelines: [] as string[]
  });

  // Load saved data on mount (断点续传)
  useEffect(() => {
    const saved = localStorage.getItem('northStarData');
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        setNorthStarData(parsedData);
        toast.success('已恢复您的工作进度', {
          description: '您可以继续之前的编辑'
        });
      } catch (e) {
        console.error('Failed to load saved data', e);
      }
    }
  }, []);

  // Auto-save data whenever it changes
  useEffect(() => {
    if (northStarData.vision || northStarData.mission || northStarData.values.length > 0 || northStarData.guidelines.length > 0) {
      localStorage.setItem('northStarData', JSON.stringify(northStarData));
    }
  }, [northStarData]);

  const handleStartCanvas = () => {
    setCurrentPage('canvas');
  };

  const handleCompleteCanvas = (data: typeof northStarData) => {
    setNorthStarData(data);
    setCurrentPage('completion');
  };

  const handleSubmitTask = () => {
    setCurrentPage('tasklist');
  };

  const handleBackToIntro = () => {
    setCurrentPage('intro');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster />
      {currentPage === 'intro' && <IntroductionPage onStart={handleStartCanvas} />}
      {currentPage === 'canvas' && <CanvasWorkspace onComplete={handleCompleteCanvas} />}
      {currentPage === 'completion' && (
        <CompletionPage data={northStarData} onSubmit={handleSubmitTask} />
      )}
      {currentPage === 'tasklist' && <TaskListPage onBackToIntro={handleBackToIntro} />}
    </div>
  );
}
