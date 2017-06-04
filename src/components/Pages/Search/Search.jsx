import React, {Component} from 'react';
import {debounce} from 'throttle-debounce';
import './Search.css';
import FilmsList from '../../FilmsList/FilmsList';
import SearchBar from '../../SearchBar/SearchBar';
import HttpProvider from '../../../common/providers/http-provider';

const TMDB_API ="https://api.themoviedb.org/3/search/movie?api_key=0f04bbdc102bbd08c7caca24bb575d45&query=";

class Search extends Component {
	constructor(props) {
		super(props);
		// Initial state of the component
		this.state = {
			searchItemList: [],
		};

		this.handleUserInputSearchText = debounce(500, this.handleUserInputSearchText.bind(this));
	}

	handleUserInputSearchText(filterText) {
		console.log(filterText);
		let callback = (data) => {
			this.setState({
				searchItemList: data.results
			});
		};

    if (filterText) {
	    HttpProvider.getRequest(TMDB_API + filterText, callback);
    }
	}

	render() {
		return (
			<div>
				<SearchBar
					onUserInputSearchText={this.handleUserInputSearchText}
				/>

				<FilmsList
					dataList = {this.state.searchItemList.slice(0,10)}
				/>
			</div>
		);

	}
}

export default Search;
