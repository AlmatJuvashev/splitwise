import React  from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const CustomBtn = (props) => {
    const {name, raised, disabled, onPress} = props;
    const {styleBtn, disabledBtn} = styles;
    return (
        <Button 
            buttonStyle={styleBtn}
            disabledStyle={disabledBtn}
            raised={raised}
            disabled={disabled}
            title={name}
            onPress={onPress}/>
    )
}

const styles = StyleSheet.create({
    styleBtn: {
        backgroundColor: '#00E228',
        marginTop: 15
    },
    disabledBtn: {
        backgroundColor: '#B6B4B6',
        // color: '#BBB9BC'
    }
})
export {CustomBtn};