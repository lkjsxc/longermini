import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder as UtilTextDecoder } from 'util';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
    headers: { get: () => null },
    ok: true,
    body: { getReader: () => ({ read: () => Promise.resolve({ done: true, value: new Uint8Array() }) }) }
  })
) as jest.Mock;
global.TextDecoder = UtilTextDecoder as unknown as typeof global.TextDecoder;

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  if (!window.crypto) {
    Object.defineProperty(window, 'crypto', {
      writable: true,
      value: {}
    });
  }
  if (!window.crypto.randomUUID) {
    window.crypto.randomUUID = () => '12345678-1234-1234-1234-123456789012';
  }
}