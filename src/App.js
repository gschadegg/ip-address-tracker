import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './components/Form'
import IPinfo from './components/IPinfo'
import Notification from './components/Notification'
import Map from './components/Map'
import './global.scss';

function App() {
  const [ IP, setIP ] = useState('')
  const [ IPdata, setIPdata ] = useState(null)
  const [ IPcordinates, setIPcordinates ] = useState(null)
  const [ message, setMessage ] = useState('')
  
  const stateNameToAbbreviation = (abbreviation) => {
    let states = {
        "arizona": "AZ",
        "alabama": "AL",
        "alaska": "AK",
        "arkansas": "AR",
        "california": "CA",
        "colorado": "CO",
        "connecticut": "CT",
        "district of columbia": "DC",
        "delaware": "DE",
        "florida": "FL",
        "georgia": "GA",
        "hawaii": "HI",
        "idaho": "ID",
        "illinois": "IL",
        "indiana": "IN",
        "iowa": "IA",
        "kansas": "KS",
        "kentucky": "KY",
        "louisiana": "LA",
        "maine": "ME",
        "maryland": "MD",
        "massachusetts": "MA",
        "michigan": "MI",
        "minnesota": "MN",
        "mississippi": "MS",
        "missouri": "MO",
        "montana": "MT",
        "nebraska": "NE",
        "nevada": "NV",
        "new hampshire": "NH",
        "new jersey": "NJ",
        "new mexico": "NM",
        "new york": "NY",
        "north carolina": "NC",
        "north dakota": "ND",
        "ohio": "OH",
        "oklahoma": "OK",
        "oregon": "OR",
        "pennsylvania": "PA",
        "rhode island": "RI",
        "south carolina": "SC",
        "south dakota": "SD",
        "tennessee": "TN",
        "texas": "TX",
        "utah": "UT",
        "vermont": "VT",
        "virginia": "VA",
        "washington": "WA",
        "west virginia": "WV",
        "wisconsin": "WI",
        "wyoming": "WY",
        "american samoa": "AS",
        "guam": "GU",
        "northern mariana islands": "MP",
        "puerto rico": "PR",
        "us virgin islands": "VI",
        "us minor outlying islands": "UM"
    }

    let a = abbreviation.trim().replace(/[^\w ]/g, "").toLowerCase();
    if(states[a] !== null) {
        return states[a];
    }
    return null;
}
  useEffect(() => {
    const getIP = async () => {
      const phIP = await axios.get('https://api.ipify.org')
      setIP(phIP.data)
    }
    getIP()

  }, [])

  useEffect(() => {
    const getIPdata = async () => {
      try{
        const phData = await axios.get(`https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_IPGEO_KEY}&ipAddress=${IP}
        `)
        const stateAbbr = stateNameToAbbreviation(phData.data.location.region)
        const setupData = {
          'IP Address': <p>{phData.data.ip}</p>,
          'Location': <p>{phData.data.location.city}, {stateAbbr} {phData.data.location.postalCode}</p>,
          'Timezone': <p>UTC {phData.data.location.timezone}</p>,
          'ISP': <p>{phData.data.isp}</p>
        }
        
        setIPdata(setupData)
        setIPcordinates([phData.data.location.lat, phData.data.location.lng])
      }catch(error){
        setIPdata(null)
        setIPcordinates(null)
        setMessage('The number you entered was not a valid IP Address, let\'s try a different one')
      }
    }
    getIPdata()
  }, [IP])
  
  const searchIP = (e) =>  {
    e.preventDefault()
    const newIP = document.querySelector('input').value
    setIP(newIP)
  }

  if(message){
    setTimeout(()=>{
        setMessage('')
    }, 5000)
  }

  return (
    <main className="App">
      {message ? <Notification message={message}/> : null}
      <header className='page-header'>
        <h1>IP Address Tracker</h1>
        <Form searchIP={searchIP} />
      </header>
      <IPinfo IPdata={IPdata}/>
      <Map cordinates={IPcordinates}/>
    </main>
  );
}

export default App;
