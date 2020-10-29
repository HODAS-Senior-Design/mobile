import React, { useContext } from 'react';
import {
    Text, View, TouchableOpacity, StyleSheet
} from 'react-native';

import { color } from '../../functions/providers/ColorContext';

export default function Recent(props) {
    const { navigation } = props;

    return (
        <View style={styles.container}>
            <Text>Recent</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('Journal')}
                style={styles.button}
            >
                <Text>Journal</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        height: 100,
        width: 100,
        backgroundColor: color.primary
    }
});