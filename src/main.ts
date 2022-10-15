import './config';
import { bot } from './bot';

async function main() {
  await bot.start({ drop_pending_updates: true });
}

main();
