import { useState } from "react";
import { useContentStore } from "../store/content";

const useGetTrendingContent=()=>{
    const [trendingContent,setTrendingContent] = useState(null);
    const {contentType}= useContentStore();
    useEffect(()=>{
        const useGetTrendingContent=async()=>{
            const res=await axios.get(`/api/v1/${contentType}/trending`)
            setTrendingContent(res.data.content);

        };
        useGetTrendingContent();

    },[contentType]);
    return {trendingContent};
};
export default useGetTrendingContent;