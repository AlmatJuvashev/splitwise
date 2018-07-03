import React, { Component } from 'react';
import { FlatList, StyleSheet  } from 'react-native';
import { PersonItemBill } from '../common';



class PeopleListBills extends Component   {



    renderPerson = (data) => {

       console.log('RENDERED DATA IN ITEM:::BILLS---2', data.item);
        
        return (
            <PersonItemBill 
                checkBoxColor={this.props.checkBoxColor}
                data={data.item}
                getPerson={this.getPerson}/>
        )
    }

    getPerson = (person) => {
        this.props.getPerson(person);
    }

    
    render() {
        console.log('RENDERED DATA IN ITEM:::BILLS---1', this.props.peopleArr);
        data = this.props.peopleArr.filter(item => item.selected)
        
        return (
            <FlatList 
                data={data}
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

export  {PeopleListBills};
