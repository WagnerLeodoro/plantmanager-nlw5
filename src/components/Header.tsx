import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import userImg from '../assets/woman.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header() {
    const [userName, setUserName] = useState<string>();

    useEffect(() => {
        async function loadStorageUserName() {
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setUserName(user || '');
        }
        loadStorageUserName();
    }, [userName]);

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View>
                    <Text style={styles.greeting}>Olá,</Text>
                    <Text style={styles.userName}>
                        {userName}
                    </Text>
                </View>
                <Image source={userImg} style={styles.image} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: 10
    },
    greeting: {
        fontFamily: fonts.text,
        fontSize: 32,
        color: colors.heading,
    },
    userName: {
        fontFamily: fonts.heading,
        fontSize: 32,
        color: colors.heading,
        lineHeight: 40,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 40,
        backgroundColor: colors.green,
    },
});
