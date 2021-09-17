import React, {useEffect, useState} from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart} from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'

function Space() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [startDate, setStartdate] = useState('');
    const [endDate, setEnddate] = useState('');
    const [like, setLike] = useState('false')

    const url = 'https://api.nasa.gov/planetary/apod?start_date=2015-09-07&end_date=2015-09-15&api_key=ORrPe6BufYrJ07FVPGoheu9wjNmuvrarg4SVKlhN'

    const searchUrl = `https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=ORrPe6BufYrJ07FVPGoheu9wjNmuvrarg4SVKlhN`

    const markLike = () => {
        setLike(like => !like)
    }

    const fetchSpace = async() => {
        setLoading(true)
        try {
            const response = await fetch(url);
            const space = await response.json();
            setLoading(false);
            setData(space);
            setLoading(false)

        } catch(error) {
            setLoading(false);
            throw error

        }
    }

    const SearchSpace = async() => {
        setLoading(true)
        try {
            const response = await fetch(searchUrl);
            const searchspace = await response.json();
            setLoading(false);
            setData(searchspace);
            setLoading(false)

        } catch(error) {
            setLoading(false);
            throw error

        }
    }

  
    useEffect(() => {
        fetchSpace();
    },[])

    if(loading) {
        return (
            <div>
                <div className="section-center">
                    <ClipLoader color="blue" size={150}/>
                </div>
                <div className="section-center">
                    <h1> Loading ... </h1>
                </div>
            </div>
        )
    }

    return (
        <div className = "section-center pb-5">
            <h1> Spacestagram </h1>
            <div  className= 'row' style={{fontSize: '2rem'}} >
                <div className = 'col-md-6'>
                    <label className = 'text-md-right'>
                        Start Date:
                        <input type='date' 
                                name='startdate'
                                onChange = {e => setStartdate(e.target.value)}
                                style={{margin:'1rem', fontSize:'1.5rem'}}/>
                    </label>
                </div>
                <div className = 'col-md-6'>
                    <label >
                        End Date:
                        <input type='date' 
                                name='enddate'
                                onChange = {e => setEnddate(e.target.value)}
                                style={{margin:'1.7rem', fontSize:'1.5rem'}} />
                    </label>
                </div>
            </div>
            <div className = 'row'>
               
                <button type='submit' 
                        onClick = {SearchSpace}
                        style={{fontSize: '4vh', color: 'white', backgroundColor: 'green', padding: '1rem', borderWidth:'0.2rem', borderRadius:'1rem'}} >
                        Search
                </button>
            </div>

             

                {data.map(item => {
                    return (
                        
                        <div className='space-item'>
                            <img src = {item.url} alt = {item.image} className = 'photo' />
                            <div className = 'space-info'>
                                <div className='row header'>
                                        <h3>{item.title}</h3>
                                        <button className='likebutton' onClick = {markLike}>
                                            {like ? <FontAwesomeIcon icon={farHeart} />: <FontAwesomeIcon icon={faHeart} />}
                                        </button>
                                </div>
                                <div className='row'>
                                    <p className = 'space-text'>{item.explanation}</p>
                                </div>
                            </div>
                    </div>
                    )
                })}
            </div>
      
    )
}

export default Space