declare module 'dom-to-image-more' {
  export interface DomToImageOptions {
    quality?: number;
    bgcolor?: string;
    width?: number;
    height?: number;
    style?: Record<string, string>;
  }

  export function toPng(node: HTMLElement, options?: DomToImageOptions): Promise<string>;
  export function toJpeg(node: HTMLElement, options?: DomToImageOptions): Promise<string>;
  export function toBlob(node: HTMLElement, options?: DomToImageOptions): Promise<Blob>;
  export function toSvg(node: HTMLElement, options?: DomToImageOptions): Promise<string>;
}
