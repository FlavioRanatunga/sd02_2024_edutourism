import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
//import './profileSettings.css';
import'./editservicepostsmodal.css';
import { useUserId } from './UserIdContext';
import defualtimg from './assets/default.png';
import { set } from 'rsuite/esm/internals/utils/date';


export default function SettingsModal({ setEditPostsModalVisible,isEditPostsModalVisible, selectedCourseId , setRefreshPostsCounter,refreshPostsCounter}) {

    const {id} = useUserId();


        const serviceProviderId = id;

        const [selectedCourse, setSelectedCourse] = useState({
            id: '',
            title: '',
            price: '',
            location: '',
            image: '',
            standard: '',
            educationalFocus: '',
            eventDuration: '',
            learningOutcome: ''
        });

        const [notification, setNotification] = useState(null);

        const showNotification = (message) => {
          setNotification(message);
      };

      const closeEditPostsModal = () => {
        setEditPostsModalVisible(false);
      }

      useEffect(() => {
        if(selectedCourseId){        
          //fetchServiceProviderPosts();
          handleEditPost(selectedCourseId);
        }
      },[id] );

        const handleImageUpload = async (e) => {
            document.getElementById('EditPostImageLoadingModal').style.display = 'block';
            const file = e.target.files[0];
          
            const reader = new FileReader();
            reader.onload = (event) => {
              document.getElementById('EditPostServiceImageViewModal').src = event.target.result; // Set the image src to the file data URL
            };
            reader.readAsDataURL(file);
          
            const formData = new FormData();
            formData.append('file', file);
          
            try {
              const response = await fetch('http://localhost:8080/upload/img', {
                method: 'POST',
                body: formData,
              });
          
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
          
              const data = await response.text();
              document.getElementById('editPostServImageModal').value= data;
              
              document.getElementById('EditPostImageLoadingModal').style.display = 'none';
              
              console.log(data);
            } catch (error) {
              console.error('Error uploading file to backend:', error);
              document.getElementById('EditPostImageLoadingModal').style.display = 'none';
            }
          };

          const clearForm = () => {
            document.getElementById("editPostNameModal").value = '';
             document.getElementById("editPostPriceModal").value = '';
                document.getElementById("EditPostStandardModal").value = '';
                 document.getElementById("editPostLocationModal").value = '';
                 document.getElementById("editPostDurationModal").value = '';
                 document.getElementById("editPostServImageModal").value = '';
                 document.getElementById("editPostEducationalFocusModal").value = '';
                 document.getElementById("editPostLearningOutcomeModal").value = '';
                 document.getElementById("EditPostServiceImageModal").value = '';
                 document.getElementById("EditPostServiceImageViewModal").src = defualtimg;    
              
       };

       const handleEditPost = async (id) => {
        try {
          const response = await fetch(`http://localhost:8080/api/courses/${id}`);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
        //  if(editPostVisible){
        //   clearForm();
        //  }
         
        
          setSelectedCourse(data);
          selectedCourse.id = id;
        //  setEditPostVisible(true);
          console.log(data);
        } catch (error) {
          console.error('Error fetching course details:', error);
        }
      };

        const handleUpdateService = (e) => {
            e.preventDefault();
          
            // Get form data
            const formData = {
               postId: selectedCourse.id,
                title:  document.getElementById("editPostNameModal").value,
                price: document.getElementById("editPostPriceModal").value,
                standard: document.getElementById("EditPostStandardModal").value,
                location: document.getElementById("editPostLocationModal").value,
                image:document.getElementById("editPostServImageModal").value,
                educationalFocus: document.getElementById("editPostEducationalFocusModal").value,
                learningOutcome: document.getElementById("editPostLearningOutcomeModal").value,
                eventDuration: document.getElementById("editPostDurationModal").value,
                serviceProvider: id
               
    
            };
          
            // Log form data to the console (for debugging purposes)
            console.log(formData);
          
            // Send a POST request to the backend
            fetch("http://localhost:8080/service-provider/updateService", {  
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();  
            })
            .then(data => {
                // Handle successful form submission
                console.log("Post updated successfully:", data);
                showNotification("Post updated successfully!");
               setRefreshPostsCounter(refreshPostsCounter+1);
                closeEditPostsModal();
                clearForm();
                // setEditPostVisible(false);
               // fetchServiceProviderPosts();
                // Clear the form or perform other success actions
            })
            .catch(error => {
                // Handle errors
                console.error("Error updating post:", error);
                showNotification("Updating post failed!");
            });
          };

  return (
    isEditPostsModalVisible && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
        id="settingsModal-settings" className='editPostsForm'
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          exit={{ opacity: 0, y: -50, transition: { duration: 0.5 } }}
          className='editPostsFormContent' style={{ margin: 'auto', width: '50%', background: 'cadetblue', color: 'black' }}
        >
          <span className="close-button"  onClick={closeEditPostsModal}> &times;</span>
          <h2 style={{ margin:'15px auto' }}>Edit Post</h2>
                <div id='create_form' style={{ width: '90%', background: '#ffffff', color: 'black' }}>
    

                  <form onSubmit={handleUpdateService} >
                  
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="editPostNameModal" name="name" required value={selectedCourse.title}  onChange={(e) => setSelectedCourse({ ...selectedCourse, title: e.target.value })} />
                    <label htmlFor="price">Price:</label>
                    <input type="text" id="editPostPriceModal" name="price" required value={selectedCourse.price}  onChange={(e) => setSelectedCourse({ ...selectedCourse, price: e.target.value })}/>
                    <label htmlFor="location">Location:</label>
                    <input type="text" id="editPostLocationModal" name="location" required value={selectedCourse.location} onChange={(e) => setSelectedCourse({ ...selectedCourse, location: e.target.value })}/>
                    <label htmlFor="ServiceImage">Image:</label>
                    <input type="hidden" id="editPostServImageModal" name="servImage" value= {selectedCourse.image} />
                    <input type="file" id="EditPostServiceImageModal" name="ServiceImage" accept="image/*" onChange={handleImageUpload} />
    
                    <label htmlFor="standard">Standard:</label>
                    <input type="text" id="EditPostStandardModal" name="standard" required value={selectedCourse.standard} onChange={(e) => setSelectedCourse({ ...selectedCourse, standard: e.target.value })}/>
                    <label htmlFor="educationalFocus">Educational Focus:</label>
                    <input type="educationalFocus" id="editPostEducationalFocusModal" name="educationalFocus" required value={selectedCourse.educationalFocus} onChange={(e) => setSelectedCourse({ ...selectedCourse, educationalFocus: e.target.value })}/>
                    <label htmlFor="Duration">Duration:</label>
                    <input type="text" id="editPostDurationModal" name="Duration" required value={selectedCourse.eventDuration} onChange={(e) => setSelectedCourse({ ...selectedCourse, eventDuration: e.target.value })}/>
                    <label htmlFor="learningOutcome">Learning Outcome:</label>
                    <input type="text" id="editPostLearningOutcomeModal" name="learningOutcome" required value={selectedCourse.learningOutcome} onChange={(e) => setSelectedCourse({ ...selectedCourse, learningOutcome: e.target.value })}/>
                    <div>
                    <img id = "EditPostServiceImageViewModal" src={selectedCourse.image}  alt="Profile" style={{ width: '20%', marginBottom: '15px', marginTop: '15px' }} />
                  </div>
                    <button type="submit" >Update Post</button>
                    <div id="EditPostImageLoadingModal" style={{display: 'none', zIndex: '100000'}} >
        <l-tail-chase size="40" speed="1.75" color="black"></l-tail-chase>
        </div>
    
                  </form>
                  </div>

        </motion.div>
      </motion.div>
    )
  );
}
