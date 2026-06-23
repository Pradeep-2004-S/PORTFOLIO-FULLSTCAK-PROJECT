import { useState } from 'react';

const projects = [
  {
    numb: '01',
    title: 'Frontend Project',
    desc: 'During my internship, I worked on a web development project focused on creating responsive and user-friendly websites using HTML, CSS, and JavaScript. The project helped me understand real-world development practices.',
    tech: 'HTML, CSS, JavaScript',
    live: 'https://pradeep-2004-s.github.io/intern-propject/',
    github: 'https://github.com/Pradeep-2004-S/intern-propject',
    img: '/img/internproject.jpg',
  },
  { numb: '02', title: 'Bookskey',
     desc: 'Built a dynamic book management system using HTML, CSS, and JavaScript. Enabled users to add and delete book details while maintaining a clean and user-friendly design.', 
     tech: 'Html, CSS , JavaScript', 
     live: ' https://pradeep-2004-s.github.io/minproject/', github: 'https://github.com/Pradeep-2004-S/minproject.git', 
     img: '/img/bookskey_project.jpeg' },

  { numb: '03', title: 'MERN Project', desc: 'Processing...', tech: 'MongoDB, Express, React, Node.js', live: '#', github: '#', img: '/img/orege.png' },
  { numb: '04', title: 'UI Design', desc: 'Processing...', tech: 'Figma, CSS', live: '#', github: '#', img: '/img/purple.png' },
  { numb: '05', title: 'API Project', desc: 'Processing...', tech: 'Node.js, Express, MongoDB', live: '#', github: '#', img: '/img/purple.png' },
  { numb: '06', title: 'Mobile App UI', desc: 'Processing...', tech: 'React Native', live: '#', github: '#', img: '/img/purple.png' },
  { numb: '07', title: 'Next.js Project', desc: 'Processing...', tech: 'Next.js, Tailwind', live: '#', github: '#', img: '/img/purple.png' },
];

export default function Portfolio({ isActive }) {
  const [index, setIndex] = useState(0);

  const goRight = () => {
    if (index < projects.length - 1) setIndex((i) => i + 1);
  };
  const goLeft = () => {
    if (index > 0) setIndex((i) => i - 1);
  };

  const slideStyle = {
    transform: `translateX(calc(${index * -100}% - ${index * 2}rem))`,
  };

  return (
    <section className={`portfolio ${isActive ? 'active' : ''}`}>
      <h2 className="heading">
        Latest <span>Projects</span>
      </h2>
      <div className="portfolio-container">
        {/* Details */}
        <div className="portfolio-box">
          {projects.map((proj, i) => (
            <div key={proj.numb} className={`portfolio-details ${i === index ? 'active' : ''}`}>
              <p className="numb">{proj.numb}</p>
              <h3>{proj.title}</h3>
              <p>{proj.desc}</p>
              <div className="tech">
                <p>{proj.tech}</p>
              </div>
              <div className="live-github">
                <a href={proj.live} target="_blank" rel="noreferrer">
                  <i className="bx bx-arrow-back" />
                  <span>Live Project</span>
                </a>
                <a href={proj.github} target="_blank" rel="noreferrer">
                  <i className="bx bxl-github" />
                  <span>GitHub Repo</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel */}
        <div className="portfolio-box">
          <div className="portfolio-carousel">
            <div className="img-slide" style={slideStyle}>
              {projects.map((proj) => (
                <div className="img-item" key={proj.numb}>
                  <img src={proj.img} alt={proj.title} />
                </div>
              ))}
            </div>
          </div>
          <div className="navigation">
            <button
              className={`arrow-left ${index === 0 ? 'disabled' : ''}`}
              onClick={goLeft}
            >
              <i className="bx bx-chevron-left" />
            </button>
            <button
              className={`arrow-right ${index === projects.length - 1 ? 'disabled' : ''}`}
              onClick={goRight}
            >
              <i className="bx bx-chevron-right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
