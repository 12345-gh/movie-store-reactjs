import React, {Component} from 'react';
import './FilmItem.css';
import emptyFavorites from '../../img/favorite-h-empty-white.svg';
import fullFavorites from '../../img/favorite-h-full-white.svg';
import idb from '../../common/providers/indexeddb-provider';
import svgImage from '../../common/scripts/svg-image';

class FilmItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: null,
			imageSrc: 'http://image.tmdb.org/t/p/w300/' + this.props.item.poster_path,
		};

		this.onClickAddToFavorites = this.onClickAddToFavorites.bind(this);
		this.onClickRemoveToFavorites = this.onClickRemoveToFavorites.bind(this);
	}

	componentDidMount() {
		svgImage.updateSvg();
	}

	onClickAddToFavorites(item) {
		return () => {
			console.log(item);
			idb.putData(
				item.id,
				item.title,
				item.poster_path,
				item.vote_average,
				item.vote_count,
				item.release_date,
				true
			);
		}
	}

	onClickRemoveToFavorites(item) {
		return () => {
			idb.deleteDataById(item.id);
			this.props.updateList();
		}
	}

	onError() {
		this.setState({
			imageSrc: "http://lorempixel.com/300/450/"
		})
	}

	render() {

		if (!this.props.item) {
			return <li className="film-item"> Please wait... </li>
		} else {
			let item = this.props.item,
				addToFavoritesImg,
				removeToFavoritesImg,
				favoriteAddRemoveImg;

			addToFavoritesImg =
				<div title="Add to favorite"
				     onClick={ this.onClickAddToFavorites(item) }
				>
					<img src={emptyFavorites}
					     height="35"
					     width="35"
					     className="svg"
					/>
				</div>;

			removeToFavoritesImg =
				<div title="Remove from favorite"
					onClick={ this.onClickRemoveToFavorites(item) }
				>
					<img src={fullFavorites}
					     height="35"
					     width="35"
					     className="svg"
					/>
				</div>;

			favoriteAddRemoveImg =
				<div className='hover-block'>
					{ item.is_favorite ? removeToFavoritesImg : addToFavoritesImg }
				</div>;

			return (
				<li className="film-item">

					<div className='image'>
						<img onError={this.onError.bind(this)} src={this.state.imageSrc}></img>

						{ favoriteAddRemoveImg }
					</div>


					<div className='text'>
						<h3 className='title'>{item.title}</h3>
						<p>Score: {item.vote_average} ( {item.vote_count} votes)</p>
						<p>Release date: {item.release_date}</p>
					</div>
				</li>
			);
		}
	}
}

export default FilmItem;
