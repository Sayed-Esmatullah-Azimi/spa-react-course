import { Container,  MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PostDetail from './pages/posts/detail.page';
import PostPage from './pages/post.page';
import '@mantine/core/styles.css';
const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <PostPage />,
  },
  {
    path: "/todo",
    element: <h1>Hello World!</h1>,
  },
  {
    path: "post/:id",
    element: <PostDetail/>,
  },
]);
function App() {
  return (
      <QueryClientProvider client={queryClient}>
       <MantineProvider withGlobalStyles withNormalizeCSS theme={{   colorScheme: localStorage.getItem('theme') || 'light'}}   forceColorScheme={localStorage.getItem('theme') || 'light'}>
          <Container>
        <RouterProvider router={router} >
                <PostPage /> 
        </RouterProvider>
          </Container>
        </MantineProvider>
      </QueryClientProvider>
  );
}

export default App;
