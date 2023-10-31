import React, {useState} from "react";
import { Navbar } from "../components/navbar";
import axios from 'axios'

export const Homepage = () => {
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("")

  const  handleSubmit = async (event) => {
    try {
      
      event.preventDefault();
      console.log(summary, description)

      const options = {
          method: 'post',
          url: 'http://localhost:3000/insertGoogleAgenda',
          headers: {
              'Content-Type': 'application/json',
          },
          data:{
            summary:summary, 
            description:description
          }
          
        };
        axios(options)
      .then(response => {
        
          console.log(response.data);
      })
      .catch(error => {
          console.log(error);
      });

    } catch (e) {
      console.log(e.message);
    }

   
  }

  const handleChangeSummary = (event) => {
    setSummary(event.target.value);
  };
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  return (
    <>
      <div className="page-layout">
        <div className="page-layout__content" />
        <Navbar/>
        dede

      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            summary
            <input type="text" value={summary} onChange={handleChangeSummary} />
          </label>
          <label>
            description
            <input type="text" value={description} onChange={handleChangeDescription} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
};

export default Homepage;
