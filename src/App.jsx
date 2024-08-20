import '@mantine/core/styles.css';
import { Button, Container,  MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TodoPage from './pages/todo.page';
const queryClient = new QueryClient()
function App() {
  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
      <Container>
            <Button fullWidth>Close</Button>
            <TodoPage /> 
      </Container>
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;
