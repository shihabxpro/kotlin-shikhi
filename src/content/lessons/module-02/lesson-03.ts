import type { Lesson } from '../../../types';

const lesson: Lesson = {
  title: 'ভেরিয়েবলের নামের নিয়ম',
  blocks: [
    {
      type: 'paragraph',
      text: 'আগের লেসনে আমরা `val` আর `var` দিয়ে ভেরিয়েবল বানানো শিখেছি। কিন্তু ভেরিয়েবলের নাম ইচ্ছেমতো যা তা দেওয়া যায় না। Kotlin-এর কিছু নিয়ম আছে, আর প্রোগ্রামাররা মেনে চলেন কিছু convention। এই লেসনে সেগুলোই দেখব।',
    },
    {
      type: 'heading',
      text: 'নাম কেন গুরুত্বপূর্ণ',
    },
    {
      type: 'paragraph',
      text: 'ভেরিয়েবলের নাম একদম চিনির কৌটার লেবেলের মতো। লেবেলে যদি লেখা থাকে "চিনি", তবে যেকোনো সময় কৌটাটা খুলে দেখা লাগে না — নাম দেখেই বোঝা যায় ভেতরে কী আছে।\nএকইভাবে, ভালো নাম দেওয়া হলে কোড পড়ে সহজে বোঝা যায় কোথায় কোন তথ্য রাখা আছে।',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `// বিভ্রান্তিকর নাম
val x = 500

// পরিষ্কার নাম
val monthlySalary = 500`,
    },
    {
      type: 'paragraph',
      text: 'দুটোই ভ্যালিড Kotlin কোড। কিন্তু দ্বিতীয়টা পড়ে সাথে সাথেই বোঝা যায় `500` মানেটা কী বোঝাচ্ছে। তাই নিয়মের আগে অভ্যাসটা মনে রাখুন: **নাম এমন হতে হবে যা দেখে অর্থ বোঝা যায়।**',
    },
    {
      type: 'heading',
      text: 'নাম দেওয়ার নিয়ম',
    },
    {
      type: 'paragraph',
      text: 'Kotlin যে নিয়মগুলো না মানলে এরর দেয়:',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        '**অক্ষর বা আন্ডারস্কোর দিয়ে শুরু হতে হবে।** সংখ্যা দিয়ে নাম শুরু করা যায় না।',
        '**ভেতরে অক্ষর, সংখ্যা ও আন্ডারস্কোর (`_`) থাকতে পারে।** ফাঁকা জায়গা বা `-`, `@`, `#` জাতীয় চিহ্ন চলবে না।',
        '**Kotlin-এর সংরক্ষিত শব্দ ব্যবহার করা যায় না।** যেমন `val`, `var`, `fun`, `class`, `if`, `return` — এগুলো ভাষার নিজের শব্দ।',
      ],
    },
    {
      type: 'paragraph',
      text: 'উদাহরণ দেখলেই পরিষ্কার হবে।',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `// ঠিক আছে
val name = "রহিম"
val playerName = "সাকিব"
val score2 = 50
val _temp = 10`,
    },
    {
      type: 'paragraph',
      text: 'এবার যেগুলো চলবে না:',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `// ভুল: সংখ্যা দিয়ে শুরু
val 2player = "সাকিব"

// ভুল: মাঝে ফাঁকা জায়গা
val player name = "সাকিব"

// ভুল: হাইফেন
val player-name = "সাকিব"

// ভুল: এটা Kotlin-এর নিজের শব্দ
val val = 10`,
    },
    {
      type: 'note',
      text: '**মনে রাখবে**: নাম শুরুর অক্ষর বা আন্ডারস্কোর হতে হবে — সংখ্যা নয়। অর্থাৎ `score2` ঠিক আছে, কিন্তু `2score` এরর দেবে।',
    },
    {
      type: 'heading',
      text: 'বড় হাত আর ছোট হাত আলাদা',
    },
    {
      type: 'paragraph',
      text: 'Kotlin-এ ছোট হাতের `score` আর বড় হাতের `Score` সম্পূর্ণ আলাদা দুটি নাম। এদের একটার সঙ্গে অন্যটার কোনো সম্পর্ক নেই।',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `fun main() {
    val score = 10
    val Score = 20

    println(score)
    println(Score)
}`,
    },
    {
      type: 'paragraph',
      text: '**আউটপুট**',
    },
    {
      type: 'code',
      code: `10
20`,
    },
    {
      type: 'paragraph',
      text: 'দুটো ভেরিয়েবলই আলাদা, তাই দুটোই আলাদা মান ধরে রাখে। এই গুণটাকে বলে **case-sensitive**।',
    },
    {
      type: 'heading',
      text: 'নাম লেখার রীতি (camelCase)',
    },
    {
      type: 'paragraph',
      text: 'উপরের নিয়মগুলো ভাঙলে এরর আসে। কিন্তু এর পাশাপাশি একটা **রীতি** আছে যা ভাঙলে এরর আসে না, তবে কোড অন্যদের পড়তে অসুবিধা হয়। Kotlin-এ ভেরিয়েবলের নাম লেখা হয় **camelCase** পদ্ধতিতে।',
    },
    {
      type: 'paragraph',
      text: 'মানেটা কী? প্রথম শব্দটা ছোট হাতের অক্ষর দিয়ে শুরু হয়, আর পরের প্রতিটি শব্দের প্রথম অক্ষর বড় হাতের হয় — উটের কুঁজের মতো। যেমন: `playerName`, `monthlySalary`, `totalScore`।',
    },
    {
      type: 'list',
      items: [
        '`playername` — পড়তে কষ্ট, তাই ভালো নয়।',
        '`playerName` — camelCase, এটাই স্ট্যান্ডার্ড।',
        '`PlayerName` — প্রতিটি শব্দ বড় হাত দিয়ে শুরু, এটি class-এর রীতি (পরে শিখব)।',
        '`player_name` — কাজ করে, তবে Kotlin-এ সাধারণত ব্যবহার হয় না।',
      ],
    },
    {
      type: 'heading',
      text: 'বাংলা নাম দেওয়া যায়?',
    },
    {
      type: 'paragraph',
      text: 'মজার ব্যাপার হলো, Kotlin-এ বাংলার অক্ষর দিয়ে ভেরিয়েবলের নাম দেওয়া যায়। যেমন:',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `fun main() {
    val নাম = "রহিম"
    println(নাম)
}`,
    },
    {
      type: 'paragraph',
      text: '**আউটপুট**',
    },
    {
      type: 'code',
      code: 'রহিম',
    },
    {
      type: 'paragraph',
      text: 'কোড চলবে ঠিকই, কিন্তু সবক্ষেত্রে এটা ভালো অভ্যাস নয়। বাস্তব প্রজেক্টে, চাকরিতে বা অন্য প্রোগ্রামারদের সঙ্গে কাজ করার সময় ইংরেজি নামই ব্যবহার করা হয়। তাই শুরু থেকেই ইংরেজি নাম লেখার অভ্যাস করে ফেলুন।',
    },
    {
      type: 'heading',
      text: 'সাধারণ ভুল',
    },
    {
      type: 'list',
      items: [
        'সংখ্যা দিয়ে শুরু: `val 1stPlace = 5` — এরর। বদলে `val firstPlace = 5` লিখুন।',
        'মাঝে ফাঁকা জায়গা: `val my score = 10` — এরর। বদলে `val myScore = 10` লিখুন।',
        'সংরক্ষিত শব্দ: `val class = 10` — `class` Kotlin-এর নিজের শব্দ, তাই নাম হিসেবে চলবে না।',
        'বড়-ছোট হাতে গোলমাল: `val PlayerName = "..."` লিখে পরে `playerName` দিয়ে ব্যবহার করলে এরর আসবে — দুটো আলাদা নাম।',
      ],
    },
    {
      type: 'task',
      title: 'অনুশীলন: ভালো নাম দিন',
      text: '১. নিচের ভুল নামগুলো Kotlin-এর নিয়ম মেনে ঠিক করে লেখুন:\n   - `val 2days = 2`\n   - `val user name = "রহিম"`\n   - `val final = 100`\n২. নিচের তথ্যগুলোর জন্য অর্থপূর্ণ নাম ঠিক করে ভেরিয়েবল বানান:\n   - আপনার বয়স\n   - আপনার প্রিয় রঙ\n   - একটি পণ্যের দাম\n৩. সব ভেরিয়েবল প্রিন্ট করে কোডটি প্লেগ্রাউন্ডে চালান।',
      hint: 'নাম camelCase-এ রাখুন, যেমন `myAge`, `favoriteColor`, `productPrice`। `final`-এর বদলে `totalPrice` বা `finalScore` ভাবতে পারেন।',
    },
    {
      type: 'quiz',
      questions: [
        {
          question: 'নিচের কোন নামটি Kotlin-এ ঠিক আছে?',
          options: ['`val 1stPlayer = "সাকিব"`', '`val first player = "সাকিব"`', '`val firstPlayer = "সাকিব"`', '`val first-player = "সাকিব"`'],
          answerIndex: 2,
          explanation: 'সংখ্যা দিয়ে শুরু, ফাঁকা জায়গা বা হাইফেন — এগুলো ব্যবহার করা যায় না। `firstPlayer` নিয়ম মেনে লেখা একটা সঠিক নাম।',
        },
        {
          question: '`val score = 5` আর `val Score = 9` — এই দুটো সম্পর্কে কোনটা সঠিক?',
          options: [
            'দুটো একই ভেরিয়েবল, মান ৯ হয়ে যায়',
            'দুটো আলাদা ভেরিয়েবল',
            'এরর আসে, একই নাম তো',
            'শুধু প্রথমটা কাজ করে',
          ],
          answerIndex: 1,
          explanation: 'Kotlin case-sensitive। ছোট হাতের `score` আর বড় হাতের `Score` দুটো আলাদা নাম, তাই আলাদা ভেরিয়েবল।',
        },
        {
          question: '`val class = 10` লেখলে কী হবে?',
          options: [
            'ঠিকঠাক চলবে',
            '`class` নামে ভেরিয়েবল তৈরি হবে',
            'এরর আসবে, কারণ `class` সংরক্ষিত শব্দ',
            'স্বয়ংক্রিয়ভাবে নাম বদলে যাবে',
          ],
          answerIndex: 2,
          explanation: '`class` Kotlin-এর সংরক্ষিত (reserved) শব্দ, তাই ভেরিয়েবলের নাম হিসেবে ব্যবহার করা যায় না।',
        },
      ],
    },
  ],
};

export default lesson;
