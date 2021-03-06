import React, { Component } from 'react';
import { FlatList, StyleSheet  } from 'react-native';
import { PersonItem } from '../common';


const getPersonId = (id) => {
    return id;
}

class PeopleList extends Component   {

    renderPerson = (data) => {
        console.log('RENDERED DATA IN ITEM:::', data.item);
        const {name, personId} = data.item
        return (
            <PersonItem 
                checkBoxColor={this.props.checkBoxColor}
                data={data.item}
                getPerson={this.getPerson}/>
        )
    }

    getPerson =  (person) => {
        this.props.getPerson(person);
    }

    
    render() {
    
        
        return (
            <FlatList 
                data={this.props.peopleArr}
                renderItem={this.renderPerson}
                keyExtractor={(item) => item.personId.toString()}
            />
        );
    }

}

const styles = StyleSheet.create({
    flatListContainer: {
        paddingLeft: 20,
        marginHorizontal: 10,
        borderBottomWidth: 0,
    }
})

export  {PeopleList};
