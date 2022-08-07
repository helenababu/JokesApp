import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const JokeCard = (props) => {
    
    const [disabled, setDisabled] = useState(false);

    useEffect(()=> {
        setDisabled(false);
    }, [props.jokeItem])

    return (
        <View style={styles.container}>
            <Text style={styles.item}>{props.jokeItem.joke}</Text>
            <TouchableHighlight style={styles.touchableHighlight} disabled={disabled} onPress={() => {
                    setDisabled(true);
                    props.handleUserAction(props.jokeItem)
                }}>
                <Ionicons name={(props.callingScreen === "Home" && !disabled) ? "bookmark-outline" : "bookmark"} size={30} color={disabled ? "grey" : "black"}/>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        padding: 20,
        paddingBottom: 60,
        borderStyle: "solid",
        borderWidth: 0.5,
        borderColor: "grey",
        borderRadius: 10,
        fontSize: 30,
        backgroundColor: "orange",
        shadowColor: "#171010",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    item: {
        fontSize: 16,
    },
    touchableHighlight: {
        marginTop: 20,
        width: 30,
        position: "absolute",
        right: 20,
        bottom: 20,
    }
})

export default JokeCard;