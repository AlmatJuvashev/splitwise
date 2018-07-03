import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView  } from 'react-native';
import _ from 'lodash';


import { connect } from 'react-redux';
import {CustomBtn, CustomInput, PeopleList, PeopleListBills} from './common';
import { addBill } from '../actions';


class AddBill extends Component {

  state = {
    participated: [{personId: 1, name: 'You', checked: false, selected: true}],
    paid: null,
    amount: 1,
    description: '',
    disableButton: true
  }

  static navigationOptions = {
    title: 'Add a person',
  };

  setSelectedPeopleArray =  (person) => {
    const newArray = this.state.participated.filter(personObj => personObj.personId !== person.personId);
    newArray.push(person);
    this.setState({participated: newArray})
  }

  setPersonWhoPaid =  (person) => {
    // Change participated state
    const newParticipatedArr = this.state.participated.map(item => {
      if (item.personId === person.personId) {
        return {...item, checked: true}
      } 
      return {...item, checked: false }
    })

    // Find person who paid
    this.setState({paid: person.personId, participated: newParticipatedArr});
  }

  getCheckPerPerson = (amount) => {
     this.setState({amount: amount}); 
     if(this.state.description.length > 1 ) {
      this.setState({disableButton: false}); 
     }
  }

  getDescription = (description) => {
     this.setState({description});
     if(this.state.amount > 0 ) {
      this.setState({disableButton: false}); 
     }
  }

  
  calculateBill = () => {

    let chequePerPerson = Math.floor(this.state.amount/this.state.participated.length)
    let newArray = this.state.participated
      .map(person => {
        person.amount = chequePerPerson;
        return person
      })
      .map(person => {
        person.description = this.state.description;
        return person
      })
    
    if (this.state.paid === 1) {
      newArray = newArray.map(person => {
        person.direction = 'owed';
        return person
      })
        .filter(person => person.personId !== 1)
    } else {
      newArray = newArray
        .map(person => {
        person.direction = 'ows';
        return person
        })
        .filter(person => person.personId === this.state.paid)
    }

    newObj = _.keyBy(newArray, 'personId');
    this.props.addBill(newObj);
    this.props.navigation.goBack();
}


  render() {
    console.log('STATE-BILL:::', this.state.paid)
    return (
      <KeyboardAvoidingView
        behavior="position"
        contentContainerStyle={{ flex: 1 }}
        style={{ flex: 1 }}>
        <View>
          <Fragment>
            <Text style={styles.paragraph}>Involved Friends</Text>
            <PeopleList 
              checkBoxColor='red' 
              peopleArr={this.props.people}
              getPerson={(person) => this.setSelectedPeopleArray(person)}
          />
          </Fragment>
          <Fragment>
            <Text style={styles.paragraph}>Who paid?</Text>
            <PeopleListBills
                checkBoxColor='green' 
                peopleArr={this.state.participated}
                getPerson={(person) => this.setPersonWhoPaid(person)}
            />
          </Fragment>
          <CustomInput 
            placeholder="Bill"
            onChangeText={(value) => this.getCheckPerPerson(parseInt(value))}/>
            <CustomInput 
            placeholder="Description"
            onChangeText={(value) => this.getDescription(value)}/>

          <CustomBtn 
              name="Calculate the Bill"
              raised={true}
              disabled={this.state.disableButton}
              onPress={() => this.calculateBill()}/>
        </View>
      </KeyboardAvoidingView>
    );
  }
}


const styles = StyleSheet.create({
  paragraph: {
    marginTop: 10,
    marginBottom: 5,
    color: "#A9A9A9",
    marginHorizontal: 20,
  }
})

const mapStateToProps = state => {
  
  let people = {}
  Object.keys(state.bills.BillsMap).map(key => {
    if (key != 1) {
      people[key] = state.bills.BillsMap[key]
    }
  });

  people = _.map(people, (val, personId) => {
    return { ...val[0], personId}
  })

  people = people.map(item => {
    return {...item, selected: false}
  })
  return { people };
}


export default connect(mapStateToProps, {addBill})(AddBill);
