import React from 'react';
import {Text,View,Image,StyleSheet,Linking,TouchableOpacity} from "react-native";

const styles = StyleSheet.create({
    container:{
        padding:30,
        backgroundColor:"white"
    },
    img :{
        width:30,
        height:30,
        padding:20
    },
    title:{
        fontWeight:"bold",
        fontSize:20,
        marginBottom:10,
    },
    name:{
        padding:10
    },
    description:{
        marginTop:10,
        marginBottom:10,

    },
    url:{
        textDecorationLine: 'underline',
        color:"blue"
    }
})

export default class Detail extends React.Component{

    static navigationOptions = ({navigation}) =>  ({
        title:navigation.state.params.item.name
    })

    openUrl(url) {
        // console.log(url)
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
              console.log('無効なURLです: ' + url);
            } else {
              return Linking.openURL(url);
            }
          }).catch(err => console.error('URLを開けませんでした。', err));
    }

    render (){
        const { navigation: { state : { params :{ item} }} } = this.props;
        console.log(item)

        return(
            <View style={styles.container}>
                <Text style={styles.title}>{item.full_name}</Text>
                <View style={{flexDirection:"row"}}>
                    <Image style={styles.img}source={{url:item.owner.avatar_url}}/>
                    <Text style={styles.name}>{item.owner.login}</Text>
                </View>
                <Text style={styles.description}>{item.description}</Text>
                <TouchableOpacity onPress={() => this.openUrl(item.html_url)}>
                    <Text style={styles.url}>{item.html_url}</Text>
                </TouchableOpacity>
            </View>
    )}
}
