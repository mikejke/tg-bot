import { session as ses } from 'grammy';

export interface SessionData {
  counter: number;
}

export const session = ses({
  initial(): SessionData {
    return { counter: 0 };
  },
});
