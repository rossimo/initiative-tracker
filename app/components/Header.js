var React = require('react');

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.handleSort = this.handleSort.bind(this);
    }

    handleSort(key, event) {
        this.props.onClick(key);
    }

    render () {
        return <thead>
            <tr>
                <th onClick={this.handleSort.bind(this, 'characterName')}>Character Name</th>
                <th onClick={this.handleSort.bind(this, 'initiative')}>Dexterity</th>
                <th onClick={this.handleSort.bind(this, 'roll')}>Roll</th>
                <th>Remove</th>
            </tr>    
        </thead>
    }
}

module.exports = Header;