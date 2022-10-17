import { bot } from '../../../src/bot';
import { OutgoingRequest } from '../../interfaces/outgoing-request';
import { mockCommand } from '../../__mocks__/messages.mock';

// Quick example of how to test a bot
describe('counter tests', () => {
  const requests: OutgoingRequest[] = [];

  beforeEach(() => {
    requests.length = 0;
  });

  beforeAll(async () => {
    // prevents the bot from actually sending messages
    bot.api.config.use((_, method, payload, signal) => {
      requests.push({ method, payload, signal });
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

  test('test call', async () => {
    await bot.handleUpdate(mockCommand('counter'));

    expect(requests).toHaveLength(1);
    const { payload } = requests.pop() || {};
    expect(payload).not.toBeUndefined();
    expect(payload).toHaveProperty('text', 'Counter: 0');
  }, 5000);

  test('reset', async () => {
    await bot.handleUpdate(mockCommand('counter', 'reset'));

    expect(requests).toHaveLength(1);
    const { payload } = requests.pop() || {};
    expect(payload).not.toBeUndefined();
    expect(payload).toHaveProperty('text', 'Counter: 0');
  }, 5000);

  test('reset; three time plus, two time minus', async () => {
    await bot.handleUpdate(mockCommand('counter', 'reset'));
    await bot.handleUpdate(mockCommand('counter', '+'));
    await bot.handleUpdate(mockCommand('counter', '+'));
    await bot.handleUpdate(mockCommand('counter', '+'));
    await bot.handleUpdate(mockCommand('counter', '-'));
    await bot.handleUpdate(mockCommand('counter', '-'));

    expect(requests).toHaveLength(6);
    const { payload } = requests.pop() || {};
    expect(payload).not.toBeUndefined();
    expect(payload).toHaveProperty('text', 'Counter: 1');
  }, 5000);

  test('reset; two times plus, three time minus', async () => {
    await bot.handleUpdate(mockCommand('counter', 'reset'));
    await bot.handleUpdate(mockCommand('counter', '+'));
    await bot.handleUpdate(mockCommand('counter', '+'));
    await bot.handleUpdate(mockCommand('counter', '-'));
    await bot.handleUpdate(mockCommand('counter', '-'));
    await bot.handleUpdate(mockCommand('counter', '-'));

    expect(requests).toHaveLength(6);
    const { payload } = requests.pop() || {};
    expect(payload).not.toBeUndefined();
    expect(payload).toHaveProperty('text', 'Counter: -1');
  }, 5000);
});
