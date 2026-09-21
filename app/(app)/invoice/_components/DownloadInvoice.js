'use client';

import { PDFDownloadLink } from '@react-pdf/renderer';
import MemoPDF from './MemoPDF';

function DownloadInvoice({ memo }) {
  return (
    <div className="flex justify-center mb-20 text-2xl font-bold">
      <PDFDownloadLink
        document={<MemoPDF memo={memo} />}
        fileName={`Invoice-${memo.id}.pdf`}
        className="bg-accent-600 hover:bg-accent-700 text-accent-100 px-3 pt-3 pb-2 rounded-xl"
      >
        {({ loading }) =>
          loading ? 'Generating Invoice...' : 'Download Invoice'
        }
      </PDFDownloadLink>
    </div>
  );
}

export default DownloadInvoice;
