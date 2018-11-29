import React from 'react'
import 'react-loading-bar/dist/index.css'
import axios from 'axios'
import {NotificationManager} from 'react-notifications';
import {CardGroup} from 'mdbreact'
import MovieCard from '../components/MovieCard'
import {LoopingRhombusesSpinner} from 'react-epic-spinners'
class Trending extends React.Component {
	state = {
		data: [],
		loading:true
	}

	componentDidMount() {
		axios.get("https://api.themoviedb.org/3/trending/movie/day?api_key=2005b3a7fc676c3bd69383469a281eff").then(res => {
			this.setState({
				data: res.data.results,
				loading:false
			})
		}).catch(err => {
			NotificationManager.error('Something went wrong', 'There is a problem with our server. Please try reloading the page')
			this.setState({loading:false})
		})
	}
	render() {
		if (this.state.loading) {
			return(
				<LoopingRhombusesSpinner />
			)
		}
		return(
			<div className="container">
			<div className="row mt-5 d-flex justify-content-center">
			<div className="col-md-12 pt-3" style={{textAlign:"center"}}>
				<h1 className="h5-responsive font-weight-bold text-center text-uppercase pb-5">Trending</h1>
				</div>
				{this.state.data.map((movie) => (
							<div className="col-md-3" key={movie.id}>
								<MovieCard data={movie} />
							</div>
						)
					)
				}
			</div>
			</div>
		)
	}
}

export default Trending