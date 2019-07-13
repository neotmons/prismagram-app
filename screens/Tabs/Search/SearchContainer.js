import React from "react";
import styled from "styled-components";
import SearchBar from "../../../components/SearchBar";
import SearchPresenter from "./SearchPresenter";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Text = styled.Text``;

export default class extends React.Component{
    static navigationOptions = ({navigation}) => ({
        headerTitle: 
            <SearchBar 
                value={navigation.getParam("term", "")} 
                onChange={navigation.getParam("onChange", () => null)} 
                onSubmit={navigation.getParam("onSubmit", () => null)} 
            />
    });

    // static으로 생성한 값은 아래 onChange, onSubmit 함수가 생성되기전에 실행됨으로
    // 함수를 넣지 못함으로 에러가 발생함으로 constructor에 아래와 같이 설정 필요함.
    constructor(props){
        super(props);
        const { navigation } = props;
        this.state = {
            term: "",
            shouldFetch: false
        };
        navigation.setParams({
            term: this.state.term,
            onChange: this.onChange,
            onSubmit: this.onSubmit
        })
    }

    onChange = (text) => {
        const { navigation } = this.props;        
        this.setState({term: text, shouldFetch:false});
        navigation.setParams({
            term: text
        });
    };

    onSubmit = () => {
        this.setState({shouldFetch: true});
    };

    render() {
        const {term, shouldFetch} = this.state;
        return <SearchPresenter term={term} shouldFetch = {shouldFetch}/>;
    }
}

/**
export default () => (
    <View>
        <Text>Search</Text>
    </View>
);

 */