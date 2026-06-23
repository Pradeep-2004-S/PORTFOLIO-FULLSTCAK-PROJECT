import { useState } from 'react';

const tabs = ['Experience', 'Education', 'Skills', 'About Me'];

const experience = [
  { year: '2025', role: 'JavaScript with React Training', company: 'Unique Technology', desc: 'Completed hands-on training in JavaScript and React JS, building responsive user interfaces and applying UI/UX design principles through practical projects..' },
  { year: '2024 - 2025', role: 'Web Development Intern |', company: 'Kinfo Cloud', desc: 'pages using HTML, CSS, and JavaScript, while utilizing Git and GitHub for version control and collaborative development..' },
  // { year: '2024 - 2026', role: 'Backend Development', company: 'YouTube', desc: 'Designed RESTful APIs and integrated third-party services for a streaming platform.' },
  // { year: '2024 - 2026', role: 'UI/UX Designer', company: 'Symposium', desc: 'Prototyped and wireframed user journeys in Figma for multiple client projects.' },
];

const education = [
  { year: '2022 - 2026', role: 'B.E. Computer Science', company: 'CGPA-7.89', desc: 'Pursuing a degree with focus on software development and data structures.' },
  { year: '2020 - 2022', role: 'Higher Secondary (12th)', company: 'PERCENTAGE-55%', desc: 'Studied Biology and Mathematics, strengthening problem-solving, critical thinking, and quantitative analysis skills.' },
  { year: '2018 - 2020', role: 'Secondary (10th)', company: 'PERCENTAGE-72%', desc: 'Successfully completed SSLC, building a solid foundation in Mathematics, Science, and critical thinking.' },
];

// const skills = [
//   { icon: 'bxl-html5', label: 'HTML5' },
//   { icon: 'bxl-css3', label: 'CSS3' },
//   { icon: 'bxl-javascript', label: 'JavaScript' },
//   { icon: 'bxl-react', label: 'React' },
//   { icon: 'bxl-nodejs', label: 'Node.js' },
//   { icon: 'bxl-mongodb', label: 'MongoDB' },
//   { icon: 'bxl-git', label: 'Git' },
//   { icon: 'bxl-github', label: 'GitHub' },
//   { icon: 'bxl-figma', label: 'Figma' },
  
// ];

const skills = [
  { icon: 'bxl-html5', label: 'HTML5' },
  { icon: 'bxl-css3', label: 'CSS3' },
  { icon: 'bxl-javascript', label: 'JavaScript' },
  { icon: 'bxl-react', label: 'React' },
  { icon: 'bxl-nodejs', label: 'Node.js' },
  { icon: 'bxl-mongodb', label: 'MongoDB' },
  { icon: 'bx-server', label: 'Express.js' },
  { icon: 'bxl-python', label: 'Python' },
  { icon: 'bxl-git', label: 'Git' },
  { icon: 'bxl-github', label: 'GitHub' },
  { icon: 'bxl-figma', label: 'Figma' }
];

const about = [
  { label: 'Name', value: 'Pradeep S' },
  { label: 'Phone', value: '(+91) 9384494216' },
  { label: 'Email', value: 'pradeepp54980@gmail.com' },
  { label: 'Location', value: 'Ambur' },
  { label: 'Languages', value: 'Tamil, English' },
  { label: 'Freelance', value: 'Available' },
];

export default function Resume({ isActive }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className={`resume ${isActive ? 'active' : ''}`}>
      <div className="resume-container">
        {/* Left column – buttons */}
        <div className="resume-box">
          <h2>Why Hire Me?</h2>
          <p className="desc">
            I bring passion, adaptability, and a keen eye for detail to every project I work on.
          </p>
          {tabs.map((tab, i) => (
            <button
              key={tab}
              className={`resume-btn ${activeTab === i ? 'active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Right column – details */}
        <div className="resume-box">
          {/* Experience */}
          <div className={`resume-details experience ${activeTab === 0 ? 'active' : ''}`}>
            <h2 className="heading">
              My <span>Experience</span>
            </h2>
            <p className="desc">A journey of continuous learning and building impactful solutions.</p>
            <div className="resume-list">
              {experience.map((exp) => (
                <div className="resume-item" key={exp.role + exp.year}>
                  <p className="year">{exp.year}</p>
                  <h3>{exp.role}</h3>
                  <p className="company">{exp.company}</p>
                  <p>{exp.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className={`resume-details ${activeTab === 1 ? 'active' : ''}`}>
            <h2 className="heading">
              My <span>Education</span>
            </h2>
            <p className="desc">Building a strong foundation through academic excellence.</p>
            <div className="resume-list">
              {education.map((edu) => (
                <div className="resume-item" key={edu.role + edu.year}>
                  <p className="year">{edu.year}</p>
                  <h3>{edu.role}</h3>
                  <p className="company">{edu.company}</p>
                  <p>{edu.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className={`resume-details skills ${activeTab === 2 ? 'active' : ''}`}>
            <h2 className="heading">
              My <span>Skills</span>
            </h2>
            <p className="desc">Technologies I work with every day.</p>
            <div className="resume-list">
              {skills.map((sk) => (
                <div className="resume-item" key={sk.label}>
                  <i className={`bx ${sk.icon}`} />
                  <span>{sk.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* About Me */}
          <div className={`resume-details about ${activeTab === 3 ? 'active' : ''}`}>
            <h2 className="heading">
              About <span>Me</span>
            </h2>
            <p className="desc">A snapshot of who I am.</p>
            <div className="resume-list">
              {about.map((item) => (
                <div className="resume-item" key={item.label}>
                  <p>
                    {item.label}:<span>{item.value}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
