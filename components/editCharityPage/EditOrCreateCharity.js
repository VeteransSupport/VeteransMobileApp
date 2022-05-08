import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput, Image } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class EditOrCreateCharity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      editView: false,
      title: '',
      description: '',
      image: null,
    }
  }

  async componentDidMount() {
    if (this.props.editView !== undefined && this.props.editView !== null) {
      this.setState({ editView: this.props.editView });
      if (this.props.editView) {
        this.getCharityById();
      }
    }
    this.setState({ token: this.props.token });

  }

  editCharity() {
    let url = 'http://urbackup.atwebpages.com/api/edit_charity';
    let formData = new FormData();
    formData.append('token', this.state.token);
    formData.append('request', 'edit');
    formData.append('id', this.props.userTypeId);
    formData.append('title', this.state.title);
    formData.append('description', this.state.description);
    formData.append('image', this.state.image);

    fetch(url, {
      method: 'POST',
      headers: new Headers(),
      body: formData
    })
      .then((response) => {
        if (response.status === 204) {
          return response
        } else {
          throw Error(response.status)
        }
      })
      .then(() => {
        // Charity created
        // Redirect to all charities page
        this.props.handleNavigationClick('CharitiesList');
      })
      .catch((errStatusCode) => {
        console.log("something went wrong ", errStatusCode);

        console.log('something went wrong :: Status Code ' + errStatusCode.message);
        this.props.handleChangeSelectedView('');
        Alert.alert('Something went wrong', 'Your session may have expired\n\nPlease log back in and recreate your charity.');
      });
  }

  getCharityById() {
    let url = 'http://urbackup.atwebpages.com/api/charities?id=' + this.props.charityId;
    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw Error(response.status)
        }
      })
      .then((data) => {
        this.setState({title: data.results[0].title, description: data.results[0].description, image: data.results[0].image});
      })
      .catch((errStatusCode) => {
        console.log("something went wrong ", errStatusCode);

        console.log('something went wrong :: Status Code ' + errStatusCode.message);
        this.props.handleNavigationClick('Home');
        Alert.alert('Something went wrong', 'Please try again.');
      });
  }

  editOrCreateNewCharity() {
    let url = 'http://urbackup.atwebpages.com/api/edit_charity';
    let formData = new FormData();

    if (this.state.editView) {
      formData.append('request', 'edit');
      formData.append('id', this.props.charityId);
    } else {
      formData.append('request', 'create');
    }

    formData.append('token', this.state.token);
    formData.append('title', this.state.title);
    formData.append('description', this.state.description);
    formData.append('image', this.state.image);

    fetch(url, {
      method: 'POST',
      headers: new Headers(),
      body: formData
    })
      .then((response) => {
        if (response.status === 204) {
          return response
        } else {
          throw Error(response.status)
        }
      })
      .then(() => {
        // Charity created
        // Redirect to all charities page
        this.props.handleChangeSelectedView('edit');
      })
      .catch((errStatusCode) => {
        console.log('something went wrong :: Status Code ' + errStatusCode.message);
        this.props.handleNavigationClick('Home');
        this._clear();
        Alert.alert('Something went wrong', 'You have been logged out. Your session may have expired.\n\nPlease log back in and recreate your charity.');
      });
  }

  handleLogoClick() {
    this.props.handleNavigationClick('Home');
  }

  async _clear() {
    await AsyncStorage.clear();
    console.log('User logged out');
  }

  handleTitle = (text) => {
    this.setState({ title: text });
  }

  handleDescription = (text) => {
    this.setState({ description: text });
  }

  submitCharity() {
    if (this.state.title !== '' && this.state.description !== '') {
      this.editOrCreateNewCharity();
      if (this.state.editView) {
        Alert.alert('Charity edited with the following information:', this.state.title + '\n\n' + this.state.description);
      } else {
        Alert.alert('Charity created with the following information:', this.state.title + '\n\n' + this.state.description);
      }
    } else {
      if (this.state.title === '' && this.state.description === '') {
        Alert.alert('Incomplete Information', 'Title and Description are required.');
      } else if (this.state.title === '') {
        Alert.alert('Incomplete Information', 'Title is missing.');
      } else if (this.state.description === '') {
        Alert.alert('Incomplete Information', 'Description is missing.');
      }
    }
  }

  render() {
    let title = 'Create\nCharity';
    if (this.state.editView) {
      title = 'Edit\nCharity';
    }

    return (
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity style={styles.logo} onPress={() => this.handleLogoClick()}>
            <Image style={styles.logo} source={require('../../assets/urbackupTemporary_Transparent.png')} />
          </TouchableOpacity>
        </View>

        <View style={styles.subSection}>
          <Text>Use this page to {this.state.editView ? 'edit' : 'create'} a charity. To {this.state.editView ? 'edit this charity' : 'create a charity'}, the title and description of the charity must not be left blank. The title is limited to 35 characters with spaces and the description is limited to 125 characters with spaces.</Text>
          {this.state.editView &&
            <Text style={styles.adjustTop}>Information of this charity has already been populated. Do not edit the input fields for details you do not wish to edit. Click the "Save Details" button to save your changes.</Text>
          }
          <Text style={styles.adjustTop}>Or use the button below to go back to the previous page.</Text>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => this.props.handleChangeSelectedView('')}>
            <Text
              style={styles.backText}>
              Go Back
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.subSection}>
          <Text style={styles.headings}>Charity Title</Text>
          <TextInput style={styles.titleField}
            placeholder='Title'
            value={this.state.title}
            placeholderTextColor='#aaa'
            multiline={true}
            numberOfLines={1}
            blurOnSubmit={true}
            maxLength={30}
            onChangeText={this.handleTitle}
          />
          <Text style={styles.textLimitInfo}>Max character limit is 35</Text>
        </View>
        <View style={styles.subSection}>
          <Text style={styles.headings}>Charity Description</Text>
          <TextInput style={styles.descriptionField}
            placeholder='Title'
            value={this.state.description}
            placeholderTextColor='#aaa'
            multiline={true}
            numberOfLines={1}
            blurOnSubmit={true}
            maxLength={125}
            onChangeText={this.handleDescription}
          />
          <Text style={styles.textLimitInfo}>Max character limit is 125</Text>
        </View>
        <View style={styles.subSection}>
          <Text style={styles.headings}>Charity Image</Text>
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.uploadText}>Upload Image</Text>
          </TouchableOpacity>
          <Text style={styles.infoText}>You will see your uploaded image below:</Text>
          <Image style={styles.image} source={require('../../assets/image-icon.png')} />
        </View>
        <View style={styles.subSection}>
          <Text style={styles.headings}>Submit</Text>
          <TouchableOpacity style={styles.submitButton} onPress={() => this.submitCharity()}>
            <Text style={styles.uploadText}>{this.state.editView ? 'Save Details' : 'Create Charity'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    marginTop: '10%',
  },

  header: {
    width: '100%',
    height: 100,
  },

  title: {
    position: 'absolute',
    fontSize: 35,
    left: 0,
    fontWeight: 'bold',
  },

  logo: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 119,
    height: 74,
  },

  subSection: {
    marginTop: 35,
  },

  adjustTop: {
    marginTop: 20,
  },

  headings: {
    fontSize: 22,
    fontWeight: '500',
  },

  textLimitInfo: {
    alignSelf: 'center',
  },

  titleField: {
    backgroundColor: '#eee',
    alignSelf: 'center',
    fontSize: 16,
    padding: 2,
    width: '90%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#000',
    marginTop: 25,
    height: 45,
    textAlignVertical: 'top',
  },

  descriptionField: {
    backgroundColor: '#eee',
    alignSelf: 'center',
    fontSize: 16,
    padding: 2,
    width: '90%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#000',
    marginTop: 25,
    height: 150,
    textAlignVertical: 'top',
  },

  uploadButton: {
    width: '50%',
    borderRadius: 5,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    color: 'red',
    backgroundColor: '#000',
  },

  uploadText: {
    width: '100%',
    textAlign: 'center',
    color: '#fff',
  },

  infoText: {
    marginTop: 10,
  },

  image: {
    alignSelf: 'center',
    width: 154,
    height: 125,
    marginTop: 25,
    marginBottom: 15,
  },

  submitButton: {
    width: '50%',
    borderRadius: 5,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 35,
    color: 'red',
    backgroundColor: '#000',
  },

  backBtn: {
    width: '25%',
    borderRadius: 3,
    height: 35,
    justifyContent: 'center',
    color: 'red',
    marginTop: 20,
    backgroundColor: '#000',
    zIndex: 999,
  },

  backText: {
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold'
  },
});
