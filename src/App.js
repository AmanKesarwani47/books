import {
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";
// import "./App.css";
import Books from "./Books";
import AddBook from "./Books/Body/AddBook";
import Header from "./Books/Header";
import NotFound from "./NotFound";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Books />,
    },
    {
      path: "/add-book",
      element: <AddBook />,
    },
    {
      path: "/edit-book/:id",
      element: <AddBook />,
    },
    {
      path: "/*",
      element: <NotFound />,
    },
  ]);

  return (
    <div>
      <Header />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
