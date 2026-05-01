# Google Analytics setup for MC Tickets

Mark, this is a 5-minute job. The end result: we get to see how many people land on the site, where they come from, and which sections they engage with. Costs nothing. Data is yours.

## Step 1 — Sign in to Google Analytics

1. Go to **[analytics.google.com](https://analytics.google.com)**
2. Sign in with the Google account you want this data attached to. The cleanest option is `sales@mctickets.com.au` if it's a Google Workspace account, otherwise your own Gmail is fine. You can share access with others later.
3. Click **Start measuring** (or **Admin → Create → Account** if you've used Analytics before).

## Step 2 — Create the Account

- **Account name**: `MC Tickets`
- **Data sharing settings**: leave the defaults ticked (recommended).
- Click **Next**.

## Step 3 — Create the Property

- **Property name**: `MC Tickets`
- **Reporting time zone**: `(GMT+10:00) Sydney`
- **Currency**: `Australian Dollar (AUD $)`
- Click **Next**.

## Step 4 — Business details

- **Industry category**: `Other Business and Industrial Markets`
- **Business size**: pick what fits (less than 10 / Small)
- Click **Next**.

## Step 5 — Business objectives

Tick: **Generate leads**, **Examine user behaviour**.
Click **Create**, then accept the Terms of Service.

## Step 6 — Set up data collection

When prompted "Choose a platform", pick **Web**.

- **Website URL**: `https://mctickets.com.au`
- **Stream name**: `MC Tickets — Website`
- Leave **Enhanced measurement** ON (the default).

Click **Create stream**.

## Step 7 — Send Justin the Measurement ID

On the next screen, you'll see a panel that shows your stream details. Look for a code that starts with **`G-`** followed by 10 characters, like:

```
G-ABC123DEF4
```

This is the **Measurement ID**. Copy it.

**Send it to Justin** by text or email. That's all we need from you. We'll wire it into the website and you'll start seeing data within 24 hours.

You can ignore everything else on that screen — the JavaScript snippet, the install instructions, all of it. We've already pre-built that into the site, we just need the ID.

## What happens next

Justin pastes the ID into the site config and redeploys. You'll be able to log in to [analytics.google.com](https://analytics.google.com) any time and see:

- How many visitors per day, week, month
- Which countries and cities they're coming from
- Mobile vs desktop
- How long they spend on the page
- Where they came from (Google search, direct, social, referrals)
- Which sections of the page they engage with most

## Want others to have access?

In Analytics, **Admin → Account access management → +** → enter their email → set role (Viewer for read-only, Editor for changes, Administrator for full control).

Recommended roles: anyone in the business gets **Viewer**, Justin gets **Editor**, you stay **Administrator**.

That's it. Send through the `G-XXXXXXXXXX` ID and we'll do the rest.
