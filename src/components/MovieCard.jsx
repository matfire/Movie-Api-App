import React from 'react'
import { Button, Card, CardBody, CardImage, CardTitle, CardText } from 'mdbreact';
import {Fa} from 'mdbreact'

class MovieCard extends React.Component {
	render() {
		return(
				<Card cascade className="mb-4">
					<a href={"/movies/"+this.props.data.id} ><CardImage className="img-fluid" src={"https://image.tmdb.org/t/p/w342/" + this.props.data.poster_path} style={{cursor:"pointer"}} alt={this.props.data.title} href={"/movies/" + this.props.data.id} hover/></a>
					<CardBody>
						<CardTitle className="h5-responsive"><a href={"/movies/"+this.props.data.id} style={{color:"inherit"}}>{this.props.data.title}</a></CardTitle>
						<CardText><Fa icon="star"/>{this.props.data.vote_average}/10</CardText>
						<Button className="btn-cyan" href={"/movies/" + this.props.data.id}>Learn More</Button>
					</CardBody>
				</Card>
		)
	}
}

export default MovieCard