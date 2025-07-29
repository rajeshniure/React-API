import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Alert,
  CssBaseline,
} from "@mui/material";

import { fetchCourses } from "../api/productApi";


function CourseList() {

  const { data, isLoading, error } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          📚 Course List
        </Typography>

        {isLoading && <CircularProgress />}
        {error && (
          <Alert severity="error">Failed to fetch courses. Try again.</Alert>
        )}

        {data && (
          <List>
            {data.map((course: any) => (
              <ListItem key={course.id}>
                <ListItemText
                  primary={course.name || "Untitled Course"}
                  secondary={`ID: ${course.id}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Container>
    </>
  );
}

export default CourseList;
