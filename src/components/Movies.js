import React, { Component } from "react";
import axios from "axios";

const MoviesApi = axios.create({
  baseURL:
    "https://api.themoviedb.org/3/movie/popular?api_key=15d2fea4af4c902341980670dee0f57e&language=pt-US&page=1"
});                                                     

class Movies extends Component {
  state = {
    movies: []
  };

  componentDidMount() {
    this.getMovies();
  }

  getMovies = async () => {
    const response = await MoviesApi.get();
    console.log("Filmes:", response.data.results);

    const completeMovies = response.data.results.map((item) => {
      return {
        ...item,
        poster_path: `https://image.tmdb.org/t/p/w500${item.poster_path}`
      };
    });

    this.setState({
      movies: completeMovies
    });
  };

  render() {
    return (
      <section>
        <div>
          <h2>FILMES</h2>
        </div>

        <div>
          {this.state.movies.map((item, id) => (
            <div key={id}>
              <p>{item.title}</p>
              <p>{item.vote_average}</p>
              <img src={item.poster_path} alt="" />
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export default Movies;
