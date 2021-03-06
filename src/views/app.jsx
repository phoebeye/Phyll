import React, { Component } from 'react';
import { connect }          from 'react-redux';

import Home                 from './home.jsx';
import Conservatory         from './conservatory.jsx';
import Navigation           from './navigation.jsx';
import {
  _getGarden, 
  _getPlants, 
  _fetchPlant, 
  _getUser,
  _getAdmin,
  _getJournals }            from '../redux/actions/helpers';
import {
  toggleNewPlant, 
  setUser,
  removeUser }              from '../redux/actions/actions';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.login();
    this.props.fetchPlants();
    this.props.fetchGarden();
    this.props.fetchDevs();
    this.props.fetchJournals();
    if (this.props.id){
     this.props.fetchUserPlantGeneric(this.props.id);
    };
  }

  render() {

    return(

      <div className="container-fluid">

        <Navigation { ...this.props }/>

        {React.cloneElement(this.props.children, {...this.props})} {/*This flags in ESLint, but successfully passes down props to all child views*/}
        
      </div>

    );

  }
}

function mapDispatchToProps(dispatch) {
  return {
    login                 : () => dispatch(_getUser()),
    logout                : () => dispatch(removeUser()),
    fetchUser             : () => dispatch(setUser()),
    fetchGarden           : () => dispatch(_getGarden()),
    fetchPlants           : () => dispatch(_getPlants()),
    toggleNewPlant        : () => dispatch(toggleNewPlant()),
    fetchDevs             : () => dispatch(_getAdmin()),
    fetchJournals         : () => dispatch(_getJournals()),
    fetchPlant            : (plant) => dispatch(_fetchPlant(plant)),
    fetchUserPlantGeneric : (userId) => dispatch(_fetch_User_Plants(userId))
  };
}

function mapStateToProps(state) {
  const user = state.get('user');
  if( state.get('loggedIn') ){
    return {
      devs: state.getIn(['admins', 'admins']),
      journals: state.getIn(['journals', 'journals']),
      plants: state.getIn([ 'plants', 'plants' ]),
      garden: state.getIn([ 'garden', 'garden' ]),
      user_plants: user.get('user_plants'),
      loggedIn: state.get('loggedIn'),
      username: user.get('name'),
      image: user.get('image'),
      plant_generic: user.get('generic'),
      firstName: user.get('firstName'),
      lastName: user.get('lastName'),
      plantFacts: state.getIn(['plantFacts', 'plantFacts']),
      id: user.get('id'),
      newPlant: state.get('newPlant')
    };
  }

  if (state.get('plantFacts') ) {
    return {
      devs: state.getIn(['admins', 'admins']),
    journals: state.getIn(['journals', 'journals']),
      plantFacts: state.getIn(['plantFacts', 'plantFacts']),
      plants: state.getIn([ 'plants', 'plants' ]),
      garden: state.getIn([ 'garden', 'garden' ]),
      loggedIn: state.get('loggedIn'),
      id: state.get('id'),
      newPlant: state.get('newPlant')
    };
  }

  return {
    devs: state.getIn(['admins', 'admins']),
    journals: state.getIn(['journals', 'journals']),
    plants: state.getIn([ 'plants', 'plants' ]),
    garden: state.getIn([ 'garden', 'garden' ]),
    loggedIn: state.get('loggedIn'),
    id: state.get('id'),
    newPlant: state.get('newPlant')
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
