import { Update } from 'grammy/out/types.node';

export function mockMessage(text: string): Update {
  return {
    update_id: 912345678,
    message: {
      message_id: 1365,
      from: {
        id: 123456789,
        is_bot: false,
        first_name: 'John',
        last_name: 'Doe',
        username: 'test',
      },
      chat: {
        id: 123456789,
        first_name: 'John',
        last_name: 'Doe',
        username: 'test',
        type: 'private',
      },
      date: (Date.now() / 1000) | 0,
      text,
    },
  };
}

export function mockCommand(
  command: string,
  ...args: string[] | number[]
): Update {
  return {
    update_id: 912345678,
    message: {
      message_id: 1365,
      from: {
        id: 123456789,
        is_bot: false,
        first_name: 'John',
        last_name: 'Doe',
        username: 'test',
      },
      chat: {
        id: 123456789,
        first_name: 'John',
        last_name: 'Doe',
        username: 'test',
        type: 'private',
      },
      date: (Date.now() / 1000) | 0,
      text: `/${command} ${args.join(' ')}`.trim(),
      entities: [
        {
          offset: 0,
          length: command.length + 1,
          type: 'bot_command',
        },
      ],
    },
  };
}
