import type { AIResult, Level, Mode } from '../types';

const results: Record<Mode, Record<Level, AIResult>> = {
  Describe: {
    Easy: {
      title: 'Describe',
      english: ['I can see a cup on the desk.', 'It is next to a laptop.'],
      words: ['cup', 'desk', 'next to'],
      chinese: '我能看到桌上有一个杯子。它在笔记本电脑旁边。',
      speakText: 'I can see a cup on the desk. It is next to a laptop.',
    },
    Normal: {
      title: 'Describe',
      english: ['I can see a coffee mug on the desk.', 'There is a laptop next to it.'],
      words: ['coffee mug', 'desk', 'next to'],
      chinese: '我能看到桌上有一个咖啡杯。旁边有一台笔记本电脑。',
      speakText: 'I can see a coffee mug on the desk. There is a laptop next to it.',
    },
    Advanced: {
      title: 'Describe',
      english: ['A coffee mug is sitting on the desk beside a laptop.', 'A notebook and plant make the workspace feel calm.'],
      words: ['workspace', 'beside', 'calm'],
      chinese: '桌上放着一个咖啡杯，旁边有笔记本电脑。笔记本和绿植让工作区显得安静舒适。',
      speakText: 'A coffee mug is sitting on the desk beside a laptop. A notebook and plant make the workspace feel calm.',
    },
  },
  Explain: {
    Easy: {
      title: 'Explain',
      english: ['This is a coffee mug.', 'People use it for hot drinks.'],
      words: ['coffee mug', 'hot drinks', 'use'],
      chinese: '这是一个咖啡杯。人们用它来装热饮。',
      speakText: 'This is a coffee mug. People use it for hot drinks.',
    },
    Normal: {
      title: 'Explain',
      english: ['This is a coffee mug.', 'People usually use it for coffee or tea.', 'It is easy to hold.'],
      words: ['coffee mug', 'coffee or tea', 'easy to hold'],
      chinese: '这是一个咖啡杯。人们通常用它装咖啡或茶。它很容易拿。',
      speakText: 'This is a coffee mug. People usually use it for coffee or tea. It is easy to hold.',
    },
    Advanced: {
      title: 'Explain',
      english: ['This coffee mug is a simple everyday item.', 'People use it for warm drinks, and the handle makes it comfortable to hold.', 'It fits naturally into a calm workspace.'],
      words: ['everyday item', 'comfortable', 'workspace'],
      chinese: '这个咖啡杯是很常见的日用品。它可以装热饮，杯柄让拿握更舒服。它也很自然地融入一个安静的工作空间。',
      speakText: 'This coffee mug is a simple everyday item. People use it for warm drinks, and the handle makes it comfortable to hold. It fits naturally into a calm workspace.',
    },
  },
  Comment: {
    Easy: {
      title: 'Comment',
      english: ['This looks clean.', 'It feels calm.'],
      words: ['clean', 'calm', 'workspace'],
      chinese: '这里看起来很整洁，也很安静。',
      speakText: 'This looks clean. It feels calm.',
    },
    Normal: {
      title: 'Comment',
      english: ['This scene looks clean and comfortable.', 'It feels like a great place to work or study.'],
      words: ['clean', 'comfortable', 'work or study'],
      chinese: '这个场景看起来整洁又舒适。很适合工作或学习。',
      speakText: 'This scene looks clean and comfortable. It feels like a great place to work or study.',
    },
    Advanced: {
      title: 'Comment',
      english: ['This scene gives off a calm, practical feeling.', 'It looks like the kind of workspace where it is easy to stay focused.', 'I would probably enjoy spending time here.'],
      words: ['calm', 'practical', 'stay focused'],
      chinese: '这个场景给人一种安静、实用的感觉。它看起来像一个很容易专注的工作区。我可能会喜欢待在这里。',
      speakText: 'This scene gives off a calm, practical feeling. It looks like the kind of workspace where it is easy to stay focused. I would probably enjoy spending time here.',
    },
  },
  Practice: {
    Easy: {
      title: 'Practice',
      english: ['Try to describe the photo.', 'Say one short sentence.'],
      words: ['describe', 'photo', 'sentence'],
      chinese: '试着描述这张照片。说一句简单的话。',
      speakText: 'Try to describe the photo. Say one short sentence.',
    },
    Normal: {
      title: 'Practice',
      english: ['Try to describe this photo in one sentence.', 'Example: I can see a coffee mug on the desk.'],
      words: ['describe', 'one sentence', 'on the desk'],
      chinese: '试着用一句话描述这张照片。比如：我能看到桌上有一个咖啡杯。',
      speakText: 'Try to describe this photo in one sentence. Example: I can see a coffee mug on the desk.',
    },
    Advanced: {
      title: 'Practice',
      english: ['Try to speak naturally about this workspace.', 'You can describe the objects, the mood, and what the scene makes you think of.'],
      words: ['naturally', 'workspace', 'mood'],
      chinese: '试着自然地描述这个工作区。你可以说物品、氛围，以及它让你想到什么。',
      speakText: 'Try to speak naturally about this workspace. You can describe the objects, the mood, and what the scene makes you think of.',
    },
  },
};

export const getMockResult = (mode: Mode, level: Level): AIResult => results[mode][level];

export const modeOrder: Mode[] = ['Describe', 'Explain', 'Comment', 'Practice'];
export const levelOrder: Level[] = ['Easy', 'Normal', 'Advanced'];
