import React, {useEffect, useState} from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import Display from './Display';
import ReactPaginate from 'react-paginate';


function Main() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [startDate, setStartdate] = useState('');
    const [endDate, setEnddate] = useState('');
    const [pageNumber, setPageNumber] = useState(0)
  
    const url = 'https://api.nasa.gov/planetary/apod?start_date=2015-08-21&end_date=2015-09-15&api_key=ORrPe6BufYrJ07FVPGoheu9wjNmuvrarg4SVKlhN'
    const searchUrl = `https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=ORrPe6BufYrJ07FVPGoheu9wjNmuvrarg4SVKlhN`

    const fetchSpace = async() => {
        setLoading(true)
        try {
            const response = await fetch(url);
            const space = await response.json();
            setData(space);
            setLoading(false)
        } 
        catch(error) {
            setLoading(false);
            throw error
        }
    }

    const SearchSpace = async() => {
        setLoading(true)
        try {
            const response = await fetch(searchUrl);
            const searchspace = await response.json();
            setData(searchspace)        
            setLoading(false)
        }
        catch(error) {
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

    const itemPerpage = 6;
    const pagesVisited = pageNumber * itemPerpage;
    const pageCount = Math.ceil(data.length / itemPerpage)
    const changePage = ({selected}) => {
        setPageNumber(selected);
    }

    return (
        <div className = "section-center">
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
                        className = 'searchbutton'
                        onClick = {SearchSpace}>
                        Search
                </button>
            </div>
            <div  className= 'row'>
                {data
                    .slice(pagesVisited, pagesVisited + itemPerpage)
                    .map((item,index) => {
                        return <Display key={index} item = {item} />})}
                        
            </div>
            <div  className= 'row'>
                <ReactPaginate
                    previousLabel = {'Previous'}
                    nextLabel = {'next'}
                    pageCount = {pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"} />
            </div>
          
   
        </div>
      
    )
}

export default Main