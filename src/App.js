import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import QuizTopicSelection from "./pages/QuizTopicSelection";
import Result from "./pages/Result";
import SelectTopic from "./pages/SelectTopic";
import Signup from "./pages/Signup";
import StartQuiz from "./pages/StartQuiz";
import PrivateRoutes from "./utils/PrivateRoutes";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<PrivateRoutes/>}>
        <Route path="/" element={<Home />} exact/>
        <Route path="/quiz" element={<QuizTopicSelection/>} />
        <Route path="/quiz/:id" element={<StartQuiz/>} />
        <Route path="/topic" element={<SelectTopic/>} />
        <Route path="/result" element={<Result/>} />
      </Route>
    </Routes>
  )
}
