import React       from 'react';
import { render }  from 'react-dom';
import $           from 'jquery';
import Autosuggest from 'react-autosuggest';//Reference:  https://github.com/moroshko/react-autosuggest
// import './theme.css'; Moved to SCSS include at src/stylesheets/components/search-bar.scss


function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestionValue(suggestion) {
  return suggestion.plant_name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.plant_name}</span>
  );
}

let count=0;
let currentSelected = 'swag';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: '',
      value: '',
      suggestions: [],
    };
  }

  componentDidMount() {
    this._timer = setInterval(() => this.counter(), 1200);
  }

  componentWillUnmount() {
    clearInterval(this._timer);
  }

  counter() {
    count = count > 100? 0: count + 1;
    if (this.props.plants.toArray) {
      let name = this.props.plants.toArray()[count].plant_name;
      this.setState({placeholder:`Learn about your ${name}`});
    }
  }

  getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim().toLowerCase());
    if (escapedValue === '') {
      return [];
    }
    const regex = new RegExp(escapedValue);
    const plants = this.props.plants.toArray();

    let filteredPlants = plants.filter(plant => regex.test(plant.plant_name.toLowerCase()));
    return filteredPlants.slice(0, 8);
  }

  onChange (event, { newValue, method }) {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested ({value}) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested () {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected (event, { suggestion, suggestionValue, sectionIndex, method }) {
    let selected = suggestionValue;
    if (selected !== currentSelected) {
      currentSelected = selected;
      this.props.fetchPlant(selected);
      this.setState({
        value: '',
        suggestions: []
      });
    }
  };

  shouldRenderSuggestions(value) {
    return value.trim().length > 3;
  }

  storeInputReference (autosuggest) {
    if (autosuggest !== null) {
      this.input = autosuggest.input;
      // let selected = autosuggest.input.value;
      // if (selected !== currentSelected) {
      //   currentSelected = selected;
      //   this.props.fetchPlant(selected);
      // }
    }
  }


  render() {

    const { value, suggestions, placeholder} = this.state;
    const inputProps = {
      placeholder,
      value,
      onChange: this.onChange.bind(this)
    };
    
    return (

      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
        onSuggestionSelected={this.onSuggestionSelected.bind(this)}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        focusInputOnSuggestionClick={false}
        ref={this.storeInputReference.bind(this)}
      />
        
    );
    
  }
}

