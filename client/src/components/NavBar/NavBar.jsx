import logo from '../../assets/logo.png'
import './NavBar.css';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';

export default function NavBar ({onSearch}) {

    return(

        <nav className='Nav'>
            <div className='nav-container'>

                <div className='logo-container'>
                    <Link to='/home'>
                        <img className='logo' src={logo} alt='logo' />
                    </Link>
                </div>

                <div className='sb'>
                    <SearchBar onSearch={onSearch}/>
                </div>

            </div>

        </nav>

    )


}