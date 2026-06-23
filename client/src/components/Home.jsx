export default function Home({ isActive }) {
  return (
    <section className={`home ${isActive ? 'active' : ''}`}>
      <div className="home-details">
        <h1>Pradeep S</h1>
        <h2>
          I&apos;m a&nbsp;
          <span style={{ '--i': 4 }} data-text="Coder">Coder</span>
          <span style={{ '--i': 3 }} data-text="Youtuber">Youtuber</span>
          <span style={{ '--i': 2 }} data-text="Video Editor">Video Editor</span>
          <span style={{ '--i': 1 }} data-text="Designer">Designer</span>
        </h2>
        <p>
          

          I’m a passionate MERN Stack Developer skilled in building responsive and scalable web applications using MongoDB, Express.js, React JS, and Node.js. I enjoy creating modern user interfaces, developing efficient backend systems, and building real-world projects that deliver seamless user experiences
        </p>
        <div className="btn-sci">
          <a
            href="https://drive.google.com/file/d/1brIbFYPRPjMPy6EUeTdckl0LHPLLTvG_/view?usp=drivesdk"
            className="btn"
            target="_blank"
            rel="noreferrer"
          >
            Download CV
          </a>
          <div className="sci">
            <a href="https://github.com/Pradeep-2004-S" target="_blank" rel="noreferrer">
              <i className="bx bxl-github" />
            </a>
            <a
              href="https://www.linkedin.com/in/pradeeps07"
              target="_blank"
              rel="noreferrer"
            >
              <i className="bx bxl-linkedin-square" />
            </a>
            <a
              href="https://www.instagram.com/pradeep_p0705"
              target="_blank"
              rel="noreferrer"
            >
              <i className="bx bxl-instagram-alt" />
            </a>
            <a
              href="https://www.youtube.com/@kratos2.0gamer29"
              target="_blank"
              rel="noreferrer"
            >
              <i className="bx bxl-youtube" />
            </a>
          </div>
        </div>
      </div>

      <div className="home-img">
        <div className="img-box">
          <div className="img-item">
            {/* Replace src with your actual image path inside /public/img/ */}
            <img src="/img/pradeep_img1.png" alt="Pradeep S" />
           
          </div>
        </div>
      </div>
    </section>
  );
}
