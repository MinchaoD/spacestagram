import React, {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart} from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'

function Display({item, index}) {
    const [like, setLike] = useState('false');

    // this to toggle like button, it will show solid heart if like, otherwise it is an outlined heart - line 23
    const markLike = () => {
        setLike(!like)
    }

    return (
        <div className='space-item' key={index} >
            <a href={item.url}>
                <img src = {item.url} alt = {item.image} className = 'photo' />
            </a>
            <div className = 'space-info'>
                <div className='row header'>
                        <h3>{item.title}</h3>
                        <button className='likebutton' onClick = {markLike}>
                            {like ? <FontAwesomeIcon icon={farHeart} />: <FontAwesomeIcon icon={faHeart} />}
                        </button>
                </div>
                <div className='row'>
                    <h4>{item.date}</h4>
                </div>
                <div className='row'>
                    <p className = 'space-text'>{item.explanation}</p>
                </div>
            </div>
            
                     
        </div>
    )
}
export default Display;