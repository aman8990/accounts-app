'use client';

import * as XLSX from 'xlsx-js-style';
import { LuDownload } from 'react-icons/lu';

function ExportToExcel({ orders = [], masterType, formatDate }) {
  const exportToExcel = () => {
    if (!orders.length) return;

    const excelData = orders.map((order) => {
      const payments =
        masterType === 'party'
          ? order?.party_payments || []
          : order?.lorry_payments || [];

      const row = {
        [masterType === 'party' ? 'Memo ID' : 'Challan ID']: order.id,

        [masterType === 'party' ? 'Memo Date' : 'Challan Date']: formatDate(
          masterType === 'party' ? order.memo_date : order.challan_date,
        ),

        From: order.from?.toUpperCase() ?? '-',

        To: order.to?.toUpperCase() ?? '-',

        'Lorry No.': order.lorry_no?.toUpperCase() ?? '-',

        [masterType === 'party' ? 'Party Master' : 'Lorry Master']:
          masterType === 'party'
            ? (order?.party_master?.full_name ?? '-')
            : (order?.lorry_master?.owner_name ?? '-'),

        'Freight Charges':
          masterType === 'party'
            ? (order?.party_freight_charges ?? 0)
            : (order?.lorry_freight_charges ?? 0),

        'Net Balance':
          masterType === 'party'
            ? (order?.party_net_balance ?? 0)
            : (order?.lorry_net_balance ?? 0),

        ' ': '',
      };

      payments.forEach((payment, index) => {
        const paymentNumber = index + 1;

        row[`Payment ${paymentNumber} ID`] = payment?.id ?? '-';

        row[`Payment ${paymentNumber} Amount`] = payment?.amount ?? 0;

        row[`Payment ${paymentNumber} Type`] = payment?.type ?? '-';
      });

      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const columnWidths = Object.keys(
      excelData.reduce(
        (largest, row) => ({
          ...largest,
          ...row,
        }),
        {},
      ),
    ).map((key) => {
      const maxLength = Math.max(
        key.length,
        ...excelData.map((row) => String(row[key] ?? '').length),
      );

      return {
        wch: Math.min(maxLength + 10, 30),
      };
    });

    worksheet['!cols'] = columnWidths;

    const range = XLSX.utils.decode_range(worksheet['!ref']);

    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({
        r: 0,
        c: col,
      });

      const cell = worksheet[cellAddress];

      if (cell) {
        cell.s = {
          fill: {
            patternType: 'solid',
            fgColor: {
              rgb: '404040',
            },
          },
          font: {
            name: 'Calibri',
            sz: 14,
            bold: true,
            color: {
              rgb: 'FFFFFF',
            },
          },
          alignment: {
            horizontal: 'center',
            vertical: 'center',
          },
          border: {
            top: {
              style: 'thin',
              color: { rgb: '000000' },
            },
            bottom: {
              style: 'thin',
              color: { rgb: '000000' },
            },
            left: {
              style: 'thin',
              color: { rgb: '000000' },
            },
            right: {
              style: 'thin',
              color: { rgb: '000000' },
            },
          },
        };
      }
    }

    worksheet['!rows'] = Array.from(
      { length: range.e.r + 1 },
      (_, rowIndex) => ({
        hpt: rowIndex === 0 ? 40 : 30,
      }),
    );

    for (let row = 1; row <= range.e.r; row++) {
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({
          r: row,
          c: col,
        });

        const cell = worksheet[cellAddress];

        if (cell) {
          cell.s = {
            font: {
              name: 'Calibri',
              sz: 12,
              bold: true,
              color: {
                rgb: '000000',
              },
            },
            alignment: {
              vertical: 'center',
              horizontal: 'center',
            },
          };
        }
      }
    }

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      masterType === 'party' ? 'Party Orders' : 'Lorry Orders',
    );

    const fileName =
      orders.length === 1
        ? `${masterType === 'party' ? 'memo' : 'challan'}-${orders[0].id}.xlsx`
        : `${masterType === 'party' ? 'memos' : 'challans'}-all.xlsx`;

    XLSX.writeFile(workbook, fileName);
  };

  return (
    <button
      onClick={exportToExcel}
      disabled={!orders.length}
      className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      title="Export to Excel"
    >
      {orders.length === 1 ? (
        <LuDownload size={25} />
      ) : (
        <LuDownload size={50} />
      )}
    </button>
  );
}

export default ExportToExcel;
