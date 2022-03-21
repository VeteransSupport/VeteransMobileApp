import React from 'react';
import { Text, View } from 'react-native';
import Login from '../login/Login';
import Logout from '../logout/LogOut';

class SelectCharity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
  }

  render(){

    return (
      <View>
        <Text>Select Charity</Text>
      </View>
    )
  }

}
export default SelectCharity;