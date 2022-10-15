import nconf from 'nconf';
import { Bot } from 'grammy';
import { Context } from './context';
import { session } from './session';
import { handlers } from './handlers/index';
import { error } from './error';

const { token = 'test' } = nconf.get('bot') || {};
export const bot = new Bot<Context>(token);

bot.use(session).use(handlers);
bot.catch(error);
