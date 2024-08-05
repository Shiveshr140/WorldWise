import { useContext, createContext,useEffect, useState, useReducer } from "react";


// const CitiesContext = createContext()


// const Base_Url = "http://localhost:8000"

// function CitiesProvider({children}){
//   const [cities, setCities] = useState([])
//   const [isLoading, setIsLoading] = useState(false)
//   const [currentCity, setCurrentCity] = useState({})
  
//   useEffect(function(){
//     async function fetchCities(){
//       try{
//         setIsLoading(true)
//         const res = await fetch(`${Base_Url}/cities`)
//         const data = await res.json()
//         setCities(data)
//       }
//       catch{
//         alert("There is issue in fetching the cities")
//       }
//       finally{
//         setIsLoading(false)
//       }
//     }
//     fetchCities()
//   }
//   ,[])


//   async function getCity(id){
//     try{
//       setIsLoading(true)
//       const res = await fetch(`${Base_Url}/cities/${id}`)
//       const data = await res.json()
//       setCurrentCity(data)
//     }
//     catch{
//       alert("There is issue in fetching the cities")
//     }
//     finally{
//       setIsLoading(false)
//     }
//    }

// // let's then finally create that function which uploads this new object to our fake API.And just like all the other functions that are about that API, we do that in the context.
// // So right here in the city's context.So we already have gat city.And now, well, let's just copy and paste this again. Here we create createCity. And this gets as input a newCity. Now here, we don't need this. So just two cities.
// // And since this is now going to be a post request we need to specify here the options object. So the method is post, then the actual data that we want to send now is in the body property.
// // And so that's going to be the new city converted to JSON. Or actually to a string, not to JSON. And then here we just pass in the newCity.
// // And finally, we need to specify some headers. So in this case, the Content-Type header should be set to application/json just so that the API knows what data format it is receiving. All right, so pretty standard stuff.
// // And if you're not used to this, then this is again, nothing about React. This is just the standard way
   
//    async function createCity(newCity){
//     try{
//       setIsLoading(true)
//       const res = await fetch(`${Base_Url}/cities`,{
//         method:"POST",
//         body: JSON.stringify(newCity),
//         header:{
//           "Content-Type": "application/json"
//         }
//       })
//       const data = await res.json()
//       // basically, we're gonna keep the application state in sync with the state from the UI. Or in other words, using the terminology that we have learned earlier in the section we're gonna keep the UI state in sync with remote state.
//       setCities((prevCities)=>[...prevCities, data])
//     }
//     catch{
//       alert("There is issue in loading... the cities")
//     }
//     finally{
//       setIsLoading(false)
//     }
//    }

//    async function deleteCity(id){
//     try{
//       setIsLoading(true)
//       await fetch(`${Base_Url}/cities/${id}`,{
//         method:"DELETE",
//       })
//      setCities((cities)=> cities.filter((city)=> city.id !== id))
//     }
//     catch{
//       alert("There is issue in deleting... the cities")
//     }
//     finally{
//       setIsLoading(false)
//     }
//    }
  
//   return (
//         <CitiesContext.Provider value={{cities, isLoading, currentCity , getCity, createCity, deleteCity }}>
//             {children}
//         </CitiesContext.Provider>
//     )
// }

// function useCities(){
//     const context = useContext(CitiesContext)
//     if(context === undefined) throw new Error("CitiesContext is used outside the CitiesProvider")
//     return context;
// }


// export {CitiesProvider, useCities}




/////*************************  Context api + reducer

// So when we use a reducer in a bit larger application like this one it's very important to follow a meaningful naming conventions when it comes to the action types.
// So it's usually a good idea to model these actions as events and not as setters because this makes it easier to see all the related state transitions.
// For example, it shouldn't be set cities but instead we can call this cities/loaded or we can also do this, but it's a bit
// of a naming convention to use a slash like this at least in the Redux community.

const CitiesContext = createContext()


// const Base_Url = "http://localhost:8000"
const Base_Url = "https://json-server-worldwise.onrender.com"

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error:"",
}

function reducer(state, action){
  switch(action.type){
    case "loading":
      return {
        ...state, isLoading: true
      }

    case "cities/loaded":
     return  {
        ...state, isLoading: false, cities: action.payload
      }

    case "city/loaded":
      return {
        ...state, isLoading:false, currentCity:action.payload 
      }

    case "city/created":
      return{
        ...state, isLoading:false, cities: [...state.cities, action.payload], currentCity:action.payload
      }

    case "city/deleted":
      return{
        ...state, 
        isLoading:false, 
        cities: state.cities.filter((city)=> city.id !== action.payload),
        currentCity:{}
      }

    case "rejected":
      return {
        ...state, isLoading:false, error: action.payload
      }

    default: 
     throw new Error("Unkown action")
  }
}

function CitiesProvider({children}){
  const [state, dispatch] = useReducer(reducer, initialState)
  const {cities, isLoading, currentCity} = state
  
  
  useEffect(function(){
    async function fetchCities(){
      dispatch({type:"loading"})
      try{
        const res = await fetch(`${Base_Url}/cities`)
        const data = await res.json()
        dispatch({type:"cities/loaded", payload:data})
      }
      catch{
        dispatch({type:"rejected", payload:"There is issue in fetching the cities"})
      }
    ////  so now here we can also get rid of finally block. But then the problem is that if there is some error then the loading state will never get back to faults. And so actually to make this a bit more complete let's also create a new state here for the error.
    }
    fetchCities()
  }
  ,[])


  async function getCity(id){
    //// if id we have passed is current city then no need to do api call, anythying we are getting from url is string
    if(Number(id) === currentCity.id) return

    dispatch({type:"loading"})
    try{
      const res = await fetch(`${Base_Url}/cities/${id}`)
      const data = await res.json()
      dispatch({type:"city/loaded", payload:data})
    }
    catch{
      dispatch({type:"rejected", payload:"There is issue in fetching the cities"})
    }
    
   }

// let's then finally create that function which uploads this new object to our fake API.And just like all the other functions that are about that API, we do that in the context.
// So right here in the city's context.So we already have gat city.And now, well, let's just copy and paste this again. Here we create createCity. And this gets as input a newCity. Now here, we don't need this. So just two cities.
// And since this is now going to be a post request we need to specify here the options object. So the method is post, then the actual data that we want to send now is in the body property.
// And so that's going to be the new city converted to JSON. Or actually to a string, not to JSON. And then here we just pass in the newCity.
// And finally, we need to specify some headers. So in this case, the Content-Type header should be set to application/json just so that the API knows what data format it is receiving. All right, so pretty standard stuff.
// And if you're not used to this, then this is again, nothing about React. This is just the standard way
   
   async function createCity(newCity){
    dispatch({type:"loading"})
    try{
      const res = await fetch(`${Base_Url}/cities`,{
        method:"POST",
        body: JSON.stringify(newCity),
        header:{
          "Content-Type": "application/json"
        }
      })
      const data = await res.json()
      // basically, we're gonna keep the application state in sync with the state from the UI. Or in other words, using the terminology that we have learned earlier in the section we're gonna keep the UI state in sync with remote state.
      dispatch({type:"city/created", payload: data})
    }catch{
      dispatch({type:"rejected", payload:"There is issue in creating the city"})
    }
  }

   async function deleteCity(id){
    dispatch({type:"loading"})
    try{
      await fetch(`${Base_Url}/cities/${id}`,{
        method:"DELETE",
      })
    dispatch({type:"city/deleted", payload:id})
    }catch{
      dispatch({type:"rejected", payload:"There is issue in deleting the city"})
    }
    
   }
  
  return (
        <CitiesContext.Provider value={{cities, isLoading, currentCity , getCity, createCity, deleteCity }}>
            {children}
        </CitiesContext.Provider>
    )
}

function useCities(){
    const context = useContext(CitiesContext)
    if(context === undefined) throw new Error("CitiesContext is used outside the CitiesProvider")
    return context;
}


export {CitiesProvider, useCities}



//// Let's discuss a bit what we just did here and the two options that we have when it comes to passing down the value into our context. So as I said in the beginning
// when we are working with asynchronous data and code we have two options when it comes to the dispatch function. So the first option is to pass
// in all the state plus the dispatch function into the value. And then we can use the dispatch function inside the components to update state.
// However, since we're dealing with asynchronous data we cannot have all the logic inside the reducer. And so in the case that we were passing
// the dispatch function into the context.