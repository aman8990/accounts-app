import Image from 'next/image';
import logo from '@/public/logo.png';
import Link from 'next/link';

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-1 sm:gap-4 z-10 bg-white rounded-2xl px-5 text-primary-950"
    >
      <Image
        src={logo}
        height={80}
        width={80}
        quality={100}
        alt="Rahul Roadways"
      />
      <span className="text-2xl text-center font-semibold mt-1">
        Rahul Roadways
      </span>
    </Link>
  );
}

export default Logo;
