import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';

import HomeComponent from './components/HomeComponent';
import AddPerson from './components/AddPerson';
import PersonData from './components/PersonData';
import AddBill from './components/AddBill';


const RouterComponent = () => {
    return (
      <Router>
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
                  key="addBill"
                  component={AddBill}
                  title="Add a bill"
                  />
            </Scene>
        </Scene>
      </Router>
    );
}

export default RouterComponent;
