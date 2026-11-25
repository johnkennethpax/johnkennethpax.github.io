// Single source of truth for all portfolio and CV content.
// Edit text here; both the portfolio (/) and the CV page (/resume/) render from it.

export interface Entry {
  title: string;
  org?: string;
  dates?: string;
  badge?: string;
  bullets?: string[];
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export const profile = {
  name: 'John Kenneth S. Paco',
  shortName: 'Ken Paco',
  headline: 'BS Electrical Engineering | DOLE Safety Officer 2',
  summary: [
    'I build embedded and IoT systems, from sensor interfacing and power design to firmware and on-device signal processing.',
    "I'm currently leading my undergraduate thesis at St. Peter's College: an RP2040 acoustic sensor that detects chainsaws with TinyML and sends alerts over LoRa.",
  ],
  location: 'Iligan City, Philippines',
  email: 'johnkennethpax@gmail.com',
  github: 'https://github.com/johnkennethpax',
  linkedin: 'https://www.linkedin.com/in/johnkennethpaco/',
  linkedinLabel: 'linkedin.com/in/johnkennethpaco',
  cvPdf: '/John-Kenneth-Paco-CV.pdf',
  headshot: '/img/headshot.webp',
};

export const about = {
  text:
    "I am an Electrical Engineering undergraduate at St. Peter's College, Iligan City, expected to graduate in 2027. I build embedded and IoT projects, including an edge-based acoustic system that detects chainsaw activity and sends alerts over LoRa. I also serve in my engineering student organization and as an SK Councilor in Barangay Acmac.",
  facts: [
    { label: 'Based in', value: 'Iligan City, PH' },
    { label: 'Focus', value: 'Embedded · IoT · DSP' },
    { label: 'Safety', value: 'DOLE COSH SO2' },
    { label: 'Next', value: 'OJT · Dec 2026' },
  ],
};

export const education: Entry[] = [
  { title: 'Bachelor of Science in Electrical Engineering', org: "St. Peter's College, Iligan City", dates: '2024 – Expected 2027' },
  { title: 'Electronics Engineering (Transferred)', org: 'Mindanao State University – Iligan Institute of Technology', dates: '2022 – 2024' },
];

export const academicWork: string[] = [
  'IEEE-format report on distributed generation (Electrical Power Systems Quality)',
  'PowerWorld Simulator experiments (Power Systems Analysis Lab)',
  'Group report on the schematic arrangement of a diesel power station',
];

export const thesis = {
  title: 'Acoustic Event Detection for Illegal Logging Prevention',
  subtitle: 'using Spectral Analysis and LoRa Technology',
  status: 'In progress',
  role: 'Undergraduate thesis · Thesis lead',
  team: 'Paco (thesis lead), Cabatino, Dador',
  summary:
    'A battery-powered Raspberry Pi Pico (RP2040) sensor node listens for 2-stroke chainsaws, classifies the sound on the device, and sends an alert over LoRa without cellular or internet service. Working prototype; I lead the project and handle the hardware design, firmware development, and system integration.',
  cvBullets: [
    'Led the hardware design, firmware development, and system integration of a battery-powered Raspberry Pi Pico (RP2040) sensor node and LoRa receiver.',
    'Built an on-device audio pipeline (DMA sampling, FFT-based MFE features, int8 CNN from Edge Impulse) that classifies chainsaw, noise, and unknown sounds.',
    'Built a LoRa point-to-point (SX1276, 923 MHz) alert link, designed for a 1 km off-grid range.',
  ],
  specs: [
    { label: 'MCU', value: 'RP2040' },
    { label: 'Classifier', value: 'int8 CNN · 3 classes' },
    { label: 'Radio', value: 'LoRa 923 MHz P2P' },
    { label: 'Link (target)', value: '≤ 1 km' },
  ],
  tags: ['RP2040', 'C++', 'DMA', 'FFT', 'MFE', 'Edge Impulse', 'TinyML', 'LoRa 923 MHz', 'SX1276 · SPI', 'Li-ion power'],
  problem: 'Remote forests often lack cellular coverage, and satellite monitoring detects forest loss only after it happens.',
  solution:
    'A sensor node listens for 2-stroke chainsaws, classifies the sound on the device, and sends an alert over LoRa without cellular or internet service.',
  steps: [
    'A GY-MAX4466 microphone captures ambient sound.',
    'A Raspberry Pi Pico (RP2040) samples the audio using DMA.',
    'FFT-based Mel-filterbank energy (MFE) features are extracted.',
    'A quantized int8 CNN, built in Edge Impulse, classifies three classes: chainsaw, noise, and unknown.',
    'An SX1276 LoRa module sends the alert peer-to-peer at 923 MHz.',
    'A Pico and LoRa receiver connects to a laptop over USB.',
  ],
  hardware: [
    {
      label: 'Power',
      text: "Each node runs from an 18650 Li-ion cell charged through a TP4056 USB-C module. The TP4056 output feeds the Pico's VSYS input through a 1N4007 diode, and the Pico's 3.3 V output powers the microphone and LoRa modules.",
    },
    { label: 'Audio', text: "The MAX4466 output feeds the RP2040's ADC (GP26 / ADC0)." },
    { label: 'Radio', text: 'The SX1276 connects over SPI (GP16 to GP19), with DIO0 and RST on GP20 and GP21.' },
  ],
  targets: ['Detection radius of 80–150 m per node', 'LoRa link of up to 1 km'],
  challenge:
    "The transmitter gave false alerts in rain. The planned fix is to record rain audio through the transmitter itself and add it to the classifier's training data.",
  nextSteps: ['PCB design', 'Better antennas', 'Enclosures', 'Field testing', 'Receiver dashboard: status, alert log, RSSI, location, alarm'],
  schematics: [
    { src: '/img/thesis/schematic-transmitter.png', alt: 'Transmitter node schematic drawn in EasyEDA', caption: 'Transmitter' },
    { src: '/img/thesis/schematic-receiver.png', alt: 'Receiver node schematic drawn in EasyEDA', caption: 'Receiver' },
  ],
  cover: {
    src: '/img/thesis/nodes-side-by-side-sm.webp',
    srcSet: '/img/thesis/nodes-side-by-side-sm.webp 635w, /img/thesis/nodes-side-by-side.webp 1412w',
    alt: 'Transmitter and receiver nodes on breadboards: Raspberry Pi Pico boards, SX1276 LoRa modules with coil antennas, and TP4056 charging modules',
  },
  gallery: [
    { name: 'transmitter-node', w: 540, h: 720, alt: 'Transmitter node on breadboard with microphone module, LoRa module and charger' },
    { name: 'receiver-node', w: 540, h: 720, alt: 'Receiver node on breadboard with Raspberry Pi Pico H and LoRa module' },
    { name: 'transmitter-breadboard', w: 540, h: 720, alt: 'Early transmitter breadboard prototype' },
    { name: 'lora-module-soldered', w: 443, h: 720, alt: 'Close-up of hand-soldered leads on the SX1276 LoRa module' },
    { name: 'bench-testing', w: 692, h: 720, alt: 'Bench testing both nodes with a multimeter and an 18650 battery' },
  ],
};

export const experience: Entry[] = [
  { title: 'On-the-Job Trainee', badge: 'Upcoming', dates: 'Dec 2026 – Jan 2027' },
  {
    title: 'Vice President – External and Technical',
    org: "IIEE-CSC SPC Chapter, St. Peter's College",
    dates: 'AY 2025 – 2027',
    bullets: [
      'Secured a partnership with Macapagal Review and Training Center, coordinating a review program orientation for 200+ EE students during the department general assembly.',
      'Organized hardware interfacing workshops for 200+ student participants, managing logistics and event execution.',
      "Led the chapter's publicity and social media operations, producing pubmats and tarpaulins for every chapter event.",
      "Designed the chapter's new logo, establishing a consistent visual identity across its publications.",
    ],
  },
  {
    title: 'SK Councilor and Budget Monitoring Officer',
    org: 'Barangay Acmac, Iligan City',
    dates: 'Oct 2023 – Present',
    bullets: [
      'Monitored approximately PHP 1,200,000 in youth council funds and program expenditures serving around 600 youth constituents.',
      'Initiated a job fair forum under the Committee on Economic Empowerment to connect local youth with employment opportunities.',
      'Implemented youth programs, including financial assistance for selected high school and college students, study kits and meals for MSU-SASE takers, and fiesta sports activities.',
      'Arranged venues, logistics, and supplies for barangay youth assemblies and outreach activities.',
      'Reviewed project proposals and purchase requests to keep spending practical and focused on youth needs.',
    ],
  },
];

export const skills: SkillGroup[] = [
  { label: 'Electrical & Hardware', items: ['Circuit assembly', 'Wiring', 'Sensor interfacing', 'Troubleshooting', 'PEC'] },
  { label: 'Embedded Systems', items: ['Arduino', 'RP2040', 'C++', 'I2C', 'SPI', 'UART', 'LoRa 923 MHz'] },
  { label: 'Signal Processing & ML', items: ['FFT', 'DMA sampling', 'Edge Impulse', 'TinyML'] },
  { label: 'Software & Tools', items: ['Python', 'Git', 'QGIS', 'LaTeX', 'Excel', 'Word'] },
  { label: 'Safety', items: ['DOLE COSH SO2'] },
  { label: 'Creative', items: ['Canva', 'Publicity material design', 'Logo design'] },
];

// Wording used on the CV page (kept identical to the resume PDF).
export const cvSkills: { label: string; items: string }[] = [
  { label: 'Electrical and Hardware', items: 'Circuit Assembly, Wiring, Sensor Interfacing, Troubleshooting' },
  { label: 'Embedded Systems', items: 'Arduino, Raspberry Pi Pico (RP2040), I2C, SPI, UART, C++, Fast Fourier Transform (FFT)' },
  { label: 'Signal Processing and ML', items: 'DMA sampling, Edge Impulse, TinyML' },
  { label: 'Software and Tools', items: 'Python, Git, QGIS, LaTeX, Microsoft Excel, Microsoft Word' },
  { label: 'Safety', items: 'Construction Occupational Safety and Health (COSH) SO2' },
];

export const certifications: Entry[] = [
  { title: '40-Hour COSH Training with 2-Hour Training of Trainers (Safety Officer 2)', org: 'Serendipity MPC (DOLE-Accredited)', dates: 'Oct 2026' },
  { title: 'Procore Construction Management Professional Certificate', org: 'Procore Technologies', dates: 'Feb 2026' },
  { title: 'Become an Arduino Developer Learning Path', org: 'LinkedIn Learning', dates: 'Feb 2026' },
  { title: 'Excel for Engineering Professionals', org: 'LinkedIn Learning', dates: 'Jan 2026' },
];

export const awards: Entry[] = [
  { title: 'Quizzer, 39th Regional Quiz Show', org: '21st RSCON', dates: 'Oct 2026' },
  { title: 'Second Runner-up, 24th Regional Math Wizard', org: '20th RSCON', dates: 'Oct 2025' },
];

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'credentials', label: 'Certifications' },
] as const;
