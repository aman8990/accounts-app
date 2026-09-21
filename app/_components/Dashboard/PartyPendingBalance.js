'use client';

import { useState } from 'react';
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import PartyModal from './PartyModal';

function PartyPendingBalance({ partyBalance }) {
  const [showModal, setShowModal] = useState(false);

  const formatINR = new Intl.NumberFormat('en-IN');

  const handleClick = () => {
    setShowModal((prev) => !prev);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div
        className="relative inline-flex h-full w-full cursor-pointer rounded-2xl border-2 border-primary-100 p-4 transition-all duration-300 ease-out hover:bg-accent-600  hover:text-accent-200 justify-center items-center"
        onClick={handleClick}
      >
        <div className="flex flex-col items-center justify-center gap-3">
          <GiReceiveMoney className="text-primary-100" size={60} />
          <h1 className="text-xl font-semibold text-primary-100">
            Parties Net Balance
          </h1>

          <h1 className="text-xl font-semibold text-primary-100">
            ₹ {formatINR.format(partyBalance)}
          </h1>
        </div>
      </div>

      {showModal && <PartyModal closeModal={closeModal} />}
    </>
  );
}

export default PartyPendingBalance;
