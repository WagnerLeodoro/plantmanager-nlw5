import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Animated from 'react-native-reanimated';
import { SvgFromUri } from 'react-native-svg';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantsProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
        hour: string;
    };
    handleRemove: () => void;
}

export const PlantCardSecondary = ({ data, handleRemove, ...rest }: PlantsProps) => {
    return (
        <Swipeable
            overshootRight={false}
            renderRightActions={() => (
                <Animated.View>
                    <RectButton style={styles.buttonRemove} onPress={handleRemove}>
                        <Feather name="trash" size={32} color={colors.white} />
                    </RectButton>
                </Animated.View>
            )}
        >
            <RectButton style={styles.container}
                {...rest}
            >
                <SvgFromUri
                    uri={data.photo}
                    width={50}
                    height={50}

                />
                <Text style={styles.title}>
                    {data.name}
                </Text>
                <View style={styles.details}>
                    <Text style={styles.timeLabel}>
                        Regar às
                    </Text>
                    <Text style={styles.time}>
                        {data.hour}
                    </Text>

                </View>
            </RectButton>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    buttonRemove: {
        width: 100,
        paddingHorizontal: 25,
        paddingVertical: 30,
        borderRadius: 20,
        backgroundColor: colors.red,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        right: 5,
        paddingLeft: 25
    },
    container: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.shape,
        marginVertical: 5,
    },
    title: {
        flex: 1,
        marginLeft: 10,
        fontFamily: fonts.heading,
        fontSize: 17,
        color: colors.heading
    },
    details: {
        alignItems: 'flex-end'
    },
    timeLabel: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.body_light
    },
    time: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.body_dark
    }
})
