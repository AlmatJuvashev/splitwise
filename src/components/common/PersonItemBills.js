import React, { Component } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
//import {ListItem, CheckBox, Body} from 'native-base';
import { ListItem } from 'react-native-elements'


class PersonItemBill extends Component {
    state = {
        hideChevron: this.props.data.checked,
    }

    onPress =  ({name, personId}) => {
        this.props.getPerson({name, personId, checked: true});
    }
    
    render () {
        const {name, personId, checked } = this.props.data;
        const {checkBoxColor} = this.props;
        const IconObject = {name: 'check', color: checkBoxColor}
        console.log('Name:::', name, 'ID:::', personId, 'Checked::::',this.props.data.checked)
        return (
            <View>
                <TouchableWithoutFeedback onPress={() => this.onPress({name, personId})}>
                  <ListItem
                          key={personId}
                          title={name}
                          rightIcon={IconObject}
                          hideChevron={!checked}
                      />
                  </TouchableWithoutFeedback>
            </View>
          );
    }
}

const styles = StyleSheet.create({
    personItemStyle: {
        borderBottomWidth: 0,
    }
})

export {PersonItemBill}
