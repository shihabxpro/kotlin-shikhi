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
      text: 'কিছু ভাষায় একটি সংখ্যার ধরন অন্য সংখ্যার ধরনে নিজে থেকেই মানিয়ে নেওয়া হয়। কিন্তু Kotlin-এ **মান রাখার সময়** বা **ফাংশনে পাঠানোর সময়** এমন নিজে থেকে বদল হয় না। ধরন বদলাতে হলে স্পষ্ট করে বলতে হয়।',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `fun main() {
    val number = 10
    val decimal: Double = number
}`,
    },
    {
      type: 'paragraph',
      text: 'এখানে এরর আসবে। `number` হলো `Int`, কিন্তু আমরা সেটি `Double` ভেরিয়েবলে রাখতে চাইছি। Kotlin এমন নিজে থেকে বদলায় না। আগে `number`-কে স্পষ্টভাবে `Double`-এ বদলাতে হবে।',
    },
    {
      type: 'note',
      text: '**খেয়াল করুন:** হিসাবের ভেতরে ভিন্ন ধরনের সংখ্যা একসঙ্গে ব্যবহার করা যায়; যেমন `10 + 2.5` কাজ করে এবং ফল হয় `Double`। কিন্তু কোনো ভেরিয়েবলে বা ফাংশনে সরাসরি অন্য ধরনের মান রাখতে চাইলে স্পষ্ট রূপান্তর লাগে।',
    },
    {
      type: 'heading',
      text: 'বদলানোর উপায়',
    },
    {
      type: 'paragraph',
      text: 'প্রতিটি সংখ্যার Type-এর জন্য একটি করে বদলানোর ফাংশন আছে। মানের পরে ডট (`.`) দিয়ে সেটি লিখতে হয়।',
    },
    {
      type: 'list',
      items: [
        '`toInt()` — `Int`-এ বদলায়',
        '`toLong()` — `Long`-এ বদলায়',
        '`toDouble()` — `Double`-এ বদলায়',
        '`toFloat()` — `Float`-এ বদলায়',
        '`toString()` — লেখায় (`String`) বদলায়',
      ],
    },
    {
      type: 'heading',
      text: 'Int থেকে Double',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `fun main() {
    val number = 10
    val decimal = 2.5

    val converted = number.toDouble()
    val total = converted + decimal

    println(converted)
    println(total)
}`,
    },
    {
      type: 'paragraph',
      text: '**আউটপুট**',
    },
    {
      type: 'code',
      code: `10.0
12.5`,
    },
    {
      type: 'paragraph',
      text: 'এখানে `number.toDouble()` লিখে `10`-কে `10.0` বানানো হয়েছে। এখন দুটোই `Double`, তাই সরাসরি রাখা ও যোগ করা গেল — ফল `12.5`।',
    },
    {
      type: 'heading',
      text: 'লেখা থেকে সংখ্যা',
    },
    {
      type: 'paragraph',
      text: '`String`-এ থাকা সংখ্যাকে আবার সংখ্যায় বদলানো যায়।',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `fun main() {
    val text = "50"
    val number = text.toInt()

    println(number + 5)
}`,
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
      text: '**মনে রাখুন:** `toInt()` শুধু সঠিক সংখ্যা থাকলেই কাজ করে। `"রহিম".toInt()` লিখলে কম্পাইল এরর আসে না, কিন্তু প্রোগ্রাম চালালে `NumberFormatException` নামের এরর আসে — কারণ লেখাটি সংখ্যা নয়।',
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
      code: `fun main() {
    val price = 99.99
    val whole = price.toInt()

    println(whole)
}`,
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
      text: 'লক্ষ করুন, `99.99`-কে `100` বানানো হয়নি — বরং `.99` অংশটি বাদ পড়ে ফল হয়েছে `99`। এটি রাউন্ডিং নয়, বরং দশমিক অংশ বাদ দেওয়া।',
    },
    {
      type: 'heading',
      text: 'সংখ্যা থেকে লেখা',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `fun main() {
    val score = 100
    val text = score.toString()

    println("স্কোর: " + text)
}`,
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
      text: '`toString()` দিয়ে যেকোনো মানকে লেখায় বদলানো যায়। তবে String Template (`$`) ব্যবহার করলে এই কাজটি নিজে থেকেই হয়ে যায়, তাই অনেক সময় আলাদা করে `toString()` লাগে না।',
    },
    {
      type: 'heading',
      text: 'সাধারণ ভুল',
    },
    {
      type: 'list',
      items: [
        '**নিজে থেকে বদল হবে ভাবা:** `val x: Double = 10` লিখলে এরর আসে, কারণ `Int` নিজে থেকে `Double` হয় না। সঠিক: `val x: Double = 10.toDouble()`।',
        '**সংখ্যা নয় এমন লেখায় `toInt()`:** `"আমার".toInt()` লিখলে প্রোগ্রাম চালানোর সময় `NumberFormatException` আসে, কারণ এখানে সংখ্যা নেই।',
        '**দশমিকে রাউন্ডিং আশা করা:** `99.99.toInt()` = `99`, `100` নয়। দশমিক বাদ পড়ে, গোল করা হয় না।',
        '**বদল করা মান না ধরা:** `number.toDouble()` নতুন একটি মান দেয়, মূল `number` বদলায় না। ফলের মান কোথাও রাখতে হয়।',
      ],
    },
    {
      type: 'task',
      title: 'অনুশীলন: ধরন বদলান',
      text: 'নিজের কোড `fun main()`-এর ভেতরে লিখে চালান।\n১. `val number = 25`-কে `Double`-এ বদলে প্রিন্ট করুন।\n২. `val text = "75"`-কে `Int`-এ বদলে ৫ যোগ করে প্রিন্ট করুন।\n৩. `val price = 149.99`-কে `Int`-এ বদলে ফল দেখুন (দশমিক বাদ পড়বে)।\n৪. `val score = 250`-কে `toString()` দিয়ে লেখায় বদলে `"স্কোর: "`-এর সঙ্গে জোড়া লাগিয়ে প্রিন্ট করুন।',
      hint: '`.toDouble()`, `.toInt()`, `.toString()` — এই ফাংশনগুলো মানের পরে ডট দিয়ে লিখুন।',
    },
    {
      type: 'quiz',
      questions: [
        {
          question: '`val number = 10`-কে `Double`-এ বদলাতে কী লিখতে হবে?',
          options: ['`number.toDouble()`', '`number.double()`', '`Double(number)`', '`number == 10.0`'],
          answerIndex: 0,
          explanation: 'Kotlin-এ ধরন বদলাতে `toDouble()`, `toInt()` ইত্যাদি ফাংশন ব্যবহার করা হয়।',
        },
        {
          question: '`"50".toInt() + 5`-এর ফল কী?',
          options: ['`"505"`', '`55`', '`"55"`', 'এরর'],
          answerIndex: 1,
          explanation: '`"50"`-কে `50` সংখ্যায় বদলালে `50 + 5 = 55` হয়।',
        },
        {
          question: '`99.99.toInt()`-এর মান কত?',
          options: ['`100`', '`99`', '`99.99`', '`0`'],
          answerIndex: 1,
          explanation: '`Double` থেকে `Int`-এ বদলালে দশমিক অংশ বাদ পড়ে, তাই ফল `99` (গোল করা হয় না)।',
        },
      ],
    },
    {
      type: 'heading',
      text: 'মডিউল ২-এর সারসংক্ষেপ',
    },
    {
      type: 'list',
      items: [
        'ভেরিয়েবল হলো নামযুক্ত জায়গা, যেখানে মান রাখা হয়।',
        '`val`-এর মান একবারই রাখা যায়; `var`-এর মান বদলানো যায়।',
        'নাম শুরু হয় অক্ষর বা আন্ডারস্কোর দিয়ে; প্রচলিত রীতি `camelCase`।',
        'Kotlin-এর প্রধান Type: `Int`, `Long`, `Double`, `Float`, `Boolean`, `Char`, `String`।',
        'Type নিজে লিখে দেওয়া যায়, অথবা মান দেখে Kotlin অনুমান করতে দেয়।',
        '`+`, `-`, `*`, `/`, `%` দিয়ে হিসাব করা যায়; `Int` ভাগে দশমিক বাদ পড়ে।',
        '`$` দিয়ে String Template-এ ভেরিয়েবলের মান বসানো যায়।',
        '`toInt()`, `toDouble()`, `toString()` ইত্যাদি দিয়ে ধরন বদলানো হয়।',
      ],
    },
    {
      type: 'paragraph',
      text: 'এই মডিউলে আপনি শিখেছেন কীভাবে তথ্য রাখতে, তার ধরন বুঝতে এবং সেই তথ্য নিয়ে হিসাব ও লেখা তৈরি করতে হয়। পরের মডিউলে শিখবেন **Condition ও Loop** — অর্থাৎ শর্ত দেখে সিদ্ধান্ত নেওয়া এবং একই কাজ বারবার করার উপায়।',
    },
  ],
};

export default lesson;
