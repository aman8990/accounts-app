'use client';

import { PDFViewer } from '@react-pdf/renderer';
import MemoPDF from './MemoPDF';

export default function MemoPreview({ memo }) {
  return (
    <PDFViewer
      style={{
        width: '100%',
        height: '800px',
        border: 'none',
      }}
    >
      <MemoPDF memo={memo} />
    </PDFViewer>
  );
}
