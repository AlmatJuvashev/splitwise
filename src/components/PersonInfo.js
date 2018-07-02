import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Card } from './common';

class PersonInfo extends Component {
  

  wrapper = () => {
    let database =  this.props.data;
    console.log('DATABASE:::', this.props.data);
    let id = this.props.person.item.personId
    console.log('ID:::', id);
    let personData = database[id];
    console.log('PERSON DATA:::', personData);

    if (personData) {
      personData = personData.reduce((acc, next) => {
        if(next.direction === 'ows') {
          acc.ows = next.amount
        } else {
          acc.owed = next.amount
        }
        return acc
      }, {ows: 0, owed: 0})
    }

    console.log('PERSON DATA:::', personData)

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
        <TouchableWithoutFeedback onPress={() => Actions.personData({personId})}>
          <View data={this.wrapper()}>
            <Text style={mainTextStyle}>{name}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => Actions.personData({personId})}>
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
  console.log('BILLS added', state.bills.billMap);
  console.log('People added', state.people);
  newObj = {}
  Object.keys(state.people).map(key => {
    newObj[key]= [{
      name: state.people[key].name, 
      direction: '', 
      amount: null,
      discription: null
    }]
  }) 

  if (_.isEmpty(state.bills.billMap)) {
    console.log('added data')
    return {data: newObj}
  }
  return { data: state.bills.billMap };
}

export default connect(mapStateToProps)(PersonInfo);



