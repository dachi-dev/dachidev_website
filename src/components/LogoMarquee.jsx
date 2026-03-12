export default function LogoMarquee() {
  const companies = [
    { name: "Socket", logo: "https://socket.dev/_next/image?url=%2Fimages%2Flogo-280x80.png&w=256&q=75" },
    { name: "Nodies", logo: "https://www.nodies.app/_next/image?url=%2Fimages%2Fnodies-logo-dark.png&w=256&q=75" },
    { name: "Amazon Web Services", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
    { name: "CGI Federal", logo: "https://upload.wikimedia.org/wikipedia/commons/3/32/CGI_logo.svg" },
    { name: "Pocket Network", logo: "https://pocket.network/wp-content/uploads/2025/01/logo-white.png" },
  ];

  // Double the list for seamless loop
  const items = [...companies, ...companies];

  return (
    <div className="logo-marquee-wrapper">
      <span className="marquee-label">Previously at</span>
      <div className="logo-marquee">
        <div className="logo-marquee-track">
          {items.map((company, i) => (
            <div key={i} className="logo-marquee-item">
              <img
                src={company.logo}
                alt={company.name}
                className="logo-marquee-img"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
