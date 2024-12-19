import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import SocialButton from '../components/SocialButton';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker'; 


export default function SignUpScreen() {
  const navigation = useNavigation();
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
  const [showDatePicker, setShowDatePicker] = useState(false); 
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [countryCode, setCountryCode] = useState('+91');
  

  const genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ];

  const countryOptions = [
    {label: '+91', value: "+91"},
    {label: '+1 ', value: "+1"},
    {label: '+16 ', value: "India"},
    {label: '+133 ', value: "India"},
    {label: '+42 ', value: "India"},
    {label: '+119 ', value: "India"},
    {label: '+122 ', value: "India"},
  ]

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
    if (!formData.phone || !phoneRegex.test(formData.phone) || formData.phone.length < 10 || formData.phone.length > 10) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\W).{8,}$/;
    if (!formData.password || !passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long, contain at least one uppercase letter and one special character.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.dateOfBirth || !dobRegex.test(formData.dateOfBirth)) {
      newErrors.dateOfBirth = 'Please enter a valid date in the format DD/MM/YYYY.';
    }

    if (!agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms and Conditions and Privacy Policy.';
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
      navigation.navigate('UserDetails', { user: formData });

      
      setFormData({
        name: '',
        dateOfBirth: '',
        gender: 'Other',
        genderSpecify: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      });
      setErrors({});
      setAgreeToTerms(false); 
    }
  };

  const handleDateOfBirthChange = (event, selectedDate) => {
    setShowDatePicker(false); 
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString('en-GB'); 
      setFormData({ ...formData, dateOfBirth: formattedDate });
    }
  };

  
  const openLink = (url) => {
    Linking.openURL(url);
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

        
        <View style={styles.dobContainer}>
          <CustomInput
            label="Date Of Birth"
            placeholder="DD/MM/YYYY"
            value={formData.dateOfBirth}
            editable={false}
            style={styles.dobInput}
          />
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateIconContainer}>
            <Image
              source={{ uri: 'https://imgs.search.brave.com/vYb1yAVLCTz6z04oWcB_cc6iAvo1htOIpxkIYFjTOvo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3Lzk3LzE4LzQ1/LzM2MF9GXzc5NzE4/NDUxOV8wakhvQjVZ/VGRvQ2VUazVSNEFt/OVlwQ1VOUTJsemFZ/RC5qcGc' }}
              style={styles.dateIcon}
            />
          </TouchableOpacity>
        </View>
        {errors.dateOfBirth && <Text style={styles.errorText}>{errors.dateOfBirth}</Text>}

       
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateOfBirthChange}
            maximumDate={new Date()} 
          />
        )}

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

        <View style={styles.phoneFieldContainer}>
  <View style={styles.countryDropdownContainer}>
    <CustomInput
      type="dropdown"
      placeholder="Select Country Code"
      value={countryCode}
      onSelect={(value) => setCountryCode(value)}
      data={countryOptions}
      style={[styles.countryDropdown]}
    />
  </View>
  <CustomInput
    placeholder="Enter phone number"
    value={formData.phone}
    onChangeText={(text) =>
      setFormData({ ...formData, phone: text.replace(/[^\d+\(\)\-\s]/g, '') })
    }
    style={styles.phoneInput}
  />
</View>

        
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
            By signing up, you agree to our{' '}
            <Text style={styles.link} onPress={() => openLink('https://www.example.com/terms')}>
              Terms and Conditions
            </Text>{' '}
            and{' '}
            <Text style={styles.link} onPress={() => openLink('https://www.example.com/privacy')}>
              Privacy Policy
            </Text>
          </Text>
        </View>
        {errors.agreeToTerms && <Text style={styles.errorText}>{errors.agreeToTerms}</Text>}

        <CustomButton title="Create Account" onPress={handleSignUp} />

        <View style={styles.socialContainer}>
          <SocialButton
            icon="https://imgs.search.brave.com/cwnxLnWTaI9VhUw1ZTsedEpK7TmtN7ffCsO4TcPTHuI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9mYWNlYm9v/ay1pY29uLTI1Nngy/NTYtb3FhM3lnYTYu/cG5n"
            onPress={() => {/* Handle Facebook login */}}
          />
          <SocialButton
            icon="https://imgs.search.brave.com/xj-TV7sqj2Dzi76ov-9LZ-vSQ6x0UYbHi3RFyXksBSY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9nb29nbGUt/aWNvbi0yMDQ4eDIw/NDgtY3puM2c4eDgu/cG5n"
            onPress={() => {""}}
          />
          <SocialButton
            icon="https://imgs.search.brave.com/rXn2LeAuAeK2VqWCWPyD4PaLj3RDr-wDqIB6ChO_AFg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE3LzAy/L0FwcGxlLUxvZ29z/dS01MDB4MjgxLnBu/Zw"
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
    marginTop: 30,
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
  dobContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dobInput: {
    flex: 1,
    paddingRight: 40,
  },
  dateIconContainer: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
    marginTop: 4,
  },
  dateIcon: {
    width: 20,
    height: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginBottom: 10,
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

  phoneFieldContainer: {
    // position: 'relative',
    // borderWidth: 1,
    // borderColor: '#E5E5E5',
    // borderRadius: 8,
    marginBottom: 20,
    // backgroundColor: '#FFF',
    paddingLeft: 63, // Ensure padding accounts for the dropdown width
  },
  
  phoneInput: {
    paddingVertical: 10,
    paddingRight: 10,
    fontSize: 16,
    flex: 1,
  },
  
  countryDropdownContainer: {
    position: 'absolute',
    left: -250,
    top: '50%',
    transform: [{ translateY: -48 }], // Center the dropdown vertically
    zIndex: 10,
    width: 76,
    marginLeft: 250,
  },
  
});
