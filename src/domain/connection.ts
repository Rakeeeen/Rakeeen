/**
 * Where the visitor's connection stands: fine, down, or back after being down. Back stays its own
 * state, because the site offers a way in (a reload) instead of reappearing under their feet.
 */
export type Connection = 'online' | 'offline' | 'restored';

export function connectionAfter(previous: Connection, isOnline: boolean): Connection {
  if (!isOnline) return 'offline';
  return previous === 'online' ? 'online' : 'restored';
}
