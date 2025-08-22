import { Header } from "./components/layout/Header";
import { useAuth } from "./contexts/auth-context";
import { AuthProvider } from "./contexts/auth-provider";
import { useView } from "./contexts/use-view"
import { ViewProvider } from "./contexts/view-provider"
import { ThemeProvider } from "./hooks/theme-provider"
import { ToastContainer } from 'react-toastify';
import { CheckerPage } from "./pages/Checker/page";
import { LoginPage } from "./pages/Login/page";
import { UserPage } from "./pages/User/page"
import { AnatelPage } from "./pages/Anatel/page";
import { ViewSheetProvider } from "./contexts/sheet-provider";


function RootApp() {
  const { view } = useView();
  const { token } = useAuth()

  if (!token) {
    return <LoginPage />;
  }

  return (
    <>
      <Header />
      {view === 'loginpage' && <LoginPage />}
      {view === 'userpage' && <UserPage />}
      {view === 'checkerpage' && <CheckerPage />}
      {view === 'anatelpage' && <AnatelPage />}
    </>
  )
}

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <ViewProvider>
          <ViewSheetProvider>

          <RootApp />
          </ViewSheetProvider>
          <ToastContainer />
        </ViewProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App