import { Metadata, Viewport } from 'next';
import clsx from 'clsx';
import { siteConfig } from '../../config/site';
import { Navbar } from '../../components/Navbar';
import { Divider } from '@nextui-org/divider';
import { Outlet } from 'react-router-dom';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export function RootLayout() {
  return (
    <div
      className={clsx(
        'dark min-h-screen min-w-screen font-sans antialiased flex',
      )}
    >
      <div className="relative flex flex-row h-screen w-full bg-black">
        <Navbar />
        <Divider orientation="vertical" />
        <main className="flex flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
