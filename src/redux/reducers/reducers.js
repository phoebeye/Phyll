import { combineReducers } from 'redux';
import {
  INITIAL_STATE,
  setUser,
  setUserData,
  removeUser,
  setPlants,
  setGarden,
  setAdmin,
  setJournals,
  setPlantFacts,
  toggleNewPlant,
  setUserPlantData,
  setUserPlantGeneric
} from '../containers/app';


export default function reducer(state = INITIAL_STATE, action){

  switch( action.type ){
    case 'SET_USER':
      return setUser(state, action.user);
    case 'SET_USER_PLANT_DATA':
      return setUserPlantData(state, action.userPlantData);
    case 'SET_USER_PLANT_GENERIC':
      return setUserPlantGeneric(state, action.userPlantGeneric)
    case 'REMOVE_USER':
      return removeUser(state);
    case 'SET_PLANTS':
      return setPlants(state, action.plants);
    case 'SET_GARDEN':
      return setGarden(state, action.garden);
    case 'FETCH_PLANT':
      return setPlantFacts(state, action.plantFacts);
    case 'TOGGLE_NEW_PLANT':
      return toggleNewPlant(state);
    case 'SET_ADMIN':
      return setAdmin(state, action.admins);
    case 'SET_JOURNALS':
      return setJournals(state, action.journals);
    default:
      return state;
  }
};
