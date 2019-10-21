import React, {Component} from 'react';
import UserCreate from './UserCreate';

class App extends Component {
    state = { language: 'english'};

    onLanguageChange = language => {
        this.setState({ language })
    }

    render() {
        return (
            <div className="ui container">
                <div>
                    Select a language:
                    <i className="flag gb" onClick={() => this.onLanguageChange('english')}></i>
                    <i className="flag fr" onClick={() => this.onLanguageChange('french')}></i>
                </div>
                <UserCreate/>
            </div>
        )
    }
}

export default App;