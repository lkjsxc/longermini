import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

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
    (window as any).crypto = {};
  }
  if (!window.crypto.randomUUID) {
    window.crypto.randomUUID = () => '12345678-1234-1234-1234-123456789012';
  }
}