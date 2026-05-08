# Setup Guide

> This project was built following [this tutorial](https://youtu.be/lh9XVGv6BHs?si=EpKjwsvZ7dDOQ26o) as a starting point, then adapted for the BC Liquor Store.

## Prerequisites

- Node.js 18+
- MongoDB Atlas account
- BrightData account (Web Unlocker)
- Microsoft Outlook / Hotmail account for sending emails

---

## 1. Clone & install

```bash
git clone <repo-url>
cd pricewatcher-bcliquor
npm install
```

Alternatively, if you're scaffolding from scratch:

```bash
npx create-next-app@latest ./
# Would you like to use TypeScript? Yes
# Would you like to use ESLint? Yes
# Would you like to use Tailwind CSS? Yes
# Would you like to use `src/` directory? No
# Would you like to use App Router? Yes
# Would you like to customize the default import alias (@/*)? No
```

---

## 2. Environment variables

Create a `.env.local` file in the project root:

```env
BRIGHT_DATA_USERNAME=your_brightdata_username
BRIGHT_DATA_PASSWORD=your_brightdata_password
MONGODB_URI=your_mongodb_atlas_connection_string
EMAIL_PASSWORD=your_outlook_app_password
```

### Where to get each value

| Variable | Source |
|---|---|
| `BRIGHT_DATA_USERNAME` / `BRIGHT_DATA_PASSWORD` | [BrightData Web Unlocker](https://brightdata.com/products/web-unlocker) — create a zone and copy credentials |
| `MONGODB_URI` | [MongoDB Atlas](https://account.mongodb.com/account/login) — create a free cluster, get the connection string |
| `EMAIL_PASSWORD` | Outlook account → Security → App passwords. The sender address is `dev_hub@outlook.com` (update in `lib/nodemailer/index.ts` if using your own) |

---

## 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 4. Set up the cron job

The `/api/cron` endpoint re-scrapes all tracked products and sends email alerts. You need to call it on a schedule.

### Option A — Vercel Cron (if deploying to Vercel)

Add a `vercel.json` file to the project root:

```json
{
  "crons": [
    {
      "path": "/api/cron",
      "schedule": "0 * * * *"
    }
  ]
}
```

See [Vercel Cron Jobs docs](https://vercel.com/guides/how-to-setup-cron-jobs-on-vercel) for details.

### Option B — cron-job.org (free, works with any host)

1. Sign in at [console.cron-job.org](https://console.cron-job.org/login)
2. Create a new job pointing to `https://<your-domain>/api/cron`
3. Set the schedule (e.g. every hour)
4. Click **TEST RUN → START TEST RUN** to verify it works

---

## 5. Deploy

The project is Vercel-native:

```bash
vercel --prod
```

Make sure to add all four environment variables in the Vercel project settings under **Settings → Environment Variables**.

---

## External service links

| Service | Link |
|---|---|
| BrightData Web Unlocker | https://brightdata.com/products/web-unlocker |
| MongoDB Atlas | https://account.mongodb.com/account/login |
| Nodemailer docs | https://www.nodemailer.com/ |
| Microsoft Outlook | https://www.microsoft.com/en-ca/microsoft-365/outlook/email-and-calendar-software-microsoft-outlook |
| Vercel Cron Jobs | https://vercel.com/guides/how-to-setup-cron-jobs-on-vercel |
| cron-job.org | https://console.cron-job.org/login |
