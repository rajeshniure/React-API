import { useEffect, useState } from "react";
import { getStudentDetails } from "../api/productApi";
import { Container, Typography, Box } from "@mui/material";

const Home = () => {
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await getStudentDetails(); 
        setStudent(data);
      } catch (error) {
        console.error("Failed to fetch student details:", error);
      }
    };

    fetchStudent();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to the Dashboard
      </Typography>

      {student ? (
        <Box mt={2}>
          <Typography><strong>Name:</strong> {student.name}</Typography>
          <Typography><strong>Faculty:</strong> {student.faculty}</Typography>
          <Typography><strong>Age:</strong> {student.age}</Typography>
          <Typography><strong>Course:</strong> {student.course}</Typography>
        </Box>
      ) : (
        <Typography>Loading student details...</Typography>
      )}
    </Container>
  );
};

export default Home;
