import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import SocialButton from '../components/SocialButton';

export default function SignUpScreen() {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    gender: 'Other',
    genderSpecify: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ];

  const dobRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    const phoneRegex = /^[0-9+\(\)\-\s]*$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)|| formData.phone.length<10) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.dateOfBirth || !dobRegex.test(formData.dateOfBirth)) {
      newErrors.dateOfBirth = 'Please enter a valid date in the format DD/MM/YYYY.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    return true;
  };

  const handleSignUp = () => {
    if (validateForm()) {
      console.log('Sign up with:', formData);
    }
  };

  const handleDateOfBirthChange = (text) => {
    const formattedText = text.replace(/[^0-9\/]/g, '');
    setFormData({ ...formData, dateOfBirth: formattedText });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.logo}>Cambeo</Text>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          To get started, create an account with us. It's a quick and straightforward process that will only take a few minutes.
        </Text>

        <CustomInput
          label="Name"
          placeholder="Enter your full name"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <CustomInput
          label="Date Of Birth"
          placeholder="DD/MM/YYYY"
          value={formData.dateOfBirth}
          onChangeText={handleDateOfBirthChange}
        />
        {errors.dateOfBirth && <Text style={styles.errorText}>{errors.dateOfBirth}</Text>}

        <CustomInput
          label="Gender"
          type="dropdown"
          placeholder="Select Gender"
          value={formData.gender}
          onSelect={(value) => setFormData({ ...formData, gender: value })}
          data={genderOptions}
        />
        {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}

        <CustomInput
          label="Email"
          placeholder="Enter your email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <CustomInput
          label="Phone No."
          placeholder="Enter phone number"
          value={formData.phone}
          onChangeText={(text) => {
            // Sanitize phone number
            setFormData({ ...formData, phone: text.replace(/[^\d+\(\)\-\s]/g, '') });
          }}
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

        <CustomInput
          label="Password"
          placeholder="Enter your password"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          isPassword={!showPassword}
          showPasswordToggle
          onTogglePassword={() => setShowPassword(!showPassword)}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        <CustomInput
          label="Confirm Password"
          placeholder="Enter your password"
          value={formData.confirmPassword}
          onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
          isPassword={!showConfirmPassword}
          showPasswordToggle
          onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
        />
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

        <View style={styles.termsContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setAgreeToTerms(!agreeToTerms)}
          >
            <View style={[styles.checkboxInner, agreeToTerms && styles.checkboxChecked]} />
          </TouchableOpacity>
          <Text style={styles.termsText}>
            I agree to the{' '}
            <Text style={styles.link}>Terms and Conditions</Text> and the{' '}
            <Text style={styles.link}>Privacy Policy.</Text>
          </Text>
        </View>

        <CustomButton title="Create Account" onPress={handleSignUp} />

        <View style={styles.socialContainer}>
          <SocialButton
            icon="facebook-icon-url"
            onPress={() => {/* Handle Facebook login */}}
          />
          <SocialButton
            icon="google-icon-url"
            onPress={() => {/* Handle Google login */}}
          />
          <SocialButton
            icon="apple-icon-url"
            onPress={() => {/* Handle Apple login */}}
          />
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => {/* Handle navigation to login */}}>
            <Text style={styles.loginLink}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#F84C6F',
    textAlign: 'center',
    marginVertical: 20,
  },
  card: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 24,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0A1F44',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  checkboxChecked: {
    backgroundColor: '#F84C6F',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  link: {
    color: '#F84C6F',
    textDecorationLine: 'underline',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
    color: '#666',
  },
  loginLink: {
    fontSize: 16,
    color: '#0A1F44',
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});
