import { useParams, useSearchParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../contexts/CitiesContext";
import { useEffect } from "react";
import Spinner from "./Spinner";
import BackButton from "./BackButton";

// const formatDate = (date) =>
//   new Intl.DateTimeFormat("en", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//     weekday: "long",
//   }).format(new Date(date));

// function City() {
//   // TEMP DATA
//   const currentCity = {
//     cityName: "Lisbon",
//     emoji: "🇵🇹",
//     date: "2027-10-31T15:59:59.138Z",
//     notes: "My favorite city so far!",
//   };

//   const {id} = useParams()
//   const [searchParams, setSearchParams] = useSearchParams()
//   const lat = searchParams.get("lat")
//   const lng = searchParams.get("lng")

//   const { cityName, emoji, date, notes } = currentCity;


//   return (
//     <>
//     <h1>City{id}</h1>
//     <h1>{lat}:{lng}</h1>
//     </>
//     // <div className={styles.city}>
//     //   <div className={styles.row}>
//     //     <h6>City name</h6>
//     //     <h3>
//     //       <span>{emoji}</span> {cityName}
//     //     </h3>
//     //   </div>

//     //   <div className={styles.row}>
//     //     <h6>You went to {cityName} on</h6>
//     //     <p>{formatDate(date || null)}</p>
//     //   </div>

//     //   {notes && (
//     //     <div className={styles.row}>
//     //       <h6>Your notes</h6>
//     //       <p>{notes}</p>
//     //     </div>
//     //   )}

//     //   <div className={styles.row}>
//     //     <h6>Learn more</h6>
//     //     <a
//     //       href={`https://en.wikipedia.org/wiki/${cityName}`}
//     //       target="_blank"
//     //       rel="noreferrer"
//     //     >
//     //       Check out {cityName} on Wikipedia &rarr;
//     //     </a>
//     //   </div>

//     //   <div> </div>
//     // </div>
//   );
// }

// export default City;



////*************** use Context Api && Completing Cities Views
//// We can not use the currentCity as local state as it is needed in another component so make it as global state.
//// Also fix the issue that when we click on the another city it is still showing the prev selected city for few seconds.
//// implement currentcity style using class from cityItem.module.css into cityItem.jsx. remember that if we want to add multiple class names with CSS modules, we need to do so in a string.
//// add back button

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const {id} = useParams()
  const {getCity, currentCity, isLoading} = useCities()

  useEffect(function(){
    getCity(id)
  },[id])
  
  const { cityName, emoji, date, notes } = currentCity;

  //// do it here to fix the issue if we do above the useffect then it will voilet the rules of hooks
  if(isLoading) return <Spinner />

  return (
   
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div> <BackButton /> </div>
    </div>
  );
}

export default City;

