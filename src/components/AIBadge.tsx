interface AIBadgeProps {
  type: 'extract' | 'source' | 'define' | 'scenario';
  className?: string;
}

const badgeConfig = {
  extract: {
    label: '智能提炼',
    color: 'bg-blue-100 text-blue-700',
    icon: '🤖'
  },
  source: {
    label: 'AI 溯源',
    color: 'bg-purple-100 text-purple-700',
    icon: '🔍'
  },
  define: {
    label: 'AI 辅助',
    color: 'bg-amber-100 text-amber-700',
    icon: '💡'
  },
  scenario: {
    label: '场景建议',
    color: 'bg-green-100 text-green-700',
    icon: '🎯'
  }
};

export default function AIBadge({ type, className = '' }: AIBadgeProps) {
  const config = badgeConfig[type];
  
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${config.color} ${className}`}>
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
}
