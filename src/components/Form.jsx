// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import useUrlPosition from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";

// export function convertToEmoji(countryCode) {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt());
//   return String.fromCodePoint(...codePoints);
// }

// function Form() {
//   const [cityName, setCityName] = useState("");
//   const [country, setCountry] = useState("");
//   const [date, setDate] = useState(new Date());
//   const [notes, setNotes] = useState("");

//   return (
//     <form className={styles.form}>
//       <div className={styles.row}>
//         <label htmlFor="cityName">City name</label>
//         <input
//           id="cityName"
//           onChange={(e) => setCityName(e.target.value)}
//           value={cityName}
//         />
//         {/* <span className={styles.flag}>{emoji}</span> */}
//       </div>

//       <div className={styles.row}>
//         <label htmlFor="date">When did you go to {cityName}?</label>
//         <input
//           id="date"
//           onChange={(e) => setDate(e.target.value)}
//           value={date}
//         />
//       </div>

//       <div className={styles.row}>
//         <label htmlFor="notes">Notes about your trip to {cityName}</label>
//         <textarea
//           id="notes"
//           onChange={(e) => setNotes(e.target.value)}
//           value={notes}
//         />
//       </div>

//       <div className={styles.buttons}>
//         <button>Add</button>
//         <button>&larr; Back</button>
//       </div>
//     </form>
//   );
// }

// export default Form;



////*********** useNavigate
// So let's include our custom hook again. So use navigate from React Router Dom. And by the way, this used to be called use history
// in a previous version of React Router. And so now we want to navigate back. So how do we do that? Well, we just need to define basically
// the number of steps that we want to go back in the browser's history. So if we say minus one, then that means that we basically navigate back.
/// apply on btn which is inside the form caveat is if i click on btn it will reload the page so use preventdefault
// export function convertToEmoji(countryCode) {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt());
//   return String.fromCodePoint(...codePoints);
// }

// function Form() {
//   const [cityName, setCityName] = useState("");
//   const [country, setCountry] = useState("");
//   const [date, setDate] = useState(new Date());
//   const [notes, setNotes] = useState("");

//   const navigate = useNavigate()

//   return (
//     <form className={styles.form}>
//       <div className={styles.row}>
//         <label htmlFor="cityName">City name</label>
//         <input
//           id="cityName"
//           onChange={(e) => setCityName(e.target.value)}
//           value={cityName}
//         />
//         {/* <span className={styles.flag}>{emoji}</span> */}
//       </div>

//       <div className={styles.row}>
//         <label htmlFor="date">When did you go to {cityName}?</label>
//         <input
//           id="date"
//           onChange={(e) => setDate(e.target.value)}
//           value={date}
//         />
//       </div>

//       <div className={styles.row}>
//         <label htmlFor="notes">Notes about your trip to {cityName}</label>
//         <textarea
//           id="notes"
//           onChange={(e) => setNotes(e.target.value)}
//           value={notes}
//         />
//       </div>

//       <div className={styles.buttons}>
//         <Button type="primary">Add</Button>
//         <Button type="back" onClick={(e)=>{
//                             e.preventDefault()
//                               navigate(-1)
//                               }}>
//           &larr; Back
//           </Button>
//       </div>
//     </form>
//   );
// }

// export default Form;



/////********************* use api-Context && Lets make the back button reusabale

// export function convertToEmoji(countryCode) {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt());
//   return String.fromCodePoint(...codePoints);
// }

// function Form() {
//   const [cityName, setCityName] = useState("");
//   const [country, setCountry] = useState("");
//   const [date, setDate] = useState(new Date());
//   const [notes, setNotes] = useState("");

//   return (
//     <form className={styles.form}>
//       <div className={styles.row}>
//         <label htmlFor="cityName">City name</label>
//         <input
//           id="cityName"
//           onChange={(e) => setCityName(e.target.value)}
//           value={cityName}
//         />
//         {/* <span className={styles.flag}>{emoji}</span> */}
//       </div>

//       <div className={styles.row}>
//         <label htmlFor="date">When did you go to {cityName}?</label>
//         <input
//           id="date"
//           onChange={(e) => setDate(e.target.value)}
//           value={date}
//         />
//       </div>

//       <div className={styles.row}>
//         <label htmlFor="notes">Notes about your trip to {cityName}</label>
//         <textarea
//           id="notes"
//           onChange={(e) => setNotes(e.target.value)}
//           value={notes}
//         />
//       </div>

//       <div className={styles.buttons}>
//         <Button type="primary">Add</Button>
//         <BackButton />
//       </div>
//     </form>
//   );
// }

// export default Form;




/////************************** Fetching city data into form
// now the first thing that we need to do is to actually get the location data from the URL into this component. So reading here,
// this global state that is stored in the url. Now it is better to create a custom hook

// export function convertToEmoji(countryCode) {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt());
//   return String.fromCodePoint(...codePoints);
// }

// function Form() {
//   const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
//   const [cityName, setCityName] = useState("");
//   const [country, setCountry] = useState("");
//   const [date, setDate] = useState(new Date());
//   const [notes, setNotes] = useState("");
//   const [emoji, setEmoji] = useState("")
//   const [geocodingError, setGeocodingError] = useState("")

//   const [lat, lng] = useUrlPosition()
  
//   const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

//   useEffect(function(){
//     async function fetchCityData(){
//       try{
//         setIsLoadingGeocoding(true)
//         setGeocodingError("")
//         const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
//         const data = await res.json()
//         console.log(data)
//         if(!data.countryCode) throw new Error("That doesn't seems to be a city. Click somewhere else 😊")
        
//         setCityName(data.city || data.locality || "")
//         setCountry(data.country)
//         setEmoji(convertToEmoji(data.countryCode))
//         console.log(convertToEmoji(data.countryCode))
//       }
//       catch(err){
//         setGeocodingError(err.message)
//       }
//       finally{
//         setIsLoadingGeocoding(false)
//       }
//     }
//     fetchCityData() 
//   },[lat,lng])

//   if(isLoadingGeocoding) return <Spinner />

//   if(geocodingError) return <Message message={geocodingError} />

//   return (
//     <form className={styles.form}>
//       <div className={styles.row}>
//         <label htmlFor="cityName">City name</label>
//         <input
//           id="cityName"
//           onChange={(e) => setCityName(e.target.value)}
//           value={cityName}
//         />
//         <span className={styles.flag}>{emoji}</span>
//       </div>

//       <div className={styles.row}>
//         <label htmlFor="date">When did you go to {cityName}?</label>
//         <input
//           id="date"
//           onChange={(e) => setDate(e.target.value)}
//           value={date}
//         />
//       </div>

//       <div className={styles.row}>
//         <label htmlFor="notes">Notes about your trip to {cityName}</label>
//         <textarea
//           id="notes"
//           onChange={(e) => setNotes(e.target.value)}
//           value={notes}
//         />
//       </div>

//       <div className={styles.buttons}>
//         <Button type="primary">Add</Button>
//         <BackButton />
//       </div>
//     </form>
//   );
// }

// export default Form;



////******************************* Creating a new city
// So now it's time to finally add a new city and upload it to our fake API. But before we go do that there's two things that we need to do first.
// So the first thing is that imagine that the user somehow goes to the form without there being a latitude and a longitude. So what's gonna happen then
// is that the Geocoding API will get your location from Geolocation and then get all the city information about that location as usual.
// So that doesn't make a lot of sense. And so we should only run this effect here if there actually is a latitude and a longitude.
// Cause right now, again, there are none. So there are none in the URL. And so here in our effect we can just check if there is no latitude and no longitude
// then just return immediately. And so if we then try that again... So coming there just like this, then nothing is going to happen.
// And so then like this, no HTTP request is fired off. Now in this situation we probably also don't even want to display the form, right?

//// so let's get ourselves a date picker, again, as an NPM package. npm install react-datepicker --save now for stying u need to include css also

///// let's then finally create that function which uploads this new object to our fake API.And just like all the other functions that are about that API, we do that in the context.

///// do something when we add form isLoading

// export function convertToEmoji(countryCode) {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt());
//   return String.fromCodePoint(...codePoints);
// }

function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char =>  127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const India = convertToEmoji("DE")
console.log(India)

function Form() {
  const navigate = useNavigate()

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("")
  const [geocodingError, setGeocodingError] = useState("")

  const [lat, lng] = useUrlPosition()

  const {createCity, isLoading}  = useCities()
  
  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

  useEffect(function(){
    if(!lat && !lng) return;
   
    async function fetchCityData(){
      try{
        setIsLoadingGeocoding(true)
        setGeocodingError("")
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
        const data = await res.json()
        console.log(data)
        if(!data.countryCode) throw new Error("That doesn't seems to be a city. Click somewhere else 😊")
        
        setCityName(data.city || data.locality || "")
        setCountry(data.countryName)
        setEmoji(convertToEmoji(data.countryCode))
        console.log(convertToEmoji(data.countryCode))
      }
      catch(err){
        setGeocodingError(err.message)
      }
      finally{
        setIsLoadingGeocoding(false)
        
      }
    }
    fetchCityData() 
  },[lat,lng])

  if(!lat && !lng) return <Message message={"Start by clicking somewhere on the map"} />

  if(isLoadingGeocoding) return <Spinner />

  if(geocodingError) return <Message message={geocodingError} />

  async function handleSubmit(e){
    e.preventDefault()
    if(!cityName && !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position:{lat, lng}
    }
    await createCity(newCity)
    navigate(`/app/cities`)  //// if u want this to work properly then use await above as that is a async function
  }

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
        
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker id="date" onChange={(date)=>setDate(date)} selected={date} dateFormate="dd/MM/yyyy" />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;