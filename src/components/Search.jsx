import React, {useState} from 'react';
import SearchIcon from '../res/icons/search.svg';

const Search = (props) => {

    const [search, setSearch] = useState('');

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            props.setPlace(search);
        }
    }
    
    return(
        <div className="search-container">
            <input className="search-input" type="text" placeholder="Search place" onChange={e => setSearch(e.target.value)} onKeyDown={handleKeyPress} />
            <span className="search-submit">
                <img src={SearchIcon} alt="" onClick={() => props.setPlace(search)} />
            </span>
        </div>
    )
}



export default Search;