# Suitmedia Test Project

This project is a Next.js application built as a test for Suitmedia. It demonstrates various features including dynamic navigation, a scroll-aware header, API integration with custom routing, and a dynamic ideas listing page with sorting and pagination.

## Features

- **Responsive Header**: A fixed header that hides on scroll down and reappears on scroll up, with a slightly transparent background.
- **Dynamic Navigation**: Navigation items (`Work`, `About`, `Services`, `Ideas`, `Careers`, `Contact`) are dynamically rendered.
- **API Integration**: Fetches data from `https://suitmedia-backend.suitdev.com/api/ideas` using Next.js API Routes as a proxy.
- **Ideas Page**: Displays a list of ideas with:
  - Sorting by 'Latest' or 'Oldest'.
  - Adjustable items per page (10, 20, 50).
  - Pagination controls.
  - State persistence through URL query parameters (page, perPage, sort).
  - Static image placeholder for idea cards.
  - Title limited to 3 lines with ellipsis.
  - Creation date displayed on each card.
- **Component-Based Structure**: The Ideas page is refactored into modular client components (`SortControls`, `IdeaCard`, `Pagination`) for better organization and reusability.
- **Root Redirect**: The main `/` route redirects to the `/ideas` page.

## Setup

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd suitmedia-test
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

## Running the Project

To run the development server:

```bash
npm run dev
# or
yarn dev
```

This will start the development server on `http://localhost:3000` (or another port if 3000 is in use).

Open `http://localhost:3000` in your browser to view the application. It will automatically redirect to the `/ideas` page.

## Project Structure

```
.|
├── app/
│   ├── api/             # Next.js API Routes (e.g., /api/ideas)
│   ├── ideas/           # Ideas page and related components
│   ├── ... (other routes)
│   └── layout.tsx       # Root layout
│   └── page.tsx         # Root redirect page
├── components/          # Reusable UI components
│   ├── ideas/           # Components specific to the Ideas page
│   │   ├── SlantedBanner.tsx
│   │   ├── SortControls.tsx
│   │   ├── IdeaCard.tsx
│   │   └── Pagination.tsx
│   ├── Header.tsx       # Main application header
│   └── ...
├── public/              # Static assets (images, etc.)
│   └── social-media.jpg
│   └── suitmedia.png
├── next.config.js       # Next.js configuration (e.g., image domains, rewrites)
├── package.json         # Project dependencies and scripts
├── .env                 # Environment variables
├── ... (other config files)
└── README.md
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
