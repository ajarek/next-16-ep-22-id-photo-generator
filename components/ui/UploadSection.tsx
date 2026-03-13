import { Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

interface UploadSectionProps {
  uploadedImage: string | null;
  onImageUpload: (image: string) => void;
  onImageRemove: () => void;
}

export function UploadSection({ uploadedImage, onImageUpload, onImageRemove }: UploadSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      {uploadedImage ? (
        <div className="relative w-full bg-card rounded-xl border-2 border-border overflow-hidden">
          <Image
            src={uploadedImage}
            alt="Uploaded"
            width={500}
            height={500}
            className="w-full h-auto object-contain"
          />
          <button
            onClick={onImageRemove}
            className="absolute top-3 right-3 p-2 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div
          onClick={handleClick}
          className="upload-area min-h-[300px] flex flex-col items-center justify-center cursor-pointer p-8"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Upload Your Photo</h3>
          <p className="text-sm text-muted-foreground text-center">
            Click to browse or drag and drop
            <br />
            JPG, PNG or WEBP (max 10MB)
          </p>
        </div>
      )}
    </div>
  );
}
