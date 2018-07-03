import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet  } from 'react-native';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux'

import { connect } from 'react-redux';
import {CustomBtn, CustomInput, PeopleList} from './common';
import { addBill } from '../actions';


class AddBill extends Component {
  state = {
    participated: [{personId: 1, name: 'You'}],
    paid: null,
    amount: 1,
    description: '',
  }

  setSelectedPeopleArray =  (person) => {
    const newArray = this.state.participated.filter(personObj => personObj.personId !== person.personId);
    newArray.push(person);
    this.setState({participated: newArray})
  }

  setPersonWhoPaid =  (person) => {
    this.setState({paid: person.personId});
  }

  getCheckPerPerson = (amount) => {
     this.setState({amount: amount});
  }

  getDescription = (description) => {
     this.setState({description});
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
    console.log('NEW OBJECT CREATED ADD BILL:::', newObj);
    this.props.addBill(newObj);
    Actions.main()
}


  render() {
    return (
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
          <PeopleList
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
            disabled={this.disableButton}
            onPress={() => this.calculateBill()}/>
      </View>
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
  Object.keys(state.bills).map(key => {
    if (key != 1) {
      people[key] = state.bills[key]
    }
  });

  people = _.map(people, (val, personId) => {
    return { ...val[0], personId}
  })

  console.log('PEOPLE FROM BILL:::', people);
  return { people };
}


export default connect(mapStateToProps, {addBill})(AddBill);
