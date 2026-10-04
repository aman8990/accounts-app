'use client';

import { PDFDownloadLink } from '@react-pdf/renderer';
import PreInvoicePDF from './PreInvoicePDF';

function ButtonPreSmall({ memo }) {
  return (
    <div className="">
      <PDFDownloadLink
        document={<PreInvoicePDF memo={memo} />}
        fileName={`Pre-Invoice-${memo.id}.pdf`}
        className="bg-accent-600 p-2 hover:bg-accent-700 text-gray-800 rounded-xl"
      >
        {({ loading }) => (loading ? '' : 'Download')}
      </PDFDownloadLink>
    </div>
  );
}

export default ButtonPreSmall;
