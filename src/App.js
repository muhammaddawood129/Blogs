import "./App.css";
import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Blogs from "./pages/blogs/blogList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PersistentDrawerLeft from "./components/common/navBar";
import CreateBlog from "./pages/blogs/createBlog";
import BlogDetails from "./pages/blogs/blogDetails";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme, colors } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const themeLight = createTheme({
  palette: {
    background: {
      default: "#b0bec5",
    },
    text: {
      primary: "#263238",
    },
  },
});

const themeDark = createTheme({
  palette: {
    background: {
      default: "#263238",
    },
    text: {
      primary: "#ffffff",
    },
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <Blogs />,
  },
  {
    path: "/blogs",
    element: <Blogs />,
  },
  {
    path: "/blogs/manage",
    element: <CreateBlog />,
  },
  {
    path: "/blogs/manage/:id",
    element: <CreateBlog />,
  },
  {
    path: "/blogs/blogDetails/:id",
    element: <BlogDetails />,
  },
]);
function App() {
  const queryClient = new QueryClient();
  const [light, setLight] = React.useState(true);
  return (
    <ThemeProvider theme={light ? themeLight : themeDark}>
      <QueryClientProvider client={queryClient}>
        <PersistentDrawerLeft setLight={setLight} />

        <div style={{ backgroundColor: "#D3D3D3" }}>
          <CssBaseline />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          {/* Same as */}
          <ToastContainer />
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
