import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function MafatihScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>مفاتيح الجنان</Text>
      {/* You can later list categories like: أدعية الأيام, الزيارات, دعاء كميل, etc. */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
});
