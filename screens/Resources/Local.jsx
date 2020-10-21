import React from 'react';
import {
    Text, View, TouchableOpacity, StyleSheet
} from 'react-native';

import { color } from '../../functions/providers/ColorContext';

export default function Local(props) {
    const { navigation } = props;
    return (
        <View style={styles.container}>
            <Text>Local</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
        alignItems: "center",
        justifyContent: "center"
    }
  });