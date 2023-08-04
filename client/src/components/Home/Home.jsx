import Cards from "../Cards/Cards";
import './Home.css';

export default function Home ({recipes}) {


    return (

        <div>
            <Cards recipes={recipes}/>
        </div>

    )

}