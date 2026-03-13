import { PhotoOptions } from "@/types";

export const processIdPhoto = async (
  imageSrc: string,
  options: PhotoOptions
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      // Define canvas dimensions based on aspect ratio
      let targetWidth = 600;
      let targetHeight = 800; // default 3:4

      if (options.aspectRatio === "4:3") {
        targetWidth = 800;
        targetHeight = 600;
      } else if (options.aspectRatio === "5:7") {
        targetWidth = 500;
        targetHeight = 700;
      } else if (options.aspectRatio === "3:4") {
        targetWidth = 600;
        targetHeight = 800;
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("No canvas context available"));

      // 1. Draw background
      const bgColors: Record<string, string> = {
        white: "#ffffff",
        gray: "#9ca3af",
        blue: "#93c5fd",
      };
      
      ctx.fillStyle = bgColors[options.backgroundColor] || "#ffffff";
      ctx.fillRect(0, 0, targetWidth, targetHeight);

      // 2. Draw image on top (creative simulation of an ID Photo)

      // Calculate source image crop to maintain aspect ratio and simulate "body types"
      const imgAspect = img.width / img.height;
      const targetAspect = targetWidth / targetHeight;

      let drawWidth = 0;
      let drawHeight = 0;
      let offsetX = 0;
      let offsetY = 0;

      if (options.bodyType === "half") {
        // Half body: zoom in nicely on the upper portion
        // Simulate extraction by cropping the center/top
        if (imgAspect > targetAspect) {
          // image is wider
          drawHeight = targetHeight;
          drawWidth = drawHeight * imgAspect;
          offsetX = (targetWidth - drawWidth) / 2;
          // Zoom in slightly more for half-body by starting lower or pulling closer
          offsetY = 0; 
        } else {
          // image is taller
          drawWidth = targetWidth;
          drawHeight = drawWidth / imgAspect;
          offsetX = 0;
          offsetY = 0; // Focus on the top area for half-body
        }
      } else {
        // Full body: keep the subject more zoomed out
        const padding = 20; 
        if (imgAspect > targetAspect) {
          // image wider
          drawWidth = targetWidth - padding * 2;
          drawHeight = drawWidth / imgAspect;
          offsetX = padding;
          offsetY = (targetHeight - drawHeight) / 2;
        } else {
          // image taller
          drawHeight = targetHeight - padding * 2;
          drawWidth = drawHeight * imgAspect;
          offsetX = (targetWidth - drawWidth) / 2;
          offsetY = padding;
        }
      }

      // Draw original image on the canvas
      // We simulate background removal with global composite or just simple crop for now
      // A fun creative trick: use 'multiply' or 'darken' to blend it, but for photos 'source-over' is best.
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      // Creative filter: simulate studio lighting a tiny bit by drawing a subtle overlay
      const gradient = ctx.createRadialGradient(
        targetWidth / 2, targetHeight / 2, targetWidth / 4,
        targetWidth / 2, targetHeight / 2, targetWidth
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.1)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.1)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, targetWidth, targetHeight);

      const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
      resolve(dataUrl);
    };
    img.onerror = () => reject(new Error("Failed to load image on canvas"));
    img.src = imageSrc;
  });
};
