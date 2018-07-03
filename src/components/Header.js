import React, {Fragment} from 'react';
import { View, Text,  StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';


const wrapper = (props) => {
    
    let database =  props.data;
    let billSummaryArr = [];
  
    billSummaryArr = Object.keys(database).map(key => {
        return database[key].reduce((acc, next) => {
            if (next.direction === 'owed') {
                acc.owed += next.amount
            } else if (next.direction === 'ows') {
                acc.ows += next.amount
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


    return billSummaryArr
}
  



const HeaderComponent = (props) => {
    const dataset = wrapper(props);
    const { mainSection, secondarySection, textGreen, textRed } = styles
    return (
      <View style={mainSection}>
          <View style={secondarySection}>
              <Text>you owe</Text>
              <Text>{dataset.ows}</Text>
          </View>
          <View style={secondarySection}>
              <Text>you are owed</Text>
              <Text>{dataset.owed}</Text>
          </View>
          <View style={secondarySection}>
              <Text>total balance</Text>
              <Text style={dataset.total >= 0 ? textGreen : textRed}>{dataset.total}</Text>
          </View>
      </View>
    );
}
const styles = StyleSheet.create({
    
    mainSection: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginBottom: 10,
    },
    secondarySection: {
      flexDirection: 'column',
      paddingVertical: 10,
      alignItems: 'center',
    },
    textGreen: {
        color: 'green'
    },
    textRed: {
        color: 'red'
    }
  })
  
  const mapStateToProps = state => {
    return { data: state.bills.BillsMap };
  }
  
export default connect(mapStateToProps)(HeaderComponent);
  
