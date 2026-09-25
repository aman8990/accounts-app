import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    fontSize: 11,
  },

  body: {
    borderRightWidth: 1.5,
    borderLeftWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: 'black',
    padding: 4,
  },

  signs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    marginBottom: 10,
  },

  logo: {
    width: 40,
    height: 40,
  },

  bottomName: {
    marginTop: 20,
  },

  partyNameContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 40,
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 20,
  },

  partyname: {
    fontSize: 12,
    fontWeight: '600',
    color: 'black',
  },

  netBalance: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: 'black',
    borderRadius: 1,
    padding: 4,
    marginTop: 20,
    marginBottom: 10,
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
});

import { toWords } from 'number-to-words';
import InvoiceTop from './InvoiceTop';
import MemoTable from './MemoTable';

function BulkMemosPDF({ memos }) {
  const finalBalance = memos.reduce(
    (total, memo) => total + (Number(memo?.party_net_balance) || 0),
    0,
  );

  const netBalanceInWords = toWords(finalBalance);

  const formatINR = new Intl.NumberFormat('en-IN');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <InvoiceTop />

        <View style={styles.body}>
          <View style={styles.partyNameContainer}>
            <Text style={styles.partyname}>
              Party Name : {memos[0]?.party_master.full_name}
            </Text>
            <Text style={styles.partyname}>
              Party ID : {memos[0]?.party_master.id}
            </Text>
          </View>

          <MemoTable memos={memos} />

          <View style={styles.netBalance}>
            <Text>{netBalanceInWords.toUpperCase()} RUPEES ONLY</Text>
            <Text>Net Balance : {formatINR.format(finalBalance)}</Text>
          </View>

          <View style={styles.signs}>
            <Text style={styles.bottomName}>For Rahul Roadways(AHD)</Text>
            <Image src="/stamp.png" style={styles.logo} />
            <Image src="/sign.png" style={styles.logo} />
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default BulkMemosPDF;
