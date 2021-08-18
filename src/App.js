import React, {useState, useEffect} from 'react';
import Chart from './components/Chart/Chart';
import CountryPicker from './components/CountryPicker/CountryPicker';
import Cards from './components/Cards/Cards';
import { fetchData } from './api/';
import styles from './App.module.css';
import image from './images/covid.png';

const App = () => {
  
    const [country,setCountry] = useState();
    const [data, setData] = useState({});

    useEffect(() => { 
        const getCountryData = async ()=>{
            const fetchedData = await fetchData(country);
            setData(fetchedData);
        }
        
        getCountryData();
    }, [country])

    const handleCountryChange = async (country)=>{
        setCountry(country) ;
    }

    return (
      <div className={styles.container}>
        <img className={styles.image} src={image} alt="COVID-19" />
        <div style={{"color":"red", "font-size" : "1.2rem"}}><strong>DISCLAIMER:</strong> The API has been providing <b>faulty info</b> since a couple of days (from around 10th of August) <br />
        so please do not take these values as reference. I will not be updating the code as I'm quite busy right now <br /> but I will update it as soon as I find some time. Thank you. </div>
        <br />
        <br />
        <br />
        <Cards data={data} />
        <CountryPicker handleCountryChange={handleCountryChange}/>
        <Chart data={data} country={country} /> 

        <div align="center" style={{marginTop:"15px",left:"40"}}>Made with &nbsp;
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" class="svg-inline--fa fa-heart" style={{color:"red",width:"14px"}} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
        </svg>
        &nbsp; by <a target="_blank" rel="noreferrer noopener" href="https://mohithgupta.github.io">Mohith Gupta</a></div>

      </div>
    );
}

export default App;