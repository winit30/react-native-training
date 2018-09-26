import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";

import {logoutUser} from "./actions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


class Private extends Component {

  componentDidUpdate() {
      const {firstData} = this.props;
      if(!firstData.isLoggedIn) {
          Actions.reset("main");
      } else {
          alert("User Not Logged Out");
      }
  }

  render() {

    const {firstData} = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome {firstData.user ? firstData.user.name : ""}! I am a private page</Text>
        <Button
            title="Logout"
            onPress={() => this.props.logoutUser()}
         />
      </View>
    );
  }

}
mapStateToPorps = state => {
    return {
      firstData: state.firstReducer
    }
}

mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => dispatch(logoutUser())
    }
}

export default connect(mapStateToPorps, mapDispatchToProps)(Private);
