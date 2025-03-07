import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
    return <Image source={require('../assets/noticeboard.png')} style={styles.image} />
}

const styles = StyleSheet.create({
    image: {
        width: 210,
        height: 210,
        marginBottom: 8,
    },
})