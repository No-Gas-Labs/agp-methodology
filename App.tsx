import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';

export default function App() {
  const [status, setStatus] = useState({
    agp: 'IDLE',
    arena: 'READY',
    ninja: 'IDLE',
    defi: 'IDLE',
  });

  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setLog((prev) => [`[${time}] ${msg}`, ...prev].slice(0, 50));
  };

  const handleControl = (system: string, action: string) => {
    setStatus((prev) => ({ ...prev, [system]: 'ACTIVE' }));
    addLog(`${system.toUpperCase()} → ${action}`);

    Alert.alert(`${system.toUpperCase()}`, `${action} initiated`, [{ text: 'OK' }]);

    setTimeout(() => {
      setStatus((prev) => ({ ...prev, [system]: 'IDLE' }));
      addLog(`${system.toUpperCase()} → Complete`);
    }, 2000);
  };

  const getStatusColor = (stat: string) => {
    switch (stat) {
      case 'ACTIVE':
        return '#00ff00';
      case 'READY':
        return '#00ccff';
      case 'ERROR':
        return '#ff0000';
      default:
        return '#888';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎮 AGP COMMAND CENTER</Text>
        <Text style={styles.subtitle}>{new Date().toLocaleTimeString()}</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* AGP Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>🎙️ AGP PODCAST</Text>
            <View style={[styles.dot, { backgroundColor: getStatusColor(status.agp) }]} />
          </View>
          <Text style={styles.status}>Status: {status.agp}</Text>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => handleControl('agp', 'START BROADCAST')}
            >
              <Text style={styles.btnText}>▶ START</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: '#cc0000' }]}
              onPress={() => handleControl('agp', 'STOP BROADCAST')}
            >
              <Text style={styles.btnText}>⏹ STOP</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ARENA Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>🧠 THE ARENA</Text>
            <View style={[styles.dot, { backgroundColor: getStatusColor(status.arena) }]} />
          </View>
          <Text style={styles.status}>Status: {status.arena}</Text>
          <TouchableOpacity
            style={styles.fullBtn}
            onPress={() => handleControl('arena', 'ANALYZE')}
          >
            <Text style={styles.btnText}>🔄 ANALYZE</Text>
          </TouchableOpacity>
        </View>

        {/* NINJA Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>⚡ NINJA AGENTS</Text>
            <View style={[styles.dot, { backgroundColor: getStatusColor(status.ninja) }]} />
          </View>
          <Text style={styles.status}>Status: {status.ninja}</Text>
          <TouchableOpacity
            style={styles.fullBtn}
            onPress={() => handleControl('ninja', 'EXECUTE')}
          >
            <Text style={styles.btnText}>⚙️ EXECUTE</Text>
          </TouchableOpacity>
        </View>

        {/* DEFI Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>💰 DEFI EXECUTION</Text>
            <View style={[styles.dot, { backgroundColor: getStatusColor(status.defi) }]} />
          </View>
          <Text style={styles.status}>Status: {status.defi}</Text>
          <TouchableOpacity
            style={styles.fullBtn}
            onPress={() => handleControl('defi', 'EXECUTE TRADE')}
          >
            <Text style={styles.btnText}>💸 TRADE</Text>
          </TouchableOpacity>
        </View>

        {/* Log */}
        <View style={styles.logCard}>
          <Text style={styles.logTitle}>📋 LOG</Text>
          {log.map((entry, idx) => (
            <Text key={idx} style={styles.logEntry}>
              {entry}
            </Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e27',
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#00ff00',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ff00',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#888',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  card: {
    borderWidth: 2,
    borderColor: '#00ff00',
    backgroundColor: '#0f1535',
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00ff00',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  status: {
    fontSize: 12,
    color: '#00ccff',
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
  },
  btn: {
    flex: 1,
    backgroundColor: '#00ff00',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  fullBtn: {
    backgroundColor: '#00ff00',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  btnText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  logCard: {
    borderWidth: 2,
    borderColor: '#00ff00',
    backgroundColor: '#0f1535',
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  logTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00ff00',
    marginBottom: 10,
  },
  logEntry: {
    fontSize: 10,
    color: '#00ccff',
    marginBottom: 5,
    fontFamily: 'monospace',
  },
});
