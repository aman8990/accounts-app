'use client';

import { PDFViewer } from '@react-pdf/renderer';
import BulkMemosPDF from './BulkMemosPDF';

export default function MemoPreview({ memos }) {
  return (
    <PDFViewer
      style={{
        width: '100%',
        height: '800px',
        border: 'none',
      }}
    >
      <BulkMemosPDF memos={memos} />
    </PDFViewer>
  );
}
