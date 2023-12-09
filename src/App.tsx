import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import publicRouter from "./router/router";
import DefaultLayout from "./pages/DefaultLayout/DefaultLayout";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRouter.map((route,index)=>{
            const Layout = route.layout
            return (
              <Route 
                key={index} 
                path={route.path} 
                element={
                  <DefaultLayout path = {route.path}>
                    <Layout/>
                  </DefaultLayout>
                }>
              </Route>
            )
          })
          }
        </Routes>
      </div>
    </Router>
  );
}

export default App;
