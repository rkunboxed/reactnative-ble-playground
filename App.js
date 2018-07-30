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

    // grab todos from json server
    // insert your local IP
    // be sure to set up json server to serve from that address
    fetch('http://000.000.0.00:3000/todos', {
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
      console.warn('scanning');
      if (error) {
        console.warn('error:' + error);
        // Handle error (scanning will be stopped automatically)
        return
      }



      // Check if it is a device you are looking for based on advertisement data
      // or other criteria.
      if (device.name === 'vívofit 3') {
        console.warn('found your vivofit!');
        // Stop scanning as it's not necessary if you are scanning for one device.
        this.manager.stopDeviceScan();

        // Proceed with connection.

        for (var prop in device._manager) {
          console.warn('managerdata: ' + prop);
        }

        console.warn('manager: ' + device._manager);
        console.warn('isConnectable: ' + device.isConnectable);
        console.warn('mtu: ' + device.mtu);
        console.warn('man. data: ' + device.manufacturerData);
        console.warn('localname: ' + device.localName);
        console.warn('rssi: ' + device.rssi);
        console.warn('servicedata: ' + device.serviceData);
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
    // insert your local IP
    // be sure to set up json server to serve from that address
    fetch('http://000.000.0.00:3000/todos', {
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
        <Text style={styles.headline}>Simple Todo App with Bluetooth Demo</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            value={this.state.newTodo}
            onChangeText={this.handleChange.bind(this)}
          />
          <TouchableHighlight style={styles.button} onPress={this.handlePress.bind(this)}>
            <Text style={styles.btnTxt}>Add Todo</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.list}>
          {this.state.todos.map((todo, i) =>
            <View style={styles.listItem} key={i}>
              <Text style={styles.listItemText}>{todo.name}</Text>
            </View>)}
        </View>
      </View>
    );
  }
}
