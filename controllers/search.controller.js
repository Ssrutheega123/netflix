import { User } from "../models/user.model";
import { fetchFromTMBD } from "../service/tmbd.service.js";

export async function searchPerson(req,res){
//'https://api.themoviedb.org/3/search/person?include_adult=false&language=en-US&page=1"
    const { query }=req.params;
    try{
        const response = await fetchFromTMBD(`https://api.themoviedb.org/3/search/person?${query}&include_adult=false&language=en-US&page=1`);
    
    if(response.results.length===0){
        return res.status(404).send(null);
    }

    await User.findByIdAndUpdate(req.user._id, {
        $push:{
            searchHistory:{
                id:response.results[0].id,
                mage:response.results[0].profile_path,
                title:response.results[0].name,
                searchType:"person",
                createdAt:new Date(),
            },

        },
    });

    res.status(200).json({success: true,content: response.results});
    }catch(error){
        console.log("Error in searchPerson controller",error.message);
        res.status(500).json({success:false,message:"Internal server error"});
    }

}
export async function searchMovie(req,res){


    const { query }=req.params;
    try{
        const response = await fetchFromTMBD(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);
        if(response.results.length===0){
            return res.status(404).send(null);
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    mage:response.results[0].poster_path,
                    title:response.results[0].name,
                    searchType:"movie",
                    createdAt:new Date(),
                },
    
            },
        });
        res.status(200).json({success: true,content: response.results});

    }catch(error){
    console.log("Error in searchMovie controller",error.message);
    res.status(500).json({success:false,message:"Internal server error"});
    }
}
export async function searchTv(req,res){
    const { query }=req.params;
    try{
        const response = await fetchFromTMBD(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);
        if(response.results.length===0){{
            return res.status(404).send(null);
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    mage:response.results[0].poster_path,
                    title:response.results[0].name,
                    searchType:"tv",
                    createdAt:new Date(),
                },
    
            },
        });
        res.status(200).json({success: true,content: response.results});
        }
    }
    catch(error){
        console.log("Error in searchTv controller",error.message);
        res.status(500).json({success:false,message:"Internal server error"});
    }


}

export async function getSearchHistory(req,res){
    try{
        res.status(200).json({success:true,content:req.user.searchHistory});
    }catch(error){
        res.status(500).json({success:false,message:"Internal server error"});

    }

}

export async function removeItemFromSearchHistory(req,res){
    const { id }=req.params;

}