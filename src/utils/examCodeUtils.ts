export const generateExamCode = (rollNumber: string, subject: string): string => {
  const timestamp = new Date().getTime();
  const subjectCode = subject.substring(0, 3).toUpperCase();
  return `${subjectCode}-${rollNumber}-${timestamp}`;
}; 