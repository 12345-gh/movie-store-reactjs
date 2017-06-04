import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import popular from '../img/favorite-s-empty-white.svg';
import search from '../img/search-white.svg';
import favorites from '../img/favorite-h-full-white.svg';
import './App.css';
import '../common/scripts/svg-style';


export default React.createClass({
	render() {
		return (
			<div>

				<div id="left">

					{/*<div className="nav-left-side-header">*/}
						{/*My account*/}
					{/*</div>*/}

					<nav>
						<ul role="nav">
							<li>
								<Link
									onlyActiveOnIndex
									to="/"
									className="nav-a"
									activeClassName="nav-active">
									<img src={popular}
									     height="35"
									     width="35"
									     className="svg"
									/> <br/>
									<span>Popular</span>
								</Link>
							</li>

							<li>
								<Link
									to="/search"
									className="nav-a"
									activeClassName="nav-active">
									<img src={search}
									     height="35"
									     width="35"
									     className="svg"
									/> <br/>
									<span>Search</span>
								</Link>
							</li>

							<li>
								<Link
									to="/favorites"
									className="nav-a"
									activeClassName="nav-active">
									<img src={favorites}
									     height="35"
									     width="35"
									     className="svg"
									/> <br/>
									<span>Favorites</span>
								</Link>
							</li>
						</ul>
					</nav>

				</div>

				<div id="right">
					{/*<header>*/}
						{/*<h1>Movie store</h1>*/}
					{/*</header>*/}

					{/*App component continues to render while the child route's
					 component gets swapped around as this.props.children :)*/}
					{this.props.children}

					{/*<footer>*/}
						{/*<p>© Ihor Oziian</p>*/}
					{/*</footer>*/}
				</div>
			</div>
		)
	}
})
