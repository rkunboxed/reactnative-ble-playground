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

type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super();
    this.state = {
      todos: [],
      newTodo: '',
      devices: [],
      connectedDevice: '',
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
    // insert your local IP and set up json server to serve from that address
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

      //use console.warn if you want the error to show up on the phone or emulator
      console.log('found deviceID:' + device.id + ' connectable?:' + device.isConnectable);

      if (error) {
        console.log('error:' + error);
        // Handle error (scanning will be stopped automatically)
        return
      }

      if (device) {
        this.setState(prevState => ({
          devices: [device, ...prevState.devices],
        }))
      } else {
        console.log('no device yet');
      }

      // Check if it is a device you are looking for based on your criteria.
      // Hardcoded HRM for now
      if (device.id === '1874B7D3-0369-2F7E-BAD3-15094669D23C' && device.isConnectable) {
        let currentDevice = device.id;
        // Stop scanning as it's not necessary if you are scanning for one device.
        this.manager.stopDeviceScan();

        // Proceed with connection.
        this.manager.connectToDevice(currentDevice)
          .then(device => {
            this.setState({connectedDevice: currentDevice});
            // confirm connection
            return this.manager.isDeviceConnected(currentDevice)
          })
          // If connected find services and characteristics
          .then(status => {
            if (status) {
              return this.manager.discoverAllServicesAndCharacteristicsForDevice(currentDevice);
            }
          })
          .then(data => {
            return this.manager.servicesForDevice(currentDevice)
          })
          .then(services => {
            // returns an array of services as objects
            console.log(services)

            let promiseArray = services.map( service => {
              return this.manager.characteristicsForDevice(currentDevice, service.uuid);
            })

            Promise.all(promiseArray)
              .then(chars => {
                // waits for all promises to resolve
                // returns an array of characteristics as objects for each service
                console.log(chars);
              })
              .then( () => {
                console.log('done for now')
              })
            // the following returns the same info for a particular characteristic but includes an updated value property
            // this "value" is the data from the device (hr, speed, etc)
            // this.manager.readCharacteristicForDevice(currentDevice, chars[1].serviceUUID, chars[1].uuid)
          })
          .catch(error => {
            console.log('Error:' + error)
          })
      }
    });
  }

  handleChange(text) {
    this.setState({newTodo: text});
  }

  handlePress() {
    // insert your local IP and set up json server to serve from that address
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
        <View style={styles.list}>
          <Text style={styles.headline}>Discovered Devices</Text>
          {this.state.devices.map((device, i) =>
            <View style={styles.listItem} key={i}>
              <Text style={styles.listItemText}>{device.id}</Text>
            </View>)}
        </View>
        <View style={styles.list}>
          <Text style={styles.headline}>Connected Device</Text>
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>{this.state.connectedDevice}</Text>
          </View>
        </View>
      </View>
    );
  }
}
