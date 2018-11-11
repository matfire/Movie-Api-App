import React from 'react'
import {Table, Button} from 'reactstrap'
import axios from 'axios'
import MovieGridPage from '../components/MovieGridComponents/MovieGridPage'


class FavoritesView extends React.Component {

	state = {
		results: [],
		currentPage:1,
		totalPages:1
	}
	componentDidMount() {
		axios.get("https://api.themoviedb.org/3/account/"+ localStorage.getItem("User").id +"/favorite/movies?api_key=2005b3a7fc676c3bd69383469a281eff&session_id=" + localStorage.getItem("TMDB_session_id") + "&language=en-US&sort_by=created_at.asc&page=1").then(res => {
			this.setState({
				results: res.data.results,
				currentPage: res.data.page,
				totalPages: res.data.total_pages
			})
		})
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
	renderRow = () => {
		if (this.state.results) {
			let results = this.state.results.map((item) => (
				<tr key={item.id}>
					<th><a href={"/movies/" + item.id}><img src={"https://image.tmdb.org/t/p/w154"+ item.poster_path} alt={item.title} /></a></th>
					<th>{item.title}</th>
					<th>{item.overview}</th>
					<th><Button color="danger" onClick={() => {this.removeFavorite(item.id)}}>Remove from Favorites</Button></th>
				</tr>
			))
			return results
		}
	}
	render() {
		const rows = this.renderRow()
		return(
			<MovieGridPage data={this.state.results}/>
		)
	}
}

export default FavoritesView
