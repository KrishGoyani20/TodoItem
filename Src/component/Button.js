import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { color } from '../utils/Theme';

export const Button = ({ title, onPress, image }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
            {image && <Image source={image} style={styles.icon} />}
        </TouchableOpacity>
    );
};



const styles = StyleSheet.create({
    button: {
        backgroundColor: color.F7D26A,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    },
    text: {
        color: color.BGD2F3,
        fontSize: 16,
        fontWeight: 700,
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginRight: 10,
    },
});

