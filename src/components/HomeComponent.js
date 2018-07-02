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
    return <PersonInfo person={person} />
  }

  renderPeopleList = (peopleArr) => {
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
          <View style={{flex: 1}}>
            <Fab 
                position='bottomRight'
                style={{backgroundColor: '#5067FF'}}
                onPress={() => Actions.bill()}> 
            <Icon name="add" style={{color: 'yellowgreen', fontSize: 30}} />
            </Fab>
          </View>
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

