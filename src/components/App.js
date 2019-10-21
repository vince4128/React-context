import React, {Component} from 'react';
import UserCreate from './UserCreate';
import LanguageContext from '../contexts/LanguageContext'
import ColorContext from '../contexts/ColorContext'

class App extends Component {
    state = { 
        language: 'english',
        theme: 'primary'
    };

    onLanguageChange = language => {
        this.setState({ language })
        console.log('coucou ', this.state.language)
    }

    onThemeChange = e => {
        this.setState({theme: e.target.value});
      }

    render() {
        return (
            <div className="ui container">
                <div>
                    Select a language:
                    <i className="flag gb" onClick={() => this.onLanguageChange('english')}></i>
                    <i className="flag fr" onClick={() => this.onLanguageChange('french')}></i>
                </div>
                <div>
                    Select a theme:
                    <select 
                        placeholder="select a theme"
                        value={this.state.theme}
                        onChange={this.onThemeChange}
                    >
                        <option value="primary">Blue</option>
                        <option value="red">Red</option>
                    </select>
                </div>
                <ColorContext.Provider value={this.state.theme}>
                    <LanguageContext.Provider value={this.state.language}>
                        <UserCreate/>
                    </LanguageContext.Provider>
                </ColorContext.Provider>
            </div>
        )
    }
}

export default App;