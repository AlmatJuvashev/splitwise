import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk'
import { createStackNavigator } from 'react-navigation';

import HomeComponent from './components/HomeComponent';
import AddBill from './components/AddBill';
import AddPerson from './components/AddPerson';
import PersonInfo from './components/PersonInfo';
import PersonData from './components/PersonData';


import RouterComponent from './Router';
import reducers from './reducers';

class App extends Component {

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <AppStackNavigator />
      </Provider>
    );
  }
}

const AppStackNavigator = new createStackNavigator({
  Home: { screen: HomeComponent},
  AddPerson: { screen: AddPerson},
  AddBill: {screen: AddBill},
  PersonData: {screen: PersonData},
}, {
  initialRouteName: 'Home',
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#00E228',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 20
    }
  }
})

export default App;
