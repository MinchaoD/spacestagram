import React, {useEffect, useState} from 'react';
import {Card, CardImg, CardTitle, CardBody} from 'reactstrap'

const url = 'https://api.nasa.gov/planetary/apod?start_date=2015-09-07&end_date=2015-09-15&api_key=ORrPe6BufYrJ07FVPGoheu9wjNmuvrarg4SVKlhN'

function Space() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

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

    useEffect(() => {
        fetchSpace();
    },[])

    console.log(data)

    return (
        data.map(item => {
            return (
                <div className = 'container'>
                    <Card>
                        <CardImg height='300rem' src={item.hdurl} />
                        <CardBody>
                            <CardTitle>
                                {item.caption}
                            </CardTitle>
                        </CardBody>
                    
                    </Card>
                </div>
            )
        })
    )
}

export default Space