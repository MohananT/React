import React from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar'
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'

const API_KEY = "AIzaSyBbbZ3OhOnr9Iy0LSKdJyz1JN8gucTMOUg";



class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      videos:[]
    }

    YTSearch({key:API_KEY, term: 'surf'}, (data) => {
      this.setState({
        videos:data
      })
    });
  }
  render(){
    return(
      <div>
        <SearchBar />
        <VideoDetail video={this.state.videos[0]} />
        <VideoList videos={this.state.videos} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));