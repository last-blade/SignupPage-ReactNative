import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import SocialButton from '../components/SocialButton';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import DropDownPicker from 'react-native-dropdown-picker';
import PhoneInput from 'react-native-phone-number-input';


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
    countryCode: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false); 
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [countryCode, setCountryCode] = useState('+91');
  const [items, setItems] = useState([
    {label: '+91 (IN)', value: "+91"},
    {label: '+1 (US)', value: "+1"},
    {label: '+16 (UK)', value: "+16"},
    {label: '+13 (FR)', value: "+13"},
    {label: '+42 (JP)', value: "+42"},
    {label: '+11 (AU)', value: "+11"},
    {label: '+22 (BE)', value: "+22"},
    
]);
const [open, setOpen] = useState(false);
const [value, setValue] = useState(null);
const [phone, setPhone] = useState(' ')
  

  const genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ];

  const countryOptions = [
    {label: '+91 (IN)', value: "+91"},
    {label: '+1 (US)', value: "+1"},
    {label: '+16 (UK)', value: "+16"},
    {label: '+13 (FR)', value: "+13"},
    {label: '+42 (JP)', value: "+42"},
    {label: '+11 (AU)', value: "+11"},
    {label: '+22 (BE)', value: "+22"},
  ]
  const maxHeight = open ? 400 : 200;
  const handleNameChange = (text) => {
    const nameRegex = /^[A-Za-z\s]*$/;
    
    if (nameRegex.test(text)) {
      setFormData({ ...formData, name: text });
      setErrors({ ...errors, name: '' });
    } else {
      setErrors({
        ...errors,
        name: 'Name must only contain English letters.',
      });
    }
  };

  const screenWidth = 365
  const [containerWidth, setContainerWidth] = useState(90); // Initial width set to 90

  // Reset container width after selecting an option
  const handleSelect = (value) => {
    setValue(value);
    setOpen(false); // Close the dropdown after selecting an option
  };

  // Effect to reset width after selection
  useEffect(() => {
    if (!open) {
      setContainerWidth(100); // Reset to 90 after closing
    }
  }, [open]); // Trigger when dropdown opens/closes

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
        countryCode,
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

  const handlePhoneChange = (text) => {
    const cleanedText = text.replace(/[^\d]/g, ''); // Keep only numbers
    if (cleanedText.length <= 10) {
      setFormData({ ...formData, phone: cleanedText });
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
          onChangeText={handleNameChange}
          
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        
        <View style={styles.dobContainer}>
          <CustomInput
            label="Date Of Birth"
            placeholder="DD/MM/YYYY"
            value={formData.dateOfBirth}
            editable={false}
            style={styles.dobInput}
            onChangeText={null}
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
          <Text style={styles.label}>Phone No.</Text>
          <PhoneInput
  defaultValue={formData.phone}
  defaultCode="US"
  layout="first"
  onChangeFormattedText={handlePhoneChange}
  containerStyle={styles.phoneInputContainer}
  textContainerStyle={styles.phoneTextContainer}
  label="Phone No."
  placeholder="Enter phone number"
  value={formData.phone}
  placeholderTextColor="black" 
/>
              {/* <CustomInput
              label='Phone No.'
              placeholder="| Enter phone number"
              value={formData.phone}
              onChangeText={(text) => {
                const cleanedText = text.replace(/[^\d]/g, '');
                if (cleanedText.length <= 10) {
                  setFormData({ ...formData, phone: cleanedText });
                }
              }}
              style={[styles.phoneInput]}
            /> */}
      </View>

        
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

        <CustomInput
          label="Password"
          placeholder="Enter your password"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          isPassword={!showPassword}
          showPasswordToggle={formData.password.length > 0}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        <CustomInput
          label="Confirm Password"
          placeholder="Enter your password"
          value={formData.confirmPassword}
          onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
          isPassword={!showConfirmPassword}
          
          onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
          style={{color: "black"}}
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
            onPress={() => {/* */}}
          />
          <SocialButton
            icon="https://imgs.search.brave.com/xj-TV7sqj2Dzi76ov-9LZ-vSQ6x0UYbHi3RFyXksBSY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9nb29nbGUt/aWNvbi0yMDQ4eDIw/NDgtY3puM2c4eDgu/cG5n"
            onPress={() => {""}}
          />
          <SocialButton
            icon="https://imgs.search.brave.com/rXn2LeAuAeK2VqWCWPyD4PaLj3RDr-wDqIB6ChO_AFg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE3LzAy/L0FwcGxlLUxvZ29z/dS01MDB4MjgxLnBu/Zw"
            onPress={() => {/* */}}
          />
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => {/* login kaa navigation lagana hai */}}>
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
    backgroundColor: "#0A2262"
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
    marginTop: 60,
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
  // dobContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginBottom: 20,
  //   width: "100%"
  // },
  // dobInput: {
  //   flex: 1,
  //   paddingRight: 40,
  // },
  dateIconContainer: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
    marginTop: 4,
  },

  dobContainer: {
    position: "relative"
  },


  dateIcon: {
    // position: "absolute",
    width: 20,
    height: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    // marginTop: 5,
    marginBottom: 10,
    bottom: 15
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
    // borderColor: '#E5E5E5',
    
  },
  
  phoneInput: {
    // paddingVertical: 10,
    // paddingRight: 10,
    fontSize: 16,
    flex: 1,
    // paddingHorizontal: 80,
    // paddingLeft: 90,
  },
  
  countryDropdownContainer: {
    position: 'absolute',
    left: -250,
    top: '50%',
    transform: [{ translateY: -48 }],
    zIndex: 10,
    width: 103,
    marginLeft: 250,
  },

  countryDropdown: {
    top: 40
  },







  phoneInputContainer: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 5, 
    marginBottom: 10, 
    width: '100%'
  },

  phoneTextContainer: { 
    paddingVertical: 1, 
    paddingHorizontal: 15, 
  },
});