import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import ExamCodeGenerator from './pages/ExamCodeGenerator';
import ExamCodeDisplay from './pages/ExamCodeDisplay';
import MarkFoil from './pages/MarkFoil';
import Layout from './components/Layout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

interface ExamCode {
  rollNumber: string;
  subject: string;
  examCode: string;
  id: number;
}

function App() {
  const [examCodes, setExamCodes] = useState<ExamCode[]>([]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route 
              path="/" 
              element={<ExamCodeGenerator examCodes={examCodes} setExamCodes={setExamCodes} />} 
            />
            <Route 
              path="/display" 
              element={<ExamCodeDisplay examCodes={examCodes} />} 
            />
            <Route 
              path="/markfoil" 
              element={<MarkFoil examCodes={examCodes} />} 
            />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
