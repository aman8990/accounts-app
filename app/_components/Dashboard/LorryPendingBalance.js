'use client';

import { useState } from 'react';
import { GiPayMoney } from 'react-icons/gi';
import LorryModal from './LorryModal';

function LorryPendingBalance({ lorryBalance }) {
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
        className="relative inline-flex cursor-pointer rounded-2xl border-2 border-primary-100 p-4 transition-all duration-300 ease-out hover:bg-accent-600 hover:text-accent-200 h-full w-full items-center justify-center"
        onClick={handleClick}
      >
        <div className="flex flex-col items-center justify-center gap-3">
          <GiPayMoney className="text-primary-100" size={50} />

          <h1 className="text-xl font-semibold text-primary-100">
            Lorries Net Balance
          </h1>

          <h1 className="text-xl font-semibold text-primary-100">
            ₹ {formatINR.format(lorryBalance)}
          </h1>
        </div>
      </div>

      {showModal && <LorryModal closeModal={closeModal} />}
    </>
  );
}

export default LorryPendingBalance;
