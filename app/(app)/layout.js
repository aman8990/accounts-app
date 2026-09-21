import Sidebar from '@/app/_components/Sidebar/Sidebar';
import Header from '../_components/Header/Header';
import MasterDataProvider from '../_components/MasterDataProvider';

export default function AppLayout({ children }) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <aside className="w-[18%] shrink-0 overflow-y-auto custom-scrollbar">
          <Sidebar />
        </aside>

        <MasterDataProvider>
          <main className="w-[82%] min-w-0 overflow-y-auto custom-scrollbar">
            {children}
          </main>
        </MasterDataProvider>
      </div>
    </div>
  );
}
