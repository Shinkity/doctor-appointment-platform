// Sample data. Replace with API calls once the backend is ready.
// Photos: put real photos in public/images/doctors and set the photo field, e.g. "/images/doctors/adaeze.jpg".
export const specialties = ["Cardiology", "Pediatrics", "Dermatology", "General Practice", "Gynecology", "Orthopedics"];

export const doctors = [
  { id: 1, name: "Dr. Adaeze Okonkwo", specialty: "Cardiology", hospital: "Lagoon Heart Clinic, Lekki", experience: 12, rating: 4.9, fee: 25000, photo: "", bio: "Adaeze treats high blood pressure, heart rhythm problems and runs a weekly prevention clinic for adults over 40." },
  { id: 2, name: "Dr. Tunde Bakare", specialty: "Pediatrics", hospital: "Little Steps Hospital, Ikeja", experience: 9, rating: 4.8, fee: 15000, photo: "", bio: "Tunde looks after children from birth to 16, with a focus on routine immunisation and childhood infections." },
  { id: 3, name: "Dr. Ngozi Eze", specialty: "Dermatology", hospital: "ClearSkin Centre, Victoria Island", experience: 8, rating: 4.7, fee: 20000, photo: "", bio: "Ngozi helps patients with acne, eczema and skin conditions common in darker skin tones." },
  { id: 4, name: "Dr. Ibrahim Musa", specialty: "General Practice", hospital: "Garki Family Hospital, Abuja", experience: 15, rating: 4.9, fee: 10000, photo: "", bio: "Ibrahim is a family doctor who handles check-ups, malaria, typhoid and long term care for diabetes." },
  { id: 5, name: "Dr. Funmilayo Adeyemi", specialty: "Gynecology", hospital: "Mother and Child Clinic, Ibadan", experience: 11, rating: 4.8, fee: 18000, photo: "", bio: "Funmilayo provides antenatal care, family planning advice and women's health screening." },
  { id: 6, name: "Dr. Chidi Nwosu", specialty: "Orthopedics", hospital: "Enugu Bone and Joint Centre", experience: 14, rating: 4.6, fee: 22000, photo: "", bio: "Chidi treats sports injuries, fractures and joint pain, and guides patients through recovery." },
];

export const reviews = [
  { id: 1, doctorId: 1, patient: "Emeka Obi", rating: 5, text: "She explained everything clearly and did not rush me." },
  { id: 2, doctorId: 1, patient: "Bisi Alabi", rating: 5, text: "Booked online and was seen on time. Very helpful." },
  { id: 3, doctorId: 2, patient: "Hauwa Bello", rating: 5, text: "My son was calm throughout the visit. Thank you, doctor." },
  { id: 4, doctorId: 4, patient: "Segun Ojo", rating: 4, text: "Good consultation, but the waiting area was busy." },
];

export const times = ["09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM", "03:30 PM", "05:00 PM"];

export const myAppointments = [
  { id: 1, doctor: "Dr. Adaeze Okonkwo", date: "2026-10-14", time: "10:30 AM", status: "Upcoming" },
  { id: 2, doctor: "Dr. Ibrahim Musa", date: "2026-09-02", time: "09:00 AM", status: "Completed" },
  { id: 3, doctor: "Dr. Ngozi Eze", date: "2026-08-11", time: "02:00 PM", status: "Completed" },
];

export const myDocuments = [
  { id: 1, name: "Blood test result - Aug 2026.pdf", date: "2026-08-12" },
  { id: 2, name: "Chest X-ray report.pdf", date: "2026-06-03" },
];

export const pendingDoctors = [
  { id: 11, name: "Dr. Olumide Fashola", specialty: "Dentistry", license: "MDCN-48213" },
  { id: 12, name: "Dr. Amina Yusuf", specialty: "Ophthalmology", license: "MDCN-51907" },
];
