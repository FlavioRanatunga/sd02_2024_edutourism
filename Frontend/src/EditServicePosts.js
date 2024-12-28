import React, { useState, useEffect } from 'react';
import { useUserId } from './UserIdContext';
import './editserviceprofile.css';
import defualtimg from './assets/default.png';
import { set } from 'rsuite/esm/internals/utils/date';
import { Clear } from '@mui/icons-material';

export default function EditServicePosts({refreshPostsCounter,setSelectedCourseId,setEditPostsModalVisible}){

    const [courses, setCourses] = useState([]);
    const {id} = useUserId();

    const serviceProviderId = id;


  const [notification, setNotification] = useState(null);

  const showNotification = (message) => {
    setNotification(message);
};




  const clearForm = () => {
       document.getElementById("editPostName").value = '';
        document.getElementById("editPostPrice").value = '';
           document.getElementById("EditPostStandard").value = '';
            document.getElementById("editPostLocation").value = '';
            document.getElementById("editPostDuration").value = '';
            document.getElementById("editPostServImage").value = '';
            document.getElementById("editPostEducationalFocus").value = '';
            document.getElementById("editPostLearningOutcome").value = '';
            document.getElementById("EditPostServiceImage").value = '';
            document.getElementById("EditPostServiceImageView").src = defualtimg;    
         
  };


    const fetchServiceProviderPosts = async () => {
    
        try {
          const response = await fetch(`http://localhost:8080/api/courses/getServiceProvidersPosts/${serviceProviderId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(serviceProviderId)
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          const data = await response.json();
          console.log('Fetched filtered courses:', data);
          setCourses(data);
        } catch (error) {
          console.error('Error fetching filtered courses:', error);
        }
      };

      useEffect(() => {
        if(id){        
          fetchServiceProviderPosts();
        }
      },[id,refreshPostsCounter] ); // Fetch courses when any filter criteria changes
    


      const setServiceEditPostModalVisible=(courseId)=>{
        //selectedCourseId=courseId;
        setSelectedCourseId(courseId);
        setEditPostsModalVisible(true);
      }
      
return( 
  <div>
        <h2 style={{ margin:'15px auto' }}>My Posts</h2>

<div className={`courses-list 'fade-out' : ''}`}>
    {courses.map((course) => (
      <div key={course.id} className="course-card" >
        <h3>{course.title}</h3>
        <p>{course.location}</p>
        {course.image && (
          <img
            src={course.image}
            alt={course.title}
            className="course-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'path/to/default/image.jpg';
            }}
          />
        )}
        <p>{course.price}</p>
        <p>{course.standard}</p>
        <p>{course.educationalFocus}</p>
        <p>{course.learningOutcome}</p>
        <p>{course.eventDuration}</p>
        <button onClick={()=>setServiceEditPostModalVisible(course.id)} className="editPostButton">Edit {course.id}</button>
      </div>
    ))}
  </div>
  <div>

              </div>
  
  </div>
);


}