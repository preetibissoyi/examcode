import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Add, Assignment, Download } from '@mui/icons-material';
import { jsPDF } from 'jspdf';
import { streams } from '../data/streams';

interface ExamCode {
  rollNumber: string;
  subject: string;
  examCode: string;
  id: number;
}

interface ExamCodeDisplayProps {
  examCodes: ExamCode[];
}

const ExamCodeDisplay: React.FC<ExamCodeDisplayProps> = ({ examCodes }) => {
  const navigate = useNavigate();
  const [selectedStream, setSelectedStream] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');

  const handleStreamChange = (event: any) => {
    setSelectedStream(event.target.value);
    setSelectedSubject(''); // Reset subject when stream changes
  };

  const handleSubjectChange = (event: any) => {
    setSelectedSubject(event.target.value);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Add college logo (you'll need to import and add the logo image)
    // doc.addImage(logo, 'PNG', 20, 15, 20, 20);

    // Add college name
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('NIMAPARA AUTONOMOUS COLLEGE, NIMAPARA', 105, 20, { align: 'center' });

    // Add exam title
    doc.setFontSize(14);
    doc.text('SF UG SEM-2 CODESHEET EXAM - 2025 (R)', 105, 35, { align: 'center' });

    // Add stream title box
    doc.rect(20, 45, 100, 30);
    doc.setFontSize(12);
    doc.text('BACHELOR IN', 70, 60, { align: 'center' });
    doc.text('COMPUTER APPLICATION', 70, 70, { align: 'center' });

    // Add Roll No and Code headers
    doc.rect(20, 75, 80, 15);
    doc.rect(100, 75, 50, 15);
    doc.text('Roll No', 60, 85, { align: 'center' });
    doc.text('Code', 125, 85, { align: 'center' });

    // Create three columns of data
    const itemsPerColumn = Math.ceil(examCodes.length / 3);
    
    // Define the layout for three columns
    const columnLayouts = [
      { x: 20, width: { roll: 80, code: 50 } },    // First column
      { x: 170, width: { roll: 80, code: 50 } },   // Second column
      { x: 320, width: { roll: 80, code: 50 } }    // Third column
    ];

    // Create table rows
    examCodes.forEach((code, index) => {
      const columnIndex = Math.floor(index / itemsPerColumn);
      const rowIndex = index % itemsPerColumn;
      const layout = columnLayouts[columnIndex];
      const y = 90 + (rowIndex * 15);

      // Draw cell borders
      doc.rect(layout.x, y, layout.width.roll, 15);  // Roll No cell
      doc.rect(layout.x + layout.width.roll, y, layout.width.code, 15);  // Code cell

      // Add text
      doc.setFont('helvetica', 'normal');
      doc.text(code.rollNumber, layout.x + 5, y + 10);
      doc.text(code.examCode, layout.x + layout.width.roll + 5, y + 10);
    });
    
    // Save the PDF
    doc.save('exam-codesheet.pdf');
  };

  const filteredExamCodes = examCodes.filter(code => {
    if (!selectedStream && !selectedSubject) return true;
    if (selectedStream && !selectedSubject) {
      const stream = streams.find(s => s.name === selectedStream);
      return stream?.subjects.some(sub => code.subject.includes(sub.code));
    }
    if (selectedStream && selectedSubject) {
      return code.subject.includes(selectedSubject);
    }
    return false;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Generated Exam Codes</Typography>
        <Box>
          <Button
            variant="outlined"
            onClick={() => navigate('/')}
            startIcon={<Add />}
            sx={{ mr: 2 }}
          >
            Generate New Code
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate('/markfoil')}
            startIcon={<Assignment />}
            sx={{ mr: 2 }}
          >
            Enter Marks
          </Button>
          {examCodes.length > 0 && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDownloadPDF}
              startIcon={<Download />}
            >
              Download PDF
            </Button>
          )}
        </Box>
      </Box>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
          <Box sx={{ width: { xs: '100%', md: '50%' } }}>
            <FormControl fullWidth>
              <InputLabel>Select Stream</InputLabel>
              <Select
                value={selectedStream}
                onChange={handleStreamChange}
                label="Select Stream"
              >
                {streams.map((stream) => (
                  <MenuItem key={stream.code} value={stream.name}>
                    {stream.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ width: { xs: '100%', md: '50%' } }}>
            <FormControl fullWidth>
              <InputLabel>Select Subject</InputLabel>
              <Select
                value={selectedSubject}
                onChange={handleSubjectChange}
                label="Select Subject"
                disabled={!selectedStream}
              >
                {selectedStream && streams
                  .find(s => s.name === selectedStream)
                  ?.subjects.map((subject) => (
                    <MenuItem key={subject.code} value={subject.code}>
                      {subject.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </Stack>
      </Paper>

      {filteredExamCodes.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No exam codes found for the selected criteria
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/')}
            startIcon={<Add />}
            sx={{ mt: 2 }}
          >
            Generate New Code
          </Button>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Roll Number</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Exam Code</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredExamCodes.map((code) => (
                <TableRow key={code.id}>
                  <TableCell>{code.rollNumber}</TableCell>
                  <TableCell>{code.subject}</TableCell>
                  <TableCell>{code.examCode}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default ExamCodeDisplay; 