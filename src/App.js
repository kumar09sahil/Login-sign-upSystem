import "./App.css";
import ContentCard from "./Components/ContentCard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserPage from "./Components/UserPage";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";

function App() {
 
  return (
    <>
      {/* <BrowserRouter> */}
        <div className="container">
          <Routes>
            <Route exact path="/" element={ <ContentCard /> }/>
            <Route exact path="/user" element={ <UserPage/> }/>
            <Route exact path="/forgotPassword" element={ <ForgotPassword/> }/>
            <Route exact path="/resetPassword/:id" element={ <ResetPassword/> }/>
          </Routes>
        </div>
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
