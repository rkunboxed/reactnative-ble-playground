import React, {Component} from 'react';
import {
  Platform,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';
import {styles} from './styles/styles';
import { BleManager } from 'react-native-ble-plx';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super();
    this.state = {
      todos: [],
      newTodo: ''
    }
    this.manager = new BleManager();
  }

  componentWillMount() {
    const subscription = this.manager.onStateChange((state) => {
        if (state === 'PoweredOn') {
            this.scanAndConnect();
            subscription.remove();
        }
    }, true);

    fetch('http://localhost:3000/todos', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      this.setState({todos: data});
    })
  }

  scanAndConnect() {
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        // Handle error (scanning will be stopped automatically)
        return
      }

      // Check if it is a device you are looking for based on advertisement data
      // or other criteria.
      if (device.name === 'TI BLE Sensor Tag' || device.name === 'SensorTag') {

        // Stop scanning as it's not necessary if you are scanning for one device.
        this.manager.stopDeviceScan();

        // Proceed with connection.
      }
    });
  }

  handleChange(text) {
    //const { value } = e.target;
    this.setState({newTodo: text});
  }
  handlePress() {
    // option 1: property spread notation
    //const todos = [...this.state.todos, this.state.newTodo];
    //this.setState({todos, newTodo: ''});

    // option 2: old school
    // const todos = this.state.todos;
    // todos.push(this.state.newTodo);
    //this.setState({todos, newTodo: ''});

    // option 3: json server
    fetch('http://localhost:3000/todos', {
      method: 'POST',
      body: JSON.stringify({
        name: this.state.newTodo
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      const todos = [...this.state.todos, data];
      this.setState({todos, newTodo: ''});
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40, width: 100, borderColor: 'gray', borderWidth: 1, padding: 10}}
          value={this.state.newTodo}
          onChangeText={this.handleChange.bind(this)}
        />
        <TouchableHighlight style={styles.box} onPress={this.handlePress.bind(this)}>
          <Text>Add Todo</Text>
        </TouchableHighlight>
        <View>
          {this.state.todos.map((todo, i) => <Text key={i}>{todo.name}</Text>)}
        </View>
      </View>
    );
  }
}
