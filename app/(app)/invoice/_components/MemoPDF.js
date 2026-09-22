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
    paddingHorizontal: 40,
    fontSize: 11,
  },

  header: {
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'black',
    borderRadius: 1,
    padding: 2,
  },

  body: {
    borderRightWidth: 1.5,
    borderLeftWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: 'black',
    padding: 4,
  },

  logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },

  logo: {
    width: 60,
    height: 60,
  },

  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#014eac',
  },

  workContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: 4,
    borderRadius: 4,
    marginTop: 5,
    backgroundColor: 'black',
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },

  companyWork: {
    marginLeft: 12,
  },

  subject: {
    fontSize: 10,
    marginBottom: 5,
  },

  address: {
    marginTop: 2,
    fontSize: 9,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  address2: {
    marginLeft: 127,
  },

  phone: {
    marginTop: 6,
    marginBottom: 3,
    fontSize: 11,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    fontSize: 15,
    borderWidth: 2,
    borderColor: 'black',
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },

  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: 8,
  },

  label: {
    width: '40%',
    fontWeight: 'bold',
  },

  value: {
    width: '60%',
  },

  sealContainer: {
    marginTop: 50,
    alignItems: 'flex-end',
  },

  seal: {
    width: 100,
    height: 100,
  },

  table: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 20,
  },

  cell: {
    flex: 1,
    // padding: 8,
  },

  leftColumn: {
    borderRightWidth: 1,
    borderRightColor: '#000',
  },

  tableLabel: {
    fontSize: 15,
    backgroundColor: 'grey',
    color: '#fff',
    fontWeight: 'semibold',
    marginBottom: 6,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },

  partyName: {
    fontSize: 11,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  partyAddress: {
    fontSize: 9,
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 2,
  },

  invoiceNo: {
    fontSize: 12,
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#490',
  },

  memoDate: {
    fontSize: 12,
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 5,
  },

  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
  },

  infoContainer1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
  },

  moneyContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
    padding: 4,
  },

  border: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'black',
  },

  info: {
    marginTop: 5,
  },

  info1: {
    marginRight: 5,
    marginTop: 5,
  },

  advanceContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'black',
  },

  payContainer: {
    display: 'flex',
    flexDirection: 'row',
  },

  netBalance: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 1,
    padding: 4,
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },

  signs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },

  bottomName: {
    marginTop: 20,
  },
});

import { toWords } from 'number-to-words';

function MemoPDF({ memo }) {
  const formatINR = new Intl.NumberFormat('en-IN');

  function formatDate(date) {
    if (!date) return '-';

    const [year, month, day] = date.split('-');

    return `${day} / ${month} / ${year}`;
  }

  const netBalanceInWords = toWords(memo?.party_net_balance);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Company Header */}
        <View style={styles.header}>
          <Text style={styles.subject}>
            * All Subject to Ahemdabad Jurisdiction only
          </Text>

          <View style={styles.logoContainer}>
            <Image src="/clogo.png" style={styles.logo} />

            <View>
              <Text style={styles.companyName}>Rahul Roadways(AHD)</Text>

              <View style={styles.workContainer}>
                <Text style={styles.companyWork}>
                  ODC Consignment FTL Truck & Trailor
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.address}>
            <Text>
              Shop No. S-202, Vashishth Vanijyam, Nr. Radhe Business Empire,
              S.P. Ring Road Circle,
            </Text>

            <Text style={styles.address2}> Aslali, Ahmedabad - 382427</Text>
          </View>

          <Text style={styles.phone}>Phone: 9173837094 | 9727892094</Text>
        </View>

        <View style={styles.body}>
          <View style={styles.table}>
            <View style={[styles.cell, styles.leftColumn]}>
              <Text style={styles.tableLabel}>Party Info</Text>

              <Text style={styles.partyName}>
                {memo?.party_master?.full_name}
              </Text>
              <Text style={styles.partyAddress}>
                Party ID : {memo?.party_master?.id}
              </Text>
              {/* <Text style={styles.partyAddress}>
              Mobile : {memo?.party_master?.mobile}
              </Text>
              <Text style={styles.partyAddress}>
              {memo?.party_master?.address}
              </Text> */}
            </View>

            <View style={styles.cell}>
              <Text style={styles.tableLabel}>Invoice No and Dated</Text>

              <Text style={styles.invoiceNo}>Invoice No. - {memo?.id}</Text>
              <Text style={styles.memoDate}>
                Date - {formatDate(memo?.memo_date)}
              </Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text>FROM : {memo?.from.toUpperCase()}</Text>
            <Text>To : {memo?.to.toUpperCase()}</Text>
            <Text>Lorry No. : {memo?.lorry_no?.toUpperCase() ?? ' '}</Text>
          </View>

          <View style={styles.infoContainer1}>
            <Text>Weight :{memo?.party_weight}</Text>
            <Text>Rate : {formatINR.format(memo?.party_rate) || 0}</Text>
          </View>

          <View style={styles.moneyContainer}>
            <View style={styles.border}>
              <View>
                <Text style={styles.info}>Initial Charges : </Text>
                <Text style={styles.info}>Detention : </Text>
                <Text style={styles.info}>Others : </Text>
                <Text style={styles.info}>RTO : </Text>
                <Text style={styles.info}>TDS : </Text>
                <Text style={styles.info}>Munsiana : </Text>
                <Text style={styles.info}>Final Charges : </Text>
              </View>
              <View>
                <Text style={styles.info}>
                  {formatINR.format(memo?.initial_party_freight_charges)}
                </Text>
                <Text style={styles.info}>
                  + {formatINR.format(memo?.party_detention) || 0}
                </Text>
                <Text style={styles.info}>
                  + {formatINR.format(memo?.party_others) || 0}
                </Text>
                <Text style={styles.info}>
                  + {formatINR.format(memo?.party_rto) || 0}
                </Text>
                <Text style={styles.info}>
                  - {formatINR.format(memo?.party_tds) || 0}
                </Text>
                <Text style={styles.info}>
                  - {formatINR.format(memo?.party_munsiana) || 0}
                </Text>
                <Text style={styles.info}>
                  = {formatINR.format(memo?.party_freight_charges)}
                </Text>
              </View>
            </View>

            {memo?.party_payments?.length > 0 && (
              <View style={styles.advanceContainer}>
                {memo?.party_payments?.map((payment, i) => (
                  <View key={payment.id} style={styles.payContainer}>
                    <Text style={styles.info1}>{i + 1}.</Text>

                    <Text style={styles.info1}>
                      {formatINR.format(payment.amount)} -{' '}
                    </Text>

                    <Text style={styles.info1}>{payment.type}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.netBalance}>
            <Text>{netBalanceInWords.toUpperCase()} RUPEES ONLY</Text>
            <Text>
              Net Balance : {formatINR.format(memo?.party_net_balance)}
            </Text>
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

export default MemoPDF;
