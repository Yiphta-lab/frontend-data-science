import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../pages/Layout";
import TextInput from "../pages/TextInput";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Layout />}>
    
          <Route path="textinput" element={<TextInput />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
