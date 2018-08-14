import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Emoji from 'react-native-emoji';
import PropTypes from 'prop-types';

class HrCard extends React.Component {
  render(){
    return(
      <TouchableOpacity onPress={() => {alert('adsasd')}}>
      <View style={styles.HrCard}>
        <Emoji name={this.props.burc.icon ? this.props.burc.icon : "coffee"} style={styles.Emoji}/>
        <Text>{this.props.burc.title}</Text>
      </View>
      </TouchableOpacity>
    )
  }
}

HrCard.propTypes = {
  burc: PropTypes.object.isRequired
}

class HomeScreen extends React.Component {
  
  state = {
    isDataLoaded: false,
    data: [],
  }

  componentDidMount() {
    return fetch('https://raw.githubusercontent.com/aliemir/horoscope-basic/master/daily.json')
    .then((response) => response.json()
    ).then((responseJson) => {
    this.setState({
      isDataLoaded: true,
      data: responseJson
    });
  })
  }

  onPressLearnMore = (burc = {title: "Error"}) => {
    return () => {
      this.props.navigation.navigate('Horoscope', {
        burcTitle: burc.title,
        burcYorum: burc.yorum
      });    
    }
  }

  static navigationOptions = {
    title: 'Burc Yorumlariniz',
  }


  render() {
    let keys = 0;
    const {isDataLoaded} = this.state;
    if(isDataLoaded) {
      return (
        <View style={styles.container}>
          <Text style={styles.Text}>Burcunu Sec</Text>
          <HrCard burc={this.state.data[0]} />
        </View>
      );
    }
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.Text}>Yukleniyor...</Text>
      </View>
      )
  }
}

class HoroscopeScreen extends React.Component {
  
  //const yorum = this.props.navigation.getParam('burcYorum', 'error');

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('burcTitle', ''),
    };
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{JSON.stringify(this.props.navigation.getParam('burcYorum', 'error'))}</Text>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Horoscope: HoroscopeScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}


const styles = StyleSheet.create({
  HrCard: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#ff0000'
  },
  Emoji: {
    fontSize: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  containerTw: {
    flex: 1,
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  Text: {
    fontSize: 48,
  },
  message: {
    fontSize: 30,
    marginBottom: 20,
    color: '#F0CF61',
  },
  author: {
    fontSize: 18,
    color: '#EAEAEA',
  },
  btn: {
    marginVertical: 10,
    width: 50,
    height: 50,
    backgroundColor: '#000'
  },
  button: {
    position: 'absolute',
    bottom: 40,
  }
});