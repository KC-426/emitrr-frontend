import axios from "axios";
import { useState } from "react";
import { TextField, Button, Snackbar, Card, CardContent } from "@mui/material";
import "../App.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
     const url =  `${import.meta.env.VITE_APP_BASE_URL}/login`
      const response = await axios.post(url, { username }, { withCredentials: true });
      console.log("data", response);
      if (response.data.success) {
        setSnackbarMessage("Logged in successfully");
        setSnackbarOpen(true);
        setUsername("");
        // Set authenticated to true after successful login
        setAuthenticated(true);
      }
    } catch (err) {
      console.log(err);
      setSnackbarMessage("Failed to login");
      setSnackbarOpen(true);
    }
  };

  const redirectToStartGame = () => {
    if (authenticated) {
      // Redirect to start game page after successful login
      window.location.href = "/start-game";
    } else {
      // Handle unauthenticated access
      console.log("User is not authenticated");
    }
  };

  return (
    <>
      <Card className="card-container-user" style={{ marginTop: "200px" }}>
        <CardContent>
          <form onSubmit={handleLogin} className="form-container">
            <div className="form-header">
              <img src="/src/images/signin.png" alt="" width={"50px"} />
              <h1>Login</h1>
            </div>

            <div className="form-content">
              <TextField
                id="outlined-basic-username"
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
                className="login-button"
              >
                Login
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

      <div className="start-game-button">
        <Button
          variant="contained"
          color="primary"
          className="start-button"
          onClick={redirectToStartGame}
        >
          <b>Start Game</b>
        </Button>
      </div>
    </>
  );
}
