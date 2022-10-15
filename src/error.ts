import { ErrorHandler } from 'grammy';
import { Context } from './context';

export const error: ErrorHandler<Context> = ({ ctx, error }) => {
  console.error(error);
  if (error instanceof Error) {
    let { message } = error;
    message = message.toLocaleLowerCase();
    return ctx.reply(`Error: ${message}`);
  }
  return ctx.reply('Error occured');
};
