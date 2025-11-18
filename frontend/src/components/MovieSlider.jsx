import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {useContentStore} from '../store/content';
const [showArrows,setShowArrows]=useState(false);

const SMALL_IMG_BASE_URL = "https://image.tmdb.org/t/p/w300";

const MovieSlider=({category})=>{
    const {contentType}=useContentStore();
    const [content,setContent]=useState([]);
    const formattedCategory=
        category.replaceAll("_"," ")[0].toUpperCase()+category.replaceAll("_"," ").slice(1);
    const formattedContentType=contentType==="movie"? "Movies" : "TV Shows";
    useEffect(()=>{
        const getContent=async()=>{
            const res=await axios.get(`/api/v1/${contentType}/${category}`);
            setContent(res.data.content);
        }
        getContent()
    },[category,contentType]);
    return (
    <div className='bg-black text-white relative px-5 md:px-20'>
        <h2 className="mb-4 text-2xl font-bold">
            {formattedCategory} {formattedContentType}
        </h2>
        <div className='flex gap-x-4 overflow-x-scroll'>
            {content.map((item)=>(
                <Link to={`/watch/${item.id}`} className="min-w-[250px] relative group" key={item.id}>
                    <div className='rounded-lg overflow-hidden'>
                        <img src={SMALL_IMG_BASE_URL+item.backdrop_path} alt="Movie image" 
                            className="transition-transform duration-300 ease-in-out group-hover:scale-125" 
                        />
                    
                    </div>
                    <p className="mt-2 text-center">{item.title || item.name}</p>
                </Link>
            ))}
            </div>
    </div>
    );
    
};
export default MovieSlider;