const services = [
  { icon: 'bx-code-alt', title: 'Web Development', desc: 'Building responsive, modern websites with the latest web technologies and best practices.' },
  { icon: 'bx-brush', title: 'UI/UX Design', desc: 'Creating intuitive user interfaces and seamless user experiences that delight and engage.' },
  { icon: 'bx-palette', title: 'Graphical Design', desc: 'Crafting visually stunning graphics, logos, and brand identities that stand out.' },
  { icon: 'bx-trending-up', title: 'SEO', desc: 'Optimising websites to rank higher on search engines and drive organic traffic.' },
  { icon: 'bx-slideshow', title: 'Video Editing', desc: 'Professional video editing with colour grading, effects, and smooth transitions.' },
  { icon: 'bx-camera', title: 'Photo Editing', desc: 'Retouching and enhancing photos to achieve a professional and polished look.' },
];

export default function Service({ isActive }) {
  return (
    <section className={`service ${isActive ? 'active' : ''}`}>
      <h2 className="heading">
        My <span>Services</span>
      </h2>
      <div className="service-container">
        {services.map((svc) => (
          <div className="service-box" key={svc.title}>
            <div className="icon">
              <i className={`bx ${svc.icon}`} />
              <a href="#">
                <i className="bx bx-arrow-back" />
              </a>
            </div>
            <h3>{svc.title}</h3>
            <p>{svc.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
