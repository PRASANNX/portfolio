 # The Engine — SaaS Boilerplate

A production-ready SaaS boilerplate for solo founders. Clone this for any vertical (Legal, Health, Real Estate, etc.) and launch in under 48 hours.

## 🚀 Quick Start

```bash
# 1. Clone the template
git clone https://github.com/yourusername/the-engine.git your-new-saas
cd your-new-saas

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase and Razorpay credentials

# 4. Run database migrations in Supabase
# Copy the SQL from supabase/migrations/001_initial_schema.sql
# Run it in your Supabase SQL Editor

# 5. Start development
npm run dev
```

## 📁 Project Structure

```
the-engine/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Auth pages (login, signup)
│   │   ├── (dashboard)/       # Dashboard pages
│   │   ├── api/               # API routes
│   │   │   └── razorpay/      # Payment integration
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── ui/                # Shadcn UI components
│   │   ├── auth/              # Auth components
│   │   ├── dashboard/          # Dashboard shell, sidebar, header
│   │   └── shared/            # Logo, SEO
│   ├── lib/
│   │   ├── seo/               # SEO configuration
│   │   ├── supabase/          # Supabase clients
│   │   ├── constants.ts       # Plans, roles
│   │   ├── types.ts           # TypeScript types
│   │   └── utils.ts           # Utility functions
│   └── hooks/                 # Custom React hooks
├── supabase/
│   └── migrations/            # Database schema
├── THE_ENGINE.md              # Full documentation
└── package.json
```

## ✨ Features

### 🔐 Universal Auth
- Google OAuth login
- Magic link email authentication
- Session management with Supabase
- Protected routes via middleware

### 🗄️ Modular Database Schema
- **profiles**: Extends auth.users
- **organizations**: Multi-tenant support
- **organization_members**: User-org relationships with roles
- **subscriptions**: Razorpay subscription tracking

### 💳 Razorpay Integration
- Create checkout sessions via API
- Webhook handler for payment events
- Automatic subscription status updates
- Invoice.paid event handling

### 🎨 Dashboard Layout
- Responsive sidebar navigation
- Header with user menu
- Industry-agnostic design
- Ready for any vertical

### 🔍 SEO Helper
- Single config file for all meta tags
- Dynamic title generation
- Open Graph & Twitter cards
- Easy to update across entire app

## 🛠️ Configuration

### Update SEO (src/lib/seo/config.ts)
```typescript
export const SEO_CONFIG = {
  appName: "Your SaaS Name",
  defaultTitle: "Your SaaS — Tagline",
  description: "Your product description",
  keywords: ["saas", "your-industry"],
  // ...
}
```

### Configure Plans (src/lib/constants.ts)
```typescript
export const PLANS = {
  starter: {
    price: 29,
    priceId: process.env.RAZORPAY_STARTER_PLAN_ID,
    // ...
  },
  // ...
}
```

### Setup Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

RAZORPAY_STARTER_PLAN_ID=plan_xxx
RAZORPAY_PRO_PLAN_ID=plan_xxx
RAZORPAY_ENTERPRISE_PLAN_ID=plan_xxx
```

## 📝 Database Schema

The schema includes:
- Auto profile creation on user signup
- Organization creation with slug
- Role-based access (owner, admin, member)
- Subscription tracking with Razorpay sync

Run `supabase/migrations/001_initial_schema.sql` in your Supabase SQL Editor.

## 🚢 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Supabase
1. Create project at supabase.com
2. Run migrations in SQL Editor
3. Copy credentials to .env

### Razorpay
1. Create account at razorpay.com
2. Get API keys
3. Create plans for each subscription tier
4. Set up webhook URL: `https://yourapp.com/api/razorpay/webhook`

## 🔧 Customization

### Adding Industry-Specific Pages
```
src/app/(dashboard)/[industry]/
├── clients/page.tsx
├── projects/page.tsx
└── reports/page.tsx
```

### Adding New UI Components
```bash
npx shadcn-ui@latest add [component-name]
```

## 📜 License

MIT License - Use it for any project, commercial or personal.

---

Built with ❤️ for solo founders who want to ship fast.