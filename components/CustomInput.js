import React from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import PropTypes from 'prop-types';

const CustomInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  type = 'text',
  isPassword,
  showPasswordToggle,
  onTogglePassword,
  showCalendar,
  onCalendarPress,
  showDropdown,
  onDropdownPress,
  data,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {type === 'dropdown' ? (
          <Dropdown
            style={styles.dropdown}
            containerStyle={{
              // position: 'absolute',
              // zIndex: 10, 
              top: -65
            }}
            data={data || []}
            labelField="label"
            valueField="value"
            value={value}
            onChange={item => {
              onSelect && onSelect(item.value);
            }}
            placeholder={placeholder}
          />
        ) : type === 'date' ? (
          <TextInput
          style={[styles.input, { color: 'black' }]}
            placeholder={placeholder}
            placeholderTextColor="#A0A0A0"
            value={value}
            onChangeText={onChangeText}
            editable={false}
          />
        ) : (
          <TextInput
          style={[styles.input, { color: 'black' }]}
            placeholder={placeholder}
            placeholderTextColor="#A0A0A0"
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={isPassword}
            
          />
        )}

        {/* Icons for password toggle and calendar */}
        {showPasswordToggle && (
          <TouchableOpacity onPress={onTogglePassword} style={styles.icon}>
            {/* <Eye size={20} color="#A0A0A0" /> */}
            {/* <Text style={{color: "blue"}}>{isPassword ? 'Show' : 'Hide'}</Text> */}
            {isPassword ? <Image style={styles.eyeicon} source={require('../visible.png')} /> : <Image style={styles.eyeicon} source={require('../hide.png')} />} 
          </TouchableOpacity>
        )}
        {showCalendar && (
          <TouchableOpacity onPress={onCalendarPress} style={styles.icon}>
            {/* <Calendar size={20} color="#A0A0A0" /> */}
          </TouchableOpacity>
        )}
        {showDropdown && (
          <TouchableOpacity onPress={onDropdownPress} style={styles.icon}>
            <Text style={styles.dropdownIcon}>▼</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

CustomInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func,
  type: PropTypes.oneOf(['text', 'password', 'date', 'dropdown']),
  isPassword: PropTypes.bool,
  showPasswordToggle: PropTypes.bool,
  onTogglePassword: PropTypes.func,
  showCalendar: PropTypes.bool,
  onCalendarPress: PropTypes.func,
  showDropdown: PropTypes.bool,
  onDropdownPress: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  onSelect: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#0A1F44',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    backgroundColor: 'white',
    position: "relative",
  },
  input: {
    flex: 1,
    height: 48,  
    paddingHorizontal: 16,
    fontSize: 16,
  },
  dropdown: {
    flex: 1,
    height: 48,  
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#0A1F44',
    // borderWidth: 2
  },
  icon: {
    padding: 12,
    // backgroundColor: "red"
  },
  dropdownIcon: {
    fontSize: 16,
    color: '#A0A0A0',
  },

  eyeicon: {
    width: 20,
    height: 20
  }
});

export default CustomInput;
