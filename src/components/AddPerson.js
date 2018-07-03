import React, { Component } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import {CustomBtn, CustomInput} from './common';
import { personUpdate, addPerson } from '../actions';



class AddPerson extends Component {
  static navigationOptions = {
    title: 'Add a person',
  };
  
  state = {
    disabledButton: true,
    personName: ''
  }



  onAddPerson = () => {
    this.props.personUpdate({personId: new Date().getTime(), name: this.state.personName});
    this.props.addPerson({
      personId: new Date().getTime(), 
      name: this.state.personName,
    });

    this.props.navigation.goBack();
  }

  onChangeText = async (name) => {
    await this.setState({personName: name});
    if(this.state.personName.length > 2) {
      this.setState({disabledButton: false})
    }
  }


  render() {
    
    return (
      <KeyboardAvoidingView
        behavior="position"
        contentContainerStyle={{ flex: 1 }}
        style={{ flex: 1 }}>
        <View style={styles.mainContainer}>
          <CustomInput 
            title="Add your friend"
            placeholder="e.g. Almat"
            onChangeText={this.onChangeText.bind(this)}/>

          <CustomBtn 
              name="Add a Friend"
              raised={true}
              disabled={this.state.disabledButton}
              onPress={this.onAddPerson.bind(this)}/>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  }
});
const mapStateToProps = state => {
  return state.people
}

export default connect(mapStateToProps, {personUpdate, addPerson})(AddPerson);
