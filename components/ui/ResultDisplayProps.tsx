import { Download, ImageIcon, Loader2, X } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

interface ResultDisplayProps {
  generatedImage: string | null;
  loading: boolean;
  onClear?: () => void;
}

export function ResultDisplay({ generatedImage, loading, onClear }: ResultDisplayProps) {
  const handleDownload = () => {
    if (!generatedImage) return;

    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `id-photo-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Photo downloaded!", { description: "Your ID photo has been saved." })

    if (onClear) {
      setTimeout(() => onClear(), 1500);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-card rounded-xl border-2 border-border p-8">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground">Generating your ID photo...</p>
      </div>
    );
  }

  if (!generatedImage) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-card rounded-xl border-2 border-border p-8">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <ImageIcon className="w-8 h-8 text-primary" />
        </div>
        <p className="text-muted-foreground">Generated photos will appear here</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-card rounded-xl border-2 border-border overflow-hidden">
      <div className="flex-1 relative">
        <Image
          src={generatedImage}
          alt="Generated ID Photo"
          width={500}
          height={500}
          className="w-full h-full object-contain"
        />
        {onClear && (
          <button
            onClick={onClear}
            title="Remove result"
            className="absolute top-3 right-3 p-2 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors shadow-lg"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="p-4 border-t border-border bg-muted/50">
        <button
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
        >
          <Download className="w-5 h-5" />
          Download Photo
        </button>
      </div>
    </div>
  );
}
