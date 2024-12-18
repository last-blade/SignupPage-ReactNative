import React from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

export default function CustomInput({
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
}) {
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
}

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
    height: 48,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#0A1F44',
  },
  dropdown: {
    flex: 1,
    height: 48,
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
