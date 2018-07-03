import React, { Component, Fragment } from 'react';
import { View, Text  } from 'react-native';
import { connect } from 'react-redux'

import {Card} from './common';

class PersonData extends Component {

  displayPersonInfo = () => {
    let id = this.props.navigation.getParam('personId', '');
    let personArr = this.props.data[id];
    
    let personObjArr = personArr.filter(person => person.direction !== 'tie');
    
    return personObjArr.map((obj) => {
        return (
          <View>
            <Card cardStyle={2}>
              <Text>{obj.description}</Text>
              <View>
                <Text>{obj.amount}</Text>
                <Text>{obj.direction}</Text>
              </View>
            </Card>
          </View>
        )
    });
  }
  
  render() {

    return (
      <Fragment>
        {this.displayPersonInfo()}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  console.log('PERSON DATA:::', state.bills.BillsMap)
  return { data: state.bills.BillsMap };
}

export default connect(mapStateToProps)(PersonData);

