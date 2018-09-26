import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {connect} from "react-redux";
import {compose} from "redux";
import {Actions} from "react-native-router-flux";
import { Field, reduxForm } from "redux-form";
import validator from "validator";

import {loginUser} from "./actions";

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


class Main extends Component {

  componentDidUpdate() {
      const {firstData} = this.props;
      if(firstData.isLoggedIn) {
          Actions.reset("private");
      } else {
          console.log("User Not Loggedin");
      }
  }

  const apicall = (url, params, cb) => {
        fetch(URL, params).then((data) => {
            cb(data);
        });
  }

  onSubmit = values => {
      //alert("no errors");
      this.props.storeData()

      apicall("url", params, (data)=> {
          this.props.storeData(data);
      })
      console.log(values);
  }

  renderInput = (props) => {
      const {placeholder, keyboardType, secureTextEntry, meta: {touched, error}, input: {onChange, ...restInput}} = props;
      console.log(props);
      return (
        <View>
        <TextInput
            underlineColorAndroid="rgba(0,0,0,0)"
            selectionColor= "#999999"
            secureTextEntry={secureTextEntry}
            keyboardType= {keyboardType}
            onChangeText={onChange}
            placeholder={placeholder}
            {...restInput}/>
            {touched && <Text>{error}</Text>}
        </View>
      )
  }

  render() {

    const {firstData, loginUser, handleSubmit} = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Field
            name="email"
            placeholder="Email"
            keyboardType="email-address"
            component={this.renderInput} />
        <Field
            name="password"
            placeholder="password"
            secureTextEntry={true}
            component={this.renderInput} />
        <Button
            title="Login"
            onPress={handleSubmit(this.onSubmit)}
         />
      </View>
    );
  }
}

const validate = values => {
    const errors = {};
    if(!values.email) {
        errors.email = "Rerquired"
    } else if(values.email.length < 8) {
        errors.email = "Length should me greater than 8";
    } else if (!validator.isEmail(values.email)) {
        errors.email = "Enter proper email";
    }

    if(!values.password) {
        errors.password = "Required"
    }

    return errors;
}

mapStateToPorps = state => {
    return {
      firstData: state.firstReducer
    }
}

mapDispatchToProps = dispatch => {
    return {
        loginUser: userLoggedin => dispatch(loginUser(userLoggedin)),
        storeData: data => dispatch({type: "STOREDATA", data})
    }
}

export default compose(
  connect(mapStateToPorps, mapDispatchToProps),
  reduxForm({
    form: "login",
    validate
  })
)(Main);
