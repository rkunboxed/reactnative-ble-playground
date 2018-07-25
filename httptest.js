import React, {Component} from 'react';
import {
  Text,
  View
} from 'react-native';
import {styles} from './styles/styles'

export class Httptest extends Component {

  constructor() {
    super();
    this.state = {
      posts: []
    }
  }
  componentDidMount() { //lifecycle hook
    // shorthand fetch; assumes GET req
    // fetch('https://www.reddit.com/.json', {
    //   //options for headers
    //   Accept: 'application/json'
    // })
    //longhand fetch
    fetch('https://www.reddit.com/.json', {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      this.setState({posts: data.data.children})
    });
  }
  render() {
    return(
      <View>
        <Text>reddit</Text>
        <View>
          {this.state.posts.map(post => (
            <Text>{post.data.author}</Text>
          ))}
        </View>
      </View>
    )
  }
}
