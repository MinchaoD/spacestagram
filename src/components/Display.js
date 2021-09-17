import React, {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart} from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'

function Display({item, index}) {
    const [like, setLike] = useState('false');
    
    const markLike = () => {
        setLike(!like)
    }

    // useEffect(() => {
    //     setLike(JSON.parse(window.localStorage.getItem('like')));
    //   }, []);
    
    // useEffect(() => {
    // window.localStorage.setItem('like', like);
    // }, [like]);
    // the above code won't work to store the state of like, we will have to use redux to store the individual state of like

    return (
        <div className='space-item' key={index} >
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
}
export default Display;