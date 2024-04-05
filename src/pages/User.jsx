import axios from "axios";
import { useState } from "react";
import { TextField, Button, Snackbar, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import "../App.css";

export default function AddUsername() {
  const [username, setUsername] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const addUser = async (e) => {
    e.preventDefault();

    try {
      const url = `${import.meta.env.VITE_APP_BASE_URL}/create_user`
      const response = await axios.post(url, { username }, { withCredentials: true });
      console.log("data", response);
      if (response.data.success) {
        setSnackbarMessage("Username added successfully");
        setSnackbarOpen(true);
        setUsername("");
        // Redirect to login page after successful addition of username
        window.location.href = "/login";
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Card className="card-container-user" style={{marginTop: '200px'}}>
        <CardContent>
          <form onSubmit={addUser} className="form-container">
            <div className="form-header">
              <img src="/src/images/signin.png" alt="" width={"50px"} />
              <h1>Add Username</h1>
            </div>

            <div className="form-content">
              <TextField
                id="outlined-basic"
                variant="outlined"
                color="primary"
                fullWidth
                size="small"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
                label="Username"
              />
            </div>
            <div className="submit-button">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="username-button"
              >
                Add Username
              </Button>
            </div>
          </form>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
            message={snackbarMessage}
          />
        </CardContent>
      </Card>

      <div className="login-page-link">
        <span>Already a user?</span>
        <Link to="/login" style={{ textDecoration: "none" }} className="center-link">
          <b>Login Page</b>
        </Link>
      </div>
    </>
  );
}
