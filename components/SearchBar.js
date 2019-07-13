import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { TextInput } from "react-native-gesture-handler";
import constants from "../constants";
import styles from "../styles";



const Container = styled.View`
    justify-content: center
    align-items: center
    flex: 1
`;


const SearchBar = ({onChange, value, onSubmit}) => (
    <Container>
        <TextInput 
            style={{
                width: constants.width - 40, 
                height: 35, 
                backgroundColor: styles.lightGreyColor, 
                padding: 10, 
                borderRadius: 5,
                textAlign: "center"}}
            returnKeyType="search"
            onChangeText={onChange} 
            onEndEditing={onSubmit} 
            value={value} 
            placeholder={"Search"} 
            placeholderTextColor={styles.darkGreyColor}
        />
    </Container>
);

SearchBar.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default SearchBar;
