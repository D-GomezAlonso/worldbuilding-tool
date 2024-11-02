import clsx from 'clsx';
import { Navbar } from '../../components/Navbar';
import { Divider } from '@nextui-org/divider';
import { Outlet } from 'react-router-dom';

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
