import { describe, expect, it } from 'vitest';
import { connectionAfter } from '@/domain/connection';

describe('connectionAfter', () => {
  it('goes offline whenever the browser says so', () => {
    expect(connectionAfter('online', false)).toBe('offline');
    expect(connectionAfter('restored', false)).toBe('offline');
  });

  it('is restored, not online, when the signal comes back after being down', () => {
    expect(connectionAfter('offline', true)).toBe('restored');
  });

  it('stays restored until the visitor goes back in, and online while nothing was wrong', () => {
    expect(connectionAfter('restored', true)).toBe('restored');
    expect(connectionAfter('online', true)).toBe('online');
  });
});
