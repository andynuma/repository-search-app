import React, {Component} from 'react';
import {StackNavigator} from "react-navigation";
import Home from "./Home";
import Detail from "./Detail"

export default StackNavigator({
  Home: {
    screen:Home,
    navigationOptions:{
      title:"Home",
    }
  },
  Detail: {
    screen:Detail,
    // navigationOptions:({navigation}) => ({
    //   title:navigation.state.params.item.name,
    // }
  // )
  },
},
);