import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import styles from './Map.module.css'
import { useEffect, useState } from 'react'
import { useCities } from '../contexts/CitiesContext'
import useGeolocation from '../hooks/useGeolocation'
import Button from './Button'
import useUrlPosition from '../hooks/useUrlPosition'

// function Map() {
//   return (
//     <div className={styles.mapContainer}>
//         Map
//     </div>
//   )
// }

// export default Map



///*******************setting and getting query params
// useSearchParams" and this one is a bit similar to React use data hook, so it returns an array which has basically the current state
// which we usually call the "SearchParams" and then second, we get a function with which we can set the SearchParams so we can also update the SearchParams in this way.


// function Map() {
//   const [searchParams, setSearchParams] = useSearchParams()
//   const lat = searchParams.get("lat")
//   const lng = searchParams.get("lng")
//   return (
//     <div className={styles.mapContainer}>
//         <h1>Map</h1>
//         <h1>Position: {lat}:{lng}</h1>
//         <p>Just to demo that if we change the query param.. then it will change every where</p>
//         <button onClick={()=>setSearchParams({lat:45.67, lng:-10})}>
//           change</button>
//     </div>
//   )
// }

// export default Map



////*************************** useNavigate
// So another hook that is provided by React Router, so use navigate, and all this one does is to return a function called navigate like this.
// And so then we can use this function here to basically move to any URL.

// function Map() {
//   const [searchParams, setSearchParams] = useSearchParams()
//   const lat = searchParams.get("lat")
//   const lng = searchParams.get("lng")
  
//   const navigate = useNavigate()
  
//   return (
//     <div className={styles.mapContainer} onClick={()=>{navigate("form")}}>
//         <h1>Map</h1>
//         <h1>Position: {lat}:{lng}</h1>
//         <button onClick={()=>setSearchParams({lat:45.67, lng:-10})}>
//           change</button>
//     </div>
//   )
// }

// export default Map



////************************* use context api && implement map 
//// When ever we bring the third party lib into our project then it is a good idea to checkout the docs.
// So basically this quick start document of the Leaflet base library. So again, the one that we're using is just built on top of this one.
// So what matters here is that we install or that we include this CSS here. Now I actually already did that. So if we check out the index dot CSS file
// do not forget to give className
// So a bit more in line with the colors of the rest of the application. And so for that we need to change the URL here of the tiles.
// And one that I like is just very simple to change. Just change this here to fr then slash hot and that's it.
// We need to zoom in / zoom out using mouse for this make scrollWheelZoom={true}

// function Map() {
//   const [mapPosition, setMapPosition] = useState([40.0,0])

//   const [searchParams, setSearchParams] = useSearchParams()
//   const lat = searchParams.get("lat")
//   const lng = searchParams.get("lng")
  
//   const navigate = useNavigate()
  
//   return (
//     <div className={styles.mapContainer} onClick={()=>{navigate("form")}}>
//       <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
//         />
//         <Marker position={mapPosition}>
//           <Popup>
//             A pretty CSS3 popup. <br /> Easily customizable.
//           </Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   )
// }

// export default Map




////***************************** displaying city marker on map
//// just line center we have pass an array in position

// function Map() {
//   const {cities} = useCities()
//   console.log(cities)
//   const [mapPosition, setMapPosition] = useState([40.0,0])
  
//   const [searchParams, setSearchParams] = useSearchParams()
//   const mapLat = searchParams.get("lat")
//   const mapLng = searchParams.get("lng")
  
//   const navigate = useNavigate()
  
//   return (
//     <div className={styles.mapContainer} onClick={()=>{navigate("form")}}>
//       <MapContainer center={[mapLat, mapLng]} zoom={6} scrollWheelZoom={true} className={styles.map}>
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
//         />
//         { cities.map((city)=>{
//             return (
//               <Marker position={[city.position.lat, city.position.lng]} key = {city.id}>
//               <Popup>
//                <span> {city.emoji}  </span> <span> {city.cityName} </span>
//               </Popup>
//             </Marker>
//             )
//         })}

//     </MapContainer>
//     </div>
//   )
// }

// export default Map




////***********************************  interacting with the map
// The next thing that we want to do is that when we click, here, on one of these cities, then it should not only open the city component, here,
// but it should also move to that position on the map.

// Watch what happens when we go now back and select another city. So you see that a map actually did not move there and so that's because this center here
// is actually not reactive. basically when this position here changes the map will not move there. And so we need to implement this functionality on our own
// within this Leaflet library. Now in this library, everything works with components. So whenever we need to implement a functionality like this
// we need to create a custom component and then use that component in here.
// when we hit back button then map position change thats what we do not want bcs we want map should remember mapLat and mapLng over tym.
// We will use the useEffect to solve above problem that y useEffect is for synchronizing mechanism

// Next we want whenever we click somewhere on map it should open the form again u have to use custom hook

// function Map() {
//   const {cities} = useCities()
//   console.log(cities)
//   const [mapPosition, setMapPosition] = useState([40.0,0])
  
//   const [searchParams, setSearchParams] = useSearchParams()
//   const mapLat = searchParams.get("lat")
//   const mapLng = searchParams.get("lng")

//   useEffect(function(){
//     if(mapLat && mapLng) setMapPosition([mapLat, mapLng])
//   },[mapLat, mapLng])
  
  
  
//   return (
//     <div className={styles.mapContainer} >
//       <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
//         />
//         { cities.map((city)=>{
//             return (
//               <Marker position={[city.position.lat, city.position.lng]} key = {city.id}>
//               <Popup>
//                <span> {city.emoji}  </span> <span> {city.cityName} </span>
//               </Popup>
//             </Marker>
//             )
//         })}

//         <ChangeCenter position={mapPosition} />
//         <DetectClick />

//       </MapContainer>
//     </div>
//   )
// }

// // we need the use map hook to basically get the current instance of the map that is currently being displayed.

// function ChangeCenter({position}){
//    const map = useMap()
//    map.setView(position)
//    return null;
// }

// function DetectClick(){
//   const navigate = useNavigate()
//   useMapEvents({
//     click: (e)=>{
//       // console.log(e)
//       navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
//     }
//   })
// }

// export default Map




////*************************************** Setting map location with geolocation
//// for useSearch as it will be use in form lets make it custom hook

function Map() {

  const {isLoading:isLoadingPosition, position: geolocationPosition, getPosition} = useGeolocation()
  
  const {cities} = useCities()
  const [mapPosition, setMapPosition] = useState([40.0,0])
  
  const [mapLat, mapLng] = useUrlPosition()

  useEffect(function(){
    if(mapLat && mapLng) setMapPosition([mapLat, mapLng])
  },[mapLat, mapLng])

  useEffect(function(){
    if(geolocationPosition) setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
  },[geolocationPosition])
  
  
  
  return (
    <div className={styles.mapContainer} >
      
      {!geolocationPosition && <Button type="position" onClick={getPosition} >
          {isLoadingPosition? "....Loading":"Use your position"}
        </Button>}

      <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        { cities.map((city)=>{
            return (
              <Marker position={[city.position.lat, city.position.lng]} key = {city.id}>
              <Popup>
               <span> {city.emoji}  </span> <span> {city.cityName} </span>
              </Popup>
            </Marker>
            )
        })}

        <ChangeCenter position={mapPosition} />
        <DetectClick />

      </MapContainer>
    </div>
  )
}

// we need the use map hook to basically get the current instance of the map that is currently being displayed.

function ChangeCenter({position}){
   const map = useMap()
   map.setView(position)
   return null;
}

function DetectClick(){
  const navigate = useNavigate()
  useMapEvents({
    click: (e)=>{
      // console.log(e)
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    }
  })
}

export default Map





