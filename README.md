<div align="center">

# Kotlin শিখি

### বাংলায় শুরু থেকে ধাপে ধাপে Kotlin শেখার ইন্টারঅ্যাকটিভ প্ল্যাটফর্ম

একটি করে ধারণা শিখুন · উদাহরণ বুঝুন · নিজের হাতে কোড লিখুন

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white&labelColor=1C1A18)
![TypeScript](https://img.shields.io/badge/TypeScript-7-3178C6?style=for-the-badge&logo=typescript&logoColor=white&labelColor=1C1A18)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white&labelColor=1C1A18)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white&labelColor=1C1A18)
![License](https://img.shields.io/badge/License-Apache--2.0-A81C7D?style=for-the-badge&logo=apache&logoColor=white&labelColor=1C1A18)

</div>

---

## এই প্রজেক্ট কী

**Kotlin শিখি** হলো একটি সম্পূর্ণ বাংলা ভাষার ইন্টারঅ্যাকটিভ লার্নিং অ্যাপ, যেখানে Kotlin প্রোগ্রামিং একদম শুরু থেকে ধাপে ধাপে শেখানো হয়। প্রতিটি লেসন ছোট ছোট ধারণায় ভাগ করা — পড়ুন, কোড উদাহরণ বুঝুন, তারপর কুইজ ও প্র্যাকটিস টাস্ক দিয়ে নিজের বোঝাপড়া যাচাই করুন। কোনো পূর্ব অভিজ্ঞতার দরকার নেই।

---

## বৈশিষ্ট্যসমূহ

| | বৈশিষ্ট্য | বিবরণ |
|---|-----------|--------|
| 📚 | **ধাপে ধাপে রোডম্যাপ** | প্রাথমিক পরিচিতি থেকে Coroutine পর্যন্ত ক্রমানুসারে সাজানো মডিউল |
| 💻 | **কোড ও আউটপুট** | প্রতিটি ধারণার সাথে পরিষ্কার কোড স্নিপেট এবং প্রত্যাশিত আউটপুট |
| ✅ | **কুইজ ও সেলফ-চেক** | প্রতিটি লেসনের শেষে ইন্টারঅ্যাকটিভ কুইজ ও প্র্যাকটিস টাস্ক |
| 📈 | **অগ্রগতি ড্যাশবোর্ড** | পড়ার অগ্রগতি স্বয়ংক্রিয়ভাবে সংরক্ষণ ও হোম পেজে প্রদর্শন |
| 🎨 | **পড়ার উপযোগী ডিজাইন** | চোখের চাপ কমায় এমন বাংলা টাইপোগ্রাফি ও মিনিমাল UI |
| 📱 | **রেসপন্সিভ** | মোবাইল, ট্যাব ও ডেস্কটপে সমান অভিজ্ঞতা |

---

## লার্নিং রোডম্যাপ

| # | মডিউল | বিষয় |
|---|--------|-------|
| ০১ | **Kotlin পরিচিতি** | Kotlin কী, প্রথম প্রোগ্রাম, `main()`, `print()` / `println()`, Comments |
| ০২ | **ভেরিয়েবল ও Data Type** | `val` ও `var`, Data Type, Operator, Boolean, String Template, Type Conversion |
| ০৩ | **Condition ও Loop** | সিদ্ধান্ত নেওয়া ও পুনরাবৃত্তি |
| ০৪ | **Function** | কোড ভেঙে ছোট অংশে সাজানো |
| ০৫ | **Class ও Object** | বাস্তব জিনিসকে কোডে প্রকাশ |
| ০৬ | **Collection ও Lambda** | ডেটার তালিকা নিয়ে কাজ |
| ০৭ | **Null Safety** | Kotlin-এর ক্র্যাশ এড়ানোর কৌশল |
| ০৮ | **Coroutine Basics** | একসাথে একাধিক কাজ সামলানো |

> মডিউল ০১–০২ সম্পূর্ণ লাইভ, বাকিগুলো ক্রমান্বয়ে যুক্ত হচ্ছে।

---

## টেক স্ট্যাক

- **Framework:** React 19
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **Animation:** Motion
- **Icons:** Lucide React

---

## প্রজেক্টের গঠন

```text
src/
├── components/     # পুনঃব্যবহারযোগ্য UI কম্পোনেন্ট (Topbar, LessonBlocks, QuizFlow...)
├── content/
│   └── lessons/    # মডিউল অনুযায়ী লেসন কন্টেন্ট (module-01, module-02...)
├── data/
│   └── modules.ts  # মডিউল ও রোডম্যাপ ডেটা
├── hooks/          # কাস্টম React hooks (useReadProgress...)
├── pages/          # Home, ModulePage, LessonPage, About
├── utils/          # অগ্রগতি ট্র্যাকিং হেল্পার
├── types.ts        # গ্লোবাল টাইপ ডেফিনিশন
├── App.tsx         # মূল অ্যাপ ও রাউটিং
└── main.tsx        # এন্ট্রি পয়েন্ট
```

---

<div align="center">

## যোগাযোগ

সমস্যা, পরামর্শ বা প্রশ্ন থাকলে সরাসরি বার্তা পাঠান।

[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/muhammadshihabjht)
[![Telegram](https://img.shields.io/badge/Telegram-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/shihabxai)

---

**Kotlin শিখি** — বাংলায় কোড শেখা হোক আরও সহজ।

Licensed under the **Apache-2.0** License.

</div>
