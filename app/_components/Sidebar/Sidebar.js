'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiServer } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import LogoutButton from '../LogoutButton';
import { CiMemoPad } from 'react-icons/ci';
import { MdOutlineAutoAwesomeMosaic, MdPlaylistAdd } from 'react-icons/md';
import { TbFileInvoice } from 'react-icons/tb';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { CiDeliveryTruck } from 'react-icons/ci';
import { GiReceiveMoney } from 'react-icons/gi';
import { GiPayMoney } from 'react-icons/gi';
import { BiListMinus } from 'react-icons/bi';
import { MdOutlineAutoAwesomeMotion } from 'react-icons/md';
import { MdOutlinePendingActions } from 'react-icons/md';
import { GrMultiple } from 'react-icons/gr';
import { VscMultipleWindows } from 'react-icons/vsc';

function Sidebar({ toggleSidebar }) {
  const pathname = usePathname();

  const isActive = (href) => pathname === href;

  const spanClass =
    'flex mt-1 items-center text-xl md:text-lg lg:text-xl font-semibold';

  return (
    <nav className="h-full">
      <ul className="px-3 space-y-8 py-10 mb-40">
        <li className="flex md:hidden justify-center">
          <IoClose size={35} onClick={toggleSidebar} />
        </li>

        <li>
          <Link
            href="/"
            className={`flex gap-3 px-3 py-1 ${
              isActive('/')
                ? ' rounded-md bg-accent-50 text-primay-950'
                : 'text-primary-100'
            }`}
          >
            <HiServer size={35} />
            <span className={`${spanClass}`}>Dashboard</span>
          </Link>
        </li>

        <li>
          <Link
            href="/memo"
            className={`flex gap-3 px-3 py-1 ${
              isActive('/memo')
                ? ' rounded-md bg-accent-50 text-primay-950'
                : 'text-primary-100'
            }`}
          >
            <CiMemoPad size={30} />
            <span className={`${spanClass}`}>Memo</span>
          </Link>
        </li>

        <li>
          <Link
            href="/challan"
            className={`flex gap-3 px-3 py-1 ${
              isActive('/challan')
                ? ' rounded-md bg-accent-50 text-primay-950'
                : 'text-primary-100'
            }`}
          >
            <MdOutlineAutoAwesomeMosaic size={30} />
            <span className={`${spanClass}`}>Challan</span>
          </Link>
        </li>

        <li>
          <Link
            href="/partyPayment"
            className={`flex gap-3 px-3 py-1 ${
              isActive('/partyPayment')
                ? ' rounded-md bg-accent-50 text-primay-950'
                : 'text-primary-100'
            }`}
          >
            <GiReceiveMoney size={30} />
            <span className={`${spanClass}`}>Party Payment</span>
          </Link>
        </li>

        <li>
          <Link
            href="/lorryPayment"
            className={`flex gap-3 px-3 py-1 ${
              isActive('/lorryPayment')
                ? ' rounded-md bg-accent-50 text-primay-950 md:text-lg lg:text-xl'
                : 'text-primary-100'
            }`}
          >
            <GiPayMoney size={30} />
            <span className={`${spanClass}`}>Lorry Payment</span>
          </Link>
        </li>

        <li>
          <Link
            href="/invoice"
            className={`flex gap-3 px-3 py-1 ${
              isActive('/invoice')
                ? ' rounded-md bg-accent-50 text-primay-950'
                : 'text-primary-100'
            }`}
          >
            <TbFileInvoice size={30} />
            <span className={`${spanClass}`}>Invoice</span>
          </Link>
        </li>

        <li>
          <Link
            href="/bulkInvoice"
            className={`flex gap-3 px-3 py-1 ${
              isActive('/bulkInvoice')
                ? ' rounded-md bg-accent-50 text-primay-950'
                : 'text-primary-100'
            }`}
          >
            <VscMultipleWindows size={30} />
            <span className={`${spanClass}`}>Bulk Invoice</span>
          </Link>
        </li>

        <li>
          <Link
            href="/partyMaster"
            className={`flex gap-3 px-3 py-1 ${
              isActive('/partyMaster')
                ? ' rounded-md bg-accent-50 text-primay-950'
                : 'text-primary-100'
            }`}
          >
            <IoPersonCircleOutline size={30} />
            <span className={`${spanClass}`}>Party Master</span>
          </Link>
        </li>

        <li>
          <Link
            href="/lorryMaster"
            className={`flex gap-3 px-3 py-1 ${
              isActive('/lorryMaster')
                ? ' rounded-md bg-accent-50 text-primay-950'
                : 'text-primary-100'
            }`}
          >
            <CiDeliveryTruck size={30} />
            <span className={`${spanClass}`}>Lorry Master</span>
          </Link>
        </li>

        <li>
          <Link
            href="/partyPaymentsList"
            className={`flex gap-3 px-3 py-1 items-center ${
              isActive('/partyPaymentsList')
                ? ' rounded-md bg-accent-50 text-primay-950'
                : 'text-primary-100'
            }`}
          >
            <MdPlaylistAdd size={30} />
            <span className={`${spanClass}`}>Party Payments List</span>
          </Link>
        </li>

        <li>
          <Link
            href="/lorryPaymentsList"
            className={`flex gap-3 px-3 py-1 items-center ${
              isActive('/lorryPaymentsList')
                ? ' rounded-md bg-accent-50 text-primay-950'
                : 'text-primary-100'
            }`}
          >
            <BiListMinus size={30} />
            <span className={`${spanClass}`}>Lorry Payments List</span>
          </Link>
        </li>

        <li>
          <Link
            href="/allOrders"
            className={`flex gap-3 px-3 py-1 ${
              isActive('/allOrders')
                ? ' rounded-md bg-accent-50 text-primay-950'
                : 'text-primary-100'
            }`}
          >
            <MdOutlineAutoAwesomeMotion size={30} />
            <span className={`${spanClass}`}>All Orders</span>
          </Link>
        </li>

        <li>
          <Link
            href="/searchOrders"
            className={`flex gap-3 px-3 py-1 items-center ${
              isActive('/searchOrders')
                ? ' rounded-md bg-accent-50 text-primay-950'
                : 'text-primary-100'
            }`}
          >
            <MdOutlinePendingActions size={30} />
            <span className={`${spanClass}`}>Search Orders</span>
          </Link>
        </li>

        <li className="flex justify-center">
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
