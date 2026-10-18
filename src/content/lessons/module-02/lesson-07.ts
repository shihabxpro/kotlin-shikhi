import type { Lesson } from '../../../types';

const lesson: Lesson = {
  title: 'Double ও Float',
  blocks: [
    {
      type: 'paragraph',
      text: 'সব সংখ্যা পূর্ণ নয়। দাম, ওজন, দূরত্ব, তাপমাত্রা — এসবের অনেক সময় দশমিক লাগে। যেমন `99.5` টাকা, `1.5` কিলোগ্রাম। দশমিকসহ এমন সংখ্যা রাখার জন্য Kotlin-এ দুটি Data Type আছে — `Double` ও `Float`। এই লেসনে দুটো শিখব।',
    },
    {
      type: 'heading',
      text: 'Double: ডিফল্ট দশমিক সংখ্যা',
    },
    {
      type: 'paragraph',
      text: 'Kotlin-এ দশমিকসহ সংখ্যা লিখলে সেটি সাধারণত `Double` হয়। `Double` অনেক বেশি নিখুঁত মান ধরে রাখতে পারে, তাই এটি সবচেয়ে বেশি ব্যবহৃত দশমিক ধরন।',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `val price = 99.5
val weight = 1.75
val pi = 3.14159

println(price)
println(weight)
println(pi)`,
    },
    {
      type: 'paragraph',
      text: '**আউটপুট**',
    },
    {
      type: 'code',
      code: `99.5
1.75
3.14159`,
    },
    {
      type: 'paragraph',
      text: 'ডান দিকে দশমিক বিন্দু (`.`) থাকলেই Kotlin সেটিকে `Double` ধরে নেয়।',
    },
    {
      type: 'heading',
      text: 'Float: ছোট দশমিক সংখ্যা',
    },
    {
      type: 'paragraph',
      text: '`Float`-ও দশমিক সংখ্যা রাখে, কিন্তু `Double`-এর চেয়ে কম নিখুঁত। `Float` ব্যবহার করতে হলে সংখ্যার শেষে `f` বসাতে হয়।',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `val height = 5.9f
val ratio = 1.5f

println(height)
println(ratio)`,
    },
    {
      type: 'paragraph',
      text: '**আউটপুট**',
    },
    {
      type: 'code',
      code: `5.9
1.5`,
    },
    {
      type: 'paragraph',
      text: 'শেষে `f` না দিলে Kotlin সেটিকে `Double` ধরবে। অর্থাৎ `5.9f` হলো `Float`, আর `5.9` হলো `Double`।',
    },
    {
      type: 'heading',
      text: 'Double আর Float-এর পার্থক্য',
    },
    {
      type: 'list',
      items: [
        '**`Double`** — বেশি নিখুঁত, ডিফল্ট। শেষে কোনো অক্ষর লাগে না, যেমন `3.14`।',
        '**`Float`** — কম নিখুঁত, শেষে `f` লাগে, যেমন `3.14f`।',
      ],
    },
    {
      type: 'paragraph',
      text: 'বেশিরভাগ সময় `Double` ব্যবহার করাই ভালো, কারণ এটি বেশি নিখুঁত। `Float` দরকার হয় যখন জায়গা বাঁচানো গুরুত্বপূর্ণ, যেমন একসঙ্গে অনেক সংখ্যা রাখতে হয়।',
    },
    {
      type: 'note',
      text: '**মনে রাখবে**: দশমিক সংখ্যার জন্য `Double`-ই প্রথম পছন্দ। শেষে `f` লিখলেই সেটি `Float` হয়ে যায়।',
    },
    {
      type: 'heading',
      text: 'একটি ছোট সতর্কতা',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `val total = 0.1 + 0.2
println(total)`,
    },
    {
      type: 'paragraph',
      text: '**আউটপুট**',
    },
    {
      type: 'code',
      code: `0.30000000000000004`,
    },
    {
      type: 'paragraph',
      text: 'গণিত অনুযায়ী `0.1 + 0.2` = `0.3` হওয়া উচিত, কিন্তু কম্পিউটারে দশমিক সংখ্যা রাখার নিয়মের কারণে সামান্য পার্থক্য দেখা যায়। এটি দশমিক সংখ্যার একটি সাধারণ বৈশিষ্ট্য — অনেক সময় দেখা যাবে, তাই চিন্তার কিছু নেই।',
    },
    {
      type: 'heading',
      text: 'সাধারণ ভুল',
    },
    {
      type: 'list',
      items: [
        '**`Float`-এ `f` ভুলে যাওয়া:** `val x: Float = 1.5` লিখলে এরর আসে, কারণ `1.5` হলো `Double`। সঠিক: `val x: Float = 1.5f`।',
        '**দশমিকের জায়গায় কমা ব্যবহার:** বাংলায় দশমিক লেখা হয় কমা দিয়ে, কিন্তু কোডে সবসময় বিন্দু (`.`) ব্যবহার করতে হয়। `3,14` নয়, `3.14`।',
        '**দশমিক সংখ্যাকে `Int` ভাবা:** `val price = 99.0` কিন্তু `val price = 99` নয় — প্রথমটি `Double`, দ্বিতীয়টি `Int`।',
      ],
    },
    {
      type: 'task',
      title: 'অনুশীলন: দশমিক সংখ্যা',
      text: '১. `Double` দিয়ে তিনটি ভেরিয়েবল বানান: একটি জিনিসের দাম, আপনার ওজন, এবং পাই (৩.১৪)।\n২. `Float` দিয়ে দুটি ভেরিয়েবল বানান — শেষে `f` দিতে ভুলবেন না।\n৩. সবগুলো প্রিন্ট করুন।\n৪. `val total = 0.1 + 0.2` লিখে প্রিন্ট করে আউটপুটটি লক্ষ করুন।',
      hint: '`val price = 45.75` এভাবে শুরু করুন। Float-এর জন্য `val distance = 2.5f`।',
    },
    {
      type: 'quiz',
      questions: [
        {
          question: '`val x = 3.14` লিখলে `x`-এর Data Type কী হয়?',
          options: ['`Int`', '`Float`', '`Double`', '`String`'],
          answerIndex: 2,
          explanation: 'শেষে `f` না থাকলে দশমিক সংখ্যা ডিফল্টভাবে `Double` হয়।',
        },
        {
          question: '`Float` সংখ্যা লিখতে শেষে কী বসাতে হয়?',
          options: ['`d`', '`f`', '`L`', 'কিছুই না'],
          answerIndex: 1,
          explanation: 'শেষে `f` বসালে Kotlin সংখ্যাটিকে `Float` হিসেবে ধরে।',
        },
        {
          question: 'দশমিক সংখ্যার জন্য কোনটি বেশি ব্যবহৃত হয়?',
          options: ['`Int`', '`Long`', '`Double`', '`Boolean`'],
          answerIndex: 2,
          explanation: '`Double` বেশি নিখুঁত এবং ডিফল্ট, তাই এটি বেশি ব্যবহৃত হয়।',
        },
      ],
    },
  ],
};

export default lesson;
