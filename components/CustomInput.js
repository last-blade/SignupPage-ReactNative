import React from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import PropTypes from 'prop-types';  // Import PropTypes for prop validation

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
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="#A0A0A0"
            value={value}
            onChangeText={onChangeText}
            editable={false}
          />
        ) : (
          <TextInput
            style={styles.input}
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

// PropTypes for prop validation in JavaScript
CustomInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
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
  },
  input: {
    flex: 1,
    height: 48,  // Make sure input fields are the same height
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#0A1F44',
  },
  dropdown: {
    flex: 1,
    height: 48,  // Ensure dropdown height matches text input height
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#0A1F44',
  },
  icon: {
    padding: 12,
  },
  dropdownIcon: {
    fontSize: 16,
    color: '#A0A0A0',
  },
});

export default CustomInput;
