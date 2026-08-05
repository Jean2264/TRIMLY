import EmployeeProfileHeader from "./EmployeeProfileHeader";
import EmployeeInfo from "./EmployeeInfo";
import PageNavigation from "../common/PageNavigation";
import Header from "../common/Header";
import "./EmployeeProfile.css";
import Footer from "../common/Footer";
import CardSection from "../common/CardSection";
import { useNavigate } from "react-router-dom";
import EmployeeServices from "./EmployeeServices";
import { useState } from "react";
import { useLocation } from "react-router-dom";


function EmployeeProfile()
{
  const [selectedService, setSelectedService] =useState(null);
  const location= useLocation();
  const employee = location.state?.employee;
  const  navigate = useNavigate();


  const handleReservation= ()=>{
    navigate("/reservation", {
      state:{
        employee,
        service: selectedService,
        currentStep: 2,
         flow: "employee"
      }
    });
  }
  const handleHome=()=>{
    navigate("/");
  }
 
     return(
        <div className="employee-profile">


            <Header/>
            <main className="employee-profile-content">

               <section className="employee-photo">
                 <EmployeeProfileHeader />
             </section>
           

              <CardSection className="employee-data">
                <EmployeeInfo
                employee={employee} />
              </CardSection>

             <CardSection className="employee-services-section">
              <EmployeeServices
              employee={employee}
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              services={employee.services}
              />
             </CardSection>


           {/** <EmployeeServices /> */}

            <CardSection className="page-navigation">

              <PageNavigation
              leftText="Volver"
              rightText="Reservar turno"
              disabled={!selectedService}
              onRightClick={handleReservation}
              onLeftClick={handleHome}
              />
            </CardSection>
            </main>

          <Footer/>
        </div>
     )
}

export default EmployeeProfile;