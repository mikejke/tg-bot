import nconf from 'nconf';
import { Bot } from 'grammy';
import { Context } from './context';
import { session } from './session';
import { handlers } from './handlers/index';

const { token = 'test' } = nconf.get('bot') || {};
export const bot = new Bot<Context>(token);

bot.catch(({ ctx, error }) => {
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  if (error instanceof Error) {
    const message = error.message.toLocaleLowerCase();
    console.error(`Error in request: ${message}`);
    return ctx.reply(`Error: ${message}`);
  }
  ctx.reply('Error occured');
});

bot.use(session).use(handlers);
