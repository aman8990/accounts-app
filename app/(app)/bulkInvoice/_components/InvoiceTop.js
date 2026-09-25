import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'black',
    borderRadius: 1,
    padding: 2,
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
});

function InvoiceTop() {
  return (
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
          Shop No. S-202, Vashishth Vanijyam, Nr. Radhe Business Empire, S.P.
          Ring Road Circle,
        </Text>

        <Text style={styles.address2}> Aslali, Ahmedabad - 382427</Text>
      </View>

      <Text style={styles.phone}>Phone: 9173837094 | 9727892094</Text>
    </View>
  );
}

export default InvoiceTop;
