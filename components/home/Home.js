import React from 'react';
import { Text, View } from 'react-native';
import Login from '../login/Login';
import Logout from '../logout/LogOut';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      email: '',
      password: '',
      removeUser: false,
      signup: false,
      token: null
    }

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('loginToken')) {
      // this.setState({ authenticated: true, token: localStorage.getItem('loginToken') })
      this.setState({ authenticated: true })
      // TODO: Get token from async storage
    }
  }

  handleEmail = (e) => {
    this.setState({ email: e.target.value });
    console.log(this.state.email);
  }

  handlePassword = (e) => {
    this.setState({ password: e.target.value });
    console.log(this.state.password);
  }

  handleLogoutClick = () => {
    this.setState({ authenticated: false, token: null, email: '', password: '' });
    // localStorage.removeItem('loginToken');
  }

  handleLoginClick = async () => {
    let url = 'http://unn-w18014333.newnumyspace.co.uk/veterans_app/dev/VeteransAPI/api/authenticate';
    let formData = new FormData()
    formData.append('username', this.state.email)
    formData.append('password', this.state.password)

    fetch(url, {
      method: 'POST',
      headers: new Headers(),
      body: formData
    })
      .then((response) => {
        // Successful authentication will return
        // a 200 status code.
        if (response.status === 200) {
          return response.json()
        } else {
          throw Error(response.statusText)
        }
      })
      .then((data) => {
        // If results include a token, change state
        // to authenticated
        if ("token" in data.results) {
          // localStorage.setItem('loginToken', data.results.token)
          // this.setState({ authenticated: true, token: localStorage.getItem('loginToken') })
          this.setState({ authenticated: true, token: data.results.token })
          console.log(this.state.token);
        }
      })
      .catch((err) => {
        console.log("something went wrong ", err)
        alert('We were unable to sign you in!\n\nPlease check youre username and password and make sure they are correct.')
        // TODO: change alert to something else
      })
  }

  render() {
    let page = (
      <Login
        handleEmail={this.handleEmail}
        handlePassword={this.handlePassword}
        handleLoginClick={this.handleLoginClick}
      />
    )

    if (this.state.authenticated) {
      page = (
        <View>
          <Text>Youre logged in!</Text>
          <Logout handleLogoutClick={this.handleLogoutClick} />
        </View>
      )
    }

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}>
        {page}
      </View>
    )
  }

}
export default Home;