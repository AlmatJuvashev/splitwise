import React, { Component } from 'react';
import { FlatList  } from 'react-native';
import { PersonItem } from '../common';



const getPersonId = (id) => {
    return id;
}

class PeopleList extends Component   {

    state = {
        person: null,
    }

    renderPerson = (data) => {
        const {name, personId} = data.item
        return (
            <PersonItem 
                personName={name} 
                personId={personId}
                getPerson={this.getPerson}/>
        )
    }

    getPerson = async (person) => {
        await this.setState({person})
        this.props.getPerson(this.state.person);

    }

    
    render() {
        const {peopleArr} = this.props;
        console.log('People List get Array', peopleArr);
        return (
            <FlatList 
                data={peopleArr}
                renderItem={this.renderPerson}
                keyExtractor={(item) => item.personId.toString()}
            />
        );
    }

}

export  {PeopleList};
