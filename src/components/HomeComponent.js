import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Icon, Fab } from 'native-base';

import { connect } from 'react-redux';
import _ from 'lodash';

import {CustomBtn} from './common';
import PersonInfo from './PersonInfo';
import HeaderComponent from './Header';

console.disableYellowBox = true; // Diable Yellow Box

class HomeComponent extends Component {
  static navigationOptions = {
    title: 'Splitwise',
  };

  onAddFriends = () => {
    this.props.navigation.navigate('AddPerson');
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
                onPress={() => this.props.navigation.navigate('AddBill')}> 
            <Icon name="add" style={{color: 'yellowgreen', fontSize: 30}} />
            </Fab>
          </View>
      </View>
    );
  }
}

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

  return { people };
}

export default connect(mapStateToProps)(HomeComponent);

