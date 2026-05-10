import { Injectable } from '@nestjs/common';

// ── Intercity Routes — 8 Divisions, 64 Districts ───────────────────────────
export const INTERCITY_ROUTES = [
  // ══ DHAKA → RAJSHAHI DIVISION ══════════════════════════════════════════
  {
    id: 'IC-01', category: 'intercity', type: 'ac',
    operator: 'Grameen Travels', color: '#16a34a',
    from: 'Dhaka', to: 'Rajshahi', division: 'Rajshahi',
    distance: 263, durationMin: 330,
    fare: { single: 600, ac: 900 }, hours: '7:00 AM – 11:00 PM',
    via: ['Natore', 'Rajshahi'],
    stops: ['Dhaka (Gabtoli)', 'Aricha Ghat', 'Natore', 'Rajshahi'],
  },
  {
    id: 'IC-02', category: 'intercity', type: 'ac',
    operator: 'Desh Travels', color: '#2563eb',
    from: 'Dhaka', to: 'Rajshahi', division: 'Rajshahi',
    distance: 263, durationMin: 320,
    fare: { single: 580, ac: 870 }, hours: '6:00 AM – 11:00 PM',
    via: ['Sirajganj', 'Natore'],
    stops: ['Dhaka (Gabtoli)', 'Sirajganj', 'Natore', 'Rajshahi'],
  },
  {
    id: 'IC-03', category: 'intercity', type: 'non-ac',
    operator: 'Akota Transport', color: '#d97706',
    from: 'Dhaka', to: 'Rajshahi', division: 'Rajshahi',
    distance: 263, durationMin: 360,
    fare: { single: 420, ac: null }, hours: '6:00 AM – 10:00 PM',
    via: ['Pabna', 'Natore'],
    stops: ['Dhaka (Gabtoli)', 'Manikganj', 'Pabna', 'Natore', 'Rajshahi'],
  },
  {
    id: 'IC-04', category: 'intercity', type: 'ac',
    operator: 'National Travels', color: '#7c3aed',
    from: 'Dhaka', to: 'Rajshahi', division: 'Rajshahi',
    distance: 263, durationMin: 330,
    fare: { single: 550, ac: 850 }, hours: '7:00 AM – 10:30 PM',
    via: ['Sirajganj', 'Natore'],
    stops: ['Dhaka (Gabtoli)', 'Sirajganj', 'Natore', 'Rajshahi'],
  },
  // ══ DHAKA → CHITTAGONG DIVISION ════════════════════════════════════════
  {
    id: 'IC-05', category: 'intercity', type: 'ac',
    operator: 'Green Line Paribahan', color: '#059669',
    from: 'Dhaka', to: 'Chattogram', division: 'Chattogram',
    distance: 250, durationMin: 300,
    fare: { single: 700, ac: 1100 }, hours: '6:00 AM – 12:00 AM',
    via: ['Comilla', 'Feni'],
    stops: ['Dhaka (Sayedabad)', 'Comilla', 'Feni', 'Chattogram'],
  },
  {
    id: 'IC-06', category: 'intercity', type: 'ac',
    operator: 'Shohag Paribahan', color: '#0891b2',
    from: 'Dhaka', to: 'Chattogram', division: 'Chattogram',
    distance: 250, durationMin: 295,
    fare: { single: 680, ac: 1050 }, hours: '6:00 AM – 11:30 PM',
    via: ['Comilla', 'Feni'],
    stops: ['Dhaka (Sayedabad)', 'Comilla', 'Feni', 'Chattogram'],
  },
  {
    id: 'IC-07', category: 'intercity', type: 'ac',
    operator: 'Ena Transport', color: '#dc2626',
    from: 'Dhaka', to: 'Chattogram', division: 'Chattogram',
    distance: 250, durationMin: 300,
    fare: { single: 720, ac: 1080 }, hours: '7:00 AM – 11:00 PM',
    via: ['Comilla', 'Feni'],
    stops: ['Dhaka (Sayedabad)', 'Comilla', 'Feni', 'Chattogram'],
  },
  {
    id: 'IC-08', category: 'intercity', type: 'ac',
    operator: 'Soudia-S. Alam Paribahan', color: '#1d4ed8',
    from: 'Dhaka', to: 'Cox\'s Bazar', division: 'Chattogram',
    distance: 392, durationMin: 480,
    fare: { single: 1000, ac: 1500 }, hours: '7:00 AM – 9:00 PM',
    via: ['Comilla', 'Chattogram', 'Chakaria'],
    stops: ['Dhaka (Sayedabad)', 'Comilla', 'Chattogram', 'Chakaria', "Cox's Bazar"],
  },
  // ══ DHAKA → SYLHET DIVISION ════════════════════════════════════════════
  {
    id: 'IC-09', category: 'intercity', type: 'ac',
    operator: 'Shyamoli Paribahan', color: '#15803d',
    from: 'Dhaka', to: 'Sylhet', division: 'Sylhet',
    distance: 240, durationMin: 330,
    fare: { single: 600, ac: 950 }, hours: '6:30 AM – 11:30 PM',
    via: ['Narsingdi', 'Habiganj'],
    stops: ['Dhaka (Sayedabad)', 'Narsingdi', 'Habiganj', 'Sylhet'],
  },
  {
    id: 'IC-10', category: 'intercity', type: 'ac',
    operator: 'Ena Transport', color: '#dc2626',
    from: 'Dhaka', to: 'Sylhet', division: 'Sylhet',
    distance: 240, durationMin: 320,
    fare: { single: 620, ac: 970 }, hours: '7:00 AM – 11:00 PM',
    via: ['Narsingdi', 'Habiganj'],
    stops: ['Dhaka (Sayedabad)', 'Narsingdi', 'Habiganj', 'Sylhet'],
  },
  {
    id: 'IC-11', category: 'intercity', type: 'non-ac',
    operator: 'Hanif Enterprise', color: '#b45309',
    from: 'Dhaka', to: 'Moulvibazar', division: 'Sylhet',
    distance: 220, durationMin: 310,
    fare: { single: 500, ac: null }, hours: '7:00 AM – 9:00 PM',
    via: ['Narsingdi', 'Habiganj'],
    stops: ['Dhaka (Sayedabad)', 'Narsingdi', 'Habiganj', 'Moulvibazar'],
  },
  // ══ DHAKA → KHULNA DIVISION ════════════════════════════════════════════
  {
    id: 'IC-12', category: 'intercity', type: 'ac',
    operator: 'Green Line Paribahan', color: '#059669',
    from: 'Dhaka', to: 'Khulna', division: 'Khulna',
    distance: 330, durationMin: 420,
    fare: { single: 800, ac: 1200 }, hours: '7:00 AM – 10:00 PM',
    via: ['Faridpur', 'Jessore'],
    stops: ['Dhaka (Gabtoli)', 'Faridpur', 'Jessore', 'Khulna'],
  },
  {
    id: 'IC-13', category: 'intercity', type: 'ac',
    operator: 'Shohag Paribahan', color: '#0891b2',
    from: 'Dhaka', to: 'Khulna', division: 'Khulna',
    distance: 330, durationMin: 415,
    fare: { single: 780, ac: 1150 }, hours: '7:00 AM – 10:30 PM',
    via: ['Faridpur', 'Jessore'],
    stops: ['Dhaka (Gabtoli)', 'Faridpur', 'Jessore', 'Khulna'],
  },
  {
    id: 'IC-14', category: 'intercity', type: 'non-ac',
    operator: 'Soukhin Paribahan', color: '#9333ea',
    from: 'Dhaka', to: 'Jessore', division: 'Khulna',
    distance: 272, durationMin: 360,
    fare: { single: 550, ac: null }, hours: '6:00 AM – 9:00 PM',
    via: ['Faridpur', 'Magura'],
    stops: ['Dhaka (Gabtoli)', 'Faridpur', 'Magura', 'Jessore'],
  },
  {
    id: 'IC-15', category: 'intercity', type: 'non-ac',
    operator: 'Satkhira Express', color: '#0f766e',
    from: 'Dhaka', to: 'Satkhira', division: 'Khulna',
    distance: 340, durationMin: 450,
    fare: { single: 600, ac: null }, hours: '6:30 AM – 8:00 PM',
    via: ['Faridpur', 'Jessore', 'Khulna'],
    stops: ['Dhaka (Gabtoli)', 'Faridpur', 'Jessore', 'Khulna', 'Satkhira'],
  },
  // ══ DHAKA → BARISAL DIVISION ═══════════════════════════════════════════
  {
    id: 'IC-16', category: 'intercity', type: 'ac',
    operator: 'Sachin Enterprise', color: '#be123c',
    from: 'Dhaka', to: 'Barishal', division: 'Barishal',
    distance: 185, durationMin: 270,
    fare: { single: 500, ac: 800 }, hours: '7:00 AM – 10:00 PM',
    via: ['Madaripur', 'Banaripara'],
    stops: ['Dhaka (Sayedabad)', 'Madaripur', 'Banaripara', 'Barishal'],
  },
  {
    id: 'IC-17', category: 'intercity', type: 'non-ac',
    operator: 'Desh Travels', color: '#2563eb',
    from: 'Dhaka', to: 'Patuakhali', division: 'Barishal',
    distance: 210, durationMin: 300,
    fare: { single: 480, ac: null }, hours: '7:00 AM – 9:00 PM',
    via: ['Madaripur', 'Barishal'],
    stops: ['Dhaka (Sayedabad)', 'Madaripur', 'Barishal', 'Patuakhali'],
  },
  // ══ DHAKA → RANGPUR DIVISION ═══════════════════════════════════════════
  {
    id: 'IC-18', category: 'intercity', type: 'ac',
    operator: 'Nabil Paribahan', color: '#0369a1',
    from: 'Dhaka', to: 'Rangpur', division: 'Rangpur',
    distance: 302, durationMin: 390,
    fare: { single: 700, ac: 1050 }, hours: '7:00 AM – 10:00 PM',
    via: ['Tangail', 'Sirajganj', 'Bogura'],
    stops: ['Dhaka (Gabtoli)', 'Tangail', 'Sirajganj', 'Bogura', 'Rangpur'],
  },
  {
    id: 'IC-19', category: 'intercity', type: 'ac',
    operator: 'S.R. Travels', color: '#65a30d',
    from: 'Dhaka', to: 'Dinajpur', division: 'Rangpur',
    distance: 395, durationMin: 480,
    fare: { single: 850, ac: 1300 }, hours: '7:00 AM – 9:00 PM',
    via: ['Sirajganj', 'Bogura', 'Joypurhat', 'Rangpur'],
    stops: ['Dhaka (Gabtoli)', 'Sirajganj', 'Bogura', 'Joypurhat', 'Rangpur', 'Dinajpur'],
  },
  {
    id: 'IC-20', category: 'intercity', type: 'non-ac',
    operator: 'Lalmonirhat Coach', color: '#92400e',
    from: 'Dhaka', to: 'Lalmonirhat', division: 'Rangpur',
    distance: 380, durationMin: 480,
    fare: { single: 750, ac: null }, hours: '7:00 AM – 8:00 PM',
    via: ['Bogura', 'Rangpur', 'Kurigram'],
    stops: ['Dhaka (Gabtoli)', 'Bogura', 'Rangpur', 'Kurigram', 'Lalmonirhat'],
  },
  // ══ DHAKA → MYMENSINGH DIVISION ════════════════════════════════════════
  {
    id: 'IC-21', category: 'intercity', type: 'non-ac',
    operator: 'Mymensingh Express', color: '#4f46e5',
    from: 'Dhaka', to: 'Mymensingh', division: 'Mymensingh',
    distance: 120, durationMin: 180,
    fare: { single: 280, ac: null }, hours: '6:00 AM – 10:00 PM',
    via: ['Gazipur'],
    stops: ['Dhaka (Mohakhali)', 'Gazipur', 'Mymensingh'],
  },
  {
    id: 'IC-22', category: 'intercity', type: 'non-ac',
    operator: 'Shyamoli Paribahan', color: '#15803d',
    from: 'Dhaka', to: 'Netrokona', division: 'Mymensingh',
    distance: 175, durationMin: 240,
    fare: { single: 380, ac: null }, hours: '7:00 AM – 8:00 PM',
    via: ['Gazipur', 'Mymensingh'],
    stops: ['Dhaka (Mohakhali)', 'Gazipur', 'Mymensingh', 'Netrokona'],
  },
  {
    id: 'IC-23', category: 'intercity', type: 'non-ac',
    operator: 'Jamuna Paribahan', color: '#0e7490',
    from: 'Dhaka', to: 'Kishoreganj', division: 'Mymensingh',
    distance: 98, durationMin: 150,
    fare: { single: 220, ac: null }, hours: '6:00 AM – 9:30 PM',
    via: ['Narsingdi'],
    stops: ['Dhaka (Sayedabad)', 'Narsingdi', 'Kishoreganj'],
  },
  // ══ CROSS-DIVISION INTERCITY ════════════════════════════════════════════
  {
    id: 'IC-24', category: 'intercity', type: 'ac',
    operator: 'Hanif Enterprise', color: '#b45309',
    from: 'Chattogram', to: 'Sylhet', division: 'Sylhet',
    distance: 320, durationMin: 420,
    fare: { single: 700, ac: 1100 }, hours: '7:00 AM – 9:00 PM',
    via: ['Feni', 'Comilla', 'Habiganj'],
    stops: ['Chattogram', 'Feni', 'Comilla', 'Habiganj', 'Sylhet'],
  },
  {
    id: 'IC-25', category: 'intercity', type: 'ac',
    operator: 'Green Line Paribahan', color: '#059669',
    from: 'Khulna', to: 'Rajshahi', division: 'Rajshahi',
    distance: 280, durationMin: 360,
    fare: { single: 650, ac: 1000 }, hours: '7:00 AM – 8:00 PM',
    via: ['Jessore', 'Kushtia'],
    stops: ['Khulna', 'Jessore', 'Kushtia', 'Rajshahi'],
  },
  {
    id: 'IC-26', category: 'intercity', type: 'ac',
    operator: 'Akota Transport', color: '#d97706',
    from: 'Rajshahi', to: 'Rangpur', division: 'Rangpur',
    distance: 143, durationMin: 200,
    fare: { single: 350, ac: 520 }, hours: '7:00 AM – 8:00 PM',
    via: ['Naogaon', 'Bogura'],
    stops: ['Rajshahi', 'Naogaon', 'Bogura', 'Rangpur'],
  },
  {
    id: 'IC-27', category: 'intercity', type: 'non-ac',
    operator: 'Rupsha Enterprise', color: '#0f766e',
    from: 'Khulna', to: 'Barishal', division: 'Barishal',
    distance: 115, durationMin: 150,
    fare: { single: 280, ac: null }, hours: '6:00 AM – 8:00 PM',
    via: ['Bagerhat'],
    stops: ['Khulna', 'Bagerhat', 'Barishal'],
  },
  {
    id: 'IC-28', category: 'intercity', type: 'ac',
    operator: 'Grameen Travels', color: '#16a34a',
    from: 'Dhaka', to: 'Bogura', division: 'Rajshahi',
    distance: 197, durationMin: 270,
    fare: { single: 480, ac: 720 }, hours: '7:00 AM – 10:00 PM',
    via: ['Tangail', 'Sirajganj'],
    stops: ['Dhaka (Gabtoli)', 'Tangail', 'Sirajganj', 'Bogura'],
  },
  {
    id: 'IC-29', category: 'intercity', type: 'ac',
    operator: 'Ena Transport', color: '#dc2626',
    from: 'Dhaka', to: 'Comilla', division: 'Chattogram',
    distance: 95, durationMin: 130,
    fare: { single: 250, ac: 380 }, hours: '6:00 AM – 11:00 PM',
    via: ['Narsingdi'],
    stops: ['Dhaka (Sayedabad)', 'Narsingdi', 'Comilla'],
  },
  {
    id: 'IC-30', category: 'intercity', type: 'ac',
    operator: 'National Travels', color: '#7c3aed',
    from: 'Dhaka', to: 'Jashore', division: 'Khulna',
    distance: 272, durationMin: 350,
    fare: { single: 600, ac: 900 }, hours: '7:00 AM – 9:30 PM',
    via: ['Faridpur', 'Magura'],
    stops: ['Dhaka (Gabtoli)', 'Faridpur', 'Magura', 'Jashore'],
  },
];

export const DHAKA_ROUTES = [
  // ── Real routes from dhakabusservice.com ──────────────────────────
  {
    id: 'RT-01', operator: 'Achim Paribahan', type: 'private',
    name: 'Achim Paribahan — Gabtoli ↔ Madhya Badda', color: '#0ea5e9',
    from: 'Gabtoli', to: 'Madhya Badda', distance: 19, durationMin: 65,
    fare: { single: 20, pass: 480 }, hours: '6:00 AM – 10:30 PM',
    stops: ['Gabtoli','Technical','Mirpur 1','Mirpur 10','Kalshi','Kuril','Madhya Badda'],
  },
  {
    id: 'RT-02', operator: 'Active Paribahan', type: 'private',
    name: 'Active Paribahan — Shia Masjid ↔ Abdullahpur', color: '#10b981',
    from: 'Shia Masjid', to: 'Abdullahpur', distance: 24, durationMin: 75,
    fare: { single: 25, pass: 550 }, hours: '6:00 AM – 10:00 PM',
    stops: ['Shia Masjid','Shyamoli','Mirpur 10','Kalshi','Airport','Abdullahpur'],
  },
  {
    id: 'RT-03', operator: 'Agradut Paribahan', type: 'private',
    name: 'Agradut — Savar ↔ Notun Bazar', color: '#f59e0b',
    from: 'Savar', to: 'Notun Bazar', distance: 35, durationMin: 105,
    fare: { single: 40, pass: 900 }, hours: '5:30 AM – 10:30 PM',
    stops: ['Savar','Gabtoli','Shyamoli','Agargaon','Mohakhali','Notun Bazar'],
  },
  {
    id: 'RT-04', operator: 'BRTC Elevated Expressway', type: 'government',
    name: 'BRTC Elevated — Rajlakshmi ↔ Farmgate', color: '#8b5cf6',
    from: 'Rajlakshmi', to: 'Farmgate', distance: 18, durationMin: 40,
    fare: { single: 50, pass: 1200 }, hours: '6:00 AM – 9:00 PM',
    stops: ['Rajlakshmi','Uttara','Airport','Kawlar','Farmgate'],
  },
  {
    id: 'RT-05', operator: 'Anabil Paribahan', type: 'private',
    name: 'Anabil — Gabtoli ↔ Motijheel', color: '#e11d48',
    from: 'Gabtoli', to: 'Motijheel', distance: 20, durationMin: 65,
    fare: { single: 22, pass: 500 }, hours: '6:00 AM – 10:00 PM',
    stops: ['Gabtoli','Shyamoli','Dhanmondi','New Market','Nilkhet','Paltan','Motijheel'],
  },
  {
    id: 'RT-06', operator: 'Ananda Paribahan', type: 'private',
    name: 'Ananda — Mirpur 1 ↔ Gulistan', color: '#0f766e',
    from: 'Mirpur 1', to: 'Gulistan', distance: 17, durationMin: 55,
    fare: { single: 18, pass: 420 }, hours: '6:00 AM – 10:30 PM',
    stops: ['Mirpur 1','Mirpur 10','Agargaon','Farmgate','Banglamotor','Gulistan'],
  },
  {
    id: 'RT-07', operator: 'Baishakhi Paribahan', type: 'private',
    name: 'Baishakhi — Demra ↔ Gabtoli', color: '#ea580c',
    from: 'Demra', to: 'Gabtoli', distance: 22, durationMin: 70,
    fare: { single: 25, pass: 550 }, hours: '6:00 AM – 10:00 PM',
    stops: ['Demra','Jatrabari','Gulistan','Paltan','Shahbag','Nilkhet','New Market','Gabtoli'],
  },
  {
    id: 'RT-08', operator: 'BRTC City Service', type: 'government',
    name: 'BRTC City — Sadarghat ↔ Uttara', color: '#7c3aed',
    from: 'Sadarghat', to: 'Uttara', distance: 28, durationMin: 90,
    fare: { single: 15, pass: 350 }, hours: '6:00 AM – 9:00 PM',
    stops: ['Sadarghat','Gulistan','Paltan','Motijheel','Kakrail','Banani','Airport','Uttara'],
  },
  {
    id: 'RT-09', operator: 'Bismillah Paribahan', type: 'private',
    name: 'Bismillah — Tongi ↔ Gulistan', color: '#0284c7',
    from: 'Tongi', to: 'Gulistan', distance: 30, durationMin: 90,
    fare: { single: 30, pass: 700 }, hours: '5:30 AM – 10:30 PM',
    stops: ['Tongi','Abdullahpur','Airport','Mohakhali','Banani','Mouchak','Motijheel','Gulistan'],
  },
  {
    id: 'RT-10', operator: 'Desh Travels', type: 'semi-seating',
    name: 'Desh Travels — Gazipur ↔ Sadarghat', color: '#15803d',
    from: 'Gazipur', to: 'Sadarghat', distance: 40, durationMin: 115,
    fare: { single: 45, pass: 1000 }, hours: '6:00 AM – 9:30 PM',
    stops: ['Gazipur','Tongi','Abdullahpur','Airport','Mirpur 10','Farmgate','Motijheel','Gulistan','Sadarghat'],
  },
  {
    id: 'RT-11', operator: 'Dhaka Chaka', type: 'private',
    name: 'Dhaka Chaka — Mirpur 12 ↔ Motijheel', color: '#dc2626',
    from: 'Mirpur 12', to: 'Motijheel', distance: 21, durationMin: 68,
    fare: { single: 22, pass: 500 }, hours: '6:00 AM – 10:00 PM',
    stops: ['Mirpur 12','Mirpur 11','Mirpur 10','Kazi Para','Shyamoli','Farmgate','Karwan Bazar','Motijheel'],
  },
  {
    id: 'RT-12', operator: 'Ekota Paribahan', type: 'private',
    name: 'Ekota — Gabtoli ↔ Sadarghat', color: '#d97706',
    from: 'Gabtoli', to: 'Sadarghat', distance: 18, durationMin: 60,
    fare: { single: 20, pass: 450 }, hours: '6:00 AM – 10:30 PM',
    stops: ['Gabtoli','Shyamoli','Azimpur','New Market','Paltan','Gulistan','Sadarghat'],
  },
  {
    id: 'RT-13', operator: 'Elegant Coach', type: 'ac',
    name: 'Elegant Coach — Uttara ↔ Motijheel (AC)', color: '#6d28d9',
    from: 'Uttara', to: 'Motijheel', distance: 26, durationMin: 55,
    fare: { single: 80, pass: 1800 }, hours: '7:00 AM – 9:00 PM',
    stops: ['Uttara','Airport','Mohakhali','Banani','Gulshan 2','Mouchak','Paltan','Motijheel'],
  },
  {
    id: 'RT-14', operator: 'Fuad Paribahan', type: 'private',
    name: 'Fuad — Mirpur 1 ↔ Demra', color: '#059669',
    from: 'Mirpur 1', to: 'Demra', distance: 25, durationMin: 80,
    fare: { single: 28, pass: 620 }, hours: '6:00 AM – 10:00 PM',
    stops: ['Mirpur 1','Agargaon','Farmgate','Shahbag','Paltan','Gulistan','Jatrabari','Demra'],
  },
  {
    id: 'RT-15', operator: 'Hasnabad Paribahan', type: 'private',
    name: 'Hasnabad — Hasnabad ↔ Gulistan', color: '#b45309',
    from: 'Hasnabad', to: 'Gulistan', distance: 16, durationMin: 55,
    fare: { single: 18, pass: 400 }, hours: '6:00 AM – 10:00 PM',
    stops: ['Hasnabad','Rayerbazar','Dhanmondi 27','New Market','Nilkhet','Paltan','Gulistan'],
  },
  {
    id: 'RT-16', operator: 'Himachol Paribahan', type: 'private',
    name: 'Himachol — Kalshi ↔ Narayanganj', color: '#1d4ed8',
    from: 'Kalshi', to: 'Narayanganj', distance: 32, durationMin: 95,
    fare: { single: 35, pass: 800 }, hours: '6:00 AM – 9:30 PM',
    stops: ['Kalshi','Mirpur 10','Farmgate','Gulistan','Jatrabari','Demra','Narayanganj'],
  },
  {
    id: 'RT-17', operator: 'Jahanara Paribahan', type: 'private',
    name: 'Jahanara — Mohammadpur ↔ Motijheel', color: '#0e7490',
    from: 'Mohammadpur', to: 'Motijheel', distance: 12, durationMin: 45,
    fare: { single: 15, pass: 360 }, hours: '6:00 AM – 10:30 PM',
    stops: ['Mohammadpur','Shyamoli','Dhanmondi','Nilkhet','New Market','Paltan','Motijheel'],
  },
  {
    id: 'RT-18', operator: 'Labaid Paribahan', type: 'private',
    name: 'Labaid — Rampura ↔ Gabtoli', color: '#7e22ce',
    from: 'Rampura', to: 'Gabtoli', distance: 16, durationMin: 55,
    fare: { single: 18, pass: 420 }, hours: '6:00 AM – 10:00 PM',
    stops: ['Rampura','Malibagh','Moghbazar','Karwan Bazar','Farmgate','Shyamoli','Gabtoli'],
  },
  {
    id: 'RT-19', operator: 'Metro Paribahan', type: 'private',
    name: 'Metro — Abdullahpur ↔ Sadarghat', color: '#be123c',
    from: 'Abdullahpur', to: 'Sadarghat', distance: 36, durationMin: 110,
    fare: { single: 40, pass: 900 }, hours: '5:30 AM – 10:30 PM',
    stops: ['Abdullahpur','Airport','Uttara','Mohakhali','Banani','Mouchak','Gulistan','Sadarghat'],
  },
  {
    id: 'RT-20', operator: 'Mohanagar Paribahan', type: 'private',
    name: 'Mohanagar — Mirpur 10 ↔ Demra', color: '#166534',
    from: 'Mirpur 10', to: 'Demra', distance: 23, durationMin: 72,
    fare: { single: 25, pass: 560 }, hours: '6:00 AM – 10:00 PM',
    stops: ['Mirpur 10','Kazi Para','Farmgate','Banglamotor','Shahbag','Gulistan','Jatrabari','Demra'],
  },
  {
    id: 'RT-21', operator: 'Nabin Paribahan', type: 'private',
    name: 'Nabin — Gabtoli ↔ Gulistan', color: '#92400e',
    from: 'Gabtoli', to: 'Gulistan', distance: 16, durationMin: 55,
    fare: { single: 18, pass: 400 }, hours: '6:00 AM – 10:30 PM',
    stops: ['Gabtoli','Mirpur 1','Shyamoli','Dhanmondi','New Market','Nilkhet','Gulistan'],
  },
  {
    id: 'RT-22', operator: 'Probaho Paribahan', type: 'private',
    name: 'Probaho — Mirpur 12 ↔ Gulistan', color: '#4338ca',
    from: 'Mirpur 12', to: 'Gulistan', distance: 20, durationMin: 65,
    fare: { single: 20, pass: 460 }, hours: '6:00 AM – 10:00 PM',
    stops: ['Mirpur 12','Mirpur 10','Agargaon','Bijoy Sarani','Farmgate','Nilkhet','Gulistan'],
  },
  {
    id: 'RT-23', operator: 'Ruposhi Bangla', type: 'semi-seating',
    name: 'Ruposhi Bangla — Savar ↔ Gulistan', color: '#0f766e',
    from: 'Savar', to: 'Gulistan', distance: 33, durationMin: 100,
    fare: { single: 38, pass: 850 }, hours: '5:30 AM – 10:00 PM',
    stops: ['Savar','Hemayetpur','Gabtoli','Technical','Shyamoli','Dhanmondi','New Market','Gulistan'],
  },
  {
    id: 'RT-24', operator: 'Shadesh Paribahan', type: 'private',
    name: 'Shadesh — Badda ↔ Motijheel', color: '#b91c1c',
    from: 'Badda', to: 'Motijheel', distance: 15, durationMin: 50,
    fare: { single: 18, pass: 400 }, hours: '6:00 AM – 10:30 PM',
    stops: ['Badda','Merul Badda','Rampura','Malibagh','Mouchak','Kakrail','Motijheel'],
  },
  {
    id: 'RT-25', operator: 'Shohag Paribahan', type: 'ac',
    name: 'Shohag — Uttara ↔ Sadarghat (AC)', color: '#1e40af',
    from: 'Uttara', to: 'Sadarghat', distance: 30, durationMin: 60,
    fare: { single: 100, pass: 2200 }, hours: '7:00 AM – 9:00 PM',
    stops: ['Uttara','Airport','Banani','Gulshan 2','Paltan','Gulistan','Sadarghat'],
  },
  {
    id: 'RT-26', operator: 'Shuvoyatra Paribahan', type: 'private',
    name: 'Shuvoyatra — Gazipur ↔ Motijheel', color: '#065f46',
    from: 'Gazipur', to: 'Motijheel', distance: 38, durationMin: 110,
    fare: { single: 42, pass: 950 }, hours: '5:30 AM – 10:30 PM',
    stops: ['Gazipur','Tongi','Abdullahpur','Airport','Mohakhali','Farmgate','Karwan Bazar','Motijheel'],
  },
  {
    id: 'RT-27', operator: 'Subarna Paribahan', type: 'private',
    name: 'Subarna — Mirpur 1 ↔ Narayanganj', color: '#78350f',
    from: 'Mirpur 1', to: 'Narayanganj', distance: 30, durationMin: 95,
    fare: { single: 32, pass: 720 }, hours: '6:00 AM – 9:30 PM',
    stops: ['Mirpur 1','Mirpur 10','Farmgate','Gulistan','Jatrabari','Narayanganj'],
  },
  {
    id: 'RT-28', operator: 'Titas Paribahan', type: 'private',
    name: 'Titas — Tongi ↔ Sadarghat', color: '#5b21b6',
    from: 'Tongi', to: 'Sadarghat', distance: 34, durationMin: 100,
    fare: { single: 38, pass: 860 }, hours: '5:30 AM – 10:00 PM',
    stops: ['Tongi','Abdullahpur','Airport','Uttara','Mohakhali','Mouchak','Gulistan','Sadarghat'],
  },
  {
    id: 'RT-29', operator: 'Trans Sylhet', type: 'private',
    name: 'Trans Sylhet — Rampura ↔ Gabtoli', color: '#0369a1',
    from: 'Rampura', to: 'Gabtoli', distance: 18, durationMin: 58,
    fare: { single: 20, pass: 450 }, hours: '6:00 AM – 10:30 PM',
    stops: ['Rampura','Malibagh','Moghbazar','Mouchak','Karwan Bazar','Farmgate','Shyamoli','Gabtoli'],
  },
  {
    id: 'RT-30', operator: 'Unique Paribahan', type: 'private',
    name: 'Unique — Mirpur 11 ↔ Demra', color: '#9f1239',
    from: 'Mirpur 11', to: 'Demra', distance: 26, durationMin: 82,
    fare: { single: 28, pass: 640 }, hours: '6:00 AM – 10:00 PM',
    stops: ['Mirpur 11','Mirpur 10','Kazi Para','Farmgate','Shahbag','Motijheel','Gulistan','Jatrabari','Demra'],
  },
];

@Injectable()
export class TransportService {
  private routes = DHAKA_ROUTES.map((r) => ({ ...r, status: 'active', totalTrips: Math.floor(Math.random() * 50 + 10) }));
  private vehicles: any[] = [
    // ── CITY BUSES (Dhaka) ────────────────────────────────────────────────
    { id: 'BUS-001', category: 'city',      busName: 'Achim Paribahan',        type: 'bus', registration: 'Dhaka B-11-0001', routeId: 'RT-01', status: 'on_route',    capacity: 60, driver: 'Karim Ahmed',      lat: 23.806, lng: 90.366 },
    { id: 'BUS-002', category: 'city',      busName: 'Bismillah Paribahan',    type: 'bus', registration: 'Dhaka B-11-0002', routeId: 'RT-02', status: 'on_route',    capacity: 60, driver: 'Rahim Uddin',      lat: 23.879, lng: 90.399 },
    { id: 'BUS-003', category: 'city',      busName: 'Agradut Paribahan',      type: 'bus', registration: 'Dhaka B-11-0003', routeId: 'RT-03', status: 'depot',       capacity: 45, driver: null,               lat: 23.726, lng: 90.375 },
    { id: 'BUS-004', category: 'city',      busName: 'BRTC Elevated Express',  type: 'bus', registration: 'Dhaka B-11-0004', routeId: 'RT-04', status: 'on_route',    capacity: 60, driver: 'Sumon Mia',        lat: 23.820, lng: 90.390 },
    { id: 'BUS-005', category: 'city',      busName: 'Uttara Paribahan',       type: 'bus', registration: 'Dhaka B-11-0005', routeId: 'RT-05', status: 'maintenance', capacity: 45, driver: null,               lat: 23.745, lng: 90.373 },
    { id: 'BUS-006', category: 'city',      busName: 'Labaid Paribahan',       type: 'bus', registration: 'Dhaka B-11-0006', routeId: 'RT-06', status: 'on_route',    capacity: 60, driver: 'Jalal Hossain',    lat: 23.800, lng: 90.380 },
    { id: 'BUS-007', category: 'city',      busName: 'BRTC Double Decker',     type: 'bus', registration: 'Dhaka B-11-0007', routeId: 'RT-08', status: 'on_route',    capacity: 80, driver: 'Mostafa Kamal',    lat: 23.730, lng: 90.410 },
    { id: 'BUS-008', category: 'city',      busName: 'Desh Travels City',      type: 'bus', registration: 'Dhaka B-11-0008', routeId: 'RT-10', status: 'depot',       capacity: 45, driver: null,               lat: 23.900, lng: 90.420 },
    { id: 'BUS-009', category: 'city',      busName: 'Elegant Coach',          type: 'bus', registration: 'Dhaka B-11-0009', routeId: 'RT-13', status: 'on_route',    capacity: 40, driver: 'Nazmul Islam',     lat: 23.872, lng: 90.395 },
    { id: 'BUS-010', category: 'city',      busName: 'Probaho Paribahan',      type: 'bus', registration: 'Dhaka B-11-0010', routeId: 'RT-25', status: 'on_route',    capacity: 40, driver: 'Shahidul Alam',    lat: 23.860, lng: 90.400 },
    // ── INTERCITY BUSES ───────────────────────────────────────────────────
    { id: 'IC-BUS-001', category: 'intercity', busName: 'Grameen Travels',         type: 'bus', registration: 'Dhaka Metro NG-001', routeId: 'IC-01', status: 'on_route',    capacity: 44, driver: 'Abdul Mannan',     lat: 23.810, lng: 90.370 },
    { id: 'IC-BUS-002', category: 'intercity', busName: 'Desh Travels',            type: 'bus', registration: 'Dhaka Metro DT-002', routeId: 'IC-02', status: 'on_route',    capacity: 44, driver: 'Faruk Hossain',    lat: 23.830, lng: 90.360 },
    { id: 'IC-BUS-003', category: 'intercity', busName: 'Akota Transport',         type: 'bus', registration: 'Dhaka Metro AK-003', routeId: 'IC-03', status: 'depot',       capacity: 52, driver: null,               lat: 23.760, lng: 90.385 },
    { id: 'IC-BUS-004', category: 'intercity', busName: 'National Travels',        type: 'bus', registration: 'Dhaka Metro NT-004', routeId: 'IC-04', status: 'on_route',    capacity: 44, driver: 'Mizanur Rahman',   lat: 23.820, lng: 90.370 },
    { id: 'IC-BUS-005', category: 'intercity', busName: 'Green Line Paribahan',    type: 'bus', registration: 'Dhaka Metro GL-005', routeId: 'IC-05', status: 'on_route',    capacity: 40, driver: 'Delwar Hossain',   lat: 23.815, lng: 90.368 },
    { id: 'IC-BUS-006', category: 'intercity', busName: 'Shohag Paribahan',        type: 'bus', registration: 'Dhaka Metro SH-006', routeId: 'IC-06', status: 'on_route',    capacity: 40, driver: 'Amir Hossain',     lat: 23.800, lng: 90.362 },
    { id: 'IC-BUS-007', category: 'intercity', busName: 'Ena Transport',           type: 'bus', registration: 'Dhaka Metro EN-007', routeId: 'IC-07', status: 'maintenance', capacity: 44, driver: null,               lat: 23.795, lng: 90.380 },
    { id: 'IC-BUS-008', category: 'intercity', busName: 'Soudia-S. Alam Paribahan',type: 'bus', registration: 'Dhaka Metro SA-008', routeId: 'IC-08', status: 'on_route',    capacity: 44, driver: 'Sohel Rana',       lat: 23.808, lng: 90.372 },
    { id: 'IC-BUS-009', category: 'intercity', busName: 'Shyamoli Paribahan',      type: 'bus', registration: 'Dhaka Metro SM-009', routeId: 'IC-09', status: 'on_route',    capacity: 44, driver: 'Bashir Ahmed',     lat: 23.812, lng: 90.366 },
    { id: 'IC-BUS-010', category: 'intercity', busName: 'Hanif Enterprise',        type: 'bus', registration: 'Dhaka Metro HN-010', routeId: 'IC-11', status: 'depot',       capacity: 52, driver: null,               lat: 23.756, lng: 90.382 },
    { id: 'IC-BUS-011', category: 'intercity', busName: 'Sachin Enterprise',       type: 'bus', registration: 'Dhaka Metro SC-011', routeId: 'IC-16', status: 'on_route',    capacity: 44, driver: 'Ruhul Amin',       lat: 23.818, lng: 90.365 },
    { id: 'IC-BUS-012', category: 'intercity', busName: 'Nabil Paribahan',         type: 'bus', registration: 'Dhaka Metro NB-012', routeId: 'IC-18', status: 'on_route',    capacity: 44, driver: 'Jahangir Alam',    lat: 23.805, lng: 90.375 },
    { id: 'IC-BUS-013', category: 'intercity', busName: 'S.R. Travels',            type: 'bus', registration: 'Dhaka Metro SR-013', routeId: 'IC-19', status: 'on_route',    capacity: 44, driver: 'Monir Hossain',    lat: 23.822, lng: 90.358 },
    { id: 'IC-BUS-014', category: 'intercity', busName: 'Mymensingh Express',      type: 'bus', registration: 'Dhaka Metro ME-014', routeId: 'IC-21', status: 'on_route',    capacity: 52, driver: 'Selim Reza',       lat: 23.825, lng: 90.355 },
    { id: 'IC-BUS-015', category: 'intercity', busName: 'Jamuna Paribahan',        type: 'bus', registration: 'Dhaka Metro JP-015', routeId: 'IC-23', status: 'depot',       capacity: 44, driver: null,               lat: 23.762, lng: 90.378 },
    { id: 'IC-BUS-016', category: 'intercity', busName: 'Soukhin Paribahan',       type: 'bus', registration: 'Dhaka Metro SK-016', routeId: 'IC-14', status: 'on_route',    capacity: 52, driver: 'Kamal Uddin',      lat: 23.811, lng: 90.369 },
    { id: 'IC-BUS-017', category: 'intercity', busName: 'Rupsha Enterprise',       type: 'bus', registration: 'Khulna Metro RE-017', routeId: 'IC-27', status: 'on_route',   capacity: 44, driver: 'Masud Rana',       lat: 22.845, lng: 89.542 },
    { id: 'IC-BUS-018', category: 'intercity', busName: 'Lalmonirhat Coach',       type: 'bus', registration: 'Rangpur Metro LC-018', routeId: 'IC-20', status: 'maintenance',capacity: 44, driver: null,               lat: 25.920, lng: 89.444 },
  ];
  private schedules: any[] = [
    // ── City Schedules (Dhaka) ─────────────────────────────────────────────
    { id: 'SCH-001', category: 'city', routeId: 'RT-01', vehicleId: 'BUS-001', departureTime: '06:00', arrivalTime: '07:05', days: ['Mon','Tue','Wed','Thu','Fri','Sat'], status: 'active' },
    { id: 'SCH-002', category: 'city', routeId: 'RT-01', vehicleId: 'BUS-001', departureTime: '08:30', arrivalTime: '09:35', days: ['Mon','Tue','Wed','Thu','Fri'], status: 'active' },
    { id: 'SCH-003', category: 'city', routeId: 'RT-02', vehicleId: 'BUS-002', departureTime: '07:00', arrivalTime: '08:15', days: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], status: 'active' },
    { id: 'SCH-004', category: 'city', routeId: 'RT-04', vehicleId: 'BUS-004', departureTime: '06:30', arrivalTime: '07:10', days: ['Mon','Tue','Wed','Thu','Fri'], status: 'active' },
    { id: 'SCH-005', category: 'city', routeId: 'RT-06', vehicleId: 'BUS-006', departureTime: '07:30', arrivalTime: '08:25', days: ['Mon','Tue','Wed','Thu','Fri','Sat'], status: 'active' },
    { id: 'SCH-006', category: 'city', routeId: 'RT-08', vehicleId: 'BUS-007', departureTime: '06:00', arrivalTime: '07:30', days: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], status: 'active' },
    { id: 'SCH-007', category: 'city', routeId: 'RT-13', vehicleId: 'BUS-009', departureTime: '08:00', arrivalTime: '08:55', days: ['Mon','Tue','Wed','Thu','Fri','Sat'], status: 'active' },
    { id: 'SCH-008', category: 'city', routeId: 'RT-25', vehicleId: 'BUS-010', departureTime: '07:30', arrivalTime: '08:30', days: ['Mon','Tue','Wed','Thu','Fri','Sat'], status: 'active' },
    // ── Intercity Schedules ────────────────────────────────────────────────
    { id: 'SCH-IC-001', category: 'intercity', routeId: 'IC-01', vehicleId: 'IC-BUS-001', departureTime: '07:00', arrivalTime: '12:30', days: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], status: 'active' },
    { id: 'SCH-IC-002', category: 'intercity', routeId: 'IC-02', vehicleId: 'IC-BUS-002', departureTime: '08:00', arrivalTime: '13:30', days: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], status: 'active' },
    { id: 'SCH-IC-003', category: 'intercity', routeId: 'IC-03', vehicleId: 'IC-BUS-003', departureTime: '06:30', arrivalTime: '11:00', days: ['Mon','Tue','Wed','Thu','Fri','Sat'], status: 'active' },
    { id: 'SCH-IC-004', category: 'intercity', routeId: 'IC-05', vehicleId: 'IC-BUS-005', departureTime: '21:00', arrivalTime: '05:00', days: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], status: 'active' },
    { id: 'SCH-IC-005', category: 'intercity', routeId: 'IC-06', vehicleId: 'IC-BUS-006', departureTime: '22:00', arrivalTime: '04:30', days: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], status: 'active' },
    { id: 'SCH-IC-006', category: 'intercity', routeId: 'IC-08', vehicleId: 'IC-BUS-008', departureTime: '20:30', arrivalTime: '06:00', days: ['Mon','Wed','Fri','Sat','Sun'], status: 'active' },
    { id: 'SCH-IC-007', category: 'intercity', routeId: 'IC-09', vehicleId: 'IC-BUS-009', departureTime: '09:00', arrivalTime: '15:00', days: ['Mon','Tue','Wed','Thu','Fri'], status: 'active' },
    { id: 'SCH-IC-008', category: 'intercity', routeId: 'IC-11', vehicleId: 'IC-BUS-010', departureTime: '10:00', arrivalTime: '16:30', days: ['Sat','Sun'], status: 'active' },
    { id: 'SCH-IC-009', category: 'intercity', routeId: 'IC-16', vehicleId: 'IC-BUS-011', departureTime: '23:00', arrivalTime: '07:00', days: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], status: 'active' },
    { id: 'SCH-IC-010', category: 'intercity', routeId: 'IC-21', vehicleId: 'IC-BUS-014', departureTime: '07:30', arrivalTime: '10:00', days: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], status: 'active' },
  ];
  private tickets: any[] = [];
  private disruptions: any[] = [
    { id: 'DIS-001', routeId: 'RT-03', type: 'delay', severity: 'medium', title: 'Traffic congestion at Airport Road', description: 'Agradut Paribahan — estimated 20-min delay near Airport intersection on Savar–Notun Bazar route.', reportedAt: new Date().toISOString(), status: 'active' },
    { id: 'DIS-002', routeId: 'RT-18', type: 'breakdown', severity: 'high', title: 'Vehicle breakdown at Malibagh', description: 'Labaid Paribahan BUS on Rampura–Gabtoli route has broken down. Service temporarily suspended at Malibagh.', reportedAt: new Date().toISOString(), status: 'active' },
    { id: 'DIS-003', routeId: 'RT-10', type: 'delay', severity: 'low', title: 'Minor delay near Tongi Bridge', description: 'Desh Travels Gazipur–Sadarghat service delayed ~10 min due to road works near Tongi Bridge.', reportedAt: new Date().toISOString(), status: 'active' },
  ];
  private feedbacks: any[] = [];
  private nextTicketNum = 1001;

  // ── Routes ──────────────────────────────────────────────────────
  getRoutes() { return this.routes; }
  getRoute(id: string) { return this.routes.find((r) => r.id === id); }
  addRoute(data: any) { const r = { id: `RT-${Date.now()}`, status: 'active', totalTrips: 0, ...data }; this.routes.push(r); return r; }
  updateRoute(id: string, data: any) { const r = this.routes.find((r) => r.id === id); if (r) Object.assign(r, data); return r; }
  deleteRoute(id: string) { this.routes = this.routes.filter((r) => r.id !== id); return { deleted: id }; }

  // ── Vehicles ─────────────────────────────────────────────────────
  getVehicles() { return this.vehicles; }
  addVehicle(data: any) { const v = { id: `BUS-${Date.now()}`, status: 'depot', ...data }; this.vehicles.push(v); return v; }
  updateVehicle(id: string, data: any) { const v = this.vehicles.find((v) => v.id === id); if (v) Object.assign(v, data); return v; }
  removeVehicle(id: string) { this.vehicles = this.vehicles.filter((v) => v.id !== id); return { deleted: id }; }
  updateLocation(id: string, lat: number, lng: number) { const v = this.vehicles.find((v) => v.id === id); if (v) { v.lat = lat; v.lng = lng; } return v; }

  // ── Schedules ─────────────────────────────────────────────────────
  getSchedules(routeId?: string) { return routeId ? this.schedules.filter((s) => s.routeId === routeId) : this.schedules; }
  addSchedule(data: any) { const s = { id: `SCH-${Date.now()}`, status: 'active', ...data }; this.schedules.push(s); return s; }
  updateSchedule(id: string, data: any) { const s = this.schedules.find((s) => s.id === id); if (s) Object.assign(s, data); return s; }
  deleteSchedule(id: string) { this.schedules = this.schedules.filter((s) => s.id !== id); return { deleted: id }; }

  // ── Tickets ───────────────────────────────────────────────────────
  getTickets(passengerName?: string) { return passengerName ? this.tickets.filter((t) => t.passengerName === passengerName) : this.tickets; }
  buyTicket(data: any) {
    const ticket = {
      id: `TKT-${this.nextTicketNum++}`, status: 'valid',
      issuedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      ...data,
    };
    this.tickets.push(ticket);
    return ticket;
  }
  validateTicket(id: string) {
    const t = this.tickets.find((t) => t.id === id);
    if (!t) return { valid: false, message: 'Ticket not found' };
    if (t.status === 'used') return { valid: false, message: 'Ticket already used' };
    if (new Date(t.expiresAt) < new Date()) { t.status = 'expired'; return { valid: false, message: 'Ticket expired' }; }
    t.status = 'used'; t.usedAt = new Date().toISOString();
    return { valid: true, ticket: t, message: 'Ticket validated successfully' };
  }
  expireOldTickets() {
    const now = new Date();
    this.tickets.forEach((t) => { if (t.status === 'valid' && new Date(t.expiresAt) < now) t.status = 'expired'; });
    return { expired: this.tickets.filter((t) => t.status === 'expired').length };
  }

  // ── Disruptions ───────────────────────────────────────────────────
  getDisruptions(status?: string) { return status ? this.disruptions.filter((d) => d.status === status) : this.disruptions; }
  addDisruption(data: any) { const d = { id: `DIS-${Date.now()}`, status: 'active', reportedAt: new Date().toISOString(), ...data }; this.disruptions.push(d); return d; }
  resolveDisruption(id: string) { const d = this.disruptions.find((d) => d.id === id); if (d) { d.status = 'resolved'; d.resolvedAt = new Date().toISOString(); } return d; }
  autoResolveOldDisruptions() {
    const cutoff = new Date(Date.now() - 6 * 60 * 60 * 1000);
    this.disruptions.forEach((d) => { if (d.status === 'active' && new Date(d.reportedAt) < cutoff) { d.status = 'resolved'; d.resolvedAt = new Date().toISOString(); } });
    return { resolved: this.disruptions.filter((d) => d.status === 'resolved').length };
  }

  // ── Feedback ──────────────────────────────────────────────────────
  getFeedbacks() { return this.feedbacks; }
  addFeedback(data: any) { const f = { id: `FB-${Date.now()}`, submittedAt: new Date().toISOString(), status: 'open', ...data }; this.feedbacks.push(f); return f; }

  // ── Analytics ─────────────────────────────────────────────────────
  getAnalytics() {
    const totalRidership = this.tickets.length;
    const validTickets = this.tickets.filter((t) => t.status === 'valid').length;
    const usedTickets = this.tickets.filter((t) => t.status === 'used').length;
    const totalRevenue = this.tickets.reduce((s, t) => s + (t.fare || 0), 0);
    const onRouteVehicles = this.vehicles.filter((v) => v.status === 'on_route').length;
    const activeDisruptions = this.disruptions.filter((d) => d.status === 'active').length;
    const avgRating = this.feedbacks.length > 0 ? (this.feedbacks.reduce((s, f) => s + (f.rating || 0), 0) / this.feedbacks.length).toFixed(1) : 'N/A';
    return { totalRidership, validTickets, usedTickets, totalRevenue, onRouteVehicles, activeDisruptions, avgRating, totalRoutes: this.routes.length, totalVehicles: this.vehicles.length, totalFeedbacks: this.feedbacks.length };
  }

  // ── Trip Planner ─────────────────────────────────────────────────
  planTrip(from: string, to: string) {
    const fromLower = from.toLowerCase();
    const toLower = to.toLowerCase();
    const matches = this.routes.filter((r) => {
      const stops = r.stops.map((s) => s.toLowerCase());
      const fromIdx = stops.findIndex((s) => s.includes(fromLower) || fromLower.includes(s));
      const toIdx = stops.findIndex((s) => s.includes(toLower) || toLower.includes(s));
      return fromIdx !== -1 && toIdx !== -1 && fromIdx < toIdx;
    });
    if (matches.length === 0) return { routes: [], message: 'No direct routes found. Try nearby stops.' };
    return { routes: matches.slice(0, 3), message: `${matches.length} route(s) found` };
  }

  // ── Intercity Routes ───────────────────────────────────────────────────
  private intercityRoutes = INTERCITY_ROUTES.map((r) => ({ ...r, status: 'active' }));

  getIntercityRoutes(division?: string) {
    return division
      ? this.intercityRoutes.filter((r) => r.division.toLowerCase() === division.toLowerCase())
      : this.intercityRoutes;
  }

  getIntercityRoute(id: string) {
    return this.intercityRoutes.find((r) => r.id === id);
  }

  addIntercityRoute(data: any) {
    const id = `IC-${String(this.intercityRoutes.length + 1).padStart(2, '0')}-${Date.now().toString().slice(-4)}`;
    const route = { id, category: 'intercity', status: 'active', via: [], stops: [], ...data };
    this.intercityRoutes.push(route);
    return route;
  }

  updateIntercityRoute(id: string, data: any) {
    const r = this.intercityRoutes.find((r) => r.id === id);
    if (r) Object.assign(r, data);
    return r;
  }

  deleteIntercityRoute(id: string) {
    const idx = this.intercityRoutes.findIndex((r) => r.id === id);
    if (idx !== -1) { this.intercityRoutes.splice(idx, 1); return { deleted: true }; }
    return { deleted: false };
  }

  planIntercityTrip(from: string, to: string) {
    const fl = from.toLowerCase();
    const tl = to.toLowerCase();
    const matches = this.intercityRoutes.filter((r) =>
      (r.from.toLowerCase().includes(fl) || r.stops.some((s: string) => s.toLowerCase().includes(fl))) &&
      (r.to.toLowerCase().includes(tl)   || r.stops.some((s: string) => s.toLowerCase().includes(tl)))
    );
    if (!matches.length) return { routes: [], message: 'No intercity routes found for this journey.' };
    return { routes: matches, message: `${matches.length} intercity route(s) found` };
  }
}
