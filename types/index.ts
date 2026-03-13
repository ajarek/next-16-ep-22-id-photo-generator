export type BodyType = 'full' | 'half';
export type BackgroundColor = 'white' | 'gray' | 'blue';
export type AspectRatio = '5:7' | '4:3' | '3:4';

export interface PhotoOptions {
  bodyType: BodyType;
  backgroundColor: BackgroundColor;
  aspectRatio: AspectRatio;
}

export interface GenerateRequest {
  image: string; // base64 encoded image
  options: PhotoOptions;
}

export interface GenerateResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
}
