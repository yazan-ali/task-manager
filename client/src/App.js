import Routes from './routes/Routes';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const App = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Routes />
        </LocalizationProvider>
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;