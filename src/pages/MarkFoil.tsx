import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  useTheme,
  useMediaQuery,
  Fade,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { ViewList, Assignment } from '@mui/icons-material';

interface ExamCode {
  rollNumber: string;
  subject: string;
  examCode: string;
  id: number;
}

interface MarkEntry {
  examCode: string;
  marksInFigure: string;
  marksInWords: string;
}

interface MarkFoilProps {
  examCodes: ExamCode[];
}

const MarkFoil: React.FC<MarkFoilProps> = ({ examCodes }) => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [markFoilNo, setMarkFoilNo] = useState('');
  const [entries, setEntries] = useState<MarkEntry[]>([]);
  const [confidentialFormNo, setConfidentialFormNo] = useState('');
  const [semester, setSemester] = useState('');
  const [examType, setExamType] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Get unique subjects from exam codes
  const subjects = Array.from(new Set(examCodes.map(code => code.subject)));

  useEffect(() => {
    if (selectedSubject) {
      // Filter exam codes for selected subject and create mark entries
      const subjectCodes = examCodes.filter(code => code.subject === selectedSubject);
      const newEntries = subjectCodes.map(code => ({
        examCode: code.examCode,
        marksInFigure: '',
        marksInWords: ''
      }));
      setEntries(newEntries);
      // Generate a random mark foil number if not set
      if (!markFoilNo) {
        const newMarkFoilNo = Math.floor(10000 + Math.random() * 90000).toString();
        setMarkFoilNo(newMarkFoilNo);
      }
    }
  }, [selectedSubject, examCodes, markFoilNo]);

  const handleMarkChange = (index: number, field: 'marksInFigure' | 'marksInWords', value: string) => {
    const newEntries = [...entries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setEntries(newEntries);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    
    // Add college logo (you'll need to import and add the logo image)
    // doc.addImage(logo, 'PNG', 20, 15, 20, 20);

    // Add confidential header with styling
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('CONFIDENTIAL FORM NO - 12', 105, 20, { align: 'center' });

    // Add title with styling
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('MID SEM MARK FOIL FOR', 105, 35, { align: 'center' });
    doc.text('EXAMINATION-2023', 105, 45, { align: 'center' });
    doc.text('NIMAPARA AUTONOMOUS COLLEGE,NIMAPARA', 105, 55, { align: 'center' });

    // Add table for subject and exam details
    doc.rect(20, 70, 170, 15); // Main box
    doc.line(20, 85, 190, 85); // Horizontal line
    doc.line(50, 70, 50, 85); // Vertical line after "SUBJECT"
    
    doc.setFontSize(12);
    doc.text('SUBJECT', 22, 79);
    doc.text(':', 47, 79);
    doc.text(selectedSubject || 'ARTS/ECONOMICS', 55, 79);

    // Add exam/paper details
    doc.rect(20, 85, 170, 15);
    doc.line(50, 85, 50, 100);
    doc.text('EXAM/PAPER', 22, 94);
    doc.text(':', 47, 94);
    doc.text(examType || 'Sem - 1/ CORE-1', 55, 94);

    // Add mark foil number
    doc.rect(20, 100, 170, 15);
    doc.text(`Mark Foil #${markFoilNo}`, 105, 109, { align: 'center' });

    // Add "Marks Secured" header
    doc.rect(20, 115, 170, 15);
    doc.text('Marks Secured', 105, 124, { align: 'center' });

    // Create table headers
    const startY = 130;
    doc.rect(20, startY, 60, 15); // College No column
    doc.rect(80, startY, 50, 15); // In Figure column
    doc.rect(130, startY, 60, 15); // In Words column

    doc.text('College No', 30, startY + 10);
    doc.text('In Figure', 90, startY + 10);
    doc.text('In Words', 140, startY + 10);

    // Add table rows
    let currentY = startY + 15;
    entries.forEach((entry) => {
      doc.rect(20, currentY, 60, 15); // College No cell
      doc.rect(80, currentY, 50, 15); // In Figure cell
      doc.rect(130, currentY, 60, 15); // In Words cell
      
      doc.setFont('helvetica', 'normal');
      doc.text(entry.examCode, 30, currentY + 10);
      doc.text(entry.marksInFigure, 90, currentY + 10);
      doc.text(entry.marksInWords, 140, currentY + 10);
      
      currentY += 15;
    });

    // Save the PDF
    doc.save(`mark-foil-${selectedSubject.toLowerCase().replace(/\s+/g, '-')}-${markFoilNo}.pdf`);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Fade in={true} timeout={1000}>
        <Paper
          elevation={3}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box
            sx={{
              p: 3,
              bgcolor: theme.palette.primary.main,
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Assignment fontSize="large" />
            <Typography variant={isMobile ? "h5" : "h4"} fontWeight="500">
              Mark Foil Entry
            </Typography>
          </Box>

          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Enter mark details for the selected subject and download the mark foil.
                </Typography>
              </Box>

              <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
                <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
                  <TextField
                    fullWidth
                    label="Confidential Form No"
                    variant="outlined"
                    value={confidentialFormNo}
                    onChange={(e) => setConfidentialFormNo(e.target.value)}
                  />
                </Box>
                <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
                  <TextField
                    fullWidth
                    label="Semester"
                    variant="outlined"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                  />
                </Box>
                <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
                  <TextField
                    fullWidth
                    label="EXAM/PAPER"
                    variant="outlined"
                    value={examType}
                    onChange={(e) => setExamType(e.target.value)}
                    placeholder="e.g., CORE-1"
                  />
                </Box>
              </Stack>

              <Box>
                <FormControl fullWidth>
                  <InputLabel>Select Subject</InputLabel>
                  <Select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    label="Select Subject"
                  >
                    {subjects.map(subject => (
                      <MenuItem key={subject} value={subject}>{subject}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {selectedSubject && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/display')}
                    startIcon={<ViewList />}
                  >
                    View Exam Codes
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={downloadPDF}
                    sx={{
                      py: 1.5,
                      px: 4,
                      borderRadius: 2,
                      boxShadow: theme.shadows[4],
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                    }}
                  >
                    Download PDF for {selectedSubject}
                  </Button>
                </Box>
              )}
            </Box>

            {entries.length > 0 && (
              <>
                <Divider sx={{ my: 3 }} />
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Exam Code</TableCell>
                        <TableCell>Marks (Figure)</TableCell>
                        <TableCell>Marks (Words)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {entries.map((entry, index) => (
                        <TableRow key={entry.examCode}>
                          <TableCell>{entry.examCode}</TableCell>
                          <TableCell>
                            <TextField
                              fullWidth
                              value={entry.marksInFigure}
                              onChange={(e) => handleMarkChange(index, 'marksInFigure', e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              fullWidth
                              value={entry.marksInWords}
                              onChange={(e) => handleMarkChange(index, 'marksInWords', e.target.value)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
};

export default MarkFoil;