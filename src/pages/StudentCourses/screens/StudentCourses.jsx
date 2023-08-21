import React from 'react';
import Courses from '../components/Courses';
import coursesData from '../data/coursesData';

const StudentCourses = () => {
  return (
    <div className="flex flex-col items-center mt-4">
      <Courses courses={coursesData} />
    </div>
  );
};

export default StudentCourses;
