import "./App.css";
import { Route, Routes } from "react-router-dom";
import ViewAll from "./pages/ViewAll";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Delete from "./pages/Delete";
import Details from "./pages/Details";
import PageNotFound from "./pages/PageNotFound";
function App() {
  return (
    <Routes>
      <Route index element={<ViewAll />} />
      <Route path="/add" element={<Add />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/delete/:id" element={<Delete />} />
      <Route path="/details/:id" element={<Details />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
