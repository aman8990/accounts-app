import { Suspense } from 'react';
import PendingChallans from './PendingChallans';
import { getChallansCount } from '@/app/_actions/getChallansCount';
import SpinnerMini from '@/app/_components/SpinnerMini';
import { getPartyPendingPayments } from '@/app/_actions/getPartyPendingPayments';
import PartyPendingPayments from './PartyPendingPayments';
import { getLorryPendingPayments } from '@/app/_actions/getLorryPendingPayments';
import LorryPendingPayments from './LorryPendingPayments';
import { getPartyPendingBalance } from '@/app/_actions/getPartyPendingBalance';
import PartyPendingBalance from './PartyPendingBalance';
import { getLorryPendingBalance } from '@/app/_actions/getLorryPendingBalance';
import LorryPendingBalance from './LorryPendingBalance';
import Spinner from '../Spinner';

async function ChallansSection() {
  const noOfChallans = await getChallansCount();

  return <PendingChallans noOfChallans={noOfChallans} />;
}

async function PendingPartyPayments() {
  const noPartyPayments = await getPartyPendingPayments();

  return <PartyPendingPayments noPartyPayments={noPartyPayments} />;
}

async function PendingLorryPayments() {
  const noLorryPayments = await getLorryPendingPayments();

  return <LorryPendingPayments noLorryPayments={noLorryPayments} />;
}

async function PartyBalance() {
  const partyBalance = await getPartyPendingBalance();

  return <PartyPendingBalance partyBalance={partyBalance} />;
}

async function LorryBalance() {
  const lorryBalance = await getLorryPendingBalance();

  return <LorryPendingBalance lorryBalance={lorryBalance} />;
}

async function Dashboard() {
  return (
    <div>
      <div className="text-center">
        <h1 className="inline-block text-6xl text-primary-100 my-10 border-4 border-primary-100 rounded-2xl px-4 pt-3 pb-2">
          Dashboard
        </h1>
      </div>

      <Suspense
        fallback={
          <div className="flex justify-center py-10">
            <Spinner size={80} />
          </div>
        }
      >
        <div className="flex items-stretch gap-20 mx-10">
          <div className="flex-1">
            <ChallansSection />
          </div>

          <div className="flex-1">
            <PendingPartyPayments />
          </div>

          <div className="flex-1">
            <PartyBalance />
          </div>
        </div>

        <div className="flex items-stretch gap-20 mx-10 mt-10">
          <div className="flex-1">
            <PendingLorryPayments />
          </div>
          <div className="flex-1">
            <LorryBalance />
          </div>
        </div>
      </Suspense>
    </div>
  );
}

export default Dashboard;
