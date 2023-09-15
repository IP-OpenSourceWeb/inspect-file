import { videoExtensions } from './extensions';

export function isVideo(fileName: string): boolean {
  return videoExtensions.some((x) => fileName.endsWith(x));
}
