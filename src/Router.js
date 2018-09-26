import React, {Component} from "react";
import {Router, Scene} from "react-native-router-flux";

import Main from "./Main";
import Private from "./Private";

class Route extends Component {

      render() {

          return (
              <Router>
                  <Scene hideNavBar={true}>
                      <Scene key="main" component={Main} title="Main" initial={true} />
                      <Scene key="private" component={Private} title="Private" />
                  </Scene>
              </Router>
          )

      }
}

export default Route;
