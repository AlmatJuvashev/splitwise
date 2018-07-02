import React, { Component } from 'react';
import { Scene, Router, Actions, Navigator, NavigationBar } from 'react-native-router-flux';
import { StyleSheet } from 'react-native';

import HomeComponent from './components/HomeComponent';
import AddPerson from './components/AddPerson';
import PersonData from './components/PersonData';
import AddBill from './components/AddBill';


const RouterComponent = () => {
    const { navBar, navTitle } = styles;
    return (
      <Router 
        navigationBarStyle={navBar} 
        titleStyle={navTitle}>
        <Scene key="root" hideNavBar>
            <Scene key="main">
                <Scene
                  key="home"
                  component={HomeComponent}
                  title="Splitwise"
                  initial/>
                <Scene
                onLeft={() => { Actions.home() }}
                key="addPerson"
                component={AddPerson}
                title="Add Person"
                />
                <Scene
                onLeft={() => { Actions.home() }}
                key="personData"
                component={PersonData}
                title="Info" />
            </Scene>
            <Scene key="bill">
                <Scene
                  onLeft={() => Actions.home()}
                  key="addBill"
                  component={AddBill}
                  title="Add a bill"
                  />
            </Scene>
        </Scene>
      </Router>
    );
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#00E228'
  },
  navTitle: {
    color: '#fff'
  }
})

export default RouterComponent;
