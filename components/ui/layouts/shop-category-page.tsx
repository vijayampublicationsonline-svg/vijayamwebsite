"use client";

import { useEffect, useMemo, useState, type CSSProperties, type FormEvent } from "react";
import type { JSX } from "react";

type BookCategory = "Nursing" | "Degree" | "Vocational" | "Bridge Courses";
type ShopCategory = BookCategory;
type ProgrammeGroup = "Nursing" | "Degree" | "Vocational" | "Bridge Courses";
type SortOption = "featured" | "newest" | "price-low" | "price-high" | "title";
type BookType = "Text Book" | "Study Material";
type LearningNeed = "All" | BookType | "Question Bank";
type Semester = `Semester ${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}`;

type Book = {
  id: number;
  title: string;
  author: string;
  category: BookCategory;
  course: string;
  bookType: BookType;
  semester: Semester;
  subject: string;
  price: number;
  mrp: number;
  color: string;
  accent: string;
  coverImage?: string;
  edition: string;
  isbn: string;
  pages: number;
  year: number;
  format: "Paperback";
  language: "English" | "Telugu";
  rating: number;
  reviews: number;
  description: string;
};

type Pathway = {
  group: ProgrammeGroup;
  course: string;
  note: string;
};

type DegreeDistributionSection = {
  title: string;
  label: string;
  items: string[];
};

type DegreeCode = "BA" | "B.Com" | "B.Sc" | "BBA" | "BCA";
type DegreeYear = 1 | 2 | 3;
type DegreeSemester = 1 | 2 | 3 | 4 | 5 | 6;
type DegreeAcademicCategory = "Core / Major" | "Minor Courses" | "Multidisciplinary Courses" | "Life Skill Courses";
type DegreeFlowStep = "course" | "year" | "semester" | "subjects" | "books";

type DegreeSubject = {
  name: string;
  descriptor: string;
};

const books: Book[] = [
  { id: 1, title: "Applied Anatomy", author: "P.Seeta Devi", category: "Nursing", course: "B.Sc Nursing", bookType: "Text Book", semester: "Semester 1", subject: "Applied Anatomy ", price: 799, mrp: 1099, color: "#174f67", accent: "#e7c36e", coverImage: "/images/appliedanatomy.jpg", edition: "2026 Edition", isbn: "978-81-995632-2-3", pages: 380, year: 2026, format: "Paperback", language: "English", rating: 4.8, reviews: 126, description: "A premium first-semester nursing textbook for Applied Anatomy and Physiology, designed with clear diagrams, clinical correlation, terminology support, exam-oriented summaries, and chapter-wise revision points." },
  { id: 2, title: "Nursing Foundation", author: "Dr. S. Anuradha, Dr. Supriya Chichpure", category: "Nursing", course: "B.Sc Nursing", bookType: "Text Book", semester: "Semester 1", subject: "Nursing Foundation", price: 1099, mrp: 1299, color: "#075b59", accent: "#d7c075", edition: "2026 Edition", isbn: "978-93-90427-28-4", pages: 612, year: 2026, format: "Paperback", language: "English", rating: 4.7, reviews: 112, description: "A practical textbook for core nursing skills, patient care procedures, safety practices, documentation, and clinical readiness." },
  { id: 3, title: "Applied Physiology", author: "Dr.P.Seeta Devi", category: "Nursing", course: "B.Sc Nursing", bookType: "Text Book", semester: "Semester 1", subject: "Applied Physiology", price: 799, mrp: 900, color: "#3b654d", accent: "#d9e58e", edition: "2026 Edition", isbn: "978-81-995632-5-4", pages: 390, year: 2026, format: "Paperback", language: "English", rating: 4.6, reviews: 84, description: "Focused coverage of applied biochemistry and nutrition with nursing relevance, tables, clinical notes, and easy revision points." },
  { id: 4, title: "First Aid Module", author: "Dr. P. Seeta Devi", category: "Nursing", course: "B.Sc Nursing", bookType: "Text Book", semester: "Semester 4", subject: "Medical Surgical Nursing", price: 799, mrp: 949, color: "#612f4e", accent: "#f1b8bb", edition: "2025 Edition", isbn: "978-93-90627-74-6", pages: 968, year: 2025, format: "Paperback", language: "English", rating: 4.7, reviews: 94, description: "Comprehensive adult health nursing content with assessment formats, evidence-based interventions, case studies, and clinical summaries." },
  { id: 5, title: "Applied Sociology", author: "Dr. K. Anitha", category: "Nursing", course: "B.Sc Nursing", bookType: "Text Book", semester: "Semester 5", subject: "Child Health Nursing", price: 725, mrp: 875, color: "#8a4c25", accent: "#f3ca85", edition: "2025 Edition", isbn: "978-93-90627-85-2", pages: 704, year: 2025, format: "Paperback", language: "English", rating: 4.7, reviews: 86, description: "Pediatric nursing concepts explained with growth charts, common conditions, nursing care plans, and family-centred care guidance." },
  { id: 6, title: "Communicative English", author: "Dr. A. Kumar", category: "Nursing", course: "B.Sc Nursing", bookType: "Text Book", semester: "Semester 6", subject: "Mental Health Nursing", price: 749, mrp: 899, color: "#383467", accent: "#d4c5f4", edition: "2025 Edition", isbn: "978-93-90627-16-6", pages: 736, year: 2025, format: "Paperback", language: "English", rating: 4.5, reviews: 54, description: "Patient-centred mental health nursing with therapeutic communication, care planning, current treatments, and practice-based scenarios." },
  { id: 7, title: "Applied psychology", author: "Dr. P. Sandeep", category: "Nursing", course: "B.Sc Nursing", bookType: "Text Book", semester: "Semester 7", subject: "Community Health Nursing", price: 675, mrp: 825, color: "#285b48", accent: "#d7dc8a", edition: "2025 Edition", isbn: "978-93-90627-27-2", pages: 640, year: 2025, format: "Paperback", language: "English", rating: 4.6, reviews: 78, description: "Public health nursing made approachable with family care, national health programmes, epidemiology, and community-based practice." },
  { id: 8, title: " Applied psychology & Sociology", author: "Prof. R. Nisha", category: "Nursing", course: "B.Sc Nursing", bookType: "Text Book", semester: "Semester 8", subject: "Research & Statistics", price: 699, mrp: 849, color: "#303d70", accent: "#a9c8ef", edition: "2025 Edition", isbn: "978-93-90627-38-8", pages: 592, year: 2025, format: "Paperback", language: "English", rating: 4.6, reviews: 73, description: "A structured guide to nursing research, statistics, evidence-based practice, project writing, and university exam preparation." },
  { id: 9, title: "Cummulative record", author: "Vijayam Academic Team", category: "Nursing", course: "B.Sc Nursing", bookType: "Study Material", semester: "Semester 1", subject: "Question Bank", price: 349, mrp: 449, color: "#0f766e", accent: "#b7eadf", edition: "2025 Edition", isbn: "978-93-90627-49-4", pages: 320, year: 2025, format: "Paperback", language: "English", rating: 4.8, reviews: 91, description: "Exam-focused study material with important questions, short notes, diagrams, and model answers for Semester 1." },
  { id: 10, title: "Nurses Dictionary ", author: "Vijayam Academic Team", category: "Nursing", course: "B.Sc Nursing", bookType: "Study Material", semester: "Semester 2", subject: "Question Bank", price: 349, mrp: 449, color: "#155e75", accent: "#bae6fd", edition: "2025 Edition", isbn: "978-93-90627-50-0", pages: 328, year: 2025, format: "Paperback", language: "English", rating: 4.7, reviews: 88, description: "Semester 2 preparation guide with chapter-wise questions, quick revision notes, and answer-writing support." },
  { id: 11, title: "Applied Biochemistry", author: "Vijayam Academic Team", category: "Nursing", course: "B.Sc Nursing", bookType: "Study Material", semester: "Semester 3", subject: "Study Guide", price: 379, mrp: 499, color: "#166534", accent: "#bbf7d0", edition: "2025 Edition", isbn: "978-93-90627-51-7", pages: 352, year: 2025, format: "Paperback", language: "English", rating: 4.7, reviews: 82, description: "Concise study material for Semester 3 with key concepts, flowcharts, likely questions, and quick revision sections." },
  { id: 12, title: "Applied nutrition & Dietics", author: "Vijayam Academic Team", category: "Nursing", course: "B.Sc Nursing", bookType: "Study Material", semester: "Semester 4", subject: "Study Guide", price: 399, mrp: 525, color: "#7c2d12", accent: "#fed7aa", edition: "2025 Edition", isbn: "978-93-90627-52-8", pages: 376, year: 2025, format: "Paperback", language: "English", rating: 4.8, reviews: 96, description: "Focused Semester 4 study guide with medical-surgical nursing summaries, important questions, and model answers." },
  { id: 13, title: "Nursing Foundation - II", author: "Vijayam Academic Team", category: "Nursing", course: "B.Sc Nursing", bookType: "Study Material", semester: "Semester 5", subject: "Study Guide", price: 399, mrp: 525, color: "#854d0e", accent: "#fde68a", edition: "2025 Edition", isbn: "978-93-90627-53-5", pages: 368, year: 2025, format: "Paperback", language: "English", rating: 4.7, reviews: 77, description: "Quick revision support for Semester 5 with child health nursing notes, solved questions, and exam-ready summaries." },
  { id: 14, title: "Health / Nursing Informatics & technology", author: "Vijayam Academic Team", category: "Nursing", course: "B.Sc Nursing", bookType: "Study Material", semester: "Semester 6", subject: "Study Guide", price: 419, mrp: 549, color: "#5b21b6", accent: "#ddd6fe", edition: "2025 Edition", isbn: "978-93-90627-54-2", pages: 384, year: 2025, format: "Paperback", language: "English", rating: 4.6, reviews: 69, description: "Semester 6 study material covering mental health nursing topics, short notes, case-based questions, and revision checklists." },
  { id: 15, title: "Applied Microbiology including infection control & safety", author: "Vijayam Academic Team", category: "Nursing", course: "B.Sc Nursing", bookType: "Study Material", semester: "Semester 7", subject: "Study Guide", price: 429, mrp: 575, color: "#365314", accent: "#d9f99d", edition: "2025 Edition", isbn: "978-93-90627-55-9", pages: 396, year: 2025, format: "Paperback", language: "English", rating: 4.6, reviews: 63, description: "Exam-oriented Semester 7 guide with community health nursing notes, programme summaries, and previous-pattern questions." },
  { id: 16, title: "Pharmacology - I ", author: "Vijayam Academic Team", category: "Nursing", course: "B.Sc Nursing", bookType: "Study Material", semester: "Semester 8", subject: "Study Guide", price: 449, mrp: 599, color: "#1e3a8a", accent: "#bfdbfe", edition: "2025 Edition", isbn: "978-93-90627-56-6", pages: 408, year: 2025, format: "Paperback", language: "English", rating: 4.8, reviews: 104, description: "Final-semester study guide with nursing research, management topics, model papers, and fast revision notes." },
  { id: 17, title: "Adult Health ", author: "Dr. P. Sandeep", category: "Degree", course: "BBA", bookType: "Text Book", semester: "Semester 1", subject: "Commerce", price: 725, mrp: 875, color: "#75442d", accent: "#e8bd88", edition: "5th Edition", isbn: "978-93-90627-57-3", pages: 640, year: 2025, format: "Paperback", language: "English", rating: 4.6, reviews: 68, description: "Modern management principles explained through Indian business examples, decision frameworks, short cases, and chapter-end assessments." },
  { id: 18, title: "Elective Modules", author: "Prof. R. Nisha", category: "Degree", course: "B.Com", bookType: "Text Book", semester: "Semester 2", subject: "Commerce", price: 675, mrp: 825, color: "#4b653a", accent: "#d7dc8a", edition: "4th Edition", isbn: "978-93-90627-58-0", pages: 592, year: 2024, format: "Paperback", language: "English", rating: 4.5, reviews: 73, description: "Core microeconomic and macroeconomic ideas presented with useful graphs, current examples, worked problems, and examination questions." },
  { id: 19, title: "Pharmacology - II", author: "Dr. M. Arjun", category: "Degree", course: "BCA", bookType: "Text Book", semester: "Semester 3", subject: "Technology", price: 899, mrp: 1099, color: "#303d70", accent: "#a9c8ef", edition: "6th Edition", isbn: "978-93-90627-59-7", pages: 880, year: 2025, format: "Paperback", language: "English", rating: 4.9, reviews: 158, description: "A practical survey of programming, data structures, databases, networks, operating systems, and contemporary computing concepts." },
  { id: 20, title: "professionalism", author: "Prof. S. Devi", category: "Degree", course: "BA", bookType: "Text Book", semester: "Semester 4", subject: "Humanities", price: 575, mrp: 699, color: "#71334a", accent: "#f0b8c6", edition: "3rd Edition", isbn: "978-93-90627-60-3", pages: 528, year: 2024, format: "Paperback", language: "English", rating: 4.6, reviews: 47, description: "A thoughtful overview of modern Indian writing, major literary movements, influential authors, close readings, and critical perspectives." },
  { id: 27, title: "Adult Health Nursing II with integrated pathophysiology including Geriatric Nursing", author: "Dr. M. Arjun", category: "Degree", course: "B.Sc", bookType: "Text Book", semester: "Semester 1", subject: "Physics", price: 695, mrp: 850, color: "#164e63", accent: "#a5f3fc", edition: "2025 Edition", isbn: "978-93-90627-68-9", pages: 616, year: 2025, format: "Paperback", language: "English", rating: 4.7, reviews: 61, description: "A polished first-year science text with solved numericals, neat diagrams, lab-linked concepts, chapter summaries, and university-style questions." },
  { id: 21, title: "Pathology - I,II & genetics", author: "Dr. S. Lakshmi", category: "Vocational", course: "English Medium", bookType: "Text Book", semester: "Semester 1", subject: "Nursing Assistant", price: 499, mrp: 625, color: "#0f5f57", accent: "#bdebdc", edition: "2025 Edition", isbn: "978-93-90627-61-0", pages: 456, year: 2025, format: "Paperback", language: "English", rating: 4.7, reviews: 58, description: "A practical textbook for vocational healthcare learners covering patient care, hygiene, vital signs, ward safety, and basic clinical support skills." },
  { id: 22, title: "Child Health Nursing I", author: "Prof. V. Ramesh", category: "Vocational", course: "English Medium", bookType: "Text Book", semester: "Semester 2", subject: "Lab Technician", price: 549, mrp: 699, color: "#1d4f7a", accent: "#bfdbfe", edition: "2025 Edition", isbn: "978-93-90627-62-7", pages: 512, year: 2025, format: "Paperback", language: "English", rating: 4.6, reviews: 46, description: "Clear fundamentals of laboratory safety, specimen collection, microscopy, hematology, biochemistry basics, and record maintenance." },
  { id: 23, title: "Mental Health Nursing I", author: "Dr. K. Anitha", category: "Vocational", course: "Telugu Medium", bookType: "Study Material", semester: "Semester 1", subject: "First Aid", price: 299, mrp: 399, color: "#9f1239", accent: "#fecdd3", edition: "2025 Edition", isbn: "978-93-90627-64-1", pages: 248, year: 2025, format: "Paperback", language: "Telugu", rating: 4.8, reviews: 72, description: "తెలుగు మాధ్యమ విద్యార్థుల కోసం అత్యవసర స్పందన, CPR basics, wound care, burns, fractures and quick revision charts." },
  { id: 24, title: "Community Health Nursing I", author: "Academic Editorial Team", category: "Vocational", course: "Telugu Medium", bookType: "Study Material", semester: "Semester 2", subject: "Question Bank", price: 329, mrp: 449, color: "#7c2d12", accent: "#fed7aa", edition: "2025 Edition", isbn: "978-93-90627-65-8", pages: 304, year: 2025, format: "Paperback", language: "Telugu", rating: 4.7, reviews: 64, description: "Telugu medium vocational healthcare question bank with important questions, short answers, model papers, and chapter-wise practice." },
  { id: 25, title: "Educational Technology / Nursing Education", author: "Dr. K. Anitha", category: "Vocational", course: "English Medium", bookType: "Text Book", semester: "Semester 3", subject: "Community Health", price: 459, mrp: 599, color: "#285b48", accent: "#d9f99d", edition: "2025 Edition", isbn: "978-93-90627-66-5", pages: 392, year: 2025, format: "Paperback", language: "English", rating: 4.6, reviews: 39, description: "Field-ready lessons on home visits, health education, maternal care support, records, sanitation, and community-level screening." },
  { id: 26, title: "Introduction to forsenic Nursing & Indian Laws", author: "Academic Editorial Team", category: "Vocational", course: "Telugu Medium", bookType: "Text Book", semester: "Semester 3", subject: "Primary Health Assistant", price: 449, mrp: 575, color: "#6d3a11", accent: "#f7d08a", edition: "2025 Edition", isbn: "978-93-90627-67-2", pages: 384, year: 2025, format: "Paperback", language: "Telugu", rating: 4.7, reviews: 51, description: "తెలుగు మాధ్యమ విద్యార్థులకు patient care, basic health records, safety, sanitation and primary health support topics." },
  { id: 28, title: "Elective Modules", author: "Vijayam Bridge Faculty", category: "Bridge Courses", course: "Nursing Bridge", bookType: "Study Material", semester: "Semester 1", subject: "Nursing Basics", price: 399, mrp: 525, color: "#075985", accent: "#bae6fd", edition: "2025 Edition", isbn: "978-93-90627-69-6", pages: 288, year: 2025, format: "Paperback", language: "English", rating: 4.8, reviews: 76, description: "A fast foundation book for nursing entrants covering anatomy terms, care basics, hospital orientation, and starter clinical confidence." },
  { id: 29, title: "Child Health Nursing II with procedures", author: "Academic Editorial Team", category: "Bridge Courses", course: "Science Bridge", bookType: "Study Material", semester: "Semester 1", subject: "Science Foundation", price: 349, mrp: 475, color: "#3730a3", accent: "#c7d2fe", edition: "2025 Edition", isbn: "978-93-90627-70-2", pages: 264, year: 2025, format: "Paperback", language: "English", rating: 4.7, reviews: 63, description: "Physics, chemistry, biology and mathematics refreshers with simple notes, solved examples, practice tasks, and quick revision charts." },
  { id: 30, title: "Mental Health Nursing II", author: "Dr. K. Anitha", category: "Bridge Courses", course: "Healthcare Bridge", bookType: "Study Material", semester: "Semester 1", subject: "Healthcare Skills", price: 299, mrp: 399, color: "#0f766e", accent: "#99f6e4", edition: "2025 Edition", isbn: "978-93-90627-71-9", pages: 232, year: 2025, format: "Paperback", language: "English", rating: 4.8, reviews: 82, description: "Practical bridge lessons for patient care, first aid, hygiene, ward behaviour, safety habits, and vocational healthcare readiness." },
  { id: 31, title: "Nursing Management and Leadership", author: "Prof. R. Nisha", category: "Bridge Courses", course: "Degree Bridge", bookType: "Text Book", semester: "Semester 1", subject: "Academic Foundation", price: 379, mrp: 499, color: "#7e22ce", accent: "#e9d5ff", edition: "2025 Edition", isbn: "978-93-90627-72-6", pages: 304, year: 2025, format: "Paperback", language: "English", rating: 4.6, reviews: 58, description: "A polished starter text for degree learners with study skills, basic concepts, academic writing, reasoning, and exam preparation habits." },
  { id: 32, title: "Midwifery / Obstetrics and Gynecology Nursing I", author: "Prof. S. Devi", category: "Bridge Courses", course: "Communication Bridge", bookType: "Study Material", semester: "Semester 1", subject: "English Communication", price: 329, mrp: 449, color: "#be123c", accent: "#fecdd3", edition: "2025 Edition", isbn: "978-93-90627-73-3", pages: 248, year: 2025, format: "Paperback", language: "English", rating: 4.7, reviews: 71, description: "Youth-friendly communication practice with vocabulary, grammar refreshers, classroom speaking tasks, interviews, and confidence-building exercises." },
  { id: 33, title: "Midwifery Case Book", author: "Prof. S. Devi", category: "Bridge Courses", course: "Communication Bridge", bookType: "Study Material", semester: "Semester 1", subject: "English Communication", price: 329, mrp: 449, color: "#be123c", accent: "#fecdd3", edition: "2025 Edition", isbn: "978-93-90627-74-0", pages: 248, year: 2025, format: "Paperback", language: "English", rating: 4.7, reviews: 71, description: "Youth-friendly communication practice with vocabulary, grammar refreshers, classroom speaking tasks, interviews, and confidence-building exercises." },

];

const pathways: Pathway[] = [
  { group: "Nursing", course: "B.Sc Nursing", note: "Textbooks and study materials semester-wise" },
  { group: "Nursing", course: "ANM", note: "Books coming to this pathway" },
  { group: "Nursing", course: "GNM", note: "Books coming to this pathway" },
  { group: "Nursing", course: "Post B.Sc Nursing", note: "Books coming to this pathway" },
  { group: "Nursing", course: "M.Sc Nursing", note: "Books coming to this pathway" },
  { group: "Nursing", course: "MPHW(F)", note: "Books coming to this pathway" },
  { group: "Nursing", course: "GFC", note: "Books coming to this pathway" },
  { group: "Nursing", course: "Competitive Books", note: "Books coming to this pathway" },
  { group: "Nursing", course: "Common Books / Dictionary", note: "Books coming to this pathway" },
  { group: "Degree", course: "BA", note: "Degree humanities books" },
  { group: "Degree", course: "B.Com", note: "Degree commerce books" },
  { group: "Degree", course: "B.Sc", note: "Science degree books" },
  { group: "Degree", course: "BBA", note: "Degree management books" },
  { group: "Degree", course: "BCA", note: "Degree computer application books" },
  { group: "Vocational", course: "Telugu Medium", note: "Vocational books in Telugu" },
  { group: "Vocational", course: "English Medium", note: "Vocational books in English" },
  { group: "Bridge Courses", course: "Nursing Bridge", note: "Nursing foundation bridge books" },
  { group: "Bridge Courses", course: "Science Bridge", note: "Science refresher bridge books" },
  { group: "Bridge Courses", course: "Healthcare Bridge", note: "Healthcare skills bridge books" },
  { group: "Bridge Courses", course: "Degree Bridge", note: "Degree foundation bridge books" },
  { group: "Bridge Courses", course: "Communication Bridge", note: "English communication bridge books" },
];

const programmeGroups: ProgrammeGroup[] = ["Nursing", "Vocational", "Bridge Courses", "Degree"];
const nursingCatalogueGuide = [
  { course: "B.Sc Nursing", label: "B.Sc Nursing", detail: "Semester-wise textbooks, practical records and study materials", colour: "#075b59" },
  { course: "GNM", label: "GNM", detail: "General nursing and midwifery catalogue", colour: "#174f67" },
  { course: "ANM", label: "ANM", detail: "Auxiliary nursing and midwifery learning shelf", colour: "#8a4c25" },
  { course: "Post B.Sc Nursing", label: "Post B.Sc", detail: "Advanced nursing reference collection", colour: "#5b21b6" },
] as const;
const semesterOrder: Semester[] = ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Semester 7", "Semester 8"];
const bookTypes: Exclude<LearningNeed, "All">[] = ["Text Book", "Study Material", "Question Bank"];
const appliedAnatomyPages = [
  "/images/converted.jpg",
  "/images/converted (1).jpg",
  "/images/converted (2).jpg",
  "/images/converted (3).jpg",
  "/images/converted (4).jpg",
];

const degreeDistribution: DegreeDistributionSection[] = [
  {
    title: "Life Skill Courses",
    label: "Foundation",
    items: ["Business Forecasting", "Project Management", "Information and Communication Technology", "Data Analysis"],
  },
  {
    title: "Multidisciplinary Courses",
    label: "Core Skills",
    items: ["Introduction to Public Administration", "Principles of Management", "Principles of Accounting", "Basic Electronics", "Health and Hygiene", "Basic Mathematics"],
  },
  {
    title: "B.A. Major",
    label: "History · Economics · Political Science",
    items: ["Early Medieval History of India", "Medieval Indian Society", "History of Modern India", "History of Modern World", "Macroeconomics", "Economic Thought and Political Economy", "Development Economics", "Public Economics", "Political Institutions", "Indian Constitution", "Western Political Thought", "Indian Federal System"],
  },
  {
    title: "B.Com Major",
    label: "Commerce",
    items: ["Advanced Accounting", "Income Tax", "Business Laws", "Banking Theory and Practice", "E-Commerce and Web Designing", "Digital Marketing"],
  },
  {
    title: "B.B.A. Major",
    label: "Management",
    items: ["Business Law", "Organisational Behaviour", "Business Environment", "Business Statistics and Mathematics"],
  },
  {
    title: "B.C.A. Major",
    label: "Computer Applications",
    items: ["Database Management System", "Data Structures", "Object Oriented Programming Through Java", "Software Engineering"],
  },
  {
    title: "B.Sc Major",
    label: "Mathematics · Science · Computer Science",
    items: ["Group Theory and Problem Solving Sessions", "Numerical Methods and Problem Solving Sessions", "Laplace Transforms and Problem Solving Sessions", "Special Functions and Problem Solving Sessions", "Optics", "Heat and Thermodynamics", "Electronic Devices and Circuits", "Analog and Digital Electronics", "Fundamentals in Organic Chemistry", "Organic Chemistry", "Physical Chemistry-I", "Inorganic and Physical Chemistry", "Vascular Plants", "Plant Pathology and Plant Diseases", "Plant Breeding", "Plant Biotechnology", "Animal Diversity-II Biology of Chordates", "Principles of Genetics", "Animal Biotechnology", "Evolution and Zoogeography", "Eukaryotic Microorganisms", "Biomolecules and Enzymology", "Microbial and Analytical Techniques", "rDNA Biology and Genetics", "Object Oriented Programming using Java", "Data Structures using C", "Computer Organization", "Operating Systems"],
  },
  {
    title: "Minor Courses",
    label: "Specialisations",
    items: ["Change Management", "Assessment of Individual, HUF and Firms", "Money, Banking and Financial Markets", "Organisation Behaviour", "Social Media Marketing", "Principles and Practice of General Insurance", "Consumer Behaviour", "Financial Markets"],
  },
];

const degreeProfiles: Record<DegreeCode, { fullName: string; descriptor: string; accent: string }> = {
  BA: { fullName: "Bachelor of Arts", descriptor: "Humanities, economics and public life", accent: "#71334a" },
  "B.Com": { fullName: "Bachelor of Commerce", descriptor: "Accounting, taxation and business practice", accent: "#075b59" },
  "B.Sc": { fullName: "Bachelor of Science", descriptor: "Mathematics, sciences and computing", accent: "#164e63" },
  BBA: { fullName: "Bachelor of Business Administration", descriptor: "Management, leadership and enterprise", accent: "#8a4c25" },
  BCA: { fullName: "Bachelor of Computer Applications", descriptor: "Programming, systems and software", accent: "#075985" },
};

const degreeCodes: DegreeCode[] = ["BA", "B.Com", "B.Sc", "BBA", "BCA"];
const degreeYears: DegreeYear[] = [1, 2, 3];
const degreeSemesters: DegreeSemester[] = [1, 2, 3, 4, 5, 6];
const degreeCategories: DegreeAcademicCategory[] = ["Core / Major", "Minor Courses", "Multidisciplinary Courses", "Life Skill Courses"];

const majorSubjectsByDegree: Record<DegreeCode, DegreeSubject[]> = {
  BA: [
    { name: "Early Medieval History of India", descriptor: "History foundation" },
    { name: "Medieval Indian Society", descriptor: "Social history" },
    { name: "History of Modern India", descriptor: "Modern India" },
    { name: "Macroeconomics", descriptor: "Economic systems" },
    { name: "Indian Constitution", descriptor: "Political institutions" },
    { name: "Western Political Thought", descriptor: "Political theory" },
  ],
  "B.Com": [
    { name: "Advanced Accounting", descriptor: "Commerce core" },
    { name: "Income Tax", descriptor: "Tax practice" },
    { name: "Business Laws", descriptor: "Legal foundations" },
    { name: "Banking Theory and Practice", descriptor: "Banking systems" },
    { name: "E-Commerce and Web Designing", descriptor: "Digital commerce" },
    { name: "Digital Marketing", descriptor: "Market strategy" },
  ],
  "B.Sc": [
    { name: "General Physics", descriptor: "Science foundation" },
    { name: "Optics", descriptor: "Physics core" },
    { name: "Heat and Thermodynamics", descriptor: "Physics core" },
    { name: "Organic Chemistry", descriptor: "Chemistry core" },
    { name: "Principles of Genetics", descriptor: "Life sciences" },
    { name: "Data Structures using C", descriptor: "Computer science" },
  ],
  BBA: [
    { name: "Business Management", descriptor: "Management core" },
    { name: "Business Law", descriptor: "Legal literacy" },
    { name: "Organisational Behaviour", descriptor: "People and teams" },
    { name: "Business Environment", descriptor: "Enterprise context" },
    { name: "Business Statistics and Mathematics", descriptor: "Quantitative skills" },
  ],
  BCA: [
    { name: "Computer Science Essentials", descriptor: "Computing foundation" },
    { name: "Database Management System", descriptor: "Data systems" },
    { name: "Data Structures", descriptor: "Programming logic" },
    { name: "Object Oriented Programming Through Java", descriptor: "Java programming" },
    { name: "Software Engineering", descriptor: "Software process" },
  ],
};

const minorSubjects: DegreeSubject[] = ["Change Management", "Assessment of Individual, HUF and Firms", "Money, Banking and Financial Markets", "Organisation Behaviour", "Social Media Marketing", "Principles and Practice of General Insurance", "Consumer Behaviour", "Financial Markets"].map((name) => ({ name, descriptor: "Specialisation subject" }));
const multidisciplinarySubjects: DegreeSubject[] = ["Introduction to Public Administration", "Principles of Management", "Principles of Accounting", "Basic Electronics", "Health and Hygiene", "Basic Mathematics"].map((name) => ({ name, descriptor: "Cross-disciplinary foundation" }));
const lifeSkillSubjects: DegreeSubject[] = ["Business Forecasting", "Project Management", "Information and Communication Technology", "Data Analysis"].map((name) => ({ name, descriptor: "Career-ready skill" }));
const allDegreeCatalogueSubjects = degreeDistribution.flatMap((section) => section.items.map((subject) => ({ section: section.title, label: section.label, subject })));

function yearLabel(year: DegreeYear) {
  return year === 1 ? "1st Year" : year === 2 ? "2nd Year" : "3rd Year";
}

function degreeSemesterLabel(semester: DegreeSemester) {
  const roman = ["I", "II", "III", "IV", "V", "VI"][semester - 1];
  return `Semester ${roman}`;
}

function degreeBookCount(course: DegreeCode, subject?: string) {
  return books.filter((book) => book.category === "Degree" && book.course === course && (!subject || `${book.title} ${book.subject}`.toLowerCase().includes(subject.toLowerCase()))).length;
}

function degreeBooksForSubject(course: DegreeCode, subject: string) {
  const normalized = subject.toLowerCase();
  const courseBooks = books.filter((book) => book.category === "Degree" && book.course === course);
  const directMatches = courseBooks.filter((book) => `${book.title} ${book.subject} ${book.description}`.toLowerCase().includes(normalized));
  return directMatches.length ? directMatches : courseBooks;
}

function degreeCourseForSection(sectionTitle: string): DegreeCode | null {
  if (sectionTitle.includes("B.A.")) return "BA";
  if (sectionTitle.includes("B.Com")) return "B.Com";
  if (sectionTitle.includes("B.Sc")) return "B.Sc";
  if (sectionTitle.includes("B.B.A")) return "BBA";
  if (sectionTitle.includes("B.C.A")) return "BCA";
  return null;
}

function degreeBooksForSection(sectionTitle: string) {
  const course = degreeCourseForSection(sectionTitle);
  return course ? books.filter((book) => book.category === "Degree" && book.course === course) : [];
}

function subjectsForDegreeCategory(degree: DegreeCode, category: DegreeAcademicCategory) {
  if (category === "Core / Major") return majorSubjectsByDegree[degree];
  if (category === "Minor Courses") return minorSubjects;
  if (category === "Multidisciplinary Courses") return multidisciplinarySubjects;
  return lifeSkillSubjects;
}

function discountPercent(book: Book) {
  return Math.round((1 - book.price / book.mrp) * 100);
}

function semesterShort(semester: Semester) {
  return semester.replace("Semester ", "Sem ");
}

function bookMatchesNeed(book: Book, need: LearningNeed) {
  if (need === "All") return true;
  if (need === "Question Bank") return book.subject === "Question Bank";
  return book.bookType === need;
}

function courseCount(course: string) {
  return books.filter((book) => book.course === course).length;
}

function groupCount(group: ProgrammeGroup) {
  return books.filter((book) => book.category === group).length;
}

function defaultCourseFor(group: ProgrammeGroup) {
  if (group === "Nursing") return "B.Sc Nursing";
  if (group === "Vocational") return "Telugu Medium";
  if (group === "Bridge Courses") return "Nursing Bridge";
  return "All";
}

const sectionCopy: Record<ProgrammeGroup, { eyebrow: string; lead: string }> = {
  Nursing: {
    eyebrow: "Clinical Learning Collection",
    lead: "Semester-wise nursing texts and revision companions designed for classroom, lab and ward practice.",
  },
  Degree: {
    eyebrow: "University Degree Shelf",
    lead: "Cleanly arranged BA, B.Com, B.Sc, BBA and BCA books with subject details, editions and exam-friendly notes.",
  },
  Vocational: {
    eyebrow: "Skill Training Editions",
    lead: "Telugu Medium and English Medium vocational books with practical lessons, clear diagrams and job-ready revision support.",
  },
  "Bridge Courses": {
    eyebrow: "Transition Learning Shelf",
    lead: "Compact bridge-course books built for quick confidence, foundation revision and smooth entry into the next programme.",
  },
};

function ProgrammeIcon({ group, compact = false }: { group: ProgrammeGroup; compact?: boolean }) {
  const paths: Record<ProgrammeGroup, JSX.Element> = {
    Nursing: <path d="M12 21s-7-4.2-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.8-7 10-7 10Zm-6.5-8h3l1.3-3.2 2.4 6.4 1.5-3.2h4.8" />,
    Degree: <path d="m3 8.5 9-4 9 4-9 4-9-4Zm4 3.1v4.1c1.6 1.6 3.2 2.3 5 2.3s3.4-.7 5-2.3v-4.1M19 10v5" />,
    Vocational: <path d="M8 7V5.8C8 4.8 8.8 4 9.8 4h4.4c1 0 1.8.8 1.8 1.8V7m-11 4h14M5 7h14v11H5V7Zm7 3v5m-2.5-2.5h5" />,
    "Bridge Courses": <path d="M5 18c2.5-6.6 11.5-6.6 14 0M6.5 13.5 12 8l5.5 5.5M12 8V4m-3 3h6" />,
  };

  const palette: Record<ProgrammeGroup, CSSProperties> = {
    Nursing: { "--icon-start": "#0f766e", "--icon-mid": "#075b59", "--icon-end": "#032f2e", "--icon-ink": "#ecfeff", "--icon-shine": "#99f6e4", "--icon-gold": "#e7c36e" } as CSSProperties,
    Degree: { "--icon-start": "#7c3aed", "--icon-mid": "#4b3f8f", "--icon-end": "#24164f", "--icon-ink": "#f5f3ff", "--icon-shine": "#ddd6fe", "--icon-gold": "#d8bd73" } as CSSProperties,
    Vocational: { "--icon-start": "#d97706", "--icon-mid": "#8a4c25", "--icon-end": "#4b2610", "--icon-ink": "#fff7ed", "--icon-shine": "#fed7aa", "--icon-gold": "#f3ca85" } as CSSProperties,
    "Bridge Courses": { "--icon-start": "#0ea5e9", "--icon-mid": "#075985", "--icon-end": "#082f49", "--icon-ink": "#f0f9ff", "--icon-shine": "#bae6fd", "--icon-gold": "#d8bd73" } as CSSProperties,
  };

  return (
    <span className={`premium-icon ${compact ? "compact" : ""}`} style={palette[group]} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {paths[group]}
      </svg>
    </span>
  );
}

function BookCover({ book, small = false }: { book: Book; small?: boolean }) {
  return (
    <div className={`book-cover ${book.coverImage ? "image-cover" : ""} ${small ? "small" : ""}`} style={{ "--cover": book.color, "--accent": book.accent } as CSSProperties} aria-label={`${book.title} cover`}>
      {book.coverImage ? <img src={book.coverImage} alt={`${book.title} book cover`} /> : <>
        <small>Academic Series</small>
        <strong>{book.title}</strong>
        <span>{book.edition}</span>
      </>}
    </div>
  );
}

type TrackingRecord = {
  id: string;
  createdAt: string;
  amount: number;
  items: string[];
};

function ShopCategoryPage({ category }: { category?: ShopCategory }) {
  const initialGroup: ProgrammeGroup = category ?? "Nursing";
  const [selectedGroup, setSelectedGroup] = useState<ProgrammeGroup>(initialGroup);
  const [selectedCourse, setSelectedCourse] = useState(defaultCourseFor(initialGroup));
  const [semester, setSemester] = useState<Semester | "All">("All");
  const [need, setNeed] = useState<LearningNeed>("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("featured");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cod">("upi");
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [trackingQuery, setTrackingQuery] = useState("");
  const [trackingRecord, setTrackingRecord] = useState<TrackingRecord | null>(null);
  const [trackingNotice, setTrackingNotice] = useState("");
  const [trackingLink, setTrackingLink] = useState("");
  const [trackingCopied, setTrackingCopied] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [zoomBook, setZoomBook] = useState<Book | null>(null);
  const [readerPage, setReaderPage] = useState(0);
  const [readerDirection, setReaderDirection] = useState<"next" | "previous">("next");
  const [degreeCode, setDegreeCode] = useState<DegreeCode>("B.Sc");
  const [degreeYear, setDegreeYear] = useState<DegreeYear>(2);
  const [degreeSemester, setDegreeSemester] = useState<DegreeSemester>(3);
  const [degreeCategory, setDegreeCategory] = useState<DegreeAcademicCategory>("Core / Major");
  const [degreeSubject, setDegreeSubject] = useState("All Subjects");
  const [visibleDegreeBookCount, setVisibleDegreeBookCount] = useState(12);
  const [degreeFlowStep, setDegreeFlowStep] = useState<DegreeFlowStep>("course");

  const selectedTitle = selectedCourse === "All" ? selectedGroup : selectedCourse;
  const visibleGroups = category ? [initialGroup] : programmeGroups;

  const filteredBooks = useMemo(() => {
    const query = search.trim().toLowerCase();
    let list = books.filter((book) => book.category === selectedGroup);
    if (selectedCourse !== "All") list = list.filter((book) => book.course === selectedCourse);
    if (semester !== "All") list = list.filter((book) => book.semester === semester);
    list = list.filter((book) => bookMatchesNeed(book, need));
    if (query) {
      list = list.filter((book) => `${book.title} ${book.author} ${book.course} ${book.subject} ${book.semester} ${book.bookType} ${book.isbn}`.toLowerCase().includes(query));
    }

    return [...list].sort((a, b) =>
      sort === "price-low" ? a.price - b.price :
      sort === "price-high" ? b.price - a.price :
      sort === "title" ? a.title.localeCompare(b.title) :
      sort === "newest" ? b.year - a.year || b.id - a.id : a.id - b.id
    );
  }, [need, search, selectedCourse, selectedGroup, semester, sort]);

  const cartLines = useMemo(() => Object.entries(cart).flatMap(([id, quantity]) => {
    const book = books.find((item) => item.id === Number(id));
    return book ? [{ book, quantity }] : [];
  }), [cart]);

  const itemCount = cartLines.reduce((total, line) => total + line.quantity, 0);
  const subtotal = cartLines.reduce((total, line) => total + line.book.price * line.quantity, 0);
  const savings = cartLines.reduce((total, line) => total + (line.book.mrp - line.book.price) * line.quantity, 0);
  const degreeSubjects = subjectsForDegreeCategory(degreeCode, degreeCategory);
  const semesterSubjects = [
    ...majorSubjectsByDegree[degreeCode],
    ...minorSubjects,
    ...multidisciplinarySubjects,
    ...lifeSkillSubjects,
  ];
  const degreeCatalogueBooks = books.filter((book) => book.category === "Degree");
  const degreeYearSemesters = degreeSemesters.filter((item) => Math.ceil(item / 2) === degreeYear);
  const semesterText = `Semester ${degreeSemester}` as Semester;
  const semesterDegreeBooks = degreeCatalogueBooks.filter((book) => book.course === degreeCode && book.semester === semesterText);
  const selectedDegreeBooks = degreeSubject === "All Subjects" ? semesterDegreeBooks : degreeBooksForSubject(degreeCode, degreeSubject).filter((book) => !semesterDegreeBooks.length || book.semester === semesterText || book.course === degreeCode);
  const selectedDegreePrimaryBooks = selectedDegreeBooks.length ? selectedDegreeBooks : degreeCatalogueBooks.filter((book) => book.course === degreeCode);
  const visibleDegreeBooks = selectedDegreePrimaryBooks.slice(0, visibleDegreeBookCount);
  const additionalDegreeBooks = degreeCatalogueBooks.filter((book) => !visibleDegreeBooks.some((visibleBook) => visibleBook.id === book.id)).slice(0, 8);
  const visibleSubjectCount = allDegreeCatalogueSubjects.length;
  const degreeStepOrder: DegreeFlowStep[] = ["course", "year", "semester", "subjects", "books"];
  const degreeProgress = ((degreeStepOrder.indexOf(degreeFlowStep) + 1) / degreeStepOrder.length) * 100;

  const chooseDegree = (code: DegreeCode) => {
    setDegreeCode(code);
    setDegreeCategory("Core / Major");
    setDegreeSubject("All Subjects");
    setVisibleDegreeBookCount(12);
    setDegreeFlowStep("year");
    selectCourse("Degree", code);
    setSearch("");
  };

  const chooseDegreeYear = (year: DegreeYear) => {
    setDegreeYear(year);
    setDegreeSemester(((year - 1) * 2 + 1) as DegreeSemester);
    setDegreeSubject("All Subjects");
    setVisibleDegreeBookCount(12);
    setDegreeFlowStep("semester");
    setSearch("");
  };

  const chooseDegreeSemester = (semesterNumber: DegreeSemester) => {
    setDegreeSemester(semesterNumber);
    setDegreeSubject("All Subjects");
    setVisibleDegreeBookCount(12);
    setDegreeFlowStep("subjects");
    setSearch("");
  };

  const chooseDegreeCategory = (categoryName: DegreeAcademicCategory) => {
    setDegreeCategory(categoryName);
    setDegreeSubject("All Subjects");
    setVisibleDegreeBookCount(12);
    setSearch("");
  };

  const chooseDegreeSubject = (subjectName: string) => {
    setDegreeSubject(subjectName);
    setVisibleDegreeBookCount(12);
    setDegreeFlowStep("books");
    setSearch(subjectName === "All Subjects" ? "" : subjectName);
  };

  const selectGroup = (group: ProgrammeGroup) => {
    setSelectedGroup(group);
    setSelectedCourse(defaultCourseFor(group));
    setSemester("All");
    setNeed("All");
    setSearch("");
  };

  const selectCourse = (group: ProgrammeGroup, course: string) => {
    setSelectedGroup(group);
    setSelectedCourse(course);
    setSemester("All");
    setNeed("All");
    setSearch("");
  };

  const clearFilters = () => {
    setSemester("All");
    setNeed("All");
    setSearch("");
    setSort("featured");
  };

  const updateCart = (id: number, change: number, open = false) => {
    setCart((current) => {
      const quantity = (current[id] || 0) + change;
      if (quantity <= 0) {
        const next = { ...current };
        delete next[id];
        return next;
      }
      return { ...current, [id]: quantity };
    });
    if (open) setCartOpen(true);
  };

  const openBook = (book: Book) => {
    setSelectedBook(book);
    setReaderPage(0);
    setReaderDirection("next");
  };

  const addFromBookDetails = (book: Book) => {
    updateCart(book.id, 1);
    setSelectedBook(null);
    setZoomBook(null);
    setCartOpen(true);
  };

  const buyNowFromBook = (book: Book) => {
    updateCart(book.id, 1);
    setSelectedBook(null);
    setZoomBook(null);
    setCheckoutMessage("");
    setCheckoutOpen(true);
  };

  const handleCheckoutSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = `VJP-${Date.now().toString(36).toUpperCase()}`;
    const record: TrackingRecord = {
      id,
      createdAt: new Date().toISOString(),
      amount: subtotal,
      items: cartLines.map(({ book, quantity }) => `${book.title} × ${quantity}`),
    };
    try {
      window.localStorage.setItem(`vijayam-track-${id}`, JSON.stringify(record));
    } catch {
      // Keep the in-session tracking preview usable if browser storage is unavailable.
    }
    setTrackingRecord(record);
    setTrackingQuery(id);
    setTrackingLink(`${window.location.origin}${window.location.pathname}#track=${encodeURIComponent(id)}`);
    setTrackingNotice("Tracking preview created on this device. This is not a confirmed order; live fulfilment updates require a connected order system.");
    setCheckoutOpen(false);
    setTrackingOpen(true);
  };

  const findTrackingRecord = () => {
    const entered = trackingQuery.trim();
    let id = entered;
    try {
      if (entered.includes("#")) id = new URL(entered, window.location.href).hash.replace(/^#track=/, "");
      else if (entered.startsWith("track=")) id = entered.slice(6);
      id = decodeURIComponent(id).trim().toUpperCase();
      const saved = window.localStorage.getItem(`vijayam-track-${id}`);
      if (!saved) throw new Error("not found");
      const record = JSON.parse(saved) as TrackingRecord;
      if (record.id !== id || !Array.isArray(record.items)) throw new Error("invalid record");
      setTrackingRecord(record);
      setTrackingLink(`${window.location.origin}${window.location.pathname}#track=${encodeURIComponent(id)}`);
      setTrackingNotice("This is a locally saved tracking preview. Carrier scans and delivery estimates are not connected yet.");
    } catch {
      setTrackingRecord(null);
      setTrackingNotice("We couldn’t find that tracking preview on this device. Check the reference or open the original link in the browser where it was created.");
    }
  };

  const shareTrackingLink = async () => {
    if (!trackingRecord) return;
    const link = `${window.location.origin}${window.location.pathname}#track=${encodeURIComponent(trackingRecord.id)}`;
    try {
      await navigator.clipboard.writeText(link);
      setTrackingCopied(true);
      window.setTimeout(() => setTrackingCopied(false), 2200);
    } catch {
      window.prompt("Copy your tracking link", link);
    }
  };

  useEffect(() => {
    const id = new URLSearchParams(window.location.hash.slice(1)).get("track");
    if (!id) return;
    setTrackingQuery(id);
    try {
      const saved = window.localStorage.getItem(`vijayam-track-${id.toUpperCase()}`);
      if (saved) {
        setTrackingRecord(JSON.parse(saved) as TrackingRecord);
        setTrackingLink(`${window.location.origin}${window.location.pathname}#track=${encodeURIComponent(id)}`);
        setTrackingNotice("This is a locally saved tracking preview. Carrier scans and delivery estimates are not connected yet.");
        setTrackingOpen(true);
      }
    } catch {
      setTrackingNotice("This tracking preview could not be loaded in this browser.");
      setTrackingOpen(true);
    }
  }, []);

  const downloadInvoice = async () => {
    const invoiceNumber = `VJP-${Date.now().toString().slice(-8)}`;
    const invoiceDate = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
    const logoResponse = await fetch("/images/eagle%20logo%20.jpg");
    if (!logoResponse.ok) throw new Error("The Vijayam logo could not be loaded for the invoice.");
    const logoBlob = await logoResponse.blob();
    const logoUrl = URL.createObjectURL(logoBlob);
    const logoImage = new Image();
    logoImage.src = logoUrl;
    await logoImage.decode();
    URL.revokeObjectURL(logoUrl);
    const logoWidth = logoImage.naturalWidth;
    const logoHeight = logoImage.naturalHeight;
    const logoBytes = new Uint8Array(await logoBlob.arrayBuffer());
    const logoHex = `${Array.from(logoBytes, (byte) => byte.toString(16).padStart(2, "0")).join("")}>`;
    const logoScale = Math.min(180 / logoWidth, 64 / logoHeight);
    const logoDrawWidth = logoWidth * logoScale;
    const logoDrawHeight = logoHeight * logoScale;
    const pdfText = (x: number, y: number, size: number, value: string, color = "0.12 0.20 0.17") => {
      const safe = value.normalize("NFKD").replace(/[^\x20-\x7E]/g, "").replace(/([\\()])/g, "\\$1");
      return `${color} rg BT /F1 ${size} Tf ${x} ${y} Td (${safe}) Tj ET\n`;
    };
    const fillRect = (x: number, y: number, width: number, height: number, color: string) => `${color} rg ${x} ${y} ${width} ${height} re f\n`;
    const invoiceLogo = () => `q ${logoDrawWidth.toFixed(2)} 0 0 ${logoDrawHeight.toFixed(2)} 46 ${(750 + (64 - logoDrawHeight) / 2).toFixed(2)} cm /Logo Do Q\n`;
    const pages: string[] = [];
    const pageGroups = Array.from({ length: Math.max(1, Math.ceil(cartLines.length / 9)) }, (_, index) => cartLines.slice(index * 9, (index + 1) * 9));

    pageGroups.forEach((group, pageIndex) => {
      let content = fillRect(0, 0, 595, 842, "1 1 1");
      content += fillRect(0, 742, 595, 100, "1 1 1");
      content += fillRect(0, 738, 595, 4, "0.87 0.15 0.22");
      content += fillRect(0, 734, 595, 4, "0.95 0.48 0.09");
      content += fillRect(0, 730, 595, 4, "0.95 0.82 0.20");
      content += fillRect(0, 726, 595, 4, "0.26 0.65 0.36");
      content += invoiceLogo();
      content += pdfText(425, 804, 10, "PRO FORMA INVOICE", "0.07 0.23 0.57");
      content += pdfText(425, 785, 9, invoiceNumber, "0.91 0.80 0.55");
      content += pdfText(46, 716, 10, `Invoice date: ${invoiceDate}`);
      content += pdfText(46, 698, 9, "Payment status: Pending - payment has not been processed", "0.48 0.50 0.47");
      content += pdfText(46, 680, 9, `Payment method selected: ${paymentMethod === "upi" ? "UPI" : paymentMethod === "card" ? "Credit / Debit Card" : "Cash on Delivery"}`, "0.48 0.50 0.47");
      const tableY = pageIndex === 0 ? 644 : 710;
      content += fillRect(40, tableY - 9, 515, 25, "0.95 0.94 0.90");
      content += pdfText(49, tableY, 9, "BOOK TITLE", "0.09 0.23 0.20");
      content += pdfText(405, tableY, 9, "QTY", "0.09 0.23 0.20");
      content += pdfText(468, tableY, 9, "UNIT PRICE", "0.09 0.23 0.20");
      content += pdfText(525, tableY, 9, "TOTAL", "0.09 0.23 0.20");
      let y = tableY - 37;
      group.forEach(({ book, quantity }) => {
        content += pdfText(49, y, 10, book.title.slice(0, 54));
        content += pdfText(49, y - 15, 8, `${book.course} | ${semesterShort(book.semester)} | ${book.edition}`.slice(0, 74), "0.48 0.50 0.47");
        content += pdfText(410, y - 2, 9, String(quantity));
        content += pdfText(468, y - 2, 9, `INR ${book.price}`);
        content += pdfText(520, y - 2, 9, `INR ${book.price * quantity}`);
        content += `0.89 0.87 0.82 RG 0.5 w 48 ${y - 24} m 548 ${y - 24} l S\n`;
        y -= 48;
      });
      if (pageIndex === pageGroups.length - 1) {
        const totalsY = Math.min(y - 16, 170);
        content += `0.72 0.59 0.32 RG 1 w 350 ${totalsY + 42} m 548 ${totalsY + 42} l S\n`;
        content += pdfText(365, totalsY + 22, 10, "Items subtotal");
        content += pdfText(490, totalsY + 22, 10, `INR ${subtotal}`);
        content += pdfText(365, totalsY + 4, 9, "Discount savings", "0.16 0.43 0.31");
        content += pdfText(490, totalsY + 4, 9, `INR ${savings}`, "0.16 0.43 0.31");
        content += pdfText(365, totalsY - 14, 9, "Delivery", "0.48 0.50 0.47");
        content += pdfText(490, totalsY - 14, 9, "Calculated later", "0.48 0.50 0.47");
        content += pdfText(365, totalsY - 39, 12, "ESTIMATED TOTAL", "0.09 0.23 0.20");
        content += pdfText(478, totalsY - 39, 12, `INR ${subtotal}`, "0.09 0.23 0.20");
        content += pdfText(46, 82, 8, "This is a pro forma invoice. It is not proof of payment; live payment processing is not connected.", "0.48 0.50 0.47");
      }
      content += pdfText(46, 38, 8, `Vijayam Publications  |  ${invoiceNumber}  |  Page ${pageIndex + 1} of ${pageGroups.length}`, "0.56 0.55 0.51");
      pages.push(content);
    });

    const objects: string[] = [];
    objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
    const pageRefs = pages.map((_, index) => `${5 + index * 2} 0 R`).join(" ");
    objects[2] = `<< /Type /Pages /Kids [${pageRefs}] /Count ${pages.length} >>`;
    objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
    objects[4] = `<< /Type /XObject /Subtype /Image /Width ${logoWidth} /Height ${logoHeight} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter [/ASCIIHexDecode /DCTDecode] /Length ${logoHex.length} >>\nstream\n${logoHex}\nendstream`;
    pages.forEach((content, index) => {
      const pageId = 5 + index * 2;
      const contentId = pageId + 1;
      objects[pageId] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R >> /XObject << /Logo 4 0 R >> >> /Contents ${contentId} 0 R >>`;
      objects[contentId] = `<< /Length ${content.length} >>\nstream\n${content}endstream`;
    });

    let pdf = "%PDF-1.4\n";
    const offsets = [0];
    for (let id = 1; id < objects.length; id += 1) {
      offsets[id] = pdf.length;
      pdf += `${id} 0 obj\n${objects[id]}\nendobj\n`;
    }
    const xrefOffset = pdf.length;
    pdf += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;
    for (let id = 1; id < objects.length; id += 1) pdf += `${String(offsets[id]).padStart(10, "0")} 00000 n \n`;
    pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

    const url = URL.createObjectURL(new Blob([pdf], { type: "application/pdf" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${invoiceNumber.toLowerCase()}-invoice.pdf`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const turnReaderPage = (page: number) => {
    if (page < 0 || page >= appliedAnatomyPages.length || page === readerPage) return;
    setReaderDirection(page > readerPage ? "next" : "previous");
    setReaderPage(page);
  };

  return (
    <main className={`shop-page section-${selectedGroup.toLowerCase().replace(/\s+/g, "-")}`}>
      <style>{`
        .shop-page{--green:#075b59;--deep:#063d3b;--gold:#d6aa4a;--paper:#fffdf8;--line:#eadfce;--section-soft:#eaf4f1;--section-glow:#075b5930;--ink:#14221d;min-height:100vh;background:radial-gradient(circle at 9% 4%,#ffffff 0 9%,transparent 25%),radial-gradient(circle at top left,var(--section-soft),transparent 38%),radial-gradient(circle at 86% 8%,color-mix(in srgb,var(--gold) 30%,transparent),transparent 30%),linear-gradient(135deg,#fbf4e6 0%,#fffdf8 46%,#f2e4cb 100%);color:var(--ink);font-family:Inter,ui-sans-serif,system-ui,sans-serif}.shop-page.section-degree{--green:#4b3f8f;--deep:#252052;--gold:#d2b15d;--section-soft:#eef0ff;--section-glow:#4b3f8f30}.shop-page.section-vocational{--green:#8a4c25;--deep:#4b2610;--gold:#dfaa55;--section-soft:#fff0dd;--section-glow:#8a4c2530}.shop-page.section-bridge-courses{--green:#075985;--deep:#082f49;--gold:#d2b15d;--section-soft:#e0f2fe;--section-glow:#0284c733}.shop-page *{box-sizing:border-box}.shop-page button,.shop-page input,.shop-page select{font:inherit}.shop-page button{cursor:pointer}.shop-page button:focus-visible,.shop-page input:focus-visible,.shop-page select:focus-visible{outline:3px solid #075b5940;outline-offset:2px}.wrap{width:min(1440px,calc(100% - 32px));margin:auto}.topbar{position:sticky;top:0;z-index:30;margin-bottom:18px;padding:14px 0;background:#f7f1e7e8;backdrop-filter:blur(10px)}.topbar-inner{display:grid;grid-template-columns:auto minmax(280px,1fr) auto;align-items:center;gap:14px;padding:12px;border:1px solid color-mix(in srgb,var(--gold) 48%,white);border-radius:28px;background:linear-gradient(135deg,#ffffffee,#fff8e8ea 58%,color-mix(in srgb,var(--section-soft) 84%,white));box-shadow:0 24px 62px #2a231420,0 0 0 1px #ffffffcc inset,0 0 36px color-mix(in srgb,var(--gold) 18%,transparent);backdrop-filter:blur(18px)}.brand{display:flex;align-items:center;gap:12px;min-width:210px;padding:7px 12px 7px 8px;border:1px solid color-mix(in srgb,var(--gold) 42%,white);border-radius:999px;background:linear-gradient(135deg,#fffdf8,#ffffff 48%,color-mix(in srgb,var(--section-soft) 72%,white));box-shadow:inset 0 1px 0 #fff,0 12px 26px color-mix(in srgb,var(--green) 10%,transparent)}.brand-copy{display:grid;gap:1px;line-height:1}.brand-copy strong{color:var(--deep);font-size:12px;font-weight:950;letter-spacing:.08em;text-transform:uppercase}.brand-copy span{color:#7a6a50;font-size:9px;font-weight:900;letter-spacing:.14em;text-transform:uppercase}.search{display:flex;align-items:center;gap:11px;min-height:52px;padding:0 18px;border:1px solid #dfc894;border-radius:99px;background:#fffdf8;color:#80683f;box-shadow:inset 0 1px 0 #ffffff,0 10px 22px #8c6d1f12}.search input{width:100%;border:0;background:transparent;color:#17231f;outline:0}.search input::placeholder{color:#8b7a60}.cart-btn{min-height:52px;padding:0 18px;border:0;border-radius:99px;background:linear-gradient(135deg,var(--green),#0b746f);color:white;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:.06em;box-shadow:0 12px 24px #075b5930}.cart-btn b{margin-left:7px;padding:4px 8px;border-radius:99px;background:white;color:var(--green)}.layout{display:grid;grid-template-columns:320px minmax(0,1fr);gap:20px}.sidebar{position:sticky;top:92px;align-self:start;max-height:calc(100vh - 110px);overflow:auto;padding:18px;border:1px solid color-mix(in srgb,var(--green) 18%,var(--line));border-radius:22px;background:linear-gradient(180deg,#ffffff,#fffaf2 78%,var(--section-soft));box-shadow:0 18px 42px #2a231412,0 0 0 1px #ffffff inset}.side-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px}.side-head h1{margin:0;font-family:Georgia,serif;font-size:28px;color:var(--deep)}.side-head button{border:1px solid var(--line);border-radius:99px;background:#fffdf8;padding:8px 10px;color:#6b5d49;font-size:10px;font-weight:900;text-transform:uppercase}.premium-icon{--icon-start:var(--green);--icon-mid:var(--deep);--icon-end:#050816;--icon-ink:#fffbe8;--icon-shine:#ffffff;--icon-gold:var(--gold);position:relative;display:grid;width:62px;height:62px;place-items:center;flex:0 0 auto;border-radius:22px;color:var(--icon-ink);background:radial-gradient(circle at 30% 18%,color-mix(in srgb,var(--icon-shine) 96%,white),transparent 13%),linear-gradient(145deg,#ffffff78 0 16%,transparent 32%),linear-gradient(135deg,var(--icon-start),var(--icon-mid) 54%,var(--icon-end));box-shadow:0 22px 46px color-mix(in srgb,var(--icon-mid) 34%,transparent),0 0 0 7px #ffffffd8,0 0 0 1px color-mix(in srgb,var(--icon-gold) 80%,white),0 0 34px color-mix(in srgb,var(--icon-gold) 42%,transparent),inset 0 1px 0 #ffffffef,inset 0 -14px 24px #00000034;isolation:isolate;transition:transform .28s cubic-bezier(.16,1,.3,1),box-shadow .28s ease,filter .28s ease}.premium-icon:before{position:absolute;inset:-10px;border-radius:31px;background:conic-gradient(from 120deg,var(--icon-gold),var(--icon-shine),var(--icon-start),var(--icon-gold),var(--icon-shine));opacity:.82;filter:blur(12px);z-index:-1;content:""}.premium-icon:after{position:absolute;inset:6px;border:1px solid color-mix(in srgb,var(--icon-shine) 62%,white);border-radius:16px;background:linear-gradient(135deg,#ffffff38,transparent 48%,color-mix(in srgb,var(--icon-gold) 28%,transparent));box-shadow:inset 0 0 0 1px #ffffff22,inset 0 -8px 16px #00000018;content:""}.premium-icon svg{position:relative;z-index:1;width:32px;height:32px;color:var(--icon-ink);stroke:var(--icon-ink);stroke-width:2.55;filter:drop-shadow(0 2px 2px #000000a8) drop-shadow(0 0 7px color-mix(in srgb,var(--icon-shine) 72%,transparent)) drop-shadow(0 0 13px color-mix(in srgb,var(--icon-gold) 58%,transparent))}.premium-icon.compact{width:38px;height:38px;border-radius:14px;box-shadow:0 12px 24px color-mix(in srgb,var(--icon-mid) 28%,transparent),0 0 0 3px #ffffffd0,0 0 0 1px color-mix(in srgb,var(--icon-gold) 62%,white),0 0 18px color-mix(in srgb,var(--icon-shine) 42%,transparent),inset 0 1px 0 #ffffffd8}.premium-icon.compact:before{inset:-5px;border-radius:18px;filter:blur(7px);opacity:.72}.premium-icon.compact:after{inset:5px;border-radius:9px}.premium-icon.compact svg{width:20px;height:20px;stroke-width:2.8}.group{padding-top:14px;border-top:1px solid #f0e6d7}.group:first-of-type{border-top:0}.group-title{display:flex;align-items:center;justify-content:space-between;margin:0 0 9px;color:#796343;font-size:10px;font-weight:950;letter-spacing:.12em;text-transform:uppercase}.group-title button{border:0;background:transparent;color:var(--green);font-size:10px;font-weight:900}.category-list{display:grid;gap:8px;margin-bottom:14px}.category-btn{position:relative;overflow:hidden;display:grid;grid-template-columns:1fr auto;align-items:center;gap:10px;width:100%;padding:14px 13px;border:1px solid color-mix(in srgb,var(--gold) 36%,var(--line));border-radius:20px;background:linear-gradient(135deg,#ffffff,#fffaf0 56%,color-mix(in srgb,var(--section-soft) 58%,white));text-align:left;color:#26362f;box-shadow:0 10px 24px #2a23140d,inset 0 1px 0 #fff;transition:transform .22s ease,box-shadow .22s ease,border-color .22s ease}.category-btn:before{position:absolute;inset:0;background:linear-gradient(90deg,color-mix(in srgb,var(--gold) 34%,transparent),transparent 20%),radial-gradient(circle at 96% 50%,var(--section-glow),transparent 34%);opacity:.72;pointer-events:none;content:""}.category-btn:hover,.category-btn.active{transform:translateX(5px);border-color:color-mix(in srgb,var(--green) 68%,var(--gold));background:radial-gradient(circle at 8% 12%,#ffffff,transparent 28%),linear-gradient(135deg,#ffffff,var(--section-soft));box-shadow:0 18px 34px var(--section-glow),0 0 0 1px #ffffff inset,0 0 22px color-mix(in srgb,var(--gold) 18%,transparent)}.category-btn strong,.category-btn span{position:relative;z-index:1}.category-btn strong{font-size:13px;font-weight:950;color:#1c2b25}.category-btn span{color:#65736c;font-size:10px;font-weight:850;white-space:nowrap}.content{min-width:0}.hero{position:relative;overflow:hidden;display:flex;align-items:center;justify-content:space-between;gap:20px;margin-bottom:16px;padding:30px;border:1px solid color-mix(in srgb,var(--green) 18%,var(--gold));border-radius:32px;background:radial-gradient(circle at 18% 0,#ffffff 0 8%,transparent 28%),radial-gradient(circle at 85% 18%,var(--section-glow),transparent 34%),linear-gradient(135deg,#fffefb,#fff6e7 58%,var(--section-soft));box-shadow:0 24px 64px #2a23141d,0 0 0 1px #ffffffd2 inset,0 0 52px var(--section-glow)}.hero:after{position:absolute;right:-42px;top:-46px;width:190px;height:190px;border-radius:50%;background:linear-gradient(135deg,var(--gold),transparent 62%);opacity:.26;content:""}.hero:before{position:absolute;inset:1px;border-radius:31px;background:linear-gradient(120deg,#ffffff70,transparent 38%,color-mix(in srgb,var(--gold) 18%,transparent));pointer-events:none;content:""}.hero>*{position:relative;z-index:1}.hero .premium-icon{width:88px;height:88px;border-radius:30px;margin-right:8px}.hero .premium-icon svg{width:45px;height:45px}.hero .premium-icon:before{inset:-12px;border-radius:38px;opacity:.7}.eyebrow{margin:0 0 8px;color:var(--green);font-size:10px;font-weight:950;letter-spacing:.14em;text-transform:uppercase}.hero h2{margin:0;font-family:Georgia,serif;font-size:clamp(30px,4vw,48px);line-height:1;color:var(--deep)}.hero p{margin:9px 0 0;color:#66726b;line-height:1.6}.toolbar{display:grid;grid-template-columns:1fr auto;gap:12px;margin-bottom:14px;padding:14px;border:1px solid var(--line);border-radius:18px;background:white}.filters{display:flex;flex-wrap:wrap;gap:8px}.vocational-note span{display:inline-flex;align-items:center;min-height:38px;padding:0 14px;border:1px solid color-mix(in srgb,var(--green) 22%,var(--line));border-radius:99px;background:linear-gradient(135deg,#fffdf8,var(--section-soft));color:var(--deep);font-size:12px;font-weight:850;box-shadow:inset 0 1px 0 #fff,0 8px 18px var(--section-glow)}.chip{min-height:34px;padding:0 11px;border:1px solid var(--line);border-radius:99px;background:#fffdf8;color:#34443d;font-size:11px;font-weight:850}.chip.active{border-color:var(--green);background:var(--green);color:white}.sort{min-height:38px;padding:0 12px;border:1px solid var(--line);border-radius:99px;background:#fffdf8;color:#34443d}.summary{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px;padding:12px 14px;border:1px solid var(--line);border-radius:16px;background:#fffdf8;color:#607069;font-size:12px}.summary b{color:var(--deep);font-family:Georgia,serif;font-size:22px}.book-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}.card{position:relative;overflow:hidden;border:1px solid color-mix(in srgb,var(--gold) 58%,#e5d4ad);border-radius:34px;background:linear-gradient(180deg,#ffffff,#fffaf1 62%,color-mix(in srgb,var(--section-soft) 44%,#fffaf1));box-shadow:0 24px 56px #2a23141a,0 0 0 1px #ffffff inset,0 0 34px color-mix(in srgb,var(--gold) 14%,transparent);isolation:isolate;transition:transform .28s cubic-bezier(.16,1,.3,1),box-shadow .28s ease,border-color .28s ease}.card:before{position:absolute;inset:0;border-radius:inherit;background:linear-gradient(135deg,#ffffffb8,transparent 34%,color-mix(in srgb,var(--gold) 22%,transparent)),radial-gradient(circle at 18% 0,#fff 0 7%,transparent 26%),linear-gradient(90deg,color-mix(in srgb,var(--gold) 18%,transparent),transparent 18%,transparent 82%,color-mix(in srgb,var(--gold) 14%,transparent));pointer-events:none;content:""}.card:after{position:absolute;left:18px;right:18px;bottom:-18px;height:34px;border-radius:50%;background:color-mix(in srgb,var(--green) 22%,transparent);filter:blur(18px);opacity:.55;pointer-events:none;content:""}.card:has(.media:hover),.card:has(.media:focus-visible){transform:translateY(-10px) scale(1.012);border-color:color-mix(in srgb,var(--gold) 88%,white);box-shadow:0 38px 82px #2a231438,0 0 46px var(--section-glow),0 0 0 1px #ffffff inset}.media{position:relative;display:grid;width:100%;min-height:268px;place-items:center;padding:34px 16px;border:0;background:radial-gradient(circle at 50% 6%,#fffef9 0,#f8edd9 35%,transparent 62%),radial-gradient(circle at 80% 20%,color-mix(in srgb,var(--gold) 30%,transparent),transparent 28%),radial-gradient(circle at 16% 82%,var(--section-glow),transparent 34%),linear-gradient(135deg,var(--section-soft),#ead7b8);color:inherit;text-align:initial;cursor:pointer}.media:before{position:absolute;inset:15px;border:1px solid #ffffff90;border-radius:26px;background:linear-gradient(135deg,#ffffff70,transparent 54%,color-mix(in srgb,var(--gold) 16%,transparent));box-shadow:inset 0 1px 0 #fff;content:""}.media:after{position:absolute;right:16%;bottom:28px;width:126px;height:18px;border-radius:50%;background:#2a231436;filter:blur(9px);content:""}.media:hover .book-cover,.media:focus-visible .book-cover{transform:rotate(-1.5deg) translateY(-9px) scale(1.055)}.badge,.save{position:absolute;top:11px;border-radius:99px;font-size:8px;font-weight:950;text-transform:uppercase;letter-spacing:.06em}.badge{left:11px;padding:6px 8px;background:#f1d58a;color:#3d2b06}.save{right:11px;padding:6px 8px;background:#147850;color:white}.book-cover{--cover:#174f67;--accent:#e7c36e;position:relative;z-index:1;display:flex;width:148px;aspect-ratio:2/3;flex-direction:column;justify-content:flex-end;padding:19px 16px;border-radius:5px 18px 18px 5px;color:white;background:linear-gradient(115deg,#ffffff5f,transparent 24%),radial-gradient(circle at 76% 15%,#ffffff30,transparent 22%),linear-gradient(0deg,#000000c4,transparent 62%),var(--cover);box-shadow:-12px 0 18px -10px #000 inset,14px 15px 0 -4px #2a231421,0 28px 46px -10px #2a231482,0 0 0 1px color-mix(in srgb,var(--accent) 52%,transparent),0 0 30px color-mix(in srgb,var(--accent) 20%,transparent);transform:rotate(-1.5deg);transition:transform .26s cubic-bezier(.16,1,.3,1),box-shadow .26s ease}.book-cover:before{position:absolute;inset:9px;border:1px solid color-mix(in srgb,var(--accent) 88%,white);border-radius:5px 13px 13px 5px;box-shadow:0 0 22px color-mix(in srgb,var(--accent) 24%,transparent) inset;content:""}.book-cover:after{position:absolute;top:3px;right:-7px;bottom:3px;width:8px;border-radius:0 4px 4px 0;background:repeating-linear-gradient(#fff,#fff 1px,#e6ddc9 1px,#e6ddc9 2px);box-shadow:2px 0 8px #00000028;content:""}.book-cover>*{position:relative;z-index:1}.book-cover small{position:absolute;top:14px;left:13px;color:var(--accent);font-size:6px;font-weight:950;text-transform:uppercase;letter-spacing:.1em}.book-cover strong{font-family:Georgia,serif;font-size:15px;line-height:1.08}.book-cover span{margin-top:8px;color:var(--accent);font-size:6px;text-transform:uppercase}.book-cover.image-cover{overflow:hidden;padding:0;background:#fff;color:inherit;box-shadow:-12px 0 18px -10px #000 inset,14px 15px 0 -4px #2a231421,0 30px 54px -10px #2a23148a,0 0 0 1px color-mix(in srgb,var(--accent) 74%,transparent),0 0 34px color-mix(in srgb,var(--accent) 30%,transparent)}.book-cover.image-cover img{width:100%;height:100%;object-fit:cover;border-radius:inherit;filter:saturate(1.08) contrast(1.04)}.book-cover.image-cover:before{inset:0;border:0;border-radius:inherit;background:linear-gradient(115deg,#ffffff6f 0 13%,transparent 34%),linear-gradient(90deg,#00000028,transparent 13%,transparent 88%,#ffffff38);box-shadow:inset 8px 0 16px #0000002e,inset 0 0 0 1px #ffffff60}.book-cover.image-cover:after{background:linear-gradient(180deg,#fff,#f4ead8);box-shadow:2px 0 10px #00000038}.book-cover.small{width:52px;min-width:52px;padding:7px}.book-cover.small.image-cover{padding:0}.book-cover.small small,.book-cover.small span{display:none}.book-cover.small strong{font-size:8px}.copy{padding:14px}.meta{display:inline-flex;max-width:100%;padding:5px 8px;border-radius:99px;background:#eaf4f1;color:var(--green);font-size:8px;font-weight:950;text-transform:uppercase;letter-spacing:.08em}.copy h3{min-height:42px;margin:10px 0 5px;font-family:Georgia,serif;font-size:17px;line-height:1.18;color:#17231f}.author{margin:0;color:#66726b;font-size:10px}.desc{display:-webkit-box;margin:9px 0 0;overflow:hidden;color:#52635b;font-size:10px;line-height:1.55;-webkit-line-clamp:3;-webkit-box-orient:vertical}.rating{display:inline-flex;gap:4px;margin-top:8px;padding:5px 7px;border:1px solid #f2e0ad;border-radius:9px;background:#fff5d8;color:#a9711a;font-size:10px}.details{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin:11px 0;padding:9px;border:1px solid #efe6d6;border-radius:12px;background:#fffaf2}.detail span{display:block;color:#806f55;font-size:7px;font-weight:950;text-transform:uppercase}.detail b{display:block;margin-top:3px;color:#26362f;font-size:10px;line-height:1.3}.price-row{display:flex;align-items:flex-end;justify-content:space-between;gap:10px}.price{font-family:Georgia,serif;font-size:23px;font-weight:800;color:var(--deep)}.mrp{color:#929b95;font-size:11px;text-decoration:line-through}.off{display:inline-flex;margin-top:4px;padding:4px 7px;border-radius:99px;background:#147850;color:white;font-size:8px;font-weight:950}.actions{display:flex;align-items:center;gap:7px;flex-wrap:wrap;justify-content:flex-end}.view,.add{min-height:38px;padding:0 14px;border-radius:99px;font-size:9px;font-weight:950;text-transform:uppercase;letter-spacing:.06em;transition:transform .2s ease,box-shadow .2s ease}.view{border:1px solid color-mix(in srgb,var(--gold) 70%,white);background:linear-gradient(135deg,#fffaf0,#ffffff 44%,color-mix(in srgb,var(--section-soft) 72%,white));color:var(--deep);box-shadow:0 10px 20px color-mix(in srgb,var(--gold) 18%,transparent),inset 0 1px 0 #fff}.add{border:0;background:linear-gradient(135deg,var(--green),var(--deep));color:white;box-shadow:0 12px 22px var(--section-glow),inset 0 1px 0 #ffffff55}.view:hover,.add:hover{transform:translateY(-2px)}.view:hover{box-shadow:0 16px 28px color-mix(in srgb,var(--gold) 30%,transparent),0 0 18px color-mix(in srgb,var(--gold) 22%,transparent),inset 0 1px 0 #fff}.add:hover{box-shadow:0 16px 30px var(--section-glow),0 0 18px color-mix(in srgb,var(--gold) 30%,transparent),inset 0 1px 0 #ffffff70}.qty{display:flex;align-items:center;overflow:hidden;border:1px solid var(--line);border-radius:99px}.qty button{width:30px;height:36px;border:0;background:#f4ead9}.qty span{min-width:28px;text-align:center;font-size:11px;font-weight:950}.empty{grid-column:1/-1;padding:46px 20px;border:1px dashed #d9cbb5;border-radius:22px;background:white;text-align:center}.empty h2{margin:0 0 8px;font-family:Georgia,serif;font-size:28px;color:var(--deep)}.empty p{max-width:520px;margin:0 auto;color:#607069;line-height:1.6}.overlay{position:fixed;inset:0;z-index:70;background:#07151299}.drawer{position:fixed;z-index:80;top:0;right:0;display:flex;width:min(440px,100%);height:100%;flex-direction:column;background:#fffdf8;box-shadow:-20px 0 60px #0003}.drawer-head{display:flex;justify-content:space-between;gap:12px;padding:22px;border-bottom:1px solid var(--line)}.drawer-head h2{margin:0;font-family:Georgia,serif;font-size:28px}.drawer-head p{margin:4px 0 0;color:#66726b;font-size:11px}.close{width:40px;height:40px;border:1px solid var(--line);border-radius:50%;background:white}.drawer-body{flex:1;overflow:auto;padding:8px 22px}.cart-line{display:grid;grid-template-columns:52px 1fr auto;gap:12px;padding:15px 0;border-bottom:1px solid var(--line)}.cart-line h3{margin:0 0 5px;font-family:Georgia,serif;font-size:16px}.cart-line p{margin:0;color:#66726b;font-size:10px;line-height:1.5}.line-controls{display:flex;align-items:center;gap:8px;margin-top:9px}.line-controls button{width:28px;height:28px;border:1px solid var(--line);border-radius:8px;background:white}.remove{align-self:start;border:0;background:transparent;color:#a0443d;font-size:18px}.drawer-foot{padding:20px 22px;border-top:1px solid var(--line);background:#f7f1e7}.total{display:flex;align-items:center;justify-content:space-between;margin-top:8px}.total b{font-family:Georgia,serif;font-size:25px}.book-modal-overlay{position:fixed;inset:0;z-index:90;display:grid;place-items:center;padding:22px;background:radial-gradient(circle at 50% 28%,color-mix(in srgb,var(--gold) 18%,transparent),transparent 30%),#071512b8;backdrop-filter:blur(10px)}.book-modal{position:relative;overflow:hidden;width:min(960px,100%);max-height:min(86vh,820px);overflow-y:auto;border:1px solid color-mix(in srgb,var(--gold) 58%,white);border-radius:34px;background:radial-gradient(circle at 15% 0,#ffffff 0 10%,transparent 34%),radial-gradient(circle at 90% 8%,var(--section-glow),transparent 32%),linear-gradient(135deg,#fffefb,#fff7e8 58%,var(--section-soft));box-shadow:0 34px 90px #00000052,0 0 0 1px #ffffffd8 inset,0 0 54px color-mix(in srgb,var(--gold) 24%,transparent)}.book-modal:before{position:absolute;inset:1px;border-radius:33px;background:linear-gradient(120deg,#ffffff94,transparent 38%,color-mix(in srgb,var(--gold) 18%,transparent));pointer-events:none;content:""}.book-modal>*{position:relative;z-index:1}.modal-close{position:absolute;right:18px;top:18px;z-index:2;width:42px;height:42px;border:1px solid color-mix(in srgb,var(--gold) 42%,var(--line));border-radius:50%;background:#fffdf8;color:var(--deep);font-size:24px;box-shadow:0 12px 24px #2a23141a}.modal-grid{display:grid;grid-template-columns:320px minmax(0,1fr);gap:28px;padding:34px}.modal-media{position:relative;display:grid;min-height:430px;place-items:center;border-radius:28px;background:radial-gradient(circle at 50% 10%,#fffef9 0,#f5e6c7 39%,transparent 65%),linear-gradient(135deg,var(--section-soft),#e1cda8);box-shadow:inset 0 0 0 1px #ffffffa0,0 18px 44px #2a23141a}.modal-media .book-cover{width:190px}.magnify-btn{position:absolute;right:22px;bottom:22px;z-index:3;display:grid;width:54px;height:54px;place-items:center;border:1px solid color-mix(in srgb,var(--gold) 70%,white);border-radius:50%;background:radial-gradient(circle at 30% 20%,#ffffff,#fff6df 48%,color-mix(in srgb,var(--section-soft) 76%,white));color:var(--deep);font-size:26px;font-weight:950;box-shadow:0 18px 34px #2a23142b,0 0 0 6px #ffffffa8,0 0 28px color-mix(in srgb,var(--gold) 42%,transparent);transition:transform .22s ease,box-shadow .22s ease}.magnify-btn:hover{transform:translateY(-3px) scale(1.06);box-shadow:0 24px 46px #2a23143b,0 0 0 7px #ffffffb8,0 0 38px color-mix(in srgb,var(--gold) 58%,transparent)}.zoom-overlay{position:fixed;inset:0;z-index:110;display:grid;place-items:center;padding:22px;background:radial-gradient(circle at 50% 30%,color-mix(in srgb,var(--gold) 18%,transparent),transparent 34%),#05100dd4;backdrop-filter:blur(14px)}.zoom-panel{position:relative;display:grid;gap:12px;width:min(560px,100%);justify-items:center;padding:24px;border:1px solid color-mix(in srgb,var(--gold) 72%,white);border-radius:34px;background:linear-gradient(135deg,#fffdf8,#fff5df 58%,var(--section-soft));box-shadow:0 34px 90px #00000070,0 0 0 1px #ffffffd8 inset,0 0 64px color-mix(in srgb,var(--gold) 32%,transparent)}.zoom-panel:before{position:absolute;inset:1px;border-radius:33px;background:linear-gradient(120deg,#ffffff9c,transparent 42%,color-mix(in srgb,var(--gold) 18%,transparent));pointer-events:none;content:""}.zoom-close{position:absolute;right:16px;top:16px;z-index:2;width:42px;height:42px;border:1px solid color-mix(in srgb,var(--gold) 52%,var(--line));border-radius:50%;background:#fffdf8;color:var(--deep);font-size:24px;box-shadow:0 12px 24px #2a231426}.zoom-frame{position:relative;z-index:1;display:grid;max-height:72vh;place-items:center;padding:20px;border-radius:26px;background:radial-gradient(circle at 50% 10%,#fffef9,#ead6ae 54%,var(--section-soft));box-shadow:inset 0 0 0 1px #ffffffb8,0 22px 46px #2a23142b}.zoom-frame img{display:block;width:min(390px,76vw);max-height:68vh;object-fit:contain;border-radius:12px;box-shadow:0 30px 70px #2a23146b,0 0 0 1px color-mix(in srgb,var(--gold) 60%,transparent)}.zoom-frame .book-cover{width:min(330px,70vw)}.zoom-panel p{position:relative;z-index:1;margin:0;color:#715f42;font-size:11px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}.modal-content{padding-right:10px}.modal-kicker{display:inline-flex;margin:0 0 12px;padding:7px 11px;border-radius:99px;background:linear-gradient(135deg,var(--green),var(--deep));color:white;font-size:10px;font-weight:950;letter-spacing:.12em;text-transform:uppercase;box-shadow:0 12px 24px var(--section-glow)}.modal-content h2{margin:0;font-family:Georgia,serif;font-size:clamp(30px,4vw,48px);line-height:1.03;color:var(--deep)}.modal-author{margin:10px 0 0;color:#586b61;font-size:14px;font-weight:700}.modal-desc{margin:18px 0;color:#43544c;font-size:15px;line-height:1.8}.modal-rating{display:inline-flex;gap:7px;align-items:center;margin-top:14px;padding:8px 11px;border:1px solid #efd993;border-radius:13px;background:#fff5d8;color:#9a6515;font-weight:900}.modal-price-row{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;margin:20px 0;padding:16px;border:1px solid color-mix(in srgb,var(--gold) 34%,var(--line));border-radius:22px;background:#fffdf8;box-shadow:inset 0 1px 0 #fff}.modal-price{font-family:Georgia,serif;font-size:38px;font-weight:900;color:var(--deep)}.modal-mrp{margin-left:8px;color:#8c958f;text-decoration:line-through}.modal-save{display:inline-flex;margin-top:6px;padding:6px 9px;border-radius:99px;background:#147850;color:white;font-size:10px;font-weight:950}.modal-add{min-height:46px;padding:0 22px;border:0;border-radius:99px;background:linear-gradient(135deg,var(--green),var(--deep));color:white;font-size:11px;font-weight:950;text-transform:uppercase;letter-spacing:.08em;box-shadow:0 16px 32px var(--section-glow),inset 0 1px 0 #ffffff55}.modal-specs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.modal-spec{padding:12px;border:1px solid #efe2ca;border-radius:16px;background:linear-gradient(135deg,#ffffff,#fffaf0)}.modal-spec span{display:block;color:#806f55;font-size:9px;font-weight:950;text-transform:uppercase;letter-spacing:.08em}.modal-spec b{display:block;margin-top:5px;color:#22332b;font-size:13px;line-height:1.35}.card{cursor:default}.media:focus-visible{outline:3px solid color-mix(in srgb,var(--green) 48%,white);outline-offset:-7px}.card-glance{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;margin-top:14px;padding-top:13px;border-top:1px solid color-mix(in srgb,var(--gold) 28%,var(--line))}.details-hint{display:inline-flex;align-items:center;gap:7px;color:var(--green);font-size:10px;font-weight:950;letter-spacing:.06em;text-transform:uppercase}.details-hint b{display:grid;width:25px;height:25px;place-items:center;border-radius:50%;background:var(--green);color:white;font-size:14px;transition:transform .22s ease}.card:has(.media:hover) .details-hint b,.card:has(.media:focus-visible) .details-hint b{transform:translateX(3px)}.card-cart{display:flex;justify-content:flex-end;margin-top:12px;padding-top:12px;border-top:1px solid #efe6d6}.card-cart .add{width:100%;min-height:42px}.card-cart .qty{margin-left:auto}.card-cart button{position:relative;z-index:2}.card .copy h3{min-height:0}.card .media{cursor:pointer}.anatomy-reader{width:min(1180px,100%);max-height:92vh}.reader-shell{display:grid;grid-template-columns:190px minmax(0,1fr);gap:22px;padding:28px}.reader-sidebar{display:flex;min-height:0;flex-direction:column;padding:18px;border:1px solid color-mix(in srgb,var(--gold) 38%,var(--line));border-radius:24px;background:#fffdf8cc;box-shadow:inset 0 1px 0 #fff}.reader-sidebar .modal-kicker{align-self:flex-start}.reader-sidebar h2{margin:0;font-family:Georgia,serif;color:var(--deep);font-size:25px;line-height:1.05}.reader-sidebar p{margin:8px 0 16px;color:#6b746f;font-size:11px;line-height:1.5}.reader-thumbs{display:grid;gap:9px;overflow:auto;padding:3px}.reader-thumb{display:grid;grid-template-columns:34px 1fr;align-items:center;gap:9px;padding:7px;border:1px solid var(--line);border-radius:12px;background:white;color:#5b665f;text-align:left;font-size:10px;font-weight:900;transition:.2s ease}.reader-thumb img{width:34px;height:45px;border-radius:4px;object-fit:cover;box-shadow:0 4px 10px #2a23142c}.reader-thumb.active{border-color:var(--green);background:var(--section-soft);color:var(--deep);transform:translateX(3px);box-shadow:0 9px 20px var(--section-glow)}.reader-stage{position:relative;display:grid;min-height:680px;place-items:center;overflow:hidden;padding:42px 70px 56px;border-radius:28px;background:radial-gradient(circle at 50% 4%,#fffdf7,#ead7b3 50%,color-mix(in srgb,var(--section-soft) 75%,#d8c39c));box-shadow:inset 0 0 0 1px #ffffffc4,inset 0 -30px 70px #5c421326}.reader-stage:before{position:absolute;inset:20px;border:1px solid #ffffff9c;border-radius:20px;content:""}.reader-page{position:relative;z-index:1;display:block;max-width:100%;height:min(70vh,650px);object-fit:contain;border-radius:5px;background:white;box-shadow:-7px 9px 0 #f0e8d8,0 30px 70px #2a23146b,0 0 0 1px #cdb98e;transform-origin:right center;animation:page-next .55s cubic-bezier(.2,.8,.2,1)}.reader-page.previous{transform-origin:left center;animation-name:page-previous}.reader-nav{position:absolute;z-index:3;top:50%;display:grid;width:48px;height:48px;place-items:center;border:1px solid #ffffffb8;border-radius:50%;background:var(--deep);color:white;font-size:24px;box-shadow:0 14px 28px #2a231445;transform:translateY(-50%)}.reader-nav:disabled{cursor:not-allowed;opacity:.28}.reader-nav.previous{left:14px}.reader-nav.next{right:14px}.reader-status{position:absolute;z-index:3;right:24px;bottom:18px;left:24px;display:flex;align-items:center;justify-content:space-between;color:#58492e;font-size:10px;font-weight:950;letter-spacing:.1em;text-transform:uppercase}.reader-dots{display:flex;gap:6px}.reader-dot{width:8px;height:8px;padding:0;border:0;border-radius:50%;background:#9b8a6c}.reader-dot.active{width:24px;border-radius:99px;background:var(--green)}@keyframes page-next{from{opacity:.2;transform:perspective(1400px) rotateY(76deg) scale(.94)}to{opacity:1;transform:perspective(1400px) rotateY(0) scale(1)}}@keyframes page-previous{from{opacity:.2;transform:perspective(1400px) rotateY(-76deg) scale(.94)}to{opacity:1;transform:perspective(1400px) rotateY(0) scale(1)}}@media(max-width:1180px){.book-grid{grid-template-columns:repeat(3,1fr)}}@media(max-width:920px){.topbar-inner{grid-template-columns:auto 1fr}.search{grid-column:1/-1;grid-row:2}.layout{grid-template-columns:1fr}.sidebar{position:static;max-height:none}.book-grid{grid-template-columns:repeat(2,1fr)}.hero{align-items:flex-start;flex-direction:column}.toolbar{grid-template-columns:1fr}.modal-grid{grid-template-columns:1fr}.modal-media{min-height:330px}.modal-content{padding-right:0}.reader-shell{grid-template-columns:1fr;padding:20px}.reader-sidebar{padding:12px}.reader-sidebar p{margin-bottom:10px}.reader-thumbs{grid-template-columns:repeat(5,1fr);overflow:visible}.reader-thumb{display:block;padding:5px;text-align:center}.reader-thumb img{width:100%;height:58px}.reader-thumb span{display:none}.reader-stage{min-height:520px;padding:34px 58px 48px}.reader-page{height:min(61vh,520px)}}@media(max-width:560px){.wrap{width:min(100% - 22px,1440px)}.topbar-inner{grid-template-columns:1fr}.brand{width:100%;min-width:0}.cart-btn{width:100%}.book-grid{grid-template-columns:1fr}.summary{align-items:flex-start;flex-direction:column}.modal-grid{padding:22px}.modal-specs{grid-template-columns:1fr}.modal-media .book-cover{width:158px}}
      `}</style>
      <style>{`
        .anatomy-reader{width:min(1320px,calc(100vw - 34px));max-height:94vh;overflow:hidden;background:linear-gradient(135deg,#fffdf7 0%,#f8ead1 48%,#e3f2ee 100%)}
        .anatomy-split{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(380px,.92fr);height:min(88vh,850px);min-height:650px}
        .anatomy-pages{display:flex;min-width:0;flex-direction:column;padding:25px;border-right:1px solid color-mix(in srgb,var(--gold) 50%,var(--line));background:radial-gradient(circle at 50% 8%,#fffdf8 0%,#ead7b5 50%,#cbb48b 100%)}
        .anatomy-pages-head{display:flex;align-items:center;justify-content:space-between;gap:15px;margin:0 50px 16px 0}
        .anatomy-pages-head span{color:#624f2e;font-size:10px;font-weight:950;letter-spacing:.13em;text-transform:uppercase}
        .anatomy-pages-head b{padding:7px 11px;border:1px solid #ffffff9e;border-radius:99px;background:#ffffff9c;color:var(--deep);font-size:11px;box-shadow:0 8px 18px #5e471322}
        .anatomy-pages .reader-stage{flex:1;width:100%;min-height:0;padding:36px 68px 48px;background:radial-gradient(circle at 50% 4%,#fffef9,#ead7b3 54%,#cfb98e)}
        .anatomy-pages .reader-page{width:100%;height:100%;max-height:none;object-fit:contain}
        .anatomy-filmstrip{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:9px;margin-top:14px}
        .anatomy-thumb{position:relative;overflow:hidden;height:66px;padding:4px;border:1px solid #cdbb96;border-radius:12px;background:#fffaf0;opacity:.68;transition:transform .2s ease,opacity .2s ease,border-color .2s ease,box-shadow .2s ease}
        .anatomy-thumb img{width:100%;height:100%;border-radius:7px;object-fit:cover;object-position:top}
        .anatomy-thumb span{position:absolute;right:6px;bottom:5px;display:grid;width:20px;height:20px;place-items:center;border-radius:50%;background:#082f49dd;color:white;font-size:8px;font-weight:950}
        .anatomy-thumb:hover,.anatomy-thumb.active{transform:translateY(-3px);border-color:var(--green);opacity:1;box-shadow:0 10px 22px #2a231432,0 0 0 2px #ffffff inset}
        .anatomy-info{position:relative;overflow:auto;padding:46px 38px 34px;background:radial-gradient(circle at 100% 0,var(--section-glow),transparent 34%),linear-gradient(155deg,#fffefb,#fff7e8 68%,var(--section-soft))}
        .anatomy-info:before{position:absolute;inset:0;background:linear-gradient(120deg,#ffffff9e,transparent 35%,color-mix(in srgb,var(--gold) 16%,transparent));pointer-events:none;content:""}
        .anatomy-info>*{position:relative;z-index:1}.anatomy-info .modal-kicker{margin-bottom:14px}.anatomy-info h2{max-width:520px;margin:0;color:var(--deep);font-family:Georgia,serif;font-size:clamp(31px,3.4vw,50px);line-height:1.02}.anatomy-info .modal-desc{margin:14px 0;font-size:13px;line-height:1.7}
        .anatomy-edition{display:flex;align-items:center;gap:10px;margin:14px 0;color:#4f6258;font-size:12px;font-weight:800}.anatomy-edition:before{width:28px;height:1px;background:var(--gold);content:""}
        .anatomy-info .modal-price-row{display:block;margin:16px 0;padding:16px 18px;border-color:color-mix(in srgb,var(--gold) 52%,var(--line));background:linear-gradient(135deg,#fff,#fff8e8);box-shadow:0 14px 30px #5e471315,inset 0 1px 0 #fff}.anatomy-info .modal-price{font-size:34px}.anatomy-info .modal-add{display:flex;width:100%;min-height:52px;align-items:center;justify-content:center;margin-top:14px;background:linear-gradient(135deg,#0b746f,var(--deep));box-shadow:0 16px 30px var(--section-glow),inset 0 1px 0 #ffffff66;transition:transform .2s ease,box-shadow .2s ease}.anatomy-info .modal-add:hover{transform:translateY(-2px);box-shadow:0 20px 38px var(--section-glow),0 0 22px color-mix(in srgb,var(--gold) 34%,transparent)}
        .anatomy-specs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:18px}.anatomy-spec{position:relative;min-height:70px;padding:13px 13px 12px 17px;overflow:hidden;border:1px solid color-mix(in srgb,var(--gold) 38%,var(--line));border-radius:16px;background:linear-gradient(145deg,#ffffffed,#fff8e9c7);box-shadow:0 9px 22px #5e47130d,inset 0 1px 0 #fff}.anatomy-spec:before{position:absolute;top:12px;bottom:12px;left:0;width:3px;border-radius:0 4px 4px 0;background:linear-gradient(var(--gold),var(--green));content:""}.anatomy-spec span{display:block;color:#8a7047;font-size:8px;font-weight:950;letter-spacing:.11em;text-transform:uppercase}.anatomy-spec b{display:block;margin-top:6px;color:#183129;font-size:12px;line-height:1.35;overflow-wrap:anywhere}
        @media(max-width:900px){.anatomy-reader{max-height:94vh;overflow:auto}.anatomy-split{grid-template-columns:1fr;height:auto;min-height:0}.anatomy-pages{min-height:630px;border-right:0;border-bottom:1px solid var(--line)}.anatomy-info{padding:34px 26px}.anatomy-pages .reader-stage{min-height:470px}}
        @media(max-width:560px){.anatomy-reader{width:calc(100vw - 16px);border-radius:24px}.anatomy-pages{min-height:540px;padding:16px}.anatomy-pages-head{margin-right:46px}.anatomy-pages .reader-stage{min-height:390px;padding:32px 45px 44px}.anatomy-filmstrip{gap:5px}.anatomy-thumb{height:50px}.anatomy-info{padding:30px 19px}.anatomy-specs{grid-template-columns:1fr 1fr}.anatomy-info h2{font-size:34px}}

        /* Premium academic reader refinement — visual overrides only */
        .book-modal-overlay{background:radial-gradient(circle at 48% 22%,rgba(216,189,115,.09),transparent 34%),rgba(5,18,16,.76);backdrop-filter:blur(16px) saturate(.82)}
        .book-modal.anatomy-reader{border:1px solid rgba(205,180,121,.58);border-radius:30px;background:linear-gradient(145deg,#fffdf8 0%,#faf4e8 52%,#edf4f0 100%);box-shadow:0 34px 86px rgba(4,22,19,.38),0 9px 30px rgba(32,46,39,.22),inset 0 1px 0 rgba(255,255,255,.96),0 0 0 1px rgba(255,255,255,.28)}
        .book-modal.anatomy-reader:before{inset:0;border-radius:30px;background:linear-gradient(125deg,rgba(255,255,255,.58),transparent 31%,rgba(184,151,81,.055));box-shadow:inset 0 0 48px rgba(255,255,255,.16)}
        .anatomy-split{grid-template-columns:minmax(0,1.08fr) minmax(380px,.92fr)}
        .anatomy-pages{padding:26px;border-right:1px solid rgba(142,119,70,.22);background:radial-gradient(circle at 50% 5%,#fffef9 0%,#f0e7d5 48%,#d9caae 100%);box-shadow:inset -18px 0 42px rgba(73,59,30,.045)}
        .anatomy-pages-head{margin-bottom:17px}
        .anatomy-pages-head span{color:#665b47;font-size:9px;letter-spacing:.18em}
        .anatomy-pages-head b{padding:7px 12px;border:1px solid rgba(119,96,53,.2);border-radius:999px;background:rgba(255,253,247,.72);color:#183f38;font-size:10px;letter-spacing:.12em;box-shadow:0 7px 18px rgba(50,42,24,.09),inset 0 1px 0 rgba(255,255,255,.9);backdrop-filter:blur(8px)}
        .anatomy-pages .reader-stage{border:1px solid rgba(255,255,255,.68);border-radius:24px;background:radial-gradient(circle at 50% 5%,#fffefb 0%,#eee4d2 58%,#d3c19e 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.9),inset 0 -24px 58px rgba(64,48,19,.1),0 18px 42px rgba(62,49,25,.12)}
        .anatomy-pages .reader-stage:before{inset:18px;border-color:rgba(255,255,255,.64);box-shadow:inset 0 0 0 1px rgba(119,97,55,.035)}
        .anatomy-pages .reader-page{border:1px solid rgba(98,82,53,.13);border-radius:6px;filter:saturate(.97) contrast(1.015);box-shadow:-5px 7px 0 #eee7da,0 28px 62px rgba(42,35,20,.3),0 4px 12px rgba(42,35,20,.16),inset 0 0 0 1px rgba(255,255,255,.85)}
        .anatomy-pages .reader-nav{width:42px;height:42px;border:1px solid rgba(28,65,57,.16);background:rgba(255,253,247,.84);color:#17483f;font-size:20px;box-shadow:0 9px 22px rgba(27,44,38,.16),inset 0 1px 0 #fff;backdrop-filter:blur(10px);transition:transform .2s cubic-bezier(.2,.8,.2,1),background .2s ease,color .2s ease,box-shadow .2s ease}
        .anatomy-pages .reader-nav:not(:disabled):hover{background:#174f46;color:#fff;box-shadow:0 13px 28px rgba(12,61,52,.25);transform:translateY(-53%)}
        .anatomy-pages .reader-nav:not(:disabled):active{transform:translateY(-50%) scale(.94)}
        .anatomy-pages .reader-status{color:#685d48;letter-spacing:.13em}
        .anatomy-filmstrip{gap:10px}
        .anatomy-thumb{border-color:rgba(118,96,54,.22);border-radius:10px;background:#fffdf8;box-shadow:0 5px 14px rgba(45,36,20,.07);transition:transform .2s cubic-bezier(.2,.8,.2,1),opacity .2s ease,border-color .2s ease,box-shadow .2s ease}
        .anatomy-thumb:hover,.anatomy-thumb.active{border-color:#2e675c;box-shadow:0 10px 23px rgba(27,55,48,.15),0 0 0 1px rgba(255,255,255,.8) inset}
        .anatomy-info{padding:48px 40px 36px;background:radial-gradient(circle at 100% 0,rgba(31,102,88,.08),transparent 34%),linear-gradient(155deg,#fffefb 0%,#fbf6ec 69%,#eef4f1 100%);scrollbar-color:rgba(24,76,66,.32) transparent;scrollbar-width:thin}
        .anatomy-info:before{background:linear-gradient(122deg,rgba(255,255,255,.68),transparent 38%,rgba(184,151,81,.045))}
        .anatomy-info .modal-kicker{margin-bottom:13px;padding:6px 10px;border:1px solid rgba(23,79,69,.16);background:rgba(238,246,242,.82);color:#285e54;font-size:8px;letter-spacing:.16em;box-shadow:none}
        .anatomy-info h2{max-width:500px;color:#103f37;font-family:Georgia,'Times New Roman',serif;font-size:clamp(32px,3.25vw,47px);font-weight:600;letter-spacing:-.025em;line-height:1.03}
        .anatomy-info h2:before{display:block;margin-bottom:9px;color:#48756c;font-family:Inter,ui-sans-serif,system-ui,sans-serif;font-size:9px;font-weight:900;letter-spacing:.2em;line-height:1;text-transform:uppercase;content:'Applied Anatomy'}
        .anatomy-info .modal-author{margin-top:12px;color:#738079;font-size:12px;font-weight:500}
        .anatomy-info .modal-author::first-line{line-height:1.5}
        .anatomy-edition{gap:9px;margin:13px 0;color:#557168;font-size:9px;font-weight:850;letter-spacing:.13em;text-transform:uppercase}
        .anatomy-edition:before{width:22px;background:#b99a57}
        .anatomy-info .modal-rating{margin-top:1px;padding:7px 10px;border:1px solid rgba(180,145,69,.3);border-radius:10px;background:rgba(255,249,231,.72);color:#604b23;font-size:11px;box-shadow:inset 0 1px 0 #fff,0 5px 14px rgba(91,70,25,.055)}
        .anatomy-info .modal-rating span{color:#746c5c;font-size:10px;font-weight:700}
        .anatomy-info .modal-desc{max-width:570px;margin:17px 0;color:#4c5b55;font-size:13px;line-height:1.78}
        .anatomy-info .modal-price-row{margin:18px 0;padding:18px;border:1px solid rgba(166,133,66,.24);border-radius:17px;background:linear-gradient(140deg,rgba(255,255,255,.92),rgba(251,246,234,.9));box-shadow:0 14px 32px rgba(69,55,27,.075),inset 0 1px 0 #fff}
        .anatomy-info .modal-price{color:#103f37;font-size:36px;font-weight:700;letter-spacing:-.025em}
        .anatomy-info .modal-mrp{color:#919991;font-size:12px}
        .anatomy-info .modal-save{margin-top:7px;padding:5px 8px;border:1px solid rgba(27,100,83,.14);border-radius:7px;background:#e7f2ed;color:#1a6555;font-size:8px;letter-spacing:.07em}
        .anatomy-info .modal-add{min-height:50px;margin-top:16px;border:1px solid rgba(255,255,255,.16);border-radius:13px;background:linear-gradient(145deg,#176458,#0d453d);font-size:10px;letter-spacing:.1em;box-shadow:0 13px 27px rgba(10,69,59,.21),inset 0 1px 0 rgba(255,255,255,.2);transition:transform .2s cubic-bezier(.2,.8,.2,1),box-shadow .2s ease,filter .2s ease}
        .anatomy-info .modal-add:hover{transform:translateY(-2px);filter:brightness(1.035);box-shadow:0 18px 34px rgba(10,69,59,.27),inset 0 1px 0 rgba(255,255,255,.24)}
        .anatomy-info .modal-add:active{transform:translateY(0) scale(.985)}
        .anatomy-specs{gap:9px;margin-top:17px}
        .anatomy-spec{min-height:68px;padding:13px 13px 12px 16px;border:1px solid rgba(161,137,90,.2);border-radius:12px;background:linear-gradient(145deg,rgba(255,255,255,.88),rgba(250,246,236,.76));box-shadow:0 7px 18px rgba(64,50,24,.045),inset 0 1px 0 #fff;transition:transform .2s cubic-bezier(.2,.8,.2,1),border-color .2s ease,box-shadow .2s ease}
        .anatomy-spec:before{top:14px;bottom:14px;width:2px;background:linear-gradient(#b89a59,#24685b)}
        .anatomy-spec:hover{transform:translateY(-2px);border-color:rgba(33,98,85,.28);box-shadow:0 11px 24px rgba(43,60,52,.075),inset 0 1px 0 #fff}
        .anatomy-spec span{color:#81735a;font-size:7px;letter-spacing:.15em}
        .anatomy-spec b{margin-top:7px;color:#193a33;font-size:11px;font-weight:750;line-height:1.4}
        .anatomy-reader .modal-close{width:38px;height:38px;border:1px solid rgba(108,89,52,.2);background:rgba(255,253,247,.83);color:#244b43;font-size:20px;box-shadow:0 8px 20px rgba(37,42,35,.13),inset 0 1px 0 #fff;backdrop-filter:blur(10px);transition:transform .2s cubic-bezier(.2,.8,.2,1),background .2s ease,box-shadow .2s ease}
        .anatomy-reader .modal-close:hover{transform:rotate(8deg) scale(1.05);background:#fffdf8;box-shadow:0 12px 26px rgba(37,42,35,.18)}
        .anatomy-reader .modal-close:active{transform:rotate(3deg) scale(.95)}
        @media(max-width:900px){.book-modal.anatomy-reader{border-radius:26px}.anatomy-info{padding:38px 28px}.anatomy-info h2{font-size:38px}.anatomy-specs{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media(max-width:560px){.anatomy-pages{padding:16px}.anatomy-info{padding:32px 19px}.anatomy-info h2{font-size:32px}.anatomy-info .modal-price-row{padding:15px}.anatomy-info .modal-add{padding:0 14px;font-size:9px}.anatomy-specs{grid-template-columns:1fr}.anatomy-spec{min-height:62px}}

        /* Premium catalogue masthead */
        .catalogue-masthead{position:relative;isolation:isolate;overflow:hidden;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:end;gap:32px;min-height:310px;margin:24px 0 20px;padding:clamp(34px,5vw,68px);border:1px solid color-mix(in srgb,var(--gold) 68%,white);border-radius:42px;color:#fff;background:radial-gradient(circle at 82% 18%,color-mix(in srgb,var(--gold) 42%,transparent),transparent 28%),radial-gradient(circle at 12% 112%,color-mix(in srgb,var(--green) 75%,transparent),transparent 42%),linear-gradient(128deg,#071b19 0%,var(--deep) 54%,color-mix(in srgb,var(--deep) 72%,#121827) 100%);box-shadow:0 42px 90px rgba(16,22,19,.3),0 14px 30px rgba(26,22,14,.16),inset 0 1px 0 rgba(255,255,255,.2),inset 0 -40px 90px rgba(0,0,0,.16),0 0 60px color-mix(in srgb,var(--gold) 18%,transparent)}
        .catalogue-masthead:before{position:absolute;inset:1px;border-radius:41px;background:linear-gradient(128deg,rgba(255,255,255,.12),transparent 28%,transparent 68%,color-mix(in srgb,var(--gold) 14%,transparent));pointer-events:none;content:""}
        .catalogue-masthead:after{position:absolute;right:-80px;top:-150px;width:390px;height:390px;border:1px solid color-mix(in srgb,var(--gold) 35%,transparent);border-radius:50%;box-shadow:0 0 0 48px rgba(255,255,255,.025),0 0 0 96px rgba(255,255,255,.018);content:""}
        .masthead-copy,.masthead-details{position:relative;z-index:2}.masthead-copy{max-width:880px}.masthead-kicker{display:flex;align-items:center;gap:10px;margin:0 0 19px;color:color-mix(in srgb,var(--gold) 78%,white);font-size:10px;font-weight:950;letter-spacing:.22em;text-transform:uppercase}.masthead-kicker span{width:28px;height:1px;background:var(--gold);box-shadow:0 0 12px var(--gold)}
        .catalogue-masthead h1{max-width:820px;margin:0;color:#fffdf7;font-family:Georgia,'Times New Roman',serif;font-size:clamp(43px,6vw,82px);font-weight:500;letter-spacing:-.055em;line-height:.92;text-wrap:balance;text-shadow:0 15px 35px rgba(0,0,0,.24)}.catalogue-masthead h1 em{display:block;color:color-mix(in srgb,var(--gold) 82%,#fff5ce);font-weight:500}.masthead-lead{max-width:680px;margin:23px 0 0;color:rgba(242,244,238,.7);font-size:clamp(12px,1.2vw,15px);line-height:1.75}
        .masthead-details{display:grid;min-width:175px;border:1px solid rgba(255,255,255,.14);border-radius:24px;background:linear-gradient(145deg,rgba(255,255,255,.12),rgba(255,255,255,.045));box-shadow:0 18px 38px rgba(0,0,0,.18),inset 0 1px 0 rgba(255,255,255,.15);backdrop-filter:blur(16px)}.masthead-details div{display:grid;gap:2px;padding:17px 20px;border-bottom:1px solid rgba(255,255,255,.1)}.masthead-details div:last-child{border-bottom:0}.masthead-details strong{color:#fff8e8;font-family:Georgia,serif;font-size:25px;font-weight:500}.masthead-details span{color:rgba(255,255,255,.56);font-size:8px;font-weight:900;letter-spacing:.13em;text-transform:uppercase}.masthead-signature{position:absolute;right:19%;bottom:-42px;z-index:0;color:rgba(255,255,255,.025);font-family:Georgia,serif;font-size:220px;font-weight:900;line-height:1;letter-spacing:-.12em;transform:rotate(-8deg)}
        .masthead-orbit{position:absolute;right:19%;top:27%;z-index:1;width:110px;height:110px;border:1px solid color-mix(in srgb,var(--gold) 30%,transparent);border-radius:50%;animation:masthead-orbit 18s linear infinite}.masthead-orbit:before,.masthead-orbit:after{position:absolute;inset:18px;border:1px solid rgba(255,255,255,.1);border-radius:50%;content:""}.masthead-orbit:after{inset:38px;background:var(--gold);border:0;box-shadow:0 0 30px color-mix(in srgb,var(--gold) 65%,transparent)}.masthead-orbit span{position:absolute;width:6px;height:6px;border-radius:50%;background:#fff4cf;box-shadow:0 0 12px var(--gold)}.masthead-orbit span:first-child{left:12px;top:12px}.masthead-orbit span:nth-child(2){right:-3px;top:53px}.masthead-orbit span:last-child{left:39px;bottom:-3px}@keyframes masthead-orbit{to{transform:rotate(360deg)}}
        @media(max-width:900px){.catalogue-masthead{grid-template-columns:1fr;align-items:start;min-height:0}.masthead-details{grid-template-columns:repeat(3,1fr);width:100%}.masthead-details div{border-right:1px solid rgba(255,255,255,.1);border-bottom:0}.masthead-details div:last-child{border-right:0}.masthead-orbit{right:9%;top:18%}}
        @media(max-width:560px){.catalogue-masthead{margin-top:12px;padding:34px 24px;border-radius:28px}.catalogue-masthead:before{border-radius:27px}.catalogue-masthead h1{font-size:clamp(39px,13vw,56px)}.masthead-lead{margin-top:18px}.masthead-details{grid-template-columns:1fr;min-width:0}.masthead-details div{grid-template-columns:55px 1fr;align-items:center;padding:12px 16px;border-right:0;border-bottom:1px solid rgba(255,255,255,.1)}.masthead-details div:last-child{border-bottom:0}.masthead-details strong{font-size:20px}.masthead-orbit{display:none}.masthead-signature{right:-15px;font-size:160px}}

        /* Unified premium catalogue layout */
        .shop-page{padding-bottom:56px}
        .content{display:flex;min-width:0;flex-direction:column}
        .hero{min-height:190px;padding:34px 38px;border-radius:30px}
        .hero>div:first-child{max-width:780px}
        .hero p:last-child{max-width:720px}
        .toolbar{min-height:72px;align-items:center;padding:16px 18px;border-color:color-mix(in srgb,var(--gold) 32%,var(--line));border-radius:22px;background:linear-gradient(135deg,#ffffffed,#fffaf1e8);box-shadow:0 13px 32px #2a23140d,inset 0 1px 0 #fff}
        .filters{align-items:center}
        .chip{min-height:38px;padding:0 14px;border-color:color-mix(in srgb,var(--gold) 28%,var(--line));background:linear-gradient(180deg,#fff,#fffaf1);transition:transform .2s ease,border-color .2s ease,background .2s ease,box-shadow .2s ease}
        .chip:hover{transform:translateY(-2px);border-color:color-mix(in srgb,var(--green) 48%,var(--gold));box-shadow:0 8px 17px var(--section-glow)}
        .chip.active{border-color:var(--green);background:linear-gradient(135deg,var(--green),var(--deep));box-shadow:0 9px 20px var(--section-glow),inset 0 1px 0 #ffffff42}
        .sort{min-width:160px;min-height:42px;padding:0 16px;border-color:color-mix(in srgb,var(--gold) 34%,var(--line));box-shadow:inset 0 1px 0 #fff}
        .summary{min-height:58px;padding:13px 18px;border-color:color-mix(in srgb,var(--gold) 28%,var(--line));border-radius:19px;background:linear-gradient(135deg,#fffdf9,#fff9ed);box-shadow:0 10px 24px #2a231409,inset 0 1px 0 #fff}
        .book-grid{grid-auto-rows:1fr;align-items:stretch;gap:20px}
        .card{display:flex;height:100%;min-height:590px;flex-direction:column;border-radius:30px}
        .media{flex:0 0 280px;min-height:280px;padding:34px 16px}
        .media .book-cover{width:150px}
        .copy{position:relative;z-index:1;display:flex;min-height:308px;flex:1;flex-direction:column;padding:18px}
        .meta{align-items:center;min-height:25px;align-self:flex-start;padding:6px 9px;background:color-mix(in srgb,var(--section-soft) 76%,white);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .card .copy h3{display:-webkit-box;min-height:44px;margin:11px 0 6px;overflow:hidden;font-size:18px;line-height:1.2;-webkit-box-orient:vertical;-webkit-line-clamp:2}
        .author{min-height:30px;line-height:1.45}
        .card-glance{min-height:89px;margin-top:auto;padding-top:15px}
        .details-hint{max-width:88px;justify-content:flex-end;text-align:right;line-height:1.35}
        .details-hint b{flex:0 0 25px}
        .card-cart{min-height:55px;align-items:flex-end;margin-top:13px;padding-top:13px}
        .card-cart .add{min-height:44px}
        .card-cart .qty{min-height:42px;align-items:center}
        .card-cart .qty button{height:40px}
        .card:has(.media:hover),.card:has(.media:focus-visible){transform:translateY(-9px);box-shadow:0 34px 74px #2a231432,0 0 42px var(--section-glow),0 0 0 1px #ffffff inset}
        .category-list{grid-auto-rows:1fr}
        .category-btn{min-height:66px}
        .category-btn strong{line-height:1.25}
        .empty{min-height:320px;place-content:center}

        @media(max-width:1180px){.card{min-height:580px}.media{flex-basis:270px;min-height:270px}.copy{min-height:308px}}
        @media(max-width:920px){.hero{min-height:210px}.book-grid{gap:18px}.card{min-height:575px}.media{flex-basis:268px;min-height:268px}}
        @media(max-width:680px){.book-grid{grid-template-columns:1fr}.card{width:min(100%,430px);min-height:0;margin-inline:auto}.media{flex-basis:300px;min-height:300px}.media .book-cover{width:164px}.copy{min-height:300px}.toolbar{padding:14px}.sort{width:100%}}
        @media(max-width:560px){.shop-page{padding-bottom:34px}.hero{min-height:0;padding:26px 22px;border-radius:25px}.hero .premium-icon{width:72px;height:72px;border-radius:24px}.toolbar{border-radius:18px}.chip{min-height:36px;padding:0 11px}.summary{min-height:0}.card{border-radius:26px}.media{flex-basis:270px;min-height:270px}.copy{min-height:294px;padding:16px}.card .copy h3{font-size:19px}.category-btn{min-height:62px}}

        /* Signature depth system */
        .shop-page{background-attachment:fixed}
        .topbar-inner,.sidebar,.hero,.toolbar,.summary,.card{transform:translateZ(0)}
        .topbar-inner{border-color:color-mix(in srgb,var(--gold) 56%,white);box-shadow:0 28px 70px rgba(37,29,15,.14),0 8px 22px rgba(37,29,15,.07),inset 0 1px 0 #fff,0 0 42px color-mix(in srgb,var(--gold) 16%,transparent)}
        .sidebar{border-color:color-mix(in srgb,var(--gold) 34%,var(--line));box-shadow:0 28px 64px rgba(35,29,18,.12),0 8px 20px rgba(35,29,18,.06),inset 0 1px 0 #fff}
        .hero{border-color:color-mix(in srgb,var(--gold) 50%,var(--green));box-shadow:0 34px 80px rgba(37,29,15,.16),0 10px 25px rgba(37,29,15,.08),inset 0 1px 0 #fff,0 0 58px var(--section-glow)}
        .hero:after{box-shadow:0 0 70px color-mix(in srgb,var(--gold) 25%,transparent)}
        .card{border-color:color-mix(in srgb,var(--gold) 72%,#e5d4ad);box-shadow:0 30px 68px rgba(42,35,20,.16),0 9px 22px rgba(42,35,20,.08),inset 0 1px 0 #fff,0 0 36px color-mix(in srgb,var(--gold) 12%,transparent)}
        .card:before{background:linear-gradient(130deg,rgba(255,255,255,.92),transparent 31%,color-mix(in srgb,var(--gold) 19%,transparent)),radial-gradient(circle at 14% 0,#fff 0 6%,transparent 24%),linear-gradient(90deg,color-mix(in srgb,var(--gold) 14%,transparent),transparent 15%,transparent 84%,color-mix(in srgb,var(--green) 10%,transparent))}
        .media{overflow:hidden;border-bottom:1px solid color-mix(in srgb,var(--gold) 25%,transparent)}
        .media:before{box-shadow:inset 0 1px 0 #fff,inset 0 -28px 45px rgba(93,67,20,.055)}
        .media .book-cover{filter:drop-shadow(0 8px 10px rgba(31,26,17,.12))}
        .card-facts{display:grid;grid-template-columns:1.05fr 1fr .82fr;gap:6px;margin-top:13px}
        .card-facts>span{display:flex;min-width:0;min-height:46px;flex-direction:column;justify-content:center;padding:7px 8px;border:1px solid color-mix(in srgb,var(--gold) 27%,var(--line));border-radius:11px;background:linear-gradient(145deg,rgba(255,255,255,.92),rgba(255,249,237,.78));box-shadow:inset 0 1px 0 #fff,0 5px 12px rgba(65,50,23,.045)}
        .card-facts small{overflow:hidden;color:#8a795d;font-size:7px;font-weight:900;letter-spacing:.07em;text-overflow:ellipsis;text-transform:uppercase;white-space:nowrap}
        .card-facts b{display:block;overflow:hidden;margin-top:4px;color:#294038;font-size:9px;line-height:1.2;text-overflow:ellipsis;white-space:nowrap}
        .card-facts .card-rating b{color:#a06d18}
        .card-glance{min-height:82px}
        .copy{min-height:365px}
        .card{min-height:650px}
        .category-btn{box-shadow:0 12px 27px rgba(42,35,20,.075),inset 0 1px 0 #fff}
        .category-btn.active{box-shadow:0 20px 40px var(--section-glow),0 8px 18px rgba(35,29,18,.08),inset 0 1px 0 #fff,0 0 24px color-mix(in srgb,var(--gold) 20%,transparent)}
        .view,.add,.cart-btn,.modal-add{will-change:transform}
        @media(max-width:1180px){.card{min-height:640px}.copy{min-height:362px}}
        @media(max-width:680px){.card{min-height:0}.copy{min-height:350px}}
        @media(max-width:380px){.card-facts{grid-template-columns:1fr 1fr}.card-facts>span:last-child{grid-column:1/-1}}

        /* Editorial luxury finish */
        .catalogue-masthead{min-height:350px;border-color:color-mix(in srgb,var(--gold) 78%,#fff);background:radial-gradient(circle at 76% 20%,color-mix(in srgb,var(--gold) 34%,transparent),transparent 19%),radial-gradient(circle at 95% 110%,color-mix(in srgb,var(--green) 70%,transparent),transparent 38%),linear-gradient(118deg,#041412 0%,var(--deep) 56%,#101b28 100%)}
        .catalogue-masthead:before{background:linear-gradient(115deg,rgba(255,255,255,.14),transparent 27%),repeating-linear-gradient(90deg,transparent 0 79px,rgba(255,255,255,.025) 80px),repeating-linear-gradient(0deg,transparent 0 79px,rgba(255,255,255,.02) 80px)}
        .catalogue-masthead:after{right:clamp(150px,18vw,280px);top:50%;width:1px;height:70%;border:0;border-radius:0;background:linear-gradient(transparent,color-mix(in srgb,var(--gold) 72%,white),transparent);box-shadow:34px 0 0 rgba(255,255,255,.055),68px 0 0 rgba(255,255,255,.035);transform:translateY(-50%)}
        .masthead-copy{padding-left:22px;border-left:1px solid color-mix(in srgb,var(--gold) 64%,transparent)}
        .masthead-kicker{margin-bottom:23px}.masthead-lead{color:rgba(244,244,238,.76)}
        .masthead-details{overflow:hidden;border-color:color-mix(in srgb,var(--gold) 28%,transparent);background:linear-gradient(145deg,rgba(255,255,255,.13),rgba(255,255,255,.045));box-shadow:0 24px 55px rgba(0,0,0,.25),inset 0 1px 0 rgba(255,255,255,.2)}
        .masthead-details div{position:relative}.masthead-details div:before{position:absolute;left:0;top:17px;bottom:17px;width:2px;background:linear-gradient(var(--gold),transparent);content:""}
        .masthead-signature{display:none!important}
        .topbar{padding-top:8px;background:linear-gradient(180deg,rgba(247,241,231,.94),rgba(247,241,231,.72));border-radius:0 0 30px 30px}
        .topbar-inner{padding:10px 12px;border-radius:24px;background:linear-gradient(135deg,rgba(255,255,255,.96),rgba(255,250,240,.93) 58%,color-mix(in srgb,var(--section-soft) 72%,white))}
        .brand{border-radius:16px}.search{border-radius:16px}.cart-btn{border-radius:15px;transition:transform .2s ease,filter .2s ease,box-shadow .2s ease}.cart-btn:hover{transform:translateY(-2px);filter:brightness(1.05);box-shadow:0 17px 31px var(--section-glow)}
        .sidebar{border-radius:28px;background:linear-gradient(165deg,#fff 0%,#fffaf0 66%,color-mix(in srgb,var(--section-soft) 72%,white) 100%)}
        .side-head{padding-bottom:13px;border-bottom:1px solid color-mix(in srgb,var(--gold) 30%,var(--line))}.side-head h1{letter-spacing:-.035em}
        .side-head button{border-radius:10px;transition:transform .2s ease,border-color .2s ease}.side-head button:hover{transform:translateY(-2px);border-color:var(--gold)}
        .category-btn{border-radius:16px}.category-btn:after{position:absolute;top:50%;right:9px;width:4px;height:4px;border-radius:50%;background:var(--gold);box-shadow:0 0 12px var(--gold);opacity:0;transform:translateY(-50%);transition:opacity .2s ease;content:""}.category-btn.active:after,.category-btn:hover:after{opacity:1}
        .hero{overflow:visible;padding-left:45px;border-radius:28px}.hero:before{inset:8px;border:1px solid rgba(255,255,255,.62);border-radius:21px}.hero:after{right:28px;top:auto;bottom:-7px;width:36%;height:3px;border-radius:99px;background:linear-gradient(90deg,transparent,var(--gold),transparent);opacity:.75}
        .eyebrow{display:flex;align-items:center;gap:9px}.eyebrow:before{width:24px;height:1px;background:var(--gold);content:""}
        .toolbar,.summary{backdrop-filter:blur(14px)}.toolbar{border-radius:18px}.chip,.sort{border-radius:11px}.chip.active{transform:translateY(-1px)}
        .summary b{margin:0 3px;color:var(--green)}
        .card{overflow:visible;border-radius:24px}.card:before{overflow:hidden;border-radius:23px}.card:after{bottom:-13px}
        .media{overflow:hidden;border-radius:23px 23px 0 0}.media:before{inset:12px;border-radius:17px}.badge,.save{top:15px}.badge{left:15px}.save{right:15px}
        .copy{background:linear-gradient(180deg,rgba(255,255,255,.28),rgba(255,252,246,.78));border-radius:0 0 23px 23px}
        .meta{border:1px solid color-mix(in srgb,var(--green) 13%,transparent);border-radius:8px}.card-facts>span{border-radius:9px}
        .off,.modal-save{border-radius:7px}.view,.add{border-radius:11px}.card-cart .add{position:relative;overflow:hidden}.card-cart .add:after,.modal-add:after{position:absolute;inset:0;background:linear-gradient(105deg,transparent 30%,rgba(255,255,255,.22) 48%,transparent 66%);transform:translateX(-120%);transition:transform .55s ease;content:""}.card-cart .add:hover:after,.modal-add:hover:after{transform:translateX(120%)}
        .drawer{border-left:1px solid color-mix(in srgb,var(--gold) 48%,var(--line));background:linear-gradient(160deg,#fffdf8,#f8f1e4)}.drawer-head{background:rgba(255,255,255,.64);backdrop-filter:blur(12px)}
        .empty{border-color:color-mix(in srgb,var(--gold) 58%,var(--line));background:radial-gradient(circle at top,var(--section-soft),transparent 54%),#fffdf9;box-shadow:inset 0 1px 0 #fff,0 18px 45px rgba(42,35,20,.08)}
        @media(max-width:900px){.catalogue-masthead:after{display:none}.masthead-copy{padding-left:17px}.hero{padding-left:34px}}
        @media(max-width:560px){.catalogue-masthead{min-height:0}.masthead-copy{padding-left:14px}.hero{padding-left:25px}.topbar{border-radius:0 0 22px 22px}}
        @media(prefers-reduced-motion:reduce){.card,.book-cover,.category-btn,.chip,.view,.add,.cart-btn,.modal-add{transition:none!important}}

        /* ===== Couture finish — a distinctive, out-of-the-box premium layer ===== */
        .shop-page{position:relative;overflow-x:clip}
        .shop-page:before{position:fixed;inset:0;z-index:0;pointer-events:none;background:radial-gradient(ellipse 60% 40% at 12% -4%,color-mix(in srgb,var(--gold) 22%,transparent),transparent 60%),radial-gradient(ellipse 50% 38% at 92% 6%,color-mix(in srgb,var(--green) 20%,transparent),transparent 62%);mix-blend-mode:multiply;opacity:.5;content:""}
        .shop-page>.wrap{position:relative;z-index:1}

        /* Luxe aurora line under the sticky bar */
        .topbar{border-bottom:0}
        .topbar:after{position:absolute;left:0;right:0;bottom:0;height:2px;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--gold) 85%,#fff) 20%,var(--green) 50%,color-mix(in srgb,var(--gold) 85%,#fff) 80%,transparent);opacity:.75;filter:drop-shadow(0 1px 6px color-mix(in srgb,var(--gold) 50%,transparent));content:""}

        /* Masthead — kinetic, editorial, gold-foil */
        .catalogue-masthead{isolation:isolate}
        .catalogue-masthead h1 em{position:relative;background:linear-gradient(100deg,color-mix(in srgb,var(--gold) 70%,#fff) 0%,#fff6d2 24%,color-mix(in srgb,var(--gold) 92%,#fff) 48%,#fffbe9 72%,color-mix(in srgb,var(--gold) 72%,#fff) 100%);background-size:220% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:foil-sweep 7s ease-in-out infinite}
        @keyframes foil-sweep{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        .masthead-kicker span{position:relative;overflow:hidden}
        .masthead-details div{transition:transform .3s cubic-bezier(.16,1,.3,1),background .3s ease}
        .masthead-details div:hover{transform:translateY(-3px);background:linear-gradient(145deg,rgba(255,255,255,.2),rgba(255,255,255,.06))}
        .masthead-details strong{background:linear-gradient(180deg,#fff,color-mix(in srgb,var(--gold) 60%,#fff));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}

        /* Hero — floating serif title with gold rule and parallax orb */
        .hero h2{position:relative;background:linear-gradient(180deg,var(--deep),color-mix(in srgb,var(--deep) 72%,var(--green)));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:-.03em}
        .hero .premium-icon{animation:float-soft 6s ease-in-out infinite}
        @keyframes float-soft{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}

        /* Category rail — refined index feel */
        .side-head h1{position:relative;background:linear-gradient(180deg,var(--deep),color-mix(in srgb,var(--green) 80%,var(--deep)));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
        .category-btn{backdrop-filter:blur(2px)}
        .category-btn.active{transform:translateX(6px)}
        .category-btn.active strong{color:var(--deep)}
        .category-btn span{padding:3px 8px;border-radius:999px;background:color-mix(in srgb,var(--section-soft) 70%,#fff);color:#5a6a62}

        /* Chips — glass pills with ink-fill active state */
        .chip{backdrop-filter:blur(8px);letter-spacing:.02em}
        .chip.active{color:#fff;text-shadow:0 1px 1px rgba(0,0,0,.18)}

        /* Book cards — gallery pedestal, gold corner ticks, lift choreography */
        .card{transition:transform .4s cubic-bezier(.16,1,.3,1),box-shadow .4s ease,border-color .4s ease}
        .card:has(.media:hover),.card:has(.media:focus-visible){transform:translateY(-12px) rotate(-.25deg)}
        .copy h3{transition:color .3s ease}
        .card:has(.media:hover) .copy h3{color:var(--green)}
        .media .book-cover{transition:transform .45s cubic-bezier(.16,1,.3,1),box-shadow .45s ease,filter .45s ease}
        .media:hover .book-cover,.media:focus-visible .book-cover{transform:rotate(-2.2deg) translateY(-12px) scale(1.07)}
        .save{background:linear-gradient(135deg,#0f8a5c,#0b6f49);box-shadow:0 8px 18px rgba(10,80,54,.3),inset 0 1px 0 rgba(255,255,255,.3)}
        .badge{background:linear-gradient(135deg,#fbe6a6,#eccb73);color:#4a3608;box-shadow:0 8px 16px rgba(120,92,20,.22),inset 0 1px 0 #fff}

        /* Price — serif numerals with gilt discount tag */
        .price{letter-spacing:-.02em}
        .off{background:linear-gradient(135deg,#0f8a5c,#0b6f49);box-shadow:0 6px 14px rgba(10,80,54,.28),inset 0 1px 0 rgba(255,255,255,.25)}

        /* Add button — gilded sheen already present; add soft press */
        .card-cart .add,.modal-add,.cart-btn{position:relative}
        .card-cart .add:active,.modal-add:active,.cart-btn:active{transform:translateY(0) scale(.98)}

        /* Modal — museum spotlight */
        .book-modal-overlay{background:radial-gradient(circle at 50% 24%,color-mix(in srgb,var(--gold) 14%,transparent),transparent 36%),rgba(5,18,16,.74);backdrop-filter:blur(14px) saturate(.9)}
        .modal-content h2{background:linear-gradient(180deg,var(--deep),color-mix(in srgb,var(--deep) 72%,var(--green)));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:-.03em}

        /* Drawer — boutique receipt */
        .drawer-foot .total:last-child b{color:#0f8a5c}

        @media(prefers-reduced-motion:reduce){.catalogue-masthead h1 em,.hero .premium-icon{animation:none!important}}

        /* ===== Atelier signature — the final distinctive premium layer ===== */
        /* Fine engraved grain across the whole canvas for a printed, tactile feel */
        .shop-page:after{position:fixed;inset:0;z-index:0;pointer-events:none;opacity:.5;mix-blend-mode:soft-light;background-image:repeating-linear-gradient(135deg,rgba(120,96,52,.05) 0 1px,transparent 1px 3px),repeating-linear-gradient(45deg,rgba(7,91,89,.035) 0 1px,transparent 1px 3px);content:""}

        /* Masthead — slow drifting constellation of gold motes + hairline frame inset */
        .catalogue-masthead{box-shadow:0 48px 100px rgba(16,22,19,.34),0 16px 34px rgba(26,22,14,.18),inset 0 0 0 1px rgba(255,255,255,.08),inset 0 1px 0 rgba(255,255,255,.22),inset 0 -46px 100px rgba(0,0,0,.2),0 0 70px color-mix(in srgb,var(--gold) 20%,transparent)}
        .catalogue-masthead h1{position:relative}
        .masthead-copy:before{position:absolute;left:-2px;top:-14px;color:color-mix(in srgb,var(--gold) 70%,#fff);font-family:Georgia,serif;font-size:46px;line-height:0;opacity:.5;content:"\u201C"}
        .masthead-kicker:after{flex:1;height:1px;max-width:120px;background:linear-gradient(90deg,color-mix(in srgb,var(--gold) 60%,transparent),transparent);content:""}
        .masthead-details div{position:relative;overflow:hidden}
        .masthead-details div:after{position:absolute;inset:0;background:linear-gradient(115deg,transparent 40%,rgba(255,255,255,.14) 50%,transparent 60%);transform:translateX(-130%);transition:transform .7s cubic-bezier(.16,1,.3,1);content:""}
        .masthead-details div:hover:after{transform:translateX(130%)}

        /* Topbar — a slim gilt wordmark badge replacing the removed watermark vibe */
        .brand{position:relative;overflow:hidden}
        .brand:after{position:absolute;inset:0;background:linear-gradient(115deg,transparent 42%,rgba(255,255,255,.4) 50%,transparent 58%);transform:translateX(-130%);content:""}
        .brand:hover:after{transform:translateX(130%);transition:transform .6s ease}
        .brand-copy strong{background:linear-gradient(180deg,var(--deep),color-mix(in srgb,var(--green) 70%,var(--deep)));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}

        /* Hero — a quiet laurel underline flourish beneath the eyebrow */
        .hero{position:relative}
        .hero .eyebrow:after{flex:1;height:1px;max-width:60px;background:linear-gradient(90deg,color-mix(in srgb,var(--gold) 70%,transparent),transparent);content:""}

        /* Sidebar — refined ledger index with a left gilt spine */
        .sidebar{position:sticky}
        .side-head h1:after{display:block;width:34px;height:2px;margin-top:7px;border-radius:2px;background:linear-gradient(90deg,var(--gold),transparent);content:""}
        .category-btn strong{transition:letter-spacing .3s ease}
        .category-btn.active strong{letter-spacing:.01em}

        /* Chips — crisp uppercase micro-tracking */
        .chip{letter-spacing:.04em;text-transform:uppercase;font-size:10px}

        /* Book cards — gallery plinth, gilt corner brackets, parallax cover glow */
        .card{position:relative}
        .card:has(.media:hover){transform:translateY(-14px) rotate(-.3deg) scale(1.004)}
        .media:before{background:linear-gradient(135deg,rgba(255,255,255,.5),transparent 54%,color-mix(in srgb,var(--gold) 18%,transparent));transition:box-shadow .4s ease}
        .media:hover:before,.media:focus-visible:before{box-shadow:inset 0 1px 0 #fff,inset 0 -28px 50px rgba(93,67,20,.1),0 0 0 1px color-mix(in srgb,var(--gold) 40%,transparent)}
        /* gilt corner brackets on the cover frame */
        .media .book-cover{box-shadow:-12px 0 18px -10px #000 inset,14px 15px 0 -4px #2a231421,0 30px 54px -10px #2a23148a,0 0 0 1px color-mix(in srgb,var(--accent) 74%,transparent),0 0 34px color-mix(in srgb,var(--accent) 30%,transparent)}
        .copy h3{position:relative}
        .card-facts>span{transition:transform .25s cubic-bezier(.16,1,.3,1),border-color .25s ease,box-shadow .25s ease}
        .card:has(.media:hover) .card-facts>span{border-color:color-mix(in srgb,var(--gold) 40%,var(--line))}
        .card-rating b{letter-spacing:.01em}

        /* Price — gilt rupee flourish */
        .price:before{margin-right:1px;color:color-mix(in srgb,var(--gold) 80%,var(--deep));content:""}
        .card-cart .add{letter-spacing:.07em}

        /* Modal — a thin gold reveal ring that breathes once on open */
        .book-modal{animation:modal-rise .5s cubic-bezier(.16,1,.3,1)}
        @keyframes modal-rise{from{opacity:0;transform:translateY(18px) scale(.985)}to{opacity:1;transform:none}}
        .modal-add{letter-spacing:.09em}

        /* Cart drawer — boutique slip-in */
        .drawer{animation:drawer-slide .42s cubic-bezier(.16,1,.3,1)}
        @keyframes drawer-slide{from{transform:translateX(40px);opacity:.4}to{transform:none;opacity:1}}
        .drawer-head h2:after{display:block;width:30px;height:2px;margin-top:6px;border-radius:2px;background:linear-gradient(90deg,var(--gold),transparent);content:""}

        @media(prefers-reduced-motion:reduce){.book-modal,.drawer,.masthead-details div:after{animation:none!important;transition:none!important}}

        /* ===== Vijayam Publishing House system — restrained premium catalogue override ===== */
        .shop-page{
          --green:#075B59;--deep:#063D3B;--gold:#B89446;--paper:#FBFAF7;--ink:#15221E;--muted:#69756F;--line:#ded7ca;
          overflow-x:hidden;
          background:
            radial-gradient(circle at 12% -8%,rgba(7,91,89,.055),transparent 34%),
            radial-gradient(circle at 92% 0%,rgba(184,148,70,.06),transparent 30%),
            linear-gradient(180deg,#fbfaf7 0%,#f6f1e8 52%,#fbfaf7 100%);
          color:var(--ink);
        }
        .shop-page.section-degree{--green:#4B3F8F;--deep:#252052;--section-soft:#f2f1f8;--section-glow:rgba(75,63,143,.12)}
        .shop-page.section-vocational{--green:#8A4C25;--deep:#4B2610;--section-soft:#f7efe6;--section-glow:rgba(138,76,37,.12)}
        .shop-page.section-bridge-courses{--green:#075985;--deep:#082F49;--section-soft:#eef6fb;--section-glow:rgba(7,89,133,.12)}
        .shop-page:before,.shop-page:after{display:none!important}
        .wrap{width:min(1360px,calc(100% - 48px))}

        /* Opening catalogue page */
        .catalogue-masthead{
          min-height:330px;margin:18px 0 28px;padding:clamp(42px,5vw,68px);
          display:grid;grid-template-columns:minmax(0,1fr) 230px;align-items:end;gap:42px;
          border:1px solid #d9ccb5;border-radius:18px;color:var(--ink);
          background:
            linear-gradient(90deg,rgba(255,255,255,.72),rgba(255,255,255,.18)),
            radial-gradient(circle at 85% 18%,rgba(184,148,70,.08),transparent 26%),
            linear-gradient(135deg,#fffdf9 0%,#f4efe6 62%,#edf3f0 100%);
          box-shadow:0 22px 55px rgba(42,35,20,.09),inset 0 1px 0 #fff;
        }
        .catalogue-masthead:before{inset:18px;border:1px solid rgba(184,148,70,.22);border-radius:12px;background:none;box-shadow:none}
        .catalogue-masthead:after,.masthead-orbit,.masthead-signature{display:none!important}
        .masthead-copy{max-width:820px;padding-left:0;border-left:0}.masthead-copy:before{display:none}
        .masthead-kicker{margin:0 0 22px;color:var(--deep);font-size:11px;font-weight:800;letter-spacing:.24em;text-transform:uppercase}
        .masthead-kicker span{width:42px;height:1px;background:var(--gold);box-shadow:none}.masthead-kicker:after{max-width:88px;background:linear-gradient(90deg,rgba(184,148,70,.45),transparent)}
        .catalogue-masthead h1{max-width:760px;color:var(--ink);font-family:Georgia,'Times New Roman',serif;font-size:clamp(46px,6vw,82px);font-weight:500;letter-spacing:-.06em;line-height:.94;text-shadow:none}
        .catalogue-masthead h1 em{display:block;background:none!important;color:var(--deep)!important;-webkit-text-fill-color:var(--deep);animation:none!important;font-style:normal}
        .masthead-lead{max-width:650px;margin-top:24px;color:var(--muted);font-size:15px;line-height:1.8}
        .masthead-details{min-width:0;display:grid;gap:0;border:0;border-left:1px solid rgba(184,148,70,.28);border-radius:0;background:transparent;box-shadow:none;backdrop-filter:none}
        .masthead-details div{padding:15px 0 15px 22px;border:0;border-bottom:1px solid rgba(21,34,30,.09);background:transparent;overflow:visible;transform:none!important}
        .masthead-details div:last-child{border-bottom:0}.masthead-details div:before,.masthead-details div:after{display:none}
        .masthead-details strong{display:block;background:none;color:var(--deep);-webkit-text-fill-color:var(--deep);font-family:Georgia,serif;font-size:30px;font-weight:500;line-height:1}
        .masthead-details span{color:#7a7469;font-size:9px;font-weight:800;letter-spacing:.16em;text-transform:uppercase}

        /* Header/search: quiet publishing utility bar */
        .topbar{top:0;margin-bottom:22px;padding:10px 0;background:rgba(251,250,247,.86);border-radius:0;backdrop-filter:blur(14px)}
        .topbar:after{height:1px;background:#ded7ca;filter:none;opacity:1}
        .topbar-inner{grid-template-columns:230px minmax(260px,1fr) auto;gap:16px;padding:10px;border:1px solid #ded7ca;border-radius:14px;background:rgba(255,253,249,.88);box-shadow:0 12px 32px rgba(42,35,20,.07),inset 0 1px 0 #fff}
        .brand{min-width:0;padding:6px 10px;border:0;border-right:1px solid #e4ddd1;border-radius:0;background:transparent;box-shadow:none}.brand:after{display:none}.brand-copy strong{-webkit-text-fill-color:var(--deep);color:var(--deep);font-size:11px;letter-spacing:.14em}.brand-copy span{color:#8a8275;font-size:8px;letter-spacing:.16em}
        .premium-icon.compact{width:34px;height:34px;border-radius:8px;box-shadow:none}.premium-icon.compact:before,.premium-icon.compact:after{display:none}.premium-icon.compact svg{width:18px;height:18px}
        .search{min-height:44px;padding:0 14px;border:1px solid #ded7ca;border-radius:10px;background:#fffdf9;box-shadow:none;color:#827764}.search input::placeholder{color:#948b7d}
        .cart-btn{min-height:44px;border-radius:10px;background:var(--deep);box-shadow:0 10px 20px rgba(6,61,59,.12);font-size:11px}.cart-btn:hover{transform:translateY(-1px);box-shadow:0 14px 26px rgba(6,61,59,.18)}.cart-btn b{padding:3px 7px;color:var(--deep)}

        /* Editorial index sidebar */
        .layout{grid-template-columns:285px minmax(0,1fr);gap:34px}.sidebar{top:88px;padding:24px 20px;border:1px solid #ddd5c8;border-radius:14px;background:rgba(255,253,249,.72);box-shadow:0 16px 36px rgba(42,35,20,.06);backdrop-filter:blur(10px)}
        .side-head{margin-bottom:18px;padding-bottom:16px;border-bottom:1px solid #ded7ca}.side-head h1{font-family:Georgia,serif;font-size:26px;font-weight:500;letter-spacing:-.03em;-webkit-text-fill-color:var(--ink);color:var(--ink)}.side-head h1:after{width:30px;height:1px;background:var(--gold)}
        .side-head button{border:1px solid #ddd5c8;border-radius:8px;background:#fffdf9;color:#70675b;font-size:9px}
        .group{padding:16px 0;border-top:1px solid rgba(21,34,30,.08)}.group:first-of-type{border-top:0}.group-title{margin-bottom:8px;color:#8a7960;font-size:9px;letter-spacing:.18em}.group-title button{color:var(--green);font-size:9px}
        .category-list{gap:0;margin-bottom:0}.category-btn{min-height:0;display:grid;grid-template-columns:1fr auto;gap:10px;padding:12px 0 12px 16px;border:0;border-left:2px solid transparent;border-radius:0;background:transparent;box-shadow:none;color:var(--ink);transition:background .24s ease,border-color .24s ease,transform .24s cubic-bezier(.16,1,.3,1)}
        .category-btn:before,.category-btn:after{display:none}.category-btn:hover,.category-btn.active{transform:none;border-color:var(--gold);background:linear-gradient(90deg,rgba(184,148,70,.08),transparent 70%);box-shadow:none}.category-btn strong{font-size:13px;font-weight:650;letter-spacing:0;color:var(--ink)}.category-btn.active strong{color:var(--deep)}.category-btn span{padding:0;background:transparent;color:#81786d;font-size:10px;font-weight:700}

        /* Section hero and filters */
        .hero{min-height:210px;margin-bottom:22px;padding:38px 42px;border:1px solid #ddd5c8;border-radius:16px;background:linear-gradient(135deg,#fffdf9 0%,#f6f1e8 72%,var(--section-soft));box-shadow:0 16px 38px rgba(42,35,20,.07);overflow:hidden}.hero:before{inset:auto;right:38px;bottom:18px;border:0;background:none;color:rgba(6,61,59,.06);font-family:Georgia,serif;font-size:132px;font-weight:700;line-height:1;content:'01'}.hero:after{display:none}.hero .premium-icon{width:76px;height:76px;border-radius:14px;animation:none;box-shadow:0 16px 30px rgba(6,61,59,.12)}.hero .premium-icon:before{display:none}.hero .premium-icon:after{inset:7px;border-radius:9px}.hero .premium-icon svg{width:36px;height:36px}
        .eyebrow{margin-bottom:12px;color:var(--green);font-size:10px;letter-spacing:.19em}.eyebrow:before{width:34px;background:var(--gold)}.eyebrow:after{display:none}.hero h2{-webkit-text-fill-color:var(--deep);background:none;color:var(--deep);font-family:Georgia,serif;font-size:clamp(38px,5vw,62px);font-weight:500;letter-spacing:-.05em}.hero p{max-width:650px;color:var(--muted);font-size:15px}
        .toolbar{min-height:0;margin:4px 0 18px;padding:14px 0;border:0;border-top:1px solid #ded7ca;border-bottom:1px solid #ded7ca;border-radius:0;background:transparent;box-shadow:none;backdrop-filter:none}.filters{gap:8px}.chip{min-height:34px;padding:0 11px;border:1px solid #d9d0c2;border-radius:7px;background:#fffdf9;color:#4f5b55;font-size:10px;font-weight:750;letter-spacing:.08em;text-transform:uppercase;box-shadow:none}.chip:hover{transform:none;border-color:#bfb29e;box-shadow:none}.chip.active{transform:none;border-color:var(--deep);background:var(--deep);color:#fff;box-shadow:none}.sort{min-height:36px;min-width:158px;border-radius:7px;border-color:#d9d0c2;background:#fffdf9;box-shadow:none;color:#4f5b55;font-size:12px}.vocational-note span{border-radius:7px;background:#fffdf9;box-shadow:none}
        .summary{margin-bottom:22px;padding:0 0 14px;border:0;border-bottom:1px solid rgba(21,34,30,.09);border-radius:0;background:transparent;box-shadow:none;color:#767f7a}.summary b{font-family:Georgia,serif;color:var(--deep);font-weight:500}

        /* Book catalogue grid */
        .book-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:28px;align-items:stretch}.card{min-height:0;border:1px solid #ddd5c8;border-radius:22px;background:linear-gradient(180deg,#fffdf9 0%,#faf6ed 100%);box-shadow:0 18px 38px rgba(42,35,20,.075);overflow:hidden;transition:transform .42s cubic-bezier(.16,1,.3,1),box-shadow .42s ease,border-color .42s ease}.card:before,.card:after{display:none}.card:has(.media:hover),.card:has(.media:focus-visible),.card:has(.media:hover){transform:translateY(-8px);border-color:#cfc2ae;box-shadow:0 28px 58px rgba(42,35,20,.13)}
        .book-grid .card:first-child{grid-column:span 2;display:grid;grid-template-columns:minmax(280px,.9fr) minmax(0,1fr);min-height:430px}.book-grid .card:first-child .media{min-height:100%;height:100%;border-radius:0;border-right:1px solid #e3dacd;border-bottom:0}.book-grid .card:first-child .copy{min-height:0;padding:30px}.book-grid .card:first-child .media .book-cover{width:min(220px,44vw)}.book-grid .card:first-child h3{font-size:31px;line-height:1.05;-webkit-line-clamp:3}.book-grid .card:first-child .card-glance{margin-top:auto}
        .media{flex:0 0 292px;min-height:292px;padding:38px 18px;border-radius:0;border-bottom:1px solid #e3dacd;background:radial-gradient(ellipse at 50% 82%,rgba(42,35,20,.16),transparent 22%),linear-gradient(180deg,#f8f3ea 0%,#efe5d5 100%);perspective:950px;overflow:hidden}.media:before{inset:18px;border:1px solid rgba(255,255,255,.62);border-radius:12px;background:linear-gradient(135deg,rgba(255,255,255,.38),transparent 54%);box-shadow:none}.media:after{right:auto;left:50%;bottom:30px;width:150px;height:20px;background:rgba(42,35,20,.18);filter:blur(12px);transform:translateX(-50%)}
        .media .book-cover{width:162px;transform:perspective(900px) rotateY(-8deg) rotateX(2deg) translateY(0);transform-origin:center;filter:none;transition:transform .48s cubic-bezier(.16,1,.3,1),box-shadow .48s ease}.media:hover .book-cover,.media:focus-visible .book-cover{transform:perspective(900px) rotateY(-2deg) rotateX(0) translateY(-10px) scale(1.035)}
        .book-cover{border-radius:4px 14px 14px 4px;box-shadow:-10px 0 18px -11px #000 inset,12px 14px 0 -5px rgba(42,35,20,.14),0 28px 46px -18px rgba(42,35,20,.55),0 0 0 1px rgba(0,0,0,.08)}.book-cover.image-cover{overflow:hidden;box-shadow:-10px 0 18px -11px #000 inset,12px 14px 0 -5px rgba(42,35,20,.14),0 30px 52px -18px rgba(42,35,20,.58),0 0 0 1px rgba(0,0,0,.09)}.book-cover.image-cover:before{background:linear-gradient(105deg,rgba(255,255,255,.28),transparent 22%,transparent 70%,rgba(255,255,255,.12)),linear-gradient(90deg,rgba(0,0,0,.18),transparent 12%,transparent 90%,rgba(255,255,255,.28))}.book-cover.image-cover:after{right:-6px;width:7px;background:linear-gradient(180deg,#fff,#eee3d1)}
        .book-cover.image-cover img{transition:filter .45s ease}.media:hover .book-cover.image-cover img{filter:saturate(1.04) contrast(1.03)}.book-cover.image-cover .reflection{display:none}.media .book-cover.image-cover{position:relative}.media .book-cover.image-cover::before{transition:transform .75s cubic-bezier(.16,1,.3,1);transform:translateX(-115%) skewX(-16deg);background:linear-gradient(105deg,transparent 0%,rgba(255,255,255,.24) 47%,transparent 72%),linear-gradient(90deg,rgba(0,0,0,.18),transparent 12%,transparent 90%,rgba(255,255,255,.28))}.media:hover .book-cover.image-cover::before,.media:focus-visible .book-cover.image-cover::before{transform:translateX(115%) skewX(-16deg)}
        .badge,.save{top:16px;border-radius:6px;font-size:8px;letter-spacing:.09em;box-shadow:none}.badge{left:16px;background:#efe5cf;color:#67512a}.save{right:16px;background:#e8f0eb;color:#1b6556}
        .copy{min-height:340px;padding:22px;display:flex;flex-direction:column;background:transparent}.meta{min-height:0;padding:0;border:0;border-radius:0;background:transparent;color:var(--green);font-size:9px;font-weight:850;letter-spacing:.13em}.card .copy h3{min-height:0;margin:12px 0 7px;color:var(--ink);font-family:Georgia,serif;font-size:22px;font-weight:500;line-height:1.12;letter-spacing:-.025em}.card:has(.media:hover) .copy h3{color:var(--deep)}.author{min-height:0;color:#777f79;font-size:12px}.card-facts{grid-template-columns:1fr 1fr;gap:8px;margin-top:18px}.card-facts>span{min-height:48px;padding:0;border:0;border-top:1px solid #e5ddd1;border-radius:0;background:transparent;box-shadow:none}.card-facts small{color:#8b8378;font-size:8px;letter-spacing:.12em}.card-facts b{color:#31413a;font-size:12px;font-weight:650}.card-rating b{color:#8a6224!important}.card-glance{min-height:0;margin-top:auto;padding-top:22px;border-top:1px solid #e5ddd1}.details-hint{color:var(--green);font-size:9px}.details-hint b{width:24px;height:24px;background:var(--deep)}.price{color:var(--deep);font-family:Georgia,serif;font-size:30px;font-weight:500}.mrp{color:#989890;font-size:12px}.off{margin-top:7px;border-radius:6px;background:#edf2ef;color:#1b6556;font-size:8px;box-shadow:none}.card-cart{min-height:0;margin-top:18px;padding-top:16px;border-top:1px solid #e5ddd1}.view,.add,.card-cart .add{min-height:42px;border-radius:10px;background:var(--deep);box-shadow:0 10px 20px rgba(6,61,59,.12);font-size:10px;letter-spacing:.09em}.card-cart .add:hover,.add:hover{transform:translateY(-2px);box-shadow:0 15px 28px rgba(6,61,59,.18)}.card-cart .add:after,.modal-add:after{display:none}.qty{border-color:#d9d0c2;border-radius:10px}.qty button{height:38px;background:#f5efe5}.empty{border:1px solid #ddd5c8;border-radius:16px;background:#fffdf9;box-shadow:none}

        /* Premium drawer and modal */
        .drawer{background:#fffdf9;border-left:1px solid #d9d0c2;box-shadow:-24px 0 64px rgba(21,34,30,.18);animation:drawer-slide .42s cubic-bezier(.16,1,.3,1)}.drawer-head{padding:24px;border-bottom:1px solid #e2dacd;background:#fffdf9}.drawer-head h2{font-family:Georgia,serif;font-weight:500;color:var(--deep)}.cart-line{border-bottom:1px solid #e2dacd}.line-controls button,.close,.remove{border-radius:8px}.drawer-foot{background:#f6f1e8;border-top:1px solid #e2dacd}.total b{font-family:Georgia,serif;font-weight:500;color:var(--deep)}
        .book-modal-overlay{background:rgba(11,22,19,.68);backdrop-filter:blur(10px);padding:24px}.book-modal{border:1px solid #d9d0c2;border-radius:28px;background:linear-gradient(135deg,#fffdf9,#f7f1e8);box-shadow:0 34px 90px rgba(5,18,16,.34);animation:modal-rise .46s cubic-bezier(.16,1,.3,1)}.book-modal:before{display:none}.modal-grid{gap:34px;padding:36px}.modal-media{border-radius:20px;background:radial-gradient(ellipse at 50% 82%,rgba(42,35,20,.14),transparent 24%),linear-gradient(180deg,#f8f3ea,#eee3d1);box-shadow:inset 0 0 0 1px rgba(255,255,255,.7)}.modal-media .book-cover{width:205px;transform:perspective(900px) rotateY(-5deg)}.modal-close,.zoom-close{border-radius:10px}.modal-kicker{border-radius:7px;background:var(--deep);font-size:9px}.modal-content h2{-webkit-text-fill-color:var(--deep);background:none;color:var(--deep);font-family:Georgia,serif;font-weight:500}.modal-price{font-family:Georgia,serif;font-weight:500;color:var(--deep)}.modal-price-row,.modal-spec{border-color:#e1d7c8;background:#fffdf9;border-radius:14px}.modal-add{border-radius:10px;background:var(--deep);box-shadow:0 14px 28px rgba(6,61,59,.16)}

        /* Applied Anatomy reader refinement */
        .book-modal.anatomy-reader{border-radius:28px;background:#fffdf9}.anatomy-split{grid-template-columns:minmax(0,1.08fr) minmax(360px,.92fr)}.anatomy-pages{background:linear-gradient(180deg,#f8f3ea,#e9dcc9);border-right:1px solid #d9d0c2}.anatomy-pages .reader-stage{border-radius:18px;background:radial-gradient(ellipse at 50% 84%,rgba(42,35,20,.14),transparent 28%),#efe5d5;box-shadow:inset 0 0 0 1px rgba(255,255,255,.7)}.anatomy-pages .reader-page{box-shadow:0 28px 62px rgba(42,35,20,.28),0 0 0 1px rgba(0,0,0,.08)}.anatomy-info{background:linear-gradient(155deg,#fffdf9,#f7f1e8);padding:46px 38px}.anatomy-info h2{-webkit-text-fill-color:var(--deep);color:var(--deep);font-weight:500}.anatomy-info h2:before{color:var(--green)}.anatomy-info .modal-kicker{background:#eef5f2;color:var(--deep)}.anatomy-info .modal-add{background:var(--deep)}.anatomy-spec{border-radius:12px;background:#fffdf9;border-color:#e1d7c8;box-shadow:none}.anatomy-thumb{border-radius:8px;background:#fffdf9}.reader-nav{box-shadow:0 10px 22px rgba(21,34,30,.16)}

        @media(max-width:1180px){.book-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.book-grid .card:first-child{grid-column:1/-1}}
        @media(max-width:920px){.wrap{width:min(100% - 34px,1360px)}.topbar-inner{grid-template-columns:1fr auto}.brand{border-right:0}.search{grid-column:1/-1}.layout{grid-template-columns:1fr;gap:24px}.sidebar{position:relative;top:auto;max-height:none;overflow:hidden;padding:18px}.sidebar .group{min-width:220px}.sidebar{display:block}.sidebar .group{display:inline-block;vertical-align:top;width:260px;margin-right:16px}.category-list{max-height:none}.hero{min-height:0}.catalogue-masthead{grid-template-columns:1fr;min-height:0}.masthead-details{grid-template-columns:repeat(3,1fr);border-left:0;border-top:1px solid rgba(184,148,70,.28);padding-top:12px}.masthead-details div{padding:10px 14px 8px 0;border-bottom:0}.anatomy-split{grid-template-columns:1fr}}
        @media(max-width:680px){.wrap{width:min(100% - 24px,1360px)}.catalogue-masthead{padding:30px 22px;border-radius:14px}.catalogue-masthead h1{font-size:42px}.masthead-details{grid-template-columns:1fr}.topbar-inner{grid-template-columns:1fr}.cart-btn{width:100%}.book-grid{grid-template-columns:1fr;gap:22px}.book-grid .card:first-child{display:flex;grid-column:auto;min-height:0}.book-grid .card:first-child .media{min-height:292px;border-right:0;border-bottom:1px solid #e3dacd}.book-grid .card:first-child .copy{padding:22px}.book-grid .card:first-child h3{font-size:23px}.book-grid .card:first-child .media .book-cover{width:168px}.media{min-height:286px;flex-basis:286px}.toolbar{display:block}.sort{width:100%;margin-top:10px}.sidebar{overflow-x:auto;white-space:nowrap}.sidebar .side-head{white-space:normal}.hero{padding:30px 24px}.hero h2{font-size:40px}.modal-grid{padding:24px}.modal-specs,.anatomy-specs{grid-template-columns:1fr}.anatomy-pages{padding:16px}.anatomy-info{padding:30px 20px}}
        @media(prefers-reduced-motion:reduce){.catalogue-masthead h1 em,.hero .premium-icon,.card,.media .book-cover,.book-cover.image-cover:before,.book-modal,.drawer,.cart-btn,.add{animation:none!important;transition:none!important}}

        /* Degree syllabus-style distribution board */
        .degree-distribution{position:relative;margin:0 0 28px;padding:24px;border:1px solid #d9d0c2;border-radius:20px;background:linear-gradient(135deg,#fffdf9 0%,#f7f1e8 68%,color-mix(in srgb,var(--section-soft) 54%,#fffdf9));box-shadow:0 18px 42px rgba(42,35,20,.075),inset 0 1px 0 #fff;overflow:hidden}
        .degree-distribution:before{position:absolute;inset:14px;border:1px solid rgba(184,148,70,.16);border-radius:14px;pointer-events:none;content:""}
        .degree-distribution-head{position:relative;z-index:1;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:end;gap:18px;margin-bottom:18px;padding-bottom:16px;border-bottom:1px solid #e3dacd}
        .degree-kicker{margin:0 0 7px;color:var(--green);font-size:9px;font-weight:850;letter-spacing:.18em;text-transform:uppercase}
        .degree-distribution h3{margin:0;color:var(--deep);font-family:Georgia,'Times New Roman',serif;font-size:clamp(27px,3vw,42px);font-weight:500;letter-spacing:-.045em;line-height:1}
        .degree-programmes{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:7px;max-width:430px}
        .degree-programmes span{display:inline-flex;min-height:30px;align-items:center;padding:0 10px;border:1px solid rgba(75,63,143,.18);border-radius:8px;background:#fffdf9;color:#252052;font-family:Georgia,serif;font-size:18px;font-weight:700;box-shadow:inset 0 1px 0 #fff}
        .degree-distribution-grid{position:relative;z-index:1;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
        .degree-box{min-height:215px;padding:13px 13px 14px;border:1px solid #d9d0c2;border-radius:13px;background:rgba(255,253,249,.78);box-shadow:0 8px 20px rgba(42,35,20,.045),inset 0 1px 0 rgba(255,255,255,.9);transition:transform .28s cubic-bezier(.16,1,.3,1),border-color .28s ease,box-shadow .28s ease}
        .degree-box:hover{transform:translateY(-4px);border-color:rgba(184,148,70,.44);box-shadow:0 15px 30px rgba(42,35,20,.085),inset 0 1px 0 #fff}
        .degree-box-head{display:grid;grid-template-columns:31px minmax(0,1fr);gap:9px;align-items:start;margin-bottom:10px;padding-bottom:9px;border-bottom:1px solid #e8dfd2}
        .degree-box-head>span{display:grid;width:31px;height:31px;place-items:center;border-radius:8px;background:#252052;color:#fff;font-size:10px;font-weight:850;letter-spacing:.08em}
        .degree-box-head strong{display:block;color:#17231f;font-family:Georgia,serif;font-size:17px;font-weight:600;line-height:1.05;letter-spacing:-.015em}
        .degree-box-head small{display:block;margin-top:4px;color:#8a7047;font-size:7px;font-weight:900;letter-spacing:.13em;text-transform:uppercase}
        .degree-box ol{display:grid;gap:5px;margin:0;padding-left:18px;color:#3d4843;font-size:11px;line-height:1.35}
        .degree-box li::marker{color:#b34842;font-weight:800}
        .degree-box:nth-child(1) .degree-box-head>span,.degree-box:nth-child(2) .degree-box-head>span{background:#b89446;color:#fffdf9}
        .degree-box:nth-child(3) .degree-box-head>span{background:#71334a}.degree-box:nth-child(4) .degree-box-head>span{background:#075b59}.degree-box:nth-child(5) .degree-box-head>span{background:#8a4c25}.degree-box:nth-child(6) .degree-box-head>span{background:#075985}.degree-box:nth-child(7) .degree-box-head>span{background:#164e63}.degree-box:nth-child(8) .degree-box-head>span{background:#4b3f8f}
        @media(max-width:1180px){.degree-distribution-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
        @media(max-width:760px){.degree-distribution{padding:18px}.degree-distribution-head{grid-template-columns:1fr}.degree-programmes{justify-content:flex-start}.degree-distribution-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.degree-box{min-height:0}}
        @media(max-width:520px){.degree-distribution-grid{grid-template-columns:1fr}.degree-programmes span{font-size:16px}.degree-distribution h3{font-size:31px}}
      `}</style>

      <style>{`
        /* Nursing catalogue design: B.Sc / GNM programme guide */
        .nursing-catalogue{position:relative;overflow:hidden;margin:0 0 22px;padding:34px;border:1px solid #d7c7a5;border-radius:24px;background:radial-gradient(circle at 92% 0,#e7c36e48,transparent 28%),linear-gradient(135deg,#fffef9,#f6eddc 58%,#e6f2ef);box-shadow:0 22px 54px #2a231415,inset 0 1px 0 #fff}.nursing-catalogue:before{position:absolute;inset:14px;border:1px solid #d6aa4a45;border-radius:16px;pointer-events:none;content:""}.nursing-catalogue>*{position:relative;z-index:1}.nursing-catalogue-head{display:flex;align-items:end;justify-content:space-between;gap:20px;margin-bottom:24px;padding-bottom:18px;border-bottom:1px solid #dfd1b7}.nursing-catalogue-kicker{margin:0 0 8px;color:#075b59;font-size:10px;font-weight:950;letter-spacing:.18em;text-transform:uppercase}.nursing-catalogue h2{margin:0;color:#063d3b;font-family:Georgia,serif;font-size:clamp(30px,4vw,48px);font-weight:500;letter-spacing:-.04em;line-height:1}.nursing-catalogue-head>span{max-width:320px;color:#68746d;font-size:12px;line-height:1.65;text-align:right}.nursing-programme-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:13px}.nursing-programme{position:relative;overflow:hidden;display:grid;min-height:172px;align-content:end;gap:7px;padding:18px;border:1px solid #dfd1b7;border-radius:17px;background:#fffdf8;color:#24332d;text-align:left;box-shadow:0 12px 26px #2a23140b;transition:transform .24s ease,border-color .24s ease,box-shadow .24s ease}.nursing-programme:before{position:absolute;right:-32px;top:-32px;width:100px;height:100px;border-radius:50%;background:var(--nursing-colour);opacity:.12;content:""}.nursing-programme:hover,.nursing-programme.active{transform:translateY(-4px);border-color:var(--nursing-colour);box-shadow:0 20px 38px #2a231416}.nursing-programme.active{background:linear-gradient(145deg,#fffdf8,#eaf4f1)}.nursing-programme b,.nursing-programme strong,.nursing-programme span{position:relative}.nursing-programme b{color:var(--nursing-colour);font-size:9px;font-weight:950;letter-spacing:.15em;text-transform:uppercase}.nursing-programme strong{color:#063d3b;font-family:Georgia,serif;font-size:25px;font-weight:600}.nursing-programme span{color:#67736c;font-size:11px;line-height:1.45}.nursing-semester-guide{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px;padding-top:18px;border-top:1px solid #dfd1b7}.nursing-semester-guide button{min-height:35px;padding:0 12px;border:1px solid #d8c9ae;border-radius:9px;background:#fffdf8;color:#41514a;font-size:10px;font-weight:900}.nursing-semester-guide button.active,.nursing-semester-guide button:hover{border-color:#075b59;background:#075b59;color:#fff}@media(max-width:920px){.nursing-programme-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:560px){.nursing-catalogue{padding:24px 18px;border-radius:18px}.nursing-catalogue-head{align-items:flex-start;flex-direction:column}.nursing-catalogue-head>span{text-align:left}.nursing-programme-grid{grid-template-columns:1fr}}

        /* Focused premium magnifier refinement — visual only */
        .modal-media .magnify-btn{
          right:22px;
          bottom:22px;
          display:inline-flex;
          width:auto;
          min-width:94px;
          height:42px;
          align-items:center;
          justify-content:center;
          gap:8px;
          padding:0 14px;
          border:1px solid rgba(184,148,70,.36);
          border-radius:12px;
          background:linear-gradient(180deg,rgba(255,253,249,.94),rgba(246,241,232,.9));
          color:var(--deep);
          font-size:0;
          font-weight:850;
          letter-spacing:.11em;
          text-transform:uppercase;
          box-shadow:0 14px 28px rgba(42,35,20,.14),0 1px 0 rgba(255,255,255,.9) inset;
          backdrop-filter:blur(12px);
          transform:none;
          isolation:isolate;
        }
        .modal-media .magnify-btn:before{
          display:grid;
          width:21px;
          height:21px;
          place-items:center;
          border:1px solid rgba(6,61,59,.18);
          border-radius:50%;
          background:#fffdf9;
          color:var(--deep);
          font-size:15px;
          line-height:1;
          content:"⌕";
        }
        .modal-media .magnify-btn:after{
          color:var(--deep);
          font-size:9px;
          line-height:1;
          content:"Zoom";
        }
        .modal-media .magnify-btn:hover{
          transform:translateY(-2px);
          border-color:rgba(184,148,70,.58);
          background:linear-gradient(180deg,#fffdf9,#f3eadb);
          box-shadow:0 18px 34px rgba(42,35,20,.18),0 1px 0 rgba(255,255,255,.95) inset;
        }
        .modal-media .magnify-btn:active{transform:translateY(0) scale(.98)}
        .modal-media .magnify-btn:focus-visible{outline:3px solid color-mix(in srgb,var(--green) 28%,white);outline-offset:3px}
        .zoom-overlay{
          background:rgba(9,20,17,.72);
          backdrop-filter:blur(14px) saturate(.92);
        }
        .zoom-panel{
          width:min(620px,calc(100vw - 32px));
          gap:14px;
          padding:28px;
          border:1px solid rgba(184,148,70,.34);
          border-radius:24px;
          background:linear-gradient(145deg,#fffdf9,#f6f1e8 70%,color-mix(in srgb,var(--section-soft) 42%,#fffdf9));
          box-shadow:0 36px 90px rgba(5,18,16,.42),0 1px 0 rgba(255,255,255,.95) inset;
        }
        .zoom-panel:before{display:none}
        .zoom-close{
          right:18px;
          top:18px;
          width:38px;
          height:38px;
          border:1px solid rgba(21,34,30,.12);
          border-radius:10px;
          background:#fffdf9;
          color:var(--deep);
          font-size:20px;
          box-shadow:0 10px 22px rgba(42,35,20,.12);
        }
        .zoom-frame{
          width:100%;
          padding:26px;
          border:1px solid rgba(255,255,255,.76);
          border-radius:18px;
          background:radial-gradient(ellipse at 50% 85%,rgba(42,35,20,.13),transparent 28%),linear-gradient(180deg,#f8f3ea,#eadfce);
          box-shadow:inset 0 1px 0 rgba(255,255,255,.88),0 18px 42px rgba(42,35,20,.14);
        }
        .zoom-frame img{
          width:min(430px,72vw);
          max-height:70vh;
          border-radius:8px;
          box-shadow:0 32px 72px rgba(42,35,20,.38),10px 12px 0 -6px rgba(42,35,20,.12),0 0 0 1px rgba(21,34,30,.1);
        }
        .zoom-panel p{
          color:#746b5f;
          font-size:9px;
          font-weight:850;
          letter-spacing:.18em;
        }
        @media(max-width:560px){
          .modal-media .magnify-btn{right:16px;bottom:16px;min-width:86px;height:40px;padding:0 12px}
          .zoom-panel{padding:18px;border-radius:18px}
          .zoom-frame{padding:16px;border-radius:14px}
          .zoom-frame img{width:min(360px,78vw);max-height:66vh}
        }
        @media(prefers-reduced-motion:reduce){.modal-media .magnify-btn,.zoom-frame img{transition:none!important}}
      `}</style>

      <style>{`
        /* Degree photo-inspired classification index */
        .degree-sidebar{margin-top:18px;padding-top:18px;border-top:1px solid #ded7ca;white-space:normal}.degree-sidebar-kicker{margin:0 0 6px;color:#4b3f8f;font-size:9px;font-weight:900;letter-spacing:.18em;text-transform:uppercase}.degree-sidebar h2{margin:0 0 12px;color:#252052;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:600;letter-spacing:-.03em}.degree-sidebar-programmes{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:13px}.degree-sidebar-programmes span{padding:5px 7px;border:1px solid #d8d0c4;border-radius:7px;background:#fffdf9;color:#252052;font-family:Georgia,serif;font-size:14px;font-weight:800}.degree-sidebar-list{display:grid;gap:3px}.degree-sidebar-list button{display:grid;grid-template-columns:28px minmax(0,1fr);gap:8px;align-items:center;width:100%;padding:9px 8px;border:0;border-left:2px solid transparent;background:transparent;color:#26362f;text-align:left;transition:background .22s ease,border-color .22s ease}.degree-sidebar-list button:hover{border-color:#b89446;background:linear-gradient(90deg,rgba(184,148,70,.09),transparent)}.degree-sidebar-list b{grid-row:span 2;color:#8a7047;font-size:10px}.degree-sidebar-list span{overflow:hidden;font-size:12px;font-weight:800;text-overflow:ellipsis;white-space:nowrap}.degree-sidebar-list small{color:#7d776d;font-size:9px}.degree-sidebar-note{margin:13px 0 0;color:#7b756d;font-size:10px;line-height:1.55}
        .degree-distribution{border-radius:16px;background:linear-gradient(135deg,#fffdf9 0%,#f6f1e8 62%,#eef0ff 100%)}.degree-distribution-head{grid-template-columns:minmax(0,1fr) minmax(210px,auto);align-items:start}.degree-subtitle{max-width:680px;margin:8px 0 0;color:#68736d;font-size:12px;line-height:1.65}.degree-issue{display:grid;gap:5px;justify-items:end;padding:13px 0 13px 18px;border-left:1px solid rgba(184,148,70,.28);text-align:right}.degree-issue span{display:inline-flex;padding:5px 8px;border-radius:5px;background:#075b59;color:white;font-size:10px;font-weight:900}.degree-issue strong{color:#252052;font-size:13px}.degree-issue small{color:#8a7047;font-size:9px;font-weight:850;letter-spacing:.08em;text-transform:uppercase}.degree-distribution .degree-programmes{justify-content:center;max-width:none;margin:0 0 16px;padding:10px;border:1px solid #d9d0c2;border-radius:12px;background:#f8fbf7}.degree-distribution .degree-programmes span{min-height:34px;border-color:transparent;background:transparent;color:#183f38;font-size:24px}.degree-distribution-grid{grid-template-columns:repeat(4,minmax(0,1fr));align-items:stretch}.degree-box{min-height:260px;padding:0;border-color:#cfc7ba;border-radius:10px;background:#fffdf9}.degree-box-head{grid-template-columns:34px 1fr;margin:0;padding:9px 10px;border-bottom:1px solid #cfc7ba;background:#efe26d}.degree-box-head>span{background:#252052}.degree-box-head strong{font-size:16px}.degree-box ol{max-height:315px;overflow:auto;padding:12px 13px 14px 28px;font-size:10.5px;line-height:1.35;scrollbar-width:thin}.degree-box li{margin-bottom:5px}.degree-box:nth-child(1) .degree-box-head,.degree-box:nth-child(2) .degree-box-head,.degree-box:nth-child(8) .degree-box-head{background:#f1de4b}.degree-box:nth-child(3) .degree-box-head{background:#eaf0dc}.degree-box:nth-child(4) .degree-box-head{background:#e5df68}.degree-box:nth-child(5) .degree-box-head{background:#e9df62}.degree-box:nth-child(6) .degree-box-head{background:#efe266}.degree-box:nth-child(7) .degree-box-head{background:#dfe8db}.degree-books-strip{display:grid;grid-template-columns:220px minmax(0,1fr);gap:14px;margin-top:16px;padding:14px;border:1px solid #d9d0c2;border-radius:12px;background:#fffdf9}.degree-books-strip span:first-child{display:block;color:#8a7047;font-size:9px;font-weight:900;letter-spacing:.14em;text-transform:uppercase}.degree-books-strip strong{display:block;margin-top:4px;color:#252052;font-family:Georgia,serif;font-size:19px}.degree-book-chips{display:flex;flex-wrap:wrap;gap:7px}.degree-book-chips span{padding:7px 9px;border:1px solid #ded7ca;border-radius:8px;background:#f8f5ee;color:#33413b;font-size:10px;font-weight:750}
        @media(max-width:1180px){.degree-distribution-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.degree-books-strip{grid-template-columns:1fr}}
        @media(max-width:920px){.degree-sidebar{display:block;min-width:260px}.degree-sidebar-list{grid-template-columns:1fr}.degree-distribution-head{grid-template-columns:1fr}.degree-issue{justify-items:start;border-left:0;border-top:1px solid rgba(184,148,70,.28);padding:13px 0 0;text-align:left}.degree-distribution-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media(max-width:560px){.degree-distribution{padding:15px}.degree-distribution .degree-programmes span{font-size:19px}.degree-distribution-grid{grid-template-columns:1fr}.degree-box ol{max-height:none}.degree-books-strip{padding:12px}.degree-book-chips span{width:100%}}

        /* Premium AP CBCS left-bar classification board inspired by the attached catalogue */
        .degree-cbcs-card{
          position:relative;
          margin-top:20px;
          padding:16px 13px 15px;
          overflow:hidden;
          border:1px solid rgba(37,32,82,.18);
          border-radius:18px;
          background:
            linear-gradient(180deg,rgba(255,255,255,.86),rgba(255,253,249,.76)),
            radial-gradient(circle at 8% 0%,rgba(196,40,56,.18),transparent 25%),
            radial-gradient(circle at 92% 4%,rgba(7,91,89,.12),transparent 28%),
            linear-gradient(145deg,#fffdf9,#f4efe6 72%,#eef0ff);
          box-shadow:0 24px 48px rgba(42,35,20,.12),inset 0 1px 0 #fff,0 0 0 1px rgba(255,255,255,.6);
          white-space:normal;
        }
        .degree-cbcs-card:before{
          position:absolute;
          inset:9px;
          border:1px solid rgba(184,148,70,.22);
          border-radius:13px;
          pointer-events:none;
          content:"";
        }
        .degree-cbcs-card:after{
          position:absolute;
          right:-42px;
          top:-52px;
          width:130px;
          height:130px;
          border-radius:50%;
          background:linear-gradient(135deg,rgba(196,40,56,.26),rgba(255,255,255,0) 62%);
          pointer-events:none;
          content:"";
        }
        .degree-cbcs-topline{position:relative;z-index:1;display:grid;grid-template-columns:46px 1fr;gap:10px;align-items:center;margin-bottom:12px}
        .degree-ap-seal{display:grid;width:46px;height:46px;place-items:center;border-radius:50%;background:linear-gradient(145deg,#ffffff,#dce8ff 44%,#1f5598);color:#fff;font-size:17px;font-weight:950;letter-spacing:-.04em;box-shadow:0 10px 22px rgba(31,85,152,.24),inset 0 2px 0 #fff;text-shadow:0 1px 2px rgba(0,0,0,.28)}
        .degree-cbcs-card .degree-sidebar-kicker{margin:0;color:#214f91;font-size:12px;font-weight:950;letter-spacing:.08em;text-transform:none}.degree-cbcs-card h2{margin:2px 0 0;color:#252052;font-family:Georgia,'Times New Roman',serif;font-size:25px;font-weight:800;letter-spacing:-.04em;line-height:1}
        .degree-cbcs-meta{position:relative;z-index:1;display:grid;gap:6px;margin:0 0 12px;padding:10px;border:1px solid rgba(184,148,70,.28);border-radius:11px;background:linear-gradient(135deg,#fffdf9,#f7f1e8);box-shadow:inset 0 1px 0 #fff}.degree-cbcs-meta span{display:inline-flex;width:max-content;padding:4px 7px;border-radius:5px;background:#0f766e;color:#fff;font-size:9px;font-weight:950}.degree-cbcs-meta strong{color:#b13b43;font-size:11px;font-weight:950;letter-spacing:.04em}.degree-cbcs-meta em{color:#264c91;font-size:9px;font-style:normal;font-weight:900;text-transform:uppercase}
        .degree-cbcs-card .degree-sidebar-programmes{position:relative;z-index:1;display:flex;justify-content:center;gap:0;margin:0 0 12px;padding:7px 8px;border-radius:999px;background:linear-gradient(90deg,#0f766e,#f7fbf6 16%,#f7fbf6 84%,#0f766e);box-shadow:0 10px 18px rgba(7,91,89,.1),inset 0 1px 0 #fff}.degree-cbcs-card .degree-sidebar-programmes span{padding:0 8px;border:0;border-right:1px solid rgba(37,32,82,.24);border-radius:0;background:transparent;color:#252052;font-family:Georgia,serif;font-size:17px;font-weight:950;box-shadow:none}.degree-cbcs-card .degree-sidebar-programmes span:last-child{border-right:0;color:#0c71bf}.degree-cbcs-card .degree-sidebar-programmes span:nth-child(4){color:#b13b43}.degree-cbcs-card .degree-sidebar-programmes span:nth-child(3){color:#0f766e}
        .degree-cbcs-scroll{position:relative;z-index:1;display:grid;max-height:520px;overflow:auto;gap:7px;padding:3px 2px 4px;scrollbar-color:rgba(37,32,82,.32) transparent;scrollbar-width:thin}.degree-classification-tile{position:relative;display:grid;grid-template-columns:30px minmax(0,1fr) 26px;gap:8px;align-items:start;width:100%;padding:9px 8px;border:1px solid rgba(37,32,82,.13);border-radius:11px;background:rgba(255,253,249,.9);color:#15221e;text-align:left;box-shadow:0 7px 15px rgba(42,35,20,.055),inset 0 1px 0 #fff;transition:transform .22s cubic-bezier(.16,1,.3,1),border-color .22s ease,box-shadow .22s ease,background .22s ease}.degree-classification-tile:before{position:absolute;left:0;top:10px;bottom:10px;width:3px;border-radius:0 4px 4px 0;background:#efe26d;content:""}.degree-classification-tile:nth-child(3n+1):before{background:#efe26d}.degree-classification-tile:nth-child(3n+2):before{background:#0f766e}.degree-classification-tile:nth-child(3n):before{background:#b13b43}.degree-classification-tile:hover{transform:translateX(4px) translateY(-1px);border-color:rgba(184,148,70,.48);background:#fffdf9;box-shadow:0 12px 24px rgba(42,35,20,.11),inset 0 1px 0 #fff}.degree-classification-number{display:grid;width:28px;height:28px;place-items:center;border-radius:8px;background:#252052;color:#fff;font-size:10px;font-weight:950;box-shadow:0 7px 13px rgba(37,32,82,.18)}.degree-classification-copy{min-width:0}.degree-classification-copy strong{display:block;overflow:hidden;color:#202b27;font-family:Georgia,serif;font-size:14px;font-weight:750;line-height:1.08;text-overflow:ellipsis}.degree-classification-copy small{display:block;margin-top:3px;color:#b13b43;font-size:7px;font-weight:950;letter-spacing:.1em;text-transform:uppercase}.degree-classification-copy em{display:-webkit-box;margin-top:5px;overflow:hidden;color:#41514a;font-size:9px;font-style:normal;line-height:1.35;-webkit-line-clamp:2;-webkit-box-orient:vertical}.degree-classification-tile>b{display:grid;width:24px;height:24px;place-items:center;border-radius:50%;background:#eef5f2;color:#0f766e;font-size:9px;font-weight:950}
        .degree-cbcs-footer{position:relative;z-index:1;margin-top:12px;padding-top:11px;border-top:1px solid rgba(184,148,70,.25);text-align:center}.degree-cbcs-footer span{display:block;color:#252052;font-family:Georgia,serif;font-size:12px;font-style:italic}.degree-cbcs-footer strong{display:block;margin-top:4px;color:#0f766e;font-size:8px;font-weight:950;letter-spacing:.15em;text-transform:uppercase}
        @media(max-width:920px){.degree-cbcs-card{display:block!important;width:100%!important;min-width:0!important}.degree-cbcs-scroll{grid-template-columns:repeat(2,minmax(220px,1fr));max-height:none}.degree-classification-tile:hover{transform:translateY(-2px)}}
        @media(max-width:560px){.degree-cbcs-scroll{grid-template-columns:1fr}.degree-cbcs-card .degree-sidebar-programmes{overflow:auto;justify-content:flex-start}.degree-cbcs-card .degree-sidebar-programmes span{white-space:nowrap}}

        /* Reference-inspired premium Degree classification redesign */
        .degree-cbcs-card{
          padding:0!important;
          border:1px solid rgba(190,33,48,.26)!important;
          border-radius:22px!important;
          background:
            radial-gradient(circle at 8% 3%,rgba(190,33,48,.20),transparent 24%),
            radial-gradient(circle at 92% 0%,rgba(15,118,110,.18),transparent 30%),
            linear-gradient(145deg,#fffdf7 0%,#fff7e8 46%,#edf7f3 100%)!important;
          box-shadow:0 30px 70px rgba(42,35,20,.18),0 10px 24px rgba(37,32,82,.08),inset 0 1px 0 #fff!important;
        }
        .degree-cbcs-card:before{
          inset:10px!important;
          border:1px solid rgba(184,148,70,.34)!important;
          border-radius:16px!important;
          box-shadow:inset 0 0 0 1px rgba(255,255,255,.58);
        }
        .degree-cbcs-card:after{
          right:-54px!important;
          top:-58px!important;
          width:160px!important;
          height:160px!important;
          background:radial-gradient(circle,rgba(255,255,255,.55) 0 18%,rgba(190,33,48,.24) 19% 45%,transparent 46%)!important;
          opacity:.9;
        }
        .degree-cbcs-topline{
          position:relative;
          z-index:1;
          grid-template-columns:58px 1fr!important;
          gap:12px!important;
          margin:0!important;
          padding:20px 16px 14px!important;
          background:linear-gradient(135deg,rgba(37,32,82,.96),rgba(69,54,124,.92) 54%,rgba(17,83,78,.94));
          color:#fff;
        }
        .degree-cbcs-topline:after{
          position:absolute;
          left:16px;
          right:16px;
          bottom:0;
          height:1px;
          background:linear-gradient(90deg,transparent,#f1de4b,transparent);
          content:"";
        }
        .degree-ap-seal{
          width:58px!important;
          height:58px!important;
          border:2px solid rgba(255,255,255,.74);
          background:radial-gradient(circle at 32% 24%,#fff 0 10%,#dce8ff 11% 34%,#1f5598 35% 100%)!important;
          font-size:21px!important;
          box-shadow:0 16px 30px rgba(0,0,0,.24),inset 0 2px 0 #fff,0 0 0 5px rgba(255,255,255,.12)!important;
        }
        .degree-cbcs-card .degree-sidebar-kicker{
          color:#f1de4b!important;
          font-size:10px!important;
          letter-spacing:.18em!important;
          text-transform:uppercase!important;
        }
        .degree-cbcs-card h2{
          color:#fff!important;
          font-size:27px!important;
          text-shadow:0 8px 18px rgba(0,0,0,.24);
        }
        .degree-cbcs-topline small{
          display:block;
          margin-top:5px;
          color:rgba(255,255,255,.68);
          font-size:8px;
          font-weight:850;
          letter-spacing:.12em;
          text-transform:uppercase;
        }
        .degree-cbcs-title-strip{
          position:relative;
          z-index:1;
          display:grid;
          gap:4px;
          padding:13px 16px;
          background:linear-gradient(90deg,#f1de4b 0%,#fff7bf 52%,#f1de4b 100%);
          border-bottom:1px solid rgba(37,32,82,.16);
          text-align:center;
        }
        .degree-cbcs-title-strip span{
          color:#be2130;
          font-size:9px;
          font-weight:950;
          letter-spacing:.22em;
          text-transform:uppercase;
        }
        .degree-cbcs-title-strip strong{
          color:#252052;
          font-family:Georgia,'Times New Roman',serif;
          font-size:20px;
          line-height:1;
        }
        .degree-cbcs-meta{
          margin:14px 14px 12px!important;
          padding:12px!important;
          border:1px solid rgba(184,148,70,.38)!important;
          border-radius:13px!important;
          background:linear-gradient(135deg,#fffdf9,#fff4df)!important;
          box-shadow:0 12px 24px rgba(42,35,20,.08),inset 0 1px 0 #fff!important;
        }
        .degree-cbcs-meta span{
          background:linear-gradient(135deg,#be2130,#8e1824)!important;
          border-radius:999px!important;
        }
        .degree-cbcs-meta strong{color:#252052!important;font-size:12px!important}
        .degree-cbcs-meta em{color:#0f766e!important}
        .degree-cbcs-card .degree-sidebar-programmes{
          margin:0 14px 13px!important;
          padding:8px!important;
          border:1px solid rgba(15,118,110,.18);
          border-radius:13px!important;
          background:linear-gradient(135deg,#eaf6f1,#fffdf9 48%,#fff5df)!important;
          box-shadow:inset 0 1px 0 #fff,0 10px 20px rgba(15,118,110,.08)!important;
        }
        .degree-cbcs-card .degree-sidebar-programmes span{
          flex:1 1 auto;
          min-width:max-content;
          padding:4px 7px!important;
          border-right:1px solid rgba(37,32,82,.16)!important;
          color:#252052!important;
          font-size:16px!important;
          text-align:center;
        }
        .degree-cbcs-scroll{
          margin:0 12px;
          max-height:560px!important;
          padding:3px 4px 8px!important;
          gap:9px!important;
        }
        .degree-classification-tile{
          grid-template-columns:34px minmax(0,1fr) 30px!important;
          padding:11px 10px!important;
          border:1px solid rgba(37,32,82,.14)!important;
          border-radius:14px!important;
          background:linear-gradient(135deg,rgba(255,253,249,.94),rgba(255,248,232,.88))!important;
          box-shadow:0 12px 24px rgba(42,35,20,.08),inset 0 1px 0 #fff!important;
        }
        .degree-classification-tile:hover{
          transform:translateX(6px) translateY(-2px)!important;
          border-color:rgba(190,33,48,.28)!important;
          box-shadow:0 18px 34px rgba(42,35,20,.14),0 0 0 1px rgba(255,255,255,.7) inset!important;
        }
        .degree-classification-tile:before{
          top:12px!important;
          bottom:12px!important;
          width:4px!important;
          background:linear-gradient(#be2130,#f1de4b)!important;
        }
        .degree-classification-number{
          width:32px!important;
          height:32px!important;
          border-radius:10px!important;
          background:linear-gradient(145deg,#252052,#4b3f8f)!important;
          box-shadow:0 9px 18px rgba(37,32,82,.24)!important;
        }
        .degree-classification-copy strong{
          color:#252052!important;
          font-size:15px!important;
        }
        .degree-classification-copy small{color:#be2130!important}
        .degree-classification-copy em{color:#42524b!important;font-size:9.5px!important}
        .degree-classification-tile>b{
          background:linear-gradient(135deg,#eaf6f1,#fffdf9)!important;
          color:#0f766e!important;
          box-shadow:inset 0 1px 0 #fff;
        }
        .degree-cbcs-footer{
          margin:12px 14px 16px!important;
          padding:12px!important;
          border:1px dashed rgba(184,148,70,.45)!important;
          border-radius:13px;
          background:rgba(255,253,249,.72);
        }
        .degree-cbcs-footer span{color:#be2130!important;font-size:13px!important}
        .degree-cbcs-footer strong{color:#252052!important}

        /* Partitioned degree book arrangement — reference-style blocks */
        .degree-cbcs-scroll{
          display:grid!important;
          gap:13px!important;
        }
        .degree-partition{
          position:relative;
          overflow:hidden;
          border:1px solid rgba(37,32,82,.14);
          border-radius:18px;
          background:linear-gradient(145deg,rgba(255,253,249,.96),rgba(255,246,225,.86) 62%,rgba(234,246,241,.82));
          box-shadow:0 16px 34px rgba(42,35,20,.12),inset 0 1px 0 #fff;
        }
        .degree-partition:before{
          position:absolute;
          inset:0;
          background:linear-gradient(90deg,rgba(190,33,48,.08),transparent 32%,rgba(15,118,110,.07));
          pointer-events:none;
          content:"";
        }
        .degree-partition .degree-classification-tile{
          position:relative;
          z-index:1;
          margin:0;
          border:0!important;
          border-bottom:1px solid rgba(37,32,82,.12)!important;
          border-radius:0!important;
          background:linear-gradient(135deg,rgba(37,32,82,.98),rgba(75,63,143,.93) 55%,rgba(15,118,110,.9))!important;
          color:#fff;
          box-shadow:none!important;
        }
        .degree-partition .degree-classification-tile:before{
          background:linear-gradient(#f1de4b,#be2130)!important;
        }
        .degree-partition .degree-classification-copy strong,
        .degree-partition .degree-classification-copy em{
          color:#fff!important;
        }
        .degree-partition .degree-classification-copy small{
          color:#f1de4b!important;
        }
        .degree-partition .degree-classification-tile>b{
          background:rgba(255,255,255,.14)!important;
          color:#fff!important;
        }
        .degree-partition-body{
          position:relative;
          z-index:1;
          display:grid;
          gap:10px;
          padding:12px;
        }
        .degree-subject-grid{
          display:grid;
          gap:6px;
        }
        .degree-subject-pill{
          display:grid;
          grid-template-columns:25px minmax(0,1fr);
          align-items:center;
          gap:7px;
          width:100%;
          padding:8px 9px;
          border:1px solid rgba(184,148,70,.25);
          border-radius:10px;
          background:rgba(255,253,249,.78);
          color:#283833;
          text-align:left;
          font-size:10px;
          font-weight:760;
          line-height:1.25;
          box-shadow:inset 0 1px 0 #fff;
          transition:transform .22s cubic-bezier(.16,1,.3,1),border-color .22s ease,background .22s ease;
        }
        .degree-subject-pill:hover{
          transform:translateX(3px);
          border-color:rgba(190,33,48,.3);
          background:#fffdf9;
        }
        .degree-subject-pill span{
          display:grid;
          width:25px;
          height:25px;
          place-items:center;
          border-radius:8px;
          background:#f1de4b;
          color:#252052;
          font-size:9px;
          font-weight:950;
        }
        .degree-partition-books{
          display:grid;
          gap:7px;
          padding:10px;
          border:1px dashed rgba(37,32,82,.18);
          border-radius:12px;
          background:rgba(255,255,255,.5);
        }
        .degree-partition-books>strong{
          color:#be2130;
          font-size:8px;
          font-weight:950;
          letter-spacing:.13em;
          text-transform:uppercase;
        }
        .degree-partition-books p{
          margin:0;
          color:#786f63;
          font-size:9px;
          line-height:1.5;
        }
        .degree-mini-book{
          display:grid;
          grid-template-columns:42px minmax(0,1fr);
          align-items:center;
          gap:9px;
          width:100%;
          padding:8px;
          border:1px solid rgba(15,118,110,.16);
          border-radius:12px;
          background:linear-gradient(135deg,#fffdf9,#eef7f3);
          text-align:left;
          box-shadow:0 9px 18px rgba(42,35,20,.08),inset 0 1px 0 #fff;
          transition:transform .22s cubic-bezier(.16,1,.3,1),box-shadow .22s ease;
        }
        .degree-mini-book:hover{
          transform:translateY(-2px);
          box-shadow:0 14px 26px rgba(42,35,20,.13),inset 0 1px 0 #fff;
        }
        .degree-mini-book .book-cover.small{
          width:38px;
          min-width:38px;
          border-radius:3px 9px 9px 3px;
        }
        .degree-mini-book span{
          min-width:0;
        }
        .degree-mini-book b{
          display:block;
          overflow:hidden;
          color:#252052;
          font-family:Georgia,serif;
          font-size:12px;
          font-weight:700;
          line-height:1.15;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        .degree-mini-book small{
          display:block;
          margin-top:4px;
          overflow:hidden;
          color:#0f766e;
          font-size:8px;
          font-weight:850;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        @media(max-width:920px){
          .degree-cbcs-scroll{grid-template-columns:1fr!important}
          .degree-partition-body{grid-template-columns:1fr 1fr}
        }
        @media(max-width:560px){
          .degree-partition-body{grid-template-columns:1fr}
        }
      `}      </style>

      <style>{`
        /* Extra couture polish: makes the Degree classification feel like a premium printed prospectus */
        .degree-cbcs-card{
          isolation:isolate;
          transform-style:preserve-3d;
        }
        .degree-cbcs-card .degree-cbcs-topline{
          overflow:hidden;
        }
        .degree-cbcs-card .degree-cbcs-topline:before{
          position:absolute;
          inset:-70% -30%;
          background:conic-gradient(from 140deg,transparent,rgba(255,255,255,.18),transparent 32%,rgba(241,222,75,.22),transparent 58%);
          animation:degree-aurora 9s linear infinite;
          content:"";
        }
        .degree-cbcs-topline>*{position:relative;z-index:1}
        @keyframes degree-aurora{to{transform:rotate(360deg)}}
        .degree-ap-seal{
          position:relative;
          isolation:isolate;
        }
        .degree-ap-seal:after{
          position:absolute;
          inset:-7px;
          z-index:-1;
          border-radius:50%;
          background:conic-gradient(#f1de4b,#fff,#1f5598,#be2130,#f1de4b);
          filter:blur(8px);
          opacity:.72;
          content:"";
        }
        .degree-cbcs-title-strip{
          box-shadow:inset 0 1px 0 rgba(255,255,255,.72),0 12px 24px rgba(37,32,82,.12);
        }
        .degree-cbcs-title-strip:before,
        .degree-cbcs-title-strip:after{
          position:absolute;
          top:50%;
          width:32px;
          height:1px;
          background:#be2130;
          opacity:.38;
          content:"";
        }
        .degree-cbcs-title-strip:before{left:16px}.degree-cbcs-title-strip:after{right:16px}
        .degree-partition{
          transform:translateZ(0);
          transition:transform .34s cubic-bezier(.16,1,.3,1),box-shadow .34s ease,border-color .34s ease;
        }
        .degree-partition:hover{
          transform:translateY(-5px) scale(1.01);
          border-color:rgba(190,33,48,.32);
          box-shadow:0 24px 48px rgba(42,35,20,.18),0 0 0 1px rgba(255,255,255,.72) inset;
        }
        .degree-partition .degree-classification-tile{
          min-height:78px;
        }
        .degree-partition .degree-classification-tile:after{
          position:absolute;
          right:-30px;
          top:-34px;
          width:92px;
          height:92px;
          border-radius:50%;
          background:radial-gradient(circle,rgba(241,222,75,.44),transparent 62%);
          pointer-events:none;
          content:"";
        }
        .degree-classification-number{
          position:relative;
          overflow:hidden;
        }
        .degree-classification-number:after{
          position:absolute;
          inset:0;
          background:linear-gradient(110deg,transparent 30%,rgba(255,255,255,.38),transparent 70%);
          transform:translateX(-120%);
          transition:transform .65s ease;
          content:"";
        }
        .degree-partition:hover .degree-classification-number:after{transform:translateX(120%)}
        .degree-subject-pill{
          position:relative;
          overflow:hidden;
        }
        .degree-subject-pill:after{
          position:absolute;
          inset:0;
          background:linear-gradient(100deg,transparent 35%,rgba(255,255,255,.5),transparent 62%);
          transform:translateX(-125%);
          transition:transform .55s ease;
          content:"";
        }
        .degree-subject-pill:hover:after{transform:translateX(125%)}
        .degree-subject-pill span{
          box-shadow:0 6px 12px rgba(37,32,82,.13),inset 0 1px 0 rgba(255,255,255,.75);
        }
        .degree-partition-books{
          background:linear-gradient(145deg,rgba(255,255,255,.62),rgba(255,249,231,.78));
        }
        .degree-mini-book{
          position:relative;
          overflow:hidden;
        }
        .degree-mini-book:before{
          position:absolute;
          left:0;
          top:10px;
          bottom:10px;
          width:3px;
          border-radius:0 4px 4px 0;
          background:linear-gradient(#0f766e,#f1de4b,#be2130);
          content:"";
        }
        .degree-mini-book:after{
          position:absolute;
          inset:0;
          background:linear-gradient(105deg,transparent 38%,rgba(255,255,255,.4),transparent 64%);
          transform:translateX(-130%);
          transition:transform .62s ease;
          content:"";
        }
        .degree-mini-book:hover:after{transform:translateX(130%)}
        .degree-mini-book .book-cover.small{
          box-shadow:0 12px 18px rgba(42,35,20,.2),0 0 0 1px rgba(37,32,82,.12);
          transform:perspective(700px) rotateY(-8deg);
        }
        .degree-cbcs-footer{
          box-shadow:inset 0 1px 0 rgba(255,255,255,.82),0 10px 22px rgba(42,35,20,.08);
        }
        .degree-cbcs-footer span:before,
        .degree-cbcs-footer span:after{
          color:#b89446;
          content:" ✦ ";
        }
        @media(prefers-reduced-motion:reduce)
          .degree-cbcs-card .degree-cbcs-topline:before{animation:none!important}
          .degree-partition,.degree-subject-pill:after,.degree-mini-book:after,.degree-classification-number:after{transition:none!important}
        }

        /* Final reference-style Degree partition board: left-side premium catalogue */
        .shop-page.section-degree .layout{
          grid-template-columns:minmax(390px,440px) minmax(0,1fr);
          gap:30px;
        }
        .shop-page.section-degree .sidebar{
          padding:16px;
          border:1px solid rgba(37,32,82,.18);
          border-radius:24px;
          background:
            linear-gradient(180deg,rgba(255,255,255,.84),rgba(255,253,249,.72)),
            radial-gradient(circle at 0 0,rgba(190,33,48,.08),transparent 30%),
            radial-gradient(circle at 100% 0,rgba(15,118,110,.08),transparent 34%);
          box-shadow:0 30px 70px rgba(42,35,20,.14),inset 0 1px 0 #fff;
        }
        .shop-page.section-degree .sidebar>.group{
          display:none;
        }
        .shop-page.section-degree .side-head{
          margin-bottom:14px;
          padding:12px 12px 15px;
          border:1px solid rgba(184,148,70,.22);
          border-radius:18px;
          background:linear-gradient(135deg,#fffdf9,#f7f1e8);
        }
        .shop-page.section-degree .side-head h1{
          font-size:24px;
        }
        .shop-page.section-degree .degree-cbcs-card{
          margin-top:0;
          border-radius:28px!important;
        }
        .degree-cbcs-title-strip strong{
          text-shadow:0 1px 0 rgba(255,255,255,.55);
        }
        .degree-cbcs-scroll{
          position:relative;
          padding:8px 8px 12px!important;
        }
        .degree-cbcs-scroll:before{
          position:absolute;
          top:0;
          bottom:0;
          left:25px;
          width:2px;
          background:linear-gradient(transparent,#f1de4b 8%,#be2130 48%,#0f766e 86%,transparent);
          opacity:.46;
          content:"";
        }
        .degree-partition{
          margin-left:14px;
          border-radius:22px;
        }
        .degree-partition:after{
          position:absolute;
          left:-21px;
          top:28px;
          width:14px;
          height:14px;
          border:3px solid #fffdf9;
          border-radius:50%;
          background:#be2130;
          box-shadow:0 0 0 1px rgba(184,148,70,.4),0 8px 16px rgba(42,35,20,.16);
          content:"";
        }
        .degree-partition .degree-classification-tile{
          grid-template-columns:42px minmax(0,1fr) 38px!important;
          padding:14px 13px!important;
        }
        .degree-classification-number{
          width:38px!important;
          height:38px!important;
          border-radius:13px!important;
          font-size:11px!important;
        }
        .degree-classification-copy strong{
          font-size:17px!important;
          letter-spacing:-.02em;
        }
        .degree-classification-copy em{
          -webkit-line-clamp:3;
        }
        .degree-partition-body{
          padding:14px;
          background:
            linear-gradient(180deg,rgba(255,255,255,.22),rgba(255,250,237,.78)),
            repeating-linear-gradient(90deg,rgba(37,32,82,.035) 0 1px,transparent 1px 42px);
        }
        .degree-subject-grid{
          max-height:235px;
          overflow:auto;
          padding-right:3px;
          scrollbar-color:rgba(190,33,48,.32) transparent;
          scrollbar-width:thin;
        }
        .degree-subject-pill{
          min-height:42px;
          border-radius:12px;
          background:linear-gradient(135deg,rgba(255,253,249,.9),rgba(255,247,224,.76));
        }
        .degree-subject-pill span{
          background:linear-gradient(145deg,#f1de4b,#fff4a8);
        }
        .degree-partition-books{
          border-style:solid;
          background:
            linear-gradient(145deg,rgba(255,255,255,.78),rgba(234,246,241,.72)),
            radial-gradient(circle at 100% 0,rgba(15,118,110,.1),transparent 46%);
        }
        .degree-partition-books>strong{
          display:flex;
          align-items:center;
          gap:8px;
          color:#252052;
        }
        .degree-partition-books>strong:before{
          width:22px;
          height:1px;
          background:#be2130;
          content:"";
        }
        .degree-mini-book{
          grid-template-columns:50px minmax(0,1fr) auto;
          min-height:66px;
          padding:10px 11px;
          border-radius:15px;
        }
        .degree-mini-book:focus-visible{
          outline:3px solid rgba(75,63,143,.22);
          outline-offset:2px;
        }
        .degree-mini-book span:after{
          display:inline-grid;
          width:24px;
          height:24px;
          margin-left:7px;
          place-items:center;
          border-radius:50%;
          background:#252052;
          color:#fff;
          font-size:12px;
          content:"→";
        }
        .degree-mini-book b{
          font-size:13px;
        }
        .degree-mini-book small{
          color:#be2130;
          letter-spacing:.03em;
        }
        .degree-cbcs-footer{
          background:linear-gradient(135deg,#fffdf9,#fff5dc 54%,#eef7f3)!important;
        }
        @media(max-width:1180px){
          .shop-page.section-degree .layout{grid-template-columns:minmax(350px,390px) minmax(0,1fr)}
        }
        @media(max-width:920px){
          .shop-page.section-degree .layout{grid-template-columns:1fr}
          .shop-page.section-degree .sidebar>.group{display:inline-block}
          .degree-subject-grid{max-height:none}
          .degree-cbcs-scroll:before,.degree-partition:after{display:none}
          .degree-partition{margin-left:0}
        }
      `}</style>

      <style>{`
        /* Vijayam Degree Discovery — modern syllabus-to-book journey */
        .shop-page.section-degree .catalogue-masthead{display:none}
        .shop-page.section-degree .layout{grid-template-columns:320px minmax(0,1fr);gap:30px}
        .shop-page.section-degree .sidebar>.group,.shop-page.section-degree .degree-cbcs-card{display:none!important}
        .degree-journey-panel{display:grid;gap:13px;margin-top:14px;padding:20px;border:1px solid rgba(75,63,143,.16);border-radius:22px;background:linear-gradient(145deg,rgba(255,255,255,.88),rgba(250,246,236,.78));box-shadow:0 22px 48px rgba(42,35,20,.1),inset 0 1px 0 #fff;white-space:normal}
        .degree-panel-kicker{margin:0;color:var(--green);font-size:9px;font-weight:900;letter-spacing:.18em;text-transform:uppercase}.degree-journey-panel h2{margin:0;color:var(--deep);font-family:Georgia,serif;font-size:28px;font-weight:500;letter-spacing:-.04em}.degree-pathline{display:flex;flex-wrap:wrap;gap:6px;align-items:center;padding:10px;border:1px solid #e3dacd;border-radius:13px;background:#fffdf9;color:#6d675e;font-size:10px}.degree-pathline span{padding:4px 7px;border-radius:999px;background:#f3efe7;color:var(--deep);font-weight:800}.degree-pathline b{color:#b89446}.degree-journey-panel label{display:grid;gap:6px;color:#7a704f;font-size:9px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}.degree-journey-panel select{width:100%;min-height:40px;padding:0 11px;border:1px solid #d9d0c2;border-radius:10px;background:#fffdf9;color:#21312c;font-size:12px;text-transform:none;letter-spacing:0}.degree-journey-panel button{min-height:44px;border:0;border-radius:12px;background:linear-gradient(135deg,var(--deep),#342a72);color:#fff;font-size:10px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;box-shadow:0 14px 28px rgba(37,32,82,.16);transition:transform .22s ease,box-shadow .22s ease}.degree-journey-panel button:hover{transform:translateY(-2px);box-shadow:0 18px 34px rgba(37,32,82,.22)}
        .degree-discovery{display:grid;gap:24px}.degree-collection-hero{display:grid;grid-template-columns:minmax(0,1fr) 280px;gap:24px;align-items:end;padding:42px;border:1px solid #d9d0c2;border-radius:26px;background:radial-gradient(circle at 88% 10%,rgba(184,148,70,.16),transparent 28%),linear-gradient(135deg,#fffdf9,#f5efe4 62%,#eef0ff);box-shadow:0 26px 64px rgba(42,35,20,.12),inset 0 1px 0 #fff}.degree-hero-kicker{margin:0 0 13px;color:var(--green);font-size:10px;font-weight:900;letter-spacing:.18em;text-transform:uppercase}.degree-collection-hero h2{max-width:820px;margin:0;color:var(--deep);font-family:Georgia,serif;font-size:clamp(38px,5vw,68px);font-weight:500;letter-spacing:-.06em;line-height:.96}.degree-collection-hero p{max-width:560px;margin:18px 0 0;color:#68736d;font-size:15px;line-height:1.7}.degree-hero-search{display:grid;gap:8px;padding:18px;border:1px solid rgba(184,148,70,.24);border-radius:18px;background:rgba(255,253,249,.72);box-shadow:inset 0 1px 0 #fff}.degree-hero-search strong{color:var(--deep);font-family:Georgia,serif;font-size:20px}.degree-hero-search span{color:#70695f;font-size:12px}.degree-hero-search button{min-height:42px;border:0;border-radius:11px;background:var(--deep);color:#fff;font-size:10px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
        .degree-section-head{display:flex;align-items:center;gap:13px;margin-bottom:14px}.degree-section-head>span{display:grid;width:38px;height:38px;place-items:center;border-radius:12px;background:#252052;color:#fff;font-size:11px;font-weight:900}.degree-section-head p{margin:0;color:#8a7047;font-size:9px;font-weight:900;letter-spacing:.16em;text-transform:uppercase}.degree-section-head h3{margin:3px 0 0;color:var(--deep);font-family:Georgia,serif;font-size:28px;font-weight:500;letter-spacing:-.04em}.degree-card-row{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:13px}.degree-card{--degree-accent:#4b3f8f;position:relative;overflow:hidden;display:grid;gap:7px;min-height:190px;padding:18px;border:1px solid #ddd5c8;border-radius:20px;background:linear-gradient(145deg,#fffdf9,#f7f1e8);text-align:left;box-shadow:0 16px 36px rgba(42,35,20,.07);transition:transform .28s cubic-bezier(.16,1,.3,1),box-shadow .28s ease,border-color .28s ease}.degree-card:before{position:absolute;right:-34px;top:-34px;width:100px;height:100px;border-radius:50%;background:color-mix(in srgb,var(--degree-accent) 16%,transparent);content:""}.degree-card:hover,.degree-card.active{transform:translateY(-5px);border-color:color-mix(in srgb,var(--degree-accent) 42%,#d9d0c2);box-shadow:0 24px 48px rgba(42,35,20,.13)}.degree-card.active{background:linear-gradient(145deg,#fffdf9,color-mix(in srgb,var(--degree-accent) 9%,#f7f1e8))}.degree-card-mark{display:grid;width:42px;height:42px;place-items:center;border-radius:13px;background:var(--degree-accent);color:#fff;font-size:12px;font-weight:900}.degree-card strong{color:var(--deep);font-family:Georgia,serif;font-size:31px;font-weight:500}.degree-card small{color:#273a34;font-size:12px;font-weight:800}.degree-card em{color:#6b746f;font-size:11px;font-style:normal;line-height:1.45}.degree-card b{margin-top:auto;color:var(--degree-accent);font-size:10px}.degree-explore{color:#8a7047;font-size:9px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
        .degree-navigation,.degree-academic-map,.degree-book-results{padding:24px;border:1px solid #ddd5c8;border-radius:22px;background:rgba(255,253,249,.78);box-shadow:0 18px 42px rgba(42,35,20,.075),inset 0 1px 0 #fff}.degree-segment-group,.degree-semester-strip{display:flex;gap:8px;overflow:auto;padding:4px}.degree-segment-group button,.degree-semester-strip button{flex:0 0 auto;min-height:38px;padding:0 15px;border:1px solid #d9d0c2;border-radius:999px;background:#fffdf9;color:#4f5b55;font-size:11px;font-weight:850;transition:.22s ease}.degree-segment-group button.active,.degree-semester-strip button.active{border-color:var(--deep);background:var(--deep);color:#fff;box-shadow:0 10px 20px rgba(37,32,82,.14)}.degree-breadcrumb{display:flex;flex-wrap:wrap;align-items:center;gap:8px;padding:13px 16px;border:1px solid #e1d7c8;border-radius:15px;background:linear-gradient(135deg,#fffdf9,#f8f3ea);color:#70695f;font-size:11px}.degree-breadcrumb span{color:var(--deep);font-weight:850}.degree-breadcrumb b{color:#b89446}
        .degree-academic-map{display:grid;gap:22px}.degree-category-title span{display:inline-flex;margin-bottom:8px;color:var(--green);font-size:9px;font-weight:950;letter-spacing:.16em;text-transform:uppercase}.degree-category-title h3{margin:0;color:var(--deep);font-family:Georgia,serif;font-size:30px;font-weight:500;letter-spacing:-.04em}.degree-category-title p{max-width:620px;margin:8px 0 0;color:#68736d;font-size:13px;line-height:1.6}.degree-category-title.compact h3{font-size:23px}.degree-subject-grid-main{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:13px;margin-top:16px}.degree-subject-card{display:grid;gap:7px;min-height:150px;padding:18px;border:1px solid #ddd5c8;border-radius:17px;background:linear-gradient(145deg,#fffdf9,#f8f3ea);text-align:left;transition:.25s ease}.degree-subject-card:hover,.degree-subject-card.active{transform:translateY(-4px);border-color:#b89446;box-shadow:0 18px 36px rgba(42,35,20,.1)}.degree-subject-card.active{background:linear-gradient(145deg,#fffdf9,#eef4f1)}.degree-subject-card strong{color:#17231f;font-family:Georgia,serif;font-size:20px;font-weight:600;line-height:1.12}.degree-subject-card span{color:#6f7772;font-size:12px}.degree-subject-card b{margin-top:auto;color:#0f766e;font-size:10px}.degree-subject-card em{color:#8a7047;font-size:9px;font-style:normal;font-weight:900;text-transform:uppercase;letter-spacing:.09em}.degree-secondary-columns{display:grid;grid-template-columns:1fr 1fr;gap:18px}.degree-mini-category{padding-top:18px;border-top:1px solid #e5ddd1}.degree-subject-list{display:grid;gap:7px;margin-top:13px}.degree-subject-list button{display:flex;justify-content:space-between;gap:10px;min-height:42px;align-items:center;padding:0 13px;border:1px solid #e1d7c8;border-radius:12px;background:#fffdf9;color:#26362f;text-align:left;font-size:12px}.degree-subject-list button.active,.degree-subject-list button:hover{border-color:#b89446;background:#f8f3ea}.degree-subject-list b{color:var(--green);font-size:9px;text-transform:uppercase}.degree-life-skill{padding:20px;border:1px solid #e1d7c8;border-radius:18px;background:linear-gradient(135deg,#fffdf9,#f8f3ea)}.degree-life-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-top:13px}.degree-life-row button{min-height:56px;padding:10px;border:1px solid #e1d7c8;border-radius:13px;background:#fffdf9;color:#26362f;font-weight:800;text-align:left}.degree-life-row button span{display:block;margin-top:5px;color:var(--green);font-size:9px;text-transform:uppercase}.degree-life-row button.active,.degree-life-row button:hover{border-color:#b89446;box-shadow:0 12px 24px rgba(42,35,20,.08)}
        .degree-results-head{display:flex;justify-content:space-between;gap:16px;margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid #e5ddd1}.degree-results-head p{margin:0 0 5px;color:#8a7047;font-size:9px;font-weight:900;letter-spacing:.16em;text-transform:uppercase}.degree-results-head h3{margin:0;color:var(--deep);font-family:Georgia,serif;font-size:31px;font-weight:500;letter-spacing:-.04em}.degree-results-head span{display:block;margin-top:6px;color:#68736d;font-size:12px}.degree-results-head>b{align-self:start;padding:8px 11px;border-radius:999px;background:#eef5f2;color:#0f766e;font-size:11px}.degree-result-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.degree-book-card{display:grid;grid-template-columns:130px minmax(0,1fr);gap:18px;padding:16px;border:1px solid #ddd5c8;border-radius:18px;background:linear-gradient(145deg,#fffdf9,#f8f3ea);box-shadow:0 15px 32px rgba(42,35,20,.075)}.degree-book-cover-btn{display:grid;place-items:center;min-height:188px;border:0;border-radius:14px;background:linear-gradient(180deg,#f3eadb,#e9dcc9)}.degree-book-cover-btn .book-cover{width:92px}.degree-book-card h4{margin:7px 0;color:#17231f;font-family:Georgia,serif;font-size:21px;font-weight:600;line-height:1.12}.degree-book-card p{margin:0;color:#6f7772;font-size:12px}.degree-book-card small,.degree-book-card>div>span{color:var(--green);font-size:10px;font-weight:850}.degree-book-actions{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:14px}.degree-book-actions strong{margin-right:auto;color:var(--deep);font-family:Georgia,serif;font-size:26px;font-weight:500}.degree-book-actions .view,.degree-book-actions .add{min-height:36px;padding:0 11px;border-radius:9px}
        @media(max-width:1180px){.degree-card-row{grid-template-columns:repeat(3,minmax(0,1fr))}.degree-subject-grid-main{grid-template-columns:repeat(2,minmax(0,1fr))}.degree-life-row{grid-template-columns:repeat(2,minmax(0,1fr))}.degree-result-grid{grid-template-columns:1fr}}
        @media(max-width:920px){.shop-page.section-degree .layout{grid-template-columns:1fr}.degree-collection-hero{grid-template-columns:1fr}.degree-card-row{display:flex;overflow:auto;padding-bottom:8px}.degree-card{min-width:220px}.degree-secondary-columns{grid-template-columns:1fr}.degree-journey-panel{margin-bottom:8px}}
        @media(max-width:620px){.shop-page.section-degree .wrap{width:min(100% - 22px,1360px)}.degree-collection-hero{padding:28px 22px;border-radius:20px}.degree-collection-hero h2{font-size:39px}.degree-navigation,.degree-academic-map,.degree-book-results{padding:17px;border-radius:18px}.degree-subject-grid-main,.degree-life-row{grid-template-columns:1fr}.degree-book-card{grid-template-columns:92px minmax(0,1fr);gap:12px;padding:12px}.degree-book-cover-btn{min-height:132px}.degree-book-cover-btn .book-cover{width:64px}.degree-book-card h4{font-size:17px}.degree-book-actions strong{width:100%}.degree-results-head{flex-direction:column}.degree-section-head h3,.degree-category-title h3,.degree-results-head h3{font-size:25px}}
      `}</style>

      <style>{`
        /* Final Degree marketplace refinement: clean academic journey, premium but restrained */
        .shop-page.section-degree .layout{grid-template-columns:300px minmax(0,1fr);gap:34px}
        .shop-page.section-degree .content{gap:0}
        .shop-page.section-degree .hero,.shop-page.section-degree .toolbar,.shop-page.section-degree .summary{display:none!important}
        .degree-discovery{display:grid;gap:28px}
        .degree-collection-hero{position:relative;overflow:hidden;display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:30px;align-items:end;padding:52px;border:1px solid #d9d0c2;border-radius:30px;background:radial-gradient(circle at 92% 8%,rgba(184,148,70,.14),transparent 28%),linear-gradient(135deg,#fffdf9 0%,#f6f0e6 58%,#eef2f0 100%);box-shadow:0 30px 72px rgba(42,35,20,.13),inset 0 1px 0 #fff}
        .degree-collection-hero:before{position:absolute;inset:18px;border:1px solid rgba(184,148,70,.18);border-radius:22px;pointer-events:none;content:""}
        .degree-collection-hero>*{position:relative;z-index:1}.degree-hero-kicker{margin:0 0 14px;color:var(--green);font-size:10px;font-weight:950;letter-spacing:.2em;text-transform:uppercase}.degree-collection-hero h2{max-width:760px;margin:0;color:var(--deep);font-family:Georgia,'Times New Roman',serif;font-size:clamp(44px,5.8vw,84px);font-weight:500;letter-spacing:-.07em;line-height:.9}.degree-collection-hero p{max-width:540px;margin:20px 0 0;color:#65726b;font-size:16px;line-height:1.75}
        .degree-hero-search,.degree-quick-find{border:1px solid rgba(184,148,70,.24);border-radius:22px;background:rgba(255,253,249,.78);box-shadow:0 18px 38px rgba(42,35,20,.08),inset 0 1px 0 #fff;backdrop-filter:blur(12px)}
        .degree-hero-search{display:grid;gap:10px;padding:22px}.degree-hero-search strong{color:var(--deep);font-family:Georgia,serif;font-size:24px;font-weight:500}.degree-hero-search span{color:#6d756f;font-size:12px;line-height:1.5}.degree-hero-search button,.degree-quick-cta,.degree-complete-cta{min-height:44px;border:0;border-radius:12px;background:var(--deep);color:#fff;font-size:10px;font-weight:950;letter-spacing:.12em;text-transform:uppercase;box-shadow:0 14px 28px rgba(6,61,59,.16);transition:transform .24s ease,box-shadow .24s ease}.degree-hero-search button:hover,.degree-quick-cta:hover,.degree-complete-cta:hover{transform:translateY(-2px);box-shadow:0 18px 34px rgba(6,61,59,.22)}
        .degree-quick-find{display:grid;gap:18px;padding:24px}.degree-quick-head p,.degree-path-card p{margin:0 0 5px;color:var(--green);font-size:9px;font-weight:950;letter-spacing:.18em;text-transform:uppercase}.degree-quick-head h3,.degree-path-card h3{margin:0;color:var(--deep);font-family:Georgia,serif;font-size:28px;font-weight:500;letter-spacing:-.04em}.degree-quick-head span{display:block;margin-top:7px;color:#6d756f;font-size:13px;line-height:1.55}.degree-quick-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.degree-quick-grid label{display:grid;gap:6px;color:#867858;font-size:9px;font-weight:950;letter-spacing:.12em;text-transform:uppercase}.degree-quick-grid select{width:100%;min-height:42px;padding:0 12px;border:1px solid #d9d0c2;border-radius:11px;background:#fffdf9;color:#20302b;font-size:12px;text-transform:none;letter-spacing:0}.degree-quick-cta{width:max-content;padding:0 22px}
        .degree-path-card{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:18px 22px;border:1px solid #ded7ca;border-radius:20px;background:linear-gradient(135deg,#fffdf9,#f8f3ea);box-shadow:0 14px 30px rgba(42,35,20,.06)}.degree-path-steps{display:flex;flex-wrap:wrap;align-items:center;gap:9px;color:#b89446;font-weight:900}.degree-path-steps span{padding:8px 11px;border-radius:999px;background:#f0eee9;color:var(--deep);font-size:12px;font-weight:850}.degree-path-steps span:last-child{background:#eaf3ef;color:#0f766e}
        .degree-section-head{display:flex;align-items:center;gap:14px;margin-bottom:16px}.degree-section-head>span{display:grid;width:40px;height:40px;place-items:center;border-radius:13px;background:var(--deep);color:#fff;font-size:11px;font-weight:950}.degree-section-head p{margin:0;color:#8a7047;font-size:9px;font-weight:950;letter-spacing:.16em;text-transform:uppercase}.degree-section-head h3{margin:3px 0 0;color:var(--deep);font-family:Georgia,serif;font-size:30px;font-weight:500;letter-spacing:-.045em}
        .degree-card-row{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px}.degree-card{--degree-accent:#4b3f8f;position:relative;overflow:hidden;display:grid;gap:8px;min-height:178px;padding:18px;border:1px solid #ddd5c8;border-radius:22px;background:linear-gradient(145deg,#fffdf9,#f7f1e8);text-align:left;box-shadow:0 16px 36px rgba(42,35,20,.07);transition:transform .28s cubic-bezier(.16,1,.3,1),box-shadow .28s ease,border-color .28s ease}.degree-card:before{position:absolute;right:-36px;top:-36px;width:110px;height:110px;border-radius:50%;background:color-mix(in srgb,var(--degree-accent) 15%,transparent);content:""}.degree-card:hover,.degree-card.active{transform:translateY(-5px);border-color:color-mix(in srgb,var(--degree-accent) 45%,#d9d0c2);box-shadow:0 24px 52px rgba(42,35,20,.13)}.degree-card.active{background:linear-gradient(145deg,#fffdf9,color-mix(in srgb,var(--degree-accent) 9%,#f7f1e8))}.degree-card-mark{display:grid;width:42px;height:42px;place-items:center;border-radius:13px;background:var(--degree-accent);color:#fff;font-size:12px;font-weight:950}.degree-card strong{color:var(--deep);font-family:Georgia,serif;font-size:30px;font-weight:500}.degree-card small{color:#273a34;font-size:12px;font-weight:850}.degree-card em{color:#6b746f;font-size:11px;font-style:normal;line-height:1.45}.degree-card b{margin-top:auto;color:var(--degree-accent);font-size:10px}.degree-explore{color:#8a7047;font-size:9px;font-weight:950;letter-spacing:.1em;text-transform:uppercase}
        .degree-navigation,.degree-academic-map,.degree-book-results,.degree-more-books,.degree-complete-collection{padding:26px;border:1px solid #ddd5c8;border-radius:24px;background:rgba(255,253,249,.82);box-shadow:0 18px 42px rgba(42,35,20,.075),inset 0 1px 0 #fff}.degree-segment-group,.degree-semester-strip{display:flex;gap:8px;overflow:auto;padding:4px}.degree-segment-group button,.degree-semester-strip button{flex:0 0 auto;min-height:40px;padding:0 16px;border:1px solid #d9d0c2;border-radius:999px;background:#fffdf9;color:#4f5b55;font-size:11px;font-weight:850;transition:background .22s ease,border-color .22s ease,color .22s ease,box-shadow .22s ease}.degree-segment-group button.active,.degree-semester-strip button.active{border-color:var(--deep);background:var(--deep);color:#fff;box-shadow:0 10px 20px rgba(37,32,82,.14)}
        .degree-academic-map{display:grid;gap:26px}.degree-category-title span{display:inline-flex;margin-bottom:8px;color:var(--green);font-size:9px;font-weight:950;letter-spacing:.16em;text-transform:uppercase}.degree-category-title h3{margin:0;color:var(--deep);font-family:Georgia,serif;font-size:31px;font-weight:500;letter-spacing:-.045em}.degree-category-title p{max-width:640px;margin:8px 0 0;color:#68736d;font-size:13px;line-height:1.65}.degree-category-title.compact h3{font-size:24px}.degree-subject-grid-main{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:13px;margin-top:17px}.degree-subject-card{display:grid;gap:7px;min-height:145px;padding:18px;border:1px solid #ddd5c8;border-radius:18px;background:linear-gradient(145deg,#fffdf9,#f8f3ea);text-align:left;transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease,background .25s ease}.degree-subject-card:hover,.degree-subject-card.active{transform:translateY(-4px);border-color:#b89446;box-shadow:0 18px 36px rgba(42,35,20,.1)}.degree-subject-card.active{background:linear-gradient(145deg,#fffdf9,#eef4f1)}.degree-subject-card strong{color:#17231f;font-family:Georgia,serif;font-size:20px;font-weight:600;line-height:1.14}.degree-subject-card span{color:#6f7772;font-size:12px}.degree-subject-card b{margin-top:auto;color:#0f766e;font-size:10px}.degree-subject-card em{color:#8a7047;font-size:9px;font-style:normal;font-weight:950;text-transform:uppercase;letter-spacing:.09em}.degree-secondary-columns{display:grid;grid-template-columns:1fr 1fr;gap:20px}.degree-mini-category{padding-top:20px;border-top:1px solid #e5ddd1}.degree-subject-list{display:grid;gap:8px;margin-top:14px}.degree-subject-list button{display:flex;justify-content:space-between;gap:10px;min-height:44px;align-items:center;padding:0 14px;border:1px solid #e1d7c8;border-radius:13px;background:#fffdf9;color:#26362f;text-align:left;font-size:12px;transition:.22s ease}.degree-subject-list button.active,.degree-subject-list button:hover{border-color:#b89446;background:#f8f3ea}.degree-subject-list b{color:var(--green);font-size:9px;text-transform:uppercase}.degree-life-skill{padding:22px;border:1px solid #e1d7c8;border-radius:20px;background:linear-gradient(135deg,#fffdf9,#f8f3ea)}.degree-life-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:11px;margin-top:14px}.degree-life-row button{min-height:58px;padding:11px;border:1px solid #e1d7c8;border-radius:14px;background:#fffdf9;color:#26362f;font-weight:850;text-align:left}.degree-life-row button span{display:block;margin-top:5px;color:var(--green);font-size:9px;text-transform:uppercase}.degree-life-row button.active,.degree-life-row button:hover{border-color:#b89446;box-shadow:0 12px 24px rgba(42,35,20,.08)}
        .degree-results-head{display:flex;justify-content:space-between;gap:16px;margin-bottom:18px;padding-bottom:17px;border-bottom:1px solid #e5ddd1}.degree-results-head p{margin:0 0 5px;color:#8a7047;font-size:9px;font-weight:950;letter-spacing:.16em;text-transform:uppercase}.degree-results-head h3{margin:0;color:var(--deep);font-family:Georgia,serif;font-size:32px;font-weight:500;letter-spacing:-.045em}.degree-results-head span{display:block;margin-top:6px;color:#68736d;font-size:12px}.degree-results-head>b{align-self:start;padding:8px 12px;border-radius:999px;background:#eef5f2;color:#0f766e;font-size:11px}.degree-result-grid,.degree-more-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}.degree-book-card{display:flex;min-height:420px;flex-direction:column;padding:14px;border:1px solid #ddd5c8;border-radius:22px;background:linear-gradient(145deg,#fffdf9,#f8f3ea);box-shadow:0 15px 32px rgba(42,35,20,.075);transition:transform .28s ease,border-color .28s ease,box-shadow .28s ease}.degree-book-card:hover{transform:translateY(-5px);border-color:#cfc2ae;box-shadow:0 24px 46px rgba(42,35,20,.13)}.degree-book-cover-btn{display:grid;min-height:210px;place-items:center;border:0;border-radius:16px;background:radial-gradient(ellipse at 50% 82%,rgba(42,35,20,.12),transparent 24%),linear-gradient(180deg,#f3eadb,#e9dcc9)}.degree-book-cover-btn .book-cover{width:108px}.degree-book-card h4{margin:12px 0 7px;color:#17231f;font-family:Georgia,serif;font-size:20px;font-weight:600;line-height:1.12}.degree-book-card p{margin:0;color:#6f7772;font-size:12px}.degree-book-card small,.degree-book-card>div>span{color:var(--green);font-size:10px;font-weight:850}.degree-book-actions{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:auto;padding-top:14px}.degree-book-actions strong{margin-right:auto;color:var(--deep);font-family:Georgia,serif;font-size:25px;font-weight:500}.degree-book-actions .view,.degree-book-actions .add{min-height:36px;padding:0 11px;border-radius:9px}.degree-load-more{display:flex;justify-content:center;margin-top:18px}.degree-load-more button{min-height:44px;padding:0 18px;border:1px solid #d9d0c2;border-radius:999px;background:#fffdf9;color:var(--deep);font-size:10px;font-weight:950;letter-spacing:.1em;text-transform:uppercase}.degree-more-books h3,.degree-complete-collection h3{margin:0;color:var(--deep);font-family:Georgia,serif;font-size:30px;font-weight:500;letter-spacing:-.045em}.degree-more-books p,.degree-complete-collection p{margin:7px 0 18px;color:#68736d;font-size:13px}.degree-complete-collection{display:flex;align-items:center;justify-content:space-between;gap:20px;background:linear-gradient(135deg,#fffdf9,#f6f1e8 62%,#eef4f1)}.degree-complete-cta{padding:0 20px;white-space:nowrap}
        .degree-premium-showcase{position:relative;overflow:hidden;padding:28px;border:1px solid #d8cbb8;border-radius:28px;background:radial-gradient(circle at 92% 0,rgba(184,148,70,.16),transparent 30%),linear-gradient(135deg,#fffdf9 0%,#f7f0e5 58%,#eef3f0 100%);box-shadow:0 28px 66px rgba(42,35,20,.12),inset 0 1px 0 #fff}.degree-premium-showcase:before{position:absolute;inset:15px;border:1px solid rgba(184,148,70,.18);border-radius:20px;pointer-events:none;content:""}.degree-premium-showcase>*{position:relative;z-index:1}.degree-showcase-head{display:flex;align-items:end;justify-content:space-between;gap:18px;margin-bottom:20px}.degree-showcase-head p{margin:0 0 6px;color:#8a7047;font-size:9px;font-weight:950;letter-spacing:.18em;text-transform:uppercase}.degree-showcase-head h3{margin:0;color:var(--deep);font-family:Georgia,serif;font-size:34px;font-weight:500;letter-spacing:-.05em}.degree-showcase-head span{max-width:330px;color:#66726b;font-size:12px;line-height:1.55;text-align:right}.degree-showcase-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px}.degree-show-book{position:relative;display:grid;min-height:315px;grid-template-rows:180px auto;padding:12px;border:1px solid #ddd5c8;border-radius:20px;background:rgba(255,253,249,.82);box-shadow:0 16px 34px rgba(42,35,20,.09),inset 0 1px 0 #fff;text-align:left;transition:transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s ease,border-color .3s ease}.degree-show-book:hover{transform:translateY(-7px);border-color:#b89446;box-shadow:0 26px 54px rgba(42,35,20,.16),inset 0 1px 0 #fff}.degree-show-cover{display:grid;place-items:center;border-radius:15px;background:radial-gradient(ellipse at 50% 82%,rgba(42,35,20,.14),transparent 26%),linear-gradient(180deg,#f3eadb,#e8dccb)}.degree-show-cover .book-cover{width:92px}.degree-show-copy{display:grid;gap:6px;padding:12px 3px 2px}.degree-show-copy small{color:var(--green);font-size:9px;font-weight:900;letter-spacing:.09em;text-transform:uppercase}.degree-show-copy strong{display:-webkit-box;overflow:hidden;color:#17231f;font-family:Georgia,serif;font-size:18px;font-weight:600;line-height:1.12;-webkit-line-clamp:2;-webkit-box-orient:vertical}.degree-show-copy span{color:#68736d;font-size:11px}.degree-show-price{display:flex;align-items:center;justify-content:space-between;margin-top:4px}.degree-show-price b{color:var(--deep);font-family:Georgia,serif;font-size:23px;font-weight:500}.degree-show-price em{color:#8a7047;font-size:9px;font-style:normal;font-weight:950;text-transform:uppercase}.degree-classification-ribbon{display:grid;grid-template-columns:1.2fr 1fr 1fr .9fr;gap:10px;margin-top:16px}.degree-classification-ribbon button{min-height:74px;padding:12px;border:1px solid rgba(184,148,70,.24);border-radius:16px;background:rgba(255,253,249,.7);text-align:left;box-shadow:inset 0 1px 0 #fff;transition:.24s ease}.degree-classification-ribbon button:hover,.degree-classification-ribbon button.active{transform:translateY(-3px);border-color:var(--deep);background:#fffdf9;box-shadow:0 14px 28px rgba(42,35,20,.1),inset 0 1px 0 #fff}.degree-classification-ribbon span{display:block;color:#8a7047;font-size:8px;font-weight:950;letter-spacing:.14em;text-transform:uppercase}.degree-classification-ribbon strong{display:block;margin-top:5px;color:var(--deep);font-family:Georgia,serif;font-size:18px;font-weight:600}.degree-classification-ribbon small{display:block;margin-top:5px;color:#68736d;font-size:10px}
        @media(max-width:1180px){.degree-card-row{grid-template-columns:repeat(3,minmax(0,1fr))}.degree-subject-grid-main{grid-template-columns:repeat(3,minmax(0,1fr))}.degree-result-grid,.degree-more-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.degree-quick-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.degree-showcase-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.degree-classification-ribbon{grid-template-columns:repeat(2,minmax(0,1fr))}.shop-page.section-degree .layout{grid-template-columns:280px minmax(0,1fr)}}
        @media(max-width:920px){.shop-page.section-degree .layout{grid-template-columns:1fr}.degree-collection-hero{grid-template-columns:1fr;padding:36px 28px}.degree-card-row{display:flex;overflow:auto;padding-bottom:8px}.degree-card{min-width:220px}.degree-secondary-columns{grid-template-columns:1fr}.degree-result-grid,.degree-more-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.degree-path-card,.degree-complete-collection{align-items:flex-start;flex-direction:column}.degree-subject-grid-main{grid-template-columns:repeat(2,minmax(0,1fr))}.degree-showcase-head{align-items:flex-start;flex-direction:column}.degree-showcase-head span{text-align:left}.degree-showcase-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media(max-width:620px){.shop-page.section-degree .wrap{width:min(100% - 22px,1360px)}.degree-collection-hero{padding:30px 22px;border-radius:22px}.degree-collection-hero h2{font-size:43px}.degree-quick-find,.degree-navigation,.degree-academic-map,.degree-book-results,.degree-more-books,.degree-complete-collection,.degree-premium-showcase{padding:18px;border-radius:20px}.degree-quick-grid,.degree-subject-grid-main,.degree-life-row,.degree-classification-ribbon{grid-template-columns:1fr}.degree-result-grid,.degree-more-grid,.degree-showcase-grid{grid-template-columns:1fr}.degree-book-card{min-height:0}.degree-book-cover-btn{min-height:230px}.degree-results-head{flex-direction:column}.degree-section-head h3,.degree-category-title h3,.degree-results-head h3,.degree-more-books h3,.degree-complete-collection h3,.degree-showcase-head h3{font-size:26px}}
      `}</style>


      <style>{`
        /* Premium Degree Classification Board */
        .degree-classification-board{
          position:relative;
          overflow:hidden;
          padding:30px;
          border:1px solid rgba(184,148,70,.26);
          border-radius:28px;
          background:
            radial-gradient(circle at 96% 8%,rgba(184,148,70,.18),transparent 30%),
            radial-gradient(circle at 8% 0,rgba(75,63,143,.09),transparent 34%),
            linear-gradient(135deg,#fffdf9 0%,#f7f1e8 55%,#eef4f1 100%);
          box-shadow:0 26px 62px rgba(42,35,20,.11),inset 0 1px 0 #fff;
        }
        .degree-classification-board:before{
          position:absolute;
          inset:16px;
          border:1px solid rgba(184,148,70,.16);
          border-radius:20px;
          pointer-events:none;
          content:"";
        }
        .degree-classification-board>*{position:relative;z-index:1}
        .degree-classification-head{
          display:flex;
          align-items:end;
          justify-content:space-between;
          gap:24px;
          margin-bottom:22px;
          padding-bottom:18px;
          border-bottom:1px solid rgba(21,34,30,.1);
        }
        .degree-classification-head p{
          margin:0 0 7px;
          color:var(--green);
          font-size:9px;
          font-weight:950;
          letter-spacing:.2em;
          text-transform:uppercase;
        }
        .degree-classification-head h3{
          margin:0;
          color:var(--deep);
          font-family:Georgia,'Times New Roman',serif;
          font-size:clamp(29px,3.6vw,46px);
          font-weight:500;
          letter-spacing:-.055em;
          line-height:.98;
        }
        .degree-classification-head span{
          max-width:360px;
          color:#66726b;
          font-size:12px;
          line-height:1.65;
          text-align:right;
        }
        .degree-classification-track{
          display:grid;
          grid-template-columns:1.25fr .95fr .95fr .9fr;
          gap:14px;
          align-items:stretch;
        }
        .degree-partition-card{
          --partition-accent:var(--deep);
          position:relative;
          overflow:hidden;
          display:flex;
          min-height:260px;
          flex-direction:column;
          gap:12px;
          padding:20px;
          border:1px solid rgba(21,34,30,.12);
          border-radius:22px;
          background:rgba(255,253,249,.72);
          text-align:left;
          box-shadow:0 16px 34px rgba(42,35,20,.07),inset 0 1px 0 rgba(255,255,255,.85);
          transition:transform .3s cubic-bezier(.16,1,.3,1),border-color .3s ease,box-shadow .3s ease,background .3s ease;
        }
        .degree-partition-card:before{
          position:absolute;
          top:0;
          left:0;
          right:0;
          height:4px;
          background:linear-gradient(90deg,var(--partition-accent),color-mix(in srgb,var(--partition-accent) 26%,transparent));
          content:"";
        }
        .degree-partition-card:after{
          position:absolute;
          right:-42px;
          top:-42px;
          width:132px;
          height:132px;
          border-radius:50%;
          background:color-mix(in srgb,var(--partition-accent) 13%,transparent);
          content:"";
        }
        .degree-partition-card:hover,.degree-partition-card.active{
          transform:translateY(-6px);
          border-color:color-mix(in srgb,var(--partition-accent) 42%,#d9d0c2);
          background:#fffdf9;
          box-shadow:0 26px 52px rgba(42,35,20,.14),inset 0 1px 0 #fff;
        }
        .degree-partition-card.active{
          outline:3px solid color-mix(in srgb,var(--partition-accent) 13%,transparent);
        }
        .degree-partition-top{
          position:relative;
          z-index:1;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:12px;
        }
        .degree-partition-number{
          display:grid;
          width:42px;
          height:42px;
          place-items:center;
          border-radius:14px;
          background:var(--partition-accent);
          color:#fff;
          font-size:11px;
          font-weight:950;
          box-shadow:0 12px 22px color-mix(in srgb,var(--partition-accent) 22%,transparent);
        }
        .degree-partition-count{
          padding:6px 9px;
          border:1px solid color-mix(in srgb,var(--partition-accent) 18%,#ded7ca);
          border-radius:999px;
          background:#fffdf9;
          color:var(--partition-accent);
          font-size:9px;
          font-weight:900;
          letter-spacing:.08em;
          text-transform:uppercase;
        }
        .degree-partition-card strong{
          position:relative;
          z-index:1;
          color:var(--deep);
          font-family:Georgia,'Times New Roman',serif;
          font-size:24px;
          font-weight:600;
          letter-spacing:-.035em;
          line-height:1.02;
        }
        .degree-partition-card p{
          position:relative;
          z-index:1;
          margin:0;
          color:#66726b;
          font-size:12px;
          line-height:1.55;
        }
        .degree-partition-subjects{
          position:relative;
          z-index:1;
          display:grid;
          gap:7px;
          margin-top:auto;
          padding-top:12px;
          border-top:1px solid rgba(21,34,30,.09);
        }
        .degree-partition-subjects span{
          display:flex;
          align-items:center;
          gap:8px;
          min-width:0;
          color:#26362f;
          font-size:11px;
          font-weight:760;
          line-height:1.35;
        }
        .degree-partition-subjects span:before{
          width:6px;
          height:6px;
          flex:0 0 auto;
          border-radius:50%;
          background:var(--partition-accent);
          content:"";
        }
        .degree-partition-action{
          position:relative;
          z-index:1;
          margin-top:2px;
          color:var(--partition-accent);
          font-size:10px;
          font-weight:950;
          letter-spacing:.1em;
          text-transform:uppercase;
        }
        .degree-partition-card.core{--partition-accent:#252052;min-height:290px}
        .degree-partition-card.minor{--partition-accent:#8a4c25}
        .degree-partition-card.multi{--partition-accent:#075985}
        .degree-partition-card.life{--partition-accent:#0f766e}
        @media(max-width:1180px){.degree-classification-track{grid-template-columns:repeat(2,minmax(0,1fr))}.degree-partition-card.core{min-height:260px}}
        @media(max-width:680px){.degree-classification-board{padding:20px;border-radius:22px}.degree-classification-head{align-items:flex-start;flex-direction:column}.degree-classification-head span{text-align:left}.degree-classification-track{display:flex;overflow:auto;padding:3px 2px 10px;scroll-snap-type:x mandatory}.degree-partition-card{min-width:260px;scroll-snap-align:start}.degree-partition-card.core{min-width:286px}}
        @media(prefers-reduced-motion:reduce){.degree-partition-card{transition:none!important}}
      `}</style>

      <style>{`
        /* Warm premium Degree polish: lighter palette, clearer books, refined title motion */
        .shop-page.section-degree{
          --degree-warm-bg:#fffaf1;
          --degree-cream:#fffdf8;
          --degree-sand:#f3e6d0;
          --degree-line:#e6d7bd;
          --degree-ink:#24312d;
          --degree-muted:#756f64;
          --degree-warm-gold:#c79b46;
          --degree-soft-green:#eef7f1;
          --deep:#174f45;
          --green:#1c6f62;
          --gold:#c79b46;
          background:
            radial-gradient(circle at 10% -4%,rgba(199,155,70,.10),transparent 34%),
            radial-gradient(circle at 92% 2%,rgba(7,91,89,.07),transparent 30%),
            linear-gradient(180deg,#fffaf1 0%,#fbf3e6 48%,#fffdf8 100%);
        }
        .shop-page.section-degree .degree-discovery{gap:30px}
        .shop-page.section-degree .degree-collection-hero,
        .shop-page.section-degree .degree-quick-find,
        .shop-page.section-degree .degree-navigation,
        .shop-page.section-degree .degree-academic-map,
        .shop-page.section-degree .degree-book-results,
        .shop-page.section-degree .degree-more-books,
        .shop-page.section-degree .degree-complete-collection,
        .shop-page.section-degree .degree-premium-showcase,
        .shop-page.section-degree .degree-classification-board{
          border-color:var(--degree-line);
          background:linear-gradient(145deg,rgba(255,253,248,.94),rgba(248,237,218,.72) 72%,rgba(238,247,241,.48));
          box-shadow:0 22px 54px rgba(98,72,32,.10),inset 0 1px 0 rgba(255,255,255,.95);
        }
        .shop-page.section-degree .degree-collection-hero h2,
        .shop-page.section-degree .degree-showcase-head h3,
        .shop-page.section-degree .degree-classification-head h3,
        .shop-page.section-degree .degree-results-head h3,
        .shop-page.section-degree .degree-more-books h3,
        .shop-page.section-degree .degree-complete-collection h3,
        .shop-page.section-degree .degree-section-head h3,
        .shop-page.section-degree .degree-category-title h3{
          color:#173f37;
          text-shadow:0 10px 24px rgba(199,155,70,.10);
        }
        .shop-page.section-degree .degree-collection-hero p,
        .shop-page.section-degree .degree-classification-head span,
        .shop-page.section-degree .degree-showcase-head span,
        .shop-page.section-degree .degree-category-title p{
          color:var(--degree-muted);
        }
        .shop-page.section-degree .degree-showcase-grid,
        .shop-page.section-degree .degree-result-grid,
        .shop-page.section-degree .degree-more-grid{
          gap:18px;
        }
        .shop-page.section-degree .degree-show-book,
        .shop-page.section-degree .degree-book-card{
          border-color:#e5d4b8;
          background:
            linear-gradient(180deg,rgba(255,253,248,.98),rgba(250,241,225,.92)),
            radial-gradient(circle at 50% 0,rgba(199,155,70,.10),transparent 36%);
          box-shadow:0 18px 38px rgba(96,71,33,.12),0 2px 0 rgba(255,255,255,.9) inset;
        }
        .shop-page.section-degree .degree-show-book:hover,
        .shop-page.section-degree .degree-book-card:hover{
          transform:translateY(-7px);
          border-color:#d5bd8d;
          box-shadow:0 28px 58px rgba(96,71,33,.18),0 0 0 1px rgba(255,255,255,.78) inset;
        }
        .shop-page.section-degree .degree-show-cover,
        .shop-page.section-degree .degree-book-cover-btn{
          background:
            radial-gradient(ellipse at 50% 84%,rgba(81,58,24,.16),transparent 28%),
            linear-gradient(180deg,#fff7e8 0%,#ead9bc 100%);
          border:1px solid rgba(255,255,255,.72);
          box-shadow:inset 0 1px 0 rgba(255,255,255,.92),0 12px 24px rgba(96,71,33,.08);
        }
        .shop-page.section-degree .degree-show-cover .book-cover,
        .shop-page.section-degree .degree-book-cover-btn .book-cover{
          filter:drop-shadow(0 16px 18px rgba(61,43,18,.22));
          transform:perspective(900px) rotateY(-6deg) rotateZ(-1deg);
          transition:transform .42s cubic-bezier(.16,1,.3,1),filter .42s ease;
        }
        .shop-page.section-degree .degree-show-book:hover .book-cover,
        .shop-page.section-degree .degree-book-card:hover .book-cover{
          transform:perspective(900px) rotateY(-2deg) rotateZ(-1.8deg) translateY(-7px);
          filter:drop-shadow(0 22px 24px rgba(61,43,18,.27));
        }
        .shop-page.section-degree .degree-show-copy strong,
        .shop-page.section-degree .degree-book-card h4{
          color:#20312c;
          font-weight:650;
          transform:perspective(900px) rotateZ(-1.25deg) skewX(-1.1deg);
          text-shadow:0 8px 18px rgba(199,155,70,.08);
        }
        .shop-page.section-degree .degree-show-book:hover .degree-show-copy strong,
        .shop-page.section-degree .degree-book-card:hover h4{
          color:#0f4d43;
          transform:perspective(900px) rotateZ(-2deg) skewX(-1.3deg) translateX(4px);
          text-shadow:0 12px 24px rgba(7,91,89,.12);
        }
        .shop-page.section-degree .degree-show-copy small,
        .shop-page.section-degree .degree-book-card small,
        .shop-page.section-degree .degree-book-card>div>span{
          color:#8a6625;
        }
        .shop-page.section-degree .degree-show-price b,
        .shop-page.section-degree .degree-book-actions strong{
          color:#173f37;
        }
        .shop-page.section-degree .degree-book-actions .view,
        .shop-page.section-degree .degree-book-actions .add,
        .shop-page.section-degree .degree-complete-cta,
        .shop-page.section-degree .degree-quick-cta,
        .shop-page.section-degree .degree-hero-search button{
          background:linear-gradient(135deg,#174f45,#0b3f38);
          box-shadow:0 12px 24px rgba(7,91,89,.16);
        }
        .shop-page.section-degree .degree-classification-board{
          background:
            radial-gradient(circle at 94% 8%,rgba(199,155,70,.16),transparent 30%),
            linear-gradient(135deg,#fffdf8 0%,#f8edd8 58%,#eff8f2 100%);
        }
        .shop-page.section-degree .degree-partition-card{
          border-color:#e5d4b8;
          background:rgba(255,253,248,.78);
          box-shadow:0 16px 34px rgba(96,71,33,.09),inset 0 1px 0 rgba(255,255,255,.94);
        }
        .shop-page.section-degree .degree-partition-card.core{--partition-accent:#174f45}
        .shop-page.section-degree .degree-partition-card.minor{--partition-accent:#a8642e}
        .shop-page.section-degree .degree-partition-card.multi{--partition-accent:#376c8e}
        .shop-page.section-degree .degree-partition-card.life{--partition-accent:#6c8d3f}
        .shop-page.section-degree .degree-partition-card:hover,
        .shop-page.section-degree .degree-partition-card.active{
          background:#fffdf8;
          border-color:color-mix(in srgb,var(--partition-accent) 34%,#d8c399);
          box-shadow:0 26px 52px rgba(96,71,33,.15),inset 0 1px 0 #fff;
        }
        .shop-page.section-degree .degree-partition-card strong{color:#20312c}
        .shop-page.section-degree .degree-partition-card p,
        .shop-page.section-degree .degree-partition-subjects span{color:#625f57}

        /* Modern premium upgrade: books first, lighter surfaces, full 72-subject visibility */
        .shop-page.section-degree .degree-premium-showcase{
          padding:34px;
          border-radius:32px;
          background:
            radial-gradient(circle at 88% 0,rgba(199,155,70,.18),transparent 30%),
            linear-gradient(145deg,#fffefb 0%,#fbf0dc 54%,#eef8f2 100%);
        }
        .shop-page.section-degree .degree-showcase-grid{grid-template-columns:repeat(4,minmax(0,1fr))}
        .shop-page.section-degree .degree-show-book{
          min-height:336px;
          grid-template-rows:188px auto;
          border-radius:24px;
          background:linear-gradient(180deg,#fffefb,#fbf2e2);
        }
        .shop-page.section-degree .degree-show-book:focus-visible,
        .shop-page.section-degree .degree-book-card:focus-within{outline:3px solid rgba(28,111,98,.18);outline-offset:3px}
        .shop-page.section-degree .degree-show-copy strong,
        .shop-page.section-degree .degree-book-card h4{
          color:#1f2f2a;
          font-size:19px;
          letter-spacing:-.035em;
        }
        .shop-page.section-degree .degree-book-card h4{font-size:21px}
        .shop-page.section-degree .degree-show-price em{color:#1c6f62}
        .shop-page.section-degree .degree-result-grid,
        .shop-page.section-degree .degree-more-grid{grid-template-columns:repeat(4,minmax(0,1fr))}
        .shop-page.section-degree .degree-book-card{
          min-height:390px;
          padding:13px;
          border-radius:24px;
          background:linear-gradient(180deg,#fffefb,#fbf2e2);
        }
        .shop-page.section-degree .degree-book-cover-btn{min-height:196px;border-radius:18px}
        .shop-page.section-degree .degree-book-cover-btn .book-cover{width:100px}
        .shop-page.section-degree .degree-book-actions .view{border:1px solid #d9c7a5;background:#fffdf8;color:#174f45;box-shadow:none}
        .shop-page.section-degree .degree-book-actions .add{background:linear-gradient(135deg,#174f45,#0b3f38)}

        .shop-page.section-degree .degree-classification-board{
          padding:34px;
          border-radius:34px;
          background:
            radial-gradient(circle at 92% 5%,rgba(199,155,70,.18),transparent 26%),
            radial-gradient(circle at 4% 6%,rgba(28,111,98,.10),transparent 30%),
            linear-gradient(135deg,#fffefb 0%,#fbf0dc 54%,#eff8f2 100%);
        }
        .shop-page.section-degree .degree-classification-head{align-items:flex-start}
        .shop-page.section-degree .degree-classification-head h3{max-width:740px}
        .shop-page.section-degree .degree-classification-track{grid-template-columns:1.15fr 1fr 1fr 1fr}
        .shop-page.section-degree .degree-partition-card{
          min-height:236px;
          border-radius:24px;
          background:rgba(255,254,251,.82);
        }
        .shop-page.section-degree .degree-partition-card.core{min-height:270px}
        .shop-page.section-degree .degree-partition-card strong{font-size:25px}
        .degree-all-subjects{
          margin-top:22px;
          padding-top:22px;
          border-top:1px solid rgba(101,83,45,.13);
        }
        .degree-all-subjects-head{
          display:flex;
          align-items:end;
          justify-content:space-between;
          gap:18px;
          margin-bottom:16px;
        }
        .degree-all-subjects-head p{
          margin:0 0 6px;
          color:#8a6625;
          font-size:9px;
          font-weight:950;
          letter-spacing:.18em;
          text-transform:uppercase;
        }
        .degree-all-subjects-head h4{
          margin:0;
          color:#174f45;
          font-family:Georgia,'Times New Roman',serif;
          font-size:28px;
          font-weight:500;
          letter-spacing:-.045em;
          line-height:1.04;
        }
        .degree-all-subjects-head>span{
          flex:0 0 auto;
          padding:8px 12px;
          border:1px solid #e2d2b5;
          border-radius:999px;
          background:#fffefb;
          color:#174f45;
          font-size:11px;
          font-weight:900;
          letter-spacing:.08em;
          text-transform:uppercase;
        }
        .degree-subject-cloud{
          display:grid;
          grid-template-columns:repeat(4,minmax(0,1fr));
          gap:10px;
          max-height:540px;
          overflow:auto;
          padding:2px 4px 4px 2px;
          scrollbar-color:rgba(28,111,98,.25) transparent;
          scrollbar-width:thin;
        }
        .degree-subject-cloud button{
          display:grid;
          grid-template-columns:34px minmax(0,1fr);
          gap:9px;
          align-items:center;
          min-height:70px;
          padding:10px;
          border:1px solid #e4d5ba;
          border-radius:16px;
          background:linear-gradient(145deg,#fffefb,#fbf3e4);
          text-align:left;
          box-shadow:0 10px 22px rgba(96,71,33,.07),inset 0 1px 0 #fff;
          transition:transform .24s cubic-bezier(.16,1,.3,1),border-color .24s ease,box-shadow .24s ease,background .24s ease;
        }
        .degree-subject-cloud button:hover{
          transform:translateY(-3px);
          border-color:#d0ad6b;
          background:#fffefb;
          box-shadow:0 16px 30px rgba(96,71,33,.12),inset 0 1px 0 #fff;
        }
        .degree-subject-cloud b{
          display:grid;
          width:34px;
          height:34px;
          place-items:center;
          border-radius:12px;
          background:#eef7f1;
          color:#174f45;
          font-size:10px;
          font-weight:950;
        }
        .degree-subject-cloud span{
          overflow:hidden;
          color:#273832;
          font-size:12px;
          font-weight:820;
          line-height:1.25;
          text-overflow:ellipsis;
        }
        .degree-subject-cloud small{
          grid-column:2;
          margin-top:-3px;
          color:#8a6625;
          font-size:8px;
          font-weight:900;
          letter-spacing:.08em;
          text-transform:uppercase;
        }
        @media(max-width:1180px){
          .shop-page.section-degree .degree-showcase-grid,
          .shop-page.section-degree .degree-result-grid,
          .shop-page.section-degree .degree-more-grid,
          .degree-subject-cloud{grid-template-columns:repeat(3,minmax(0,1fr))}
          .shop-page.section-degree .degree-classification-track{grid-template-columns:repeat(2,minmax(0,1fr))}
        }
        @media(max-width:920px){
          .shop-page.section-degree .degree-showcase-grid,
          .shop-page.section-degree .degree-result-grid,
          .shop-page.section-degree .degree-more-grid,
          .degree-subject-cloud{grid-template-columns:repeat(2,minmax(0,1fr))}
        }
        @media(max-width:620px){
          .shop-page.section-degree .degree-showcase-grid,
          .shop-page.section-degree .degree-result-grid,
          .shop-page.section-degree .degree-more-grid{gap:16px;grid-template-columns:1fr}
          .shop-page.section-degree .degree-show-book,
          .shop-page.section-degree .degree-book-card{border-radius:18px}
          .shop-page.section-degree .degree-classification-board,
          .shop-page.section-degree .degree-premium-showcase{padding:20px;border-radius:22px}
          .shop-page.section-degree .degree-classification-track,
          .degree-subject-cloud{grid-template-columns:1fr}
          .degree-all-subjects-head{align-items:flex-start;flex-direction:column}
          .degree-subject-cloud{max-height:none}
        }
        @media(prefers-reduced-motion:reduce){
          .shop-page.section-degree .degree-show-cover .book-cover,
          .shop-page.section-degree .degree-book-cover-btn .book-cover,
          .shop-page.section-degree .degree-show-copy strong,
          .shop-page.section-degree .degree-book-card h4,
          .degree-subject-cloud button{transition:none!important;transform:none!important}
        }
      `}</style>

      <style>{`
        /* Vijayam Degree v2 — warm premium academic commerce override */
        .shop-page.section-degree{
          --degree-bg:#FAF7F2;
          --degree-surface:#FFFFFF;
          --degree-ink:#1C1B19;
          --degree-muted:#706B63;
          --degree-cta:#C7663F;
          --degree-cta-dark:#A94D32;
          --degree-copper:#D99A63;
          --degree-soft:#F3E9DF;
          --degree-border:#E8E1D8;
          --degree-divider:#DDD5CB;
          --green:#C7663F;
          --deep:#1C1B19;
          --gold:#D99A63;
          --section-soft:#F3E9DF;
          --section-glow:rgba(199,102,63,.10);
          background:linear-gradient(180deg,#FAF7F2 0%,#F7EFE7 48%,#FAF7F2 100%)!important;
          color:var(--degree-ink);
        }
        .shop-page.section-degree .catalogue-masthead,
        .shop-page.section-degree .hero,
        .shop-page.section-degree .toolbar,
        .shop-page.section-degree .summary,
        .shop-page.section-degree .degree-journey-panel,
        .shop-page.section-degree .degree-navigation,
        .shop-page.section-degree .degree-selector{display:none!important}
        .shop-page.section-degree .wrap{width:min(1380px,calc(100% - 56px))}
        .shop-page.section-degree .layout{display:block}
        .shop-page.section-degree .sidebar{display:none!important}
        .shop-page.section-degree .content{width:100%}
        .shop-page.section-degree .topbar{background:rgba(250,247,242,.88);border-bottom:1px solid var(--degree-divider)}
        .shop-page.section-degree .topbar:after{display:none}
        .shop-page.section-degree .topbar-inner{border-color:var(--degree-border);border-radius:18px;background:rgba(255,255,255,.86);box-shadow:0 18px 42px rgba(40,30,20,.08),inset 0 1px 0 #fff}
        .shop-page.section-degree .cart-btn,
        .shop-page.section-degree .degree-quick-cta,
        .shop-page.section-degree .degree-hero-search button,
        .shop-page.section-degree .degree-book-actions .add,
        .shop-page.section-degree .degree-complete-cta{position:relative;overflow:hidden;background:var(--degree-cta)!important;color:#fff!important;border:0!important;border-radius:12px!important;box-shadow:0 12px 24px rgba(199,102,63,.18)!important;transition:transform .22s ease,background .22s ease,box-shadow .22s ease!important}
        .shop-page.section-degree .cart-btn:hover,
        .shop-page.section-degree .degree-quick-cta:hover,
        .shop-page.section-degree .degree-hero-search button:hover,
        .shop-page.section-degree .degree-book-actions .add:hover,
        .shop-page.section-degree .degree-complete-cta:hover{background:var(--degree-cta-dark)!important;transform:translateY(-2px)!important;box-shadow:0 16px 30px rgba(169,77,50,.22)!important}
        .shop-page.section-degree .degree-quick-cta span{display:inline-block;transition:transform .22s ease}.shop-page.section-degree .degree-quick-cta:hover span{transform:translateX(4px)}
        .shop-page.section-degree .degree-discovery{gap:34px;animation:degree-fade-in .42s ease both}
        .shop-page.section-degree .degree-collection-hero{order:1}
        .shop-page.section-degree .degree-quick-find{order:2}
        .shop-page.section-degree .degree-path-card{order:3}
        .shop-page.section-degree .degree-academic-map{order:4}
        .shop-page.section-degree .degree-classification-board{order:5}
        .shop-page.section-degree .degree-book-results{order:6}
        .shop-page.section-degree .degree-more-books{order:7}
        .shop-page.section-degree .degree-complete-collection{order:8}
        @keyframes degree-fade-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
        .shop-page.section-degree .degree-collection-hero{min-height:360px;grid-template-columns:minmax(0,1fr) 330px;padding:64px;border:1px solid var(--degree-border);border-radius:32px;background:radial-gradient(circle at 90% 12%,rgba(217,154,99,.14),transparent 30%),linear-gradient(135deg,#fff 0%,#FAF7F2 62%,#F3E9DF 100%);box-shadow:0 28px 70px rgba(42,31,22,.10),inset 0 1px 0 #fff}
        .shop-page.section-degree .degree-collection-hero:before{inset:22px;border-color:rgba(217,154,99,.22);border-radius:23px}
        .shop-page.section-degree .degree-hero-kicker,.shop-page.section-degree .degree-quick-head p,.shop-page.section-degree .degree-path-card p,.shop-page.section-degree .degree-section-head p,.shop-page.section-degree .degree-category-title span,.shop-page.section-degree .degree-results-head p,.shop-page.section-degree .degree-showcase-head p,.shop-page.section-degree .degree-classification-head p{color:var(--degree-cta);letter-spacing:.2em}
        .shop-page.section-degree .degree-collection-hero h2{max-width:720px;color:var(--degree-ink);font-size:clamp(52px,7vw,104px);letter-spacing:-.075em;line-height:.88;text-shadow:none}
        .shop-page.section-degree .degree-collection-hero p{color:var(--degree-muted);font-size:17px;max-width:500px}
        .shop-page.section-degree .degree-hero-search{border-color:var(--degree-border);border-radius:22px;background:rgba(255,255,255,.76);box-shadow:0 18px 40px rgba(42,31,22,.08),inset 0 1px 0 #fff}
        .shop-page.section-degree .degree-hero-search strong{color:var(--degree-ink)}
        .shop-page.section-degree .degree-quick-find{padding:34px;border:1px solid var(--degree-border);border-radius:28px;background:#fff;box-shadow:0 22px 54px rgba(42,31,22,.08),inset 0 1px 0 #fff}
        .degree-legacy-selectors{display:none!important}
        .degree-choice-stack{display:grid;gap:18px;margin-top:8px}
        .degree-choice-step{display:grid;grid-template-columns:150px minmax(0,1fr);gap:18px;align-items:start;padding:18px 0;border-top:1px solid var(--degree-divider)}
        .degree-choice-step:first-child{border-top:0;padding-top:0}
        .degree-choice-step>div:first-child{display:grid;gap:4px}.degree-choice-step b{color:var(--degree-copper);font-family:Georgia,serif;font-size:25px;font-weight:500}.degree-choice-step span{color:var(--degree-ink);font-size:10px;font-weight:900;letter-spacing:.16em;text-transform:uppercase}
        .degree-choice-options{display:flex;flex-wrap:wrap;gap:9px}.degree-choice-options button{min-height:42px;padding:0 15px;border:1px solid var(--degree-border);border-radius:12px;background:#fff;color:var(--degree-ink);font-size:12px;font-weight:800;box-shadow:0 5px 14px rgba(42,31,22,.04);transition:transform .22s ease,border-color .22s ease,background .22s ease,color .22s ease,box-shadow .22s ease}.degree-choice-options button:hover{transform:translateY(-2px);border-color:#E0B185;background:#FFF8F1}.degree-choice-options button.active{border-color:var(--degree-cta);background:var(--degree-cta);color:#fff;box-shadow:0 12px 24px rgba(199,102,63,.18)}
        .subject-options{max-height:230px;overflow:auto;padding-right:4px;scrollbar-color:rgba(199,102,63,.28) transparent;scrollbar-width:thin}.subject-options button{max-width:280px;text-align:left;justify-content:flex-start}
        .shop-page.section-degree .degree-path-card{padding:26px 30px;border:1px solid var(--degree-border);border-radius:24px;background:linear-gradient(135deg,#fff,#F3E9DF);box-shadow:0 18px 42px rgba(42,31,22,.07)}
        .degree-path-steps span{background:#fff;color:var(--degree-ink);border:1px solid var(--degree-border);border-radius:12px}.degree-path-steps span:last-child{background:#FFF2EA;color:var(--degree-cta);border-color:#E7B892}
        .shop-page.section-degree .degree-academic-map,.shop-page.section-degree .degree-book-results,.shop-page.section-degree .degree-more-books,.shop-page.section-degree .degree-complete-collection,.shop-page.section-degree .degree-premium-showcase,.shop-page.section-degree .degree-classification-board{border-color:var(--degree-border);background:#fff;box-shadow:0 22px 54px rgba(42,31,22,.08),inset 0 1px 0 #fff}
        .shop-page.section-degree .degree-subject-grid-main{grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}.shop-page.section-degree .degree-subject-card,.shop-page.section-degree .degree-subject-list button,.shop-page.section-degree .degree-life-row button{border-color:var(--degree-border);background:#fff;color:var(--degree-ink);box-shadow:none}.shop-page.section-degree .degree-subject-card:hover,.shop-page.section-degree .degree-subject-card.active,.shop-page.section-degree .degree-subject-list button:hover,.shop-page.section-degree .degree-subject-list button.active,.shop-page.section-degree .degree-life-row button:hover,.shop-page.section-degree .degree-life-row button.active{border-color:#E0B185;background:#FFF8F1;transform:translateY(-3px);box-shadow:0 14px 28px rgba(42,31,22,.08)}
        .shop-page.section-degree .degree-premium-showcase{display:none!important}
        .shop-page.section-degree .degree-book-results{padding:32px;border-radius:28px}.shop-page.section-degree .degree-results-head h3{color:var(--degree-ink)}
        .shop-page.section-degree .degree-result-grid,.shop-page.section-degree .degree-more-grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:20px}.shop-page.section-degree .degree-book-card{min-height:430px;padding:16px;border:1px solid var(--degree-border);border-radius:24px;background:#fff;box-shadow:0 18px 38px rgba(42,31,22,.08);transition:transform .24s ease,border-color .24s ease,box-shadow .24s ease}.shop-page.section-degree .degree-book-card:hover{transform:translateY(-5px);border-color:#D9C4AF;box-shadow:0 26px 52px rgba(42,31,22,.13)}
        .shop-page.section-degree .degree-book-cover-btn{min-height:215px;border-radius:18px;background:linear-gradient(180deg,#FBF4EC,#EDE1D5);border:1px solid rgba(255,255,255,.8)}.shop-page.section-degree .degree-book-cover-btn .book-cover{width:106px;transform:translateY(0);filter:drop-shadow(0 16px 20px rgba(42,31,22,.18));transition:transform .24s ease,filter .24s ease}.shop-page.section-degree .degree-book-card:hover .book-cover{transform:translateY(-5px);filter:drop-shadow(0 22px 26px rgba(42,31,22,.22))}
        .shop-page.section-degree .degree-book-card h4{color:var(--degree-ink);font-size:22px;font-weight:600;letter-spacing:-.035em;line-height:1.12;transform:none!important}.shop-page.section-degree .degree-book-card:hover h4{color:var(--degree-cta);transform:translateX(2px)!important;text-shadow:none}.shop-page.section-degree .degree-book-card h4:after{background:linear-gradient(90deg,var(--degree-copper),transparent)}
        .shop-page.section-degree .degree-book-card p,.shop-page.section-degree .degree-book-card span{color:var(--degree-muted)}.shop-page.section-degree .degree-book-card small{color:var(--degree-cta)}.shop-page.section-degree .degree-book-actions strong{color:var(--degree-ink)}.shop-page.section-degree .degree-book-actions .view{border:1px solid var(--degree-border);background:#fff;color:var(--degree-ink);box-shadow:none}.shop-page.section-degree .degree-book-actions .view:hover{border-color:#E0B185;background:#FFF8F1;transform:translateY(-1px)}
        .shop-page.section-degree .degree-classification-board{padding:32px;border-radius:28px;background:linear-gradient(135deg,#fff,#FAF7F2)}.shop-page.section-degree .degree-classification-track{grid-template-columns:1.15fr 1fr 1fr 1fr}.shop-page.section-degree .degree-partition-card{border-color:var(--degree-border);background:#fff;box-shadow:0 14px 30px rgba(42,31,22,.06)}.shop-page.section-degree .degree-partition-card.core,.shop-page.section-degree .degree-partition-card.minor,.shop-page.section-degree .degree-partition-card.multi,.shop-page.section-degree .degree-partition-card.life{--partition-accent:#C7663F}.shop-page.section-degree .degree-partition-card:hover,.shop-page.section-degree .degree-partition-card.active{border-color:#E0B185;background:#FFF8F1;box-shadow:0 22px 44px rgba(42,31,22,.11)}
        .degree-subject-cloud button{border-color:var(--degree-border);background:#fff;box-shadow:0 10px 22px rgba(42,31,22,.05)}.degree-subject-cloud button:hover{border-color:#E0B185;background:#FFF8F1}.degree-subject-cloud b{background:#FFF2EA;color:var(--degree-cta)}.degree-subject-cloud small{color:var(--degree-cta)}
        .shop-page.section-degree .degree-more-books{background:#FAF7F2}.shop-page.section-degree .degree-complete-collection{background:#1C1B19;color:#fff;border-color:#1C1B19}.shop-page.section-degree .degree-complete-collection h3{color:#fff}.shop-page.section-degree .degree-complete-collection p{color:#D9D0C7}
        @media(max-width:1180px){.shop-page.section-degree .degree-result-grid,.shop-page.section-degree .degree-more-grid,.shop-page.section-degree .degree-subject-grid-main{grid-template-columns:repeat(3,minmax(0,1fr))}.shop-page.section-degree .degree-classification-track{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media(max-width:920px){.shop-page.section-degree .wrap{width:min(100% - 32px,1380px)}.shop-page.section-degree .degree-collection-hero{grid-template-columns:1fr;padding:42px 30px}.degree-choice-step{grid-template-columns:1fr}.shop-page.section-degree .degree-result-grid,.shop-page.section-degree .degree-more-grid,.shop-page.section-degree .degree-subject-grid-main{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media(max-width:620px){.shop-page.section-degree .wrap{width:min(100% - 22px,1380px)}.shop-page.section-degree .degree-collection-hero{padding:32px 22px;border-radius:22px}.shop-page.section-degree .degree-collection-hero h2{font-size:48px}.shop-page.section-degree .degree-quick-find,.shop-page.section-degree .degree-academic-map,.shop-page.section-degree .degree-book-results,.shop-page.section-degree .degree-more-books,.shop-page.section-degree .degree-classification-board{padding:20px;border-radius:20px}.shop-page.section-degree .degree-result-grid,.shop-page.section-degree .degree-more-grid,.shop-page.section-degree .degree-subject-grid-main,.shop-page.section-degree .degree-secondary-columns,.shop-page.section-degree .degree-life-row,.shop-page.section-degree .degree-classification-track,.degree-subject-cloud{grid-template-columns:1fr}.degree-choice-options{flex-wrap:nowrap;overflow:auto;padding-bottom:4px}.degree-choice-options button{flex:0 0 auto}.subject-options{max-height:none;display:grid;grid-template-columns:1fr}.shop-page.section-degree .degree-complete-collection{align-items:flex-start;flex-direction:column}}
        @media(prefers-reduced-motion:reduce){.shop-page.section-degree *{animation:none!important;transition:none!important}}
      `}</style>

      <style>{`
        /* Student-first Degree flow override */
        .shop-page.section-degree{--degree-bg:#FAF7F2;--degree-surface:#FFFFFF;--degree-ink:#1C1B19;--degree-muted:#706B63;--degree-cta:#C7663F;--degree-cta-dark:#A94D32;--degree-copper:#D99A63;--degree-soft:#F3E9DF;--degree-border:#E8E1D8;--degree-divider:#DDD5CB;background:#FAF7F2!important;color:var(--degree-ink)}
        .shop-page.section-degree .catalogue-masthead,.shop-page.section-degree .sidebar,.shop-page.section-degree .hero,.shop-page.section-degree .toolbar,.shop-page.section-degree .summary{display:none!important}
        .shop-page.section-degree .wrap{width:min(1320px,calc(100% - 48px))}.shop-page.section-degree .layout{display:block}.shop-page.section-degree .content{width:100%}.degree-student-flow ~ section{display:none!important}
        .degree-student-flow{display:grid;gap:28px;padding-bottom:58px}.degree-simple-hero{padding:56px 0 26px;border-bottom:1px solid var(--degree-divider)}.degree-simple-hero p,.degree-flow-kicker,.degree-flow-more p,.degree-flow-complete p{margin:0 0 10px;color:var(--degree-cta);font-size:10px;font-weight:900;letter-spacing:.2em;text-transform:uppercase}.degree-simple-hero h2{max-width:780px;margin:0;color:var(--degree-ink);font-family:Georgia,'Times New Roman',serif;font-size:clamp(44px,7vw,92px);font-weight:500;letter-spacing:-.075em;line-height:.92}.degree-simple-hero span,.degree-flow-copy{display:block;max-width:520px;margin-top:16px;color:var(--degree-muted);font-size:16px;line-height:1.7}
        .degree-flow-panel{overflow:hidden;border:1px solid var(--degree-border);border-radius:30px;background:var(--degree-surface);box-shadow:0 24px 64px rgba(42,31,22,.08),inset 0 1px 0 #fff}.degree-flow-progress{--degree-progress:20%;position:relative;display:grid;grid-template-columns:repeat(5,1fr);gap:10px;padding:24px 28px;border-bottom:1px solid var(--degree-divider);background:linear-gradient(180deg,#fff,#fbf7f2)}.degree-flow-progress:before{position:absolute;left:28px;right:28px;bottom:0;height:2px;background:var(--degree-divider);content:""}.degree-flow-progress:after{position:absolute;left:28px;bottom:0;width:calc(var(--degree-progress) - 40px);max-width:calc(100% - 56px);height:2px;background:var(--degree-cta);transition:width .35s ease;content:""}.degree-flow-progress span{position:relative;color:#9a9288;font-size:10px;font-weight:850;letter-spacing:.14em;text-align:center;text-transform:uppercase}.degree-flow-progress span.active{color:var(--degree-ink)}
        .degree-flow-step{padding:34px;animation:degree-soft-in .32s ease both}@keyframes degree-soft-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}.degree-flow-step h3{margin:0;color:var(--degree-ink);font-family:Georgia,'Times New Roman',serif;font-size:clamp(31px,4vw,54px);font-weight:500;letter-spacing:-.055em;line-height:1}.degree-back{display:inline-flex;align-items:center;margin-bottom:18px;padding:0;border:0;background:transparent;color:var(--degree-cta);font-size:12px;font-weight:850}.degree-course-cards,.degree-year-cards,.degree-semester-cards{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:16px;margin-top:26px}.degree-year-cards{grid-template-columns:repeat(3,minmax(0,1fr))}.degree-semester-cards{grid-template-columns:repeat(2,minmax(0,1fr));max-width:620px}.degree-choice-card{position:relative;overflow:hidden;display:grid;min-height:190px;align-content:end;gap:8px;padding:22px;border:1px solid var(--degree-border);border-radius:22px;background:#fff;color:var(--degree-ink);text-align:left;box-shadow:0 12px 30px rgba(42,31,22,.055);transition:transform .24s ease,border-color .24s ease,box-shadow .24s ease,background .24s ease}.degree-choice-card:before{position:absolute;right:-42px;top:-42px;width:126px;height:126px;border-radius:50%;background:rgba(199,102,63,.08);content:""}.degree-choice-card:hover{transform:translateY(-4px);border-color:#e1b18d;background:#fffaf6;box-shadow:0 20px 42px rgba(42,31,22,.1)}.degree-choice-card strong{position:relative;font-family:Georgia,serif;font-size:36px;font-weight:500;letter-spacing:-.045em}.degree-choice-card span{position:relative;color:var(--degree-muted);font-size:12px;line-height:1.45}.degree-choice-card b{position:relative;margin-top:12px;color:var(--degree-cta);font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.1em}.degree-choice-card.compact{min-height:130px}.degree-choice-card.compact strong{font-size:28px}
        .degree-confirmation{display:flex;align-items:center;justify-content:space-between;gap:18px;margin-bottom:24px;padding:18px 20px;border:1px solid var(--degree-border);border-radius:18px;background:var(--degree-soft)}.degree-confirmation p{margin:0 0 5px;color:var(--degree-cta);font-size:9px;font-weight:900;letter-spacing:.16em;text-transform:uppercase}.degree-confirmation strong{color:var(--degree-ink);font-family:Georgia,serif;font-size:22px;font-weight:500}.degree-subject-simple-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-top:24px}.degree-subject-simple{display:grid;min-height:142px;gap:8px;align-content:start;padding:18px;border:1px solid var(--degree-border);border-radius:18px;background:#fff;text-align:left;box-shadow:0 10px 26px rgba(42,31,22,.05);transition:.24s ease}.degree-subject-simple:hover{transform:translateY(-3px);border-color:#e1b18d;background:#fffaf6;box-shadow:0 18px 34px rgba(42,31,22,.09)}.degree-subject-simple.featured{background:var(--degree-ink);border-color:var(--degree-ink);color:#fff}.degree-subject-simple strong{font-family:Georgia,serif;font-size:21px;font-weight:600;line-height:1.1}.degree-subject-simple span{color:var(--degree-muted);font-size:12px;line-height:1.45}.degree-subject-simple.featured span{color:#d9d0c7}.degree-subject-simple b{margin-top:auto;color:var(--degree-cta);font-size:10px;font-weight:900;letter-spacing:.09em;text-transform:uppercase}.degree-subject-simple.featured b{color:#fff}
        .degree-simple-books{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px;margin-top:24px}.degree-simple-book{display:flex;min-height:430px;flex-direction:column;padding:16px;border:1px solid var(--degree-border);border-radius:24px;background:#fff;box-shadow:0 16px 36px rgba(42,31,22,.07);transition:transform .24s ease,border-color .24s ease,box-shadow .24s ease}.degree-simple-book:hover{transform:translateY(-4px);border-color:#d9c4af;box-shadow:0 24px 48px rgba(42,31,22,.12)}.degree-simple-cover{display:grid;min-height:220px;place-items:center;border:0;border-radius:18px;background:linear-gradient(180deg,#fbf4ec,#ede1d5)}.degree-simple-cover .book-cover{width:112px;transform:none;filter:drop-shadow(0 16px 20px rgba(42,31,22,.18));transition:transform .24s ease}.degree-simple-book:hover .book-cover{transform:translateY(-5px)}.degree-simple-copy{display:grid;gap:6px;padding:14px 2px}.degree-simple-copy span{color:var(--degree-cta);font-size:10px;font-weight:850}.degree-simple-copy h4{margin:0;color:var(--degree-ink);font-family:Georgia,serif;font-size:22px;font-weight:600;line-height:1.12}.degree-simple-copy p{margin:0;color:var(--degree-muted);font-size:12px}.degree-simple-copy strong{color:var(--degree-ink);font-family:Georgia,serif;font-size:26px;font-weight:500}.degree-simple-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:auto}.degree-simple-actions .view{border:1px solid var(--degree-border);background:#fff;color:var(--degree-ink);box-shadow:none}.degree-simple-actions .add,.degree-flow-complete button{border:0;background:var(--degree-cta);color:#fff;box-shadow:0 12px 24px rgba(199,102,63,.18)}.degree-simple-actions .add:hover,.degree-flow-complete button:hover{background:var(--degree-cta-dark);box-shadow:0 16px 30px rgba(169,77,50,.22)}.degree-empty{grid-column:1/-1;padding:40px;border:1px dashed var(--degree-border);border-radius:20px;background:#fffaf6;text-align:center}.degree-empty h4{margin:0 0 8px;font-family:Georgia,serif;font-size:28px;color:var(--degree-ink)}.degree-empty p{margin:0;color:var(--degree-muted)}
        .degree-flow-more,.degree-flow-complete{padding:28px;border:1px solid var(--degree-border);border-radius:24px;background:#fff;box-shadow:0 16px 38px rgba(42,31,22,.06)}.degree-flow-more h3,.degree-flow-complete h3{margin:0;color:var(--degree-ink);font-family:Georgia,serif;font-size:30px;font-weight:500;letter-spacing:-.04em}.degree-more-strip{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:18px}.degree-more-strip button{display:grid;grid-template-columns:52px minmax(0,1fr);gap:12px;align-items:center;padding:12px;border:1px solid var(--degree-border);border-radius:16px;background:#fff;text-align:left}.degree-more-strip strong{display:block;overflow:hidden;color:var(--degree-ink);font-family:Georgia,serif;font-size:15px;text-overflow:ellipsis;white-space:nowrap}.degree-more-strip small{color:var(--degree-muted);font-size:10px}.degree-flow-complete{display:flex;align-items:center;justify-content:space-between;gap:20px;background:var(--degree-ink);color:#fff}.degree-flow-complete h3{color:#fff}.degree-flow-complete span{display:block;margin-top:7px;color:#d9d0c7}.degree-flow-complete button{min-height:44px;padding:0 18px;border-radius:12px;font-size:10px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;white-space:nowrap}
        @media(max-width:1100px){.degree-course-cards{grid-template-columns:repeat(3,minmax(0,1fr))}.degree-subject-simple-grid,.degree-simple-books,.degree-more-strip{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media(max-width:720px){.shop-page.section-degree .wrap{width:min(100% - 22px,1320px)}.degree-simple-hero{padding-top:34px}.degree-flow-step{padding:22px}.degree-flow-progress{padding:18px 14px;gap:5px}.degree-flow-progress:before{left:14px;right:14px}.degree-flow-progress:after{left:14px;max-width:calc(100% - 28px)}.degree-course-cards,.degree-year-cards,.degree-semester-cards{grid-template-columns:1fr 1fr;gap:11px}.degree-choice-card{min-height:145px;padding:16px}.degree-choice-card strong{font-size:29px}.degree-subject-simple-grid{grid-template-columns:1fr}.degree-simple-books{grid-template-columns:1fr}.degree-more-strip{grid-template-columns:1fr}.degree-confirmation,.degree-flow-complete{align-items:flex-start;flex-direction:column}.degree-simple-hero h2{font-size:43px}}
        @media(max-width:420px){.degree-course-cards,.degree-year-cards,.degree-semester-cards{grid-template-columns:1fr}.degree-flow-progress span{font-size:8px}.degree-simple-cover{min-height:200px}}
      `}</style>

      <style>{`
        /* Degree premium finishing layer: guided, warm, editorial, student-first */
        .shop-page.section-degree .degree-simple-hero{
          position:relative;
          display:grid;
          grid-template-columns:minmax(0,1fr) auto;
          gap:28px;
          align-items:end;
          padding:62px 0 30px;
        }
        .shop-page.section-degree .degree-simple-hero:after{
          align-self:end;
          width:min(220px,22vw);
          height:1px;
          background:linear-gradient(90deg,var(--degree-copper),transparent);
          content:"";
        }
        .shop-page.section-degree .degree-simple-hero h2{
          max-width:760px;
        }
        .shop-page.section-degree .degree-simple-hero h2:after{
          display:inline-block;
          width:.42em;
          height:.08em;
          margin-left:.08em;
          border-radius:99px;
          background:var(--degree-cta);
          vertical-align:baseline;
          content:"";
        }
        .degree-flow-panel{
          position:relative;
          overflow:hidden;
          border-radius:34px;
        }
        .degree-flow-panel:before{
          position:absolute;
          inset:0;
          pointer-events:none;
          background:radial-gradient(circle at 94% 0,rgba(217,154,99,.14),transparent 26%),linear-gradient(135deg,rgba(255,255,255,.62),transparent 38%);
          content:"";
        }
        .degree-flow-panel>*{position:relative;z-index:1}
        .degree-flow-context{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:18px;
          padding:18px 34px;
          border-bottom:1px solid var(--degree-divider);
          background:linear-gradient(135deg,#fff,#fbf7f2);
        }
        .degree-flow-context p{
          margin:0 0 4px;
          color:var(--degree-cta);
          font-size:9px;
          font-weight:950;
          letter-spacing:.18em;
          text-transform:uppercase;
        }
        .degree-flow-context strong{
          display:block;
          color:var(--degree-ink);
          font-family:Georgia,'Times New Roman',serif;
          font-size:22px;
          font-weight:500;
          letter-spacing:-.03em;
        }
        .degree-flow-context span{
          display:block;
          margin-top:4px;
          color:var(--degree-muted);
          font-size:12px;
        }
        .degree-flow-context button,
        .degree-back{
          border:1px solid var(--degree-border)!important;
          border-radius:999px!important;
          background:#fff!important;
          color:var(--degree-cta)!important;
          box-shadow:none!important;
          transition:background .22s ease,border-color .22s ease,transform .22s ease!important;
        }
        .degree-flow-context button{
          min-height:36px;
          padding:0 13px;
          font-size:9px;
          font-weight:900;
          letter-spacing:.12em;
          text-transform:uppercase;
        }
        .degree-flow-context button:hover,
        .degree-back:hover{
          transform:translateY(-1px);
          border-color:#e0b185!important;
          background:#fff8f1!important;
        }
        .degree-choice-card{
          isolation:isolate;
        }
        .degree-choice-card:after{
          position:absolute;
          inset:auto 18px 18px 18px;
          height:1px;
          background:linear-gradient(90deg,var(--degree-copper),transparent);
          opacity:.45;
          content:"";
        }
        .degree-choice-label{
          position:absolute!important;
          top:18px;
          left:18px;
          width:auto!important;
          margin:0!important;
          color:var(--degree-cta)!important;
          font-size:9px!important;
          font-weight:950!important;
          letter-spacing:.16em;
          text-transform:uppercase;
        }
        .degree-choice-card em{
          position:relative;
          display:block;
          color:var(--degree-muted);
          font-size:11px;
          font-style:normal;
          line-height:1.45;
        }
        .degree-shelf-summary{
          display:grid;
          grid-template-columns:repeat(4,minmax(0,1fr));
          gap:10px;
          margin:22px 0 2px;
        }
        .degree-shelf-summary span{
          display:grid;
          gap:4px;
          min-height:78px;
          align-content:center;
          padding:14px;
          border:1px solid var(--degree-border);
          border-radius:16px;
          background:linear-gradient(145deg,#fff,#fbf7f2);
          box-shadow:inset 0 1px 0 #fff,0 8px 18px rgba(42,31,22,.045);
        }
        .degree-shelf-summary b{
          overflow:hidden;
          color:var(--degree-ink);
          font-family:Georgia,'Times New Roman',serif;
          font-size:22px;
          font-weight:500;
          line-height:1;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        .degree-shelf-summary small{
          color:var(--degree-muted);
          font-size:9px;
          font-weight:900;
          letter-spacing:.12em;
          text-transform:uppercase;
        }
        .degree-simple-book{
          position:relative;
          overflow:hidden;
        }
        .degree-simple-book:before{
          position:absolute;
          left:16px;
          right:16px;
          top:16px;
          height:1px;
          background:linear-gradient(90deg,transparent,rgba(217,154,99,.5),transparent);
          opacity:0;
          transition:opacity .24s ease;
          content:"";
        }
        .degree-simple-book:hover:before{opacity:1}
        .degree-book-meta-row{
          display:flex;
          flex-wrap:wrap;
          gap:6px;
          margin:0 2px 12px;
        }
        .degree-book-meta-row span{
          padding:5px 7px;
          border:1px solid var(--degree-border);
          border-radius:999px;
          background:#fbf7f2;
          color:var(--degree-muted);
          font-size:9px;
          font-weight:800;
        }
        .degree-simple-actions .view,
        .degree-simple-actions .add{
          position:relative;
          overflow:hidden;
        }
        .degree-simple-actions .view:after,
        .degree-simple-actions .add:after,
        .degree-flow-complete button:after{
          display:inline-block;
          margin-left:5px;
          transition:transform .22s ease;
          content:"→";
        }
        .degree-simple-actions .view:hover:after,
        .degree-simple-actions .add:hover:after,
        .degree-flow-complete button:hover:after{transform:translateX(4px)}
        .degree-simple-actions .view{color:var(--degree-ink)!important}
        .degree-simple-actions .view:hover{color:var(--degree-cta)!important}
        .degree-flow-more{
          background:linear-gradient(135deg,#fff,#fbf7f2)!important;
        }
        .degree-more-strip button{
          transition:transform .22s ease,border-color .22s ease,box-shadow .22s ease;
        }
        .degree-more-strip button:hover{
          transform:translateY(-3px);
          border-color:#e0b185;
          box-shadow:0 16px 30px rgba(42,31,22,.09);
        }
        @media(max-width:720px){
          .shop-page.section-degree .degree-simple-hero{grid-template-columns:1fr;padding-top:38px}.shop-page.section-degree .degree-simple-hero:after{width:120px}.degree-flow-context{align-items:flex-start;flex-direction:column;padding:16px 22px}.degree-shelf-summary{grid-template-columns:1fr 1fr}.degree-shelf-summary span{min-height:68px}.degree-shelf-summary b{font-size:18px}
        }
        @media(max-width:420px){.degree-shelf-summary{grid-template-columns:1fr}}
      `}</style>

      <style>{`
        /* Consistent finishing details: restrained surfaces, clear interaction states, accessible motion. */
        .shop-page button:focus-visible,
        .shop-page input:focus-visible,
        .shop-page select:focus-visible{
          outline:3px solid color-mix(in srgb,var(--green) 42%,white);
          outline-offset:3px;
        }
        .shop-page .card .copy h3,
        .shop-page .degree-book-card h4,
        .shop-page .degree-show-copy strong,
        .shop-page .degree-mini-book b{
          text-wrap:pretty;
        }
        .shop-page .card,
        .shop-page .degree-book-card,
        .shop-page .degree-show-book{
          box-shadow:0 12px 30px rgba(35,31,24,.07);
        }
        .shop-page .card:has(.media:hover),
        .shop-page .card:has(.media:focus-visible),
        .shop-page .degree-book-card:hover,
        .shop-page .degree-show-book:hover{
          box-shadow:0 20px 42px rgba(35,31,24,.12);
        }
        @media(prefers-reduced-motion:reduce){
          .shop-page *,
          .shop-page *:before,
          .shop-page *:after{
            scroll-behavior:auto!important;
            animation-duration:.01ms!important;
            animation-iteration-count:1!important;
            transition-duration:.01ms!important;
          }
        }
      `}</style>

      <style>{`
        /* Responsive finishing pass: preserve usable navigation and reading space at every width. */
        @media (max-width: 760px){
          .wrap{width:min(100% - 28px,1360px)}
          .sidebar{overflow:visible;white-space:normal}
          .sidebar .group{display:block;width:auto;margin:0 0 12px;vertical-align:initial}
          .category-list{display:flex;gap:8px;overflow-x:auto;margin:0;padding:2px 2px 10px;overscroll-behavior-x:contain;scrollbar-width:thin;-webkit-overflow-scrolling:touch}
          .category-btn{display:flex;flex:0 0 auto;align-items:center;gap:12px;width:max-content;max-width:min(78vw,320px);min-height:44px;padding:9px 12px;border:1px solid #ded7ca;border-radius:12px;background:#fffdf9;box-shadow:none}
          .category-btn:hover,.category-btn.active{transform:none}
          .category-btn strong{font-size:12px;white-space:normal}
          .category-btn span{font-size:10px}
          .nursing-programme-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
          .degree-flow-progress span{letter-spacing:.08em}
          .book-grid,.degree-simple-books,.degree-result-grid,.degree-more-grid{min-width:0}
          .search input{font-size:16px}
        }
        @media (max-width:480px){
          .wrap,.shop-page.section-degree .wrap{width:calc(100% - 20px)}
          .topbar-inner{gap:9px;padding:9px}
          .brand{min-height:42px}
          .search{min-height:46px}
          .cart-btn{min-height:46px}
          .side-head h1{font-size:23px}
          .nursing-catalogue{padding:20px 16px}
          .nursing-programme-grid{grid-template-columns:1fr}
          .nursing-programme{min-height:130px}
          .degree-flow-progress{grid-template-columns:repeat(5,minmax(0,1fr));padding:16px 8px;gap:2px}
          .degree-flow-progress:before{left:8px;right:8px}
          .degree-flow-progress:after{left:8px;max-width:calc(100% - 16px)}
          .degree-flow-progress span{font-size:8px;letter-spacing:.04em}
          .degree-choice-card{min-width:0}
          .degree-confirmation{padding:14px}
          .degree-simple-actions{gap:7px}
          .degree-simple-actions button{min-height:42px}
          .degree-book-meta-row{margin-bottom:10px}
        }
        @media(prefers-reduced-motion:reduce){
          .category-btn,.nursing-programme,.degree-choice-card,.degree-subject-simple,.degree-simple-book{scroll-behavior:auto!important;transition:none!important}
        }
      `}</style>

      <style>{`
        /* Clean, editorial shop UI */
        .shop-page{
          --green:#17685b;--deep:#173b34;--gold:#b89455;--paper:#fffdf9;--line:#e8e2d8;--ink:#202722;
          padding-bottom:40px;
          background:#f8f7f3!important;
          color:var(--ink);
        }
        .shop-page:before,.shop-page:after{display:none!important}
        .wrap{width:min(1280px,calc(100% - 40px))}
        .catalogue-masthead{display:none!important}
        .topbar{margin-bottom:20px;padding:10px 0;background:rgba(248,247,243,.94);border-radius:0;box-shadow:none}
        .topbar:after{height:1px;background:var(--line);filter:none;opacity:1}
        .topbar-inner{grid-template-columns:210px minmax(220px,1fr) auto;gap:12px;padding:10px;border:1px solid var(--line);border-radius:14px;background:#fff;box-shadow:0 6px 20px rgba(32,39,34,.045)}
        .brand{min-width:0;padding:5px 10px;border:0;border-right:1px solid var(--line);border-radius:0;background:transparent;box-shadow:none}
        .brand:after{display:none}.brand-copy strong{color:var(--deep);-webkit-text-fill-color:var(--deep)}
        .premium-icon.compact{width:34px;height:34px;border-radius:9px;box-shadow:none}.premium-icon.compact:before,.premium-icon.compact:after{display:none}.premium-icon.compact svg{width:19px;height:19px}
        .search{min-height:44px;border:1px solid var(--line);border-radius:10px;background:#fff;box-shadow:none}
        .cart-btn{min-height:44px;border-radius:10px;background:var(--deep);box-shadow:none}
        .layout{grid-template-columns:250px minmax(0,1fr);gap:24px}
        .sidebar{top:78px;padding:18px;border:1px solid var(--line);border-radius:14px;background:#fff;box-shadow:0 8px 24px rgba(32,39,34,.04)}
        .side-head{padding-bottom:12px;border-bottom:1px solid var(--line)}
        .side-head h1{color:var(--deep);font-size:24px;font-weight:500;-webkit-text-fill-color:var(--deep)}
        .side-head h1:after{display:none}
        .group{padding:13px 0;border-color:var(--line)}
        .category-list{gap:3px}
        .category-btn{min-height:0;padding:10px 9px 10px 12px;border:0;border-left:2px solid transparent;border-radius:7px;background:transparent;box-shadow:none}
        .category-btn:before,.category-btn:after{display:none}
        .category-btn:hover,.category-btn.active{transform:none;border-color:var(--gold);background:#f7f5ef;box-shadow:none}
        .category-btn strong{font-size:12px;font-weight:700;color:var(--ink)}
        .category-btn span{background:transparent;color:#777c75;font-size:10px}
        .hero{min-height:0;margin-bottom:18px;padding:25px 28px;border:1px solid var(--line);border-radius:14px;background:#fff;box-shadow:0 8px 24px rgba(32,39,34,.04)}
        .hero:before,.hero:after,.hero .premium-icon{display:none}
        .eyebrow{color:var(--green);font-size:9px;letter-spacing:.15em}
        .hero h2{color:var(--deep);background:none;-webkit-text-fill-color:var(--deep);font-size:clamp(30px,4vw,44px);font-weight:500;letter-spacing:-.04em}
        .hero p{color:#69736c;font-size:13px;line-height:1.6}
        .toolbar{min-height:0;margin:0 0 14px;padding:12px;border:1px solid var(--line);border-radius:12px;background:#fff;box-shadow:none}
        .filters{gap:6px}.chip{min-height:34px;padding:0 10px;border:1px solid var(--line);border-radius:8px;background:#fff;color:#49534c;font-size:9px;box-shadow:none}
        .chip:hover{transform:none;box-shadow:none}.chip.active{border-color:var(--deep);background:var(--deep);box-shadow:none}
        .sort{min-height:36px;border-radius:8px;border-color:var(--line);background:#fff;box-shadow:none}
        .summary{margin-bottom:14px;padding:0 0 10px;border-bottom:1px solid var(--line);color:#727a74}
        .book-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
        .card,.book-grid .card:first-child{display:flex;min-height:0;grid-column:auto;flex-direction:column;border:1px solid var(--line);border-radius:14px;background:#fff;box-shadow:0 8px 22px rgba(32,39,34,.05);overflow:hidden}
        .card:before,.card:after{display:none}
        .card:has(.media:hover),.card:has(.media:focus-visible){transform:translateY(-3px);border-color:#d8d0c2;box-shadow:0 14px 30px rgba(32,39,34,.09)}
        .media,.book-grid .card:first-child .media{flex:0 0 228px;height:auto;min-height:228px;padding:28px 14px;border:0;border-bottom:1px solid var(--line);border-radius:0;background:#f4f1eb;perspective:none}
        .media:before{inset:12px;border:1px solid rgba(255,255,255,.75);border-radius:9px;box-shadow:none}
        .media:after{width:120px;bottom:21px}
        .media .book-cover,.book-grid .card:first-child .media .book-cover{width:132px;transform:rotate(-2deg);filter:none}
        .media:hover .book-cover,.media:focus-visible .book-cover{transform:rotate(-1deg) translateY(-4px) scale(1.025)}
        .badge,.save{top:12px;border-radius:6px;font-size:8px;box-shadow:none}.badge{left:12px}.save{right:12px}
        .copy,.book-grid .card:first-child .copy{display:flex;min-height:0;flex:1;flex-direction:column;padding:16px;background:#fff}
        .meta{padding:0;border:0;background:transparent;color:var(--green);font-size:8px;letter-spacing:.1em}
        .card .copy h3,.book-grid .card:first-child h3{min-height:0;margin:9px 0 5px;color:var(--ink);font-size:19px;font-weight:500;line-height:1.15;letter-spacing:-.02em;-webkit-line-clamp:2}
        .author{min-height:0;color:#767d77;font-size:11px;line-height:1.45}
        .card-facts{gap:8px;margin-top:12px}.card-facts>span{min-height:40px;border-top:1px solid #eee9e1}.card-facts small{font-size:7px}.card-facts b{font-size:10px}
        .card-glance,.book-grid .card:first-child .card-glance{min-height:0;margin-top:auto;padding-top:13px;border-top:1px solid #eee9e1}
        .details-hint{font-size:8px}.details-hint b{width:22px;height:22px}
        .price{color:var(--deep);font-size:25px}.off{border-radius:5px;background:#edf4f0;color:#276a58;box-shadow:none}
        .card-cart{min-height:0;margin-top:12px;padding-top:12px;border-top:1px solid #eee9e1}
        .card-cart .add{min-height:39px;border-radius:8px;background:var(--deep);box-shadow:none;font-size:9px}
        .card-cart .add:hover{transform:translateY(-1px);box-shadow:0 8px 16px rgba(23,59,52,.14)}
        .nursing-catalogue{margin-bottom:18px;padding:24px;border:1px solid var(--line);border-radius:14px;background:#fff;box-shadow:0 8px 24px rgba(32,39,34,.04)}
        .nursing-catalogue:before{display:none}.nursing-catalogue-head{margin-bottom:16px;padding-bottom:14px;border-color:var(--line)}
        .nursing-catalogue h2{color:var(--deep);font-size:clamp(25px,3vw,36px)}
        .nursing-programme-grid{gap:10px}.nursing-programme{min-height:130px;border-color:var(--line);border-radius:11px;box-shadow:none}.nursing-programme:hover,.nursing-programme.active{transform:translateY(-2px);box-shadow:0 10px 22px rgba(32,39,34,.08)}
        .degree-discovery>.degree-student-flow~section{display:none!important}
        .degree-student-flow>.degree-flow-more,.degree-student-flow>.degree-flow-complete{display:none!important}
        .degree-simple-hero{padding:36px 0 22px}.degree-simple-hero h2{font-size:clamp(38px,6vw,64px)}
        .degree-flow-panel{border-color:var(--line);border-radius:18px;box-shadow:0 10px 28px rgba(32,39,34,.05)}
        .degree-flow-panel:before{display:none}
        .degree-flow-context,.degree-flow-progress{background:#fbfaf7}
        .degree-choice-card,.degree-subject-simple,.degree-simple-book{border-color:var(--line);border-radius:13px;box-shadow:0 6px 18px rgba(32,39,34,.04)}
        .degree-choice-card:hover,.degree-subject-simple:hover,.degree-simple-book:hover{transform:translateY(-2px);box-shadow:0 12px 24px rgba(32,39,34,.08)}
        .degree-simple-book{min-height:0}
        .degree-simple-cover{min-height:190px}
        .degree-simple-actions .add{background:var(--degree-cta);box-shadow:none}
        .empty{min-height:220px;border-color:var(--line);border-radius:14px;box-shadow:none}
        @media(max-width:1000px){.layout{grid-template-columns:220px minmax(0,1fr);gap:18px}.book-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media(max-width:760px){.wrap{width:calc(100% - 28px)}.layout{grid-template-columns:1fr;gap:16px}.sidebar{position:static;max-height:none}.book-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.topbar-inner{grid-template-columns:1fr auto}.brand{border-right:0}.search{grid-column:1/-1;grid-row:2}}
        @media(max-width:520px){.wrap{width:calc(100% - 20px)}.topbar-inner{grid-template-columns:1fr}.search{grid-column:auto;grid-row:auto}.cart-btn{width:100%}.book-grid{grid-template-columns:1fr}.card{width:100%}.media{min-height:250px;flex-basis:250px}.hero{padding:22px}.nursing-catalogue{padding:19px}.nursing-programme-grid{grid-template-columns:1fr}}
        @media(prefers-reduced-motion:reduce){.shop-page *,.shop-page *:before,.shop-page *:after{animation:none!important;transition:none!important}}
      `}</style>

      <style>{`
        /* Mobile-first shopping refinements: clear filters, comfortable cards, persistent bag access. */
        .mobile-cart-bar{display:none}
        @media(max-width:680px){
          .shop-page:has(.mobile-cart-bar){padding-bottom:calc(112px + env(safe-area-inset-bottom))}
          .filters:not(.vocational-note){display:flex;flex-wrap:nowrap;gap:7px;overflow-x:auto;padding:3px 2px 10px;overscroll-behavior-x:contain;scrollbar-width:thin;-webkit-overflow-scrolling:touch}
          .filters:not(.vocational-note) .chip{flex:0 0 auto}
          .book-grid{grid-template-columns:minmax(0,1fr);gap:15px}
          .book-grid .card{width:min(100%,460px);margin-inline:auto}
          .book-grid .media{min-height:258px;flex-basis:258px}
          .book-grid .copy{padding:18px}
          .mobile-cart-bar{position:fixed;right:12px;bottom:calc(12px + env(safe-area-inset-bottom));left:12px;z-index:55;display:flex;align-items:center;justify-content:space-between;gap:12px;max-width:560px;margin-inline:auto;padding:11px 12px 11px 16px;border:1px solid #e5d8c6;border-radius:16px;background:rgba(255,253,249,.97);box-shadow:0 12px 34px rgba(32,39,34,.18),inset 0 1px 0 #fff;backdrop-filter:blur(14px);animation:mobile-cart-rise .28s ease-out both}
          .mobile-cart-bar>div{display:grid;gap:3px;min-width:0}
          .mobile-cart-bar>div span{color:#767d77;font-size:9px;font-weight:800;letter-spacing:.1em;text-transform:uppercase}
          .mobile-cart-bar>div strong{overflow:hidden;color:var(--deep);font-family:Georgia,serif;font-size:17px;font-weight:600;text-overflow:ellipsis;white-space:nowrap}
          .mobile-cart-bar button{display:inline-flex;min-height:42px;flex:0 0 auto;align-items:center;gap:10px;padding:0 15px;border:0;border-radius:11px;background:var(--deep);color:#fff;font-size:10px;font-weight:900;letter-spacing:.06em;text-transform:uppercase;box-shadow:0 7px 16px rgba(23,59,52,.14)}
          .mobile-cart-bar button span{font-size:16px;transition:transform .2s ease}
          .mobile-cart-bar button:hover span{transform:translateX(3px)}
        }
        @keyframes mobile-cart-rise{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:380px){
          .mobile-cart-bar{right:8px;left:8px;padding-left:12px}
          .mobile-cart-bar>div strong{font-size:15px}
          .mobile-cart-bar button{min-height:40px;padding:0 11px}
        }
      `}</style>

      <style>{`
        /* Reference-inspired product and cart layout, with the existing motion preserved. */
        .product-actions{display:grid;gap:9px;min-width:190px}
        .product-actions .modal-add,.buy-now{width:100%;min-height:46px;border-radius:10px;font-size:10px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}
        .product-actions .modal-add{background:#7c1010;box-shadow:0 9px 20px rgba(124,16,16,.15)}
        .buy-now{display:flex;align-items:center;justify-content:center;gap:9px;border:1px solid #7c1010;background:#fff;color:#7c1010;transition:background .22s ease,color .22s ease,transform .22s ease}
        .buy-now:hover{transform:translateY(-2px);background:#7c1010;color:#fff}
        .buy-now span{font-size:16px}
        .drawer{width:min(920px,100%);border-left:1px solid #e4e1dc;background:#fff;box-shadow:-24px 0 70px rgba(25,30,27,.2)}
        .drawer-head{align-items:center;padding:22px 28px;background:#fff}
        .drawer-head h2{color:#252525;font-family:Inter,ui-sans-serif,system-ui,sans-serif;font-size:24px;font-weight:650}
        .drawer-head p{color:#707772;font-size:12px}
        .drawer-body{padding:22px 28px}
        .cart-table-head,.cart-line{display:grid;grid-template-columns:52px minmax(170px,1fr) 90px 132px 100px 34px;align-items:center;gap:14px}
        .cart-table-head{grid-template-columns:52px minmax(170px,1fr) 90px 132px 100px 34px;padding:12px 14px;border:1px solid #e4e5e4;border-bottom:0;background:#fafafa;color:#4a514d;font-size:11px;font-weight:800}
        .cart-table-head span:first-child{grid-column:1 / 3}
        .cart-line{min-height:100px;padding:14px;border:1px solid #e4e5e4;border-bottom:0;background:#fff}
        .cart-line:last-of-type{border-bottom:1px solid #e4e5e4}
        .cart-line .book-cover.small{width:52px;min-width:52px}
        .cart-product{min-width:0}
        .cart-product h3{overflow:hidden;margin:0 0 5px;color:#252525;font-family:Inter,ui-sans-serif,system-ui,sans-serif;font-size:14px;font-weight:600;text-overflow:ellipsis;white-space:nowrap}
        .cart-product p{margin:0;color:#7a807c;font-size:10px;line-height:1.5}
        .cart-unit-price,.cart-line-subtotal{color:#303632;font-size:12px;font-weight:650}
        .cart-line .line-controls{justify-content:center;margin:0;border:1px solid #dfe2e3;border-radius:4px}
        .cart-line .line-controls button{width:32px;height:34px;border:0;border-radius:0;background:#f7f8f8;color:#4c6778;font-size:17px}
        .cart-line .line-controls b{min-width:27px;color:#555;font-size:12px;text-align:center}
        .cart-remove-desktop{justify-self:center;font-size:20px}
        .cart-remove-mobile{display:none}
        .cart-clear{margin-top:14px;padding:0;border:0;background:transparent;color:#8b1616;font-size:10px;font-weight:850;text-transform:uppercase;letter-spacing:.08em}
        .drawer-foot{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:5px 24px;padding:22px 28px;border-top:1px solid #e5e3de;background:#fafafa}
        .cart-summary-note{grid-row:span 2;align-self:center}
        .cart-summary-note span{color:#333;font-size:14px;font-weight:800}
        .cart-summary-note p,.checkout-note{margin:5px 0 0;color:#7a807c;font-size:10px;line-height:1.5}
        .drawer-foot .total{min-width:180px;margin:0;padding:3px 0}
        .drawer-foot .total span{color:#6f7772;font-size:12px}
        .drawer-foot .total b{color:#252525;font-family:Inter,ui-sans-serif,system-ui,sans-serif;font-size:17px;font-weight:700}
        .drawer-foot .savings-total b{color:#24704f}
        .checkout-button,.cart-continue{min-height:42px;padding:0 16px;border:0;border-radius:7px;background:#7c1010;color:white;font-size:11px;font-weight:850;letter-spacing:.04em;transition:transform .2s ease,background .2s ease}
        .checkout-button{grid-column:1/-1;justify-self:end;min-width:180px;margin-top:12px}
        .checkout-button:hover,.cart-continue:hover{transform:translateY(-2px);background:#5f0b0b}
        .checkout-button span{margin-left:8px;font-size:15px}
        .checkout-note{grid-column:1/-1;text-align:right}
        .drawer-body>.empty .cart-continue{margin-top:16px}
        @media(max-width:680px){
          .drawer{width:100%;height:100dvh}
          .drawer-head{padding:17px 18px}
          .drawer-body{padding:16px 14px}
          .cart-table-head{display:none}
          .cart-line{grid-template-columns:48px minmax(0,1fr) auto;grid-template-areas:"cover product remove" "cover price subtotal" "cover quantity quantity";gap:8px 11px;padding:13px 10px}
          .cart-line>.book-cover{grid-area:cover;width:44px!important;min-width:44px!important}
          .cart-product{grid-area:product}
          .cart-product h3{font-size:13px;white-space:normal;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
          .cart-unit-price{grid-area:price;font-size:11px}
          .cart-unit-price:before{content:"Each: ";color:#858b87;font-weight:500}
          .cart-line .line-controls{grid-area:quantity;justify-self:start}
          .cart-line-subtotal{grid-area:subtotal;justify-self:end;font-size:12px}
          .cart-remove-desktop{display:none}
          .cart-remove-mobile{display:inline-block;margin-top:5px;padding:0;border:0;background:transparent;color:#8b1616;font-size:10px;font-weight:800}
          .drawer-foot{grid-template-columns:1fr auto;gap:8px 12px;padding:16px 18px calc(16px + env(safe-area-inset-bottom))}
          .cart-summary-note{grid-column:1/-1;grid-row:auto;padding-bottom:8px;border-bottom:1px solid #e5e3de}
          .drawer-foot .total{min-width:0}
          .drawer-foot .total b{font-size:16px}
          .checkout-button{grid-column:1/-1;width:100%;justify-self:stretch;margin-top:7px}
          .checkout-note{text-align:center}
          .product-actions{grid-template-columns:1fr 1fr;min-width:0;width:100%}
          .product-actions .modal-add,.buy-now{min-height:44px;padding:0 10px;font-size:9px}
        }
        @media(max-width:380px){.drawer-head{padding-inline:14px}.drawer-body{padding-inline:10px}.cart-line{gap:7px}.product-actions{grid-template-columns:1fr}}
      `}</style>

      <div className="wrap">
        <style>{`
          /* ===== Gen-Z storefront layer (visual only; all behaviour unchanged) ===== */
          .shop-page{
            --zx-ink:#0b1412;--zx-deep:#063d3b;--zx-green:#0f7a70;--zx-gold:#d9a94e;--zx-lime:#c8f169;
            background:
              radial-gradient(900px 500px at 8% -10%,rgba(200,241,105,.22),transparent 60%),
              radial-gradient(800px 480px at 100% 0,rgba(217,169,78,.20),transparent 60%),
              linear-gradient(180deg,#f7f6f1 0%,#eef3ee 100%)!important;
            color:var(--zx-ink);
            font-family:"Inter",ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;
            letter-spacing:-.005em;
          }
          .shop-page h1,.shop-page h2,.shop-page h3,.shop-page h4{letter-spacing:-.035em}
          .shop-page .topbar-inner{
            border:1px solid rgba(6,61,59,.10);border-radius:22px;
            background:rgba(255,255,255,.72);backdrop-filter:blur(18px) saturate(1.4);
            box-shadow:0 18px 50px rgba(6,61,59,.10);
          }
          .shop-page .brand{border-right:0}
          .shop-page .brand-copy strong{font-size:13px;font-weight:900;letter-spacing:.02em;text-transform:none}
          .shop-page .brand-copy span{letter-spacing:.2em}
          .shop-page .search{border-radius:999px;border:1px solid rgba(6,61,59,.12);background:#fff;min-height:48px;transition:box-shadow .25s ease,border-color .25s ease}
          .shop-page .search:focus-within{border-color:var(--zx-green);box-shadow:0 0 0 4px rgba(15,122,112,.15)}
          .shop-page .cart-btn,.shop-page .track-order-trigger{border-radius:999px!important;min-height:46px}
          .shop-page .cart-btn{background:linear-gradient(135deg,var(--zx-ink),var(--zx-deep))!important;box-shadow:0 12px 26px rgba(6,61,59,.25)!important}
          .shop-page .cart-btn b{background:var(--zx-lime);color:var(--zx-ink);border-radius:999px}
          .shop-page .track-order-trigger{background:#fff;border:1px solid rgba(6,61,59,.14)}

          /* Sidebar as floating glass panel */
          .shop-page .sidebar{border:1px solid rgba(6,61,59,.08);border-radius:24px;background:rgba(255,255,255,.78);backdrop-filter:blur(14px);box-shadow:0 20px 46px rgba(6,61,59,.08)}
          .shop-page .category-btn{border-radius:12px;transition:background .25s ease,transform .25s ease}
          .shop-page .category-btn:hover,.shop-page .category-btn.active{background:linear-gradient(90deg,rgba(200,241,105,.35),rgba(255,255,255,0));transform:translateX(4px)}
          .shop-page .category-btn.active strong{color:var(--zx-deep);font-weight:800}

          /* Hero & filters */
          .shop-page .hero{border:0;border-radius:28px;padding:34px 36px;background:linear-gradient(135deg,var(--zx-deep) 0%,#0c5a55 60%,#124a43 100%);box-shadow:0 30px 70px rgba(6,61,59,.28);color:#fff;overflow:hidden;position:relative}
          .shop-page .hero::after{display:block!important;content:"";position:absolute;right:-60px;top:-60px;width:260px;height:260px;border-radius:50%;background:radial-gradient(circle,rgba(200,241,105,.45),transparent 65%);filter:blur(4px);pointer-events:none}
          .shop-page .hero h2{color:#fff!important;-webkit-text-fill-color:#fff!important;font-size:clamp(34px,5vw,58px);font-weight:900;line-height:1.02}
          .shop-page .hero p{color:rgba(255,255,255,.78)!important}
          .shop-page .hero .eyebrow{color:var(--zx-lime)!important}
          .shop-page .toolbar{border:0;background:transparent;padding:4px 0 14px}
          .shop-page .chip{border-radius:999px;border:1px solid rgba(6,61,59,.14);background:#fff;font-weight:700;text-transform:none;letter-spacing:0;font-size:12px;padding:0 14px;min-height:38px;transition:transform .2s ease,background .2s ease,box-shadow .2s ease}
          .shop-page .chip:hover{transform:translateY(-2px);box-shadow:0 8px 18px rgba(6,61,59,.12)}
          .shop-page .chip.active{background:var(--zx-ink);border-color:var(--zx-ink);color:var(--zx-lime);box-shadow:0 10px 22px rgba(11,20,18,.25)}
          .shop-page .sort{border-radius:999px;font-weight:700}
          .shop-page .summary{border:0;padding:0 2px 14px;font-weight:600}

          /* Book cards: bold, tactile, scroll-friendly */
          .shop-page .card{border:0;border-radius:26px;background:#fff;box-shadow:0 14px 34px rgba(6,61,59,.09);position:relative;isolation:isolate;transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s ease}
          .shop-page .card::before{content:"";position:absolute;inset:-1px;border-radius:27px;padding:1.5px;background:linear-gradient(135deg,var(--zx-lime),transparent 40%,var(--zx-gold));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:0;transition:opacity .35s ease;z-index:-1}
          .shop-page .card:hover::before{opacity:1}
          .shop-page .card:has(.media:hover),.shop-page .card:has(.media:focus-visible){transform:translateY(-6px);box-shadow:0 26px 54px rgba(6,61,59,.16)}
          .shop-page .media{background:radial-gradient(circle at 30% 20%,rgba(200,241,105,.35),transparent 45%),radial-gradient(circle at 80% 90%,rgba(217,169,78,.30),transparent 50%),linear-gradient(160deg,#f2f7f1,#e4ede6)!important;border-radius:26px 26px 0 0}
          .shop-page .copy{background:transparent}
          .shop-page .card h3{font-weight:800!important;font-size:19px!important}
          .shop-page .price{font-weight:900;color:var(--zx-deep);letter-spacing:-.03em}
          .shop-page .off{background:var(--zx-lime);color:var(--zx-ink);border-radius:999px;font-weight:900}
          .shop-page .badge{background:var(--zx-ink)!important;color:var(--zx-lime)!important;border-radius:999px!important}
          .shop-page .save{background:#fff!important;color:var(--zx-deep)!important;border-radius:999px!important;box-shadow:0 6px 14px rgba(6,61,59,.12)}
          .shop-page .card-cart .add,.shop-page .add{border-radius:999px!important;background:linear-gradient(135deg,var(--zx-ink),var(--zx-deep))!important;color:var(--zx-lime)!important;font-weight:900;letter-spacing:.04em;text-transform:none;font-size:13px;min-height:44px;box-shadow:0 10px 22px rgba(6,61,59,.22)}
          .shop-page .card-cart .add:hover,.shop-page .add:hover{transform:translateY(-2px) scale(1.01)}
          .shop-page .view{border-radius:999px!important;font-weight:800;text-transform:none;letter-spacing:0;font-size:13px}
          .shop-page .details-hint b{background:var(--zx-lime);color:var(--zx-ink)}

          /* Modal & drawer */
          .shop-page .book-modal{border-radius:30px;border:0}
          .shop-page .modal-add,.shop-page .checkout-button,.shop-page .checkout-submit{border-radius:999px!important;text-transform:none!important;letter-spacing:0!important;font-size:14px!important;font-weight:900!important;background:linear-gradient(135deg,var(--zx-ink),var(--zx-deep))!important;color:var(--zx-lime)!important}
          .shop-page .buy-now{border-radius:999px!important;text-transform:none!important;font-size:14px!important;font-weight:900!important;background:var(--zx-lime)!important;color:var(--zx-ink)!important;border:0!important}
          .shop-page .drawer{border-radius:28px 0 0 28px;background:#fbfbf8}
          .shop-page .drawer-head h2{font-weight:900}
          .shop-page .drawer-foot{background:#fff}

          /* Chips in cart / checkout */
          .shop-page .checkout-page{background:linear-gradient(180deg,#f7f6f1,#eef3ee)!important}
          .shop-page .checkout-form,.shop-page .checkout-summary{border-radius:26px}
          .shop-page .checkout-heading h1{font-weight:900}
          .shop-page .payment-option{border-radius:18px}
          .shop-page .invoice-download{border-radius:999px}

          /* Motion (respect reduced motion) */
          @keyframes zx-rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
          .shop-page .card{animation:zx-rise .5s cubic-bezier(.16,1,.3,1) both}
          @media (prefers-reduced-motion:reduce){.shop-page .card,.shop-page .card::before{animation:none!important;transition:none!important}}

          /* Mobile */
          @media (max-width:680px){
            .shop-page .hero{padding:24px 22px;border-radius:22px}
            .shop-page .topbar-inner{border-radius:18px}
            .shop-page .card{border-radius:22px}
            .shop-page .media{border-radius:22px 22px 0 0}
            .shop-page .mobile-cart-bar{border-radius:999px;background:rgba(11,20,18,.94);border:0}
            .shop-page .mobile-cart-bar>div span{color:var(--zx-lime)}
            .shop-page .mobile-cart-bar>div strong{color:#fff}
            .shop-page .mobile-cart-bar button{background:var(--zx-lime);color:var(--zx-ink);border-radius:999px}
          }
        `}</style>
        <section className="catalogue-masthead" aria-labelledby="catalogue-title">
          <div className="masthead-orbit" aria-hidden="true"><span /><span /><span /></div>
          <div className="masthead-copy">
            <p className="masthead-kicker"><span /> Vijayam Publications</p>
            <h1 id="catalogue-title">
              The Academic <em>Book Collection</em>
            </h1>
            <p className="masthead-lead">
              Expertly developed textbooks and study companions for ambitious learners,
              thoughtfully arranged across every academic pathway.
            </p>
          </div>
          <div className="masthead-details" aria-label="Catalogue highlights">
            <div><strong>{category ? groupCount(initialGroup) : books.length}</strong><span>Curated titles</span></div>
            <div><strong>{programmeGroups.length}</strong><span>Learning paths</span></div>
            <div><strong>2025</strong><span>Latest editions</span></div>
          </div>
        </section>

        <header className="topbar">
          <div className="topbar-inner">
            <div className="brand" aria-label={`${selectedGroup} premium section`}>
              <ProgrammeIcon group={selectedGroup} compact />
              <span className="brand-copy"><strong>{selectedGroup}</strong><span>Premium Shelf</span></span>
            </div>
            <label className="search">⌕<input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search books, subjects, courses or ISBN…" aria-label="Search books, subjects, courses or ISBN" /></label>
            <div className="header-actions">
              <button type="button" className="track-order-trigger" onClick={() => { setTrackingOpen(true); setTrackingRecord(null); setTrackingQuery(""); setTrackingLink(""); setTrackingNotice(""); }}>Track order</button>
              <button type="button" className="cart-btn" onClick={() => setCartOpen(true)} aria-label={`${itemCount} books in cart`}>Bag <b>{itemCount}</b></button>
            </div>
          </div>
        </header>

        {itemCount > 0 && <div className="mobile-cart-bar">
          <div><span>Your bag</span><strong>{itemCount} item{itemCount === 1 ? "" : "s"} · ₹{subtotal}</strong></div>
          <button type="button" onClick={() => setCartOpen(true)}>View bag <span aria-hidden="true">→</span></button>
        </div>}

        <div className="layout">
          <aside className="sidebar" aria-label="All categories">
            <div className="side-head">
              <h1>Categories</h1>
              <button type="button" onClick={clearFilters}>Clear</button>
            </div>
            {visibleGroups.map((group) => (
              <section className="group" key={group}>
                <div className="group-title"><span>{group}</span><button type="button" onClick={() => selectGroup(group)}>{groupCount(group)} books</button></div>
                <div className="category-list">
                  {pathways.filter((pathway) => pathway.group === group).map((pathway) => {
                    const count = courseCount(pathway.course);
                    const active = selectedGroup === group && selectedCourse === pathway.course;
                    return (
                      <button type="button" key={`${group}-${pathway.course}`} className={`category-btn ${active ? "active" : ""}`} onClick={() => selectCourse(group, pathway.course)} aria-pressed={active}>
                        <strong>{pathway.course}</strong>
                        <span>{count ? `${count} books` : "Coming soon"}</span>
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
            {selectedGroup === "Degree" && (
              <section className="degree-sidebar degree-cbcs-card" aria-labelledby="degree-sidebar-title">
                <div className="degree-cbcs-topline">
                  <span className="degree-ap-seal">AP</span>
                  <div>
                    <p className="degree-sidebar-kicker">CBCS Degree Syllabus</p>
                    <h2 id="degree-sidebar-title">Books Classification</h2>
                    <small>All Universities · Semester-wise books</small>
                  </div>
                </div>

                <div className="degree-cbcs-title-strip" aria-hidden="true">
                  <span>AP Degree</span>
                  <strong>Premium Classification Index</strong>
                </div>

                <div className="degree-cbcs-meta" aria-label="Degree classification issue">
                  <span>2023-24</span>
                  <strong>2nd Year · Semester-III</strong>
                  <em>Question Bank + Study Material</em>
                </div>

                <div className="degree-sidebar-programmes" aria-label="Degree programmes">
                  <span>B.A.</span><span>B.Com.</span><span>B.Sc.</span><span>B.B.A.</span><span>B.C.A.</span>
                </div>

                <div className="degree-cbcs-scroll" aria-label="AP CBCS degree syllabus classification">
                  {degreeDistribution.map((section, index) => {
                    const sectionBooks = degreeBooksForSection(section.title);
                    const partitionSearch = section.title.replace(" Major", "").replace(" Courses", "");

                    return (
                      <article className="degree-partition" key={section.title}>
                        <button type="button" className="degree-classification-tile" onClick={() => setSearch(partitionSearch)}>
                          <span className="degree-classification-number">{String(index + 1).padStart(2, "0")}</span>
                          <span className="degree-classification-copy">
                            <strong>{section.title}</strong>
                            <small>{section.label}</small>
                            <em>{section.items.slice(0, 3).join(" · ")}{section.items.length > 3 ? " …" : ""}</em>
                          </span>
                          <b>{section.items.length}</b>
                        </button>

                        <div className="degree-partition-body">
                          <div className="degree-subject-grid" aria-label={`${section.title} subjects`}>
                            {section.items.map((item, itemIndex) => (
                              <button type="button" key={item} className="degree-subject-pill" onClick={() => setSearch(item)}>
                                <span>{String(itemIndex + 1).padStart(2, "0")}</span>{item}
                              </button>
                            ))}
                          </div>

                          <div className="degree-partition-books" aria-label={`${section.title} available books`}>
                            <strong>{sectionBooks.length ? "Books arranged in this partition" : "Books coming to this partition"}</strong>
                            {sectionBooks.length ? sectionBooks.map((book) => (
                              <button type="button" key={book.id} className="degree-mini-book" onClick={() => selectCourse("Degree", book.course)}>
                                <BookCover book={book} small />
                                <span><b>{book.title}</b><small>{book.course} · {semesterShort(book.semester)} · ₹{book.price}</small></span>
                              </button>
                            )) : <p>Titles will be placed here when this syllabus partition receives books.</p>}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>

                <div className="degree-cbcs-footer">
                  <span>Vijayam Reading… Spoon Feeding…</span>
                  <strong>also Available all Semester books</strong>
                </div>
              </section>
            )}
            {selectedGroup === "Degree" && (
              <section className="degree-journey-panel" aria-labelledby="degree-journey-title">
                <p className="degree-panel-kicker">Find Your Book</p>
                <h2 id="degree-journey-title">Academic Journey</h2>
                <div className="degree-pathline" aria-label="Current academic path">
                  <span>{degreeCode}</span><b>→</b><span>{yearLabel(degreeYear)}</span><b>→</b><span>{degreeSemesterLabel(degreeSemester)}</span><b>→</b><span>{degreeCategory}</span>
                </div>
                <label>Degree
                  <select value={degreeCode} onChange={(event) => chooseDegree(event.target.value as DegreeCode)}>
                    {degreeCodes.map((code) => <option key={code} value={code}>{code} — {degreeProfiles[code].fullName}</option>)}
                  </select>
                </label>
                <label>Year
                  <select value={degreeYear} onChange={(event) => setDegreeYear(Number(event.target.value) as DegreeYear)}>
                    {degreeYears.map((item) => <option key={item} value={item}>{yearLabel(item)}</option>)}
                  </select>
                </label>
                <label>Semester
                  <select value={degreeSemester} onChange={(event) => setDegreeSemester(Number(event.target.value) as DegreeSemester)}>
                    {degreeSemesters.map((item) => <option key={item} value={item}>{degreeSemesterLabel(item)}</option>)}
                  </select>
                </label>
                <label>Subject
                  <select value={degreeSubject} onChange={(event) => chooseDegreeSubject(event.target.value)}>
                    <option value="All Subjects">All Subjects</option>
                    {degreeSubjects.map((item) => <option key={item.name} value={item.name}>{item.name}</option>)}
                  </select>
                </label>
                <button type="button" onClick={() => chooseDegreeSubject(degreeSubject)}>Show My Books →</button>
              </section>
            )}
          </aside>

          <section className="content" aria-label="Books">
            {selectedGroup === "Degree" && (
              <div className="degree-discovery" aria-labelledby="degree-discovery-title">
                <section className="degree-student-flow" aria-labelledby="degree-student-title">
                  <div className="degree-simple-hero">
                    <p>Degree Collection</p>
                    <h2 id="degree-student-title">Find the books for your course.</h2>
                    <span>Select your course and we'll guide you to the books you need.</span>
                  </div>

                  <div className="degree-flow-panel">
                    <div className="degree-flow-progress" style={{ "--degree-progress": `${degreeProgress}%` } as CSSProperties} aria-label="Degree book finder progress">
                      {[["course", "Course"], ["year", "Year"], ["semester", "Semester"], ["subjects", "Subjects"], ["books", "Books"]].map(([step, label]) => (
                        <span key={step} className={degreeStepOrder.indexOf(degreeFlowStep) >= degreeStepOrder.indexOf(step as DegreeFlowStep) ? "active" : ""}>{label}</span>
                      ))}
                    </div>

                    <div className="degree-flow-context" aria-label="Degree finder guidance">
                      <div>
                        <p>Vijayam Guide</p>
                        <strong>{degreeFlowStep === "course" ? "Start with your course" : degreeFlowStep === "year" ? `${degreeCode} selected` : degreeFlowStep === "semester" ? `${degreeCode} · ${yearLabel(degreeYear)}` : degreeFlowStep === "subjects" ? `${degreeSemesterLabel(degreeSemester)} ready` : "Your book shelf is ready"}</strong>
                        <span>{degreeFlowStep === "course" ? "One choice unlocks the next step." : degreeFlowStep === "year" ? "Now choose your academic year." : degreeFlowStep === "semester" ? "Only semesters for this year are shown." : degreeFlowStep === "subjects" ? "Pick a subject or view all semester books." : "Open a book, view details, or add it to cart."}</span>
                      </div>
                      {degreeFlowStep !== "course" && <button type="button" onClick={() => { setDegreeFlowStep("course"); setDegreeSubject("All Subjects"); setSearch(""); }}>Start over</button>}
                    </div>

                    {degreeFlowStep === "course" && <div className="degree-flow-step">
                      <p className="degree-flow-kicker">Find your books</p>
                      <h3>What are you studying?</h3>
                      <span className="degree-flow-copy">Choose your course to get started.</span>
                      <div className="degree-course-cards">
                        {degreeCodes.map((code) => (
                          <button type="button" key={code} className="degree-choice-card" onClick={() => chooseDegree(code)}>
                            <span className="degree-choice-label">Degree</span>
                            <strong>{code}</strong>
                            <span>{degreeProfiles[code].fullName}</span>
                            <em>{degreeProfiles[code].descriptor}</em>
                            <b>Explore →</b>
                          </button>
                        ))}
                      </div>
                    </div>}

                    {degreeFlowStep === "year" && <div className="degree-flow-step">
                      <button type="button" className="degree-back" onClick={() => setDegreeFlowStep("course")}>← Change course</button>
                      <p className="degree-flow-kicker">{degreeCode}</p>
                      <h3>Which year are you in?</h3>
                      <span className="degree-flow-copy">Choose your academic year.</span>
                      <div className="degree-year-cards">
                        {degreeYears.map((year) => <button type="button" key={year} className="degree-choice-card compact" onClick={() => chooseDegreeYear(year)}><strong>{yearLabel(year)}</strong><b>Select →</b></button>)}
                      </div>
                    </div>}

                    {degreeFlowStep === "semester" && <div className="degree-flow-step">
                      <button type="button" className="degree-back" onClick={() => setDegreeFlowStep("year")}>← Change year</button>
                      <p className="degree-flow-kicker">{degreeCode} · {yearLabel(degreeYear)}</p>
                      <h3>Which semester?</h3>
                      <span className="degree-flow-copy">Only the semesters for your selected year are shown.</span>
                      <div className="degree-semester-cards">
                        {degreeYearSemesters.map((item) => <button type="button" key={item} className="degree-choice-card compact" onClick={() => chooseDegreeSemester(item)}><strong>{degreeSemesterLabel(item)}</strong><b>Continue →</b></button>)}
                      </div>
                    </div>}

                    {(degreeFlowStep === "subjects" || degreeFlowStep === "books") && <div className="degree-flow-step">
                      <div className="degree-confirmation">
                        <button type="button" className="degree-back" onClick={() => setDegreeFlowStep("semester")}>← Change semester</button>
                        <div><p>Your academic path</p><strong>{degreeCode} / {yearLabel(degreeYear)} / {degreeSemesterLabel(degreeSemester)}{degreeSubject !== "All Subjects" ? ` / ${degreeSubject}` : ""}</strong></div>
                      </div>

                      {degreeFlowStep === "subjects" && <>
                        <p className="degree-flow-kicker">Your semester</p>
                        <h3>Subjects in {degreeSemesterLabel(degreeSemester)}</h3>
                        <span className="degree-flow-copy">Pick a subject, or view all available books for this semester.</span>
                        <div className="degree-subject-simple-grid">
                          <button type="button" className="degree-subject-simple featured" onClick={() => chooseDegreeSubject("All Subjects")}><strong>All Subjects</strong><span>Show semester books</span><b>View Books →</b></button>
                          {semesterSubjects.map((subject) => {
                            const count = degreeBookCount(degreeCode, subject.name);
                            return <button type="button" key={`${degreeCode}-${subject.name}`} className="degree-subject-simple" onClick={() => chooseDegreeSubject(subject.name)}><strong>{subject.name}</strong><span>{subject.descriptor}</span><b>{count ? `${count} book${count === 1 ? "" : "s"}` : "View books"} →</b></button>;
                          })}
                        </div>
                      </>}

                      {degreeFlowStep === "books" && <>
                        <p className="degree-flow-kicker">Your books</p>
                        <h3>{degreeSubject === "All Subjects" ? `Books for ${degreeSemesterLabel(degreeSemester)}` : `Books for ${degreeSubject}`}</h3>
                        <span className="degree-flow-copy">Real Degree titles from the Vijayam catalogue.</span>
                        <div className="degree-shelf-summary" aria-label="Selected degree shelf summary">
                          <span><b>{degreeCode}</b><small>Course</small></span>
                          <span><b>{yearLabel(degreeYear)}</b><small>Year</small></span>
                          <span><b>{degreeSemesterLabel(degreeSemester)}</b><small>Semester</small></span>
                          <span><b>{selectedDegreePrimaryBooks.length}</b><small>Available books</small></span>
                        </div>
                        <div className="degree-simple-books">
                          {visibleDegreeBooks.map((book) => {
                            const quantity = cart[book.id] || 0;
                            return <article className="degree-simple-book" key={book.id}>
                              <button type="button" className="degree-simple-cover" onClick={() => openBook(book)} aria-label={`View ${book.title}`}><BookCover book={book} /></button>
                              <div className="degree-simple-copy"><span>{book.course} · {semesterShort(book.semester)}</span><h4>{book.title}</h4><p>by {book.author}</p><strong>₹{book.price}</strong></div>
                              <div className="degree-book-meta-row"><span>{book.edition}</span><span>{book.pages} pages</span></div>
                              <div className="degree-simple-actions"><button type="button" className="view" onClick={() => openBook(book)}>View Book →</button>{quantity ? <div className="qty"><button type="button" onClick={() => updateCart(book.id, -1)}>−</button><span>{quantity}</span><button type="button" onClick={() => updateCart(book.id, 1)}>+</button></div> : <button type="button" className="add" onClick={() => updateCart(book.id, 1, true)}>Add to Cart</button>}</div>
                            </article>;
                          })}
                          {!visibleDegreeBooks.length && <div className="degree-empty"><h4>Books coming soon</h4><p>Titles for this selection will appear here when they are added.</p></div>}
                        </div>
                        {visibleDegreeBookCount < selectedDegreePrimaryBooks.length && <div className="degree-load-more"><button type="button" onClick={() => setVisibleDegreeBookCount((count) => count + 8)}>Load more books →</button></div>}
                      </>}
                    </div>}
                  </div>

                  {degreeFlowStep === "books" && additionalDegreeBooks.length > 0 && <section className="degree-flow-more" aria-labelledby="degree-flow-more-title">
                    <div><p>More from Degree</p><h3 id="degree-flow-more-title">Explore more books from the Degree collection.</h3></div>
                    <div className="degree-more-strip">
                      {additionalDegreeBooks.map((book) => <button type="button" key={book.id} onClick={() => openBook(book)}><BookCover book={book} small /><span><strong>{book.title}</strong><small>{book.course} · ₹{book.price}</small></span></button>)}
                    </div>
                  </section>}

                  <section className="degree-flow-complete">
                    <div><p>Complete Collection</p><h3>Explore the complete Degree collection</h3><span>Browse all available Degree books from Vijayam Publications.</span></div>
                    <button type="button" onClick={() => { selectGroup("Degree"); setDegreeFlowStep("course"); setSearch(""); setVisibleDegreeBookCount(degreeCatalogueBooks.length); }}>Explore all Degree books →</button>
                  </section>
                </section>

                <section className="degree-collection-hero">
                  <div>
                    <p className="degree-hero-kicker">Vijayam Degree Collection</p>
                    <h2 id="degree-discovery-title">Degree Books</h2>
                    <p>Find books by degree, year, semester and subject.</p>
                  </div>
                  <div className="degree-hero-search" aria-label="Compact degree search">
                    <strong>Your academic path</strong>
                    <span>{degreeCode} / {yearLabel(degreeYear)} / {degreeSemesterLabel(degreeSemester)} / {degreeSubject}</span>
                    <button type="button" onClick={() => chooseDegreeSubject(degreeSubject)}>Show my books →</button>
                  </div>
                </section>

                <section className="degree-premium-showcase" aria-labelledby="degree-showcase-title">
                  <div className="degree-showcase-head">
                    <div>
                      <p>Visible Degree Books</p>
                      <h3 id="degree-showcase-title">Books you can open now</h3>
                    </div>
                    <span>Real Vijayam Degree titles are surfaced immediately, while the classification below helps students narrow their exact academic path.</span>
                  </div>
                  <div className="degree-showcase-grid">
                    {degreeCatalogueBooks.map((book) => (
                      <button type="button" key={book.id} className="degree-show-book" onClick={() => openBook(book)} aria-label={`View ${book.title}`}>
                        <span className="degree-show-cover"><BookCover book={book} /></span>
                        <span className="degree-show-copy">
                          <small>{book.course} · {semesterShort(book.semester)}</small>
                          <strong>{book.title}</strong>
                          <span>{book.author}</span>
                          <span className="degree-show-price"><b>₹{book.price}</b><em>View Book →</em></span>
                        </span>
                      </button>
                    ))}
                  </div>
                </section>

                <section className="degree-classification-board" aria-labelledby="degree-classification-title">
                  <div className="degree-classification-head">
                    <div>
                      <p>Premium Academic Classification</p>
                      <h3 id="degree-classification-title">All {visibleSubjectCount} syllabus subjects arranged as book pathways</h3>
                    </div>
                    <span>A modern course-discovery board that keeps Core / Major prominent while exposing every Degree subject from the Vijayam academic catalogue.</span>
                  </div>
                  <div className="degree-classification-track">
                    {degreeCategories.map((categoryName, index) => {
                      const subjects = subjectsForDegreeCategory(degreeCode, categoryName);
                      const active = degreeCategory === categoryName;
                      const className = categoryName === "Core / Major" ? "core" : categoryName === "Minor Courses" ? "minor" : categoryName === "Multidisciplinary Courses" ? "multi" : "life";
                      const description = categoryName === "Core / Major" ? "Primary subjects for your selected degree and the strongest book discovery route." : categoryName === "Minor Courses" ? "Specialised academic choices that support your degree profile." : categoryName === "Multidisciplinary Courses" ? "Cross-disciplinary foundations arranged for quick course discovery." : "Career-ready skill courses with compact subject pathways.";

                      return (
                        <button type="button" key={categoryName} className={`degree-partition-card ${className} ${active ? "active" : ""}`} onClick={() => chooseDegreeCategory(categoryName)} aria-pressed={active}>
                          <span className="degree-partition-top">
                            <span className="degree-partition-number">{String(index + 1).padStart(2, "0")}</span>
                            <span className="degree-partition-count">{subjects.length} active subjects</span>
                          </span>
                          <strong>{categoryName}</strong>
                          <p>{description}</p>
                          <span className="degree-partition-subjects" aria-hidden="true">
                            {subjects.slice(0, 4).map((subject) => <span key={subject.name}>{subject.name}</span>)}
                          </span>
                          <span className="degree-partition-action">Explore partition →</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="degree-all-subjects" aria-labelledby="degree-all-subjects-title">
                    <div className="degree-all-subjects-head">
                      <div>
                        <p>Complete 72-subject index</p>
                        <h4 id="degree-all-subjects-title">Every Degree subject visible in one premium board</h4>
                      </div>
                      <span>{visibleSubjectCount} subjects</span>
                    </div>
                    <div className="degree-subject-cloud">
                      {allDegreeCatalogueSubjects.map((item, index) => (
                        <button type="button" key={`${item.section}-${item.subject}`} onClick={() => setSearch(item.subject)}>
                          <b>{String(index + 1).padStart(2, "0")}</b>
                          <span>{item.subject}</span>
                          <small>{item.label}</small>
                        </button>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="degree-quick-find" aria-labelledby="degree-quick-title">
                  <div className="degree-quick-head">
                    <p>Find Your Book</p>
                    <h3 id="degree-quick-title">Choose your academic path</h3>
                    <span>Choose your degree, year, semester and subject to discover the books you need.</span>
                  </div>
                  <div className="degree-choice-stack" aria-label="Academic discovery choices">
                    <div className="degree-choice-step">
                      <div><b>01</b><span>Degree</span></div>
                      <div className="degree-choice-options degree-code-options">
                        {degreeCodes.map((code) => <button type="button" key={code} className={degreeCode === code ? "active" : ""} onClick={() => chooseDegree(code)}>{code}</button>)}
                      </div>
                    </div>
                    <div className="degree-choice-step">
                      <div><b>02</b><span>Year</span></div>
                      <div className="degree-choice-options">
                        {degreeYears.map((item) => <button type="button" key={item} className={degreeYear === item ? "active" : ""} onClick={() => setDegreeYear(item)}>{yearLabel(item)}</button>)}
                      </div>
                    </div>
                    <div className="degree-choice-step">
                      <div><b>03</b><span>Semester</span></div>
                      <div className="degree-choice-options semester-options">
                        {degreeSemesters.map((item) => <button type="button" key={item} className={degreeSemester === item ? "active" : ""} onClick={() => setDegreeSemester(item)}>{["I", "II", "III", "IV", "V", "VI"][item - 1]}</button>)}
                      </div>
                    </div>
                    <div className="degree-choice-step">
                      <div><b>04</b><span>Category</span></div>
                      <div className="degree-choice-options category-options">
                        {degreeCategories.map((item) => <button type="button" key={item} className={degreeCategory === item ? "active" : ""} onClick={() => chooseDegreeCategory(item)}>{item}</button>)}
                      </div>
                    </div>
                    <div className="degree-choice-step subject-step">
                      <div><b>05</b><span>Subject</span></div>
                      <div className="degree-choice-options subject-options">
                        <button type="button" className={degreeSubject === "All Subjects" ? "active" : ""} onClick={() => chooseDegreeSubject("All Subjects")}>All Subjects</button>
                        {degreeSubjects.map((item) => <button type="button" key={item.name} className={degreeSubject === item.name ? "active" : ""} onClick={() => chooseDegreeSubject(item.name)}>{item.name}</button>)}
                      </div>
                    </div>
                  </div>
                  <div className="degree-legacy-selectors" aria-hidden="true">
                    <label>Degree
                      <select value={degreeCode} onChange={(event) => chooseDegree(event.target.value as DegreeCode)}>
                        {degreeCodes.map((code) => <option key={code} value={code}>{code} — {degreeProfiles[code].fullName}</option>)}
                      </select>
                    </label>
                    <label>Year
                      <select value={degreeYear} onChange={(event) => setDegreeYear(Number(event.target.value) as DegreeYear)}>
                        {degreeYears.map((item) => <option key={item} value={item}>{yearLabel(item)}</option>)}
                      </select>
                    </label>
                    <label>Semester
                      <select value={degreeSemester} onChange={(event) => setDegreeSemester(Number(event.target.value) as DegreeSemester)}>
                        {degreeSemesters.map((item) => <option key={item} value={item}>{degreeSemesterLabel(item)}</option>)}
                      </select>
                    </label>
                    <label>Subject
                      <select value={degreeSubject} onChange={(event) => chooseDegreeSubject(event.target.value)}>
                        {degreeSubjects.map((item) => <option key={item.name} value={item.name}>{item.name}</option>)}
                      </select>
                    </label>
                  </div>
                  <button type="button" className="degree-quick-cta" onClick={() => chooseDegreeSubject(degreeSubject)}>Show my books →</button>
                </section>

                <section className="degree-selector" aria-label="Choose your degree">
                  <div className="degree-section-head"><span>01</span><div><p>Choose your degree</p><h3>Start with your programme</h3></div></div>
                  <div className="degree-card-row">
                    {degreeCodes.map((code) => {
                      const active = degreeCode === code;
                      return (
                        <button type="button" key={code} className={`degree-card ${active ? "active" : ""}`} style={{ "--degree-accent": degreeProfiles[code].accent } as CSSProperties} onClick={() => chooseDegree(code)} aria-pressed={active}>
                          <span className="degree-card-mark">{code.replace(".", "")}</span>
                          <strong>{code}</strong>
                          <small>{degreeProfiles[code].fullName}</small>
                          <em>{degreeProfiles[code].descriptor}</em>
                          <b>{degreeBookCount(code)} books</b>
                          <span className="degree-explore">Explore →</span>
                        </button>
                      );
                    })}
                  </div>
                </section>

                <section className="degree-navigation" aria-label="Select year and semester">
                  <div className="degree-section-head"><span>02</span><div><p>Select year and semester</p><h3>{degreeProfiles[degreeCode].fullName}</h3></div></div>
                  <div className="degree-segment-group" role="tablist" aria-label="Degree year">
                    {degreeYears.map((item) => <button type="button" key={item} className={degreeYear === item ? "active" : ""} onClick={() => setDegreeYear(item)}>{yearLabel(item)}</button>)}
                  </div>
                  <div className="degree-semester-strip" role="tablist" aria-label="Degree semester">
                    {degreeSemesters.map((item) => <button type="button" key={item} className={degreeSemester === item ? "active" : ""} onClick={() => setDegreeSemester(item)}>{degreeSemesterLabel(item)}</button>)}
                  </div>
                </section>

                <section className="degree-path-card" aria-label="Your academic path">
                  <div><p>Your Academic Path</p><h3>Vijayam has organized your degree journey</h3></div>
                  <div className="degree-path-steps"><span>{degreeCode}</span>/<span>{yearLabel(degreeYear)}</span>/<span>{degreeSemesterLabel(degreeSemester)}</span>/<span>{degreeCategory}</span>/<span>{degreeSubject}</span></div>
                </section>

                <section className="degree-academic-map" aria-label="Explore subjects">
                  <div className="degree-core-section">
                    <div className="degree-category-title"><span>Core / Major</span><h3>Primary subjects for your degree</h3><p>Core subjects receive the strongest focus. Select a subject to bring its Vijayam books forward.</p></div>
                    <div className="degree-subject-grid-main">
                      {subjectsForDegreeCategory(degreeCode, "Core / Major").map((subject) => {
                        const active = degreeCategory === "Core / Major" && degreeSubject === subject.name;
                        return (
                          <button type="button" key={subject.name} className={`degree-subject-card major ${active ? "active" : ""}`} onClick={() => { chooseDegreeCategory("Core / Major"); chooseDegreeSubject(subject.name); }}>
                            <strong>{subject.name}</strong><span>{subject.descriptor}</span><b>{degreeBookCount(degreeCode, subject.name) || degreeBookCount(degreeCode)} books</b><em>Explore Books →</em>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="degree-secondary-columns">
                    {["Minor Courses", "Multidisciplinary Courses"].map((categoryName) => (
                      <section key={categoryName} className="degree-mini-category">
                        <div className="degree-category-title compact"><span>{categoryName}</span><h3>{categoryName === "Minor Courses" ? "Specialised academic choices" : "Cross-disciplinary foundations"}</h3></div>
                        <div className="degree-subject-list">
                          {subjectsForDegreeCategory(degreeCode, categoryName as DegreeAcademicCategory).map((subject) => (
                            <button type="button" key={subject.name} className={degreeCategory === categoryName && degreeSubject === subject.name ? "active" : ""} onClick={() => { chooseDegreeCategory(categoryName as DegreeAcademicCategory); chooseDegreeSubject(subject.name); }}>
                              <span>{subject.name}</span><b>Explore →</b>
                            </button>
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>

                  <section className="degree-life-skill">
                    <div className="degree-category-title compact"><span>Life Skill Courses</span><h3>Career-ready academic skills</h3></div>
                    <div className="degree-life-row">
                      {lifeSkillSubjects.map((subject) => (
                        <button type="button" key={subject.name} className={degreeCategory === "Life Skill Courses" && degreeSubject === subject.name ? "active" : ""} onClick={() => { chooseDegreeCategory("Life Skill Courses"); chooseDegreeSubject(subject.name); }}>
                          {subject.name}<span>Explore →</span>
                        </button>
                      ))}
                    </div>
                  </section>
                </section>

                <section className="degree-book-results" aria-labelledby="degree-books-title">
                  <div className="degree-results-head">
                    <div><p>Books for selected subject</p><h3 id="degree-books-title">Books for {degreeSubject}</h3><span>{degreeCode} / {yearLabel(degreeYear)} / {degreeSemesterLabel(degreeSemester)} / {degreeCategory}</span></div>
                    <b>{selectedDegreePrimaryBooks.length} available</b>
                  </div>
                  <div className="degree-result-grid">
                    {visibleDegreeBooks.map((book) => {
                      const quantity = cart[book.id] || 0;
                      return (
                        <article className="degree-book-card" key={book.id}>
                          <button type="button" className="degree-book-cover-btn" onClick={() => openBook(book)} aria-label={`View ${book.title}`}><BookCover book={book} /></button>
                          <div>
                            <span>{book.course} · {semesterShort(book.semester)}</span>
                            <h4>{book.title}</h4>
                            <p>by {book.author}</p>
                            <small>★ {book.rating} · {book.reviews} reviews</small>
                            <div className="degree-book-actions">
                              <strong>₹{book.price}</strong>
                              <button type="button" className="view" onClick={() => openBook(book)}>View Book</button>
                              {quantity ? <div className="qty"><button type="button" onClick={() => updateCart(book.id, -1)}>−</button><span>{quantity}</span><button type="button" onClick={() => updateCart(book.id, 1)}>+</button></div> : <button type="button" className="add" onClick={() => updateCart(book.id, 1, true)}>Add to Cart</button>}
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                  {visibleDegreeBookCount < selectedDegreePrimaryBooks.length && <div className="degree-load-more"><button type="button" onClick={() => setVisibleDegreeBookCount((count) => count + 8)}>Load more books →</button></div>}
                </section>

                {additionalDegreeBooks.length > 0 && <section className="degree-more-books" aria-labelledby="degree-more-title">
                  <h3 id="degree-more-title">More from Degree Collection</h3>
                  <p>Explore additional books from the Degree collection.</p>
                  <div className="degree-more-grid">
                    {additionalDegreeBooks.map((book) => {
                      const quantity = cart[book.id] || 0;
                      return (
                        <article className="degree-book-card" key={book.id}>
                          <button type="button" className="degree-book-cover-btn" onClick={() => openBook(book)} aria-label={`View ${book.title}`}><BookCover book={book} /></button>
                          <div>
                            <span>{book.course} · {semesterShort(book.semester)}</span>
                            <h4>{book.title}</h4>
                            <p>by {book.author}</p>
                            <div className="degree-book-actions">
                              <strong>₹{book.price}</strong>
                              <button type="button" className="view" onClick={() => openBook(book)}>View Book</button>
                              {quantity ? <div className="qty"><button type="button" onClick={() => updateCart(book.id, -1)}>−</button><span>{quantity}</span><button type="button" onClick={() => updateCart(book.id, 1)}>+</button></div> : <button type="button" className="add" onClick={() => updateCart(book.id, 1, true)}>Add to Cart</button>}
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>}

                <section className="degree-complete-collection" aria-label="Explore complete Degree collection">
                  <div><h3>Explore the Complete Degree Collection</h3><p>Browse all available Degree books from Vijayam Publications.</p></div>
                  <button type="button" className="degree-complete-cta" onClick={() => { selectGroup("Degree"); setSearch(""); setVisibleDegreeBookCount(degreeCatalogueBooks.length); }}>Explore all Degree books →</button>
                </section>
              </div>
            )}
            {selectedGroup !== "Degree" && <>
            {selectedGroup === "Nursing" && <section className="nursing-catalogue" aria-labelledby="nursing-catalogue-title">
              <div className="nursing-catalogue-head">
                <div><p className="nursing-catalogue-kicker">Vijayam Nursing Catalogue</p><h2 id="nursing-catalogue-title">Nursing books, arranged for every programme.</h2></div>
                <span>Choose your programme first, then browse textbook and study-material titles semester by semester.</span>
              </div>
              <div className="nursing-programme-grid">
                {nursingCatalogueGuide.map((programme, index) => {
                  const active = selectedCourse === programme.course;
                  return <button type="button" key={programme.course} className={`nursing-programme ${active ? "active" : ""}`} style={{ "--nursing-colour": programme.colour } as CSSProperties} onClick={() => selectCourse("Nursing", programme.course)} aria-pressed={active}>
                    <b>Programme {String(index + 1).padStart(2, "0")}</b><strong>{programme.label}</strong><span>{programme.detail}</span>
                  </button>;
                })}
              </div>
              {selectedCourse === "B.Sc Nursing" && <div className="nursing-semester-guide" aria-label="B.Sc Nursing semester guide">
                {semesterOrder.map((item) => <button type="button" key={item} className={semester === item ? "active" : ""} onClick={() => setSemester(item)}>{semesterShort(item)}</button>)}
              </div>}
            </section>}
            <div className="hero">
              <div>
                <p className="eyebrow">{sectionCopy[selectedGroup].eyebrow}</p>
                <h2>{selectedTitle}</h2>
                <p>{sectionCopy[selectedGroup].lead}</p>
              </div>
              <ProgrammeIcon group={selectedGroup} />
            </div>

            <div className="toolbar">
              {selectedGroup !== "Vocational" ? (
                <div className="filters" aria-label="Filter books">
                  <button type="button" className={`chip ${need === "All" ? "active" : ""}`} onClick={() => setNeed("All")}>All books</button>
                  {bookTypes.map((item) => <button type="button" key={item} className={`chip ${need === item ? "active" : ""}`} onClick={() => setNeed(item)}>{item === "Text Book" ? "Text Books" : item === "Study Material" ? "Study Materials" : "Question Banks"}</button>)}
                  <button type="button" className={`chip ${semester === "All" ? "active" : ""}`} onClick={() => setSemester("All")}>All semesters</button>
                  {semesterOrder.map((item) => <button type="button" key={item} className={`chip ${semester === item ? "active" : ""}`} onClick={() => setSemester(item)}>{semesterShort(item)}</button>)}
                </div>
              ) : (
                <div className="filters vocational-note">
                  <span>Choose Telugu Medium or English Medium from the left. No extra semester filters.</span>
                </div>
              )}
              <select className="sort" value={sort} onChange={(event) => setSort(event.target.value as SortOption)} aria-label="Sort books">
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="title">Title A-Z</option>
                <option value="price-low">Price Low-High</option>
                <option value="price-high">Price High-Low</option>
              </select>
            </div>

            <div className="summary"><span>Showing <b>{filteredBooks.length}</b> books</span><span>{selectedGroup} / {selectedCourse === "All" ? "All courses" : selectedCourse}</span></div>

            <div className="book-grid">
              {filteredBooks.map((book) => {
                const quantity = cart[book.id] || 0;
                return (
                  <article className="card" key={book.id}>
                    <button
                      type="button"
                      className="media"
                      onClick={() => openBook(book)}
                      aria-label={`View full details for ${book.title}`}
                    >
                      <span className="badge">{book.subject === "Question Bank" ? "Question Bank" : book.bookType}</span>
                      <span className="save">Save ₹{book.mrp - book.price}</span>
                      <BookCover book={book} />
                    </button>
                    <div className="copy">
                      <span className="meta">{book.course} · {semesterShort(book.semester)}</span>
                      <h3>{book.title}</h3>
                      <p className="author">by {book.author}</p>
                      <div className="card-facts" aria-label={`${book.title} key details`}>
                        <span className="card-rating"><b>★ {book.rating}</b><small>{book.reviews} reviews</small></span>
                        <span><small>Edition</small><b>{book.edition}</b></span>
                        <span><small>Length</small><b>{book.pages} pages</b></span>
                      </div>
                      <div className="card-glance">
                        <div>
                          <span className="price">₹{book.price}</span> <span className="mrp">₹{book.mrp}</span>
                          <br />
                          <span className="off">{discountPercent(book)}% OFF</span>
                        </div>
                        <span className="details-hint">View details <b>→</b></span>
                      </div>
                      <div className="card-cart" onClick={(event) => event.stopPropagation()} onKeyDown={(event) => event.stopPropagation()}>
                        {quantity ? (
                          <div className="qty" aria-label={`${book.title} quantity`}>
                            <button type="button" onClick={() => updateCart(book.id, -1)} aria-label={`Remove one ${book.title}`}>−</button>
                            <span>{quantity}</span>
                            <button type="button" onClick={() => updateCart(book.id, 1)} aria-label={`Add one ${book.title}`}>+</button>
                          </div>
                        ) : (
                          <button type="button" className="add" onClick={() => updateCart(book.id, 1, true)}>Add to Cart</button>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
              {!filteredBooks.length && <div className="empty"><h2>Books coming to this pathway</h2><p>This category is available. Titles will appear here when books are added.</p></div>}
            </div>
            </>}
          </section>
        </div>
      </div>

      {selectedBook && (selectedBook.id === 1 ? (
        <div className="book-modal-overlay" onClick={() => setSelectedBook(null)}>
          <section className="book-modal anatomy-reader" role="dialog" aria-modal="true" aria-labelledby="anatomy-reader-title" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setSelectedBook(null)} aria-label="Close Applied Anatomy reader">×</button>
            <div className="anatomy-split">
              <div className="anatomy-pages">
                <div className="anatomy-pages-head">
                  <span>Applied Anatomy &amp; Physiology · Page preview</span>
                  <b>{String(readerPage + 1).padStart(2, "0")} / {String(appliedAnatomyPages.length).padStart(2, "0")}</b>
                </div>
                <div className="reader-stage">
                  <button type="button" className="reader-nav previous" onClick={() => turnReaderPage(readerPage - 1)} disabled={readerPage === 0} aria-label="Previous page">‹</button>
                  <img key={readerPage} className={`reader-page ${readerDirection}`} src={appliedAnatomyPages[readerPage]} alt={`Applied Anatomy page ${readerPage + 1} of ${appliedAnatomyPages.length}`} />
                  <button type="button" className="reader-nav next" onClick={() => turnReaderPage(readerPage + 1)} disabled={readerPage === appliedAnatomyPages.length - 1} aria-label="Next page">›</button>
                  <div className="reader-status"><span>Applied Anatomy</span><span>Turn page</span></div>
                </div>
                <div className="anatomy-filmstrip" aria-label="Book page thumbnails">
                  {appliedAnatomyPages.map((page, index) => (
                    <button type="button" key={page} className={`anatomy-thumb ${readerPage === index ? "active" : ""}`} onClick={() => turnReaderPage(index)} aria-label={`Open page ${index + 1}`} aria-current={readerPage === index ? "page" : undefined}>
                      <img src={page} alt="" /><span>{index + 1}</span>
                    </button>
                  ))}
                </div>
              </div>

              <aside className="anatomy-info">
                <span className="modal-kicker">B.Sc Nursing · Semester 1</span>
                <h2 id="anatomy-reader-title">{selectedBook.title}</h2>
                <p className="modal-author">by {selectedBook.author}</p>
                <div className="anatomy-edition">{selectedBook.edition} · Premium Academic Edition</div>
                <div className="modal-rating">★ {selectedBook.rating} <span>({selectedBook.reviews} verified reviews)</span></div>
                <p className="modal-desc">{selectedBook.description}</p>

                <div className="modal-price-row">
                  <div>
                    <span className="modal-price">₹{selectedBook.price}</span>
                    <span className="modal-mrp">₹{selectedBook.mrp}</span><br />
                    <span className="modal-save">Save ₹{selectedBook.mrp - selectedBook.price} · {discountPercent(selectedBook)}% OFF</span>
                  </div>
                  <button type="button" className="modal-add" onClick={() => addFromBookDetails(selectedBook)}>Add Premium Edition to Cart&nbsp; →</button>
                </div>

                <div className="anatomy-specs" aria-label="Applied Anatomy book information">
                  <div className="anatomy-spec"><span>ISBN</span><b>{selectedBook.isbn}</b></div>
                  <div className="anatomy-spec"><span>Edition</span><b>{selectedBook.edition}</b></div>
                  <div className="anatomy-spec"><span>Course</span><b>{selectedBook.course}</b></div>
                  <div className="anatomy-spec"><span>Semester</span><b>{selectedBook.semester}</b></div>
                  <div className="anatomy-spec"><span>Subject</span><b>{selectedBook.subject}</b></div>
                  <div className="anatomy-spec"><span>Pages</span><b>{selectedBook.pages} pages</b></div>
                  <div className="anatomy-spec"><span>Publication year</span><b>{selectedBook.year}</b></div>
                  <div className="anatomy-spec"><span>Format</span><b>{selectedBook.format}</b></div>
                  <div className="anatomy-spec"><span>Language</span><b>{selectedBook.language}</b></div>
                  <div className="anatomy-spec"><span>Category</span><b>{selectedBook.category}</b></div>
                </div>
              </aside>
            </div>
          </section>
        </div>
      ) : (
        <div className="book-modal-overlay" onClick={() => setSelectedBook(null)}>
          <section className="book-modal" role="dialog" aria-modal="true" aria-labelledby="book-detail-title" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setSelectedBook(null)} aria-label="Close book details">×</button>
            <div className="modal-grid">
              <div className="modal-media">
                <BookCover book={selectedBook} />
                {selectedBook.coverImage && <button type="button" className="magnify-btn" onClick={() => setZoomBook(selectedBook)} aria-label={`Magnify ${selectedBook.title} cover`}>⌕</button>}
              </div>
              <div className="modal-content">
                <p className="modal-kicker">{selectedBook.category} · {selectedBook.bookType}</p>
                <h2 id="book-detail-title">{selectedBook.title}</h2>
                <p className="modal-author">by {selectedBook.author}</p>
                <div className="modal-rating">★ {selectedBook.rating} <span>({selectedBook.reviews} reviews)</span></div>
                <p className="modal-desc">{selectedBook.description}</p>

                <div className="modal-price-row">
                  <div>
                    <span className="modal-price">₹{selectedBook.price}</span>
                    <span className="modal-mrp">₹{selectedBook.mrp}</span>
                    <br />
                    <span className="modal-save">Save ₹{selectedBook.mrp - selectedBook.price} · {discountPercent(selectedBook)}% OFF</span>
                  </div>
                  <div className="product-actions">
                    <button type="button" className="modal-add" onClick={() => addFromBookDetails(selectedBook)}>Add to Cart</button>
                    <button type="button" className="buy-now" onClick={() => buyNowFromBook(selectedBook)}>Buy Now <span aria-hidden="true">→</span></button>
                  </div>
                </div>

                <div className="modal-specs" aria-label="Book information">
                  <div className="modal-spec"><span>Course</span><b>{selectedBook.course}</b></div>
                  <div className="modal-spec"><span>Semester</span><b>{selectedBook.semester}</b></div>
                  <div className="modal-spec"><span>Subject</span><b>{selectedBook.subject}</b></div>
                  <div className="modal-spec"><span>Edition</span><b>{selectedBook.edition}</b></div>
                  <div className="modal-spec"><span>{selectedBook.category === "Degree" ? "Author" : "ISBN"}</span><b>{selectedBook.category === "Degree" ? selectedBook.author : selectedBook.isbn}</b></div>
                  <div className="modal-spec"><span>Pages</span><b>{selectedBook.pages}</b></div>
                  <div className="modal-spec"><span>Year</span><b>{selectedBook.year}</b></div>
                  <div className="modal-spec"><span>Format</span><b>{selectedBook.format}</b></div>
                  <div className="modal-spec"><span>Language</span><b>{selectedBook.language}</b></div>
                  <div className="modal-spec"><span>Category</span><b>{selectedBook.category}</b></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ))}

      {zoomBook && (
        <div className="zoom-overlay" onClick={() => setZoomBook(null)}>
          <section className="zoom-panel" role="dialog" aria-modal="true" aria-label={`${zoomBook.title} enlarged cover`} onClick={(event) => event.stopPropagation()}>
            <button type="button" className="zoom-close" onClick={() => setZoomBook(null)} aria-label="Close magnified cover">×</button>
            <div className="zoom-frame">
              {zoomBook.coverImage ? <img src={zoomBook.coverImage} alt={`${zoomBook.title} enlarged book cover`} /> : <BookCover book={zoomBook} />}
            </div>
            <p>Magnified premium cover preview</p>
          </section>
        </div>
      )}

      <style>{`
        /* Full-page mobile-first checkout experience */
        .checkout-page{position:fixed;inset:0;z-index:120;overflow:auto;padding:0 24px 48px;background:radial-gradient(circle at 92% 4%,rgba(184,148,70,.10),transparent 25%),linear-gradient(180deg,#faf9f6,#f3f0e9);color:#202722;animation:checkout-enter .32s ease both}
        @keyframes checkout-enter{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        .checkout-header{position:sticky;top:0;z-index:5;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:18px;max-width:1160px;margin:0 auto;padding:16px 0;border-bottom:1px solid #e5dfd5;background:rgba(250,249,246,.94);backdrop-filter:blur(14px)}
        .checkout-back,.checkout-close{width:max-content;border:0;background:transparent;color:#52645b;font-size:12px;font-weight:750}.checkout-back:hover{color:#17685b}.checkout-close{justify-self:end;width:38px;height:38px;border:1px solid #e2ddd4;border-radius:50%;background:#fff;font-size:22px}
        .checkout-brand{display:flex;align-items:center;gap:10px}.checkout-brand>span{display:grid;width:38px;height:38px;place-items:center;border-radius:11px;background:#173b34;color:#fff;font-family:Georgia,serif;font-size:22px}.checkout-brand div{display:grid;gap:2px}.checkout-brand strong{color:#173b34;font-size:12px;letter-spacing:.04em}.checkout-brand small{color:#858078;font-size:9px;letter-spacing:.13em;text-transform:uppercase}
        .checkout-progress{display:flex;align-items:center;justify-content:center;gap:14px;max-width:1160px;margin:24px auto 30px;color:#918b81;font-size:10px;font-weight:800;letter-spacing:.04em}.checkout-progress span{display:flex;align-items:center;gap:7px;white-space:nowrap}.checkout-progress b{display:grid;width:25px;height:25px;place-items:center;border:1px solid #ddd6ca;border-radius:50%;background:#fff;font-size:10px}.checkout-progress .complete,.checkout-progress .current{color:#173b34}.checkout-progress .complete b{border-color:#17685b;background:#17685b;color:#fff}.checkout-progress .current b{border-color:#d99a63;background:#fff5ea;color:#a94d32}.checkout-progress i{width:clamp(24px,8vw,100px);height:1px;background:#ded8ce}
        .checkout-layout{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(300px,.75fr);align-items:start;gap:26px;max-width:1160px;margin:auto}.checkout-form,.checkout-summary{border:1px solid #e7e1d8;border-radius:22px;background:#fff;box-shadow:0 14px 38px rgba(32,39,34,.055)}.checkout-form{padding:clamp(22px,4vw,42px)}.checkout-heading{margin-bottom:28px}.checkout-heading>p,.checkout-summary-heading p{margin:0 0 7px;color:#b76a43;font-size:9px;font-weight:950;letter-spacing:.18em;text-transform:uppercase}.checkout-heading h1{margin:0;color:#1c2520;font-family:Georgia,'Times New Roman',serif;font-size:clamp(32px,4vw,46px);font-weight:500;letter-spacing:-.045em}.checkout-heading>span{display:block;margin-top:8px;color:#737970;font-size:13px;line-height:1.6}
        .checkout-section{margin-top:25px;padding-top:24px;border-top:1px solid #eee9e1}.checkout-section-title{display:flex;align-items:center;gap:12px;margin-bottom:17px}.checkout-section-title>span{display:grid;width:32px;height:32px;place-items:center;border-radius:10px;background:#f6eee4;color:#a8663f;font-size:10px;font-weight:950}.checkout-section-title h2{margin:0;color:#26332c;font-family:Georgia,serif;font-size:21px;font-weight:600}.checkout-section-title p{margin:4px 0 0;color:#858078;font-size:11px}
        .checkout-fields{display:grid;grid-template-columns:1fr 1fr;gap:13px}.checkout-field{display:grid;gap:7px;color:#5d675f;font-size:10px;font-weight:850;letter-spacing:.04em}.checkout-field.wide{grid-column:1/-1}.checkout-field input{width:100%;min-height:46px;padding:0 13px;border:1px solid #e2ddd4;border-radius:10px;background:#fdfcf9;color:#202722;font-size:13px;letter-spacing:0;transition:border-color .2s ease,box-shadow .2s ease}.checkout-field input::placeholder{color:#aaa49a}.checkout-field input:focus{border-color:#b8a47d;box-shadow:0 0 0 3px rgba(184,148,70,.11);outline:0}
        .payment-options{display:grid;gap:9px}.payment-option{display:grid;grid-template-columns:18px minmax(0,1fr) auto;align-items:center;gap:12px;min-height:70px;padding:12px 14px;border:1px solid #e6e0d7;border-radius:13px;background:#fff;cursor:pointer;transition:border-color .2s ease,background .2s ease,box-shadow .2s ease}.payment-option.selected{border-color:#c88b63;background:#fffaf6;box-shadow:0 8px 20px rgba(169,77,50,.07)}.payment-option input{position:absolute;width:1px;height:1px;opacity:0}.payment-radio{display:grid;width:17px;height:17px;place-items:center;border:1.5px solid #c9c3ba;border-radius:50%}.payment-option input:checked+.payment-radio{border-color:#b85f3b}.payment-option input:checked+.payment-radio:after{width:8px;height:8px;border-radius:50%;background:#b85f3b;content:""}.payment-copy{display:grid;gap:4px}.payment-copy strong{color:#29332e;font-size:12px}.payment-copy small{color:#858078;font-size:10px}.payment-mark{color:#17685b;font-size:10px;font-weight:950;letter-spacing:.08em}.checkout-notice{margin:18px 0 0;padding:12px 14px;border:1px solid #ead2bf;border-radius:10px;background:#fff8f1;color:#784b32;font-size:12px;line-height:1.5}.checkout-secure-note{display:flex;gap:9px;align-items:flex-start;margin:22px 0 15px;color:#7a8079;font-size:10px;line-height:1.55}.checkout-secure-note span{color:#17685b;font-size:15px}.checkout-submit{display:flex;width:100%;min-height:52px;align-items:center;justify-content:center;gap:12px;border:0;border-radius:12px;background:#173b34;color:#fff;font-size:11px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;box-shadow:0 12px 24px rgba(23,59,52,.15);transition:transform .2s ease,background .2s ease,box-shadow .2s ease}.checkout-submit:hover{transform:translateY(-2px);background:#24584d;box-shadow:0 16px 28px rgba(23,59,52,.2)}.checkout-submit span{font-size:17px}.checkout-integration-note{margin:10px 0 0;color:#99938a;font-size:9px;text-align:center}
        .checkout-summary{position:sticky;top:88px;overflow:hidden;padding:23px}.checkout-summary-heading{display:flex;justify-content:space-between;align-items:center;gap:10px;padding-bottom:17px;border-bottom:1px solid #eee9e1}.checkout-summary-heading h2{margin:0;color:#26332c;font-family:Georgia,serif;font-size:23px;font-weight:600}.checkout-summary-heading>span{padding:6px 9px;border-radius:99px;background:#f5f1e9;color:#69736c;font-size:9px;font-weight:850}.checkout-items{display:grid;gap:0;max-height:310px;overflow:auto}.checkout-item{display:grid;grid-template-columns:42px minmax(0,1fr) auto;align-items:center;gap:11px;padding:14px 0;border-bottom:1px solid #f0ece5}.checkout-item .book-cover.small{width:38px;min-width:38px}.checkout-item>div{min-width:0}.checkout-item>div strong{display:block;overflow:hidden;color:#29332e;font-size:11px;line-height:1.35;text-overflow:ellipsis}.checkout-item>div small{display:block;margin-top:4px;color:#858078;font-size:9px}.checkout-item>b{color:#29332e;font-size:11px;white-space:nowrap}.checkout-totals{display:grid;gap:12px;padding:17px 0}.checkout-totals>div{display:flex;justify-content:space-between;gap:12px;color:#6e756e;font-size:11px}.checkout-totals>div b{color:#303832;font-size:11px}.checkout-totals .checkout-pending{color:#8a8174;font-size:9px;font-weight:700}.checkout-totals .checkout-estimate{padding-top:13px;border-top:1px solid #eee9e1;color:#24332d;font-size:13px;font-weight:850}.checkout-totals .checkout-estimate b{color:#173b34;font-family:Georgia,serif;font-size:22px}.checkout-totals>p{margin:0;color:#918b81;font-size:9px;line-height:1.55}.checkout-savings{display:flex;justify-content:space-between;align-items:center;padding:12px;border:1px solid #e1ece4;border-radius:11px;background:#f3f8f4;color:#53745f;font-size:10px}.checkout-savings strong{color:#28704e;font-size:13px}.checkout-help{display:flex;gap:10px;margin-top:16px;padding:13px;border-radius:12px;background:#f8f5ef}.checkout-help>span{color:#b89455}.checkout-help p{margin:0;color:#76766f;font-size:9px;line-height:1.55}.checkout-help strong{color:#39473f;font-size:10px}
        @media(max-width:820px){.checkout-page{padding:0 16px 32px}.checkout-layout{grid-template-columns:minmax(0,1fr) minmax(260px,.8fr);gap:15px}.checkout-summary{padding:17px}.checkout-form{padding:24px}.checkout-item{grid-template-columns:36px minmax(0,1fr) auto;gap:8px}.checkout-item .book-cover.small{width:32px;min-width:32px}}
        @media(max-width:680px){.checkout-page{padding:0 12px calc(24px + env(safe-area-inset-bottom))}.checkout-header{grid-template-columns:1fr auto 1fr;gap:6px;padding:11px 0}.checkout-back{font-size:10px}.checkout-brand{gap:7px}.checkout-brand>span{width:32px;height:32px;font-size:19px}.checkout-brand strong{font-size:10px}.checkout-brand small{font-size:8px}.checkout-close{width:34px;height:34px}.checkout-progress{justify-content:space-between;gap:6px;margin:17px auto 18px;font-size:8px}.checkout-progress span{gap:4px}.checkout-progress b{width:22px;height:22px;font-size:9px}.checkout-progress i{width:auto;flex:1}.checkout-layout{grid-template-columns:1fr;gap:13px}.checkout-form{padding:22px 17px;border-radius:17px}.checkout-summary{position:static;grid-row:1;padding:18px;border-radius:17px}.checkout-summary-heading h2{font-size:21px}.checkout-items{max-height:210px}.checkout-heading{margin-bottom:20px}.checkout-section{margin-top:21px;padding-top:19px}.checkout-section-title h2{font-size:19px}.checkout-field input{min-height:48px;font-size:16px}.payment-option{min-height:65px;padding:10px 11px}.checkout-submit{min-height:52px}.checkout-savings,.checkout-help{display:none}}
        @media(max-width:380px){.checkout-header{grid-template-columns:1fr auto;}.checkout-brand{grid-column:1/-1;grid-row:1;justify-self:center}.checkout-back{grid-column:1;grid-row:2}.checkout-close{grid-column:2;grid-row:2}.checkout-progress{letter-spacing:0}.checkout-progress span{font-size:7px}.checkout-progress i{min-width:8px}}
        @media(prefers-reduced-motion:reduce){.checkout-page,.checkout-submit,.payment-option{animation:none!important;transition:none!important}}
      `}</style>

      <style>{`
        /* Publisher palette: calm ivory surfaces, deep nursing green and restrained gold. */
        .checkout-page{background:radial-gradient(circle at 92% 3%,rgba(184,148,85,.11),transparent 24%),linear-gradient(180deg,#fbfaf7 0%,#f4f2eb 100%);color:#183d35}
        .checkout-header{border-color:#e4dfd3;background:rgba(251,250,247,.95)}
        .checkout-brand>span{border:1px solid rgba(184,148,85,.48);background:#075b59;color:#fff8e8;box-shadow:0 5px 14px rgba(7,91,89,.16)}
        .checkout-brand strong{color:#075b59}.checkout-back:hover{color:#075b59}
        .checkout-progress .complete,.checkout-progress .current{color:#075b59}
        .checkout-progress .complete b{border-color:#075b59;background:#075b59}
        .checkout-progress .current b{border-color:#b89455;background:#fff8e8;color:#075b59}
        .checkout-form,.checkout-summary{border-color:#e2dccc;border-radius:18px;box-shadow:0 16px 42px rgba(30,51,43,.07),inset 0 1px 0 #fff}
        .checkout-heading>p,.checkout-section-title>span,.checkout-summary-heading p{color:#075b59}
        .checkout-heading h1,.checkout-section-title h2,.checkout-summary-heading h2{color:#173f37}
        .checkout-section-title>span{background:#edf4ef}
        .checkout-field input:focus{border-color:#b89455;box-shadow:0 0 0 3px rgba(184,148,85,.13)}
        .payment-option.selected{border-color:#075b59;background:#f2f7f3;box-shadow:0 8px 20px rgba(7,91,89,.08)}
        .payment-option input:checked+.payment-radio{border-color:#075b59}
        .payment-option input:checked+.payment-radio:after{background:#075b59}
        .payment-mark{color:#075b59}
        .checkout-submit{background:linear-gradient(135deg,#075b59,#063d3b);box-shadow:0 12px 24px rgba(7,91,89,.18)}
        .checkout-submit:hover{background:#064b47;box-shadow:0 16px 28px rgba(7,91,89,.23)}
        .checkout-summary-heading>span{background:#edf4ef;color:#075b59}
        .checkout-totals .checkout-estimate b{color:#075b59}
        .checkout-savings{border-color:#dbe9df;background:#f1f7f2;color:#365e4c}
        .checkout-savings strong{color:#075b59}
        .invoice-download{display:flex;width:100%;min-height:46px;align-items:center;justify-content:center;gap:10px;margin-top:2px;border:1px solid #b89455;border-radius:11px;background:#fffdf8;color:#075b59;font-size:10px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;box-shadow:inset 0 1px 0 #fff;transition:transform .2s ease,background .2s ease,box-shadow .2s ease}
        .invoice-download:hover{transform:translateY(-2px);background:#fff8e8;box-shadow:0 10px 22px rgba(184,148,85,.16)}
        .invoice-download span{display:grid;width:23px;height:23px;place-items:center;border-radius:50%;background:#075b59;color:#fff;font-size:14px}
        .invoice-note{margin:7px 0 0;color:#77786e;font-size:9px;line-height:1.5;text-align:center}
        .drawer{border-color:#d9d0bd;background:#fffdf8}
        .drawer-head{border-color:#e4ddcf;background:#fffdf8}
        .drawer-head h2{color:#075b59}
        .cart-table-head{border-color:#e4ddcf;background:#f5f3ec;color:#315148}
        .cart-line{border-color:#e8e1d5;background:#fffdf8}
        .cart-line .line-controls{border-color:#e0d8c9}
        .cart-line .line-controls button{background:#f4f2eb;color:#075b59}
        .cart-clear{color:#8b3328}
        .drawer-foot{border-color:#e1d9ca;background:#f6f4ed}
        .drawer-foot .total b{color:#173f37}
        .drawer-foot .savings-total b{color:#26704e}
        .checkout-button,.cart-continue{background:#075b59;box-shadow:0 9px 19px rgba(7,91,89,.14)}
        .checkout-button:hover,.cart-continue:hover{background:#063d3b}
        @media(max-width:680px){.checkout-form,.checkout-summary{border-radius:15px}.invoice-download{min-height:48px}.checkout-header{background:rgba(251,250,247,.97)}}
        @media(prefers-reduced-motion:reduce){.invoice-download{transition:none!important}}
      `}</style>

      <style>{`
        /* Publisher checkout signature: editorial spacing, clear hierarchy, and a restrained green-and-gold identity. */
        .checkout-page{
          padding-inline:clamp(16px,3vw,44px);
          background:
            radial-gradient(ellipse at 12% 0,rgba(7,91,89,.055),transparent 34%),
            radial-gradient(ellipse at 92% 5%,rgba(184,148,85,.09),transparent 28%),
            linear-gradient(180deg,#fbfaf7 0%,#f5f3ed 100%);
        }
        .checkout-header,.checkout-progress,.checkout-layout{max-width:1260px}
        .checkout-header{padding:18px 0;border-color:#ded9cd}
        .checkout-brand>span{width:42px;height:42px;border-radius:12px;background:linear-gradient(145deg,#0b6c62,#063d3b);box-shadow:0 8px 20px rgba(7,91,89,.18),inset 0 1px 0 rgba(255,255,255,.3)}
        .checkout-brand strong{font-size:13px;letter-spacing:.015em}
        .checkout-brand small{letter-spacing:.16em}
        .checkout-progress{margin:28px auto 34px}
        .checkout-form,.checkout-summary{border-color:#e1dbcf;border-radius:20px;box-shadow:0 20px 50px rgba(30,45,37,.075),inset 0 1px 0 #fff}
        .checkout-form{padding:clamp(26px,3.2vw,46px)}
        .checkout-summary{top:84px;padding:26px;background:linear-gradient(155deg,#fffdf9,#fff 60%,#f7f5ee)}
        .checkout-heading{margin-bottom:32px}
        .checkout-heading>p,.checkout-section-title>span,.checkout-summary-heading p{color:#075b59}
        .checkout-heading h1{font-size:clamp(36px,4vw,50px);letter-spacing:-.05em}
        .checkout-heading>span{max-width:520px;font-size:14px}
        .checkout-section{margin-top:29px;padding-top:26px;border-color:#e9e4da}
        .checkout-section-title{margin-bottom:20px}
        .checkout-section-title h2,.checkout-summary-heading h2{font-weight:500;letter-spacing:-.025em}
        .checkout-field{gap:8px;color:#52635b;font-size:11px}
        .checkout-field input{min-height:49px;border-color:#ded9cf;border-radius:10px;background:#fff;color:#202722}
        .checkout-field input:focus{border-color:#b89455;box-shadow:0 0 0 3px rgba(184,148,85,.14)}
        .payment-option{min-height:74px;border-color:#e3ded4;border-radius:13px}
        .payment-option:hover{border-color:#b9cfc5;background:#fbfdfb}
        .payment-option.selected{border-color:#075b59;background:linear-gradient(110deg,#f0f7f3,#fffdf9);box-shadow:0 8px 22px rgba(7,91,89,.08)}
        .checkout-submit{min-height:54px;border:1px solid rgba(255,255,255,.12);background:linear-gradient(135deg,#0b6c62,#063d3b);box-shadow:0 14px 26px rgba(7,91,89,.2);letter-spacing:.12em}
        .checkout-submit:hover{background:linear-gradient(135deg,#0e796e,#075047);box-shadow:0 18px 32px rgba(7,91,89,.24)}
        .checkout-summary-heading{padding-bottom:19px}
        .checkout-summary-heading h2{font-size:26px}
        .checkout-items{max-height:360px}
        .checkout-item{padding:16px 0;border-color:#ebe6dd}
        .checkout-item>div strong{font-size:12px}
        .checkout-totals{gap:14px;padding:20px 0}
        .checkout-totals .checkout-estimate{padding-top:16px}
        .checkout-totals .checkout-estimate b{font-size:25px}
        .checkout-savings{border-color:#dce8df;border-radius:10px;background:#f2f7f2}
        .invoice-download{min-height:49px;border-radius:10px;background:#fffdf8;letter-spacing:.12em}
        .invoice-download:hover{border-color:#075b59;background:#f5f8f3}
        .checkout-help{border:1px solid #ece7dc;border-radius:11px;background:#f8f6f0}
        @media(max-width:820px){
          .checkout-page{padding-inline:20px}
          .checkout-layout{grid-template-columns:minmax(0,1.2fr) minmax(270px,.8fr);gap:18px}
          .checkout-summary{top:78px}
        }
        @media(max-width:680px){
          .checkout-page{padding-inline:12px}
          .checkout-header{padding:12px 0}
          .checkout-progress{margin:18px auto 20px}
          .checkout-layout{grid-template-columns:1fr}
          .checkout-summary{grid-row:1;position:relative;top:auto}
          .checkout-form{padding:22px 17px}
          .checkout-heading{margin-bottom:21px}
          .checkout-heading h1{font-size:36px}
          .checkout-section{margin-top:22px;padding-top:20px}
          .checkout-items{max-height:240px}
          .checkout-help{display:flex}
        }
        @media(max-width:380px){
          .checkout-page{padding-inline:9px}
          .checkout-form,.checkout-summary{padding:16px}
          .checkout-heading h1{font-size:32px}
        }
        @media(prefers-reduced-motion:reduce){.checkout-page,.checkout-submit,.payment-option,.invoice-download{animation:none!important;transition:none!important}}
      `}</style>

      <style>{`
        /* Contemporary publisher commerce polish + browser-local tracking preview */
        .header-actions{display:flex;align-items:center;gap:9px}
        .track-order-trigger{min-height:42px;padding:0 13px;border:1px solid #d9d0c2;border-radius:10px;background:#fffdf9;color:#174f45;font-size:10px;font-weight:900;letter-spacing:.06em;text-transform:uppercase;transition:transform .2s ease,border-color .2s ease,background .2s ease}
        .track-order-trigger:hover{transform:translateY(-2px);border-color:#b89455;background:#fff8e8}
        .shop-page .topbar-inner{border-radius:17px}
        .shop-page .cart-btn{border-radius:11px;background:linear-gradient(135deg,#075b59,#063d3b);box-shadow:0 10px 22px rgba(7,91,89,.16)}
        .shop-page .cart-btn:hover{transform:translateY(-2px);box-shadow:0 15px 28px rgba(7,91,89,.22)}
        .shop-page .book-grid{gap:18px}
        .shop-page .card{border-radius:17px;box-shadow:0 12px 30px rgba(24,45,37,.075);transition:transform .28s cubic-bezier(.16,1,.3,1),box-shadow .28s ease,border-color .28s ease}
        .shop-page .card:has(.media:hover),.shop-page .card:has(.media:focus-visible){transform:translateY(-6px);box-shadow:0 22px 42px rgba(24,45,37,.13)}
        .shop-page .card-cart .add{border-radius:10px;background:linear-gradient(135deg,#075b59,#063d3b);box-shadow:0 9px 20px rgba(7,91,89,.16)}
        .tracking-overlay{position:fixed;inset:0;z-index:130;display:grid;place-items:center;overflow:auto;padding:20px;background:rgba(8,24,20,.68);backdrop-filter:blur(12px);animation:tracking-fade .22s ease both}
        @keyframes tracking-fade{from{opacity:0}to{opacity:1}}
        .tracking-panel{position:relative;overflow:hidden;width:min(690px,100%);max-height:min(92vh,850px);overflow-y:auto;border:1px solid #d9d0c2;border-radius:24px;background:#fbfaf7;box-shadow:0 36px 100px rgba(0,0,0,.28);animation:tracking-rise .32s cubic-bezier(.16,1,.3,1) both}
        @keyframes tracking-rise{from{opacity:0;transform:translateY(16px) scale(.985)}to{opacity:1;transform:none}}
        .tracking-header{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;padding:25px 28px 20px;border-bottom:1px solid #e4ded3;background:linear-gradient(135deg,#fffdf9,#f2f5ef)}
        .tracking-header p{margin:0 0 7px;color:#a67f37;font-size:9px;font-weight:950;letter-spacing:.18em;text-transform:uppercase}
        .tracking-header h2{margin:0;color:#123f37;font-family:Georgia,'Times New Roman',serif;font-size:32px;font-weight:500;letter-spacing:-.04em}
        .tracking-header span{display:block;margin-top:7px;color:#69756e;font-size:12px;line-height:1.5}
        .tracking-close{width:38px;height:38px;flex:0 0 auto;border:1px solid #e0d8c9;border-radius:10px;background:#fff;color:#174f45;font-size:22px}
        .tracking-form{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:9px;padding:22px 28px}
        .tracking-form input{min-width:0;min-height:48px;padding:0 14px;border:1px solid #ded7ca;border-radius:11px;background:#fff;color:#20302b;font-size:13px}
        .tracking-form button,.tracking-share{min-height:46px;padding:0 16px;border:0;border-radius:11px;background:#075b59;color:white;font-size:10px;font-weight:900;letter-spacing:.07em;text-transform:uppercase;transition:transform .2s ease,background .2s ease}
        .tracking-form button:hover,.tracking-share:hover{transform:translateY(-2px);background:#063d3b}
        .tracking-body{padding:0 28px 26px}
        .tracking-notice{margin:0 0 18px;padding:12px 14px;border:1px solid #e5d8ba;border-radius:11px;background:#fff8e8;color:#64532e;font-size:11px;line-height:1.55}
        .tracking-result{padding:18px;border:1px solid #dce4dc;border-radius:17px;background:#fff;box-shadow:0 12px 26px rgba(24,45,37,.055)}
        .tracking-result-top{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;padding-bottom:15px;border-bottom:1px solid #e9e6df}
        .tracking-result-top p{margin:0 0 5px;color:#748078;font-size:9px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
        .tracking-result-top strong{color:#123f37;font-family:Georgia,serif;font-size:22px;font-weight:600;overflow-wrap:anywhere}
        .tracking-status{padding:7px 9px;border-radius:999px;background:#fff2df;color:#8c5b1f;font-size:8px;font-weight:950;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap}
        .tracking-items{display:grid;gap:6px;margin:14px 0;color:#3c4c43;font-size:11px}
        .tracking-items span{overflow-wrap:anywhere}
        .tracking-meta{display:flex;flex-wrap:wrap;gap:8px 16px;color:#747d76;font-size:10px}
        .tracking-meta b{color:#293c33}
        .tracking-link-box{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:9px;align-items:center;margin-top:16px;padding:10px;border:1px solid #e4ded3;border-radius:12px;background:#f8f7f2}
        .tracking-link-box code{overflow:hidden;color:#486056;font-size:10px;text-overflow:ellipsis;white-space:nowrap}
        .tracking-share{min-height:36px;padding:0 11px;font-size:8px}
        .tracking-timeline{display:grid;gap:0;margin-top:20px}
        .tracking-step{position:relative;display:grid;grid-template-columns:25px minmax(0,1fr);gap:11px;min-height:57px;color:#83877f}
        .tracking-step:not(:last-child):before{position:absolute;left:11px;top:24px;bottom:0;width:1px;background:#ddd8ce;content:""}
        .tracking-step>i{position:relative;z-index:1;display:grid;width:23px;height:23px;place-items:center;border:1px solid #d9d2c5;border-radius:50%;background:#fff;color:#8c897f;font-size:9px;font-style:normal}
        .tracking-step.done>i{border-color:#075b59;background:#075b59;color:#fff}
        .tracking-step strong{display:block;color:#37463e;font-size:11px}
        .tracking-step small{display:block;margin-top:3px;color:#85867e;font-size:9px;line-height:1.45}
        .tracking-step.done strong{color:#075b59}
        .tracking-empty{padding:18px;border:1px dashed #d8d0c2;border-radius:14px;color:#707970;font-size:12px;line-height:1.6;text-align:center}
        .tracking-empty strong{display:block;margin-bottom:4px;color:#173f37;font-family:Georgia,serif;font-size:20px;font-weight:500}
        @media(max-width:560px){
          .header-actions{gap:6px}.track-order-trigger{min-height:40px;padding:0 9px;font-size:9px}.shop-page .cart-btn{min-height:40px;padding:0 10px;font-size:9px}
          .tracking-overlay{align-items:end;padding:8px}.tracking-panel{width:100%;max-height:94dvh;border-radius:22px 22px 15px 15px}.tracking-header{padding:21px 18px 16px}.tracking-header h2{font-size:27px}.tracking-form{grid-template-columns:1fr;padding:17px 18px}.tracking-form button{min-height:44px}.tracking-body{padding:0 18px 22px}.tracking-result{padding:14px}.tracking-result-top{flex-direction:column}.tracking-link-box{grid-template-columns:minmax(0,1fr) auto}.tracking-link-box code{font-size:9px}
        }
        @media(prefers-reduced-motion:reduce){.tracking-overlay,.tracking-panel{animation:none!important}.tracking-form button,.tracking-share,.shop-page .card{transition:none!important}}
      `}</style>

      {trackingOpen && (
        <div className="tracking-overlay" onClick={() => setTrackingOpen(false)}>
          <section className="tracking-panel" role="dialog" aria-modal="true" aria-labelledby="tracking-title" onClick={(event) => event.stopPropagation()}>
            <header className="tracking-header">
              <div><p>Vijayam order support</p><h2 id="tracking-title">Track your order</h2><span>Enter the reference from your order link to view its status.</span></div>
              <button type="button" className="tracking-close" onClick={() => setTrackingOpen(false)} aria-label="Close tracking">×</button>
            </header>
            <form className="tracking-form" onSubmit={(event) => { event.preventDefault(); findTrackingRecord(); }}>
              <input value={trackingQuery} onChange={(event) => setTrackingQuery(event.target.value)} placeholder="Order reference or tracking link" aria-label="Order reference or tracking link" />
              <button type="submit">Find order</button>
            </form>
            <div className="tracking-body">
              {trackingNotice && <p className="tracking-notice" role="status">{trackingNotice}</p>}
              {trackingRecord ? <div className="tracking-result">
                <div className="tracking-result-top"><div><p>Tracking reference</p><strong>{trackingRecord.id}</strong></div><span className="tracking-status">Preview only</span></div>
                <div className="tracking-items">{trackingRecord.items.map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}</div>
                <div className="tracking-meta"><span>Created <b>{new Date(trackingRecord.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</b></span><span>Order total <b>₹{trackingRecord.amount}</b></span></div>
                {trackingLink && <div className="tracking-link-box"><code>{trackingLink}</code><button type="button" className="tracking-share" onClick={shareTrackingLink}>{trackingCopied ? "Copied" : "Copy link"}</button></div>}
                <div className="tracking-timeline" aria-label="Tracking preview stages">
                  <div className="tracking-step done"><i>✓</i><div><strong>Preview created</strong><small>Saved locally in this browser. No order has been sent to the publisher.</small></div></div>
                  <div className="tracking-step"><i>2</i><div><strong>Order processing</strong><small>Updates become available when the store order system is connected.</small></div></div>
                  <div className="tracking-step"><i>3</i><div><strong>Shipped</strong><small>Carrier and shipment details are not connected in this demo.</small></div></div>
                  <div className="tracking-step"><i>4</i><div><strong>Delivered</strong><small>Delivery confirmation will appear after fulfilment integration.</small></div></div>
                </div>
              </div> : <div className="tracking-empty"><strong>No tracking details yet</strong>Place a checkout preview in this browser to generate a shareable tracking link. Live shipment tracking needs a connected order and carrier service.</div>}
            </div>
          </section>
        </div>
      )}

      <style>{`
        /* Vijayam glass checkout: translucent surfaces, responsive layout, and clear form feedback. */
        .checkout-page{
          --checkout-green:#075b59;
          --checkout-deep:#063d3b;
          --checkout-gold:#b89455;
          --checkout-ink:#18332d;
          --checkout-muted:#697a73;
          --checkout-line:rgba(7,91,89,.14);
          --brand-red:#df2638;
          --brand-orange:#f28a18;
          --brand-yellow:#f4d532;
          --brand-blue:#123b91;
          background:
            radial-gradient(ellipse at 8% 10%,rgba(7,91,89,.18),transparent 35%),
            radial-gradient(ellipse at 94% 4%,rgba(184,148,85,.2),transparent 32%),
            linear-gradient(135deg,#f5f8f4 0%,#f7f3e9 48%,#eef5f1 100%)!important;
          color:var(--checkout-ink);
          isolation:isolate;
        }
        .checkout-page:before{
          position:fixed;inset:0;z-index:-1;pointer-events:none;
          background:linear-gradient(115deg,rgba(255,255,255,.32),transparent 42%,rgba(255,255,255,.18));
          content:"";
        }
        .checkout-header{
          border-bottom-color:rgba(7,91,89,.14);
          background:rgba(248,250,246,.72);
          box-shadow:0 10px 34px rgba(24,51,45,.045);
          backdrop-filter:blur(22px) saturate(1.25);
        }
        .checkout-brand>span{
          width:44px;height:44px;border:1px solid rgba(255,255,255,.68);border-radius:14px;
          background:linear-gradient(145deg,#0b746b,var(--checkout-deep));
          color:#fff9e9;font-family:Georgia,serif;font-size:25px;
          box-shadow:0 10px 24px rgba(7,91,89,.24),0 0 0 4px rgba(184,148,85,.13),inset 0 1px 0 rgba(255,255,255,.4);
        }
        .checkout-brand strong{color:var(--checkout-deep);font-weight:850}
        .checkout-brand small{color:#8a7047}
        .checkout-back{color:var(--checkout-green);transition:transform .2s ease,color .2s ease}
        .checkout-back:hover{transform:translateX(-3px);color:var(--checkout-deep)}
        .checkout-close{border-color:var(--checkout-line);background:rgba(255,255,255,.72);color:var(--checkout-deep);transition:transform .2s ease,box-shadow .2s ease}
        .checkout-close:hover{transform:rotate(8deg);box-shadow:0 8px 20px rgba(7,91,89,.12)}
        .checkout-progress{color:#87938c}
        .checkout-progress b{border-color:rgba(7,91,89,.16);background:rgba(255,255,255,.68);color:var(--checkout-green)}
        .checkout-progress .complete b{border-color:var(--checkout-green);background:var(--checkout-green)}
        .checkout-progress .current b{border-color:var(--checkout-gold);background:#fff8e9;color:var(--checkout-deep);box-shadow:0 0 0 5px rgba(184,148,85,.12)}
        .checkout-progress i{background:linear-gradient(90deg,rgba(7,91,89,.3),rgba(184,148,85,.35))}
        .checkout-form,.checkout-summary{
          border:1px solid rgba(255,255,255,.8);
          background:rgba(255,255,255,.62);
          box-shadow:0 24px 64px rgba(30,57,47,.1),inset 0 1px 0 rgba(255,255,255,.95),0 0 0 1px rgba(184,148,85,.08);
          backdrop-filter:blur(24px) saturate(1.22);
          transition:box-shadow .28s ease,border-color .28s ease,transform .28s ease;
        }
        .checkout-form:hover,.checkout-summary:hover{border-color:rgba(184,148,85,.32);box-shadow:0 30px 76px rgba(30,57,47,.13),inset 0 1px 0 #fff,0 0 0 1px rgba(184,148,85,.12)}
        .checkout-heading>p,.checkout-summary-heading p{color:var(--checkout-green);letter-spacing:.2em}
        .checkout-heading h1,.checkout-section-title h2,.checkout-summary-heading h2{color:var(--checkout-deep)}
        .checkout-heading>span,.checkout-section-title p{color:var(--checkout-muted)}
        .checkout-section{border-top-color:rgba(7,91,89,.11)}
        .checkout-section-title>span{border:1px solid rgba(184,148,85,.3);background:linear-gradient(145deg,#fffaf0,#eaf4ef);color:var(--checkout-green);box-shadow:0 6px 16px rgba(7,91,89,.08)}
        .checkout-field{color:#476158}
        .checkout-field input{
          border:1px solid rgba(7,91,89,.16);border-radius:12px;
          background:rgba(255,255,255,.76);color:var(--checkout-ink);
          box-shadow:inset 0 1px 2px rgba(24,51,45,.025);
          transition:border-color .2s ease,box-shadow .2s ease,background .2s ease,transform .2s ease;
        }
        .checkout-field input:hover{border-color:rgba(7,91,89,.32);background:rgba(255,255,255,.94)}
        .checkout-field input:focus{outline:0;border-color:var(--checkout-green);background:#fff;box-shadow:0 0 0 4px rgba(7,91,89,.1),0 8px 18px rgba(7,91,89,.07);transform:translateY(-1px)}
        .checkout-field input:focus:valid{border-color:#33846b}
        .checkout-field input:focus:invalid{border-color:#bd7756;box-shadow:0 0 0 4px rgba(189,119,86,.1)}
        .payment-option{
          position:relative;overflow:hidden;border-color:rgba(7,91,89,.14);
          background:rgba(255,255,255,.58);
          box-shadow:inset 0 1px 0 rgba(255,255,255,.85);
          transition:transform .22s ease,border-color .22s ease,background .22s ease,box-shadow .22s ease;
        }
        .payment-option:hover{transform:translateY(-2px);border-color:rgba(7,91,89,.34);box-shadow:0 12px 24px rgba(7,91,89,.08)}
        .payment-option.selected{border-color:var(--checkout-green);background:linear-gradient(110deg,rgba(231,243,236,.92),rgba(255,255,255,.78));box-shadow:0 10px 24px rgba(7,91,89,.1),inset 0 0 0 1px rgba(7,91,89,.08)}
        .payment-option.selected:after{position:absolute;right:0;top:0;width:4px;height:100%;background:linear-gradient(var(--checkout-gold),var(--checkout-green));content:""}
        .payment-copy strong{color:var(--checkout-ink)}.payment-copy small{color:var(--checkout-muted)}.payment-mark{color:var(--checkout-green)}
        .checkout-secure-note{color:var(--checkout-muted)}.checkout-secure-note span{color:var(--checkout-gold)}
        .checkout-submit{
          position:relative;overflow:hidden;border:1px solid rgba(255,255,255,.24);
          background:linear-gradient(115deg,#0c7468,var(--checkout-deep) 72%)!important;
          box-shadow:0 16px 30px rgba(7,91,89,.22),inset 0 1px 0 rgba(255,255,255,.24);
          transition:transform .22s ease,box-shadow .22s ease,filter .22s ease;
        }
        .checkout-submit:before{position:absolute;inset:0;background:linear-gradient(105deg,transparent 25%,rgba(255,255,255,.2) 48%,transparent 70%);transform:translateX(-120%);transition:transform .65s ease;content:""}
        .checkout-submit:hover{transform:translateY(-2px);filter:brightness(1.04);box-shadow:0 21px 38px rgba(7,91,89,.27),inset 0 1px 0 rgba(255,255,255,.28)}
        .checkout-submit:hover:before{transform:translateX(120%)}
        .checkout-submit:active{transform:translateY(0) scale(.99)}
        .checkout-summary{background:rgba(255,253,248,.68)}
        .checkout-summary-heading{border-bottom-color:rgba(7,91,89,.12)}
        .checkout-summary-heading>span{background:rgba(7,91,89,.08);color:var(--checkout-green)}
        .checkout-item{border-bottom-color:rgba(7,91,89,.09)}
        .checkout-item>div strong{color:var(--checkout-ink)}.checkout-item>div small{color:var(--checkout-muted)}
        .checkout-totals>div{color:var(--checkout-muted)}.checkout-totals>div b{color:var(--checkout-ink)}
        .checkout-totals .checkout-estimate{border-top-color:rgba(7,91,89,.13);color:var(--checkout-deep)}
        .checkout-totals .checkout-estimate b{color:var(--checkout-green)}
        .checkout-savings{border-color:rgba(7,91,89,.14);background:rgba(235,245,237,.74);color:#46685b}
        .checkout-savings strong{color:var(--checkout-green)}
        .invoice-download{border-color:rgba(184,148,85,.55);background:rgba(255,253,248,.72);color:var(--checkout-green);transition:transform .22s ease,box-shadow .22s ease,background .22s ease}
        .invoice-download:hover{transform:translateY(-2px);background:#fffaf0;box-shadow:0 13px 26px rgba(184,148,85,.18)}
        .invoice-download span{background:var(--checkout-green)}
        .checkout-help{border:1px solid rgba(184,148,85,.18);background:rgba(248,246,238,.72)}
        .checkout-help>span{color:var(--checkout-gold)}.checkout-help strong{color:var(--checkout-deep)}
        .checkout-integration-note,.invoice-note{color:#87918a}
        .checkout-notice{border-color:rgba(184,148,85,.35);background:rgba(255,248,232,.82);color:#66512c}
        /* Logo-led checkout identity: jewel tones from the supplied eagle mark. */
        .checkout-brand{gap:13px}
        .checkout-brand-mark{
          position:relative;
          display:grid;
          width:58px;
          height:54px;
          flex:0 0 auto;
          place-items:center;
          overflow:hidden;
          border:1px solid rgba(255,255,255,.82);
          border-radius:17px;
          background:linear-gradient(145deg,rgba(255,255,255,.95),rgba(237,246,244,.72));
          box-shadow:0 12px 26px rgba(7,48,72,.16),0 0 0 4px rgba(184,148,85,.1),inset 0 1px 0 #fff;
          transform:perspective(500px) rotateX(3deg);
          transition:transform .24s ease,box-shadow .24s ease;
        }
        .checkout-brand-mark:before{position:absolute;inset:4px;border:1px solid rgba(184,148,85,.28);border-radius:13px;content:""}
        .checkout-brand-mark svg{position:relative;z-index:1;width:53px;height:46px;filter:drop-shadow(0 3px 3px rgba(19,45,77,.16))}
        .checkout-brand:hover .checkout-brand-mark{transform:perspective(500px) rotateX(0) translateY(-2px);box-shadow:0 16px 32px rgba(7,48,72,.2),0 0 0 4px rgba(184,148,85,.14),inset 0 1px 0 #fff}
        .checkout-brand strong{font-family:Georgia,'Times New Roman',serif;font-size:15px;letter-spacing:.005em}
        .checkout-brand small{color:#78847f;font-size:8px;font-weight:850;letter-spacing:.12em}
        .checkout-form,.checkout-summary{transform:perspective(1400px) translateZ(0);}
        .checkout-form:hover,.checkout-summary:hover{transform:perspective(1400px) translateY(-2px) rotateX(.18deg)}
        .checkout-form{background:linear-gradient(145deg,rgba(255,255,255,.76),rgba(255,255,255,.57) 58%,rgba(237,246,242,.54))}
        .checkout-summary{background:linear-gradient(145deg,rgba(255,255,255,.79),rgba(255,253,248,.62) 62%,rgba(245,240,225,.52))}
        .checkout-section-title>span{color:var(--brand-blue);border-color:rgba(18,59,145,.15);background:linear-gradient(145deg,#fff,#f1f5ff)}
        .payment-option.selected{border-color:rgba(7,91,89,.48);background:linear-gradient(105deg,rgba(232,246,239,.94),rgba(255,255,255,.78) 64%,rgba(255,247,229,.76));box-shadow:0 12px 28px rgba(7,91,89,.12),inset 0 0 0 1px rgba(7,91,89,.07)}
        .payment-option.selected:after{width:4px;background:linear-gradient(var(--brand-red),var(--brand-orange),var(--brand-yellow),#43A65B,var(--brand-blue))}
        .payment-mark{min-width:38px;text-align:center;color:var(--brand-blue)}
        .checkout-progress .complete b{box-shadow:0 5px 12px rgba(7,91,89,.18)}
        .checkout-progress .current b{box-shadow:0 0 0 5px rgba(217,169,78,.14),0 6px 14px rgba(18,59,145,.1)}
        .checkout-summary-heading>span{border:1px solid rgba(7,91,89,.12)}
        .checkout-estimate b{ text-shadow:0 4px 14px rgba(7,91,89,.12)}
        .checkout-submit{background:linear-gradient(115deg,#0c7468 0%,#075b59 45%,#123b65 100%)!important}
        .invoice-download{border-color:rgba(184,148,85,.52);background:linear-gradient(135deg,rgba(255,255,255,.85),rgba(255,249,234,.76))}
        .invoice-download span{background:linear-gradient(145deg,#0b746b,#123b65)}
        .checkout-page button:focus-visible,.checkout-page input:focus-visible{outline:3px solid rgba(18,59,145,.3);outline-offset:3px}
        @media(max-width:680px){
          .checkout-brand{gap:9px}
          .checkout-brand-mark{width:46px;height:44px;border-radius:13px}
          .checkout-brand-mark svg{width:43px;height:38px}
          .checkout-brand-mark:before{inset:3px;border-radius:10px}
          .checkout-brand strong{font-size:12px}
          .checkout-brand small{font-size:7px;letter-spacing:.08em}
          .checkout-form:hover,.checkout-summary:hover{transform:none}
        }
        @media(max-width:820px){
          .checkout-page{padding-inline:20px}
          .checkout-layout{grid-template-columns:minmax(0,1.15fr) minmax(270px,.85fr);gap:16px}
          .checkout-form{padding:25px}
        }
        @media(max-width:680px){
          .checkout-page{padding-inline:12px;background-attachment:scroll}
          .checkout-header{background:rgba(248,250,246,.82)}
          .checkout-layout{grid-template-columns:1fr;gap:14px}
          .checkout-summary{grid-row:1;position:relative;top:auto}
          .checkout-form,.checkout-summary{backdrop-filter:blur(18px) saturate(1.15);border-radius:18px}
          .checkout-form{padding:22px 17px}
          .checkout-summary{padding:18px}
          .checkout-heading h1{font-size:clamp(32px,9vw,40px)}
          .checkout-field input{min-height:49px}
          .checkout-progress{margin:18px auto 20px}
          .checkout-progress i{min-width:10px}
        }
        @media(max-width:380px){
          .checkout-page{padding-inline:9px}
          .checkout-form,.checkout-summary{padding:15px}
          .checkout-progress{gap:4px}
          .checkout-progress span{font-size:7px}
        }
        @media(prefers-reduced-motion:reduce){
          .checkout-page *, .checkout-page *:before, .checkout-page *:after{animation:none!important;transition:none!important;scroll-behavior:auto!important}
        }
      `}</style>

      <style>{`
        /* Eagle-logo checkout palette: navy, blue, cyan, red, orange, yellow and green. */
        .checkout-page{
          --checkout-green:#24964b;--checkout-deep:#101f57;--checkout-gold:#f4cb24;
          --checkout-ink:#13204d;--checkout-muted:#40527c;--checkout-line:rgba(18,59,145,.18);
          --brand-red:#e5232e;--brand-orange:#f58220;--brand-yellow:#f4d532;--brand-blue:#123b91;
          background:
            radial-gradient(ellipse at 8% 12%,rgba(18,59,145,.22),transparent 34%),
            radial-gradient(ellipse at 94% 8%,rgba(229,35,46,.16),transparent 30%),
            radial-gradient(ellipse at 72% 94%,rgba(36,150,75,.14),transparent 36%),
            linear-gradient(135deg,#edf5ff 0%,#f7f9ff 48%,#eef5ff 100%)!important;
          color:var(--checkout-ink);
        }
        .checkout-header{border-color:rgba(18,59,145,.16);background:rgba(246,250,255,.76)}
        .checkout-brand strong,.checkout-heading h1,.checkout-section-title h2,.checkout-summary-heading h2{color:#101f57}
        .checkout-brand small,.checkout-back,.checkout-section-title p,.checkout-heading>span{color:#40527c}
        .checkout-brand>span{background:linear-gradient(140deg,#123b91,#101f57);box-shadow:0 10px 24px rgba(18,59,145,.22),0 0 0 4px rgba(244,213,50,.16)}
        .checkout-progress .complete b{border-color:#24964b;background:#24964b}
        .checkout-progress .current b{border-color:#f58220;background:#fff4e9;color:#123b91}
        .checkout-form,.checkout-summary{
          border:1px solid rgba(255,255,255,.84);
          background:linear-gradient(145deg,rgba(255,255,255,.78),rgba(232,242,255,.58));
          box-shadow:0 26px 68px rgba(16,31,87,.13),inset 0 1px 0 rgba(255,255,255,.96),0 0 0 1px rgba(18,59,145,.08);
          backdrop-filter:blur(24px) saturate(1.24);
        }
        .checkout-section{border-top-color:rgba(18,59,145,.13)}
        .checkout-section-title>span{border:1px solid rgba(18,59,145,.16);background:linear-gradient(135deg,#edf5ff,#fff);color:#123b91}
        .checkout-field{color:#263e77}
        .checkout-field input{border-color:rgba(18,59,145,.2);background:rgba(255,255,255,.76);color:#101f57}
        .checkout-field input:hover{border-color:rgba(18,59,145,.42);background:#fff}
        .checkout-field input:focus{border-color:#123b91;box-shadow:0 0 0 4px rgba(18,59,145,.12),0 8px 18px rgba(18,59,145,.08)}
        .checkout-field input:focus:invalid{border-color:#e5232e;box-shadow:0 0 0 4px rgba(229,35,46,.1)}
        .payment-option{border-color:rgba(18,59,145,.16);background:rgba(255,255,255,.65)}
        .payment-option:hover{border-color:#24964b;box-shadow:0 12px 24px rgba(36,150,75,.1)}
        .payment-option.selected{border-color:#123b91;background:linear-gradient(110deg,rgba(228,239,255,.92),rgba(255,255,255,.82));box-shadow:0 12px 28px rgba(18,59,145,.12),inset 0 0 0 1px rgba(18,59,145,.08)}
        .payment-option.selected:after{width:5px;background:linear-gradient(#e5232e 0 20%,#f58220 20% 40%,#f4d532 40% 60%,#24964b 60% 80%,#123b91 80%)}
        .payment-copy strong{color:#101f57}.payment-copy small{color:#40527c}.payment-mark{color:#123b91}
        .checkout-submit{background:linear-gradient(110deg,#123b91,#075baf 48%,#24964b)!important;box-shadow:0 16px 30px rgba(18,59,145,.22)}
        .checkout-submit:hover{background:linear-gradient(110deg,#101f57,#123b91 52%,#16783a)!important}
        .checkout-summary-heading>span{border:1px solid rgba(18,59,145,.14);background:rgba(18,59,145,.08);color:#123b91}
        .checkout-totals .checkout-estimate b,.checkout-savings strong{color:#24964b}
        .checkout-savings{border-color:rgba(36,150,75,.2);background:rgba(232,248,237,.78);color:#23663b}
        .invoice-download{border-color:rgba(244,203,36,.62);background:rgba(255,255,255,.78);color:#123b91}
        .invoice-download span{background:linear-gradient(135deg,#e5232e,#f58220 30%,#f4d532 52%,#24964b 72%,#123b91)}
        .checkout-help{border-color:rgba(244,203,36,.28);background:rgba(255,250,224,.66)}
        .checkout-help>span,.checkout-help strong{color:#123b91}
        .checkout-page button:focus-visible,.checkout-page input:focus-visible{outline-color:rgba(18,59,145,.4)}
        @media(max-width:680px){.checkout-header{background:rgba(246,250,255,.88)}.checkout-form,.checkout-summary{background:rgba(255,255,255,.78)}}
      `}</style>

      <style>{`
        /* Logo-led checkout finish: true brand artwork, glass surfaces, and a restrained 3D spectrum. */
        .checkout-brand-mark{width:126px;height:66px;flex:0 0 auto;border-radius:14px;transform:none;background:rgba(255,255,255,.72);box-shadow:0 12px 28px rgba(16,31,87,.13),0 0 0 1px rgba(18,59,145,.08),inset 0 1px 0 #fff}
        .checkout-brand-mark img{position:relative;z-index:1;display:block;width:100%;height:100%;padding:5px;object-fit:contain;border-radius:inherit}
        .checkout-brand-mark:before{inset:4px;border-radius:11px}
        .checkout-brand strong{color:#101f57;font-size:15px;letter-spacing:.01em}
        .checkout-brand small{color:#40527c}
        .checkout-form,.checkout-summary{border:1px solid rgba(255,255,255,.78);background:linear-gradient(145deg,rgba(255,255,255,.74),rgba(232,242,255,.48) 48%,rgba(255,255,255,.56));box-shadow:0 28px 72px rgba(16,31,87,.14),0 8px 22px rgba(18,59,145,.07),inset 0 1px 0 rgba(255,255,255,.96),inset 0 -1px 0 rgba(36,150,75,.08);backdrop-filter:blur(26px) saturate(1.3)}
        .checkout-form{position:relative;overflow:hidden}
        .checkout-form:before{position:absolute;inset:0 0 auto;height:4px;background:linear-gradient(90deg,#e5232e 0 20%,#f58220 20% 40%,#f4d532 40% 60%,#24964b 60% 80%,#123b91 80%);content:""}
        .checkout-heading h1,.checkout-section-title h2,.checkout-summary-heading h2{color:#101f57}
        .checkout-heading>p,.checkout-summary-heading p{color:#123b91}
        .checkout-section{border-color:rgba(18,59,145,.14)}
        .checkout-section-title>span{border-color:rgba(18,59,145,.2);background:linear-gradient(145deg,#fff,#edf5ff);color:#123b91;box-shadow:0 8px 18px rgba(18,59,145,.1)}
        .checkout-field{color:#263e77}
        .checkout-field input{border-color:rgba(18,59,145,.2);background:rgba(255,255,255,.74);box-shadow:inset 0 1px 2px rgba(16,31,87,.04);transition:border-color .2s ease,box-shadow .2s ease,transform .2s ease}
        .checkout-field input:focus{border-color:#123b91;box-shadow:0 0 0 4px rgba(18,59,145,.11),0 8px 20px rgba(18,59,145,.1);transform:translateY(-1px)}
        .payment-option{border-color:rgba(18,59,145,.16);background:rgba(255,255,255,.56);backdrop-filter:blur(12px)}
        .payment-option.selected{border-color:#123b91;background:linear-gradient(110deg,rgba(228,239,255,.92),rgba(255,255,255,.74) 56%,rgba(232,248,237,.62));box-shadow:0 14px 28px rgba(18,59,145,.12),inset 0 0 0 1px rgba(18,59,145,.06)}
        .payment-option.selected:after{width:5px;background:linear-gradient(#e5232e 0 20%,#f58220 20% 40%,#f4d532 40% 60%,#24964b 60% 80%,#123b91 80%)}
        .payment-copy strong{color:#101f57}.payment-copy small{color:#40527c}.payment-mark{color:#123b91}
        .checkout-submit{background:linear-gradient(110deg,#123b91,#075baf 46%,#24964b)!important;box-shadow:0 16px 32px rgba(18,59,145,.2),0 6px 14px rgba(36,150,75,.1)}
        .checkout-submit:hover{background:linear-gradient(110deg,#101f57,#123b91 52%,#16783a)!important;box-shadow:0 22px 40px rgba(18,59,145,.24)}
        .checkout-progress .complete b{border-color:#24964b;background:#24964b}.checkout-progress .current b{border-color:#f58220;background:#fff4e9;color:#123b91}
        .checkout-summary-heading>span{border:1px solid rgba(18,59,145,.14);background:rgba(18,59,145,.08);color:#123b91}
        .checkout-totals .checkout-estimate b,.checkout-savings strong{color:#24964b}
        .checkout-savings{border-color:rgba(36,150,75,.2);background:rgba(232,248,237,.72);color:#23663b}
        .invoice-download{border-color:rgba(244,203,36,.58);background:rgba(255,255,255,.7);color:#123b91}
        .invoice-download span{background:linear-gradient(135deg,#e5232e,#f58220 30%,#f4d532 52%,#24964b 72%,#123b91)}
        .checkout-page button:focus-visible,.checkout-page input:focus-visible{outline-color:rgba(18,59,145,.42)}
        @media(max-width:680px){.checkout-brand-mark{width:96px;height:50px;border-radius:12px}.checkout-brand-mark img{padding:4px}.checkout-brand strong{font-size:12px}.checkout-brand small{font-size:7px}.checkout-form,.checkout-summary{background:rgba(255,255,255,.77);backdrop-filter:blur(18px) saturate(1.2)}}
        @media(max-width:420px){.checkout-brand-mark{width:78px;height:44px}.checkout-brand{gap:7px}}
        @media(prefers-reduced-motion:reduce){.checkout-field input,.checkout-page .payment-option,.checkout-form,.checkout-summary{transition:none!important}}
      `}</style>

      <style>{`
        /* A quieter logo-led checkout: readable glass, restrained colour, and tactile depth. */
        .shop-page .checkout-page{
          --checkout-deep:#101f57;--checkout-ink:#17274c;--checkout-muted:#52627e;
          background:radial-gradient(ellipse at 0 0,rgba(18,59,145,.13),transparent 46%),radial-gradient(ellipse at 100% 20%,rgba(36,150,75,.08),transparent 40%),radial-gradient(ellipse at 80% 100%,rgba(244,213,50,.11),transparent 42%),#f4f7fc!important;
          font-family:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;
        }
        .shop-page .checkout-header{
          grid-template-columns:1fr auto 1fr;min-height:110px;padding:18px 0;
          background:rgba(244,247,252,.88);border-color:rgba(18,59,145,.12);
          box-shadow:none;backdrop-filter:blur(24px);
        }
        .shop-page .checkout-brand{gap:18px}
        .shop-page .checkout-brand>.checkout-brand-mark{
          display:flex;align-items:center;justify-content:center;width:172px;height:78px;
          padding:0;border:1px solid rgba(18,59,145,.08);border-radius:14px;
          background:#fff;box-shadow:0 10px 26px rgba(16,31,87,.08);transform:none;
        }
        .shop-page .checkout-brand-mark:before{display:none}
        .shop-page .checkout-brand-mark img{width:100%;height:100%;padding:8px;object-fit:contain;filter:none}
        .shop-page .checkout-brand:hover .checkout-brand-mark{transform:none;box-shadow:0 10px 26px rgba(16,31,87,.08)}
        .shop-page .checkout-brand strong{font-family:Georgia,'Times New Roman',serif;font-size:19px;font-weight:600;letter-spacing:-.025em}
        .shop-page .checkout-brand small{margin-top:5px;color:#52627e;font-size:9px;letter-spacing:.12em}
        .shop-page .checkout-progress{margin:28px auto 34px;font-size:11px;letter-spacing:.025em}
        .shop-page .checkout-progress .current{color:#123b91}
        .shop-page .checkout-layout{gap:30px;grid-template-columns:minmax(0,1.4fr) minmax(320px,.85fr)}
        .shop-page .checkout-form,.shop-page .checkout-summary{
          border:1px solid rgba(255,255,255,.95);border-radius:26px;
          background:linear-gradient(135deg,rgba(255,255,255,.86),rgba(255,255,255,.65));
          box-shadow:0 24px 64px -28px rgba(16,31,87,.25),0 5px 16px rgba(16,31,87,.035),inset 0 1px 0 #fff,0 0 0 1px rgba(18,59,145,.06);
          backdrop-filter:blur(28px) saturate(1.15);transform:none;
        }
        .shop-page .checkout-form:hover,.shop-page .checkout-summary:hover{transform:none;border-color:#fff}
        .shop-page .checkout-form{padding:42px}
        .shop-page .checkout-form:before{height:3px;opacity:.9}
        .shop-page .checkout-summary{top:130px;padding:28px}
        .shop-page .checkout-heading h1{font-family:Georgia,'Times New Roman',serif;font-size:clamp(34px,3.8vw,48px);font-weight:500;line-height:1.1;letter-spacing:-.045em}
        .shop-page .checkout-heading>p,.shop-page .checkout-summary-heading p{font-size:10px;letter-spacing:.18em;color:#123b91}
        .shop-page .checkout-heading>span{font-size:14px;line-height:1.7;color:#52627e}
        .shop-page .checkout-section-title h2{font-size:23px}
        .shop-page .checkout-section-title p{font-size:12px;color:#52627e}
        .shop-page .checkout-fields{gap:18px 16px}
        .shop-page .checkout-field{font-size:12px;letter-spacing:0;font-weight:650;color:#263e77}
        .shop-page .checkout-field input{
          min-height:52px;border:1px solid rgba(18,59,145,.19);border-radius:12px;
          background:rgba(255,255,255,.85);font-size:15px;color:#101f57;
          box-shadow:inset 0 2px 4px rgba(16,31,87,.025);transform:none;
        }
        .shop-page .checkout-field input::placeholder{color:#6e7b91;opacity:1}
        .shop-page .checkout-field input:focus{transform:none;background:#fff;border-color:#123b91;box-shadow:0 0 0 4px rgba(18,59,145,.1)}
        .shop-page .payment-option{min-height:82px;padding:16px;border-radius:15px;background:rgba(255,255,255,.7)}
        .shop-page .payment-option.selected{border-color:#123b91;background:linear-gradient(110deg,#edf3ff,rgba(255,255,255,.93));box-shadow:0 10px 26px -12px rgba(18,59,145,.25)}
        .shop-page .payment-option:focus-within{outline:3px solid rgba(18,59,145,.3);outline-offset:3px}
        .shop-page .payment-option input:checked+.payment-radio{border-color:#123b91}
        .shop-page .payment-option input:checked+.payment-radio:after{background:#123b91}
        .shop-page .payment-copy strong{font-size:14px}
        .shop-page .payment-copy small{font-size:12px;line-height:1.5}
        .shop-page .checkout-submit{
          min-height:56px;border-radius:13px!important;color:#fff!important;
          background:linear-gradient(135deg,#164aa8,#101f57)!important;
          font-size:14px!important;letter-spacing:.025em!important;font-weight:750!important;
          box-shadow:0 14px 26px -9px rgba(18,59,145,.38),inset 0 1px 0 rgba(255,255,255,.25);
        }
        .shop-page .checkout-submit:hover{background:linear-gradient(135deg,#2056b5,#14276a)!important}
        .shop-page .checkout-item>div strong{font-size:13px;line-height:1.5}
        .shop-page .checkout-item>div small,.shop-page .checkout-item>b{font-size:11px}
        .shop-page .checkout-totals>div,.shop-page .checkout-totals>div b{font-size:13px}
        .shop-page .checkout-totals .checkout-estimate b{font-size:30px;color:#101f57;font-weight:600;text-shadow:none}
        .shop-page .checkout-savings{margin-bottom:16px;border-color:rgba(36,150,75,.2);color:#23663b}
        .shop-page .invoice-download{min-height:48px;border-radius:12px;background:rgba(255,255,255,.85);border-color:rgba(18,59,145,.23);font-size:11px;color:#123b91}
        .shop-page .invoice-download span{background:#123b91}
        .shop-page .checkout-secure-note,.shop-page .checkout-integration-note,.shop-page .invoice-note,.shop-page .checkout-help p,.shop-page .checkout-totals>p{font-size:11px;line-height:1.65;color:#52627e}
        .shop-page .checkout-help{background:rgba(255,255,255,.6);border-color:rgba(18,59,145,.1)}
        @media(max-width:960px){
          .shop-page .checkout-layout{gap:20px;grid-template-columns:minmax(0,1fr) 310px}
          .shop-page .checkout-form{padding:28px}
          .shop-page .checkout-brand strong{font-size:16px}
          .shop-page .checkout-brand>.checkout-brand-mark{width:135px;height:68px}
        }
        @media(max-width:760px){
          .shop-page .checkout-header{grid-template-columns:1fr auto;gap:12px;min-height:0;padding:12px 0}
          .shop-page .checkout-brand{grid-column:1/-1;grid-row:1;justify-self:center;gap:12px}
          .shop-page .checkout-back{grid-column:1;grid-row:2}
          .shop-page .checkout-close{grid-column:2;grid-row:2}
          .shop-page .checkout-layout{grid-template-columns:minmax(0,1fr)}
          .shop-page .checkout-summary{position:static;grid-row:auto;padding:22px}
          .shop-page .checkout-form{padding:28px 22px}
          .shop-page .checkout-field input{font-size:16px}
          .shop-page .checkout-progress{gap:6px;font-size:9px;margin:20px auto 24px}
          .shop-page .checkout-brand small{font-size:8px;letter-spacing:.06em}
        }
        @media(max-width:420px){
          .shop-page .checkout-brand{gap:9px}
          .shop-page .checkout-brand>.checkout-brand-mark{width:110px;height:60px}
          .shop-page .checkout-brand strong{font-size:14px}
          .shop-page .checkout-brand small{max-width:165px;line-height:1.5}
          .shop-page .checkout-fields{grid-template-columns:minmax(0,1fr)}
          .shop-page .checkout-form,.shop-page .checkout-summary{padding:22px 17px;border-radius:20px}
          .shop-page .checkout-progress span{font-size:8px}
        }
        @media(prefers-reduced-transparency:reduce){
          .shop-page .checkout-form,.shop-page .checkout-summary,.shop-page .checkout-header{background:#fff;backdrop-filter:none}
        }
      `}</style>

      {checkoutOpen && (
        <section className="checkout-page" aria-label="Secure checkout">
          <header className="checkout-header">
            <button type="button" className="checkout-back" onClick={() => { setCheckoutOpen(false); setCartOpen(true); }}>← Back to bag</button>
            <div className="checkout-brand">
              <span className="checkout-brand-mark">
                <img src="/images/eagle%20logo%20.jpg" alt="Vijayam Publications eagle and globe logo" />
              </span>
              <div><strong>Vijayam Publications</strong><small>Secure checkout · Learn with confidence</small></div>
            </div>
            <button type="button" className="checkout-close" onClick={() => { setCheckoutOpen(false); setCheckoutMessage(""); }} aria-label="Close checkout">×</button>
          </header>

          <div className="checkout-progress" aria-label="Checkout steps">
            <span className="complete"><b>1</b> Your bag</span><i />
            <span className="current"><b>2</b> Delivery &amp; payment</span><i />
            <span><b>3</b> Confirmation</span>
          </div>

          <div className="checkout-layout">
            <form className="checkout-form" onSubmit={handleCheckoutSubmit}>
              <div className="checkout-heading">
                <p>Almost there</p>
                <h1>Delivery &amp; payment</h1>
                <span>Enter your delivery details and choose how you’d like to pay.</span>
              </div>

              <section className="checkout-section" aria-labelledby="delivery-heading">
                <div className="checkout-section-title"><span>01</span><div><h2 id="delivery-heading">Delivery details</h2><p>Where should we send your books?</p></div></div>
                <div className="checkout-fields">
                  <label className="checkout-field">Full name<input name="fullName" autoComplete="name" placeholder="Your name" required /></label>
                  <label className="checkout-field">Mobile number<input name="phone" type="tel" inputMode="numeric" autoComplete="tel" placeholder="10-digit mobile number" pattern="[0-9]{10}" title="Enter a 10-digit mobile number" required /></label>
                  <label className="checkout-field wide">Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
                  <label className="checkout-field wide">Street address<input name="address" autoComplete="street-address" placeholder="House number, street and area" required /></label>
                  <label className="checkout-field">City<input name="city" autoComplete="address-level2" placeholder="City" required /></label>
                  <label className="checkout-field">PIN code<input name="postalCode" inputMode="numeric" autoComplete="postal-code" placeholder="6-digit PIN code" pattern="[0-9]{6}" title="Enter a 6-digit PIN code" required /></label>
                </div>
              </section>

              <section className="checkout-section" aria-labelledby="payment-heading">
                <div className="checkout-section-title"><span>02</span><div><h2 id="payment-heading">Payment method</h2><p>Choose a preferred payment option.</p></div></div>
                <div className="payment-options">
                  {([ ["upi", "UPI", "Google Pay, PhonePe, Paytm"], ["card", "Credit / Debit Card", "Visa, Mastercard and more"], ["cod", "Cash on Delivery", "Pay when your order arrives"] ] as const).map(([value, title, detail]) => (
                    <label key={value} className={`payment-option ${paymentMethod === value ? "selected" : ""}`}>
                      <input type="radio" name="paymentMethod" value={value} checked={paymentMethod === value} onChange={() => setPaymentMethod(value)} />
                      <span className="payment-radio" aria-hidden="true" />
                      <span className="payment-copy"><strong>{title}</strong><small>{detail}</small></span>
                      <span className="payment-mark" aria-hidden="true">{value === "upi" ? "UPI" : value === "card" ? "••••" : "₹"}</span>
                    </label>
                  ))}
                </div>
              </section>
              {checkoutMessage && <p className="checkout-notice" role="status">{checkoutMessage}</p>}
              <p className="checkout-secure-note"><span aria-hidden="true">♧</span> Your contact and delivery details are used only to prepare your order.</p>
              <button type="submit" className="checkout-submit">Create order preview <span aria-hidden="true">→</span></button>
              <p className="checkout-integration-note">Demo mode: no payment is charged and no shipment is created.</p>
            </form>

            <aside className="checkout-summary" aria-labelledby="checkout-summary-title">
              <div className="checkout-summary-heading"><div><p>Your selection</p><h2 id="checkout-summary-title">Order summary</h2></div><span>{itemCount} item{itemCount === 1 ? "" : "s"}</span></div>
              <div className="checkout-items">
                {cartLines.map(({ book, quantity }) => (
                  <div className="checkout-item" key={book.id}>
                    <BookCover book={book} small />
                    <div><strong>{book.title}</strong><small>{book.course} · Qty {quantity}</small></div>
                    <b>₹{book.price * quantity}</b>
                  </div>
                ))}
              </div>
              <div className="checkout-totals">
                <div><span>Items subtotal</span><b>₹{subtotal}</b></div>
                <div><span>Delivery</span><b className="checkout-pending">Calculated next</b></div>
                <div className="checkout-estimate"><span>Estimated total</span><b>₹{subtotal}</b></div>
                <p>Delivery charges or applicable taxes may be added after address verification.</p>
              </div>
              <div className="checkout-savings"><span>Discounts saved</span><strong>₹{savings}</strong></div>
              <button type="button" className="invoice-download" onClick={downloadInvoice}><span aria-hidden="true">↓</span> Download invoice PDF</button>
              <p className="invoice-note">A pro forma invoice for your current selection. Payment is still pending.</p>
              <div className="checkout-help"><span aria-hidden="true">✦</span><p><strong>Need help choosing?</strong><br />Our academic books are arranged by course and semester for easy selection.</p></div>
            </aside>
          </div>
        </section>
      )}

      {cartOpen && <>
        <div className="overlay" onClick={() => setCartOpen(false)} />
        <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
          <div className="drawer-head"><div><h2 id="cart-title">Cart</h2><p>{itemCount} book{itemCount === 1 ? "" : "s"} selected</p></div><button type="button" className="close" onClick={() => setCartOpen(false)} aria-label="Close cart">×</button></div>
          <div className="drawer-body">
            {cartLines.length ? <>
              <div className="cart-table-head"><span>Product</span><span>Price</span><span>Quantity</span><span>Subtotal</span><span aria-hidden="true" /></div>
              {cartLines.map(({ book, quantity }) => <div className="cart-line" key={book.id}>
                <BookCover book={book} small />
                <div className="cart-product"><h3>{book.title}</h3><p>{book.course} · {semesterShort(book.semester)} · {book.edition}</p><button type="button" className="cart-remove-mobile" onClick={() => updateCart(book.id, -quantity)}>Remove</button></div>
                <span className="cart-unit-price">₹{book.price}</span>
                <div className="line-controls"><button type="button" onClick={() => updateCart(book.id, -1)} aria-label={`Remove one ${book.title}`}>−</button><b>{quantity}</b><button type="button" onClick={() => updateCart(book.id, 1)} aria-label={`Add one ${book.title}`}>+</button></div>
                <strong className="cart-line-subtotal">₹{book.price * quantity}</strong>
                <button type="button" className="remove cart-remove-desktop" onClick={() => updateCart(book.id, -quantity)} aria-label={`Remove ${book.title}`}>×</button>
              </div>)}
              <button type="button" className="cart-clear" onClick={() => setCart({})}>Clear cart</button>
            </> : <div className="empty"><h2>Your cart is empty</h2><p>Browse the collection and add a book to your bag.</p><button type="button" className="cart-continue" onClick={() => setCartOpen(false)}>Continue shopping</button></div>}
          </div>
          {cartLines.length > 0 && <div className="drawer-foot">
            <div className="cart-summary-note"><span>Order summary</span><p>Review your items before continuing.</p></div>
            <div className="total"><span>Subtotal</span><b>₹{subtotal}</b></div>
            <div className="total savings-total"><span>You save</span><b>₹{savings}</b></div>
            <button type="button" className="checkout-button" onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}>Proceed to checkout <span aria-hidden="true">→</span></button>
          </div>}
        </aside>
      </>}
    </main>
  );
}

export function NursingShopPage(): JSX.Element {
  return <ShopCategoryPage category="Nursing" />;
}

export function DegreeShopPage(): JSX.Element {
  return <ShopCategoryPage category="Degree" />;
}

export function VocationalShopPage(): JSX.Element {
  return <ShopCategoryPage category="Vocational" />;
}

export function BridgeCoursesShopPage(): JSX.Element {
  return <ShopCategoryPage category="Bridge Courses" />;
}

export default function VijayamAcademicUniverse(): JSX.Element {
  return <ShopCategoryPage />;
}
