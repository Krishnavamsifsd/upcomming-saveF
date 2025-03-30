<a href="https://saveplate-demo.vercel.app/">
  <img alt="SavePlate India - Affordable surplus food deals" src="https://saveplate-demo.vercel.app/opengraph-image.png">
  <h1 align="center">SavePlate India</h1>
</a>

<p align="center">
  Affordable surplus food deals for everyone. Save food, save money, and support local vendors.
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#demo"><strong>Demo</strong></a> ·
  <a href="#deploy-to-vercel"><strong>Deploy to Vercel</strong></a> ·
  <a href="#clone-and-run-locally"><strong>Clone and run locally</strong></a> ·
  <a href="#feedback-and-issues"><strong>Feedback and issues</strong></a>
</p>
<br/>

## Features

- **Affordable Deals**: Get surplus food from local vendors at 50-70% off.
- **Geo-Search**: Find deals near you with an interactive map.
- **Pickup-Only**: No delivery costs—just pick up your order at the vendor's location.
- **Gamification**: Earn points and unlock rewards for rescuing food.
- **Vendor Dashboard**: Vendors can post deals, track sales, and manage their surplus inventory.
- **VIP Mode**: Early access to deals and ad-free experience for premium users.

## Demo

Check out the live demo at [saveplate-demo.vercel.app](https://saveplate-demo.vercel.app/).

## Deploy to Vercel

Deploying SavePlate to Vercel is simple and includes automatic integration with Supabase.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-org%2Fsaveplate&project-name=saveplate&repository-name=saveplate&demo-title=SavePlate+India&demo-description=Affordable+surplus+food+deals+for+everyone.+Save+food%2C+save+money%2C+and+support+local+vendors.&demo-url=https%3A%2F%2Fsaveplate-demo.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fyour-org%2Fsaveplate&demo-image=https%3A%2F%2Fsaveplate-demo.vercel.app%2Fopengraph-image.png)

The above will also clone the SavePlate repository to your GitHub, allowing you to develop locally.

If you wish to develop locally without deploying to Vercel, [follow the steps below](#clone-and-run-locally).

## Clone and run locally

1. Create a Supabase project via the [Supabase dashboard](https://database.new).

2. Clone the SavePlate repository:

   ```bash
   git clone https://github.com/your-org/saveplate.git
   ```

3. Navigate to the project directory:

   ```bash
   cd saveplate
   ```

4. Rename `.env.example` to `.env.local` and update the following:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```

   You can find these values in your Supabase project's API settings.

5. Install dependencies:

   ```bash
   npm install
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

   SavePlate should now be running on [localhost:3000](http://localhost:3000/).

7. Customize the UI by modifying the pre-built components or adding new features.

> For advanced local development, check out [Supabase's local development docs](https://supabase.com/docs/guides/getting-started/local-development).

## Feedback and issues

We welcome feedback and issues! Please file them on our [GitHub repository](https://github.com/your-org/saveplate/issues).

## More Examples

- [Next.js Subscription Payments Starter](https://github.com/vercel/nextjs-subscription-payments)
- [Cookie-based Auth with Next.js](https://github.com/supabase/supabase/tree/master/examples/auth/nextjs)
- [Real-time Chat App with Supabase](https://github.com/supabase/supabase/tree/master/examples/chat)
