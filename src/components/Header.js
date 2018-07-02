import React from 'react';
import { View, Text,  StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';


const wrapper = () => {
    console.log('DATA is ADDED ',this.props.data)
    if (_.isEmpty(this.props.data)) {
        return {ows: 0, owed: 0}
    }
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
      return {ows: 0, owed: 0};
    } else {
      return personData
    }
  }



const HeaderComponent = () => {
    dataset = wrapper();
    return (
      <View>
          <Fragment>
              <Text>you owe</Text>
              <Text>{dataset.ows}</Text>
          </Fragment>
          <Fragment>
              <Text>you are owed</Text>
              <Text>{dataset.owed}</Text>
          </Fragment>
          <Fragment>
              <Text>Total balance</Text>
              <Text>{dataset.owed - dataset.ows}</Text>
          </Fragment>
      </View>
    );
}
const styles = StyleSheet.create({
    cardStyle: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
      marginHorizontal: 10,
      borderWidth: 1,
      borderRadius: 2,
      borderColor: '#ddd',
      borderBottomWidth: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 2,
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
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
    return { data: state.bills.billMap };
  }
  
export default connect(mapStateToProps)(HeaderComponent);
  
