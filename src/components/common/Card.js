import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = (props) => {
    const { cardStyle1, cardStyle2} = styles;

    return (
        <View style={props.cardStyle === 1 ? cardStyle1 : cardStyle2}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    cardStyle1: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
      marginHorizontal: 10,
      borderBottomWidth: 2,
      borderRadius: 2,
      borderBottomColor: 'darkblue',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 2,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    cardStyle2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        marginHorizontal: 10,
        borderWidth: 1,
        borderRadius: 2,
        borderBottomColor: 'darkblue',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        paddingHorizontal: 10,
        paddingVertical: 5,
      }
  })

export { Card };