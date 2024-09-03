import { useEffect , useState } from "react";

function ShowCourses() {
    const [courses, setCourses] = useState([]);

    // Add code to fetch courses from the server
    // and set it in the courses state variable.

    useEffect(() => {
        async function fetchC() {
            try {
                let response = await fetch("http://localhost:3000/admin/courses",{
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
        //   console.log(courses);
        }, [])
    if(!courses){
        return <div>Loading ... </div>
    }
    console.log(courses);
    return <div>
        <h1>List of Courses</h1>
        {courses.map((c , index) => <Course key={index} title={c.title} />)}
    </div>
}

function Course(props) {
    return <div>
        <h1>{props.title}</h1>
        <br/>
    </div>
}

export default ShowCourses;