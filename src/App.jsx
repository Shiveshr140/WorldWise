import { BrowserRouter,  Route, Routes, Navigate } from 'react-router-dom'
import Homepage from "./pages/Homepage"
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import PageNotFound from './pages/PageNotFound'
import Login from './pages/Login'
import AppLayout from './components/AppLayout'
import CityList from './components/CityList'
import { useEffect, useState } from 'react'
import CountryList from './components/CountryList'
import City from './components/City'
import Form from './components/Form'
import { CitiesProvider } from './contexts/CitiesContext'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './pages/ProtectedRoute'

//// 1. Building pages layout
//// 2. Building app layout

// function App() {
//   return (
//     <BrowserRouter>
//     <Routes>
//         <Route path="/" element={<Homepage />}  />
//         <Route path="product" element={<Product />}  />
//         <Route path="pricing" element={<Pricing />}  />
//         <Route path="/login" element={<Login />}  />
//         <Route path="/app" element = {<AppLayout />} />
//         <Route path="*" element={<PageNotFound />}  />
//     </Routes>
//   </BrowserRouter>
//   )
// }


//// 3. Nested routes: when we want UI to be controlled by url
//// <Route> children(u do not have to include the parent path) element can be simple jsx element/component </Route>
//// Where to show these elements for that we gotta use Outlet component from react-router-dom for e.g in this case we place <Outlet> in sidebar
//// an index route is basically the default child route that is going to be matched if none of these other routes here matches.
//// same thing we can do for homepage
// function App() {
//   return (
//     <BrowserRouter>
//     <Routes>
//         <Route index element={<Homepage />}  />
//         <Route path="product" element={<Product />}  />
//         <Route path="pricing" element={<Pricing />}  />
//         <Route path="/login" element={<Login />}  />
//         <Route path="/app" element = {<AppLayout />} > 
//           <Route index element={<p>List of cities</p>}  />
//           <Route path="cities" element={<p>List of cities</p>}/>
//           <Route path="countries" element={<p>countries</p>}/>
//         </Route>
//         <Route path="*" element={<PageNotFound />}  />
//     </Routes>
//   </BrowserRouter>
//   )
// }

// export default App


////************** Implementing cities list && countries list
//// replace element of index and cities
// Okay, so next up, let's actually set up our fake API again so that we can then fetch our city data from there.
// And so just like in the previous section, for that, we will install the json-server package.
// And this time around, I also want to add an artificial delay(delay-500) so that it looks as if the API always takes half a second
// to actually fetch the data.

// const Base_Url = "http://localhost:8000"

// function App() {
//   const [cities, setCities] = useState([])
//   const [isLoading, setIsLoading] = useState(false)
  
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
//   return (
//     <BrowserRouter>
//     <Routes>
//         <Route index element={<Homepage />}  />
//         <Route path="product" element={<Product />}  />
//         <Route path="pricing" element={<Pricing />}  />
//         <Route path="/login" element={<Login />}  />
//         <Route path="/app" element = {<AppLayout />} > 
//           <Route index element={<CityList cities={cities} isLoading={isLoading} />}  />
//           <Route path="cities" element={<CityList cities={cities} />}/>
//           <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />}/>
//         </Route>
//         <Route path="*" element={<PageNotFound />}  />
//     </Routes>
//   </BrowserRouter>
//   )
// }

// export default App



////******************* Storing state in url: dynamic routes with url parameter

// Now it's time to take the usefulness of React Router to the next level by actually storing state in the URL so that we can use it in different places
// of the application. But you might be wondering, "Storing state in the URL, don't we actually use the useState hook to manage state?"
// Well, that's true most of the time. But the URL is actually also an excellent place to store a state and especially UI state.
// And with UI state, I mean state that affects what the UI looks like. So things like an open or closed panel, or a currently applied list sorting order or filter.
// So these examples of state are great candidates to be stored in the URL and basically to be managed by the URL with React Router.
// "Now, why would we want to do that?" You might be asking. And that's again an excellent question. So the first reason is that placing state
// in the URL is an easy way to store state in a global place that is easily accessible to all components in the app.

// So before, if we wanted state to be accessible everywhere, we would have to store it in a parent component and then pass it all the way down
// to all child components using props. But if we place state in the URL, we can easily just read the value from there, wherever the component is in the component tree.
// So basically we can move some state management from React to the URL. Also, placing state in the URL is, in many situations,
// a good way to pass data from one page into the next page without having to store that data in some temporary place inside the app.
// And finally, another amazing reason why we should place UI state right in the URL is that doing so makes it possible to bookmark or to share the page with the exact UI state
// that the page had at the time that we are sharing or bookmarking it. For example, in an online shop, we might be filtering products by color and by price.
// And if that filter is saved in the URL, we can then share the page with someone and they will see the exact same filters applied
// to the list of products. So that's really helpful and enables a great user experience.

// So for actually storing state in the URL, we use Params or the Query string. Now Params, which stands for parameters are very useful to pass data to the next page
// while the Query string is useful to store some global state that should be accessible everywhere.

// So to use params with React Router, we basically do it in three steps. So first we create a new route, then we link to that route,
// and then in that route we read the state from the URL.
/// Here to link it go to cityitem.jsx

// const Base_Url = "http://localhost:8000"

// function App() {
//   const [cities, setCities] = useState([])
//   const [isLoading, setIsLoading] = useState(false)
  
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
//   return (
//     <BrowserRouter>
//     <Routes>
//         <Route index element={<Homepage />}  />
//         <Route path="product" element={<Product />}  />
//         <Route path="pricing" element={<Pricing />}  />
//         <Route path="/login" element={<Login />}  />
//         <Route path="/app" element = {<AppLayout />} > 
//           <Route index element={<CityList cities={cities} isLoading={isLoading} />}  />
//           <Route path="cities" element={<CityList cities={cities} />}/>
//           <Route path="cities/:id" element={<City />} />
//           <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />}/>
//         </Route>
//         <Route path="*" element={<PageNotFound />}  />
//     </Routes>
//   </BrowserRouter>
//   )
// }

// export default App




////************************** programmatic navigation with useNavigate &&& Programmatic navigation using Navigation

// Let's learn about programmatic navigation with the use navigate custom hook. So programmatic navigation basically means to move to a new URL
// without the user having to click on any link. And a common use case of this behavior is right after submitting a form. So many times when the user submits a form,
// we want them to move to a new page in our application automatically. So without having to click on any link. And so then we can use programmatic navigation to achieve that.
// add route for form

// There is also a declarative way of doing that. And so let's now check out the Navigate component. Now, since we have React hooks,
// the Navigate component that we're going to learn about now is not so much used anymore, but there is still one very important use case for it,
// which is inside nested routes.
// when we are at /app cities are showing there in sidebar but cites as header is not activated bcs we are at /app not /app/cities so to fix this use the navigate 
// And so this is then basically like a redirect. So you can think of this Navigate component here also like a redirect. So as soon as the index route is hit,
// it will then basically redirect us to the cities route,
// Use the replace keyword to go back to that page that we were before after clicking <- in browser tab

// keep this in mind here as you might need it in other situations. So basically situations where you cannot use the Navigate function
// coming from the useNavigate hook. So in this case here, that wouldn't really work. And so then, we use this more declarative way.
// So declarative because we just declare this in our JSX that we want to basically navigate or to redirect to this other URL here.
// While with the Navigate function, it is really an imperative way where we really tell our JavaScript code that we want to go to that other URL.

// const Base_Url = "http://localhost:8000"

// function App() {
//   const [cities, setCities] = useState([])
//   const [isLoading, setIsLoading] = useState(false)
  
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
//   return (
//     <BrowserRouter>
//     <Routes>
//         <Route index element={<Homepage />}  />
//         <Route path="product" element={<Product />}  />
//         <Route path="pricing" element={<Pricing />}  />
//         <Route path="/login" element={<Login />}  />
//         <Route path="/app" element = {<AppLayout />} > 
//           <Route index element={<Navigate replace to="cities" />}  />
//           <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />}/>
//           <Route path="cities/:id" element={<City />} />
//           <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />}/>
//           <Route path="form" element={<Form />}/>        
//         </Route>
//         <Route path="*" element={<PageNotFound />}  />
//     </Routes>
//   </BrowserRouter>
//   )
// }

// export default App



////********************** use Context-Api && create CitiesContext && consuming the CitiesContext 
/// refer to theory.pdf


// function App() {
 
//   return (
//     <CitiesProvider>
//       <BrowserRouter>
//         <Routes>
//             <Route index element={<Homepage />}  />
//             <Route path="product" element={<Product />}  />
//             <Route path="pricing" element={<Pricing />}  />
//             <Route path="/login" element={<Login />}  />
//             <Route path="/app" element = {<AppLayout />} > 
//               <Route index element={<Navigate replace to="cities" />}  />
//               <Route path="cities" element={<CityList  />}/>
//               <Route path="cities/:id" element={<City />} />
//               <Route path="countries" element={<CountryList  />}/>
//               <Route path="form" element={<Form />}/>        
//             </Route>
//             <Route path="*" element={<PageNotFound />}  />
//         </Routes>
//       </BrowserRouter>
//   </CitiesProvider>
//   )
// }

// export default App




////*********************************** Completing Cities view
//// We are gonna make another http request to app/cities/id ? can not we exptract that object from cities this is true for small applications
// In real world web applications, it's quite common that the single objects have a lot more data than the entire collection.
// So basically this array here would only have a small amount of data in each object while then the objects that we get individually
// from the API have really all the data.
// city.jsx


// function App() {
 
//   return (
//     <CitiesProvider>
//       <BrowserRouter>
//         <Routes>
//             <Route index element={<Homepage />}  />
//             <Route path="product" element={<Product />}  />
//             <Route path="pricing" element={<Pricing />}  />
//             <Route path="/login" element={<Login />}  />
//             <Route path="/app" element = {<AppLayout />} > 
//               <Route index element={<Navigate replace to="cities" />}  />
//               <Route path="cities" element={<CityList  />}/>
//               <Route path="cities/:id" element={<City />} />
//               <Route path="countries" element={<CountryList  />}/>
//               <Route path="form" element={<Form />}/>        
//             </Route>
//             <Route path="*" element={<PageNotFound />}  />
//         </Routes>
//       </BrowserRouter>
//   </CitiesProvider>
//   )
// }

// export default App




////************************ Including map with the leaflet library && INtractive map & useGeolacation && Fetching city data into the form
// we are going to implement this map with the help of a third party package.
// Let's NPM install React Leaflet. And then we also need to install basically the base library, which is Leaflet. So React Leaflet is like built on top of Leaflet
// and so we need both of them installed.
/// go to map.jsx


// function App() {
 
//   return (
//     <CitiesProvider>
//       <BrowserRouter>
//         <Routes>
//             <Route index element={<Homepage />}  />
//             <Route path="product" element={<Product />}  />
//             <Route path="pricing" element={<Pricing />}  />
//             <Route path="/login" element={<Login />}  />
//             <Route path="/app" element = {<AppLayout />} > 
//               <Route index element={<Navigate replace to="cities" />}  />
//               <Route path="cities" element={<CityList  />}/>
//               <Route path="cities/:id" element={<City />} />
//               <Route path="countries" element={<CountryList  />}/>
//               <Route path="form" element={<Form />}/>        
//             </Route>
//             <Route path="*" element={<PageNotFound />}  />
//         </Routes>
//       </BrowserRouter>
//   </CitiesProvider>
//   )
// }

// export default App



////*************************************** Creating a new city && deleting a city
//// now create a new and upload it to our fake api
//// go to form.jsx

//// for deleting go to cityItem.jsx

// function App() {
 
//   return (
//     <CitiesProvider>
//       <BrowserRouter>
//         <Routes>
//             <Route index element={<Homepage />}  />
//             <Route path="product" element={<Product />}  />
//             <Route path="pricing" element={<Pricing />}  />
//             <Route path="/login" element={<Login />}  />
//             <Route path="/app" element = {<AppLayout />} > 
//               <Route index element={<Navigate replace to="cities" />}  />
//               <Route path="cities" element={<CityList  />}/>
//               <Route path="cities/:id" element={<City />} />
//               <Route path="countries" element={<CountryList  />}/>
//               <Route path="form" element={<Form />}/>        
//             </Route>
//             <Route path="*" element={<PageNotFound />}  />
//         </Routes>
//       </BrowserRouter>
//   </CitiesProvider>
//   )
// }

// export default App


////********************************Advanced state management: context-api + reducer */

// function App() {
 
//   return (
//     <CitiesProvider>
//       <BrowserRouter>
//         <Routes>
//             <Route index element={<Homepage />}  />
//             <Route path="product" element={<Product />}  />
//             <Route path="pricing" element={<Pricing />}  />
//             <Route path="/login" element={<Login />}  />
//             <Route path="/app" element = {<AppLayout />} > 
//               <Route index element={<Navigate replace to="cities" />}  />
//               <Route path="cities" element={<CityList  />}/>
//               <Route path="cities/:id" element={<City />} />
//               <Route path="countries" element={<CountryList  />}/>
//               <Route path="form" element={<Form />}/>        
//             </Route>
//             <Route path="*" element={<PageNotFound />}  />
//         </Routes>
//       </BrowserRouter>
//   </CitiesProvider>
//   )
// }

// export default App




////************************** Adding fake Authentication: Setting up context/implementing login

// Typical in front end application like a typical React application, user authentication usually works in three steps.
// First we get the user's email and password from a login form and check with an API endpoint if the password for the given user is correct.
// Then in the second step, if the credentials are actually correct, we then redirect the user to our main application and we save the user object in our state.
// And finally, as a third step we need to protect the application from unauthorized access, so from users who are not currently logged in.
// If we directly enter the /app/cities w/o login that may happen when we reload then it will create an error so we need to protect the router so that entire application should not accessiable when we are not looged in

// function App() {
 
//   return (
//    <AuthProvider >
//     <CitiesProvider>
//       <BrowserRouter>
//         <Routes>
//             <Route index element={<Homepage />}  />
//             <Route path="product" element={<Product />}  />
//             <Route path="pricing" element={<Pricing />}  />
//             <Route path="/login" element={<Login />}  />
//             <Route path="/app" element = {<AppLayout />} > 
//               <Route index element={<Navigate replace to="cities" />}  />
//               <Route path="cities" element={<CityList  />}/>
//               <Route path="cities/:id" element={<City />} />
//               <Route path="countries" element={<CountryList  />}/>
//               <Route path="form" element={<Form />}/>        
//             </Route>
//             <Route path="*" element={<PageNotFound />}  />
//         </Routes>
//       </BrowserRouter>
//   </CitiesProvider>
//   </AuthProvider> 
//   )
// }

// export default App


///******************************* Protecting the routes

// The third part of the authentication flow is to protect the application against unauthorized access. So basically what we want to do is to redirect the user back to the homepage whenever they reach one of the routes
// that they should not reach when they are not logged in. So basically this URL, or this one, or this one. And really the entire application should not be accessible
// to people that are not logged in.
// what's a common practice is to create a specialized component which will handle this redirecting and then wrap the entire application in that component.
// Create new page as we know out entire app is in applayout so we can wrap it and inside route it should be an element no matter how much complex it is.

function App() {
 
  return (
   <AuthProvider >
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
            <Route index element={<Homepage />}  />
            <Route path="product" element={<Product />}  />
            <Route path="pricing" element={<Pricing />}  />
            <Route path="/login" element={<Login />}  />
            <Route path="/app" element = {
                    <ProtectedRoute>
                        <AppLayout />
                    </ProtectedRoute>
              } > 
              <Route index element={<Navigate replace to="cities" />}  />
              <Route path="cities" element={<CityList  />}/>
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList  />}/>
              <Route path="form" element={<Form />}/>        
            </Route>
            <Route path="*" element={<PageNotFound />}  />
        </Routes>
      </BrowserRouter>
  </CitiesProvider>
  </AuthProvider> 
  )
}

export default App