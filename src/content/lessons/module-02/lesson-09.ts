import type { Lesson } from '../../../types';

const lesson: Lesson = {
  title: 'Boolean',
  blocks: [
    {
      type: 'paragraph',
      text: 'প্রোগ্রামিংয়ে প্রতিনিয়ত সিদ্ধান্ত নিতে হয় — "এই কাজটা করব কি না?", "শর্তটা সত্য কি মিথ্যা?"। এই সত্য-মিথ্যা নিয়ে কাজ করার জন্যই আছে `Boolean` Data Type। এই লেসনে এটি শিখব।',
    },
    {
      type: 'heading',
      text: 'Boolean কী?',
    },
    {
      type: 'paragraph',
      text: '`Boolean`-এর মাত্র দুটি মান থাকতে পারে — `true` (সত্য) অথবা `false` (মিথ্যা)। এর বাইরে আর কোনো মান নেই।',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `fun main() {
    val isRaining = true
    val isSunny = false

    println(isRaining)
    println(isSunny)
}`,
    },
    {
      type: 'paragraph',
      text: '**আউটপুট**',
    },
    {
      type: 'code',
      code: `true
false`,
    },
    {
      type: 'paragraph',
      text: 'লক্ষ করুন, `true` আর `false` সবসময় ছোট হাতের অক্ষরে লেখা হয়। এগুলো Kotlin-এর নিজস্ব শব্দ, তাই ভেরিয়েবলের নাম হিসেবে ব্যবহার করা যায় না।',
    },
    {
      type: 'heading',
      text: 'তুলনা করলে Boolean পাওয়া যায়',
    },
    {
      type: 'paragraph',
      text: 'দুটি মান তুলনা করলে ফলাফল হয় একটি `Boolean`। যেমন `5 > 3` তুলনা করলে ফল আসে `true`।',
    },
    {
      type: 'list',
      items: [
        '`>` — বড় কি না',
        '`<` — ছোট কি না',
        '`>=` — বড় বা সমান কি না',
        '`<=` — ছোট বা সমান কি না',
        '`==` — সমান কি না',
        '`!=` — সমান নয় কি না',
      ],
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `fun main() {
    println(5 > 3)
    println(5 < 3)
    println(5 == 5)
    println(5 != 5)
}`,
    },
    {
      type: 'paragraph',
      text: '**আউটপুট**',
    },
    {
      type: 'code',
      code: `true
false
true
false`,
    },
    {
      type: 'paragraph',
      text: '`5 > 3` সত্য, তাই `true`। `5 < 3` মিথ্যা, তাই `false`। `5 == 5` সত্য, আর `5 != 5` মিথ্যা। অর্থাৎ তুলনার ফলাফল সবসময় `Boolean`।',
    },
    {
      type: 'note',
      text: '**মনে রাখুন:** সমান কি না বোঝাতে দুটি সমান চিহ্ন (`==`) ব্যবহার করতে হয়। একটি `=` মানে মান রাখা, আর `==` মানে তুলনা করা।',
    },
    {
      type: 'heading',
      text: 'Boolean নিয়ে হিসাব',
    },
    {
      type: 'paragraph',
      text: 'একাধিক Boolean মান মিলিয়ে চূড়ান্ত সত্য/মিথ্যা বের করা যায় তিনটি চিহ্ন দিয়ে:',
    },
    {
      type: 'list',
      items: [
        '`&&` — দুটোই সত্য হলে সত্য (AND)',
        '`||` — যেকোনো একটি সত্য হলেই সত্য (OR)',
        '`!` — সত্যকে মিথ্যা, মিথ্যাকে সত্য করে (NOT)',
      ],
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `fun main() {
    val isAdult = true
    val hasTicket = false

    println(isAdult && hasTicket)
    println(isAdult || hasTicket)
    println(!isAdult)
}`,
    },
    {
      type: 'paragraph',
      text: '**আউটপুট**',
    },
    {
      type: 'code',
      code: `false
true
false`,
    },
    {
      type: 'paragraph',
      text: '`isAdult && hasTicket` — দুটোই সত্য হতে হয়, কিন্তু `hasTicket` মিথ্যা, তাই ফল `false`। `isAdult || hasTicket` — যেকোনো একটি সত্য হলেই চলে, `isAdult` সত্য, তাই ফল `true`। `!isAdult` — সত্যের উল্টো, তাই `false`।',
    },
    {
      type: 'heading',
      text: 'সাধারণ ভুল',
    },
    {
      type: 'list',
      items: [
        '**তুলনায় একটি `=` দেওয়া:** `5 = 5` ভুল। তুলনার জন্য `5 == 5` লিখতে হবে।',
        '**`true`/`false` বড় হাতে লেখা:** `True` বা `False` ভুল। সবসময় ছোট হাতে `true`/`false` লিখুন।',
        '**`&` বা `|` একটি লেখা:** Boolean-এর জন্য `&&` ও `||` দুটি করে চিহ্ন লাগে।',
        '**কোটেশন দিয়ে লেখা:** `"true"` হলো `String`, আর `true` হলো `Boolean` — দুটি আলাদা।',
      ],
    },
    {
      type: 'task',
      title: 'অনুশীলন: সত্য না মিথ্যা',
      text: 'নিজের কোড `fun main()`-এর ভেতরে লিখে চালান।\n১. দুটি Boolean ভেরিয়েবল বানান: `isStudent = true`, `hasLibraryCard = false`।\n২. `&&`, `||`, `!` ব্যবহার করে তিনটি ফল প্রিন্ট করুন এবং নিজের অনুমান মিলিয়ে নিন।\n৩. `10 > 5`, `10 < 5`, `10 == 10`, `10 != 10` — চারটি তুলনা প্রিন্ট করুন।\n৪. `val myAge = 20` ধরে `myAge >= 18` প্রিন্ট করে দেখুন — প্রাপ্তবয়স্ক কি না বোঝা যায়।',
      hint: '`println(isStudent && hasLibraryCard)` দিয়ে শুরু করুন। প্রতিটি ফলাফল আগে কাগজে অনুমান করে তারপর চালান।',
    },
    {
      type: 'quiz',
      questions: [
        {
          question: '`Boolean`-এর সম্ভাব্য মান কয়টি?',
          options: ['শুধু `true`', '`true` আর `false` — এই দুটি', 'যেকোনো সংখ্যা', 'শুধু `0` আর `1` লেখা যায়'],
          answerIndex: 1,
          explanation: '`Boolean`-এর মাত্র দুটি মান থাকে — `true` অথবা `false`।',
        },
        {
          question: '`5 > 3` প্রিন্ট করলে কী আসবে?',
          options: ['`true`', '`false`', '`5`', 'এরর'],
          answerIndex: 0,
          explanation: '`5` সত্যিই `3`-এর চেয়ে বড়, তাই তুলনার ফল `true`।',
        },
        {
          question: '`true && false`-এর মান কত?',
          options: ['`true`', '`false`', 'এরর', '`1`'],
          answerIndex: 1,
          explanation: '`&&` (AND) দুটোই সত্য হলে তবেই সত্য হয়। এখানে একটি মিথ্যা, তাই ফল `false`।',
        },
      ],
    },
  ],
};

export default lesson;
