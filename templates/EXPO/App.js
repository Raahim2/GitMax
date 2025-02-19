import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Image } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [theme, setTheme] = useState("light");

  const handlePress = () => {
    Linking.openURL("https://gitmax.vercel.app");
  };

  return (
    <View style={[styles.container, theme === "dark" ? styles.darkMode : styles.lightMode]}>
      {/* Gitmax Logo */}
      <Image source={require('./assets/favicon.png')} style={styles.logo} />

      <Text style={styles.title}>Welcome to Gitmax 🚀</Text>
      <Text style={styles.subtitle}>Automate your app development effortlessly.</Text>

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Start Automating</Text>
      </TouchableOpacity>

      <StatusBar style={theme === "dark" ? "light" : "dark"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  darkMode: {
    backgroundColor: '#121212',
  },
  lightMode: {
    backgroundColor: '#f5f5f5',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007bff',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
