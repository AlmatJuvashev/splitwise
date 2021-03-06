import React, { Component } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
//import {ListItem, CheckBox, Body} from 'native-base';
import { ListItem } from 'react-native-elements'




class PersonItem extends Component {
    state = {
        hideChevron: true,
    }
    selected = false
    onPress = async ({name, personId}) => {
        this.selected = !this.selected;
        await this.setState({hideChevron: !this.state.hideChevron})
        this.props.getPerson({name, personId, checked: false, selected: this.selected});     
    }
    
    render () {
        const {checkBoxColor} = this.props;
        const {name, personId} = this.props.data;
        const IconObject = {name: 'check', color: checkBoxColor}
        return (
            <View>
                <TouchableWithoutFeedback onPress={() => this.onPress({name, personId})}>
                  <ListItem
                          key={personId}
                          title={name}
                          rightIcon={IconObject}
                          hideChevron={this.state.hideChevron}
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

export {PersonItem}
