import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    // padding: 20,
    fontSize: 5,
  },

  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
  },

  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },

  header: {
    backgroundColor: '#eeeeee',
    fontWeight: '600',
  },

  cell: {
    paddingVertical: 10,
    borderRightWidth: 1,
    borderRightColor: '#000',
    textAlign: 'center',
    fontSize: 9,
  },

  lastCell: {
    borderRightWidth: 0,
  },

  invoiceNo: {
    width: '10%',
  },

  lorryNo: {
    width: '17%',
  },

  date: {
    width: '12%',
  },

  from: {
    width: '15%',
  },

  to: {
    width: '15%',
  },

  weight: {
    width: '10%',
  },

  freightCharges: {
    width: '15%',
  },

  advance: {
    width: '15%',
  },

  netBalance: {
    width: '15%',
    fontWeight: '600',
  },
});

function MemoTable({ memos = [] }) {
  function formatDate(date) {
    if (!date) return '-';

    const [year, month, day] = date.split('-');

    return `${day}-${month}-${year}`;
  }

  const formatINR = new Intl.NumberFormat('en-IN');

  return (
    <View style={styles.table}>
      <View style={[styles.row, styles.header]}>
        <Text style={[styles.cell, styles.invoiceNo]}>IN. No</Text>

        <Text style={[styles.cell, styles.lorryNo]}>Lorry No</Text>

        <Text style={[styles.cell, styles.date]}>Date</Text>

        <Text style={[styles.cell, styles.from]}>From</Text>

        <Text style={[styles.cell, styles.to]}>To</Text>

        <Text style={[styles.cell, styles.weight]}>Weight</Text>

        <Text style={[styles.cell, styles.freightCharges]}>Charges</Text>

        <Text style={[styles.cell, styles.advance]}>Advance</Text>

        <Text style={[styles.cell, styles.netBalance]}>Balance</Text>
      </View>

      {memos.map((memo, index) => (
        <View style={styles.row} key={memo.id ?? index}>
          <Text style={[styles.cell, styles.invoiceNo]}>{memo?.id ?? '-'}</Text>

          <Text style={[styles.cell, styles.lorryNo]}>
            {memo?.lorry_no.toUpperCase() ?? '-'}
          </Text>

          <Text style={[styles.cell, styles.date]}>
            {formatDate(memo?.memo_date) ?? '-'}
          </Text>

          <Text style={[styles.cell, styles.from]}>{memo?.from ?? '-'}</Text>

          <Text style={[styles.cell, styles.to]}>{memo?.to ?? '-'}</Text>

          <Text style={[styles.cell, styles.weight]}>
            {memo?.party_weight ?? 0}
          </Text>

          <Text style={[styles.cell, styles.freightCharges]}>
            {formatINR.format(memo?.party_freight_charges) ?? 0}
          </Text>

          <Text style={[styles.cell, styles.advance]}>
            {formatINR.format(memo?.party_payments[0]?.amount) ?? 0}
          </Text>

          <Text style={[styles.cell, styles.netBalance]}>
            {formatINR.format(memo?.party_net_balance) ?? 0}
          </Text>
        </View>
      ))}
    </View>
  );
}

export default MemoTable;
