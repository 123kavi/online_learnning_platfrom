import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './courses.css';

const AddCourse = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const[courseenrolmentid,setCourseenrolmentid]=useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchCourseDetails(); // Fetch course details if id exists
    }
  }, [id]);

  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { title, description, courseenrolmentid } = response.data; // Ensure courseenrolmentid is destructured here
      setTitle(title);
      setDescription(description);
      setCourseenrolmentid(courseenrolmentid); // Correctly set the courseenrolmentid
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const courseData = { title, description,courseenrolmentid };
      if (id) {
        // Update existing course
        await axios.put(`http://localhost:5000/api/courses/${id}`, courseData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // Create new course
        await axios.post('http://localhost:5000/api/courses', courseData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      navigate('/course-management'); // Navigate back to course management page after submission
    } catch (error) {
      console.error('Error saving course details:', error);
    }
  };

  return (
    <div className="bodyWrap">
      <div className="contentAddStudentWrap">
        <div className="formSide">
          <div className="formWrap formBorder">
            <form onSubmit={handleFormSubmit}>
              <h1>{id ? 'Update Course' : 'Add Course'}</h1>
              <div className="input-group">
                <input
                  type="text"
                  value={title}
                  className="input"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={id ? title : 'Enter Course Title'}
                  required
                />
                <label className={`${title.length > 0 ? 'focusLabel' : ''}`}></label>
              </div>
              <div className="input-group">
                <textarea
                  value={description}
                  className="input"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={id ? description : 'Enter Course Description'}
                  required
                />
                <label className={`${description.length > 0 ? 'focusLabel' : ''}`}></label>
              </div>

              <div className="input-group">
                <textarea
                  value={courseenrolmentid}
                  className="input"
                  onChange={(e) => setCourseenrolmentid(e.target.value)}
                  placeholder={id ? courseenrolmentid : 'Enter Course enrollmentId'}
                  required
                />
                <label className={`${courseenrolmentid.length > 0 ? 'focusLabel' : ''}`}></label>
              </div>
              <button type="submit">{id ? 'Update Course' : 'Add Course'}</button>
            </form>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default AddCourse;
