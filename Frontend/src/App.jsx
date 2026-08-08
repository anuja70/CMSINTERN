import { ThemeProvider } from './Contexts/ThemeContext';
import { DoctorProvider } from './Contexts/DoctorContext';
import AppRouter from './Routes/AppRoutes';

function App() {
  return (
    <ThemeProvider>
      <DoctorProvider>
        <AppRouter />
      </DoctorProvider>
    </ThemeProvider>
  );
}

export default App;