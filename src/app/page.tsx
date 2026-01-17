import { redirect } from 'next/navigation';

// Vercel prefers root page.tsx instead of redirects in next.config
// This provides better server-side handling
export default function RootPage() {
  redirect('/homepage');
}
