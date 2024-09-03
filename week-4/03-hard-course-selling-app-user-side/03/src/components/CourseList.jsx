import { useState , useEffect } from 'react'

function CourseList(props) {
    const [courses, setCourses] = useState([])
    const [purchasedCourses , setPurchasedCourses] = useState([])

    useEffect(() => {
      async function fetchC() {
          try {
              let response = await fetch("http://localhost:3000/users/courses",{
                  method : "GET",
                  headers : {
                      "authorization" : "Bearer " + localStorage.getItem("jwtToken")
                  }
              });
              response = await response.json();
              // console.log(response.courses);
              setCourses([...response.courses]);
          }
          catch(error) {
            console.log(error);
          }
        }
        fetchC();
        async function fetchPC() {
          try {
              let response = await fetch("http://localhost:3000/users/purchasedCourses",{
                  method : "GET",
                  headers : {
                      "authorization" : "Bearer " + localStorage.getItem("jwtToken")
                  }
              });
              response = await response.json();
              // console.log(response.courses);
              setPurchasedCourses([...response.purchasedCourses]);
          }
          catch(error) {
            console.log(error);
          }
        }
        fetchPC();
      //   console.log(courses);
    }, []);

    const handlePurchase = async (e , index) => {
      e.preventDefault();
      try {
        const response = await fetch(`http://localhost:3000/users/courses/${index}`, {
          method: 'POST',
          headers: {
            "authorization" : "Bearer " + localStorage.getItem("jwtToken")
          }
        });
        console.log(response);
        alert("Course Purchased!");
      }
      catch(err) {
        console.log(err);
      }
    };

    if(props.type===0){  
      return (
        <div>
          {courses.map((c , index) => (
            <div key={index}>
            <h1>{c.title}</h1>
            <br/>
            <h2>{c.description}</h2>
            </div>
          ))}
        </div>
      )
    }
    else if(props.type===1){
      return (
        <div>
          {purchasedCourses.map((c , index) => (
            <div key={index}>
            <h1>{c.title}</h1>
            <br/>
            <h2>{c.description}</h2>
            </div>
          ))}
        </div>
      )
    }
    else{
      return (
        <div>
          {courses.map((c , index) => (
            <div key={index} onClick={(e) => handlePurchase(e , c.id)}>
            <h1>{c.title}</h1>
            <br/>
            <h2>{c.description}</h2>
            </div>
          ))}
        </div>
      )
    }
  }
  
  export default CourseList