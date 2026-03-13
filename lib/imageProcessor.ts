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
      let targetWidth = 600;
      let targetHeight = 800;

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

      const bgColors: Record<string, string> = {
        white: "#ffffff",
        gray: "#9ca3af",
        blue: "#93c5fd",
      };
      
      ctx.fillStyle = bgColors[options.backgroundColor] || "#ffffff";
      ctx.fillRect(0, 0, targetWidth, targetHeight);

      const imgAspect = img.width / img.height;
      const targetAspect = targetWidth / targetHeight;

      let drawWidth = 0;
      let drawHeight = 0;
      let offsetX = 0;
      let offsetY = 0;

      if (options.bodyType === "half") {
        if (imgAspect > targetAspect) {
          drawHeight = targetHeight;
          drawWidth = drawHeight * imgAspect;
          offsetX = (targetWidth - drawWidth) / 2;
          offsetY = 0;
        } else {
          drawWidth = targetWidth;
          drawHeight = drawWidth / imgAspect;
          offsetX = 0;
          offsetY = 0;
        }
      } else {
        const padding = 20;
        if (imgAspect > targetAspect) {
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

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

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
