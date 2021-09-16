import React, {useEffect, useState} from 'react';

function Space() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [startDate, setStartdate] = useState('')
    const [endDate, setEnddate] = useState('')

    const url = 'https://api.nasa.gov/planetary/apod?start_date=2015-09-07&end_date=2015-09-15&api_key=ORrPe6BufYrJ07FVPGoheu9wjNmuvrarg4SVKlhN'

    const searchUrl = `https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=ORrPe6BufYrJ07FVPGoheu9wjNmuvrarg4SVKlhN`

    const fetchSpace = async() => {
        setLoading(true)
        try {
            const response = await fetch(url);
            const space = await response.json();
            setLoading(false);
            setData(space)

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
            setData(searchspace)

        } catch(error) {
            setLoading(false);
            throw error

        }
    }

    const handleInputChange = (e) => {
        setEnddate(e.target.endDate);
        setStartdate(e.target.startDate)
    }

    useEffect(() => {
        fetchSpace();
    },[])

    // useEffect(() => {
    //     SearchSpace()
    // },[startDate])

    return (
        <div className = "section-center ">
            <h1> Spacestagram </h1>
            <div  className= 'row' style={{fontSize: '2rem'}} >
                <label className = 'pb-3' >
                    Start Date:
                    <input type='date' name='startdate'
                            onChange = {handleInputChange}
                            style={{margin:'1rem', fontSize:'1.5rem'}}/>
                </label>
                <label>
                    End Date:
                    <input type='date' name='enddate'
                            onChange = {handleInputChange}
                            style={{margin:'1rem', fontSize:'1.5rem'}} />
                </label>
            </div>
            <div className = 'row'>
               
                <button type='submit' 
                        onClick = {SearchSpace}
                        style={{fontSize: '4vh', color: 'white', backgroundColor: 'green', padding: '1rem', borderWidth:'0.2rem', borderColor:'black',borderRadius:'1rem'}} >
                        Search
                </button>
            </div>

                {data.map(item => {
                    return (
                        
                        <article className='space-item'>
                            <img src = {item.url} alt = {item.image} className = 'photo' />
                            <div className = 'space-info'>
                            <header>
                                <h4>{item.title}</h4>
                            </header>
                            <p className = 'space-text'>{item.explanation}</p>
                            </div>
                    </article>
                    )
                })}
            </div>
      
    )
}

export default Space