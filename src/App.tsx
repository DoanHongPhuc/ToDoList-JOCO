import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import publicRouter from "./router/router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            {
              publicRouter.map((route, index) => {
                const Layout = route.layout
                const Page = route.page
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout path={route.path}>
                        <Page />
                      </Layout>
                    }>
                  </Route>
                )
              })
            }
          </Routes>
        </div>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
