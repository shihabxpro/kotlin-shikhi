import type { Lesson } from '../../../types';

const lesson: Lesson = {
  title: 'Type Conversion',
  blocks: [
    {
      type: 'paragraph',
      text: 'একটি Data Type-এর মান কখনো অন্য Data Type-এ বদলানোর দরকার পড়ে। যেমন কেউ বয়স লিখেছে "20" (লেখা হিসেবে), কিন্তু যোগ করতে হলে সেটিকে সংখ্যায় বদলাতে হবে। এই বদলানোর কাজটিকে বলা হয় **Type Conversion** (ধরন রূপান্তর)।',
    },
    {
      type: 'heading',
      text: 'Kotlin নিজে থেকে বদলায় না',
    },
    {
      type: 'paragraph',
      text: 'কিছু ভাষায় Kotlin নিজে থেকেই একটা ধরনকে অন্যের সাথে মানিয়ে নেয়, কিন্তু Kotlin-এ সেটা হয় না। এখানে ধরন বদলাতে হলে স্পষ্ট করে বলতে হয়।',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `val number = 10
val decimal = 2.5

// এটা কাজ করবে না
val total = number + decimal`,
    },
    {
      type: 'paragraph',
      text: 'উপরের কোডে এরর আসবে, কারণ `Int` আর `Double` সরাসরি মেশানো যায় না। আগে একটিকে অন্যটির ধরনে বদলাতে হবে।',
    },
    {
      type: 'heading',
      text: 'বদলানোর উপায়',
    },
    {
      type: 'paragraph',
      text: 'প্রতিটি Data Type-এর জন্য একটি করে বদলানোর ফাংশন আছে। ভেরিয়েবলের পরে ডট (`.`) দিয়ে সেটি লিখতে হয়।',
    },
    {
      type: 'list',
      items: [
        '`toInt()` — `Int`-এ বদলায়',
        '`toLong()` — `Long`-এ বদলায়',
        '`toDouble()` — `Double`-এ বদলায়',
        '`toFloat()` — `Float`-এ বদলায়',
        '`toString()` — লেখায় (String) বদলায়',
      ],
    },
    {
      type: 'heading',
      text: 'Int থেকে Double',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `val number = 10
val decimal = 2.5

val converted = number.toDouble()
val total = converted + decimal

println(total)`,
    },
    {
      type: 'paragraph',
      text: '**আউটপুট**',
    },
    {
      type: 'code',
      code: '12.5',
    },
    {
      type: 'paragraph',
      text: 'এখানে `number.toDouble()` লিখে `10`-কে `10.0` বানানো হয়েছে। এখন দুটোই `Double`, তাই যোগ করা গেল এবং ফল `12.5`।',
    },
    {
      type: 'heading',
      text: 'লেখা থেকে সংখ্যা',
    },
    {
      type: 'paragraph',
      text: 'String-এ থাকা সংখ্যাকে আবার সংখ্যায় বদলানো যায়।',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `val text = "50"
val number = text.toInt()

println(number + 5)`,
    },
    {
      type: 'paragraph',
      text: '**আউটপুট**',
    },
    {
      type: 'code',
      code: '55',
    },
    {
      type: 'paragraph',
      text: '`"50"` মূলত লেখা। `toInt()` দিয়ে সেটিকে `50` সংখ্যায় বদলালে যোগ করা গেল, ফল `55`। যদি বদলানো না হতো, তাহলে `"50" + 5` হয়ে যেত `"505"` (জোড়া লাগানো)।',
    },
    {
      type: 'note',
      text: '**মনে রাখবে**: `toInt()` শুধু সঠিক সংখ্যা থাকলেই কাজ করে। `"রহিম".toInt()` লিখলে এরর আসবে, কারণ লেখাটি সংখ্যা নয়।',
    },
    {
      type: 'heading',
      text: 'দশমিক থেকে পূর্ণসংখ্যা',
    },
    {
      type: 'paragraph',
      text: '`Double` থেকে `Int`-এ বদলালে দশমিক অংশটি বাদ পড়ে যায়।',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `val price = 99.99
val rounded = price.toInt()

println(rounded)`,
    },
    {
      type: 'paragraph',
      text: '**আউটপুট**',
    },
    {
      type: 'code',
      code: '99',
    },
    {
      type: 'paragraph',
      text: 'লক্ষ করো, `99.99` কে `100` বানানো হয়নি — বরং `.99` অংশটি বাদ পড়ে ফল হয়েছে `99`। এটি রাউন্ডিং নয়, বরং দশমিক অংশ বাদ দেওয়া।',
    },
    {
      type: 'heading',
      text: 'সংখ্যা থেকে লেখা',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `val score = 100
val text = score.toString()

println("স্কোর: " + text)`,
    },
    {
      type: 'paragraph',
      text: '**আউটপুট**',
    },
    {
      type: 'code',
      code: 'স্কোর: 100',
    },
    {
      type: 'paragraph',
      text: '`toString()` দিয়ে যেকোনো মানকে লেখায় বদলানো যায়। অবশ্য String Template (`$`) ব্যবহার করলে এই কাজটি নিজে থেকেই হয়ে যায়, তাই অনেক সময় আলাদা করে `toString()` লাগে না।',
    },
    {
      type: 'heading',
      text: 'সাধারণ ভুল',
    },
    {
      type: 'list',
      items: [
        '**নিজে থেকে বদল হবে ভাবা:** `val x: Double = 10` লিখলে এরর আসে, কারণ `Int` নিজে থেকে `Double` হয় না। সঠিক: `val x: Double = 10.toDouble()`।',
        '**সংখ্যা নয় এমন লেখায় `toInt()`:** `"আমার"` এর `toInt()` লিখলে এরর আসে, কারণ এখানে সংখ্যা নেই।',
        '**দশমিকে রাউন্ডিং আশা করা:** `99.99.toInt()` = `99`, `100` নয়। দশমিক বাদ পড়ে, গোল করা হয় না।',
        '**বদল করা মান না ধরা:** `number.toDouble()` আলাদা একটি মান দেয়, মূল `number` বদলায় না। ফলের মান কোথাও রাখতে হয়।',
      ],
    },
    {
      type: 'task',
      title: 'অনুশীলন: ধরন বদলান',
      text: '১. `val number = 25` কে `Double`-এ বদলে প্রিন্ট করুন।\n২. `val text = "75"` কে `Int`-এ বদলে ৫ যোগ করে প্রিন্ট করুন।\n৩. `val price = 149.99` কে `Int`-এ বদলে ফল দেখুন (দশমিক বাদ পড়বে)।\n৪. `val score = 250` কে `toString()` দিয়ে লেখায় বদলে `"স্কোর: "` এর সঙ্গে জোড়া লাগিয়ে প্রিন্ট করুন।',
      hint: '`.toDouble()`, `.toInt()`, `.toString()` — এই ফাংশনগুলো ভেরিয়েবলের পরে ডট দিয়ে লিখুন।',
    },
    {
      type: 'quiz',
      questions: [
        {
          question: '`val number = 10` কে `Double`-এ বদলাতে কী লিখতে হবে?',
          options: ['`number.toDouble()`', '`number.double()`', '`Double(number)`', '`number == 10.0`'],
          answerIndex: 0,
          explanation: 'Kotlin-এ ধরন বদলাতে `toDouble()`, `toInt()` ইত্যাদি ফাংশন ব্যবহার করা হয়।',
        },
        {
          question: '`"50".toInt() + 5`-এর ফল কী?',
          options: ['`"505"`', '`55`', '`"55"`', 'এরর'],
          answerIndex: 1,
          explanation: '`"50"` কে `50` সংখ্যায় বদলালে `50 + 5 = 55` হয়।',
        },
        {
          question: '`99.99.toInt()`-এর মান কত?',
          options: ['`100`', '`99`', '`99.99`', '`0`'],
          answerIndex: 1,
          explanation: '`Double` থেকে `Int`-এ বদলালে দশমিক অংশ বাদ পড়ে, তাই ফল `99` (গোল করা হয় না)।',
        },
      ],
    },
  ],
};

export default lesson;
