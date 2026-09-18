import { ThemeProvider } from './contexts/ThemeContext';
import { DoctorProvider } from './Contexts/doctorContext.js';
import { DepartmentProvider } from './Contexts/departmentContext.jsx';
import AppRouter from './Routes/AppRoutes';

function App() {
  return (
    <ThemeProvider>
      <DoctorProvider>
        <DepartmentProvider>
          <AppRouter />
        </DepartmentProvider>
      </DoctorProvider>
    </ThemeProvider>
  );
}

export default App;