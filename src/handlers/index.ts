import { Composer } from '../composer';
import { stuff } from './stuff';
import { counter } from './counter';

export const handlers = new Composer();

handlers.use(stuff).use(counter);
