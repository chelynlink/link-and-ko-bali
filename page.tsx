"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  LanguageContext,
  Locale,
  Translated,
  translateText,
} from "./i18n";

const WHATSAPP_NUMBER = "6285959313339";
const INSTAGRAM_URL = "https://www.instagram.com/linkandkobali/";

const languages: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "id", label: "ID" },
  { code: "zh", label: "中文" },
  { code: "ru", label: "RU" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
];

type IconName =
  | "car"
  | "key"
  | "plane"
  | "island"
  | "mountain"
  | "route"
  | "calendar"
  | "chat"
  | "people"
  | "water"
  | "charger"
  | "tissue"
  | "wipe"
  | "umbrella"
  | "medical"
  | "care"
  | "arrow";

function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  const paths: Record<IconName, React.ReactNode> = {
    car: <><path d="M5 17h14l1-5-2-4H6l-2 4 1 5Z"/><path d="M7 8 8.5 5h7L17 8M7 17v2M17 17v2M4.5 13h15"/><circle cx="8" cy="14" r="1"/><circle cx="16" cy="14" r="1"/></>,
    key: <><circle cx="8" cy="15" r="4"/><path d="m11 12 7-7M15 8l2 2M17 6l2 2"/></>,
    plane: <><path d="m3 11 18-7-7 17-3-7-8-3Z"/><path d="m11 14 4-4"/></>,
    island: <><path d="M3 18c4-2 7-2 10 0s5 2 8 0"/><path d="M12 15V7M12 7c-2-2-4-2-6-1 2 0 4 2 4 4M12 7c2-2 4-2 6-1-2 0-4 2-4 4"/></>,
    mountain: <><path d="m3 19 6-10 3 4 3-6 6 12H3Z"/><path d="m13.5 10 1.5 2 1.5-1"/></>,
    route: <><circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h3a3 3 0 0 0 3-3V9a3 3 0 0 1 3-3"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
    chat: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"/><path d="M8 10h8M8 14h5"/></>,
    people: <><circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0M16 5a3 3 0 0 1 0 6M17 14a5 5 0 0 1 4 5"/></>,
    water: <><path d="M12 3S6 10 6 15a6 6 0 0 0 12 0c0-5-6-12-6-12Z"/><path d="M9 16a3 3 0 0 0 3 2"/></>,
    charger: <><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M10 5h4M11 18h2"/></>,
    tissue: <><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M8 8V5h8v3M9 12h6"/></>,
    wipe: <><path d="M5 6h14v14H5z"/><path d="M8 3h8v3M9 11h6M9 15h4"/></>,
    umbrella: <><path d="M3 12a9 9 0 0 1 18 0H3Z"/><path d="M12 3v15a3 3 0 0 0 6 0"/></>,
    medical: <><rect x="3" y="6" width="18" height="15" rx="2"/><path d="M9 6V3h6v3M12 10v7M8.5 13.5h7"/></>,
    care: <><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5"/></>,
  };

  return <svg {...common}>{paths[name]}</svg>;
}

const services: {
  icon: IconName;
  title: string;
  description: string;
  price?: string;
  note?: string;
  action: string;
  target?: string;
}[] = [
  {
    icon: "key",
    title: "Car Rental",
    description: "Flexible car rental for exploring Bali at your own pace.",
    price: "IDR 299,000",
    action: "Get a Quote",
  },
  {
    icon: "car",
    title: "Private Driver",
    description: "A private driver for your Bali day, itinerary or transportation needs.",
    price: "IDR 699,000 / full day",
    note: "Half-day options available.",
    action: "Check Availability",
  },
  {
    icon: "plane",
    title: "Airport Transfer",
    description: "Simple airport pickup and drop-off around Bali.",
    price: "IDR 99,000",
    action: "Get a Quote",
  },
  {
    icon: "island",
    title: "Nusa Penida Trips",
    description: "Boat, island transportation and selected day-trip packages.",
    action: "View Trips",
    target: "#trips",
  },
  {
    icon: "mountain",
    title: "Kintamani Jeep",
    description: "Sunrise, sunset and volcanic-area jeep experiences around Mount Batur.",
    action: "View Trips",
    target: "#jeep",
  },
  {
    icon: "route",
    title: "Custom Bali Trip",
    description: "Send us your destinations and we will help arrange your day.",
    action: "Plan My Trip",
  },
];

const benefits: { icon: IconName; title: string; description: string }[] = [
  { icon: "calendar", title: "Flexible", description: "Choose your own schedule and destinations." },
  { icon: "route", title: "Personal", description: "Tell us what kind of Bali trip you want." },
  { icon: "chat", title: "Easy Communication", description: "Plan and confirm everything through WhatsApp." },
  { icon: "people", title: "For Everyone", description: "Solo travellers, couples, families and groups are welcome." },
];

const nusaTrips = [
  {
    name: "Nusa Penida Snorkeling",
    description: "Four snorkeling stops around Nusa Penida.",
    price: "IDR 1,350,000",
    image: "/assets/nusa-kelingking.jpg",
    alt: "Nusa Penida coastline",
    highlights: ["Manta Bay", "Gamat Bay", "Crystal Bay", "Wall Bay"],
  },
  {
    name: "West Nusa Penida",
    description: "Cliffs, natural pools and the island's iconic west coast.",
    price: "IDR 1,350,000",
    image: "/assets/nusa-kelingking.jpg",
    alt: "Kelingking Beach in Nusa Penida",
    highlights: ["Kelingking Beach", "Broken Beach", "Angel's Billabong", "Crystal Bay"],
  },
  {
    name: "East Nusa Penida",
    description: "Dramatic beaches and viewpoints on the east coast.",
    price: "IDR 1,450,000",
    image: "/assets/nusa-diamond-beach.jpg",
    alt: "Diamond Beach in Nusa Penida",
    highlights: ["Diamond Beach", "Atuh Beach", "Tree House", "Thousand Islands Viewpoint"],
  },
  {
    name: "West + East Nusa Penida",
    description: "A full island day combining selected highlights from both coasts.",
    price: "IDR 1,499,000",
    image: "/assets/nusa-broken-beach.jpg",
    alt: "Broken Beach in Nusa Penida",
    highlights: ["Kelingking Beach", "Broken Beach", "Diamond Beach", "Tree House"],
  },
  {
    name: "Nusa Penida Special Trip",
    description: "Snorkeling plus selected west-coast sightseeing stops.",
    price: "IDR 1,650,000",
    image: "/assets/nusa-broken-beach.jpg",
    alt: "Blue water at Broken Beach in Nusa Penida",
    highlights: ["Snorkeling", "Kelingking Beach", "Angel's Billabong", "Broken Beach"],
  },
];

const jeepTrips = [
  {
    name: "Sunrise Jeep",
    description: "Early-morning views with Black Lava and breakfast.",
    price: "IDR 1,120,000",
  },
  {
    name: "Sunset Jeep",
    description: "Golden-hour views with Black Lava, coffee and snacks.",
    price: "IDR 1,120,000",
  },
  {
    name: "Afternoon Jeep",
    description: "A relaxed off-road visit to Black Lava and Black Sand.",
    price: "IDR 940,000",
  },
];

const comforts: { icon: IconName; label: string }[] = [
  { icon: "water", label: "Mineral Water" },
  { icon: "charger", label: "Phone Charger" },
  { icon: "tissue", label: "Tissues" },
  { icon: "wipe", label: "Wet Wipes" },
  { icon: "umbrella", label: "Umbrella" },
  { icon: "medical", label: "Small First-Aid Kit" },
  { icon: "care", label: "Sanitary Pads" },
];

const steps = [
  { number: "01", title: "Tell Us Your Plan", description: "Send your date, number of guests and destinations." },
  { number: "02", title: "Get Your Quote", description: "We confirm availability, transportation and price." },
  { number: "03", title: "Enjoy Bali", description: "Meet your driver and start your trip." },
];

const faqs = [
  ["Can I customize my itinerary?", "Yes. Send us your places, available time and budget, and we will help shape the route."],
  ["Can you arrange a driver if Chelyn is unavailable?", "Yes. Chelyn may drive depending on availability. If she is on another trip, we can arrange another suitable driver."],
  ["Do you accept solo travellers and groups?", "Yes. Solo travellers, couples, families and groups are welcome."],
  ["How do I book?", "Send your date, guest count, pickup location and plan through WhatsApp. We will confirm availability and price."],
  ["What payment methods do you accept?", "Bank transfer, cash, card and QRIS are available. A 30% deposit confirms your reservation."],
  ["Can you arrange airport pickup?", "Yes. Send your flight details, arrival time and destination for an exact quote."],
];

const tripOptions = [
  "Car Rental",
  "Private Driver",
  "Airport Transfer",
  "Nusa Penida Trip",
  "Kintamani Jeep",
  "Custom Bali Trip",
];

function directWhatsAppUrl(language: Locale) {
  const greeting = translateText(
    "Hello Link & Ko Bali, I would like to plan a Bali trip.",
    language,
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(greeting)}`;
}

export default function Home() {
  const [language, setLanguage] = useState<Locale>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [tripInterest, setTripInterest] = useState("");
  const [whatsAppOpened, setWhatsAppOpened] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("linkko-language");
    if (languages.some(({ code }) => code === saved)) {
      setLanguage(saved as Locale);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : language;
    window.localStorage.setItem("linkko-language", language);
  }, [language]);

  function chooseTrip(name: string) {
    setTripInterest(name);
    setWhatsAppOpened(false);
    window.setTimeout(() => {
      document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }

  function submitTrip(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const t = (value: string) => translateText(value, language);
    const selected = String(form.get("interest") || "");
    const lines = [
      t("Hello Link & Ko Bali, I would like to plan a Bali trip."),
      "",
      `${t("Full Name")}: ${form.get("fullName") || ""}`,
      `${t("WhatsApp")}: ${form.get("whatsapp") || ""}`,
      `${t("Travel Date")}: ${form.get("travelDate") || ""}`,
      `${t("Number of Guests")}: ${form.get("guests") || ""}`,
      `${t("Pickup / Hotel")}: ${form.get("pickup") || ""}`,
      `${t("What would you like to do?")}: ${t(selected)}`,
      `${t("Estimated Budget")}: ${form.get("budget") || t("Not specified")}`,
      `${t("Additional Message")}: ${form.get("message") || t("None")}`,
    ];

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener,noreferrer",
    );
    setWhatsAppOpened(true);
  }

  const whatsappUrl = directWhatsAppUrl(language);

  return (
    <LanguageContext.Provider value={language}>
      <Translated>
        <main>
          <nav className="siteNav" aria-label="Primary navigation">
            <div className="navInner shell">
              <a className="brand" href="#home" aria-label="Link & Ko Bali home">
                <img src="/assets/link-ko-bali-logo.jpeg" alt="Link & Ko Bali logo" />
                <span>Link &amp; Ko <b>Bali</b></span>
              </a>

              <div className={menuOpen ? "navLinks isOpen" : "navLinks"}>
                <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
                <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
                <a href="#trips" onClick={() => setMenuOpen(false)}>Trips</a>
                <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
                <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
                <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
              </div>

              <div className="navTools">
                <div className="languageSelect" aria-label="Language">
                  {languages.map(({ code, label }) => (
                    <button
                      key={code}
                      type="button"
                      className={language === code ? "active" : ""}
                      onClick={() => setLanguage(code)}
                      aria-pressed={language === code}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <a className="navCta" href={whatsappUrl} target="_blank" rel="noreferrer">
                  Plan Your Trip <Icon name="arrow" size={17} />
                </a>
                <button
                  className={menuOpen ? "menuButton active" : "menuButton"}
                  type="button"
                  onClick={() => setMenuOpen((current) => !current)}
                  aria-expanded={menuOpen}
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                >
                  <span />
                  <span />
                </button>
              </div>
            </div>
          </nav>

          <header className="hero" id="home">
            <div className="shell heroGrid">
              <div className="heroCopy">
                <div className="eyebrow"><span /> Bali, Indonesia</div>
                <h1>Your Bali trip, <em>made simple.</em></h1>
                <p className="heroLead">
                  Private drivers, car rental, airport transfers and selected Bali trips — arranged around your schedule.
                </p>
                <p className="heroSupport">Solo travellers, couples, families and groups are welcome.</p>
                <div className="heroActions">
                  <a className="button primary" href="#booking">
                    Plan Your Trip <Icon name="arrow" size={18} />
                  </a>
                  <a className="button secondary" href="#services">View Services</a>
                </div>
                <div className="heroProof">
                  <span>Personal</span>
                  <span>Flexible</span>
                  <span>Easy Communication</span>
                </div>
              </div>

              <div className="heroVisual">
                <img src="/assets/nusa-kelingking.jpg" alt="Kelingking Beach and the blue ocean in Nusa Penida" />
                <div className="heroCard">
                  <span>Explore your way</span>
                  <strong>Cars · Drivers · Bali trips</strong>
                </div>
                <div className="heroStamp" aria-hidden="true">BALI<br /><b>LOCAL</b></div>
              </div>
            </div>
          </header>

          <section className="section servicesSection" id="services">
            <div className="shell">
              <div className="sectionHeading splitHeading">
                <div>
                  <div className="eyebrow"><span /> Our services</div>
                  <h2>Everything you need to move around Bali.</h2>
                </div>
                <p>Choose a simple service or send us your route for a personal quote.</p>
              </div>

              <div className="serviceGrid">
                {services.map((service, index) => (
                  <article className="serviceCard" key={service.title}>
                    <div className="serviceTop">
                      <span className="serviceIcon"><Icon name={service.icon} /></span>
                      <span className="cardNumber">0{index + 1}</span>
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    {service.price ? (
                      <div className="priceBlock">
                        <small>Starting from</small>
                        <strong>{service.price}</strong>
                        {service.note && <span>{service.note}</span>}
                      </div>
                    ) : <div className="priceSpacer" />}
                    {service.target ? (
                      <a className="cardLink" href={service.target}>{service.action} <Icon name="arrow" size={16} /></a>
                    ) : (
                      <button className="cardLink" type="button" onClick={() => chooseTrip(service.title)}>
                        {service.action} <Icon name="arrow" size={16} />
                      </button>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="whySection">
            <div className="shell whyGrid">
              <div className="whyIntro">
                <div className="eyebrow light"><span /> Why Link &amp; Ko Bali</div>
                <h2>Bali, without complicated planning.</h2>
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  Ask us on WhatsApp <Icon name="arrow" size={18} />
                </a>
              </div>
              <div className="benefitGrid">
                {benefits.map((benefit) => (
                  <article key={benefit.title}>
                    <Icon name={benefit.icon} />
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="section tripsSection" id="trips">
            <div className="shell">
              <div className="sectionHeading splitHeading">
                <div>
                  <div className="eyebrow"><span /> Popular trips</div>
                  <h2>Popular Bali experiences.</h2>
                </div>
                <p>Pick a starting point. We will confirm the schedule and final details through WhatsApp.</p>
              </div>

              <div className="tripGrid">
                {nusaTrips.map((trip, index) => (
                  <article className={index === 0 ? "tripCard featured" : "tripCard"} key={trip.name}>
                    <div className="tripImage">
                      <img src={trip.image} alt={trip.alt} loading="lazy" />
                      <span>Nusa Penida</span>
                    </div>
                    <div className="tripContent">
                      <h3>{trip.name}</h3>
                      <p>{trip.description}</p>
                      <ul>
                        {trip.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                      </ul>
                      <div className="tripFooter">
                      <div><strong>{trip.price}</strong><small>per person</small></div>
                        <button type="button" onClick={() => chooseTrip(trip.name)} aria-label={`Check availability for ${trip.name}`}>
                          <Icon name="arrow" size={18} />
                        </button>
                      </div>
                      <button className="availabilityLink" type="button" onClick={() => chooseTrip(trip.name)}>
                        Check Availability
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="jeepSection" id="jeep">
            <div className="shell jeepGrid">
              <div className="jeepVisual">
                <img src="/assets/mount-batur-jeep.jpg" alt="Jeep experience with Mount Batur in the background" loading="lazy" />
                <div className="jeepOverlay">
                  <span>Mount Batur</span>
                  <strong>Volcanic views. A memorable ride.</strong>
                </div>
              </div>
              <div className="jeepContent">
                <div className="eyebrow light"><span /> Kintamani</div>
                <h2>Mount Batur Jeep Experiences.</h2>
                <p className="jeepIntro">Choose sunrise, sunset or a relaxed afternoon trip. Maximum 3 guests per jeep.</p>
                <div className="jeepCards">
                  {jeepTrips.map((trip) => (
                    <article key={trip.name}>
                      <div>
                        <h3>{trip.name}</h3>
                        <p>{trip.description}</p>
                      </div>
                      <div className="jeepPrice">
                        <small>Starting from</small>
                        <strong>{trip.price}</strong>
                        <span>per jeep</span>
                      </div>
                      <button type="button" onClick={() => chooseTrip(trip.name)}>
                        Check Availability <Icon name="arrow" size={16} />
                      </button>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="section aboutSection" id="about">
            <div className="shell aboutGrid">
              <div>
                <div className="eyebrow"><span /> Local service</div>
                <h2>Local Bali trips, made personal.</h2>
              </div>
              <div className="aboutCopy">
                <p>Link & Ko Bali helps travellers arrange transportation and selected Bali experiences without complicated planning. Pricing is confirmed based on your route, group size and requirements.</p>
                <p>Chelyn works directly with guests and may drive when available. If she is already on another trip, we can arrange another suitable driver.</p>
                <p>Our goal is simple: make moving around Bali easier, more personal and more comfortable.</p>
              </div>
            </div>
          </section>

          <section className="comfortSection">
            <div className="shell">
              <div className="comfortHeading">
                <div>
                  <div className="eyebrow"><span /> Personal touch</div>
                  <h2>Small details. Better trips.</h2>
                </div>
                <p>Available with selected Link &amp; Ko private-driver services.</p>
              </div>
              <div className="comfortGrid">
                {comforts.map((item) => (
                  <article key={item.label}><Icon name={item.icon} /><span>{item.label}</span></article>
                ))}
              </div>
            </div>
          </section>

          <section className="section stepsSection">
            <div className="shell">
              <div className="sectionHeading centered">
                <div className="eyebrow"><span /> How it works</div>
                <h2>From idea to Bali day in three steps.</h2>
              </div>
              <div className="stepsGrid">
                {steps.map((step) => (
                  <article key={step.number}>
                    <span>{step.number}</span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </article>
                ))}
              </div>
              <div className="centerAction">
                <a className="button primary" href={whatsappUrl} target="_blank" rel="noreferrer">
                  Start Planning on WhatsApp <Icon name="arrow" size={18} />
                </a>
              </div>
            </div>
          </section>

          <section className="section faqSection" id="faq">
            <div className="shell faqGrid">
              <div className="faqIntro">
                <div className="eyebrow"><span /> FAQ</div>
                <h2>Quick answers before you message us.</h2>
                <p>Need something more specific?</p>
                <a href={whatsappUrl} target="_blank" rel="noreferrer">Ask us on WhatsApp <Icon name="arrow" size={17} /></a>
              </div>
              <div className="faqList">
                {faqs.map(([question, answer], index) => (
                  <details key={question} open={index === 0}>
                    <summary><span>0{index + 1}</span>{question}<b aria-hidden="true">+</b></summary>
                    <p>{answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className="bookingSection" id="booking">
            <div className="shell bookingGrid">
              <div className="bookingIntro">
                <div className="eyebrow light"><span /> Plan your trip</div>
                <h2>Tell us what your Bali trip needs.</h2>
                <p>Send the essentials now. We will discuss the rest with you on WhatsApp.</p>
                <div className="bookingNotes">
                  <div><strong>30% deposit</strong><span>To confirm your reservation.</span></div>
                  <div><strong>Flexible payment</strong><span>Bank transfer · Cash · Card · QRIS</span></div>
                  <div><strong>Simple policy</strong><span>Cancel more than 72 hours before your trip for a refundable deposit. Within 72 hours, the deposit is non-refundable. Rescheduling is subject to availability; refunds may take up to 3 business days.</span></div>
                </div>
              </div>

              <form className="tripForm" onSubmit={submitTrip}>
                <div className="formHeader">
                  <span>Trip request</span>
                  <small>Usually replied to during business hours</small>
                </div>
                <div className="formGrid">
                  <label>
                    Full Name
                    <input name="fullName" required autoComplete="name" />
                  </label>
                  <label>
                    WhatsApp
                    <input name="whatsapp" required type="tel" autoComplete="tel" />
                  </label>
                  <label>
                    Travel Date
                    <input name="travelDate" required type="date" />
                  </label>
                  <label>
                    Number of Guests
                    <input name="guests" required type="number" min="1" inputMode="numeric" />
                  </label>
                  <label className="fullField">
                    Pickup / Hotel
                    <input name="pickup" required />
                  </label>
                  <label className="fullField">
                    What would you like to do?
                    <select
                      name="interest"
                      required
                      value={tripInterest}
                      onChange={(event) => setTripInterest(event.target.value)}
                    >
                      <option value="">Choose a service or trip</option>
                      {tripOptions.map((option) => <option value={option} key={option}>{option}</option>)}
                      {tripInterest && !tripOptions.includes(tripInterest) && <option value={tripInterest}>{tripInterest}</option>}
                    </select>
                  </label>
                  <label className="fullField">
                    Estimated Budget <span>Optional</span>
                    <input name="budget" />
                  </label>
                  <label className="fullField">
                    Additional Message <span>Optional</span>
                    <textarea name="message" rows={4} />
                  </label>
                </div>
                <button className="formSubmit" type="submit">
                  Send My Trip Request <Icon name="arrow" size={18} />
                </button>
                <p className="formNote">This button opens WhatsApp with your trip details.</p>
                {whatsAppOpened && (
                  <p className="formStatus" role="status">WhatsApp opened. Review your request, then tap send.</p>
                )}
              </form>
            </div>
          </section>

          <section className="contactSection" id="contact">
            <div className="shell contactGrid">
              <div className="contactIntro">
                <div className="eyebrow"><span /> Contact</div>
                <h2>One message away from your Bali plan.</h2>
                <p>Business hours: 9:00 AM – 9:00 PM Bali Time.</p>
                <div className="contactLinks">
                  <a href={whatsappUrl} target="_blank" rel="noreferrer"><span>WhatsApp</span><b>+62 859-5931-3339</b><Icon name="arrow" size={18} /></a>
                  <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><span>Instagram</span><b>@linkandkobali</b><Icon name="arrow" size={18} /></a>
                  <a href="#qr-wechat"><span>WeChat</span><b>ID: link</b><Icon name="arrow" size={18} /></a>
                  <a href="#qr-rednote"><span>RedNote</span><b>ID: Chelynvoyage</b><Icon name="arrow" size={18} /></a>
                </div>
              </div>
              <div className="qrPanel">
                <div className="qrPanelHeader">
                  <h3>Scan to connect</h3>
                  <p>Open a QR image for full size.</p>
                </div>
                <div className="qrGrid">
                  {[
                    ["WhatsApp", "/assets/whatsapp-qr.jpeg", "qr-whatsapp"],
                    ["WeChat", "/assets/wechat-qr.jpeg", "qr-wechat"],
                    ["RedNote", "/assets/rednote-qr.jpeg", "qr-rednote"],
                    ["Instagram", "/assets/instagram-qr.jpeg", "qr-instagram"],
                  ].map(([name, source, id]) => (
                    <a id={id} href={source} target="_blank" rel="noreferrer" key={name} aria-label={`Open ${name} QR code`}>
                      <img src={source} alt={`${name} QR code for Link & Ko Bali`} loading="lazy" />
                      <span>{name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <footer>
            <div className="shell footerGrid">
              <div className="footerBrand">
                <img src="/assets/link-ko-bali-logo.jpeg" alt="Link & Ko Bali logo" />
                <div><strong>Link &amp; Ko Bali</strong><span>Bali, Indonesia</span></div>
              </div>
              <p>Private Drivers · Car Rental · Airport Transfers · Bali Trips</p>
              <div className="footerLinks">
                <a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a>
                <a href="#qr-wechat">WeChat</a>
                <a href="#qr-rednote">RedNote</a>
              </div>
            </div>
            <div className="shell footerBottom"><span>© 2026 Link &amp; Ko Bali</span><a href="#home">Back to top ↑</a></div>
          </footer>

          <a className="floatingWhatsApp" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
            <Icon name="chat" size={21} /><span>WhatsApp</span>
          </a>
        </main>
      </Translated>
    </LanguageContext.Provider>
  );
}
