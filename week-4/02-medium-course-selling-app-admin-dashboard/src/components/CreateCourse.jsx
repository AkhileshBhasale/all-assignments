import { useState } from "react";
/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse() {
    const [title, setTitle] = useState("");
    const [description , setDescription] = useState("");

    const handleCourseSubmission = async () => {
        try {
            let res  = await fetch("http://localhost:3000/admin/courses",{
                method : "POST",
                body : JSON.stringify({
                    title : title,
                    descriptiton : description
                }),
                headers : {
                    "Content-Type": "application/json",
                    "authorization" : "Bearer " + localStorage.getItem("jwtToken")
                }
            });
            console.log(res);
            location.reload();
        }
        catch(err) {
            console.log(err);
        }
    }
    
    return <div>
        <h1>Create Course Page</h1>
        Course Title : 
        <input type={"text"} onChange={e => setTitle(e.target.value)} />
        <br/>
        Course Description :
        <input type={"text"} onChange={e => setDescription(e.target.value)} />
        <br/>
        <button onClick={handleCourseSubmission}>Create Course</button>
    </div>
}

export default CreateCourse;