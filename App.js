import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Platform,
  SafeAreaView,
  Switch,
} from 'react-native';

const TIMES = [
  '8:00 AM - 9:00 AM',
  '9:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  // Interval / break here
  '12:30 PM - 1:30 PM',
  '1:30 PM - 2:30 PM',
  '2:30 PM - 3:30 PM',
  '3:30 PM - 4:30 PM',
];

export default function App() {
  const [descriptions, setDescriptions] = useState(Array(8).fill(''));
  const [dateStr, setDateStr] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false); // State to toggle dark mode

  useEffect(() => {
    const today = new Date();
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    setDateStr(today.toLocaleDateString(undefined, options));
    setDescriptions(Array(8).fill('')); // reset for new day
  }, []);

  function updateDescription(index, text) {
    setDescriptions((prev) => {
      const newArr = [...prev];
      newArr[index] = text;
      return newArr;
    });
  }

  const dynamicStyles = isDarkMode ? darkStyles : lightStyles;

  return (
    <SafeAreaView style={dynamicStyles.safe}>
      <View style={dynamicStyles.container}>
        <View style={dynamicStyles.headerRow}>
          <Text style={dynamicStyles.title}>Daily Diary</Text>
          <Text style={dynamicStyles.date}>{dateStr}</Text>
        </View>

        {/* Dark Mode Toggle */}
        <View style={dynamicStyles.switchRow}>
          <Text style={dynamicStyles.switchText}>
            {isDarkMode ? 'Dark Mode' : 'Light Mode'}
          </Text>
          <Switch
            value={isDarkMode}
            onValueChange={(value) => setIsDarkMode(value)}
          />
        </View>

        <ScrollView style={dynamicStyles.table}>
          {[0, 1, 2, 3].map((i) => (
            <View key={i} style={dynamicStyles.row}>
              <View style={dynamicStyles.cellTime}>
                <Text style={dynamicStyles.timeText}>{TIMES[i]}</Text>
              </View>
              <TextInput
                style={dynamicStyles.cellDesc}
                placeholder="Write description"
                placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
                multiline
                value={descriptions[i]}
                onChangeText={(text) => updateDescription(i, text)}
              />
            </View>
          ))}

          <View style={dynamicStyles.intervalRow}>
            <Text style={dynamicStyles.intervalText}>Break / Interval (30 mins)</Text>
          </View>

          {[4, 5, 6, 7].map((i) => (
            <View key={i} style={dynamicStyles.row}>
              <View style={dynamicStyles.cellTime}>
                <Text style={dynamicStyles.timeText}>{TIMES[i]}</Text>
              </View>
              <TextInput
                style={dynamicStyles.cellDesc}
                placeholder="Write description"
                placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
                multiline
                value={descriptions[i]}
                onChangeText={(text) => updateDescription(i, text)}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const lightStyles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  container: {
    flex: 1,
    paddingTop: (Platform.OS === 'android' ? 10 : 0) + 45,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  date: {
    fontSize: 16,
    color: '#666',
    alignSelf: 'center',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  switchText: {
    fontSize: 16,
    color: '#333',
  },
  table: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cellTime: {
    flex: 1,
    backgroundColor: '#4a90e2',
    justifyContent: 'center',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  timeText: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },
  cellDesc: {
    flex: 2,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#222',
    textAlignVertical: 'top',
  },
  intervalRow: {
    backgroundColor: '#ffeb3b',
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 8,
    justifyContent: 'center',
  },
  intervalText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#444',
  },
});

const darkStyles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    paddingTop: (Platform.OS === 'android' ? 10 : 0) + 45,
    paddingHorizontal: 16,
    backgroundColor: '#121212',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  date: {
    fontSize: 16,
    color: '#bbb',
    alignSelf: 'center',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  switchText: {
    fontSize: 16,
    color: '#fff',
  },
  table: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cellTime: {
    flex: 1,
    backgroundColor: '#4a90e2',
    justifyContent: 'center',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  timeText: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },
  cellDesc: {
    flex: 2,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#ddd',
    textAlignVertical: 'top',
  },
  intervalRow: {
    backgroundColor: '#333',
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 8,
    justifyContent: 'center',
  },
  intervalText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#bbb',
  },
});