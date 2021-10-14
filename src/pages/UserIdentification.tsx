import React, { useState } from 'react';
import {
    SafeAreaView,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import Button from '../components/Button';

export function UserIdentification() {

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();

    const navigation = useNavigation();

    async function handleSubmit() {
        if (!name)
            return Alert.alert(`Como posso chamar você?`);
        try {
            await AsyncStorage.setItem('@plantmanager:user', name);
            navigation.navigate('Confirmation', {
                title: 'Prontinho',
                subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado',
                buttonTitle: 'Começar',
                icon: 'smile',
                nextScreen: 'PlantSelect',
            });
        } catch {
            Alert.alert(`Não foi possível salvar o seu nome. 😥`);
        }
    };

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!name);
    };

    function handleInputFocus() {
        setIsFocused(true);
    };

    function handleInputChange(value: string) {
        setIsFilled(!!value);
        setName(value);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content} >
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                    {isFilled ? '😁' : '😀'}
                                </Text>
                                <Text style={styles.title}>
                                    Como podemos{'\n'} chamar você?
                                </Text>
                            </View>
                            <TextInput
                                style={[
                                    styles.input,
                                    (isFocused || isFilled) &&
                                    { borderColor: colors.green }
                                ]}
                                placeholder="Digite seu nome"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChange}
                            />
                            <View style={styles.footer}>
                                <Button
                                    title="Confirmar"
                                    onPress={handleSubmit}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    content: {
        flex: 1,
        width: '100%'
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 30
    },
    emoji: {
        fontSize: 44,
        opacity: 0.5
    },
    title: {
        fontFamily: fonts.heading,
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        marginTop: 10
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 17,
        padding: 5,
        textAlign: 'center'
    },
    footer: {
        marginTop: 20,
        width: '100%',
        paddingHorizontal: 20
    }
});
