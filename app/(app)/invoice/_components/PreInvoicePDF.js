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
    marginBottom: 20,
    borderRightWidth: 1.5,
    borderLeftWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: 'black',
    borderRadius: 1,
  },

  logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },

  logo: {
    width: 60,
    height: 60,
  },

  logo1: {
    marginLeft: 35,
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
    marginLeft: 14,
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
    marginBottom: 2,
    fontSize: 11,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  signs: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    gap: 20,
  },

  memoNo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10,
  },

  party: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 20,
    gap: 10,
  },

  partyName: {
    borderBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 10,
    paddingHorizontal: 10,
  },

  fromTo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 50,
  },

  weightRate: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 80,
  },

  moneyContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 10,
    gap: 10,
    borderWidth: 1.7,
    borderColor: 'black',
    width: 180,
    padding: 6,
    fontWeight: 'semibold',
  },

  money: {
    marginBottom: 6,
  },

  netBalance: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1.7,
    borderColor: 'black',
    borderRadius: 1,
    padding: 4,
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },

  bankSignContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 40,
  },

  bankContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    borderRightWidth: 1.5,
    borderTopWidth: 1.5,
    borderColor: 'black',
    width: 220,
    padding: 6,
    marginTop: 30,
    fontWeight: 'bold',
  },

  noteContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    borderTopWidth: 1.5,
    borderColor: 'black',
    padding: 6,
  },

  note: {
    fontWeight: 'semibold',
  },
});

import { toWords } from 'number-to-words';

function PreInvoicePDF({ memo }) {
  const formatINR = new Intl.NumberFormat('en-IN');

  function formatDate(date) {
    if (!date) return '-';

    const [year, month, day] = date.split('-');

    return `${day} / ${month} / ${year}`;
  }

  const balance =
    Number(memo?.party_freight_charges) - Number(memo?.advance_to_pay);

  const netBalanceInWords = toWords(balance);

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
          <View style={styles.memoNo}>
            <Text>No. : {memo?.id}</Text>
            <Text>Date : {formatDate(memo?.memo_date)}</Text>
          </View>

          <View style={styles.party}>
            <Text>M/s :</Text>
            <Text style={styles.partyName}>{memo?.party_master.full_name}</Text>
          </View>

          <View style={styles.party}>
            <Text>Vehicle No. :</Text>
            <Text style={styles.partyName}>{memo?.lorry_no.toUpperCase()}</Text>
          </View>

          <View style={styles.fromTo}>
            <View style={styles.party}>
              <Text>From :</Text>
              <Text style={styles.partyName}>{memo?.from.toUpperCase()}</Text>
            </View>

            <View style={styles.party}>
              <Text>To :</Text>
              <Text style={styles.partyName}>{memo?.to.toUpperCase()}</Text>
            </View>
          </View>

          <View style={styles.weightRate}>
            <View style={styles.party}>
              <Text>Weight :</Text>
              <Text style={styles.partyName}>{memo?.party_weight}</Text>
            </View>

            <View style={styles.party}>
              <Text>Rate :</Text>
              <Text style={styles.partyName}>
                {formatINR.format(memo?.party_rate)}
              </Text>
            </View>
          </View>

          <View style={styles.moneyContainer}>
            <View>
              <Text style={styles.money}>Freight Rs. : </Text>
              <Text style={styles.money}>Advance To Pay Rs. : </Text>
              <Text>Balance Rs. : </Text>
            </View>
            <View>
              <Text style={styles.money}>
                {formatINR.format(memo?.party_freight_charges)}
              </Text>
              <Text style={styles.money}>
                {formatINR.format(memo?.advance_to_pay)}
              </Text>
              <Text>{balance}</Text>
            </View>
          </View>

          <View style={styles.netBalance}>
            <Text>{netBalanceInWords.toUpperCase()} RUPEES ONLY</Text>
            <Text>Net Balance : {formatINR.format(balance)}</Text>
          </View>

          <View style={styles.bankSignContainer}>
            <View style={styles.bankContainer}>
              <View>
                <Text>PAN Number :</Text>
                <Text>Bank Name :</Text>
                <Text>A/C Number :</Text>
                <Text>IFSC Code :</Text>
                <Text>Branch :</Text>
              </View>
              <View>
                <Text>CEQPS2768F</Text>
                <Text>HDFC BANK</Text>
                <Text>50200007188243</Text>
                <Text>HDFC0005303</Text>
                <Text>NAROL GAM ROAD</Text>
              </View>
            </View>

            <View style={styles.signs}>
              <View>
                <Image src="/stamp.png" style={[styles.logo, styles.logo1]} />
                <Text>For Rahul Roadways(AHD)</Text>
              </View>
              <Image src="/sign.png" style={styles.logo} />
            </View>
          </View>

          <View style={styles.noteContainer}>
            <Text style={styles.note}>
              Note : Please Pay Balance Payment Immediately
            </Text>
            <Text>1) Loading & Unloading By Party.</Text>
            <Text>
              2) We are not responsible for leakage/breakage and damage of goods
              in transit.
            </Text>
            <Text>
              3) Please check all documents before loading or hanover the goods
              of the vehicle.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default PreInvoicePDF;
