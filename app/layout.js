import { Josefin_Sans } from 'next/font/google';
import ToasterContext from './_context/ToasterContext';
import './globals.css';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${josefin.className} antialiased bg-primary-950`}>
        <ToasterContext />
        {children}
      </body>
    </html>
  );
}
