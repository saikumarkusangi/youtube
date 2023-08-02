import React, { useState } from 'react';
import axios from 'axios';
import {FiSearch} from "react-icons/fi";



const SearchVolume = ({searchResults,keyword}) => {
 
  function formatViewCount(viewCount) {
    if (viewCount >= 10000000) {
      return (viewCount / 1000000).toFixed(1) + 'M';
    } else if (viewCount >= 10000) {
      return (viewCount / 1000).toFixed(1) + 'K';
    } else {
      return viewCount.toString();
    }
  };
  function timeAgo(date) {
    const currentTime = new Date();
    const inputTime = new Date(date);
    const timeDifference = currentTime - inputTime;
  
    // Calculate time in different units
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));
    const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30.44));
    const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));
  
    if (minutes < 1) {
      return "just now";
    } else if (minutes < 60) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (days < 7) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (weeks < 4) {
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (months < 12) {
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  }
  

  return (
    <div>
    
      {searchResults.length > 0 ? (
        <div>
          <h2 className='text-2xl px-4 py-4'>Search Results for "{keyword}"</h2>
          {searchResults.map((result, index) => (
            <div className=' md:flex gap-4 px-4  py-4 mb-4' key={index}>
             <div className='h-48 md:w-[38%] md:h-60 rounded-2xl overflow-hidden '>
             <img className= 'h-full w-full md:w-full md:h-full object-cover ' src={result.thumbnail} alt={`Thumbnail ${index}`} />
             </div>
              <span className='h-48 flex flex-col justify-between md:w-[80%] md:mt-0 mt-2 mx-auto'>
                <p className='text-xl'>{result.title}</p>
                <p className='line-clamp-1 text-xm text-gray-500'>{result.description} views</p>
                <span className='flex gap-3 items-center'>
                  <img className='rounded-full md:w-5 md:h-5 w-8 h-8 object-cover' src={result.channelImage} alt='...'/>
                  <p className='text-sm'>{result.channelTitle}</p>
                </span>
                
                    <span className='flex flex-row md:flex-col'>
                    <p>{formatViewCount(result.viewCount)} views . </p>
                    <p>{timeAgo(result.publishedAt)}</p>
                    </span>
                
              </span>
            </div>
          ))}
        </div>
      ) : 
     <div className='items-center flex flex-col justify-center h-[60vh]'>
     <img className='md:w-[20%] md:mt-10' src='https://img.freepik.com/free-vector/press-play-concept-illustration_114360-1216.jpg'/>
     <h1 className='text-2xl font-bold'>Search for your favourite video</h1>
     </div>
    }
    </div>
  );
};

export default SearchVolume;
