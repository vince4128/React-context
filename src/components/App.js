import React, {Component} from 'react';
import UserCreate from './UserCreate';
import LanguageContext from '../contexts/LanguageContext'

class App extends Component {
    state = { language: 'english'};

    onLanguageChange = language => {
        this.setState({ language })
        console.log('coucou ', this.state.language)
    }

    render() {
        return (
            <div className="ui container">
                <div>
                    Select a language:
                    <i className="flag gb" onClick={() => this.onLanguageChange('english')}></i>
                    <i className="flag fr" onClick={() => this.onLanguageChange('french')}></i>
                </div>
                <LanguageContext.Provider value={this.state.language}>
                  <UserCreate/>
                </LanguageContext.Provider>
            </div>
        )
    }
}

export default App;