import { Link } from 'react-router-dom';
import styles from './CityItem.module.css'
import { useCities } from '../contexts/CitiesContext';


// function CityItem({city}) {
//   const {cityName, emoji, date} = city
  
//   const formatDate = (date) =>
//     new Intl.DateTimeFormat("en", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//     }).format(new Date(date));
  
//     return (
//     <li className={styles.cityItem}>
//         <span className={styles.emoji}> {emoji} </span>
//         <p className={styles.name}> {cityName} </p>
//         <time className={styles.date} > {formatDate(date)} </time>
//         <button className={styles.deleteBtn}>&times;</button>
//     </li>
//   )
// }

////***** In case user login first tym then there will be no cities do it bt=y deleting data from city.json
///// ********** dynamic routing


// const formatDate = (date) =>
//     new Intl.DateTimeFormat("en", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//     }).format(new Date(date));

// function CityItem({city}) {
//     const {cityName, emoji, date, id} = city

//     return (
//       <li>
//           <Link className={styles.cityItem} to={`${id}`}  >
//             <span className={styles.emoji}> {emoji} </span>
//             <p className={styles.name}> {cityName} </p>
//             <time className={styles.date} > {formatDate(date)} </time>
//             <button className={styles.deleteBtn}>&times;</button>
//           </Link>
//       </li>
//     )
//   }

// export default CityItem



/////*********************** reading and setting query string

// const formatDate = (date) =>
//     new Intl.DateTimeFormat("en", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//     }).format(new Date(date));

// function CityItem({city}) {
//     const {cityName, emoji, date, id, position} = city
//     // console.log(position.lng)

//     return (
//       <li>
//           <Link className={styles.cityItem} to={`${id}?lat=${position.lat}&lng=${position.lng}`}  >
//             <span className={styles.emoji}> {emoji} </span>
//             <p className={styles.name}> {cityName} </p>
//             <time className={styles.date} > {formatDate(date)} </time>
//             <button className={styles.deleteBtn}>&times;</button>
//           </Link>
//       </li>
//     )
//   }

// export default CityItem



////********************** use context api && completing the city view
//// implement currentcity style using class from cityItem. remember that if we want to add multiple class names with CSS modules, we need to do so in a string.
//// it has -- so use object["key"] instead of object.key

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({city}) {
  const {cityName, emoji, date, id, position} = city
  const {currentCity, deleteCity} = useCities()

  function handleClick(e){
    //// first we need to prevent the page to go to another page as we are clicking the Link at same time
    e.preventDefault();
    deleteCity(id)
  }

  return (
    <li>
        <Link className={`${styles.cityItem} ${ id=== currentCity.id ? styles["cityItem--active"] : ""}`} 
                 to={`${id}?lat=${position.lat}&lng=${position.lng}`}  >
          <span className={styles.emoji}> {emoji} </span>
          <p className={styles.name}> {cityName} </p>
          <time className={styles.date} > {formatDate(date)} </time>
          <button className={styles.deleteBtn} onClick={handleClick}>
            &times;
          </button>
        </Link>
    </li>
  )
}

export default CityItem