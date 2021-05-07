import React, { Component } from 'react';
var firebase = require('firebase');


var config = {
    apiKey: "AIzaSyBGT6DTW-7H5ERwMyNHcthoMZ7fj59bEvc",
    authDomain: "usurvey-7e9c9.firebaseapp.com",
    databaseURL: "https://usurvey-7e9c9-default-rtdb.firebaseio.com",
    projectId: "usurvey-7e9c9",
    storageBucket: "usurvey-7e9c9.appspot.com",
    messagingSenderId: "303059354486",
    appId: "1:303059354486:web:47312051ef7761052bf057",
    measurementId: "G-57DTHKSZ66"
  };
  firebase.default.initializeApp(config);

  class Authen extends Component {

    login(event){
      const email = this.refs.email.value;
      const password = this.refs.password.value;
      console.log(email, password);
  
      const auth = firebase.default.auth();
  
      const promise = auth.signInWithEmailAndPassword(email, password);
  
      promise.then(user => {
        var lout = document.getElementById('logout');
  
      
        lout.classList.remove('hide');
      });
  
      promise.catch(e => {
        var err = e.message;
        console.log(err);
        this.setState({err: err});
      });
    }
  
    signup(){
      const email = this.refs.email.value;
      const password = this.refs.password.value;
      console.log(email, password);
  
      const auth = firebase.default.auth();
  
      const promise = auth.createUserWithEmailAndPassword(email, password);
  
      promise
      .then(user => {
        var err = "Welcome "+ user.user.email;
        firebase.default.database().ref('users/'+user.email).set({
          email: user.user.email
        });
        console.log(user.user);
        this.setState({err: err});
      });
      promise
      .catch(e => {
        var err = e.message;
        console.log(err);
        this.setState(({err: err}));
      });
    }
  
    logout(){
      firebase.default.auth().signOut();
      var lout = document.getElementById('logout');
  
      lout.classList.add('hide');
    }
  
    google(){
      console.log("I am in google method");
  
      var provider = new firebase.default.auth.GoogleAuthProvider();
      var promise = firebase.default.auth().signInWithPopup(provider);
  
      promise.then( result => {
        var user = result.user;
        console.log(result);
        firebase.default.database().ref('users/'+user.uid).set({
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL,
          refreshToken: user.refreshToken
        });
  
      });
      promise.catch(e => {
        var msg = e.message;
        console.log(msg);
      });
  
    }
  
    constructor(props){
      super(props);
  
      this.state = {
        err: ''
      };
  
      this.login = this.login.bind(this);
      this.signup = this.signup.bind(this);
      this.logout = this.logout.bind(this);
      this.google = this.google.bind(this);
    }
  
    render(){
      return(
        <div>
          <input id="email" ref="email" type="email" placeholder="Enter your email" /><br />
          <input id="pass" ref="password" type="password" placeholder="Enter your password" /><br /> 
           <button onClick={this.login}>Log In</button>
          <button onClick={this.signup}>Sign Up</button>
          <button onClick={this.logout} id="logout" className="">Log out</button><br /> 
          <button onClick={this.google} id="google" className="google">Sign In with Google</button>
        </div>
      );
    }
  }
  
  
  export default Authen;
  