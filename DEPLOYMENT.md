# Vercel Deployment Guide

Your application build is **passing** and ready for deployment. Follow these steps to deploy to Vercel.

## 1. Prerequisites
- A [Vercel Account](https://vercel.com)
- A [GitHub Account](https://github.com) (recommended)
- Your project pushed to a GitHub repository

## 2. Environment Variables
You **MUST** configure the following environment variables in Vercel for the app to work. Copy these values from your local `.env.local` file.

| Variable Name | Description |
| :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase Project Anon/Public Key |

> [!IMPORTANT]
> Without these variables, the application will fail to connect to the backend.

## 3. Deploy via Vercel Dashboard (Recommended)

1.  Go to **[vercel.com/new](https://vercel.com/new)**.
2.  **Import** your Git repository.
3.  In the **Configure Project** step:
    *   **Framework Preset**: Next.js (should detect automatically)
    *   **Root Directory**: `./` (default)
    *   **Environment Variables**: expand this section and add the keys listed above.
4.  Click **Deploy**.

## 4. Alternate: Deploy via CLI
If you assume you have the Vercel CLI installed and authenticated:

```bash
npx vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Scope? **[Select your account]**
- Link to existing project? **N**
- Project Name? **[Enter name]**
- Directory? **./**
- Modify settings? **N**
