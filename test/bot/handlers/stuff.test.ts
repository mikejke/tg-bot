import { bot } from '../../../src/bot';
import { OutgoingRequest } from '../../interfaces/outgoing-request';
import { mockCommand } from '../../mocks/messages.mock';

describe('stuff tests', () => {
  const requests: OutgoingRequest[] = [];

  beforeEach(() => {
    requests.length = 0;
  });

  beforeAll(async () => {
    bot.api.config.use((_, method, payload, signal) => {
      requests.push({ method, payload, signal });
      // prevents the bot from actually sending messages
      return { ok: true, result: true } as any;
    });

    bot.botInfo = {
      id: 42,
      first_name: 'Bot',
      is_bot: true,
      username: 'bot',
      can_join_groups: true,
      can_read_all_group_messages: true,
      supports_inline_queries: false,
    };

    await bot.init();
  }, 5000);

  test('stuff', async () => {
    await bot.handleUpdate(mockCommand('stuff'));

    expect(requests).toHaveLength(1);
    const { payload } = requests.pop() || {};
    expect(payload).not.toBeUndefined();
    expect(payload).toHaveProperty('text', 'Stuff!');
  }, 5000);
});
