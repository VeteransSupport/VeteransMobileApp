import React from 'react';
import { StyleSheet, Alert, Image, TouchableOpacity, Text, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      token: '',
      isLoading: true,
      renderResults: 1,
      questions: [],
      currQuestion: 0,
      optionChosen: '',
      hasSelected: false,
      green: 0,
      orange: 0,
      red: 0,
      score: 0,
      result: null,
      resultsArr: [],
    }
  }

  async componentDidMount() {
    this._retrieveData('token');
    this.getQuizQuestions();
  }

  _retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        this.setState({ authenticated: true, token: value })
      } else {
      }
    } catch (e) {
      console.log('Cound not store token in AsyncStorage: ' + e);
      Alert.alert('Error getting token', 'Could not retrieve session token.');
    }
  }

  getQuizQuestions() {
    const url = 'http://urbackup.atwebpages.com/api/quiz';

    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else {
          throw Error(response.statusText)
        }
      })
      .then((data) => {
        this.setState({ isLoading: false, questions: data.results });
      })
      .catch((err) => {
        console.log("something went wrong ", err);
        Alert.alert('Unable to load quiz', 'Please contact your admin.');
      })
  }

  //Used both for logo and for home button (on the result page)
  handleLogoClick = (props) => {
    props.navigation.navigate('Home');
  }

  updateTally() {
    const questionId = this.state.currQuestion + 1;
    if (questionId === 1) {
      let newArr = this.state.resultsArr.concat({
        1: this.state.optionChosen
      });
      this.setState({ resultsArr: newArr });
    } else if (questionId === 2) {
      let newArr = this.state.resultsArr.concat({
        2: this.state.optionChosen
      });
      this.setState({ resultsArr: newArr });
    } else if (questionId === 3) {
      let newArr = this.state.resultsArr.concat({
        3: this.state.optionChosen
      });
      this.setState({ resultsArr: newArr });
    } else if (questionId === 4) {
      let newArr = this.state.resultsArr.concat({
        4: this.state.optionChosen
      });
      this.setState({ resultsArr: newArr });
    } else if (questionId === 5) {
      let newArr = this.state.resultsArr.concat({
        5: this.state.optionChosen
      });
      this.setState({ resultsArr: newArr });
    } else if (questionId === 6) {
      let newArr = this.state.resultsArr.concat({
        6: this.state.optionChosen
      });
      this.setState({ resultsArr: newArr });
    }

    if (this.state.optionChosen === 'Not at all') {
      this.setState({ green: this.state.green + 1 });
    } else if (this.state.optionChosen === 'For a few days no') {
      this.setState({ orange: this.state.orange + 1 });
    } else if (this.state.optionChosen === 'For more than 2 weeks') {
      this.setState({ red: this.state.red + 1 });
    }
  }

  //Keep track of selected answers and move to next question or even finish quiz
  nextQuestion = () => {
    if (this.state.hasSelected) {
      this.updateTally();

      if (this.state.questions[this.state.currQuestion].answer === this.state.optionChosen) {
        this.setState({ score: this.state.score + 1 });
      }

      this.setState({ hasSelected: false, currQuestion: this.state.currQuestion + 1 });
      //Logs Question text with chosen answers to questions
      console.log('Question:: ' + this.state.questions[this.state.currQuestion].question + ' Answer to Question::  ' + this.state.optionChosen);
    } else {
      Alert.alert('Please select your answer', 'You must select at least one answer before proceeding.');
    }
  }

  finishQuiz = () => {
    if (this.state.hasSelected) {
      this.updateTally();

      setTimeout(this.doFinishQuiz,
        250
      );
    } else {
      Alert.alert('Please select your answer', 'You must select at least one answer before proceeding.');
    }
  }

  doFinishQuiz = () => {
    if (this.state.questions[this.state.currQuestion].answer === this.state.optionChosen) {
      this.setState({ score: this.state.score + 1 });
    }

    // Calculating result
    if ((this.state.green > 3 || this.state.green === 6) && this.state.red === 0) {
      this.setState({ result: 1 });
    } else if (this.state.orange >= 3 || this.state.red < 3) {
      this.setState({ result: 2 });
    } else {
      this.setState({ result: 3 });
    }

    this.setState({ hasSelected: false, renderResults: this.state.renderResults + 1 });

    this.uploadResults();
  }

  uploadResults() {
    let url = 'http://urbackup.atwebpages.com/api/update_user';

    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
      + (currentdate.getMonth() + 1) + "/"
      + currentdate.getFullYear() + " @ "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":"
      + currentdate.getSeconds();

    let formData = new FormData()
    formData.append('request', 'update_quiz_results');
    formData.append('token', this.state.token);
    formData.append('mood', this.state.result);
    formData.append('last_updated', datetime);
    formData.append('quiz_results', JSON.stringify(this.state.resultsArr));

    fetch(url, {
      method: 'POST',
      headers: new Headers(),
      body: formData
    })
      .then((response) => {
        // Successful authentication will return
        // a 200 status code.
        if (response.status === 204) {
          return response
        } else {
          throw Error(response.statusText)
        }
      })
      .then((data) => {
        Alert.alert('Quiz Completed', 'Your results have been saved');
      })
      .catch((err) => {
        console.log("something went wrong ", err);
        Alert.alert('Unable to save results!', 'Please log out and log back in again');
      })
  }

  handleOptionSelect(option) {
    this.setState({ hasSelected: true, optionChosen: option });
  }
  // Renders either Quiz page or Result page
  renderQuizResults = () => {
    if (this.state.isLoading) {
      return (
        <View>
          <View style={styles.contentContainer}>
            <Text style={styles.loading}>Loading...</Text>
          </View>
        </View>
      );
    }
    if (this.state.renderResults === 1) {
      return (
        <View style={styles.container2}>
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={{ fontSize: 70, fontStyle: 'italic' }}>Quiz</Text>
            </View>
            <View style={styles.headerImage}>
              <TouchableOpacity onPress={() => this.handleLogoClick(this.props)}>
                <Image source={require('../../assets/urbackupTemporary_Transparent.png')} />
              </TouchableOpacity>
            </View>
          </View>

          {/*QUESTION*/}
          <View style={styles.questionSpace}>
            <Text style={{ fontSize: 19, fontWeight: 'bold' }}>{this.state.questions[this.state.currQuestion].question}</Text>
          </View>
          {/*QUESTION*/}

          <View style={styles.buttonAnswers}>
            <View style={styles.buttonAnswers2}>
              {/*ANSWER OPTION BUTTONS */}
              <TouchableOpacity onPress={() => this.handleOptionSelect('Not at all')} style={styles.buttonStyles}>
                <Text style={{ color: 'green', fontWeight: 'bold' }}> {this.state.questions[this.state.currQuestion].mcq1} </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.handleOptionSelect('For a few days no')} style={styles.buttonStyles}>
                <Text style={{ color: 'orange', fontWeight: 'bold' }}> {this.state.questions[this.state.currQuestion].mcq2} </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.handleOptionSelect('For more than 2 weeks')} style={styles.buttonStyles}>
                <Text style={{ color: 'red', fontWeight: 'bold' }}> {this.state.questions[this.state.currQuestion].mcq3} </Text>
              </TouchableOpacity>
              {/*ANSWER OPTION BUTTONS */}
            </View>
          </View>

          <View style={styles.nextButtonPlacement}>
            <TouchableOpacity onPress={() => this.handleLogoClick(this.props)} style={styles.quizHomeButton}>
              <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Home</Text>
            </TouchableOpacity>
            {/* Either next button or finish quiz button depending on which question the quiz is on. */}
            {this.state.currQuestion == this.state.questions.length - 1 ? (
              <TouchableOpacity onPress={() => this.finishQuiz()} style={styles.finishButtonStyle}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Finish Quiz</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => this.nextQuestion()} style={styles.nextButtonStyle}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Next</Text>
              </TouchableOpacity>

            )}
            {/*Either next button or finish quiz button depending on which question the quiz is on. */}
          </View>


        </View>
      );
    } else if (this.state.renderResults === 2) {
      return (
        <View style={styles.containerRESULTS}>

          <View style={styles.headerRESULTS}>
            <View style={styles.headerTextRESULTS}>
              <Text style={{ fontSize: 70, fontStyle: 'italic' }}>Quiz</Text>
            </View>
            <View style={styles.headerImageRESULTS}>
              <TouchableOpacity onPress={() => this.handleLogoClick(this.props)}>
                <Image source={require('../../assets/urbackupTemporary_Transparent.png')} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.questionSpaceRESULTS}>
            <Text style={{ fontSize: 23, fontWeight: 'bold' }}>Your Result:</Text>
            <Text style={{ fontSize: 16 }}>Your traffic light colour has now been automatically changed. You will need to manually change it if you disagree with the quiz result.</Text>
          </View>

          <View style={styles.trafficLightSpaceRESULTS}>
            <View style={styles.trafficLightSpace2RESULTS}>
              {/*<Image source={require('../../assets/trafficLightTemporary.png')}/>*/}
              {this.state.result == 1 && <Image source={require('../../assets/greenResult.png')} />}
              {this.state.result == 2 && <Image source={require('../../assets/amberResult.png')} />}
              {this.state.result == 3 && <Image source={require('../../assets/redResult.png')} />}

              <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Finish Quiz</Text>

            </View>
          </View>

          <View style={styles.shareAnswerButtonPlacementRESULTS}>
            {/*TODO: Implement onPress share quiz answers */}
            <TouchableOpacity style={styles.shareAnswerButtonStyleRESULTS}>
              <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>SHARE QUIZ ANSWERS WITH CHARITY & NC</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.homeButtonStyleRESULTS}>
              <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }} onPress={() => this.handleLogoClick(this.props)} >HOME</Text>
            </TouchableOpacity>
          </View>

        </View>
      );
    }
  }


  render() {

    return (

      <View style={styles.container}>
        {this.renderQuizResults()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#fff',
  },

  contentContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: 500,
  },

  loading: {
    position: 'absolute',
    top: '50%',
    height: 60,
    marginTop: -30,
    alignSelf: 'center',
    fontSize: 35,
    fontWeight: 'bold',
  },

  //Styles for Quiz --START
  container2: {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#fff',
  },

  header: {
    width: '100%',
    height: '15%',
    backgroundColor: 'white',
    marginTop: 5,
  },

  headerText: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  headerImage: {
    width: '40%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 200,
    position: 'absolute',
  },

  questionSpace: {
    width: '70%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 55,
    marginTop: 10,
    backgroundColor: 'white'
  },

  buttonAnswers: {
    width: '100%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
  },

  buttonAnswers2: {
    width: 170,
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  buttonStyles: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },

  nextButtonPlacement: {
    width: '100%',
    height: '20%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    padding: 0,
  },

  nextButtonStyle: {
    width: 90,
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 5,
  },

  quizHomeButton: {
    width: 90,
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 5,
    right: 0,
    bottom: 0,
  },

  quizHomeButtonPlacement: {
    width: '100%',
    height: '10%',
    backgroundColor: 'pink',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20,
  },

  finishButtonStyle: {
    width: 120,
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 5,
  },
  //Styles for Quiz --END

  //Styles for Results --START
  containerRESULTS: {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'center',
    width: '100%',
  },

  headerRESULTS: {
    width: '100%',
    height: '15%',
    backgroundColor: 'white',
    marginTop: 15,
  },

  headerTextRESULTS: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  headerImageRESULTS: {
    width: '40%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 200,
    position: 'absolute',
  },

  questionSpaceRESULTS: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    marginLeft: 0,
    marginTop: 0,
    backgroundColor: 'white'
  },

  trafficLightSpaceRESULTS: {
    width: '100%',
    height: '38%',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
  },

  trafficLightSpace2RESULTS: {
    width: 170,
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  buttonStylesRESULTS: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },

  shareAnswerButtonPlacementRESULTS: {
    width: '100%',
    height: '20%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  shareAnswerButtonStyleRESULTS: {
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 7,
  },

  homeButtonStyleRESULTS: {
    width: 90,
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 7,
  },
});
