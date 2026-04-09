import "./LandingPage.css";
import AnimatedShowcase from "./AnimatedShowcase";
import Logo from "@/components/Logo";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const LandingPage = () => {

   const Item = ({ img, title, desc }) => (
  <div className="compact-item">
    <img src={img} alt={title} />
    <div className="compact-content">
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  </div>
);


  return (
    <div className="landing">

      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <h1>
              Create Professional Invoices <br />
              <span>In Minutes, Not Hours</span>
            </h1>
            <p>
              A simple invoice generator for freelancers, startups,
              and small businesses. Create, manage, and send invoices
              with confidence.
            </p>
            <div className="actions">
              <button className="btn primary">Get Started Free</button>
              <button className="btn secondary">View Demo</button>
            </div>
          </div>

          <div className="hero-preview">
            <div className="preview-header"></div>
            <div className="preview-line"></div>
            <div className="preview-line short"></div>
            <div className="preview-total"></div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section">
        <h2 className="section-title">Everything You Need to Invoice Faster</h2>
        <p className="section-subtitle">
          Built to handle invoicing from start to finish.
        </p>

        <div className="container grid">
          <Feature title="Quick Invoice Creation" desc="Create invoices in less than a minute with smart defaults." />
          <Feature title="PDF Download" desc="Download and share invoices instantly as PDFs." />
          <Feature title="Client Management" desc="Store and reuse client details without retyping." />
          <Feature title="Tax & GST Support" desc="Easily add GST, tax rates, and totals automatically." />
          <Feature title="Secure Data" desc="Your invoices and data are encrypted and safe." />
          <Feature title="Access Anywhere" desc="Cloud-based system accessible from any device." />
        </div>
      </section>

      {/* GET STARTED */}
      <section className="section light">
        <h2 className="section-title">Get Started in 4 Simple Steps</h2>

        <div className="container steps-grid">
          <Step number="01" title="Create Account" desc="Sign up using your email and set up your workspace." />
          <Step number="02" title="Add Details" desc="Enter your business and client information once." />
          <Step number="03" title="Generate Invoice" desc="Add items, taxes, and customize your invoice." />
          <Step number="04" title="Send or Download" desc="Download PDF or send invoice directly to clients." />
        </div>
      </section>

      {/* /////////////////// */}
    <AnimatedShowcase />

      {/* CTA */}
      <section className="cta">
        <h2>Start Invoicing Smarter Today</h2>
        <p>No credit card required. Free plan available.</p>
        <button className="btn primary">Create Free Invoice</button>
      </section>

      {/* FOOTER */}

<footer className="footer">
  <div className="footer-container">

    {/* LEFT */}
    <div className="footer-left">
      <Logo x={30} y={30} />
      <p>
        © {new Date().getFullYear()} Invoice Generator. <br />
        Built by a Freelance Developer.
      </p>
    </div>

    {/* RIGHT - SOCIAL ICONS */}
    <div className="footer-socials">
      <a
        href="https://github.com/yourusername"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
      >
        <FaGithub />
      </a>

      <a
        href="https://www.linkedin.com/in/yourusername"
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
      >
        <FaLinkedin />
      </a>

      <a
        href="https://twitter.com/yourusername"
        target="_blank"
        rel="noreferrer"
        aria-label="Twitter"
      >
        <FaTwitter />
      </a>

      <a
        href="mailto:yourmail@gmail.com"
        aria-label="Email"
      >
        <FaEnvelope />
      </a>
    </div>

  </div>
</footer>

    </div>
  );
};

const Feature = ({ title, desc }) => (
  <div className="feature-card">
    <h3>{title}</h3>
    <p>{desc}</p>
  </div>
);

const Step = ({ number, title, desc }) => (
  <div className="step-card">
    <span className="step-number">{number}</span>
    <h3>{title}</h3>
    <p>{desc}</p>
  </div>
);

export default LandingPage;