import React from 'react'
import axios from 'axios'
import {MDBRow, Spinner} from 'mdbreact'
import {Redirect} from 'react-router-dom'
import MovieCard from '../components/MovieCard'
class FavoritesView extends React.Component {

	state = {
		results: [],
		currentPage:1,
		totalPages:1,
		loading: true
	}
	componentDidMount() {
		let session = localStorage.getItem("TMDB_session_id")
		if (session) {
		axios.get("https://api.themoviedb.org/3/account/"+ localStorage.getItem("User").id +"/favorite/movies?api_key=2005b3a7fc676c3bd69383469a281eff&session_id=" + localStorage.getItem("TMDB_session_id") + "&language=en-US&sort_by=created_at.asc&page=1").then(res => {
			this.setState({
				results: res.data.results,
				currentPage: res.data.page,
				totalPages: res.data.total_pages,
				loading:false
			})
		})
	}
	}
	getFavorites = () => {
		axios.get("https://api.themoviedb.org/3/account/"+ localStorage.getItem("User").id +"/favorite/movies?api_key=2005b3a7fc676c3bd69383469a281eff&session_id=" + localStorage.getItem("TMDB_session_id") + "&language=en-US&sort_by=created_at.asc&page=1").then(res => {
			this.setState({
				results: res.data.results,
				currentPage: res.data.page,
				totalPages: res.data.total_pages
			})
		})
	}
	removeFavorite = (id) => {
		axios.post("https://api.themoviedb.org/3/account/"+ localStorage.getItem("User").id +"/favorite?api_key=2005b3a7fc676c3bd69383469a281eff&session_id=" + localStorage.getItem("TMDB_session_id"), {
			media_type : "movie",
			media_id: id,
			favorite: false
		}).then((res) => {this.getFavorites()})
	}
	render() {
		let session = localStorage.getItem("TMDB_session_id")
		if (!session) {
			return(
				<Redirect to="/" />
			)
		}
		if (this.state.loading) {
			return(
			<MDBRow center className="mt-5 pt-5">
			<Spinner blue big />
			</MDBRow>
			)
		}
		return(
			<div className="container">
			<div className="row mt-5">
				<div className="col-md-12 pt-3" style={{textAlign:"center"}}>
				<h1 className="h5-responsive font-weight-bold text-center text-uppercase pb-5">Your Favorite movies</h1>
				</div>
				<div className="col-md-12 mt-2">
					<div style={{display:"flex", justifyContent:"flex-start", flexWrap:"wrap", alignItems:"inherit", marginRight:"-30px"}}>
						{this.state.results.map((movie) => (
							<div className="col-md-3" key={movie.id} >
								<MovieCard data={movie}/>
							</div>
						))
						}
					</div>
				</div>
			</div>
			</div>
		)
	}
}

export default FavoritesView
