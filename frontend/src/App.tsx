import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppContainer } from "./components/app-container";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppContainer />
        <ToastContainer />
      </QueryClientProvider>
    </>
  );
}

export default App;
