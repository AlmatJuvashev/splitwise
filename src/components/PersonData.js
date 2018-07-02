import React, { Component } from 'react';
import { View, Text, FlatList  } from 'react-native';

class PersonData extends Component {
  render() {
    console.log(this.props)
    return (
     <Text>Hello From PersonData</Text>
    );
  }
}

export default PersonData;
