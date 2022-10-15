import { Context as Base, SessionFlavor } from 'grammy';
import { SessionData } from './session';

export type Context = Base & SessionFlavor<SessionData>;
