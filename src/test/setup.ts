import '@testing-library/jest-dom/vitest';

// jsdom in Vitest 4 ships a partial localStorage; replace with an in-memory shim.
const memoryStorage = (): Storage => {
  let store: Record<string, string> = {};
  return {
    get length() { return Object.keys(store).length; },
    clear() { store = {}; },
    getItem(key: string) { return key in store ? store[key] : null; },
    key(index: number) { return Object.keys(store)[index] ?? null; },
    removeItem(key: string) { delete store[key]; },
    setItem(key: string, value: string) { store[key] = String(value); },
  };
};

Object.defineProperty(window, 'localStorage', { value: memoryStorage(), configurable: true });
Object.defineProperty(window, 'sessionStorage', { value: memoryStorage(), configurable: true });
