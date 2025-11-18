import axios from 'axios';
import { ENV_VARS } from "../config/envVars.js";

fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
.then(res => res.json())
.then(res => console.log(res))
.catch(err => console.error(err));


export const fetchfromTMBD=async(url)=>{
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer '+ENV_VARS.TMBD_API_KEY,
        },
    };

    const response=await axios.get(url,options);
    if(response.status!==200){
        throw new error("Failed to fetch data from TMBD"+response.statusText);
    }
    return response.data;
    
};


