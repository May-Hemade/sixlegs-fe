import "./App.css"

import { ThemeProvider } from "@emotion/react"
import { createTheme } from "@mui/material/styles"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Home from "./pages/Home"
import WithoutNav from "./components/WithoutNav"
import WithNav from "./components/WithNav"

const theme = createTheme()

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Routes>
            <Route element={<WithoutNav />}>
              <Route path="/Signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>
            <Route element={<WithNav />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
