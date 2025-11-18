import {create} from 'zustand';

export const useAuthStore= create((set)=> ({
    user:null,
    isSignUp:false,
    isCheckingAuth:true,
    isloggingOut:false,
    isLoggingIn:false,
    signup: async(credentials)=>{
        set({})
        try {
            const response=await axios.post("api/v1/auth/signup",credentials)
            set({user:response.data.user,isSignUp:false});
            toast.success("Account created successfully");
        }catch(error){
            toast.error(error.response.data.message || "signup failed");
            set({isSignUp:false,user:null});

        }
    },
    login: async(credentials)=>{
        set({isLoggingIn:true});
        try{
            const response=await axios.post("/api/v1/auth/login",credentials);
            set({user:response.data.user, isLoggingIn:false});
        }catch(error){
            set({isLoggingIn:false, user:null});
            toast.error(error.response.data.message || "login failed"); 
        }
    },
    logout: async()=>{
        set({isLoggingOut:true});
        try{
            await axios.post("api/v1/auth/logout");
            set({user:null,isLoggingOut:false});
            toast.success("Logged out successfully");
        }catch(error){
            set({isLoggingOut:false});
            toast.error(error.response.data.message || "Logout failed");

        }
    },
    authCheck: async()=>{
        set({isCheckingAuth:true});
        try{
            const response=await axios.isCheckingAuth("/api/v1/auth/authCheck");
            set({user:response.data.user, isCheckingAuth:false});
            

        }catch(error){
            set({isCheckingAuth:false,user:null});
            toast.error(error.response.data.message || "An error occured");

        }
    },
})); 