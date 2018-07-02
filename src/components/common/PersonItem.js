import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
//import {ListItem, CheckBox, Body} from 'native-base';
import { ListItem } from 'react-native-elements'

let HideShevron = true;




class PersonItem extends Component {
    state = {
        hideChevron: true
    }

    onPress = async ({personName, personId}) => {
        await this.setState({hideChevron: !this.state.hideChevron})
        if (!this.state.hideChevron) {
            this.props.getPerson({name: personName, personId});
        }
        
    }
    
    render () {
        const {personName, personId} = this.props;
        const IconObject = {name: 'check', color: 'green'}
        return (
            <View>
              {/* <ListItem>
                  <CheckBox checked={true} />
                      <Body>
                          <Text>{personName}</Text>
                      </Body>
                </ListItem> */}
                <TouchableWithoutFeedback onPress={() => this.onPress({personName, personId})}>
                  <ListItem
                          key={personId}
                          title={personName}
                          rightIcon={IconObject}
                          hideChevron={this.state.hideChevron}
                      />
                  </TouchableWithoutFeedback>
            </View>
          );
    }
}

export {PersonItem}
