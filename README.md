# Linda Menu - Digital Menu & Sales System

A modern, elegant, and high-performance digital menu designed to streamline sales via WhatsApp. Built with **Next.js 15**, **Supabase**, and **Framer Motion**, it offers a seamless experience for both customers and business owners.

![Project Preview](assets/next14.png)

## 🚀 Features

- **Dynamic Menu:** Fetch products, categories, and variations directly from Supabase.
- **Smart Shopping Cart:** Persistent cart management using **Zustand**, allowing multiple items and quantity adjustments.
- **Product Variations:** Support for items with multiple options (e.g., sizes, brands) with independent pricing and stock control.
- **Real-time Filtering & Search:** Browse by categories or search for specific products/variations with instant feedback.
- **Elegant Animations:** Smooth scroll reveals and transitions powered by **Framer Motion** for a native app feel.
- **WhatsApp Integration:** Generates a structured order summary and redirects the customer directly to WhatsApp.
- **Responsive Design:** Fully optimized for mobile devices with a "mobile-first" approach.
- **Performance Optimized:** Next.js Image optimization and SSR for fast loading times.

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Database:** [Supabase](https://supabase.com/) (PostgreSQL)
- **State Management:** [Zustand](https://docs.pmnd.rs/zustand/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)

## ⚙️ Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file and your Netlify/Vercel dashboard:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_WHATSAPP_NUMBER=your_whatsapp_number_with_country_code
```

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/linda-menu.git
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
4.  **Open [http://localhost:3000](http://localhost:3000)** in your browser to see the result.

## 📦 Deployment on Netlify

1.  Push your code to GitHub.
2.  Connect your repository to Netlify.
3.  Add the **Environment Variables** in the Netlify dashboard.
4.  Use `npm run build` as the build command and `.next` (or `out` if static) as the publish directory.

---

Developed with ❤️ to provide the best ordering experience.
# Linda-Menu
# Linda-Menu
