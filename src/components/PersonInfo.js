import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import {withNavigation} from 'react-navigation';

import { connect } from 'react-redux';
import _ from 'lodash';

import { Card } from './common';

class PersonInfo extends Component {
  

  wrapper = () => {
    let database =  this.props.data;
    let id = this.props.person.item.personId
    let personData = database[id];

      personData = personData.reduce((acc, next) => {
        if(next.direction === 'ows') {
          acc.ows += next.amount
        } else if(next.direction === 'owed') {
          acc.owed += next.amount
        }
        return acc
      }, {ows: 0, owed: 0})


    if (_.isNil(personData)) { 
      return {title: '', amount: ''}
    } else if (personData.ows > personData.owed) {
      return {title: 'you owe', amount: personData.ows - personData.owed}
    } else if (personData.ows < personData.owed){
      return {title: 'you are owed', amount: personData.owed - personData.ows}
    } else {
      return {title: 'settled up', amount: ''}
    }

  }

  render() {
    
    const {name, personId} = this.props.person.item
    const { mainTextStyle, secondarySection, textDanger, textGreen } = styles

    const personData = this.wrapper();
  
    return (
      <Card cardStyle={1}>
        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('PersonData', {personId: personId})}>
          <View data={this.wrapper()}>
            <Text style={mainTextStyle}>{name}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('PersonData', {personId: personId})}>
          <View style={secondarySection}>
            <Text style={personData.title === 'ows' ? textDanger : textGreen }>{personData.title}</Text>
            <Text style={personData.title === 'ows' ? textDanger : textGreen }>{personData.amount}</Text>
          </View>
        </TouchableWithoutFeedback>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  mainTextStyle: {
    fontSize: 20
  },
  textDanger: {
    color: 'red'
  },
  textGreen: {
    color: 'green'
  },
  secondarySection: {
    flexDirection: 'column',
  }
})

const mapStateToProps = state => {
  console.log('BILLS added to PERSON INFO', state.bills);
    return { data: state.bills.BillsMap };
}

export default withNavigation(connect(mapStateToProps)(PersonInfo));



