import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

import { color } from "../../functions/providers/ColorContext";

export default function Intro(props) {
  const { navigation } = props;

  return (
    <View style={{ ...styles.container, backgroundColor: color.primary}}>
      <Text style={styles.headerText}>SSW 423 - Senior Design</Text>
      <Text style={styles.subHeaderText}>Mental Health Journaling Application</Text>
      <View style={{ height: 50 }} />
      <Text style={styles.bodyText}>Contributors: Angie, Brittany, Eric, Hayden, John, Olivia, and Scott</Text>
      <View style={{ height: 50 }} />
      <TouchableOpacity onPress={() => navigation.navigate("Name")}>
        <View style={{ ...styles.button, backgroundColor: color.background}}>
          <Text>Enter!</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: 50,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  headerText: {
    fontSize: 24
  },
  subHeaderText: {
    fontSize: 20
  },
  bodyText: {
    fontSize: 15,
    textAlign: 'center',
    width: '75%'
  }
});
