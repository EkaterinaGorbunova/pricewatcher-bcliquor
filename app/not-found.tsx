import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center gap-6">
      <Image
        src="/assets/icons/logo.svg"
        alt="logo"
        width={48}
        height={48}
        style={{ width: '48px', height: 'auto' }}
      />

      <div className="flex flex-col gap-2">
        <h1 className="text-6xl font-bold text-secondary">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700">Page not found</h2>
        <p className="text-gray-500 max-w-sm mt-1">
          Looks like this page went out of stock. Let&apos;s get you back to tracking prices.
        </p>
      </div>

      <Link href="/" className="btn !py-2 !px-6 !text-base">
        Back to Home
      </Link>
    </div>
  );
}
