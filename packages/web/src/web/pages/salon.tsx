import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
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
  Minus,
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
  ["/about", "About us"],
  ["/services", "Services"],
  ["/testimonials", "Testimonials"],
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
    window.scrollTo(0, 0);
    const titles: Record<string, string> = {
      "/": "Hair Colour & Balayage in George",
      "/about": "About the Studio",
      "/services": "Hair Services in George",
      "/testimonials": "Client Reviews",
      "/contact": "Contact & Book",
    };
    document.title = `${titles[path] || "Hair Studio"} | Colour Lab`;
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
            <h3>About this preview</h3>
            <p>
              Photos and business information are drawn from public studio profiles. Publication
              permission and final business details should be approved before launch. The enquiry
              form opens your email app and does not store your information on this website.
              Appointments are only confirmed by the studio. Standard platform analytics may collect
              website usage information.
            </p>
          </div>
        )}
      </footer>
    </>
  );
}
const services = [
  {
    name: "Balayage & dimensional colour",
    tag: "SOFT BLENDS. BEAUTIFUL DIMENSION.",
    text: "From subtle brunette ribbons to brighter blonde looks, explore colour with depth, movement and a soft blend.",
    category: "Colour",
  },
  {
    name: "Blondes, foils & toning",
    tag: "FIND YOUR KIND OF BLONDE.",
    text: "Lighter, dimensional colour with blonde and foil work. Speak to our team about your ideal shade and how to maintain it.",
    category: "Colour",
  },
  {
    name: "Colour corrections",
    tag: "A FRESH DIRECTION FOR YOUR HAIR.",
    text: "Unwanted tones or previous colour? Discuss your hair history and the look you have in mind so we can explore a correction plan.",
    category: "Colour",
  },
  {
    name: "Hair colour",
    tag: "A REFRESH. OR A WHOLE NEW YOU.",
    text: "Refresh your current shade or explore something different, from rich brunette tones to a brighter colour story.",
    category: "Colour",
  },
  {
    name: "Cutting & styling",
    tag: "THE FINISHING TOUCH.",
    text: "A fresh cut and a beautiful finish. Talk to the studio about the shape, length and style you are looking for.",
    category: "Cut & style",
  },
  {
    name: "K18 / Olaplex treatments",
    tag: "A LITTLE EXTRA CARE.",
    text: "Ask our team which K18 or Olaplex treatment option is suitable for your hair and colour appointment.",
    category: "Treatments",
  },
  {
    name: "Brazilian keratin treatment",
    tag: "EXPLORE YOUR SMOOTHING OPTIONS.",
    text: "Speak to the team about Brazilian keratin treatment options, suitability and the maintenance involved.",
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
        A little change.
        <br />
        <em>A beautiful feeling.</em>
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
            Beautiful colour.
            <br />A look that feels
            <br />
            like <em>you.</em>
          </h1>
          <p>
            Colour is personal. From softly blended balayage to a fresh new shade, find your next
            look at our George hair studio.
          </p>
          <div className="hero-actions">
            <Button />
            <Link href="/services" className="text-link">
              Explore our services
              <ArrowRight size={16} />
            </Link>
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
      <section className="story section">
        <div className="story-image">
          <img
            src={asset("/images/google-hair.jpg")}
            alt="Colour Lab's botanical studio interior"
            loading="lazy"
          />
          <span className="photo-label">A LITTLE SPACE FOR YOURSELF.</span>
        </div>
        <div className="story-copy">
          <span className="eyebrow">WELCOME TO COLOUR LAB</span>
          <h2>
            Colour expertise.
            <br />
            <em>A personal touch.</em>
          </h2>
          <p>
            A welcoming studio on Courtenay Street, George, where beautiful colour takes centre
            stage.
          </p>
          <p>
            Led by owner Stefan Ellis, known as Stef, our work spans balayage, blondes, colour
            corrections, cutting and hair treatments. Come as you are. Let’s explore what’s next.
          </p>
          <Link href="/about" className="text-link">
            Get to know our studio
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="service-preview section">
        <SectionHeading
          eyebrow="A LITTLE REFRESH. A WHOLE NEW CHAPTER."
          title="Your hair, our"
          italic="canvas."
          link={["/services", "All our services"]}
        />
        <div className="service-preview-grid">
          {services.slice(0, 3).map((s, i) => (
            <Link key={s.name} href="/services" className="service-preview-item">
              <span className="service-number">0{i + 1}</span>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
              <span className="service-arrow">
                <ArrowUpRight size={22} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="section portfolio-section">
        <SectionHeading
          eyebrow="FROM THE STUDIO"
          title="Good hair."
          italic="Real people."
          link={["/services", "More from our portfolio"]}
        />
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
      <section className="home-review">
        <span className="eyebrow">A KIND WORD GOES A LONG WAY</span>
        <div className="quote-mark">“</div>
        <blockquote>
          You have achieved perfect results
          <br className="desktop-break" /> with the colour and cut.
        </blockquote>
        <p>
          ALTA PRETORIUS <span>· Google review</span>
        </p>
        <Link href="/testimonials" className="text-link">
          More client stories
          <ArrowUpRight size={17} />
        </Link>
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
export function About() {
  return (
    <>
      <PageIntro
        tag="THE PEOPLE BEHIND THE COLOUR"
        title="More than a new look."
        italic="A personal experience."
        text="Get to know the studio on Courtenay Street, where colour expertise meets a welcoming, personal touch."
      />
      <section className="about-story section">
        <img src={asset("/images/salon-cover.jpg")} alt="Colour Lab salon stations and wash area" />
        <div>
          <span className="eyebrow">OUR STUDIO, YOUR SPACE</span>
          <h2>
            Rooted in George.
            <br />
            <em>Inspired by you.</em>
          </h2>
          <p>
            Colour Lab – Hair Studio is based on Courtenay Street in George. Our work centres on
            beautiful colour—from balayage and blondes to colour corrections—alongside cutting,
            styling and hair treatments.
          </p>
          <p>
            Led by owner Stefan Ellis, known to our clients as Stef, the studio combines a passion
            for hair colour with a welcoming salon experience. Explore our work, then get in touch
            to discuss your next appointment.
          </p>
          <External href={maps} className="text-link">
            Find our studio
            <ArrowUpRight size={18} />
          </External>
        </div>
      </section>
      <section className="team section">
        <SectionHeading
          eyebrow="MEET THE STUDIO"
          title="The hands behind"
          italic="your next look."
        />
        <div className="team-grid">
          <article>
            <span className="team-initial">SE</span>
            <div>
              <span className="eyebrow">OWNER · STYLIST</span>
              <h3>Stefan Ellis</h3>
              <p>
                Known as Stef, Stefan is the owner of Colour Lab. His work appears across the
                studio’s colour and balayage portfolio.
              </p>
            </div>
          </article>
          <article>
            <span className="team-initial">C</span>
            <div>
              <span className="eyebrow">STYLIST</span>
              <h3>Chantal</h3>
              <p>
                Chantal’s portfolio includes balayage, full-head colour, cutting and styling. Her
                work is a familiar part of the studio’s colour stories.
              </p>
            </div>
          </article>
        </div>
      </section>
      <section className="values section">
        <div>
          <span className="eyebrow">THE COLOUR LAB FEELING</span>
          <h2>
            A space to feel
            <br />
            <em>like yourself.</em>
          </h2>
        </div>
        <div>
          <p>
            Beautiful colour is only one part of the experience. Our clients also speak about
            friendly, attentive service and a welcoming atmosphere.
          </p>
          <blockquote>
            “The staff are all super friendly, professional and very attentive.”
          </blockquote>
          <small>S A · Google review excerpt</small>
          <p className="inclusive">Everyone is welcome. LGBTQ+ friendly.</p>
        </div>
      </section>
      <Cta />
    </>
  );
}
export function Services() {
  const [filter, setFilter] = useState("All services");
  return (
    <>
      <PageIntro
        tag="COLOUR. CUT. CARE."
        title="Your hair, our canvas."
        italic="Let’s create your next look."
        text="From a softly blended colour to a fresh cut and finish, explore what we do at Colour Lab."
      />
      <section className="services-layout section">
        <aside>
          <img src={asset("/images/hero-balayage.jpg")} alt="Colour Lab blended balayage bob" />
          <span className="eyebrow">NOT SURE WHERE TO START?</span>
          <h3>
            Let’s talk
            <br />
            <em>about your hair.</em>
          </h3>
          <p>Tell us about your current hair and the look you have in mind.</p>
          <a href={phone} className="text-link">
            044 873 4787
            <ArrowUpRight size={17} />
          </a>
        </aside>
        <div className="service-menu">
          <div className="filters">
            {["All services", "Colour", "Cut & style", "Treatments"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={filter === f ? "selected" : ""}
                aria-pressed={filter === f}
              >
                {f}
              </button>
            ))}
          </div>
          {services
            .filter((s) => filter === "All services" || s.category === filter)
            .map((s) => (
              <details className="service-detail" key={s.name}>
                <summary>
                  <span className="service-number">
                    {String(services.indexOf(s) + 1).padStart(2, "0")}
                  </span>
                  <span>{s.name}</span>
                  <Plus className="plus" size={20} />
                  <Minus className="minus" size={20} />
                </summary>
                <div className="service-detail-body">
                  <span className="eyebrow">{s.tag}</span>
                  <p>{s.text}</p>
                  <a href={phone} className="text-link">
                    Discuss this service
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </details>
            ))}
          <p className="pricing-note">
            Every hair story is different. Contact the studio for current pricing and to discuss the
            services you need.
          </p>
        </div>
      </section>
      <section className="section portfolio-section" id="portfolio">
        <SectionHeading
          eyebrow="REAL WORK FROM OUR STUDIO"
          title="A little inspiration"
          italic="for your next visit."
        />
        <Gallery />
        <div className="gallery-bottom">
          <span>Images from Colour Lab’s public studio portfolio.</span>
          <External href={instagram} className="text-link">
            See more on Instagram
            <ArrowUpRight size={17} />
          </External>
        </div>
      </section>
      <Cta />
    </>
  );
}
export function Testimonials() {
  return (
    <>
      <PageIntro
        tag="CLIENT STORIES"
        title="Good hair feels good."
        italic="Kind words feel even better."
        text="A few words from the people who have spent time in our chairs. Genuine reviews, shared in their own words."
      />
      <section className="reviews-section section">
        <div className="rating-panel">
          <span className="google-g">G</span>
          <strong>
            4.8<span>/ 5</span>
          </strong>
          <Stars />
          <p>158 Google reviews</p>
          <External href={maps} className="text-link">
            Read all Google reviews
            <ArrowUpRight size={17} />
          </External>
          <small>Rating snapshot · 16 November 2026</small>
        </div>
        <div className="review-list">
          <article>
            <span className="quote-mark">“</span>
            <blockquote>You have achieved perfect results with the colour and cut.</blockquote>
            <div className="review-author">
              <span className="avatar">AP</span>
              <div>
                Alta Pretorius<small>Google review · excerpt</small>
              </div>
            </div>
          </article>
          <article>
            <span className="quote-mark">“</span>
            <blockquote>
              Chantal did an AMAZING job on my hair - I was absolutely delighted with the result.
              Stef the owner has a wonderful welcoming manner and great rapport with his staff and
              all the clients.
            </blockquote>
            <div className="review-author">
              <span className="avatar">SA</span>
              <div>
                S A<small>Google review · excerpt</small>
              </div>
            </div>
          </article>
        </div>
      </section>
      <section className="facebook-rating">
        <Facebook size={22} />
        <div>
          <h3>96% recommend us on Facebook</h3>
          <p>Based on 28 reviews · snapshot 16 November 2026</p>
        </div>
        <External href={facebook} className="text-link">
          Visit our Facebook page
          <ArrowUpRight size={18} />
        </External>
      </section>
      <p className="review-note">
        Selected positive excerpts. Explore the linked platforms for the full range of client
        feedback.
      </p>
      <Cta />
    </>
  );
}
export function Contact() {
  const [ready, setReady] = useState(false);
  const [copy, setCopy] = useState(false);
  const [draft, setDraft] = useState("");
  const [subject, setSubject] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const s = `Appointment enquiry — ${data.get("service")}`;
    const text = `Hello Colour Lab,\n\nI'd like to enquire about an appointment.\n\nName: ${data.get("name")}\nPhone: ${data.get("phone")}\nEmail: ${data.get("email")}\nService: ${data.get("service")}\nPreferred date: ${data.get("date") || "Flexible"}\n\n${data.get("message")}\n\nPlease contact me to discuss availability. Thank you.`;
    setSubject(s);
    setDraft(text);
    setReady(true);
    setCopy(false);
  }
  return (
    <>
      <PageIntro
        tag="LET’S TALK ABOUT YOUR NEXT LOOK"
        title="Your next chapter"
        italic="starts with hello."
        text="Call the studio to book, or prepare an email enquiry. We’d love to hear what you have in mind."
      />
      <section className="contact-layout section">
        <div className="contact-info">
          <span className="eyebrow">FIND US IN GEORGE</span>
          <h2>
            Come as you are.
            <br />
            <em>Leave feeling you.</em>
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
        <div className="enquiry">
          <span className="eyebrow">APPOINTMENT ENQUIRY</span>
          <h3>
            Tell us about <em>your hair.</em>
          </h3>
          <p>
            This form prepares an email in your email app. The studio will confirm availability
            directly.
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
                Phone number
                <input
                  aria-label="Phone number"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Your contact number"
                  required
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
                <select name="service" defaultValue="Not sure yet">
                  {["Not sure yet", ...services.map((s) => s.name)].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              <label>
                Preferred date
                <input
                  aria-label="Preferred date"
                  name="date"
                  type="date"
                  min={new Date().toISOString().slice(0, 10)}
                />
              </label>
            </div>
            <label>
              A little about your next look
              <textarea
                aria-label="A little about your next look"
                name="message"
                rows={3}
                placeholder="Your current hair, your ideal look, or anything you’d like us to know…"
                required
              />
            </label>
            <label className="consent">
              <input
                aria-label="I understand this is an enquiry, not a confirmed appointment"
                type="checkbox"
                required
              />
              I understand this is an enquiry, not a confirmed appointment. My details will only be
              shared when I send the email.
            </label>
            <button type="submit" className="button">
              Prepare email enquiry
              <ArrowUpRight size={18} />
            </button>
          </form>
          {ready && (
            <output className="draft">
              <strong>Your email draft is ready.</strong>
              <p>Open your email app, then send it to the studio. Nothing has been sent yet.</p>
              <a
                className="button"
                href={`mailto:hsecolourlab@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(draft)}`}
              >
                Open email app
                <Mail size={16} />
              </a>
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
            See you on
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
      <h1>This page isn’t here.</h1>
      <Button to="/">Back to the studio</Button>
    </section>
  );
}
