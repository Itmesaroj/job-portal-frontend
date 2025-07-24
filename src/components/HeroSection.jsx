import hero1 from "../images/hero-1.png"

function HeroSection() {
  return (
    <>
    <section className="hero">

  <div className="hero-text">
    <h1 className="animate-text">Find Your Dream Job Today</h1>
    <h4 className="animate-subtext">
      Connecting Talent with Opportunities Across the Nation for Every Skill
      Level
    </h4>
    <button className="cta-button">
      <span>Get Started</span>
    </button>
  </div>
  <div className="hero-image">
    <img src={hero1} alt="Dream Job" />
  </div>
</section>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="waves"><path fill="#1e0029" fillOpacity="1" d="M0,192L48,165.3C96,139,192,85,288,101.3C384,117,480,203,576,245.3C672,288,768,288,864,256C960,224,1056,160,1152,149.3C1248,139,1344,181,1392,202.7L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
    </>
  )
}

export default HeroSection
