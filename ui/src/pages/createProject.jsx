import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function User() {
  const { userId } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3000/users/${userId}`)
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <h1>{user.first_name}</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper elevation={2}>
            <div>
              <h2>User Information:</h2>
              <p>
                <strong>First Name:</strong> {user.first_name}
              </p>
              <p>
                <strong>Last Name:</strong> {user.second_name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={2}>
            <h2>My Projects:</h2>
            {user.projects &&
              user.projects.map((project) => (
                <div key={project.id}>
                  <h3>{project.name}</h3>
                  <p>
                    <strong>Date Created:</strong> {project.date_created}
                  </p>
                  <h4>Routines:</h4>
                  <ul>
                    {project.routines.map((routine) => (
                      <li key={routine.id}>
                        <p>
                          <strong>Name:</strong> {routine.name}
                        </p>
                        <p>
                          <strong>Description:</strong> {routine.description}
                        </p>
                        <p>
                          <strong>Technique ID:</strong> {routine.technique_id}
                        </p>
                        <p>
                          <strong>Scale ID:</strong> {routine.scale_id}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={2}>
            <div>
              <h2>Settings:</h2>
              <p>
                <strong>Change Password</strong>
              </p>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  frame: {
    border: "1px solid #ccc",
    padding: "20px",
    margin: "10px",
  },
};

export default User;
