import { Sparkles } from 'lucide-react';
import { Button } from './button';

interface GenerateButtonProps {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
}

export function GenerateButton({ onClick, disabled, loading }: GenerateButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      className="generate-button disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer w-full text-xl py-6"
    >
      <div className="flex items-center justify-center gap-2">
        <Sparkles className={`w-5 h-5 ${loading ? 'animate-pulse' : ''}`} />
        <span>{loading ? 'Generating...' : 'Generate ID Photo'}</span>
      </div>
    </Button>
  );
}
