var React = require('react');
var classNames = require('classnames');
var Header = require('./Header.js');
var InputRow = require('./InputRow.js');
require('bulma/css/bulma.css');
require('../index.css');

function random(min, max) {
    min = Math.ceil(parseInt(min));
    max = Math.floor(parseInt(max));
    return Math.floor(Math.random() * (max - min)) + min;
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            characters: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.rollInitiative = this.rollInitiative.bind(this);
    }

    handleSubmit(initiative, characterName, health) {
        this.setState(function () {
            this.state.characters.push({
                initiative: initiative,
                characterName: characterName,
                health: health
            });
        });
    }

    removeRow(index, event) {
        var characters = [...this.state.characters];
        characters.splice(index, 1);
        this.setState({ characters });
    }

    handleSort(key, event) {
        var characters = [...this.state.characters];
        switch (key) {
            case 'characterName':
                characters.sort(function (a, b) {
                    return a.characterName.localeCompare(b.characterName);
                })
                break;
            case 'initiative':
                characters.sort(function (a, b) {
                    return parseInt(b.initiative) - parseInt(a.initiative);
                });
                break;
            case 'roll':
                characters.sort(function (a, b) {
                    return parseInt(b.roll) - parseInt(a.roll);
                });
                break;
            case 'health':
                characters.sort(function (a, b) {
                    return parseInt(b.health) - parseInt(a.health);
                });
                break;
        }
        this.setState({ characters });
    }

    rollInitiative() {
        let characters = [...this.state.characters].map(character => {
            character.roll = random(0, 20) + parseInt(character.initiative)
            return character;
        });

        this.setState({ characters });
        this.handleSort('roll');
    }

    render() {
        return <div className="app">
            <table className={classNames("table", "is-striped")}>
                <Header onClick={this.handleSort} />
                <tbody>
                    {this.state.characters.map(function (character, index) {
                        return <tr key={index}>
                            <td>{character.characterName}</td>
                            <td>{character.initiative}</td>
                            <td>{character.roll}</td>
                            <td>
                                <a className={classNames("button", "is-danger", "is-small")}
                                    onClick={this.removeRow.bind(this, index)}>X</a>
                            </td>
                        </tr>
                    }, this)}
                </tbody>
            </table>
            <hr />
            <InputRow onSubmit={this.handleSubmit} />
            <br />
            <button className={classNames("button", "is-primary", "is-fullwidth")}
                onClick={() => this.rollInitiative()}>Roll Initiative!</button>
        </div>
    }
}

module.exports = App;