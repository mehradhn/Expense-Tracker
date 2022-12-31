import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebLayout from "./components/weblayout/WebLayout";
import Home from "./pages/Home/Home";
import SignUp from "./pages/sign-up/SignUp";
import Dashboard from "./pages/dashboard/Dashboard";
import NewExpense from "./pages/new-expense/NewExpense";
import MyExpenses from "./pages/my-expenses/MyExpenses";
import Myprofile from "./pages/my-profile/Myprofile";
import Analytics from "./pages/analytics/Analytics";
import CreateTags from "./pages/create-tags/CreateTags";
import MyTags from "./pages/my-tags/MyTags";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<WebLayout />}>
          <Route path="" element={<Home></Home>} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="new-expense" element={<NewExpense />} />
          <Route path="expenses" element={<MyExpenses />} />
          <Route path="my-profile" element={<Myprofile />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="create-tag" element={<CreateTags />} />
          <Route path="my-tags" element={<MyTags />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
