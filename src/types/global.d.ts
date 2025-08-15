// This file declares global browser objects to prevent ESLint errors
// when accessing browser globals like window, document, etc.

interface Window {
  getSelection(): Selection | null;
  location: Location;
  dataLayer: unknown[];
}

// Clipboard API declarations
interface ClipboardItemOptions {
  presentationStyle?: "unspecified" | "inline" | "attachment";
}

interface ClipboardItem {
  readonly types: string[];
  getType(type: string): Promise<Blob>;
}

interface ClipboardItemConstructor {
  new (
    items: Record<string, string | Blob | PromiseLike<string | Blob>>,
    options?: ClipboardItemOptions,
  ): ClipboardItem;
  supports(type: string): boolean;
}

interface Clipboard {
  read(): Promise<ClipboardItems>;
  readText(): Promise<string>;
  write(items: ClipboardItem[]): Promise<void>;
  writeText(text: string): Promise<void>;
}

type ClipboardItems = ClipboardItem[];

declare function setTimeout(callback: () => void, ms?: number): number;
declare function alert(message?: string): void;
declare const console: Console;

// Make TypeScript aware that we're in a browser environment
declare const window: Window;
declare const document: Document;
declare const navigator: Navigator & { clipboard: Clipboard };
declare const fetch: typeof globalThis.fetch;
declare const ClipboardItem: ClipboardItemConstructor;
