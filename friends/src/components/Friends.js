import React, { Component } from 'react';
import { getFriends, addFriend } from '../actions';
import { connect } from 'react-redux';

class Friends extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      age: '',
      email: ''
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleNameChange = (event) => {
    return this.setState({ name: event.target.value })
  }

  handleAgeChange = (event) => {
    return this.setState({ age: event.target.value })
  }

  handleEmailChange = (event) => {
    return this.setState({ email: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addFriend(this.state);
    this.setState({name: '', age: '', email: ''});
  }

  handleUpdate(event) {
    let element = event.target;
    element.style.display = "none";
    let text = element.innerHTML;
    let input = document.createElement("input");
    input.type = "text";
    input.value = text;
    input.size = Math.max(text.length / 4 * 3, 4);
    element.parentNode.insertBefore(input, element);
    input.select();
    input.addEventListener("blur", (event) => {
      event.target.parentNode.removeChild(event.target);
      element.innerHTML = input.value === "" ? "&nbsp;" : input.value;
      element.style.display = "";  
    })
    if (element.parentNode.querySelector("input[type='submit']") === null) {
      let update = document.createElement("input");
      update.type = "submit";
      update.value = "Update";
      update.onClick = () => { this.props.updateFriend({ index: element.parentNode.key, update: this.state });
      element.parentNode.appendChild(update);
    }
  }
  
  componentDidMount() {
    this.props.getFriends();
  }
  
  render() {
    return (
      <div>
        <form onSubmit = { this.handleSubmit } >
          <label htmlFor="name">Name: </label>
          <input id="name" type="text" placeholder="Add Name..." onChange={ this.handleNameChange } value={ this.state.name } />
          <label htmlFor="age">Age: </label>
          <input id="age" type="text" placeholder="Add Age..." onChange={ this.handleAgeChange } value={ this.state.age } />
          <label htmlFor="email">Email: </label>
          <input id="email" type="text" placeholder="Add Email..." onChange={ this.handleEmailChange } value={ this.state.email } />
          <input type="submit" value="Submit"/> 
        </form>

        <ul>
        {
          this.props.friends.map((friend, index) => {
            return (
              <li key={index}>
                <span onClick = { this.handleUpdate }>{ friend.name }</span>
                <span onClick = { this.handleUpdate }>{ friend.age }</span>
                <span onClick = { this.handleUpdate }>{ friend.email }</span> 
              </li>
            )
          })
        }
        </ul>
      </div>
    )
  }
}

const mapStoreToProps = (state) => {
  return {
    friends: state.friends
  }
}

export default connect(mapStoreToProps, { getFriends, addFriend, updateFriend })(Friends);