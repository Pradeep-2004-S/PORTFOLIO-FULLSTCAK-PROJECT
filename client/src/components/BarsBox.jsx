export default function BarsBox({ animating }) {
  return (
    <div className={`bars-box ${animating ? 'active' : ''}`}>
      {[6, 5, 4, 3, 2, 1].map((i) => (
        <div key={i} className="bar" style={{ '--i': i }} />
      ))}
    </div>
  );
}
