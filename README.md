# 📱 Vibe

**Vibe** is a full-stack social media application inspired by Instagram, personally developed from scratch. It combines the power of **React Native**, **Express**, **Supabase**, and **PostgreSQL** to deliver a professional-grade mobile app experience. This was a solo project built over **90 days**, from **May 1st to July 29th, 2025**, balancing full-time university commitments alongside development.

---

## 📱 APK Download

Vibe is available as an installable Android application.

📦 [**Download Vibe APK**](https://github.com/Legendary-Phoenix/Vibe/releases/download/v1.0.0/Vibe.v.1.0.0.apk)

✅ Works on Android devices and Android Emulators.  
❌ Currently not supported on iOS.

---

## 🚀 Overview

Vibe delivers a polished mobile social experience focused on core Instagram-style features such as:

- 📸 A **post feed** with rich media and seamless infinite scrolling.
- 🎞️ A **Reels-style video page** with lazy loading and pagination.
- 👤 A **profile page** displaying the user's posts and reels.
- 🔐 **Authentication** via Supabase with full session management and token refresh.
- 📦 **Installable APK** for Android devices (download link below).

This project reflects production-grade practices in terms of **UI**, **performance**, **architecture**, and **scalability**.

---

## 📂 Tech Stack

| Layer             | Technology Used                                         |
| ----------------- | ------------------------------------------------------- |
| Frontend (Mobile) | React Native, Zustand (state management), SecureStore   |
| Backend API       | Node.js, Express.js                                     |
| Backend Hosting   | Railway (Express server hosting)                        |
| Authentication    | Supabase Auth                                           |
| Database          | Supabase (PostgreSQL) with RPC (Remote Procedure Calls) |
| Testing           | Postman (API testing), Android Emulator                 |

---

## 🛠️ Key Features & Architecture

### 🧠 Intelligent Architecture

- **RESTful API** built using Express.js.
- API server hosted separately at: [Vibe-Express-App](https://github.com/Legendary-Phoenix/Vibe-Express-App)
- React Native app only interacts with the backend through the Express APIs (except for Supabase Auth).

### 💡 Core Functionalities

- Infinite **pagination** and **debounced** data fetching for feed and reels.
- Fully optimized **Post** and **PostFeed** components with deep memoization using `React.memo`, `useCallback`, and `useMemo`.
- **Lazy loading** for media-heavy posts to improve performance.
- Modular, reusable components suitable across multiple screens (feed, profile, reels).
- Clean global state management using **Zustand**.

### 🔐 Authentication & Session Handling

- Utilized **Supabase Auth** for secure authentication.
- Created **AuthProvider** to:
  - Listen to auth state changes (login, logout, token refresh).
  - Manage secure tokens via `SecureStore`.
  - Automatically route users to the correct screens.

### 🧩 Backend & Database

- Developed PostgreSQL **RPC functions** to:
  - Efficiently handle complex queries involving multiple joins.
  - Return pre-processed JSON results optimized for performance.
- Created detailed data structure in Supabase before UI/API development.
- Seeded database using high-quality mock data with the help of libraries like `faker`—scripts available in the [backend repo](https://github.com/Legendary-Phoenix/Vibe-Express-App).

---

## 📈 Timeline

- 🗓️ **Start Date:** May 1st, 2025
- 🗓️ **Planned Deadline:** June 10th, 2025
- 🗓️ **Actual Completion:** July 29th, 2025

Despite academic challenges during a demanding semester as a **full-time second-year Bachelor's student**, the project was completed with persistence and passion for learning.

---

## 🛤️ My Development Journey

All in all, developing Vibe was an incredibly insightful and transformative journey.

I began learning React Native from scratch in April 2025, building small test apps before embarking on this ambitious full-stack project. At the start, my understanding of React Native was decent, but not deep or refined. This project challenged me at every level, forcing me to go beyond the surface and develop real-world skills. Along the way, I’ve gained invaluable insights and skills — especially when implementing new features or troubleshooting persistent errors. These experiences taught me lessons that go far beyond theoretical knowledge that can be gained from courses. They helped me build practical expertise and develop the kind of muscle memory that only comes from hands-on problem solving.

One such example would be the optimization of components. Initially, I built UI components using mock data—testing on only one component such as one `Post` component. But when I integrated live data and plugged in the component into `FlatList`, I encountered performance issues like lag and even crashes when many posts are rendered, even with pagination. After much research, I discovered the power of **memoization** through `React.memo`, `useCallback`, and `useMemo`. I realised the importance of optimization especially with complex media-intensive components like posts. This changed the way I wrote and structured components entirely.

From that point forward, optimization became a priority. I implemented **lazy loading**, optimized FlatList performance, and made the architecture modular and scalable. These weren’t lessons I could learn in a course—they were the kind of development instincts that only come from trial, error, and pushing through frustration.

I also gained a strong appreciation for backend efficiency. Instead of placing complex query logic in Express, I designed **PostgreSQL RPC functions** in Supabase to handle multi-table joins and return data in clean JSON format. This not only improved performance but simplified the server logic.

Looking back, Vibe wasn’t just a project—it was a key **milestone**. It taught me to think like a product developer, debug like an engineer, and solve problems creatively. Most importantly, it gave me the confidence and skills to pursue even more complex builds in the future.

---

## 📚 More Info

- 🔗 **Backend Repository:** [Vibe-Express-App](https://github.com/Legendary-Phoenix/Vibe-Express-App)
- 📂 Includes: API source code, mock data scripts, RPC definitions, and more about data handling.

---

## 📌 Note

This is a personal project created solely to demonstrate full-stack development skills, and is not intended for commercial use. It represents a key component of my personal portfolio.

---

## 🧑‍💻 Developer

**Developed with ❤️ by:** Legendary Phoenix
