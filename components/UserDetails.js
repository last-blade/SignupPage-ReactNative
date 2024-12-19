import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const UserDetails = ({ route }) => {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Details</Text>
      <Text style={styles.detail}>Name: {user.name}</Text>
      <Text style={styles.detail}>Date of Birth: {user.dateOfBirth}</Text>
      <Text style={styles.detail}>Gender: {user.gender}</Text>
      <Text style={styles.detail}>Email: {user.email}</Text>
      <Text style={styles.detail}>Phone: {user.countryCode}{"-"}{user.phone}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  detail: {
    fontSize: 16,
    marginVertical: 4,
  },
});

export default UserDetails;
