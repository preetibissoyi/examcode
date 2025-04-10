export interface Subject {
  name: string;
  code: string;
}

export interface Stream {
  name: string;
  code: string;
  subjects: Subject[];
}

export const streams: Stream[] = [
  {
    name: "ARTS",
    code: "ARTS",
    subjects: [
      { name: "Odia", code: "ODIA" },
      { name: "English", code: "ENG" },
      { name: "Education", code: "EDU" },
      { name: "History", code: "HIS" },
      { name: "Political Science", code: "POL" },
      { name: "Economics", code: "ECO" }
    ]
  },
  {
    name: "COMMERCE",
    code: "COM",
    subjects: [
      { name: "Accountancy", code: "ACC" },
      { name: "Business Studies", code: "BUS" },
      { name: "Economics", code: "ECO" },
      { name: "Mathematics", code: "MAT" }
    ]
  },
  {
    name: "SCIENCE",
    code: "SCI",
    subjects: [
      { name: "Physics", code: "PHY" },
      { name: "Chemistry", code: "CHE" },
      { name: "Mathematics", code: "MAT" },
      { name: "Biology", code: "BIO" }
    ]
  },
  {
    name: "BBA",
    code: "BBA",
    subjects: [
      { name: "Business Management", code: "BMG" },
      { name: "Marketing", code: "MKT" },
      { name: "Finance", code: "FIN" },
      { name: "Human Resource", code: "HRM" }
    ]
  },
  {
    name: "BCA",
    code: "BCA",
    subjects: [
      { name: "Programming", code: "PRG" },
      { name: "Database Management", code: "DBM" },
      { name: "Web Development", code: "WEB" },
      { name: "Computer Networks", code: "CNT" }
    ]
  }
]; 