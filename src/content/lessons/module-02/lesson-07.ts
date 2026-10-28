import type { Lesson } from '../../../types';

const lesson: Lesson = {
  title: 'Double ও Float',
  blocks: [
    {
      type: 'paragraph',
      text: 'আগের লেসনে আমরা `Int` ও `Long` দিয়ে পূর্ণসংখ্যা রাখা শিখেছি। কিন্তু সব সংখ্যা পূর্ণ নয় — দাম, ওজন, দূরত্ব বা তাপমাত্রার অনেক সময় দশমিক অংশ লাগে। যেমন `99.5` টাকা, `1.75` কিলোগ্রাম। Kotlin-এ দশমিক সংখ্যা রাখার জন্য দুটি Type আছে — `Double` ও `Float`। এই লেসনে দুটোই শিখব।',
    },
    {
      type: 'heading',
      text: 'Double: ডিফল্ট দশমিক সংখ্যা',
    },
    {
      type: 'paragraph',
      text: 'Kotlin-এ দশমিক বিন্দু (`.`) থাকা সংখ্যা লিখলে সেটি সাধারণত `Double` হয়। `Double` দশমিক সংখ্যার ডিফল্ট Type, তাই বেশিরভাগ ক্ষেত্রে এটিই ব্যবহার করা হয়।',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `fun main() {
    val price = 99.5
    val weight = 1.75
    val pi = 3.14159

    println(price)
    println(weight)
    println(pi)
}`,
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
      text: 'তিনটি সংখ্যাতেই দশমিক বিন্দু আছে, তাই Kotlin এগুলোকে `Double` ধরেছে। Type আলাদা করে লেখা হয়নি; Kotlin মান দেখেই Type নির্ধারণ করেছে। চাইলে `val price: Double = 99.5` এভাবে Type স্পষ্ট করেও লেখা যায়।',
    },
    {
      type: 'heading',
      text: 'Float: শেষে f বা F',
    },
    {
      type: 'paragraph',
      text: '`Float`-ও দশমিক সংখ্যা রাখে, কিন্তু `Double`-এর চেয়ে কম নির্ভুল। `Float` ব্যবহার করতে হলে সংখ্যার শেষে `f` বা `F` বসাতে হয়। ছোট হাতের `f` আর বড় হাতের `F` — দুটোই কাজ করে।',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `fun main() {
    val height = 5.9f
    val ratio = 1.5F

    println(height)
    println(ratio)
}`,
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
      text: '`5.9f` আর `1.5F` — দুটোই `Float`। শেষে `f` বা `F` না দিলে Kotlin এগুলোকে `Double` ধরত। `println` দুটো মানই দশমিক আকারে প্রিন্ট করেছে, তাই আউটপুটে `5.9` আর `1.5` দেখা যাচ্ছে।',
    },
    {
      type: 'heading',
      text: 'Double আর Float-এর পার্থক্য',
    },
    {
      type: 'list',
      items: [
        '`Double` — প্রায় ১৫–১৬ অঙ্ক পর্যন্ত নির্ভুলভাবে রাখে। এটি ডিফল্ট Type; শেষে কিছু বসাতে হয় না, যেমন `3.14`।',
        '`Float` — প্রায় ৬–৭ অঙ্ক পর্যন্ত নির্ভুলভাবে রাখে। শেষে `f` বা `F` লাগে, যেমন `3.14f`।',
      ],
    },
    {
      type: 'paragraph',
      text: 'বেশিরভাগ সাধারণ কাজে `Double` ব্যবহার করাই ভালো, কারণ এটি বেশি নির্ভুল। `Float` কম মেমরি নেয়। তাই যখন কম নির্ভুলতা হলেও চলে এবং মেমরি বাঁচানো গুরুত্বপূর্ণ — যেমন একসঙ্গে অনেক সংখ্যা রাখতে হয় — তখন `Float` ব্যবহার করা যায়।',
    },
    {
      type: 'note',
      text: '**মনে রাখুন:** `5.9` হলো `Double`, আর `5.9f` বা `5.9F` হলো `Float`।',
    },
    {
      type: 'heading',
      text: 'একটি ছোট সতর্কতা',
    },
    {
      type: 'paragraph',
      text: 'কিছু দশমিক মান `Double`-এ ঠিকভাবে রাখা যায় না। যেমন `0.1 + 0.2` দেখুন:',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `fun main() {
    val total = 0.1 + 0.2
    println(total)
}`,
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
      text: 'গণিত অনুযায়ী `0.1 + 0.2` = `0.3` হওয়া উচিত। কিন্তু `Double`-এ `0.1` ও `0.2`-কে ঠিকভাবে রাখা যায় না, তাই যোগফলে সামান্য পার্থক্য দেখা যায়। এটি কোনো এরর নয়; দশমিক (floating-point) সংখ্যার স্বাভাবিক আচরণ। এ ধরনের দশমিক হিসাবে সামান্য পার্থক্য থাকতে পারে, জেনে রাখুন।',
    },
    {
      type: 'heading',
      text: 'সাধারণ ভুল',
    },
    {
      type: 'list',
      items: [
        '**Float-এ f ভুলে যাওয়া:** `val x: Float = 1.5` লিখলে কম্পাইল এরর আসে, কারণ `1.5` হলো `Double`। সঠিক: `val x: Float = 1.5f` বা `val x: Float = 1.5F`।',
        '**দশমিকে কমা ব্যবহার:** কোডে দশমিকের জন্য সবসময় বিন্দু (`.`) ব্যবহার করতে হয়। `3,14` লিখলে কাজ করবে না; লিখতে হবে `3.14`।',
        '**99.0-কে Int ভাবা:** `val price = 99.0` হলো `Double`, কিন্তু `val price = 99` হলো `Int`। দশমিক বিন্দু থাকলে সংখ্যাটি `Double` বা `Float` হয়, `Int` নয়।',
      ],
    },
    {
      type: 'task',
      title: 'অনুশীলন: Double ও Float',
      text: 'নিজের কোড `fun main()`-এর ভেতরে লিখে চালান।\n১. `Double` দিয়ে তিনটি ভেরিয়েবল বানান: একটি জিনিসের দাম, আপনার ওজন, এবং পাই (`3.14`)। তিনটি প্রিন্ট করুন।\n২. `Float` দিয়ে দুটি ভেরিয়েবল বানান; শেষে `f` বা `F` দিতে ভুলবেন না। দুটোই প্রিন্ট করুন।\n৩. `val total = 0.1 + 0.2` লিখে প্রিন্ট করুন এবং আউটপুটটি লক্ষ করুন।',
      hint: '`val price = 45.75` দিয়ে শুরু করুন। `Float`-এর জন্য `val distance = 2.5f`। কোডে ইংরেজি অঙ্ক ও দশমিক বিন্দু (`.`) ব্যবহার করুন।',
    },
    {
      type: 'quiz',
      questions: [
        {
          question: '`val x = 3.14` লিখলে `x`-এর Data Type কী হয়?',
          options: ['`Int`', '`Float`', '`Double`', '`String`'],
          answerIndex: 2,
          explanation: 'শেষে `f` বা `F` না থাকলে দশমিক সংখ্যা ডিফল্টভাবে `Double` হয়।',
        },
        {
          question: '`Float` সংখ্যা লিখতে শেষে কী বসাতে হয়?',
          options: ['`d`', '`f` বা `F`', '`L`', 'কিছুই না'],
          answerIndex: 1,
          explanation: 'শেষে `f` বা `F` বসালে Kotlin সংখ্যাটিকে `Float` হিসেবে ধরে।',
        },
        {
          question: 'দশমিক সংখ্যার জন্য কোনটি বেশি ব্যবহৃত হয়?',
          options: ['`Int`', '`Long`', '`Double`', '`Boolean`'],
          answerIndex: 2,
          explanation: '`Double` ডিফল্ট এবং বেশি নির্ভুল, তাই দশমিক সংখ্যার জন্য এটি বেশি ব্যবহৃত হয়।',
        },
      ],
    },
  ],
};

export default lesson;
