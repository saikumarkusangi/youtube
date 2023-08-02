import { useState } from "react";
import SearchVolume from "./search";
import axios from "axios";
import {FiSearch} from "react-icons/fi";

function App() {
  const API_KEY = 'AIzaSyDo-PgJ-pm5iTdA1uZ6LKC0Sz8QGJvaPCs';
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?q=${encodeURIComponent(
          keyword
        )}&part=snippet&type=video&maxResults=50&key=${API_KEY}`
      );

      const videoIds = response.data.items.map((item) => item.id.videoId);
      const videoResponses = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoIds.join(
          ','
        )}&part=snippet,statistics&key=${API_KEY}`
      );
     console.log(videoResponses.data.items)
      const searchResults = videoResponses.data.items.map((item) => ({
        
        title: item.snippet.title,
        viewCount: item.statistics.viewCount || 0,
        thumbnail: item.snippet.thumbnails.high.url,
        description:item.snippet.description,
        publishedAt:item.snippet.publishedAt,
        channelTitle:item.snippet.channelTitle,
        channelImage: item.snippet.thumbnails.default.url,
      }));

      setSearchResults(searchResults);
    } catch (error) {
      console.error('Error fetching data:', error);
      setSearchResults([]);
    }
  };
  return (
    <div className="">
    <div className="px-4 bg-red-100 md:px-10 py-4 md:flex md:justify-between">
  <span>
  <img className="md:w-[20%] w-[60%]" src="https://www.edigitalagency.com.au/wp-content/uploads/Youtube-logo-png.png" alt="youtube logo"/>
  <h1 className="md:px-[7%]  text-sm" >Keyword Search Volume by sai kumar kusangi</h1>
  </span>
    <div className='relative md:w-[40%] w-full mt-4 md:mt-0'>
    <input
    className='focus:outline-none focus:ring-1 w-full md:w-[100%] ring-red-400  px-2 py-3 rounded-lg'
      type="text"
      placeholder="Enter a keyword"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
    />
    <button className=' text-white bg-red-500 px-3 md:h-[85%] h-[100%] absolute top-0 right-0 rounded-sm' onClick={handleSearch}>
       <FiSearch size={24}/>
    </button>
    </div>
    </div>
    <SearchVolume searchResults={searchResults} keyword={keyword}/>
    </div>
  );
}

export default App;
