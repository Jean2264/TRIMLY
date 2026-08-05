import HomeTop from "../../sections/HomeTop";
import ServiceCaroucel from "../../components/services/ServiceCarrousel";
import EmployeeCaroucel from "../../components/employees/EmployeeCaroucel";
import ScheduleCard from "../../components/scheduled/ScheduleCard";
import ContactSection from "../../components/contacts/ContactSection";
import Footer from "../../components/common/Footer";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import SeeMoreButton from "../../components/common/SeeMoreButton";
import Location from "../../components/common/location";

function Home() {

    const navigate = useNavigate();

    const employees = [
        {
            id: 1,
            name: "Walter",
            experience: "+1 año",
            image: "",
            services: [
                { id: 1, name: "Corte", time: 45, price: 18000 },
                { id: 2, name: "Corte + Barba", time: 60, price: 22000 },
                { id: 3, name: "Afeitado clásico", time: 30, price: 15000 },
                { id: 4, name: "Perfilado de cejas", time: 20, price: 8000 }
            ]
        },
        {
            id: 2,
            name: "Carlos",
            experience: "+3 años",
            image: "",
            services: [
                { id: 1, name: "Corte", time: 45, price: 18000 },
                { id: 3, name: "Perfilado", time: 30, price: 12000 },
                { id: 5, name: "Coloración de cabello", time: 90, price: 35000 },
                { id: 6, name: "Tratamiento capilar", time: 40, price: 20000 }
            ]
        },
        {
            id: 3,
            name: "Lucas",
            experience: "+5 años",
            image: "",
            services: [
                { id: 1, name: "Corte", time: 45, price: 18000 },
                { id: 4, name: "Color", time: 90, price: 28000 },
                { id: 6, name: "Tratamiento capilar", time: 40, price: 20000 }
            ]
        },
        {
            id: 4,
            name: "Matías",
            experience: "+2 años",
            image: "",
            services: [
                { id: 1, name: "Corte", time: 45, price: 18000 },
                { id: 2, name: "Corte + Barba", time: 60, price: 22000 },
                { id: 7, name: "Arreglo de barba", time: 25, price: 10000 },
                { id: 8, name: "Lavado + Peinado", time: 30, price: 12000 }
            ]
        },
        {
            id: 5,
            name: "Santiago",
            experience: "+4 años",
            image: "",
            services: [
                { id: 1, name: "Corte", time: 45, price: 18000 },
                { id: 9, name: "Alisado", time: 120, price: 40000 },
                { id: 5, name: "Coloración de cabello", time: 90, price: 35000 },
                { id: 10, name: "Mechas", time: 100, price: 38000 },
                { id: 6, name: "Tratamiento capilar", time: 40, price: 20000 }
            ]
        },
        {
            id: 6,
            name: "Diego",
            experience: "+6 años",
            image: "",
            services: [
                { id: 1, name: "Corte", time: 45, price: 18000 },
                { id: 2, name: "Corte + Barba", time: 60, price: 22000 },
                { id: 3, name: "Perfilado", time: 30, price: 12000 },
                { id: 7, name: "Arreglo de barba", time: 25, price: 10000 },
                { id: 11, name: "Masaje capilar", time: 20, price: 9000 },
                { id: 6, name: "Tratamiento capilar", time: 40, price: 20000 }
            ]
        }
    ];

    const services = [
    {
        id: 1,
        name: "Corte",
        time: "45 min",
        price: 18000,
        oldPrice: 20000
    },
    {
        id: 2,
        name: "Corte + barba",
        time: "60 min",
        price: 22000,
        oldPrice: null
    },
    {
        id: 3,
        name: "Afeitado clásico",
        time: "30 min",
        price: 15000,
        oldPrice: 17000
    },
    {
        id: 4,
        name: "Perfilado de cejas",
        time: "20 min",
        price: 8000,
        oldPrice: null
    },
    {
        id: 5,
        name: "Coloración de cabello",
        time: "90 min",
        price: 35000,
        oldPrice: 38000
    },
    {
        id: 6,
        name: "Tratamiento capilar",
        time: "40 min",
        price: 20000,
        oldPrice: null
    }
];

    const handleEmployeeClick = (employee) => {
        navigate("/employee", {
            state: {
                employee,
                currentStep: 2
            }
        });
    };

    const handleServiceClick = (service) => {
        navigate("/reservation", {
            state: {
                service,
                employees,
                currentStep: 1,
                flow: "service"
            }
        });
    };

    return (
        <div className="home">

            <HomeTop />

            <main className="home-container">

                <section>
                    <div className="section-header">
                        <h2>Nuestros servicios</h2> <SeeMoreButton
                        ariaLabel="Explorar todos los servicios"/>
                    </div>

                    <ServiceCaroucel
                        services={services}
                        
                        onServiceClick={handleServiceClick}
                    />
                </section>

                <section className="employee">
                    <div className="section-header">
                    <h2>Nuestros barberos</h2>  <SeeMoreButton
                    ariaLabel="Explorar todos los empleados"/>
                    </div>
                    

                    <EmployeeCaroucel
                        employees={employees}
                        
                        onEmployeeClick={handleEmployeeClick}
                    />
                </section>

                <section>
                    <h2>Nos encontramos en</h2>
                    <Location/>
                </section>

                <section>
                    <h2>Los días</h2>
                    <ScheduleCard />
                </section>

                <section>
                    <h2>Nuestros contactos</h2>
                    <ContactSection />
                </section>

            </main>

            <Footer />

        </div>
    );
}

export default Home;