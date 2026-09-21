import { Suspense } from 'react';
import { getPreviousMemoId } from '@/app/_actions/getPreviousMemoId';
import Form from './_components/Form';
import Memos from './_components/Memos';
import { getMemos } from '@/app/_actions/getMemoById';
import Spinner from '@/app/_components/Spinner';

async function MemosSection() {
  const memos = await getMemos();

  return <Memos memos={memos} />;
}

async function page() {
  const lastMemoId = await getPreviousMemoId();

  return (
    <div>
      <div className="text-center">
        <h1 className="inline-block text-6xl text-primary-100 my-10 border-4 border-primary-100 rounded-2xl px-4 pt-3 pb-2">
          Create Memo
        </h1>
      </div>

      <Form lastMemoId={lastMemoId} />

      <Suspense
        fallback={
          <div className="flex justify-center py-10">
            <Spinner text="Fetching Memos..." />
          </div>
        }
      >
        <MemosSection />
      </Suspense>
    </div>
  );
}

export default page;
