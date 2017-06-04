import React, {Component} from 'react';
import './Popular.css';
import FilmsList from '../../FilmsList/FilmsList';
import HttpProvider from '../../../common/providers/http-provider';

const TMDB_API ="https://api.themoviedb.org/3/movie/popular?api_key=0f04bbdc102bbd08c7caca24bb575d45";

class Popular extends Component {
	constructor(props) {
		super(props);
		// Initial state of the component
		this.state = {
			popularItemList: [],
		};
	}

	componentDidMount() {
		let callback = (data) => {
			this.setState({
				popularItemList: data.results
			});
		};

		HttpProvider.getRequest(TMDB_API, callback);
	}

	render() {
		return (
			<FilmsList
				dataList = {this.state.popularItemList.slice(0,10)}
			/>
		);


	}
}

export default Popular;
