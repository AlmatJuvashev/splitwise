import React, {Fragment} from 'react';
import { View, Text,  StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';


const wrapper = (props) => {
    
    let database =  props.data;
    let billSummaryArr = [];
  
    console.log('DATABASE:::', database);
    console.log('Keys', Object.keys(database));

    billSummaryArr = Object.keys(database).map(key => {
        console.log('Key', key);
        return database[key].reduce((acc, next) => {
            if (next.direction === 'owed') {
                acc.owed = next.amount
            } else if (next.direction === 'ows') {
                acc.ows = next.amount
            } 
            acc.total = acc.owed - acc.ows;
            return acc
        }, {owed: 0, ows: 0 })
    })
    .reduce((acc, next) => {
        acc.owed += next.owed;
        acc.ows += next.ows;
        acc.total += (next.owed - next.ows) ;
        return acc
    }, {owed: 0, ows: 0, total: 0})
    console.log(billSummaryArr);

    return billSummaryArr
}
  



const HeaderComponent = (props) => {
    dataset = wrapper(props);
    return (
      <View style={{flexDirection:'row'}}>
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
              <Text>{dataset.total}</Text>
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
  
