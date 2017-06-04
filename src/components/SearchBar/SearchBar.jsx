import React, {Component} from 'react';
import './SearchBar.css';

class SearchBar extends Component {
	constructor(){
		super();

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange() {
		this.props.onUserInputSearchText(
			this.refs.filterTextInput.value
		);
	}

	render() {
		return (
			<div className="search-bar">
				<input
					type="text"
					placeholder="Enter search film title..."
					ref="filterTextInput"
					className="search-bar-text-input"
					onChange= {this.handleChange}
				/>
			</div>
		);
	}
}

export default SearchBar;
