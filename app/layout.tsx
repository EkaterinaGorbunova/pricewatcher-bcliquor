import Navbar from '@/components/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'BCLiquor Price Watcher',
  description: 'Never miss a sale! Effortlessly track liquor prices at BCLiquor Store in British Columbia and save money on your online shopping.',
  other: {
    'theme-color': '#ffffff',
    'color-scheme': 'white only',
    'og:type': 'website',
    'og:title': 'BCLiquor Price Tracker: Save Money on Liquor',
    'og:image': '/assets/images/social-media-preview.jpg'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main className='max-w-10xl mx-auto'>
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}