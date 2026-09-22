'use client';

import { PDFDownloadLink } from '@react-pdf/renderer';
import PreInvoicePDF from './PreInvoicePDF';

function DownloadPreInvoice({ memo }) {
  return (
    <div className="flex justify-center mb-10 text-2xl font-bold">
      <PDFDownloadLink
        document={<PreInvoicePDF memo={memo} />}
        fileName={`Pre-Invoice-${memo.id}.pdf`}
        className="bg-accent-600 hover:bg-accent-700 text-accent-100 px-3 pt-3 pb-2 rounded-xl"
      >
        {({ loading }) =>
          loading ? 'Generating Pre-Invoice...' : 'Download Pre-Invoice'
        }
      </PDFDownloadLink>
    </div>
  );
}

export default DownloadPreInvoice;
