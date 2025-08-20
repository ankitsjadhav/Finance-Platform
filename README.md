# Finance

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-blue?logo=tailwind-css)

<img src="./public/dashboard1.png" alt="Banner" width="800"/>

This is a **Finance Platform** project developed using [Next.js 14](https://nextjs.org/) and React 18.  
A modern finance dashboard for managing personal finances, tracking transactions, and visualizing data through interactive charts.

---

## Main Features

- Built with Next.js 14 (App Router)
- Data validation with Zod
- Authentication UI (Clerk, frontend only)
- Interactive overview with charts
- Changeable chart types (bar, line, pie, etc.)
- Account and date filters
- Custom React forms
- CSV file import (frontend mock)
- Styled with Tailwind CSS and Shadcn UI
- All data is managed in local state
- Sample/mock data for transactions, categories, and charts
- Ready for frontend demos and prototyping

---

## Technologies Used

- ![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js) Next.js 14
- ![React](https://img.shields.io/badge/React-18-blue?logo=react) React 18
- ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.3-blue?logo=tailwind-css) Tailwind CSS
- Shadcn UI
- Zod (validation)
- Clerk (authentication UI, frontend only)

---

## How to Run

First, install dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## Demo

[Live Demo](https://finance-platform-mauve.vercel.app/)

---

### Screenshots

<img src="./public/dashboard.png" alt="Dashboard Screenshot" width="600"/>

<img src="./public/transactions.png" alt="Transactions" width="600"/>

<img src="./public/categories.png" alt="Categories" width="600"/>

---

## Details

- All application data is managed entirely in local React state, ensuring a fast and responsive user experience.
- No backend, database, or external API dependencies—everything runs seamlessly in the browser.
- Interactive charts and overviews are powered by dynamic sample/mock data for clear financial insights and engaging demos.
- Users can intuitively add, edit, and delete transactions, accounts, and categories directly in the UI (with changes reflected instantly; data resets on reload for demo purposes).
