import { ThemeProvider } from "@/components/theme-provider";
import Homepage from "@/pages/Homepage";
import { store, persistor } from "@/store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "@/components/ui/sonner";
import ErrorBoundary from "@/components/ErrorBoundary";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorBoundary>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Homepage />
          </ThemeProvider>
          <Toaster />
        </ErrorBoundary>
      </PersistGate>
    </Provider>
  );
}

export default App;
