import React from 'react';
import './FilmsList.css';
import FilmItem from '../FilmItem/FilmItem';

class FilmsList extends React.Component {
	render(){
		let filmItems = [];
		let dataList = this.props.dataList;
		dataList.forEach((item) => {

			filmItems.push(
				<FilmItem
					key = {item.id}
					item = {item}
					updateList = {this.props.updateList}
				/>
			);
		});

		if (!filmItems.length) {
			return (<div className="films-list-empty"> Loading... </div>)
		} else {
			return (
				<div>
					<ul className="films-list">
						{filmItems}
					</ul>
				</div>
			);
		}
	}
}

export default FilmsList;