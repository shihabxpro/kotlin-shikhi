import type { Lesson } from '../../../types';

const lesson: Lesson = {
  title: 'String Template',
  blocks: [
    {
      type: 'paragraph',
      text: 'আগের লেসনে আমরা দেখেছি `+` দিয়ে লেখা আর মান জোড়া লাগানো যায়। কিন্তু অনেক মান একসঙ্গে জোড়া লাগাতে গেলে কোড জটিল ও পড়তে কষ্টকর হয়ে যায়। Kotlin-এ এর সহজ একটি উপায় আছে — **String Template**।',
    },
    {
      type: 'heading',
      text: 'পরিচিতি',
    },
    {
      type: 'paragraph',
      text: 'String Template-এ আমরা লেখার ভেতরেই ডলার চিহ্ন (`$`) বসিয়ে ভেরিয়েবলের মান সরাসরি বসিয়ে দিতে পারি। জোড়া লাগানোর জন্য বারবার `+` আর `" "` লিখতে হয় না।',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `fun main() {
    val name = "রহিম"
    val age = 20

    println("আমার নাম $name")
    println("আমার বয়স $age বছর")
}`,
    },
    {
      type: 'paragraph',
      text: '**আউটপুট**',
    },
    {
      type: 'code',
      code: `আমার নাম রহিম
আমার বয়স 20 বছর`,
    },
    {
      type: 'paragraph',
      text: 'এখানে `$name` লেখার জায়গায় Kotlin `name` ভেরিয়েবলের মান `রহিম` বসিয়ে দিয়েছে। একইভাবে `$age`-এর জায়গায় `20` বসেছে। খুব পরিষ্কার আর সহজ!',
    },
    {
      type: 'heading',
      text: 'তুলনা: `+` আর `$`',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `fun main() {
    val name = "রহিম"
    val age = 20

    // + দিয়ে
    println("আমার নাম " + name + ", বয়স " + age + " বছর")

    // $ দিয়ে (String Template)
    println("আমার নাম $name, বয়স $age বছর")
}`,
    },
    {
      type: 'paragraph',
      text: 'দুটোরই ফলাফল একই। কিন্তু দ্বিতীয়টি পড়তে অনেক সহজ, কারণ বাক্যের ভেতরেই মানগুলো বসানো আছে। তাই Kotlin-এ String Template বেশি ব্যবহার করা হয়।',
    },
    {
      type: 'heading',
      text: 'কোঁকড়া বন্ধনী ({ })',
    },
    {
      type: 'paragraph',
      text: 'শুধু ভেরিয়েবলের মান বসাতে হলে `$name` লিখলেই চলে। কিন্তু ভেরিয়েবল নিয়ে কোনো হিসাব করতে হলে বা ভেরিয়েবলের নামের পরে সরাসরি অক্ষর লিখতে হলে `$`-এর পরে **কোঁকড়া বন্ধনী** (`{ }`) ব্যবহার করতে হয়।',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `fun main() {
    val a = 10
    val b = 3

    println("যোগফল = \${a + b}")
    println("ভাগফল = \${a / b}")
}`,
    },
    {
      type: 'paragraph',
      text: '**আউটপুট**',
    },
    {
      type: 'code',
      code: `যোগফল = 13
ভাগফল = 3`,
    },
    {
      type: 'paragraph',
      text: 'এখানে `${a + b}` লিখে বন্ধনীর ভেতরে হিসাব করা হয়েছে। বন্ধনী না দিলে Kotlin `a`-এর পরের অংশ বুঝতে পারত না।',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `fun main() {
    val price = 100

    println("মোট: \${price}টাকা")   // স্পষ্ট
    println("মোট: $price টাকা")     // ফাঁকা জায়গা দিয়ে আলাদা
}`,
    },
    {
      type: 'paragraph',
      text: '`$priceটাকা` এভাবে ফাঁকা জায়গা ছাড়া লিখলে Kotlin পুরো `priceটাকা`-কে একটি নাম ভাবে, যা পাওয়া যায় না — তাই এরর আসে। এমন জায়গায় `{ }` দিয়ে স্পষ্ট করুন, অথবা নামের পরে একটি ফাঁকা জায়গা দিন।',
    },
    {
      type: 'heading',
      text: 'যেকোনো ধরনের মান বসানো যায়',
    },
    {
      type: 'code',
      language: 'kotlin',
      code: `fun main() {
    val name = "রহিম"
    val price = 99.5
    val isPaid = true

    println("$name-এর বিল: $price, পরিশোধিত: $isPaid")
}`,
    },
    {
      type: 'paragraph',
      text: '**আউটপুট**',
    },
    {
      type: 'code',
      code: 'রহিম-এর বিল: 99.5, পরিশোধিত: true',
    },
    {
      type: 'paragraph',
      text: '`String`, `Double`, `Boolean` — যেকোনো ধরনের ভেরিয়েবলই String Template-এ বসানো যায়। Kotlin নিজেই মানটিকে লেখায় পরিণত করে।',
    },
    {
      type: 'heading',
      text: 'সাধারণ ভুল',
    },
    {
      type: 'list',
      items: [
        '**`$`-এর পরে শব্দ জোড়া লাগিয়ে ফেলা:** `$pricetaka` লিখলে Kotlin ভাবে ভেরিয়েবলের নাম `pricetaka`। সঠিক: `$price টাকা` বা `${price}টাকা`।',
        '**হিসাবে বন্ধনী ভুলে যাওয়া:** `"$a + $b"` দিলে যোগফল নয়, বরং `10 + 3` দেখাবে। যোগফল চাইলে `${a + b}` লিখুন।',
        '**একক কোটেশনে Template:** `\'$name\'` ভুল, কারণ একক কোটেশন `Char`-এর জন্য। String Template দ্বৈত কোটেশনে (`" "`) কাজ করে।',
        '**আসল `$` দেখাতে না পারা:** লেখায় ডলার চিহ্নটাই দেখাতে হলে `\\$` লিখুন, যেমন `"দাম \\$5"`।',
      ],
    },
    {
      type: 'task',
      title: 'অনুশীলন: পরিচয় কার্ড',
      text: 'নিজের কোড `fun main()`-এর ভেতরে লিখে চালান।\n১. `name`, `age`, `city` — তিনটি ভেরিয়েবল বানান।\n২. String Template (`$`) দিয়ে একটি বাক্যে তিনটি মান বসিয়ে প্রিন্ট করুন।\n৩. `val a = 15`, `val b = 4` ধরে `${a + b}`, `${a - b}`, `${a * b}` — তিনটি হিসাব প্রিন্ট করুন।\n৪. একই বাক্য `+` দিয়েও লিখে দেখুন, তারপর বুঝুন `$` কেন সহজ।',
      hint: '`println("আমি $name, বয়স $age, শহর $city")` এভাবে শুরু করুন।',
    },
    {
      type: 'quiz',
      questions: [
        {
          question: '`val name = "রহিম"` ধরে `println("নাম $name")` — আউটপুট কী?',
          options: ['`নাম $name`', '`নাম রহিম`', '`নাম name`', 'এরর'],
          answerIndex: 1,
          explanation: '`$name`-এর জায়গায় Kotlin `name` ভেরিয়েবলের মান `রহিম` বসিয়ে দেয়।',
        },
        {
          question: '`val a = 2`, `val b = 3` ধরে যোগফল বসাতে কোনটি সঠিক?',
          options: ['`"$a + b"`', '`"${a + b}"`', '`"a + b"`', '`"$a + $b"` সংখ্যাটি যোগ হবে'],
          answerIndex: 1,
          explanation: 'হিসাব করতে হলে `$`-এর পরে কোঁকড়া বন্ধনীর ভেতরে লিখতে হয়: `${a + b}`, যা `5` দেবে।',
        },
        {
          question: 'String Template-এর জন্য কোন কোটেশন ব্যবহার হয়?',
          options: ['একক `\' \'`', 'দ্বৈত `" "`', 'যেকোনোটি', 'কোটেশন লাগে না'],
          answerIndex: 1,
          explanation: 'String Template দ্বৈত কোটেশনে লেখা String-এর ভেতরে কাজ করে।',
        },
      ],
    },
  ],
};

export default lesson;
