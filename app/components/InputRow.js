var React = require('react');
var PropTypes = require('prop-types');
var classNames = require('classnames');
require('bulma/css/bulma.css');
require('../index.css');

const initialState = {
    'initiative' : '',
    'characterName': '',
    'completed': ''
}

class InputRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'initiative' : '',
            'characterName': '',
            'completed': ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.reset = this.reset.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillUpdate(nextProps, nextState) {
        nextState.completed = !!(nextState.initiative && nextState.characterName);
    }

    handleInputChange(event) {
        var target = event.target;
        var targetName = target.name;
        var targetValue = target.value;

        this.setState({
            [targetName]: targetValue
        });
    }

    reset() {
        this.setState(initialState);
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.onSubmit(
            this.state.initiative,
            this.state.characterName
        );

        this.reset();
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <div className="columns is-multiline is-mobile">
                <div className="column is-6-desktop is-6-tablet is-12-mobile">
                    <div className="field">
                        <p className="control">
                            <input 
                                name="characterName" 
                                className="input" 
                                type="text"
                                placeholder="Character Name" 
                                value={this.state.characterName}
                                onChange={this.handleInputChange}>
                            </input>
                        </p>
                    </div>
                </div>
                <div className="column is-4-desktop is-4-tablet is-6-mobile">
                    <div className="field">
                        <p className="control">
                            <input 
                                name="initiative" 
                                className="input" 
                                type="number"
                                placeholder="Dexterity"
                                value={this.state.initiative} 
                                onChange={this.handleInputChange}>
                            </input>
                        </p>
                    </div>
                </div>
                <div className="column is-2-desktop is-2-tablet">
                    <button
                        type="submit"
                        className={classNames("button", "is-primary", "is-fullwidth")}
                        disabled={!this.state.completed}>Add</button>
                </div>
            </div>
        </form>
    }
}

InputRow.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

module.exports = InputRow;