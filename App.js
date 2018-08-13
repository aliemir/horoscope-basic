import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

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

  onPressLearnMore = (burc) => {
    this.props.navigation.navigate('Horoscope', {
      burcTitle: burc.title,
    });
  }

  static navigationOptions = {
    title: 'Burc Yorumlariniz',
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.Text}>Home Screen</Text>
        <Button
          onPress={this.onPressLearnMore({title:"Boga"})}
          title="Learn More"
          color="#841584"
        />
      </View>
    );
  }
}

class HoroscopeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('burcTitle', 'Alt'),
    };
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30
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
  button: {
    position: 'absolute',
    bottom: 40,
  }
});