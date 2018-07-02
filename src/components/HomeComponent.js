import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Icon, Fab } from 'native-base';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import _ from 'lodash';

import {CustomBtn} from './common';
import PersonInfo from './PersonInfo';
import HeaderComponent from './Header';

console.disableYellowBox = true; // Diable Yellow Box

class HomeComponent extends Component {
  onAddFriends = () => {
    Actions.addPerson()
  }

  renderPerson = (person) => {
    console.log('Person from render list ', person);
    return <PersonInfo person={person} />
  }

  renderPeopleList = (peopleArr) => {
    console.log('Render list',peopleArr);
    return (
      <FlatList 
      data={peopleArr}
      renderItem={this.renderPerson}
      keyExtractor={(item) => item.personId.toString()}
  />
    )
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent:"flex-start"}}>
        <HeaderComponent />
        {this.renderPeopleList(this.props.people)}
        <CustomBtn 
          name="Add Friends"
          raised={true}
          disabled={false}
          onPress={this.onAddFriends.bind(this)}/>
          <Fab 
              position='bottomRight'
              style={{backgroundColor: '#5067FF'}}
              onPress={() => Actions.addBill()}> 
              <Text>Go</Text>
          </Fab>
      </View>
    );
  }
}

const mapStateToProps = state => {

  const people = _.map(state.people, (val, personId) => {
    return { ...val, personId}
  })

  return { people };
}

export default connect(mapStateToProps)(HomeComponent);

