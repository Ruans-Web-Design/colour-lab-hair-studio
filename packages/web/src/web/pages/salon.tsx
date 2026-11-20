import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { TestimonialCarousel } from "../components/testimonial-carousel";
import {
  ArrowUpRight,
  ArrowRight,
  Phone,
  Menu,
  X,
  Star,
  MapPin,
  Instagram,
  Facebook,
  Plus,
  Mail,
  ChevronLeft,
  ChevronRight,
  Scissors,
} from "lucide-react";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const phone = "tel:+27448734787";
const maps = "https://www.google.com/maps?cid=3379725071183913766";
const instagram = "https://www.instagram.com/colour_lab_hair_studio/";
const facebook = "https://www.facebook.com/hsecolourlab/";
const nav = [
  ["/", "Home"],
  ["/contact", "Contact"],
];
export function External({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}
export function Button({
  to,
  children,
  light = false,
}: {
  to?: string;
  children?: React.ReactNode;
  light?: boolean;
}) {
  return to ? (
    <Link href={to} className={`button ${light ? "light" : ""}`}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  ) : (
    <a href={phone} className={`button ${light ? "light" : ""}`}>
      {children || "Call to book"}
      <ArrowUpRight size={17} />
    </a>
  );
}
function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Colour Lab home">
      <img src={asset("/images/logo-facebook.jpg")} alt="Colour Lab circular monogram" />
      <span>
        COLOUR LAB<small>HAIR STUDIO · GEORGE</small>
      </span>
    </Link>
  );
}
export function Layout({ children }: { children: React.ReactNode }) {
  const [path] = useLocation();
  const [menu, setMenu] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  useEffect(() => {
    setMenu(false);
    const section = window.location.hash.slice(1);
    if (section) requestAnimationFrame(() => document.getElementById(section)?.scrollIntoView());
    else window.scrollTo(0, 0);
    const isContact = path === "/contact";
    document.title = isContact
      ? "Contact Colour Lab Hair Studio | George Hair Salon"
      : path === "/"
        ? "Colour Lab Hair Studio | Hair Colour & Balayage in George"
        : "Page Not Found | Colour Lab Hair Studio";
    const description = isContact
      ? "Book your next hair appointment at Colour Lab Hair Studio, 25 Courtenay Street, George. Call 044 873 4787 or email hsecolourlab@gmail.com."
      : "Hair Colour, balayage, blondes, colour corrections, cuts and treatments at Colour Lab Hair Studio in George. Visit 25 Courtenay Street. Call 044 873 4787.";
    for (const selector of [
      'meta[name="description"]',
      'meta[property="og:description"]',
      'meta[name="twitter:description"]',
    ]) {
      document.querySelector(selector)?.setAttribute("content", description);
    }
    for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) {
      document.querySelector(selector)?.setAttribute("content", document.title);
    }
    if (import.meta.env.MODE === "github-pages") {
      const url = `https://ruans-web-design.github.io/colour-lab-hair-studio/${isContact ? "contact/" : ""}`;
      document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
      document.querySelector('meta[property="og:url"]')?.setAttribute("content", url);
    }
  }, [path]);
  return (
    <>
      <a
        className="skip"
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          const main = document.getElementById("main");
          main?.focus();
          main?.scrollIntoView();
        }}
      >
        Skip to content
      </a>
      <div className="proposal-notice">
        Website Proposal · Client Approval Pending · Enquiries Are Not Sent
      </div>
      <header className="header">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={path === href ? "active" : ""}
              aria-current={path === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <a className="nav-book" href={phone}>
          <Phone size={14} />
          Call to book
          <ArrowUpRight size={16} />
        </a>
        <button
          className="menu-toggle"
          aria-label={menu ? "Close menu" : "Open menu"}
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
      </header>
      {menu && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {nav.map(([href, label]) => (
            <Link key={href} href={href}>
              {label}
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </nav>
      )}
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <section className="studio-map" aria-labelledby="map-heading">
        <div className="map-heading">
          <div>
            <span className="eyebrow">FIND COLOUR LAB IN GEORGE</span>
            <h2 id="map-heading">
              Your Next Stop: <em>Courtenay Street.</em>
            </h2>
            <p>25 Courtenay Street · George, South Africa</p>
          </div>
          <External href={maps} className="text-link">
            Get directions
            <ArrowUpRight size={18} />
          </External>
        </div>
        <iframe
          title="Google Map showing Colour Lab Hair Studio in George"
          src="https://www.google.com/maps/embed?origin=mfe&pb=!1m3!3m2!1m1!4s3379725071183913766"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <p className="map-privacy">
          Interactive map provided by Google. Google’s privacy policy applies when the map loads.
        </p>
      </section>
      <footer>
        <div className="footer-top">
          <div>
            <Brand />
            <p>
              Beautiful colour.
              <br />A personal touch.
            </p>
            <div className="socials">
              <External href={instagram}>
                <Instagram size={19} />
                <span className="sr-only">Instagram</span>
              </External>
              <External href={facebook}>
                <Facebook size={19} />
                <span className="sr-only">Facebook</span>
              </External>
            </div>
          </div>
          <div>
            <span className="eyebrow">EXPLORE</span>
            <a href={`${import.meta.env.BASE_URL}#about`}>About the studio</a>
            <a href={`${import.meta.env.BASE_URL}#services`}>Hair services</a>
            <a href={`${import.meta.env.BASE_URL}#testimonials`}>Client testimonials</a>
            {nav.slice(1).map(([href, label]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </div>
          <div>
            <span className="eyebrow">VISIT THE STUDIO</span>
            <p>
              25 Courtenay Street
              <br />
              George, South Africa
            </p>
            <External href={maps}>
              Get directions <ArrowUpRight size={14} />
            </External>
            <a href={phone}>044 873 4787</a>
            <a href="mailto:hsecolourlab@gmail.com">hsecolourlab@gmail.com</a>
          </div>
          <div>
            <span className="eyebrow">OPENING HOURS</span>
            <p>
              Tuesday – Friday<span>08:00 – 17:00</span>
            </p>
            <p>
              Saturday<span>08:00 – 14:00</span>
            </p>
            <p className="subtle">Sunday & Monday · Closed</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Colour Lab – Hair Studio</span>
          <span>Crafted for your next chapter.</span>
          <button onClick={() => setPrivacy(!privacy)} aria-expanded={privacy}>
            Privacy & preview information
          </button>
        </div>
        {privacy && (
          <div className="privacy">
            <h2>About This Preview</h2>
            <p>
              Photos and business information are drawn from public studio profiles. Publication
              permission and final business details should be approved before launch. The enquiry
              form creates a draft on this page only; it does not send or store your enquiry on a
              server. Photo permissions and business details have not yet been approved by the
              client. Appointments are only confirmed by the studio. Standard platform analytics may
              collect website usage information.
            </p>
          </div>
        )}
      </footer>
      <nav className="mobile-booking-bar" aria-label="Quick contact">
        <a href={phone}>
          <Phone size={17} aria-hidden="true" />
          Call
        </a>
        <Link href="/contact">
          <Mail size={17} aria-hidden="true" />
          Enquire
        </Link>
      </nav>
    </>
  );
}
const services = [
  {
    name: "Balayage & Dimensional Colour",
    tag: "SOFT BLENDS. BEAUTIFUL DIMENSION.",
    text: "From subtle brunette ribbons to brighter blonde looks, explore colour with depth, movement and a soft blend.",
    category: "Colour",
  },
  {
    name: "Blondes, Foils & Toning",
    tag: "FIND YOUR KIND OF BLONDE.",
    text: "Lighter, dimensional colour with blonde and foil work. Speak to our team about your ideal shade and how to maintain it.",
    category: "Colour",
  },
  {
    name: "Colour Corrections",
    tag: "A FRESH DIRECTION FOR YOUR HAIR.",
    text: "Unwanted tones or previous colour? Discuss your hair history and the look you have in mind so we can explore a correction plan.",
    category: "Colour",
  },
  {
    name: "Hair Colour",
    tag: "A REFRESH. OR A WHOLE NEW YOU.",
    text: "Refresh your current shade or explore something different, from rich brunette tones to a brighter colour story.",
    category: "Colour",
  },
  {
    name: "Cutting & Styling",
    tag: "THE FINISHING TOUCH.",
    text: "A fresh cut and a beautiful finish. Talk to the studio about the shape, length and style you are looking for.",
    category: "Cut & style",
  },
  {
    name: "K18 / Olaplex Treatments",
    tag: "A LITTLE EXTRA CARE.",
    text: "Ask our team which K18 or Olaplex treatment option is suitable for your hair and colour appointment.",
    category: "Treatments",
  },
  {
    name: "Brazilian Keratin Treatment",
    tag: "EXPLORE YOUR SMOOTHING OPTIONS.",
    text: "Speak to the team about Brazilian Keratin Treatment options, suitability and the maintenance involved.",
    category: "Treatments",
  },
];
const portfolio = [
  {
    src: asset("/images/hero-balayage.jpg"),
    label: "Beautifully blended",
    kind: "Blondes",
    caption: "Colour Lab portfolio · Hair by Stef & Chantal",
  },
  {
    src: asset("/images/portfolio-reference-04.jpg"),
    label: "Dimensional brunette",
    kind: "Brunettes",
    caption: "From the Colour Lab studio portfolio",
  },
  {
    src: asset("/images/portfolio-reference-05.jpg"),
    label: "Sleek & polished",
    kind: "Cuts & styling",
    caption: "From the Colour Lab studio portfolio",
  },
  {
    src: asset("/images/portfolio-reference-06.jpg"),
    label: "Soft blonde bob",
    kind: "Blondes",
    caption: "From the Colour Lab studio portfolio",
  },
  {
    src: asset("/images/portfolio-reference-09.jpg"),
    label: "Waves of light",
    kind: "Blondes",
    caption: "From the Colour Lab studio portfolio",
  },
  {
    src: asset("/images/portfolio-reference-08.jpg"),
    label: "A colour journey",
    kind: "Brunettes",
    caption: "From the Colour Lab studio portfolio",
  },
];
function Stars() {
  return (
    <span className="stars" aria-label="Google rating 4.8 out of 5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={12} fill="currentColor" />
      ))}
    </span>
  );
}
function TrustBar() {
  return (
    <div className="trust-bar">
      <div>
        <span className="google-g">G</span>
        <strong>4.8</strong>
        <Stars />
        <span>158 Google reviews</span>
      </div>
      <i />
      <span>COLOUR SPECIALISTS IN GEORGE</span>
      <i />
      <span className="trust-location">
        <MapPin size={15} />
        25 Courtenay Street
      </span>
    </div>
  );
}
function SectionHeading({
  eyebrow,
  title,
  italic,
  link,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  link?: [string, string];
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>
          {title} {italic && <em>{italic}</em>}
        </h2>
      </div>
      {link && (
        <Link href={link[0]} className="text-link">
          {link[1]}
          <ArrowUpRight size={18} />
        </Link>
      )}
    </div>
  );
}
function Cta() {
  return (
    <section className="cta">
      <span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
      <h2>
        A Little Change.
        <br />
        <em>A Beautiful Feeling.</em>
      </h2>
      <p>Let’s talk about your next look.</p>
      <Button light>Call to book your appointment</Button>
      <span className="cta-phone">044 873 4787 · George</span>
      <Scissors className="cta-scissors" strokeWidth={0.6} />
    </section>
  );
}
function Gallery({ compact = false }: { compact?: boolean }) {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const photos = (compact ? portfolio.slice(0, 4) : portfolio).filter(
    (p) => filter === "All" || p.kind === filter,
  );
  const close = () => {
    setSelected(null);
    triggerRef.current?.focus();
  };
  useEffect(() => {
    if (selected === null) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setSelected((s) => (s === null ? null : (s + 1) % photos.length));
      if (e.key === "ArrowLeft")
        setSelected((s) => (s === null ? null : (s - 1 + photos.length) % photos.length));
      if (e.key === "Tab") {
        const nodes = document.querySelectorAll<HTMLElement>(".lightbox button");
        const first = nodes[0],
          last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("keydown", key);
      document.body.style.overflow = old;
    };
  }, [selected, photos.length]);
  return (
    <>
      {!compact && (
        <div className="filters" aria-label="Filter portfolio">
          {["All", "Blondes", "Brunettes", "Cuts & styling"].map((f) => (
            <button
              key={f}
              className={filter === f ? "selected" : ""}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      )}
      <div className={`gallery ${compact ? "compact" : ""}`}>
        {photos.map((p, i) => (
          <button
            className="gallery-photo"
            key={p.src}
            onClick={(e) => {
              triggerRef.current = e.currentTarget;
              setSelected(i);
            }}
            aria-label={`View ${p.label}`}
          >
            <div className="gallery-image">
              <img src={p.src} alt={p.label + " from the Colour Lab portfolio"} loading="lazy" />
              <span>
                <Plus size={19} />
              </span>
            </div>
            <div className="gallery-caption">
              <span>{p.label}</span>
              <ArrowUpRight size={16} />
            </div>
            <small>{p.kind}</small>
          </button>
        ))}
      </div>
      {selected !== null && (
        <dialog
          className="lightbox"
          open
          aria-modal="true"
          aria-label="Studio portfolio photograph"
        >
          <button
            ref={closeRef}
            className="lightbox-close"
            aria-label="Close photograph"
            onClick={close}
          >
            <X />
          </button>
          <button
            className="lightbox-prev"
            aria-label="Previous photograph"
            onClick={(e) => {
              e.stopPropagation();
              setSelected((selected - 1 + photos.length) % photos.length);
            }}
          >
            <ChevronLeft />
          </button>
          <figure>
            <img src={photos[selected].src} alt={photos[selected].label} />
            <figcaption>
              {photos[selected].label}
              <small>{photos[selected].caption}</small>
            </figcaption>
          </figure>
          <button
            className="lightbox-next"
            aria-label="Next photograph"
            onClick={(e) => {
              e.stopPropagation();
              setSelected((selected + 1) % photos.length);
            }}
          >
            <ChevronRight />
          </button>
        </dialog>
      )}
    </>
  );
}
export function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="little-line" /> COLOUR LAB · GEORGE
          </span>
          <h1>
            Hair Colour.
            <br />
            Made Personal
            <br />
            <em>in George.</em>
          </h1>
          <p>
            Colour is personal. From softly blended balayage to a fresh new shade, find your next
            look at our George hair studio.
          </p>
          <div className="hero-actions">
            <Button />
            <a href="#services" className="text-link">
              Explore our services
              <ArrowRight size={16} />
            </a>
          </div>
          <div className="hero-note">
            <span className="tiny-star">✳</span> COLOUR, CUTTING & A LITTLE CONFIDENCE.
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image">
            <img
              src={asset("/images/hero-balayage.jpg")}
              alt="Blended blonde balayage bob by Stef and Chantal at Colour Lab"
            />
            <div className="image-label">
              <span>THE ART OF BEAUTIFUL COLOUR</span>
              <ArrowUpRight size={18} />
            </div>
          </div>
          <div className="hero-inset">
            <img
              src={asset("/images/google-hair.jpg")}
              alt="Colour Lab studio wash area with green accents"
            />
            <span>YOUR MOMENT, OUR STUDIO.</span>
          </div>
          <div className="vertical-caption">REAL HAIR. REAL COLOUR LAB.</div>
          <span className="hero-since">
            A PERSONAL TOUCH,
            <br />
            FROM START TO FINISH.
          </span>
        </div>
      </section>
      <TrustBar />
      <section className="story section" id="about" aria-labelledby="about-heading">
        <div className="story-image">
          <img
            src={asset("/images/google-hair.jpg")}
            alt="Colour Lab's botanical studio interior"
            loading="lazy"
          />
          <span className="photo-label">A LITTLE SPACE FOR YOURSELF.</span>
        </div>
        <div className="story-copy">
          <span className="eyebrow">ABOUT US</span>
          <h2 id="about-heading">
            Your George Studio.
            <br />
            <em>A Personal Touch.</em>
          </h2>
          <p>
            Colour Lab Hair Studio is a welcoming hair salon at 25 Courtenay Street in George, where
            beautiful colour and a personal touch go hand in hand.
          </p>
          <p>
            Led by owner Stefan Ellis, known as Stef, our work spans balayage, blondes, colour
            corrections, cutting and hair treatments. Our portfolio includes work by Stef and
            Chantal. Come as you are. Let’s explore what’s next.
          </p>
          <External href={maps} className="text-link">
            Visit our studio
            <ArrowUpRight size={18} />
          </External>
        </div>
      </section>
      <section className="service-preview section" id="services">
        <SectionHeading
          eyebrow="A LITTLE REFRESH. A WHOLE NEW CHAPTER."
          title="Hair Services in"
          italic="George."
        />
        <div className="service-preview-grid">
          {services.map((s, i) => (
            <article key={s.name} className="service-preview-item">
              <span className="service-number">0{i + 1}</span>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
              <div className="service-booking-row">
                <Link
                  className="service-quote"
                  href={`/contact?service=${encodeURIComponent(s.name)}&intent=quote`}
                  aria-label={`Request a quote for ${s.name}`}
                >
                  Request a Quote
                </Link>
                <Link
                  href={`/contact?service=${encodeURIComponent(s.name)}`}
                  className="service-booking"
                  aria-label={`Enquire to book ${s.name}`}
                >
                  Enquire to Book <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <p className="pricing-note">
          Every hair story is different. Call 044 873 4787 for current pricing and to discuss the
          right services for you.
        </p>
      </section>
      <section className="section portfolio-section">
        <SectionHeading eyebrow="FROM THE STUDIO" title="Good Hair." italic="Real People." />
        <Gallery compact />
        <div className="gallery-bottom">
          <p>A few of our favourite colour stories.</p>
          <External href={instagram} className="text-link">
            <Instagram size={16} />
            Follow our work
            <ArrowUpRight size={16} />
          </External>
        </div>
      </section>
      <section className="home-testimonials section" id="testimonials">
        <SectionHeading
          eyebrow="CLIENT TESTIMONIALS"
          title="Kind Words."
          italic="Real Experiences."
        />
        <TestimonialCarousel>
          <article>
            <span className="quote-mark" aria-hidden="true">
              “
            </span>
            <blockquote>You have achieved perfect results with the colour and cut.</blockquote>
            <div className="review-author">
              <span className="avatar">AP</span>
              <div>
                Alta Pretorius<small>Google review · excerpt</small>
              </div>
            </div>
          </article>
          <article>
            <span className="quote-mark" aria-hidden="true">
              “
            </span>
            <blockquote>
              Chantal did an AMAZING job on my hair - I was absolutely delighted with the result.
            </blockquote>
            <div className="review-author">
              <span className="avatar">SA</span>
              <div>
                S A<small>Google review · excerpt</small>
              </div>
            </div>
          </article>
        </TestimonialCarousel>
        <div className="testimonial-source">
          <p>
            Selected client review excerpts. Google rating snapshot: 4.8/5 from 158 reviews, 16
            November 2026.
          </p>
          <External href={maps} className="text-link">
            Read the full Google reviews
            <ArrowUpRight size={17} />
          </External>
        </div>
      </section>
      <section className="home-faq section" id="faq" aria-labelledby="faq-heading">
        <span className="eyebrow">A FEW HELPFUL ANSWERS</span>
        <h2 id="faq-heading">
          Frequently Asked <em>Questions</em>
        </h2>
        <div className="faq-list">
          <details>
            <summary>
              <h3>How Do I Book an Appointment?</h3>
              <Plus size={20} aria-hidden="true" />
            </summary>
            <p>
              Call <a href={phone}>044 873 4787</a> or use our{" "}
              <Link href="/contact">contact form</Link> to explore an enquiry draft. This proposal
              does not send enquiries or confirm bookings.
            </p>
          </details>
          <details>
            <summary>
              <h3>Where Is Colour Lab Hair Studio?</h3>
              <Plus size={20} aria-hidden="true" />
            </summary>
            <p>
              You’ll find us at 25 Courtenay Street, George, South Africa. Use the map below or{" "}
              <External href={maps}>get directions on Google Maps</External>.
            </p>
          </details>
          <details>
            <summary>
              <h3>What Are Your Opening Hours?</h3>
              <Plus size={20} aria-hidden="true" />
            </summary>
            <p>
              We’re open Tuesday to Friday, 08:00–17:00, and Saturday, 08:00–14:00. The studio is
              closed on Sunday and Monday. Call to check appointment availability.
            </p>
          </details>
        </div>
      </section>
      <Cta />
    </>
  );
}
function PageIntro({
  tag,
  title,
  italic,
  text,
}: {
  tag: string;
  title: string;
  italic?: string;
  text: string;
}) {
  return (
    <section className="page-intro">
      <span className="eyebrow">{tag}</span>
      <h1>
        {title}
        <br />
        {italic && <em>{italic}</em>}
      </h1>
      <p>{text}</p>
    </section>
  );
}
export function Contact() {
  const [ready, setReady] = useState(false);
  const [copy, setCopy] = useState(false);
  const [draft, setDraft] = useState("");
  const search = useSearch();
  const params = new URLSearchParams(search);
  const requestedService = params.get("service") || "";
  const quote = params.get("intent") === "quote";
  const [service, setService] = useState("Not sure yet");
  useEffect(() => {
    setService(
      services.some((s) => s.name === requestedService) ? requestedService : "Not sure yet",
    );
    setReady(false);
  }, [requestedService, quote]);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const text = `Hello Colour Lab,\n\nI'd like to ${quote ? "request a quote" : "enquire about an appointment"}.\n\nName: ${data.get("name")}\nPhone: ${data.get("phone")}\nEmail: ${data.get("email")}\nService: ${data.get("service")}\nPreferred date: ${data.get("date") || "Flexible"}\n\n${data.get("message")}\n\nPlease contact me to discuss availability. Thank you.`;

    setDraft(text);
    setReady(true);
    setCopy(false);
  }
  return (
    <>
      <PageIntro
        tag="LET’S TALK ABOUT YOUR NEXT LOOK"
        title="Contact Colour Lab."
        italic="Your George Hair Studio."
        text="Explore the enquiry form below. This proposal creates a draft only and does not send anything to the studio."
      />
      <section className="contact-layout section">
        <div className="contact-info">
          <span className="eyebrow">FIND US IN GEORGE</span>
          <h2>
            Come as You Are.
            <br />
            <em>Leave Feeling You.</em>
          </h2>
          <div className="contact-row">
            <Phone size={19} />
            <div>
              <span>CALL THE STUDIO</span>
              <a href={phone}>044 873 4787</a>
            </div>
          </div>
          <div className="contact-row">
            <Mail size={19} />
            <div>
              <span>EMAIL US</span>
              <a href="mailto:hsecolourlab@gmail.com">hsecolourlab@gmail.com</a>
            </div>
          </div>
          <div className="contact-row">
            <MapPin size={19} />
            <div>
              <span>VISIT THE STUDIO</span>
              <p>
                25 Courtenay Street
                <br />
                George, South Africa
              </p>
              <External href={maps} className="text-link">
                Get directions
                <ArrowUpRight size={15} />
              </External>
            </div>
          </div>
          <div className="contact-hours">
            <span className="eyebrow">A TIME FOR YOURSELF</span>
            {[
              ["Tuesday – Friday", "08:00 – 17:00"],
              ["Saturday", "08:00 – 14:00"],
              ["Sunday & Monday", "Closed"],
            ].map(([day, time]) => (
              <div key={day}>
                <span>{day}</span>
                <span>{time}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="enquiry" id="enquiry">
          <span className="eyebrow">{quote ? "QUOTE ENQUIRY" : "APPOINTMENT ENQUIRY"}</span>
          <h2>
            Tell Us About <em>Your Hair.</em>
          </h2>
          <p>
            Proposal preview: create a draft to review or copy. No email is sent, and no appointment
            is booked.
          </p>
          <form onSubmit={submit}>
            <div className="form-grid">
              <label>
                Your name
                <input
                  aria-label="Your name"
                  name="name"
                  placeholder="Full name"
                  autoComplete="name"
                  required
                />
              </label>
              <label>
                Phone number (optional)
                <input
                  aria-label="Phone number"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Your contact number"
                />
              </label>
            </div>
            <label>
              Email address
              <input
                aria-label="Email address"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
            </label>
            <div className="form-grid">
              <label>
                Service of interest
                <select name="service" value={service} onChange={(e) => setService(e.target.value)}>
                  {["Not sure yet", ...services.map((s) => s.name)].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              <label>
                Preferred date (optional)
                <input
                  aria-label="Preferred date"
                  name="date"
                  type="date"
                  min={new Date().toISOString().slice(0, 10)}
                />
              </label>
            </div>
            <label>
              A little about your next look (optional)
              <textarea
                aria-label="A little about your next look"
                name="message"
                rows={3}
                placeholder="Your current hair, your ideal look, or anything you’d like us to know…"
              />
            </label>
            <label className="consent">
              <input
                aria-label="I understand this is an enquiry, not a confirmed appointment"
                type="checkbox"
                required
              />
              I understand this is a proposal preview. This form does not send an enquiry or confirm
              an appointment.
            </label>
            <button type="submit" className="button">
              Create Enquiry Draft
              <ArrowUpRight size={18} />
            </button>
          </form>
          {ready && (
            <output className="draft">
              <strong>Your enquiry draft is ready.</strong>
              <p>Review or copy your draft below. Nothing has been sent or booked.</p>
              <button
                className="text-link"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(draft);
                    setCopy(true);
                  } catch {
                    setCopy(false);
                  }
                }}
              >
                {copy ? "Copied enquiry" : "Copy enquiry text"}
              </button>
              <details>
                <summary>View enquiry text</summary>
                <pre>{draft}</pre>
              </details>
            </output>
          )}
        </div>
      </section>
      <section className="visit-banner">
        <img src={asset("/images/salon-cover.jpg")} alt="The interior of Colour Lab Hair Studio" />
        <div>
          <span className="eyebrow">YOUR MOMENT, OUR STUDIO</span>
          <h2>
            See You on
            <br />
            <em>Courtenay Street.</em>
          </h2>
          <External href={maps} className="button light">
            Find us on Google Maps
            <ArrowUpRight size={18} />
          </External>
        </div>
      </section>
    </>
  );
}
export function NotFound() {
  return (
    <section className="page-intro">
      <span className="eyebrow">A DIFFERENT DIRECTION</span>
      <h1>This Page Isn’t Here.</h1>
      <Button to="/">Back to the studio</Button>
    </section>
  );
}
