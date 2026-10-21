import type { Lesson } from '../../../types';

const lesson: Lesson = {
  title: 'Type লেখার দুই উপায়',
  blocks: [
    {
      type: 'paragraph',
      text: 'আগের লেসনে আমরা জেনেছি, প্রতিটি মানের একটি Data Type থাকে। এবার দেখব, ভেরিয়েবলের Type কীভাবে নির্ধারণ করা যায়। Kotlin-এ এর দুটি উপায় আছে—নিজে Type লিখে দেওয়া অথবা Kotlin-কে মান দেখে Type বুঝে নিতে দেওয়া।',
    },
    {
      type: 'heading',
      text: 'উপায় ১: Type নিজে লেখা',
    },
    {
      type: 'paragraph',
      text: 'ভেরিয়েবলের নামের পরে কোলন (`:`) দিয়ে Type লিখে দেওয়া যায়। একে বলে **Type Declaration** (টাইপ ঘোষণা করা)।',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `val name: String = "রহিম"
val age: Int = 20
val price: Double = 99.5`,
    },
    {
      type: 'paragraph',
      text: 'এখানে আমরা নিজেরাই প্রতিটি ভেরিয়েবলের Type লিখে দিয়েছি।',
    },
    {
      type: 'paragraph',
      text: 'একটি লাইন ভালোভাবে বুঝে নেওয়া যাক:',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `val age: Int = 20`,
    },
    {
      type: 'list',
      items: [
        '`val` — ভেরিয়েবল তৈরির জন্য ব্যবহৃত হয়।',
        '`age` — ভেরিয়েবলের নাম।',
        '`: Int` — ভেরিয়েবলটির Type হলো `Int`।',
        '`= 20` — ভেরিয়েবলটিতে `20` মানটি রাখা হয়েছে।',
      ],
    },
    {
      type: 'paragraph',
      text: 'পুরো গঠনটি মনে রাখুন: **নাম: Type = মান**',
    },
    {
      type: 'heading',
      text: 'উপায় ২: Kotlin-কে Type বুঝে নিতে দেওয়া',
    },
    {
      type: 'paragraph',
      text: 'এই পদ্ধতিতে আমরা Type লিখি না। ভেরিয়েবলের জন্য একটি মান দিলে Kotlin সেই মান দেখে নিজেই Type নির্ধারণ করে। একে বলে **Type Inference** (টাইপ অনুমান করা)।',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `val name = "রহিম"
val age = 20
val price = 99.5`,
    },
    {
      type: 'paragraph',
      text: 'এখানে Kotlin বুঝে নেয়:',
    },
    {
      type: 'list',
      items: [
        '`name` হলো `String`।',
        '`age` হলো `Int`।',
        '`price` হলো `Double`।',
      ],
    },
    {
      type: 'paragraph',
      text: 'এই পদ্ধতিতে কোড ছোট ও পরিষ্কার থাকে। তাই মান দেওয়ার সময় সাধারণত Type Inference ব্যবহার করা হয়।',
    },
    {
      type: 'heading',
      text: 'দুটি পদ্ধতির মধ্যে পার্থক্য কী?',
    },
    {
      type: 'paragraph',
      text: 'দুটি উদাহরণ দেখুন:',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `val score: Int = 100
val score2 = 100`,
    },
    {
      type: 'paragraph',
      text: 'প্রথম লাইনে আমরা স্পষ্টভাবে `Int` লিখেছি। দ্বিতীয় লাইনে Kotlin মান দেখে Type নির্ধারণ করেছে।',
    },
    {
      type: 'paragraph',
      text: 'পদ্ধতি আলাদা হলেও উভয় ভেরিয়েবলের Type হলো `Int`। অর্থাৎ, Type নিজে লিখুন বা Kotlin-কে বুঝে নিতে দিন—সঠিকভাবে লিখলে ফল একই হতে পারে।',
    },
    {
      type: 'heading',
      text: 'Type ও মান না মিললে কী হয়?',
    },
    {
      type: 'paragraph',
      text: 'Type নিজে লিখে দেওয়ার একটি সুবিধা হলো, ভুল ধরনের মান দিলে Kotlin সেটি শনাক্ত করতে পারে।',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `val age: Int = "বিশ"`,
    },
    {
      type: 'paragraph',
      text: 'এখানে `age`-এর Type বলা হয়েছে `Int`, কিন্তু `"বিশ"` হলো `String` ধরনের মান। তাই Kotlin Type Mismatch-এর মতো একটি কম্পাইল এরর দেখাবে। অর্থাৎ, নির্ধারিত Type ও দেওয়া মানের মধ্যে মিল নেই।',
    },
    {
      type: 'heading',
      text: 'আগে ভেরিয়েবল, পরে মান',
    },
    {
      type: 'paragraph',
      text: 'কখনো ভেরিয়েবল তৈরি করার সময়ই মান দেওয়া সম্ভব হয় না। তখন Type স্পষ্ট করে লিখে ভেরিয়েবল তৈরি করা যায়, পরে মান দেওয়া যায়।',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `val age: Int
age = 20

println(age)`,
    },
    {
      type: 'paragraph',
      text: 'আউটপুট:',
    },
    {
      type: 'code',
      code: `20`,
    },
    {
      type: 'paragraph',
      text: 'এখানে প্রথম লাইনে `age`-এর Type ঘোষণা করা হয়েছে। পরের লাইনে প্রথমবারের মতো মান দেওয়া হয়েছে।',
    },
    {
      type: 'note',
      text: '`val` ব্যবহার করেও এভাবে পরে মান দেওয়া যায়। তবে `val`-এর মান একবারই নির্ধারণ করা যায়। মান দেওয়ার আগে `age` ব্যবহার করলে Kotlin এরর দেখাবে।',
    },
    {
      type: 'heading',
      text: 'কখন কোন পদ্ধতি ব্যবহার করব?',
    },
    {
      type: 'list',
      items: [
        '**Type Inference ব্যবহার করুন:** যখন ভেরিয়েবল তৈরির সময়ই মান দিচ্ছেন এবং মান দেখে Kotlin সহজেই Type নির্ধারণ করতে পারে।',
        '**Type Declaration ব্যবহার করুন:** যখন ভেরিয়েবল তৈরির সময় মান দিচ্ছেন না, অথবা Type স্পষ্টভাবে উল্লেখ করা প্রয়োজন।',
      ],
    },
    {
      type: 'heading',
      text: 'সাধারণ ভুল',
    },
    {
      type: 'paragraph',
      text: '**১. Type-এর নাম ভুল লেখা**',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `val age: int = 20`,
    },
    {
      type: 'paragraph',
      text: 'এখানে `int` ভুল। Kotlin-এ সঠিক Type হলো `Int`।',
    },
    {
      type: 'paragraph',
      text: '**২. Type ও মানের মধ্যে অমিল**',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `val name: Int = "রহিম"`,
    },
    {
      type: 'paragraph',
      text: 'এখানে `Int`-এর পরিবর্তে `String` মান দেওয়া হয়েছে। তাই এরর হবে।',
    },
    {
      type: 'paragraph',
      text: '**৩. মান না দিয়ে ভেরিয়েবল ব্যবহার করা**',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `val age: Int
println(age)`,
    },
    {
      type: 'paragraph',
      text: 'এখানে `age`-এর মান নির্ধারণ করার আগেই সেটি ব্যবহার করা হয়েছে। তাই এরর হবে।',
    },
    {
      type: 'heading',
      text: 'সংক্ষেপে মনে রাখুন',
    },
    {
      type: 'list',
      items: [
        '**Type Declaration:** আমরা নিজেরা Type লিখে দিই।',
        '**Type Inference:** Kotlin মান দেখে Type নির্ধারণ করে।',
        'দুটি পদ্ধতিতেই ভেরিয়েবলের Type একই হতে পারে।',
        'Type ও মানের মধ্যে মিল থাকতে হবে।',
        'মান পরে দিতে হলে Type আগে থেকেই ঘোষণা করতে হয়।',
      ],
    },
    {
      type: 'task',
      title: 'অনুশীলন: দুই উপায়ে Type লেখা',
      text: 'ধাপে ধাপে অনুশীলন করুন:\n\n১. `city` নামে একটি ভেরিয়েবল তৈরি করুন। এর মান হিসেবে আপনার শহরের নাম দিন এবং Type স্পষ্টভাবে লিখুন।\n\n২. `town` নামে আরেকটি ভেরিয়েবল তৈরি করুন। এতে একই মান দিন, তবে এবার Type লিখবেন না।\n\n৩. দুটি ভেরিয়েবলের মান প্রিন্ট করুন। আউটপুট একই কি না দেখুন।\n\n৪. `val score: Int = "দশ"` লিখে দেখুন কী ধরনের এরর আসে। এরপর ওই লাইনের শুরুতে `//` বসিয়ে কমেন্ট করে দিন, যাতে পরের কোড চালানো যায়।\n\n৫. `level` নামে একটি `Int` ভেরিয়েবল তৈরি করুন, পরের লাইনে এর মান `3` দিন এবং শেষে সেটি প্রিন্ট করুন।',
      hint: 'প্রথম ধাপ: `val city: String = "ঢাকা"`\nদ্বিতীয় ধাপ: `val town = "ঢাকা"`\nচতুর্থ ধাপ: `// val score: Int = "দশ"`\nপঞ্চম ধাপ: `val level: Int` তারপর `level = 3` এবং `println(level)`',
    },
    {
      type: 'heading',
      text: 'নিজেকে যাচাই করুন',
    },
    {
      type: 'quiz',
      questions: [
        {
          question: 'Type নিজে লিখে ভেরিয়েবল তৈরির সঠিক নিয়ম কোনটি?',
          options: [
            '`val Int age = 20`',
            '`val age = Int 20`',
            '`val age: Int = 20`',
            '`val age Int: 20`',
          ],
          answerIndex: 2,
          explanation: 'ভেরিয়েবলের নামের পরে কোলন (`:`) দিয়ে Type লিখতে হয়। গঠনটি হলো `নাম: Type = মান`।',
        },
        {
          question: '`val age: Int = "বিশ"` লিখলে কী হবে?',
          options: [
            'এরর আসবে, কারণ `String` মানকে `Int` হিসেবে দেওয়া হয়েছে।',
            '`age`-এর মান `বিশ` হয়ে যাবে।',
            '`age` নিজে থেকেই `String` হয়ে যাবে।',
            'কোনো সমস্যা হবে না।',
          ],
          answerIndex: 0,
          explanation: 'এখানে `age`-এর Type হলো `Int`, কিন্তু `"বিশ"` হলো `String` মান। তাই Kotlin Type Mismatch-এর এরর দেখাবে।',
        },
        {
          question: 'কখন ভেরিয়েবলের Type নিজে লিখে দিতে হয়?',
          options: [
            'যখন মান একটি সংখ্যা হয়।',
            'যখন ভেরিয়েবলের নাম ছোট হয়।',
            'সব সময়, নইলে প্রোগ্রাম চলে না।',
            'যখন ভেরিয়েবল তৈরির সময় মান দেওয়া হয় না।',
          ],
          answerIndex: 3,
          explanation: 'মান না থাকলে Kotlin সেটি দেখে Type অনুমান করতে পারে না। তাই `val age: Int`-এর মতো করে Type স্পষ্টভাবে লিখে দিতে হয়।',
        },
      ],
    },
  ],
};

export default lesson;
