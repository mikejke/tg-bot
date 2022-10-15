import { CommandContext } from 'grammy';
import { Composer } from '../composer';
import { Context } from '../context';

export const stuff = new Composer();

export async function handleStuff(ctx: CommandContext<Context>) {
  ctx.reply('Stuff!');
}

stuff.command(['stuff'], handleStuff);
