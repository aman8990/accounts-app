'use client';

import { PDFDownloadLink } from '@react-pdf/renderer';
import BulkMemosPDF from './BulkMemosPDF';

function DownloadBulkInvoice({ memos }) {
  return (
    <div className="flex justify-center mb-20 text-2xl font-bold">
      <PDFDownloadLink
        document={<BulkMemosPDF memos={memos} />}
        fileName={`Bulk-Invoice.pdf`}
        className="bg-accent-600 hover:bg-accent-700 text-accent-100 px-3 pt-3 pb-2 rounded-xl cursor-pointer"
      >
        {({ loading }) =>
          loading ? 'Generating Invoices...' : 'Download Bulk Invoices'
        }
      </PDFDownloadLink>
    </div>
  );
}

export default DownloadBulkInvoice;
