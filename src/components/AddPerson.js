import React, { Component } from 'react';
import { View, Text,  } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import {CustomBtn, CustomInput} from './common';
import { personUpdate } from '../actions';



class AddPerson extends Component {
  
  personName = ''
  disableButton = false
  onAddPerson = () => {
    this.props.personUpdate({personId: new Date().getTime(), name: this.personName});
    Actions.main()
  }

  onChangeText = (name) => {
    this.personName = name
    this.disableButton = false
  }


  render() {
    
    return (
      <View>
        <Text> Hello From AddPerson </Text>
        <CustomInput 
          title="Add your friend"
          placeholder="e.g. Almat"
          onChangeText={this.onChangeText.bind(this)}/>

        <CustomBtn 
            name="Add a Friend"
            raised={true}
            disabled={this.disableButton}
            onPress={this.onAddPerson.bind(this)}/>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return state.people
}

export default connect(mapStateToProps, {personUpdate})(AddPerson);
