/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Image,Text, View,TouchableOpacity,TextInput,FlatList,AppState} from 'react-native';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  state = {
    items : [],
    query : "",
    refreshing: false
  }

  componentDidMount(){
    AppState.addEventListener("change",this.onChangeState)
  }

  componentWillMount(){
    AppState.removeEventListener("change",this.onChangeState)

  }

  onChangeState = (appState) =>  {
    if (appState === "active"){
      this.fetchRepositorys(this.state.query,true)
    }
  }

  pages = 0;

  async fetchRepositorys(query, refreshing=false) {
    const newPage = await refreshing ? 1 : this.pages + 1;
    await this.setState({refreshing : refreshing})
    let response = await fetch(`https://api.github.com/search/repositories?q=${query}&page=${newPage}`);
    let responseJson  = await response.json();
    let result = await responseJson.items;
    this.pages = await newPage;
    if (refreshing) {
      await this.setState({items : result, refreshing:false});
    } else {
      await this.setState({items : [...this.state.items, ...result] })
    }
    console.log(this.state.items)
  }

  navigationToDetail(item)  {
    this.props.navigation.navigate("Detail",{ item });
  }

  render() {
    console.log(this.state.query)

    return (
      <View style={styles.container}>
        <View style={styles.searchWrapper}>
          <TextInput
              style={styles.searchForm}
              placeholder="Type here"
              onChangeText={(query) => this.setState({query})}
            />
            <TouchableOpacity style={styles.searchBottom}onPress={() => this.fetchRepositorys(this.state.query,true)}>
              <Text style={{color:"white"}}>Fetch</Text>
            </TouchableOpacity>
          </View>
         <FlatList
           data={this.state.items}
           renderItem={({item}) =>
            <TouchableOpacity onPress={ () => this.navigationToDetail(item)}>
              <View style={{flexDirection:"row"}}>
                <Image style={styles.img}source={{url:item.owner.avatar_url}}/>
                <Text style={styles.ownerName}>{item.owner.login}</Text>
                <Text style={styles.name}>{item.name}</Text>

              </View>
            </TouchableOpacity>
            }
           keyExtractor={(item) => item.id}
           onEndReached={() => this.fetchRepositorys(this.state.query)}
           onEndReachedThreshold={0.1}
           onRefresh={() => this.fetchRepositorys(this.state.query,refreshing=true)}
           refreshing={this.state.refreshing}
         />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:15,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  searchBottom : {
    padding:10,
    backgroundColor:"blue",
  },
  searchForm:{
    height:40,
    flex:1,
    backgroundColor:"#EEE"
  },
  searchWrapper:{
    flexDirection:"row",
    padding:20,
    alignItems:"center"
  },
  title:{
    fontWeight:"bold",
    fontSize:20,
    // marginBottom:10,
  },
  name:{
    padding:10,
  },
  img :{
    width:30,
    height:30,
    padding:20
  },
  ownerName:{
    fontWeight:"bold",
    padding:10,
  }
});
