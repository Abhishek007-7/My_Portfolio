// ─────────────────────────────────────────────────────────────
//  All site content lives here. Edit this file to update the site.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Abhishek Madhu Vidya',
  short: 'Abhishek',
  roles: ['an AI engineer', 'a machine learning engineer', 'a frontend developer', 'a published author'],
  tagline:
    'Master of AI student at RMIT Melbourne. I build machine-learning systems, and the interfaces that put them in people’s hands.',
  location: 'Melbourne, Australia',
  timezone: 'Australia/Melbourne',
  email: 'abhishekmv2004@gmail.com',
  github: 'https://github.com/Abhishek007-7',
  linkedin: 'https://www.linkedin.com/in/abhishek-madhu-vidya-2a1003109',
  resume: './Abhishek_Madhu_Vidya-Resume.pdf',
  status: 'Master of AI @ RMIT University',
  openTo: 'Open to AI/ML internships & part-time roles',
}

export const about = {
  bio: [
    'I’m an Electronics & Computer Engineer turned AI specialist. During my B.Tech at Amrita Vishwa Vidyapeetham I got hooked on machine learning, and my projects turned into three conference publications, including one at IEEE ICCCNT 2025.',
    'Before moving to Melbourne I shipped production React & TypeScript interfaces as a Frontend Developer at KreditBee, one of India’s large digital-lending platforms. Now I’m pursuing a Master of Artificial Intelligence at RMIT to go deeper on the models behind the products.',
  ],
  stats: [
    { value: 3, suffix: '', label: 'Conference publications' },
    { value: 16, suffix: '', label: 'Global accents classified' },
    { value: 91.6, suffix: '%', label: 'Face-recognition accuracy', decimals: 1 },
    { value: 5, suffix: '', label: 'Languages I speak' },
  ],
  languages: ['English', 'Malayalam', 'Hindi', 'Tamil', 'Kannada'],
  hobbies: ['Trekking', 'Badminton', 'Reading', 'Tech news'],
  places: ['Bahrain', 'Bengaluru', 'Melbourne'],
}

export type TimelineItem = {
  kind: 'work' | 'education'
  title: string
  org: string
  place: string
  period: string
  current?: boolean
  points: string[]
  tags?: string[]
}

export const timeline: TimelineItem[] = [
  {
    kind: 'education',
    title: 'Master of Artificial Intelligence',
    org: 'RMIT University',
    place: 'Melbourne, Australia',
    period: '2026 – Present',
    current: true,
    points: [
      'Postgraduate study in machine learning, deep learning and applied AI.',
      'Building on my background in machine learning, computer vision and NLP.',
    ],
    tags: ['Machine Learning', 'Deep Learning', 'Applied AI'],
  },
  {
    kind: 'work',
    title: 'Frontend Developer',
    org: 'KreditBee',
    place: 'Bengaluru, India',
    period: 'Mar 2025 – Dec 2025',
    points: [
      'Designed and built interactive, responsive user interfaces for a large-scale digital lending platform.',
      'Worked with the engineering team to improve UI/UX, optimise performance and deliver seamless user journeys.',
    ],
    tags: ['React', 'TypeScript', 'Redux', 'AWS'],
  },
  {
    kind: 'work',
    title: 'Software Developer Intern',
    org: 'Atyaf eSolutions W.L.L.',
    place: 'Muharraq, Bahrain',
    period: 'Jun 2024 – Jul 2024',
    points: [
      'Contributed across front-end and full-stack phases of client projects.',
      'Helped lift overall project efficiency; the project shipped ahead of schedule.',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
  },
  {
    kind: 'education',
    title: 'B.Tech, Electronics & Computer Engineering',
    org: 'Amrita Vishwa Vidyapeetham',
    place: 'Bengaluru, India',
    period: '2021 – 2025',
    points: [
      'Senior Executive, ECCF Club · Volunteered hosting the Electronica hackathon.',
      '2nd prize, Inter-Department Quiz Competition.',
    ],
    tags: ['CGPA 7.58'],
  },
]

export type Project = {
  id: string
  title: string
  blurb: string
  details: string[]
  category: 'Speech AI' | 'Computer Vision' | 'Machine Learning' | 'NLP' | 'IoT'
  year: string
  tags: string[]
  metric?: string
  github?: string
  paper?: string
  featured?: boolean
  hue: number // accent hue for the card art
}

export const projects: Project[] = [
  {
    id: 'global-accent',
    title: 'Global English Accent Recognition',
    blurb:
      'Deep-learning system that identifies 16 international English accents from speech, deployed as a real-time web app.',
    details: [
      'Speech embeddings from ECAPA-TDNN and LightHuBERT feed an MLP classifier.',
      'Class-imbalance handled with data-balancing techniques; macro F1-scores above 0.80.',
      'Wrapped in a real-time web interface for language-learning and customer-service use cases.',
      'Published at the 16th IEEE ICCCNT (2025).',
    ],
    category: 'Speech AI',
    year: '2025',
    tags: ['Python', 'ECAPA-TDNN', 'LightHuBERT', 'Deep Learning', 'Web App'],
    metric: 'F1 > 0.80',
    paper: 'IEEE ICCCNT 2025',
    featured: true,
    hue: 265,
  },
  {
    id: 'indian-accent',
    title: 'Indian English Accent Recognition',
    blurb:
      'Regional accent detection across 16 Indian accents using MFCC features and a head-to-head of classical ML and deep models.',
    details: [
      'Built on the Indic TTS dataset with MFCC feature extraction.',
      'Compared SVM, Random Forest, CNN and LSTM models.',
      'Validated with stratified 10-fold cross-validation for robust results.',
    ],
    category: 'Speech AI',
    year: '2024',
    tags: ['Python', 'MFCC', 'CNN', 'LSTM', 'SVM'],
    metric: '16 accents',
    hue: 200,
  },
  {
    id: 'agritalk',
    title: 'AgriTalk: Multilingual Farming Chatbot',
    blurb:
      'A voice-enabled chatbot that answers farmers’ questions in multiple Indian languages.',
    details: [
      'Detects and translates queries across English, Hindi, Malayalam, Tamil, Kannada, Telugu and Bengali.',
      'IndicTrans2 / neural translation with gTTS voice replies in the user’s language.',
      'Streamlit interface built for farmers who aren’t comfortable in English.',
      'Published at the 8th Intl. Conference on Electronics, Materials Engineering & Nano-Technology (2025).',
    ],
    category: 'NLP',
    year: '2024',
    tags: ['Python', 'NLP', 'IndicTrans2', 'gTTS', 'Streamlit'],
    metric: '7 languages',
    github: 'https://github.com/Abhishek007-7/Multi-Lingual-Chatbot-for-Agricultural-Assistance',
    paper: 'Published · 2025',
    featured: true,
    hue: 145,
  },
  {
    id: 'attendance',
    title: 'AI-Driven Attendance Tracking',
    blurb:
      'Automatic attendance logging with face detection and recognition, no roll-call needed.',
    details: [
      'Haar Cascade / Dlib face detection with ResNet-based face embeddings for recognition.',
      '91.6% recognition accuracy; attendance records stored in SQLite with a web view.',
      'Tkinter app for registering new faces straight from the webcam.',
      'Cuts manual effort and human error in attendance logging.',
      'Published at the Intl. Conference on Machine Learning and Data Engineering (2024).',
    ],
    category: 'Computer Vision',
    year: '2024',
    tags: ['Python', 'ResNet', 'OpenCV', 'Dlib', 'SQLite'],
    metric: '91.6% acc.',
    github: 'https://github.com/Abhishek007-7/Face-Recognition-Based-Attendance-System',
    paper: 'Published · 2024',
    featured: true,
    hue: 20,
  },
  {
    id: 'autism',
    title: 'Autism Spectrum Disorder Prediction',
    blurb:
      'ML screening tool that predicts whether a child may have ASD, served through an interactive Streamlit app.',
    details: [
      'Supervised models (SVM and an ensemble-stacking approach) trained on an ASD screening dataset.',
      'Exploratory analysis with pandas, seaborn and Plotly.',
      'Streamlit front end with user registration backed by SQLite.',
    ],
    category: 'Machine Learning',
    year: '2023',
    tags: ['Python', 'scikit-learn', 'SVM', 'Streamlit'],
    github: 'https://github.com/Abhishek007-7/Autism-Prediction-System',
    hue: 320,
  },
  {
    id: 'accident',
    title: 'Vehicle Accident Detection & Tracking',
    blurb:
      'Arduino system that detects a crash and texts the vehicle’s GPS location, with seat-belt and alcohol checks built in.',
    details: [
      'Vibration sensor detects impacts; an SMS alert with GPS coordinates goes out via GSM.',
      'Infrared seat-belt detection and alcohol sensing before the drive starts.',
      '16x2 LCD status display; full circuit simulated in Proteus.',
    ],
    category: 'IoT',
    year: '2023',
    tags: ['Arduino', 'C', 'GPS', 'GSM', 'Proteus'],
    github: 'https://github.com/Abhishek007-7/Vehicle-Accident-Detection-System',
    hue: 45,
  },
]

export const publications = [
  {
    title: 'Speech Embedding-Based Classification of Global English Accents Using ECAPA-TDNN and LightHuBERT',
    venue: '16th International IEEE Conference on Computing, Communication and Networking Technologies (ICCCNT)',
    date: 'Jul 2025',
    summary:
      'Recognises 16 global English accents using ECAPA-TDNN and LightHuBERT embeddings with imbalance handling, achieving macro F1 above 0.80.',
  },
  {
    title: 'AgriTalk: Revolutionizing Farming with a Multilingual Chatbot',
    venue: '8th International Conference on Electronics, Materials Engineering & Nano-Technology',
    date: 'Feb 2025',
    summary:
      'A multilingual agricultural assistant combining NLP, IndicTrans2 translation and text-to-speech for Indian languages.',
  },
  {
    title: 'AI-Driven Attendance Tracking with Haar Cascade and ResNet',
    venue: 'International Conference on Machine Learning and Data Engineering',
    date: 'Nov 2024',
    summary:
      'Automated attendance using ResNet-50 and Haar Cascade facial recognition, reaching 91.6% accuracy with SQLite storage.',
  },
]

export const skills = [
  {
    group: 'AI & Machine Learning',
    items: ['Python', 'Deep Learning', 'Speech Processing', 'scikit-learn', 'OpenCV', 'Streamlit', 'Computer Vision', 'NLP', 'CNN / LSTM', 'ECAPA-TDNN', 'HuBERT', 'ResNet', 'SVM / Random Forest', 'MFCC'],
  },
  {
    group: 'Frontend & Web',
    items: ['React', 'TypeScript', 'JavaScript', 'Redux', 'HTML', 'CSS', 'Bootstrap'],
  },
  {
    group: 'Cloud & Systems',
    items: ['AWS', 'Linux', 'Networking (CCNA)', 'Cisco Packet Tracer', 'SQL / SQLite'],
  },
  {
    group: 'Embedded & Engineering',
    items: ['C', 'C++', 'Arduino', 'MATLAB', 'Keil IDE', 'Proteus', 'Multisim', 'AutoCAD'],
  },
]

export const certifications = [
  { name: 'CCNA', issuer: 'Cisco Networking Academy' },
  { name: 'AWS Academy Cloud Foundations', issuer: 'Amazon Web Services' },
  { name: 'Energy Literacy', issuer: 'Energy Swaraj Foundation' },
  { name: 'Web Development', issuer: 'Udemy' },
]

export const marquee = [
  'Python', 'Deep Learning', 'React', 'TypeScript', 'Machine Learning', 'Computer Vision', 'NLP', 'AWS', 'Redux', 'C++', 'Arduino', 'Linux',
]
