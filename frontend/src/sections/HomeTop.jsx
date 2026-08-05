import "./HomeTop.css";
import Header from "../components/common/Header";
import SearchBar from "../components/common/SearchBar";
import Greeting from "../components/common/Greeting";

function HomeTop()
{

        return (

            <section className="top-section">
                <Header />
                <Greeting/>
                <SearchBar />
                </section>
        );
}

export default HomeTop;