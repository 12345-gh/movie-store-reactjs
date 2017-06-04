import React, {Component} from 'react';
import './Favorites.css';
import FilmsList from '../../FilmsList/FilmsList';
import idb from '../../../common/providers/indexeddb-provider';

class Favorites extends Component {
	constructor(props) {
		super(props);
		// Initial state of the component
		this.state = {
			favoritesItemList: [],
		};

		this.updateListData = this.updateListData.bind(this);
	}

	updateListData() {
		let callback = (data) => {
			// Do something with the request.result!
			if (data) {
				this.setState({
					favoritesItemList: data
				});
			} else {
				console.log("Couldn't be found in your database!");
			}
		};

		idb.readAllData(callback);
	};

	componentDidMount() {
		this.updateListData();
	}

	render() {
		return (
			<FilmsList
				dataList = {this.state.favoritesItemList}
			  updateList = {this.updateListData}
			/>
		);


	}
}

export default Favorites;
