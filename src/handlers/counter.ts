import { CommandContext } from 'grammy';
import { Composer } from '../composer';
import { Context } from '../context';

export const counter = new Composer();

/**
 * Handler just to testing bot usage
 */
export async function handleCounter(ctx: CommandContext<Context>) {
  const args = ctx.match;

  if (['reset', '+', '-'].some(op => args === op)) {
    switch (args) {
      case 'reset':
        ctx.session.counter = 0;
        break;
      case '+':
        ctx.session.counter++;
        break;
      case '-':
        ctx.session.counter--;
        break;
    }
  }
  ctx.reply(`Counter: ${ctx.session.counter}`);
}

counter.command(['counter'], handleCounter);
