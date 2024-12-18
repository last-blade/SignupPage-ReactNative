import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function SocialButton({ icon, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image source={{ uri: icon }} style={styles.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
