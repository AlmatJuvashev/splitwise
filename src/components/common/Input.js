import React from 'react';
import { Form, Item, Input, Label } from 'native-base';


const CustomInput = (props) => {
    const {label, onChangeText, placeholder} = props;
    return (
        <Form>
            <Item floatingLabel>
                <Label>{label}</Label>
                <Input 
                    onChangeText={onChangeText}
                    placeholder={placeholder}/>
            </Item>
        </Form>
    )
}

export { CustomInput }