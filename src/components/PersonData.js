import React, { Component, Fragment } from 'react';
import { View, Text  } from 'react-native';
import { connect } from 'react-redux'

import {Card} from './common';

class PersonData extends Component {

  displayPersonInfo = () => {
    const personObjArr = this.props.data[this.props.personId];
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

  return { data: state.bills };
}

export default connect(mapStateToProps)(PersonData);

