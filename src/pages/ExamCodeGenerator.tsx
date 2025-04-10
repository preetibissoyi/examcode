import type { FC } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  useTheme,
  useMediaQuery,
  Fade,
  Divider,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import { School, Numbers, ViewList, Add } from "@mui/icons-material"
import { streams } from "../data/streams"

interface ExamCode {
  rollNumber: string
  subject: string
  examCode: string
  id: number
}

interface ExamCodeGeneratorProps {
  examCodes: ExamCode[]
  setExamCodes: (codes: ExamCode[]) => void
}

const ExamCodeGenerator: FC<ExamCodeGeneratorProps> = ({ examCodes, setExamCodes }) => {
  const [selectedStream, setSelectedStream] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [rollNumber, setRollNumber] = useState("")
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const handleStreamChange = (event: any) => {
    setSelectedStream(event.target.value)
    setSelectedSubject("") // Reset subject when stream changes
  }

  const handleSubjectChange = (event: any) => {
    setSelectedSubject(event.target.value)
  }

  const generateExamCode = () => {
    if (!selectedStream || !selectedSubject || !rollNumber) {
      alert("Please select stream, subject and enter roll number")
      return
    }

    const baseCode = 18000
    const newExamCode = {
      rollNumber,
      subject: `${selectedStream}-${selectedSubject}`,
      examCode: (baseCode + examCodes.length + 1).toString(),
      id: Date.now(),
    }

    setExamCodes([...examCodes, newExamCode])
    setRollNumber("")
    setSelectedStream("")
    setSelectedSubject("")
    navigate("/display")
  }

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
            <School fontSize="large" />
            <Typography variant={isMobile ? "h5" : "h4"} fontWeight="500">
              Exam Code Generator
            </Typography>
          </Box>

          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Generate unique exam codes by selecting stream, subject and entering roll number.
                </Typography>
              </Box>

              <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
                <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
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

                <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
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

                <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
                  <TextField
                    label="Roll Number"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    fullWidth
                    placeholder="Enter roll number"
                    variant="outlined"
                    InputProps={{
                      startAdornment: <Numbers color="action" sx={{ mr: 1 }} />,
                    }}
                  />
                </Box>
              </Stack>

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  onClick={generateExamCode}
                  size="large"
                  startIcon={<Add />}
                  disabled={!selectedStream || !selectedSubject || !rollNumber}
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
                  Generate and View Codes
                </Button>
              </Box>
            </Box>

            {examCodes.length > 0 && (
              <>
                <Divider sx={{ my: 3 }} />
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Fade in={true} timeout={1000}>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        bgcolor: theme.palette.background.default,
                        width: "100%",
                        maxWidth: 400,
                        mx: "auto",
                        borderRadius: 2,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography variant="subtitle1" color="text.secondary">
                          {examCodes.length} code{examCodes.length !== 1 ? "s" : ""} generated
                        </Typography>
                        <Button
                          variant="outlined"
                          onClick={() => navigate("/display")}
                          startIcon={<ViewList />}
                          size="small"
                          sx={{ borderRadius: 1.5 }}
                        >
                          View All Codes
                        </Button>
                      </Box>
                    </Paper>
                  </Fade>
                </Box>
              </>
            )}
          </Box>
        </Paper>
      </Fade>
    </Container>
  )
}

export default ExamCodeGenerator