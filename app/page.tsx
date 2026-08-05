"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  LanguageContext,
  Locale,
  Translated,
  translateText,
} from "./i18n";

const WHATSAPP_URL =
  "https://wa.me/6285959313339?text=Hi%20Chelyn%2C%20I%20found%20Link%20%26%20Ko%20Bali%20and%20would%20like%20to%20plan%20a%20trip.";

const ERIKO_WHATSAPP_URL =
  "https://wa.me/6289636867215?text=Halo%20Eriko%2C%20saya%20menemukan%20Link%20%26%20Ko%20Bali%20dan%20ingin%20merencanakan%20perjalanan%20di%20Bali.";

const CHINESE_WHATSAPP_URL =
  "https://wa.me/6285959313339?text=%E4%BD%A0%E5%A5%BD%20Chelyn%EF%BC%8C%E6%88%91%E5%9C%A8%20Link%20%26%20Ko%20Bali%20%E7%BD%91%E7%AB%99%E4%B8%8A%E7%9C%8B%E5%88%B0%E4%BD%A0%E4%BB%AC%EF%BC%8C%E6%83%B3%E5%92%A8%E8%AF%A2%E5%B7%B4%E5%8E%98%E5%B2%9B%E8%A1%8C%E7%A8%8B%E3%80%82";

const RUSSIAN_WHATSAPP_URL =
  "https://wa.me/6285959313339?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20Chelyn!%20%D0%AF%20%D0%BD%D0%B0%D1%88%D1%91%D0%BB(%D0%BB%D0%B0)%20Link%20%26%20Ko%20Bali%20%D0%B8%20%D1%85%D0%BE%D1%87%D1%83%20%D1%81%D0%BF%D0%BB%D0%B0%D0%BD%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%20%D0%BF%D0%BE%D0%B5%D0%B7%D0%B4%D0%BA%D1%83%20%D0%BF%D0%BE%20%D0%91%D0%B0%D0%BB%D0%B8.";

const JAPANESE_WHATSAPP_URL =
  "https://wa.me/6285959313339?text=%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AFChelyn%E3%80%82Link%20%26%20Ko%20Bali%E3%81%AE%E3%82%A6%E3%82%A7%E3%83%96%E3%82%B5%E3%82%A4%E3%83%88%E3%82%92%E8%A6%8B%E3%81%A6%E3%80%81%E3%83%90%E3%83%AA%E6%97%85%E8%A1%8C%E3%81%AE%E7%9B%B8%E8%AB%87%E3%82%92%E3%81%97%E3%81%9F%E3%81%84%E3%81%A7%E3%81%99%E3%80%82";

const KOREAN_WHATSAPP_URL =
  "https://wa.me/6285959313339?text=" +
  encodeURIComponent("안녕하세요 Chelyn. Link & Ko Bali 웹사이트를 보고 발리 여행을 상담하고 싶습니다.");

const transportServices = [
  {
    eyebrow: "Independent rental",
    title: "Local Car Rental",
    detail: "Local-area rental service",
    price: "IDR 299,000",
  },
  {
    eyebrow: "Arrival made simple",
    title: "Airport Transfer",
    detail: "Starting price for the Kuta area",
    price: "IDR 99,000",
  },
  {
    eyebrow: "A focused itinerary",
    title: "Half-Day Private Car",
    detail: "Up to 5 hours",
    price: "IDR 349,000",
  },
  {
    eyebrow: "A full Bali day",
    title: "Full-Day Private Car",
    detail: "Up to 10 hours",
    price: "IDR 699,000",
  },
];

type TourPackage = {
  name: string;
  summary: string;
  mainDestination: string;
  price: string;
  starting?: boolean;
  badge?: string;
  childDiscount?: string;
  departure?: string;
  duration?: string;
  startFinish?: string;
  priceBasis?: string;
  guestRange?: string;
  activities: string[];
  transport: string;
  meals: string;
  tickets: string;
  guide: string;
  clothing?: string;
  activityLevel?: string;
  ageRestrictions?: string;
  availability?: string;
  destinationsTitle?: string;
  destinations?: string[];
  inclusions: string[];
  notices?: string[];
  placeholders: string[];
};

const nusaPackages: TourPackage[] = [
  {
    name: "Nusa Penida Snorkeling Package",
    summary:
      "A sea-focused Nusa Penida day combining return transfers, four snorkeling locations, and lunch.",
    mainDestination: "Nusa Penida",
    price: "IDR 1,350,000",
    priceBasis: "Per person",
    childDiscount: "20% discount for children aged 0–3 years",
    departure:
      "Selected departures are from Sanur or Matahari Terbit Harbour. The exact meeting point is confirmed after booking.",
    activities: ["Fast-boat journey", "Snorkeling", "Lunch"],
    transport: "Hotel transfer and return fast-boat transfer are listed as included.",
    meals: "Lunch and mineral water are listed as included.",
    tickets: "Entrance tickets are not specifically listed as included.",
    guide: "English-speaking driver or guide is listed as included.",
    destinationsTitle: "Snorkeling locations",
    destinations: ["Manta Bay", "Gamat Bay", "Crystal Bay", "Wall Bay"],
    inclusions: [
      "Hotel pickup and drop-off",
      "Return fast-boat transfer",
      "Snorkeling at four locations",
      "Snorkeling equipment",
      "Towel",
      "Lunch",
      "English-speaking driver or guide",
      "Insurance coverage",
      "Mineral water",
    ],
    notices: [
      "Snorkeling locations are subject to weather, sea conditions, and safety considerations. Manta sightings cannot be guaranteed.",
    ],
    placeholders: [],
  },
  {
    name: "Combination West and East One-Day Island Tour",
    summary:
      "A combined sightseeing route covering selected highlights on both the west and east sides of Nusa Penida.",
    mainDestination: "West and East Nusa Penida",
    price: "IDR 1,499,000",
    priceBasis: "Per person",
    starting: true,
    departure: "[CONFIRM DEPARTURE HARBOUR]",
    activities: ["Island sightseeing", "Beach and viewpoint stops", "Lunch"],
    transport: "Hotel transfer, return fast boat, and a private car in Nusa Penida are listed as included.",
    meals: "À la carte lunch and mineral water are listed as included.",
    tickets: "Entrance fees are listed as included.",
    guide: "English-speaking driver or guide is listed as included.",
    destinations: [
      "Kelingking Beach",
      "Broken Beach",
      "Diamond Beach",
      "Tree House",
    ],
    inclusions: [
      "Return hotel transfer",
      "Return fast-boat transfer",
      "Private car in Nusa Penida",
      "À la carte lunch",
      "Entrance fees",
      "English-speaking driver or guide",
      "Insurance coverage",
      "Mineral water",
    ],
    notices: [
      "The itinerary may be adjusted because of traffic, weather, harbour operations, road conditions, or safety considerations.",
    ],
    placeholders: [
      "CONFIRM WHETHER ALL FOUR DESTINATIONS CAN ALWAYS BE VISITED IN ONE DAY",
      "CONFIRM HOTEL PICKUP AREAS",
      "CONFIRM INSURANCE COVERAGE DETAILS",
    ],
  },
  {
    name: "West Nusa Penida Island Tour",
    summary:
      "A west-coast sightseeing route featuring cliffs, natural formations, and Crystal Bay.",
    mainDestination: "West Nusa Penida",
    price: "IDR 1,350,000",
    priceBasis: "Per person",
    childDiscount: "20% discount for children aged 0–3 years",
    departure: "[CONFIRM DEPARTURE HARBOUR]",
    activities: ["Island sightseeing", "Beach and cliff viewpoints", "Lunch"],
    transport: "Hotel transfer, return fast boat, and a private car with fuel are listed as included.",
    meals: "Restaurant lunch and mineral water are listed as included.",
    tickets: "Entrance tickets for the listed destinations are included.",
    guide: "English-speaking driver or guide is listed as included.",
    destinations: [
      "Angel’s Billabong",
      "Broken Beach",
      "Kelingking Cliff",
      "Crystal Bay",
    ],
    inclusions: [
      "Hotel pickup and drop-off",
      "Return fast-boat transfer",
      "Nusa Penida island tour",
      "Lunch at a restaurant",
      "Private car",
      "Fuel",
      "Entrance tickets for the listed destinations",
      "English-speaking driver or guide",
      "Insurance coverage",
      "Mineral water",
    ],
    placeholders: [
      "CONFIRM HOTEL PICKUP AREAS",
      "CONFIRM INSURANCE COVERAGE DETAILS",
    ],
  },
  {
    name: "East Nusa Penida Island Tour",
    summary:
      "An east-coast sightseeing route featuring beaches, the Tree House, and Thousand Islands Viewpoint.",
    mainDestination: "East Nusa Penida",
    price: "IDR 1,450,000",
    priceBasis: "Per person",
    childDiscount: "20% discount for children aged 0–3 years",
    departure: "[CONFIRM DEPARTURE HARBOUR]",
    activities: ["Island sightseeing", "Beach and viewpoint stops", "Lunch"],
    transport: "Hotel transfer, return fast boat, and a private car with fuel are listed as included.",
    meals: "Restaurant lunch and mineral water are listed as included.",
    tickets: "Entrance tickets for the listed destinations are included.",
    guide: "English-speaking driver or guide is listed as included.",
    destinations: [
      "Diamond Beach",
      "Atuh Beach",
      "Tree House",
      "Thousand Islands Viewpoint",
    ],
    inclusions: [
      "Hotel pickup and drop-off",
      "Return fast-boat transfer",
      "Nusa Penida island tour",
      "Lunch at a restaurant",
      "Private car",
      "Fuel",
      "Entrance tickets for the listed destinations",
      "English-speaking driver or guide",
      "Insurance coverage",
      "Mineral water",
    ],
    placeholders: [
      "CONFIRM HOTEL PICKUP AREAS",
      "CONFIRM INSURANCE COVERAGE DETAILS",
    ],
  },
  {
    name: "Nusa Penida Special Package",
    summary:
      "A combined snorkeling and west-island sightseeing experience for guests who want both sea and land activities.",
    mainDestination: "Nusa Penida",
    price: "IDR 1,650,000",
    priceBasis: "Per person",
    childDiscount: "20% discount for children aged 0–3 years",
    departure: "[CONFIRM DEPARTURE HARBOUR]",
    activities: ["Snorkeling", "Island sightseeing", "Lunch"],
    transport: "Hotel transfer, return fast boat, and a private car with fuel are listed as included.",
    meals: "Restaurant lunch and mineral water are listed as included.",
    tickets: "Entrance tickets for the listed destinations are included.",
    guide: "English-speaking driver or guide is listed as included.",
    destinationsTitle: "Snorkeling and island-tour locations",
    destinations: [
      "Manta Bay",
      "Gamat Bay",
      "Crystal Bay",
      "Wall Bay",
      "Kelingking Cliff",
      "Angel’s Billabong",
      "Broken Beach",
    ],
    inclusions: [
      "Hotel pickup and drop-off",
      "Return fast-boat transfer",
      "Snorkeling at four locations",
      "Island tour covering three destinations",
      "Lunch at a restaurant",
      "Private car",
      "Fuel",
      "Entrance tickets for the listed destinations",
      "English-speaking driver or guide",
      "Insurance coverage",
      "Mineral water",
    ],
    notices: [
      "Snorkeling and island-tour locations may be changed or cancelled because of weather, sea conditions, road conditions, timing, or safety concerns.",
    ],
    placeholders: [
      "CONFIRM WHETHER SNORKELING EQUIPMENT AND TOWELS ARE INCLUDED",
      "CONFIRM HOTEL PICKUP AREAS",
      "CONFIRM INSURANCE COVERAGE DETAILS",
    ],
  },
];

const seranganPackage: TourPackage = {
  name: "West Nusa Penida Tour from Serangan Harbour",
  summary:
    "A private one-person west Nusa Penida package departing from Serangan Harbour and arriving at a private jetty.",
  mainDestination: "West Nusa Penida",
  price: "IDR 1,499,000",
  badge: "Daily Departure",
  departure: "Serangan Harbour → private jetty in Nusa Penida",
  priceBasis: "Private package price shown for one guest",
  guestRange: "One guest at the displayed price; pricing for two or more guests must be confirmed.",
  availability: "Daily departure",
  activities: ["Island sightseeing", "Lunch", "Beach-club access"],
  transport: "Return boat ticket and a private car in Nusa Penida are included. Hotel transfer is not yet confirmed.",
  meals: "Lunch is listed as included.",
  tickets: "Nusa Penida entrance fee is listed as included.",
  guide: "A driver or guide is not specifically listed and must be confirmed.",
  destinationsTitle: "Suggested itinerary",
  destinations: [
    "Departure from Serangan Harbour",
    "Kelingking Beach",
    "Angel’s Billabong",
    "Broken Beach",
    "Lunch",
    "Return journey",
  ],
  inclusions: [
    "Private car in Nusa Penida",
    "Return boat ticket from Serangan Harbour to the private jetty in Nusa Penida",
    "Lunch",
    "Nusa Penida tour based on the listed itinerary",
    "Nusa Penida entrance fee",
    "Complimentary access to Caspla Beach Club",
    "Complimentary swimming-pool access",
    "Air-conditioned toilet facilities",
    "Boat waiting area at the beach club",
  ],
  notices: [
    "This price is for a private package for one guest.",
    "Water sports are available at the beach club. Complimentary access is not confirmed.",
  ],
  placeholders: [
    "CONFIRM WHETHER HOTEL TRANSFER IS INCLUDED",
    "CONFIRM WHETHER WATER SPORTS REQUIRE AN ADDITIONAL PAYMENT",
    "CONFIRM BOAT DEPARTURE AND RETURN TIMES",
    "CONFIRM WHETHER BEACH-CLUB ACCESS DEPENDS ON OPERATING CONDITIONS",
    "CONFIRM INSURANCE COVERAGE",
    "CONFIRM PRICE FOR TWO OR MORE GUESTS",
  ],
};

const jeepPackages = [
  {
    name: "Afternoon Jeep Trip",
    summary: "An afternoon off-road visit to the Black Lava and Black Sand areas.",
    price: "IDR 940,000",
    inclusions: [
      "Black Lava",
      "Black Sand",
      "Mount Batur area entrance tickets",
    ],
    placeholder: "CONFIRM EXACT STARTING TIME AND DURATION",
  },
  {
    name: "Sunset Jeep Trip",
    summary: "A sunset-focused jeep experience with Black Lava, Black Sand, coffee, and snacks.",
    price: "IDR 1,120,000",
    inclusions: [
      "Sunset Point",
      "Black Lava",
      "Black Sand",
      "Coffee and snacks",
      "Mount Batur area entrance tickets",
    ],
    placeholder: "CONFIRM EXACT STARTING TIME AND DURATION",
  },
  {
    name: "Sunrise Jeep Trip",
    summary: "An early-morning jeep experience covering sunrise, Black Lava, coffee, and breakfast.",
    price: "IDR 1,120,000",
    inclusions: [
      "Sunrise viewpoint",
      "Black Lava",
      "Coffee break",
      "Breakfast",
      "Mount Batur area entrance tickets",
    ],
    placeholder: "CONFIRM EXACT PICKUP OR MEETING TIME",
  },
];

const faqs = [
  [
    "Can I customize a tour?",
    "Yes. Share your preferred destinations, dates, available time, group size, interests, budget, and any special requirements. We will prepare a suitable plan and confirm the final details in writing.",
  ],
  [
    "Are the tours private?",
    "Private land transportation is available where it is specifically listed. Fast boats and some activities may be shared. [CONFIRM WHICH PACKAGES ARE FULLY PRIVATE OR SHARED]",
  ],
  [
    "What is included in the price?",
    "Each package card lists its confirmed inclusions. Your written quotation will confirm transportation, meals, tickets, guide service, and any other inclusions before payment.",
  ],
  [
    "Are there additional charges?",
    "Unless specifically included, parking, toll-road fees, meals, activities, and entrance tickets are paid separately by the guest. Any other extra cost must be confirmed in the written quotation.",
  ],
  [
    "Is transportation included?",
    "It depends on the package. Only transportation specifically listed under Inclusions is included. Hotel pickup areas and exact meeting points may still require confirmation.",
  ],
  [
    "Where will I be picked up?",
    "Enter your hotel or pickup location in the request form. We will confirm the pickup point, coverage area, and any extra transfer cost before your booking is confirmed.",
  ],
  [
    "Can children join?",
    "Children may join suitable tours under adult supervision. Some Nusa Penida packages list a 20% discount for children aged 0–3. [ADD CHILD-SEAT AVAILABILITY] [CONFIRM ACTIVITY-SPECIFIC AGE RESTRICTIONS]",
  ],
  [
    "Are the tours suitable for elderly guests?",
    "Suitability depends on the route, access conditions, and the guest’s mobility and health. Disclose any mobility or medical requirements so we can assess the itinerary before confirmation.",
  ],
  [
    "What happens during bad weather?",
    "Routes, activities, or departure points may change for safety. [ADD WEATHER CANCELLATION, RESCHEDULING, AND REFUND POLICY]",
  ],
  [
    "What should I wear?",
    "Wear suitable clothing and secure footwear for the selected activities. Bring sun protection and any personal medication. Package-specific equipment requirements must be confirmed before departure.",
  ],
  [
    "Do I need travel insurance?",
    "Travel insurance is recommended. Some packages list insurance coverage, but the provider, benefits, exclusions, and limits still require confirmation. [ADD GENERAL INSURANCE INFORMATION]",
  ],
  [
    "Can you accommodate dietary restrictions?",
    "Tell us about allergies, dietary restrictions, or preferences in the request form. We will confirm what can be accommodated before the trip.",
  ],
  [
    "How do I pay?",
    "A 30% deposit confirms the reservation. The remaining balance is due on the trip day. Accepted methods are bank transfer, cash, card, and QRIS. Bank transfers must go only to the official Bank Mandiri account shown on this website.",
  ],
  [
    "What is the cancellation policy?",
    "The deposit is refundable when cancellation is made more than 72 hours before the trip. Within 72 hours, the deposit is non-refundable. Rescheduling is allowed subject to availability; any fee or deadline still needs confirmation.",
  ],
  [
    "How quickly will I receive my custom plan?",
    "We review requests and reply through WhatsApp or email during business hours, 9:00 AM–9:00 PM Bali time (WITA).",
  ],
];

const safetyItems = [
  "Guests must follow the instructions of the driver, guide, boat crew, activity operator, and local authorities.",
  "Tour schedules and destinations may change because of weather, sea conditions, traffic, road conditions, harbour operations, volcanic activity, government restrictions, or other safety concerns.",
  "Guests must disclose relevant medical conditions, allergies, injuries, pregnancy, mobility limitations, or other health concerns before participating.",
  "Guests must bring their own personal medication.",
  "Children must remain under the supervision of a parent or responsible adult.",
  "Guests should wear suitable clothing and footwear for the selected activities.",
  "Safety equipment must be worn when required.",
  "Alcohol use or unsafe behaviour may result in removal from an activity.",
  "Snorkeling locations and manta sightings cannot be guaranteed.",
  "The operator may refuse participation when a guest’s health, condition, or behaviour creates a safety risk.",
  "Guests are responsible for personal belongings unless otherwise required by applicable law.",
  "Emergency contact during the tour: Chelyn, +62 858-2375-4807.",
  "Travel insurance is recommended.",
  "Some package cards list insurance coverage, but the provider, benefits, limits, and exclusions must be confirmed. [ADD INSURANCE INFORMATION]",
];

const guestInformation = [
  {
    title: "Booking and confirmation",
    items: [
      "Submit a package or custom-tour request through the form or official WhatsApp number.",
      "We will confirm availability, the final itinerary, price, inclusions, exclusions, and pickup details in writing.",
      "A 30% deposit is required to confirm the reservation. The remaining balance is due on the day of the trip.",
      "Messages are answered during business hours, 9:00 AM–9:00 PM Bali time (WITA).",
      "[ADD BOOKING CONFIRMATION DOCUMENT OR REFERENCE PROCESS]",
    ],
  },
  {
    title: "Changes, refunds, and timing",
    items: [
      "Cancellation more than 72 hours before the trip: the deposit is refundable.",
      "Cancellation within 72 hours: the deposit is non-refundable.",
      "Rescheduling is allowed, subject to availability.",
      "[ADD REFUND PROCESS AND PROCESSING TIME]",
      "[ADD WEATHER CANCELLATION POLICY]",
      "[ADD LATE ARRIVAL POLICY]",
      "[ADD NO-SHOW POLICY]",
    ],
  },
  {
    title: "Pickup and preparation",
    items: [
      "The exact pickup point and departure details will be confirmed after booking.",
      "Bring suitable clothing and footwear, sun protection, required personal medication, and activity-specific equipment when advised.",
      "[ADD PICKUP INSTRUCTIONS]",
      "[ADD WAITING TIME]",
      "[ADD IDENTIFICATION REQUIREMENTS]",
      "[ADD CHILD-SEAT AVAILABILITY]",
    ],
  },
  {
    title: "Accessibility, language, and food",
    items: [
      "Disclose medical, mobility, pregnancy, allergy, accessibility, and dietary requirements before confirmation.",
      "English, Indonesian, Simplified Chinese, Russian, Japanese, and Korean are available.",
      "[ADD ACCESSIBILITY INFORMATION BY TOUR]",
      "[ADD DIETARY ACCOMMODATION PROCESS]",
    ],
  },
  {
    title: "Photography and belongings",
    items: [
      "Guests are responsible for personal belongings unless otherwise required by applicable law.",
      "[ADD PHOTOGRAPHY AND IMAGE-USE POLICY]",
      "[ADD LOST-PROPERTY REPORTING AND RETURN PROCESS]",
    ],
  },
  {
    title: "Contact and emergencies",
    items: [
      "Official WhatsApp and phone: +62 859-5931-3339.",
      "Emergency contact: Chelyn, +62 858-2375-4807.",
      "Business hours: 9:00 AM–9:00 PM Bali time (WITA).",
      "Messages are answered during business hours.",
    ],
  },
];

const Arrow = () => <span aria-hidden="true">↗</span>;

function PlaceholderList({ items }: { items: string[] }) {
  return (
    <Translated><div className="confirmBox">
      <strong>Details to confirm before publishing</strong>
      {items.map((item) => (
        <span key={item}>[{item}]</span>
      ))}
    </div></Translated>
  );
}

function TourCard({
  tour,
  onRequest,
}: {
  tour: TourPackage;
  onRequest: (name: string) => void;
}) {
  return (
    <Translated><article className="tourCard">
      <div className="tourTop">
        <div>
          {tour.badge && <span className="badge">{tour.badge}</span>}
          <h3>{tour.name}</h3>
          <p className="tourSummary">{tour.summary}</p>
          {tour.childDiscount && (
            <p className="childOffer">{tour.childDiscount}</p>
          )}
        </div>
        <div className="tourPrice">
          {tour.starting && <small>Starting from</small>}
          <strong>{tour.price}</strong>
        </div>
      </div>
      {tour.departure && (
        <p className="departure">
          <b>Departure:</b> {tour.departure}
        </p>
      )}
      <div className="tourFacts" aria-label={`${tour.name} key details`}>
        <div><small>Main destination</small><strong>{tour.mainDestination}</strong></div>
        <div><small>Duration</small><strong>{tour.duration || "[ADD DURATION]"}</strong></div>
        <div><small>Start and finish</small><strong>{tour.startFinish || "[ADD STARTING AND FINISHING TIME]"}</strong></div>
        <div><small>Price basis</small><strong>{tour.priceBasis || "[CONFIRM WHETHER PRICE IS PER PERSON OR PER GROUP]"}</strong></div>
        <div><small>Guest numbers</small><strong>{tour.guestRange || "[ADD MINIMUM AND MAXIMUM NUMBER OF GUESTS]"}</strong></div>
        <div><small>Availability</small><strong>{tour.availability || "[ADD OPERATING DAYS]"}</strong></div>
      </div>
      <div className="tourDetails">
        {tour.destinations && (
          <div>
            <h4>{tour.destinationsTitle || "Destinations"}</h4>
            <ul>
              {tour.destinations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <h4>Main activities</h4>
          <ul>
            {tour.activities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h4>Inclusions</h4>
          <ul className="included">
            {tour.inclusions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="serviceFacts">
        <div><b>Transportation</b><span>{tour.transport}</span></div>
        <div><b>Meals / refreshments</b><span>{tour.meals}</span></div>
        <div><b>Entrance tickets</b><span>{tour.tickets}</span></div>
        <div><b>Driver / guide</b><span>{tour.guide}</span></div>
      </div>
      <div className="readinessGrid">
        <div><b>Recommended clothing / equipment</b><span>{tour.clothing || "[ADD RECOMMENDED CLOTHING OR EQUIPMENT]"}</span></div>
        <div><b>Physical activity level</b><span>{tour.activityLevel || "[ADD PHYSICAL ACTIVITY LEVEL]"}</span></div>
        <div><b>Age restrictions</b><span>{tour.ageRestrictions || "[ADD AGE RESTRICTIONS, IF APPLICABLE]"}</span></div>
      </div>
      <div className="exclusion">
        <b>Exclusions</b>
        <span>Anything not specifically listed under Inclusions.</span>
      </div>
      {tour.notices?.map((notice) => (
        <p className="safetyNote" key={notice}>
          {notice}
        </p>
      ))}
      <PlaceholderList items={tour.placeholders} />
      <button className="btn primary requestBtn" onClick={() => onRequest(tour.name)}>
        Request This Package <Arrow />
      </button>
    </article></Translated>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Locale>("en");
  const [menu, setMenu] = useState(false);
  const [faq, setFaq] = useState(0);
  const [sent, setSent] = useState(false);
  const [tripInterest, setTripInterest] = useState("");

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : language;
  }, [language]);

  function requestPackage(name: string) {
    setTripInterest(name);
    setSent(false);
    window.setTimeout(() => {
      document.getElementById("custom-trip")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const lines = language === "id" ? [
      "Halo Eriko, saya menemukan Link & Ko Bali dan ingin meminta rencana perjalanan khusus.",
      "",
      `Nama: ${form.get("fullName") || ""}`,
      `WhatsApp: ${form.get("whatsapp") || ""}`,
      `Email: ${form.get("email") || ""}`,
      `Tanggal perjalanan: ${form.get("travelDate") || ""}`,
      `Jumlah dewasa: ${form.get("adults") || ""}`,
      `Anak / usia: ${form.get("children") || "Tidak ada"}`,
      `Hotel / penjemputan: ${form.get("pickup") || ""}`,
      `Lokasi pengantaran: ${form.get("dropoff") || "Sama dengan penjemputan"}`,
      `Waktu / jadwal: ${form.get("availableTime") || ""}`,
      `Destinasi pilihan: ${translateText(String(form.get("destinations") || ""), "id")}`,
      `Aktivitas: ${form.get("activities") || ""}`,
      `Perkiraan anggaran: ${form.get("budget") || ""}`,
      `Transportasi: ${form.get("transport") || ""}`,
      `Kebutuhan makanan: ${form.get("dietary") || "Tidak ada"}`,
      `Pertimbangan medis / mobilitas: ${form.get("medical") || "Tidak ada"}`,
      `Acara khusus: ${form.get("occasion") || "Tidak ada"}`,
      `Permintaan tambahan: ${form.get("requests") || "Tidak ada"}`,
    ] : language === "zh" ? [
      "你好 Chelyn，我在 Link & Ko Bali 网站上看到你们，想申请定制巴厘岛行程。",
      "",
      `姓名：${form.get("fullName") || ""}`,
      `WhatsApp：${form.get("whatsapp") || ""}`,
      `电子邮箱：${form.get("email") || ""}`,
      `出行日期：${form.get("travelDate") || ""}`,
      `成人数量：${form.get("adults") || ""}`,
      `儿童／年龄：${form.get("children") || "无"}`,
      `酒店／接送地点：${form.get("pickup") || ""}`,
      `送达地点：${form.get("dropoff") || "与接送地点相同"}`,
      `可用时间／行程安排：${form.get("availableTime") || ""}`,
      `喜欢的目的地：${translateText(String(form.get("destinations") || ""), "zh")}`,
      `活动：${form.get("activities") || ""}`,
      `预算：${form.get("budget") || ""}`,
      `交通需求：${form.get("transport") || ""}`,
      `饮食需求：${form.get("dietary") || "无"}`,
      `医疗／行动需求：${form.get("medical") || "无"}`,
      `特别纪念日：${form.get("occasion") || "无"}`,
      `其他需求：${form.get("requests") || "无"}`,
    ] : language === "ru" ? [
      "Здравствуйте, Chelyn! Я нашёл(ла) Link & Ko Bali и хочу запросить индивидуальный план поездки.",
      "",
      `Имя: ${form.get("fullName") || ""}`,
      `WhatsApp: ${form.get("whatsapp") || ""}`,
      `Электронная почта: ${form.get("email") || ""}`,
      `Дата поездки: ${form.get("travelDate") || ""}`,
      `Количество взрослых: ${form.get("adults") || ""}`,
      `Дети / возраст: ${form.get("children") || "Нет"}`,
      `Отель / место трансфера: ${form.get("pickup") || ""}`,
      `Место высадки: ${form.get("dropoff") || "То же место"}`,
      `Время / расписание: ${form.get("availableTime") || ""}`,
      `Желаемые места: ${translateText(String(form.get("destinations") || ""), "ru")}`,
      `Активности: ${form.get("activities") || ""}`,
      `Примерный бюджет: ${form.get("budget") || ""}`,
      `Транспорт: ${form.get("transport") || ""}`,
      `Требования к питанию: ${form.get("dietary") || "Нет"}`,
      `Медицинские особенности / подвижность: ${form.get("medical") || "Нет"}`,
      `Особое событие: ${form.get("occasion") || "Нет"}`,
      `Дополнительные пожелания: ${form.get("requests") || "Нет"}`,
    ] : language === "ja" ? [
      "こんにちはChelyn。Link & Ko Baliのウェブサイトを見て、カスタム旅行プランを依頼したいです。",
      "",
      `氏名：${form.get("fullName") || ""}`,
      `WhatsApp：${form.get("whatsapp") || ""}`,
      `メール：${form.get("email") || ""}`,
      `旅行日：${form.get("travelDate") || ""}`,
      `大人の人数：${form.get("adults") || ""}`,
      `子ども／年齢：${form.get("children") || "なし"}`,
      `ホテル／送迎場所：${form.get("pickup") || ""}`,
      `降車場所：${form.get("dropoff") || "送迎場所と同じ"}`,
      `利用可能な時間／日程：${form.get("availableTime") || ""}`,
      `希望する目的地：${translateText(String(form.get("destinations") || ""), "ja")}`,
      `アクティビティ：${form.get("activities") || ""}`,
      `ご予算：${form.get("budget") || ""}`,
      `交通のご要望：${form.get("transport") || ""}`,
      `食事のご要望：${form.get("dietary") || "なし"}`,
      `医療／移動面の配慮事項：${form.get("medical") || "なし"}`,
      `特別な日：${form.get("occasion") || "なし"}`,
      `その他のご要望：${form.get("requests") || "なし"}`,
    ] : language === "ko" ? [
      "안녕하세요 Chelyn. Link & Ko Bali 웹사이트를 보고 맞춤 발리 여행 플랜을 요청하고 싶습니다.",
      "",
      `성명: ${form.get("fullName") || ""}`,
      `WhatsApp: ${form.get("whatsapp") || ""}`,
      `이메일: ${form.get("email") || ""}`,
      `여행 날짜: ${form.get("travelDate") || ""}`,
      `성인 인원: ${form.get("adults") || ""}`,
      `어린이 / 나이: ${form.get("children") || "없음"}`,
      `호텔 / 픽업 장소: ${form.get("pickup") || ""}`,
      `샌딩 장소: ${form.get("dropoff") || "픽업 장소와 동일"}`,
      `이용 가능 시간 / 일정: ${form.get("availableTime") || ""}`,
      `희망 목적지: ${translateText(String(form.get("destinations") || ""), "ko")}`,
      `활동: ${form.get("activities") || ""}`,
      `예상 예산: ${form.get("budget") || ""}`,
      `교통 관련 요청: ${form.get("transport") || ""}`,
      `식단 요청: ${form.get("dietary") || "없음"}`,
      `의료 / 이동 관련 고려 사항: ${form.get("medical") || "없음"}`,
      `특별한 날: ${form.get("occasion") || "없음"}`,
      `추가 요청: ${form.get("requests") || "없음"}`,
    ] : [
      "Hi Chelyn, I found Link & Ko Bali and would like to request a custom trip plan.",
      "",
      `Name: ${form.get("fullName") || ""}`,
      `WhatsApp: ${form.get("whatsapp") || ""}`,
      `Email: ${form.get("email") || ""}`,
      `Travel date: ${form.get("travelDate") || ""}`,
      `Adults: ${form.get("adults") || ""}`,
      `Children / ages: ${form.get("children") || "None"}`,
      `Hotel / pickup: ${form.get("pickup") || ""}`,
      `Drop-off location: ${form.get("dropoff") || "Same as pickup"}`,
      `Available time / schedule: ${form.get("availableTime") || ""}`,
      `Preferred destinations: ${form.get("destinations") || ""}`,
      `Activities: ${form.get("activities") || ""}`,
      `Estimated budget: ${form.get("budget") || ""}`,
      `Transportation: ${form.get("transport") || ""}`,
      `Dietary requirements: ${form.get("dietary") || "None stated"}`,
      `Medical / mobility considerations: ${form.get("medical") || "None stated"}`,
      `Special occasion: ${form.get("occasion") || "None"}`,
      `Additional requests: ${form.get("requests") || "None"}`,
    ];
    window.open(
      `https://wa.me/${language === "id" ? "6289636867215" : "6285959313339"}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
  }

  const activeWhatsAppUrl = language === "id"
    ? ERIKO_WHATSAPP_URL
    : language === "zh"
      ? CHINESE_WHATSAPP_URL
      : language === "ru"
        ? RUSSIAN_WHATSAPP_URL
        : language === "ja"
          ? JAPANESE_WHATSAPP_URL
          : language === "ko"
            ? KOREAN_WHATSAPP_URL
            : WHATSAPP_URL;

  return (
    <LanguageContext.Provider value={language}>
    <Translated><main>
      <nav className="nav shell" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Link & Ko Bali home">
          <img
            className="brandLogo"
            src="/assets/link-ko-bali-logo.jpeg"
            alt="Link & Ko Bali logo"
          />
          <span>Link & Ko Bali<i>.</i></span>
        </a>
        <button
          className="menu"
          onClick={() => setMenu(!menu)}
          aria-label="Toggle menu"
          aria-expanded={menu}
        >
          <span />
          <span />
        </button>
        <div className={menu ? "links open" : "links"}>
          <a href="#top" onClick={() => setMenu(false)}>
            Home
          </a>
          <a href="#nusa-penida" onClick={() => setMenu(false)}>
            Tours
          </a>
          <a href="#custom-trip" onClick={() => setMenu(false)}>
            Custom Tour
          </a>
          <a href="#safety" onClick={() => setMenu(false)}>
            Safety
          </a>
          <a href="#faq" onClick={() => setMenu(false)}>
            FAQ
          </a>
          <a href="#contact" onClick={() => setMenu(false)}>
            Contact
          </a>
        </div>
        <div className="navActions">
          <div className="languageSwitch" aria-label="Language selection">
            <button
              className={language === "en" ? "active" : ""}
              onClick={() => setLanguage("en")}
              aria-pressed={language === "en"}
            >
              EN
            </button>
            <span aria-hidden="true">|</span>
            <button
              className={language === "id" ? "active" : ""}
              onClick={() => setLanguage("id")}
              aria-pressed={language === "id"}
            >
              ID
            </button>
            <span aria-hidden="true">|</span>
            <button
              className={language === "zh" ? "active" : ""}
              onClick={() => setLanguage("zh")}
              aria-pressed={language === "zh"}
            >
              中文
            </button>
            <span aria-hidden="true">|</span>
            <button
              className={language === "ru" ? "active" : ""}
              onClick={() => setLanguage("ru")}
              aria-pressed={language === "ru"}
            >
              RU
            </button>
            <span aria-hidden="true">|</span>
            <button
              className={language === "ja" ? "active" : ""}
              onClick={() => setLanguage("ja")}
              aria-pressed={language === "ja"}
            >
              日本語
            </button>
            <span aria-hidden="true">|</span>
            <button
              className={language === "ko" ? "active" : ""}
              onClick={() => setLanguage("ko")}
              aria-pressed={language === "ko"}
            >
              한국어
            </button>
          </div>
          <a className="navCta" href={activeWhatsAppUrl} target="_blank" rel="noreferrer">
            Chat on WhatsApp <Arrow />
          </a>
        </div>
      </nav>

      <section className="hero shell" id="top">
        <div className="eyebrow">
          <i /> Women-first care. Everyone is welcome.
        </div>
        <h1>
          Feel safe. See Bali
          <br />
          <em>your way.</em>
        </h1>
        <p>
          Thoughtful private driving and personalized day tours created to help
          women feel safe and supported. Couples, male travellers, Indonesian
          and international guests, and groups of four or more are also welcome,
          with vehicles arranged to suit the group.
        </p>
        <div className="actions">
          <a className="btn primary" href="#custom-trip">
            Request a Custom Tour Plan <Arrow />
          </a>
          <a className="btn ghost" href="#nusa-penida">
            View Tour Packages
          </a>
        </div>
        <div className="heroPhoto" role="img" aria-label="Aerial view of Kelingking Beach, Nusa Penida">
          <div className="heroPhotoCard">
            <span>Nusa Penida · Bali</span>
            <strong>Travel confidently with Chelyn</strong>
          </div>
          <div className="heroPhotoBadge">
            <span>Women-first care</span>
            <b>Private · Personal · Flexible</b>
          </div>
        </div>
        <div className="trust">
          {[
            "Women-first comfort",
            "All guests welcome",
            "Local and international",
            "Vehicles by request",
          ].map((item, index) => (
            <div key={item}>
              <span>0{index + 1}</span>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="story shell" id="about">
        <div className="label">About the Tour Service</div>
        <div className="storyGrid">
          <h2>
            Personal planning with <em>local care.</em>
          </h2>
          <div>
            <p>
              Link & Ko Bali is designed especially for women who want to feel
              comfortable and supported while exploring Bali. The service is
              also open to couples, male travellers, Indonesian and international
              guests, and groups from four people. A suitable vehicle can be
              arranged by request for larger groups.
            </p>
            <p>
              Private land transportation is available where specifically
              stated. Fast boats and some activities may be shared. Before
              payment, we confirm availability, the itinerary, final price,
              service format, inclusions, exclusions, and important conditions
              in writing.
            </p>
            <div className="aboutPoints">
              <span><b>Flexible</b> Choose a package or build a custom day.</span>
              <span><b>Clear</b> See prices, inclusions, exclusions, and open details.</span>
              <span><b>Considered</b> Plan around children, elderly guests, access, diet, or special occasions.</span>
              <span><b>Inclusive</b> Women-first care, with all guests welcome.</span>
            </div>
            <a className="textLink" href="#custom-trip">
              Request a Custom Plan <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="services" id="transport">
        <div className="shell">
          <header>
            <div>
              <div className="label">Bali Private Transportation</div>
              <h2>Choose the time you need.</h2>
            </div>
            <p>
              Starting prices help you plan. Your final quote depends on the
              destination, itinerary, travel distance, and your requirements.
            </p>
          </header>
          <div className="transportGrid">
            {transportServices.map((service) => (
              <article key={service.title}>
                <small>{service.eyebrow}</small>
                <h3>{service.title}</h3>
                <p>{service.detail}</p>
                <div className="price">
                  <small>Starting from</small>
                  <strong>{service.price}</strong>
                </div>
                <a href="#custom-trip">Request a Custom Plan <Arrow /></a>
              </article>
            ))}
          </div>
          <div className="overtimeBar">
            <div>
              <small>Overtime</small>
              <strong>IDR 35,000 per additional hour</strong>
            </div>
            <p>
              Package prices can be adjusted depending on the destination,
              itinerary, travel distance, and the guest’s budget.
            </p>
          </div>
          <div className="costGrid">
            <div>
              <h3>Paid separately by the guest</h3>
              <p>Unless specifically stated as included:</p>
              <ul>
                <li>Parking fees</li>
                <li>Toll-road fees</li>
                <li>Meals</li>
                <li>Activities</li>
                <li>Entrance tickets</li>
              </ul>
            </div>
            <div>
              <h3>Vehicle and service details</h3>
              <ul>
                <li>Toyota Raize 2023; other vehicles available by request</li>
                <li>Maximum four guests with the female-driver service</li>
                <li>Fuel is included</li>
                <li>Local service area: Bali, Indonesia</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="packages shell" id="nusa-penida">
        <header>
          <div>
            <div className="label">Nusa Penida Tour Packages</div>
            <h2>Compare before you choose.</h2>
          </div>
          <p>
            Selected packages depart from Sanur or Matahari Terbit Harbour. The
            exact meeting point and departure time will be confirmed after
            booking.
          </p>
        </header>

        <div className="destinationGallery" aria-label="Nusa Penida destination gallery">
          {[
            ["/assets/nusa-kelingking.jpg", "Kelingking Beach"],
            ["/assets/nusa-broken-beach.jpg", "Broken Beach"],
            ["/assets/nusa-diamond-beach.jpg", "Diamond Beach"],
          ].map(([source, caption]) => (
            <figure key={caption}>
              <img src={source} alt={`${caption}, Nusa Penida`} loading="lazy" />
              <figcaption>{caption}<small>Nusa Penida</small></figcaption>
            </figure>
          ))}
        </div>

        <div className="comparisonWrap" aria-label="Nusa Penida package comparison">
          <table>
            <thead>
              <tr>
                <th>Package</th>
                <th>Price</th>
                <th>Main focus</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Snorkeling Package</td>
                <td>IDR 1,350,000</td>
                <td>Four snorkeling locations</td>
              </tr>
              <tr>
                <td>Combination West + East</td>
                <td>Starting from IDR 1,499,000</td>
                <td>Four island destinations</td>
              </tr>
              <tr>
                <td>West Island Tour</td>
                <td>IDR 1,350,000</td>
                <td>West-coast destinations</td>
              </tr>
              <tr>
                <td>East Island Tour</td>
                <td>IDR 1,450,000</td>
                <td>East-coast destinations</td>
              </tr>
              <tr>
                <td>Special Package</td>
                <td>IDR 1,650,000</td>
                <td>Snorkeling + west island tour</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="tourGrid">
          {nusaPackages.map((tour) => (
            <TourCard key={tour.name} tour={tour} onRequest={requestPackage} />
          ))}
        </div>

        <div className="separatePackage">
          <div className="sectionIntro">
            <div className="label">Separate departure route</div>
            <h2>Serangan Harbour package.</h2>
            <p>
              This package is intentionally listed separately from packages
              departing from Sanur or Matahari Terbit.
            </p>
          </div>
          <TourCard tour={seranganPackage} onRequest={requestPackage} />
        </div>
      </section>

      <section className="jeepSection" id="kintamani">
        <div className="shell">
          <header>
            <div>
              <div className="label">Kintamani Mount Batur Jeep Experiences</div>
              <h2>Three ways to see the mountain.</h2>
            </div>
            <p>
              These are Kintamani jeep experiences only—not complete Bali
              transportation packages.
            </p>
          </header>
          <figure className="destinationFeature">
            <img
              src="/assets/mount-batur-jeep.jpg"
              alt="Guest with a jeep in the Mount Batur area"
              loading="lazy"
            />
            <figcaption>
              <small>Mount Batur, Kintamani</small>
              <strong>Private jeep experiences with volcanic views</strong>
            </figcaption>
          </figure>
          <div className="capacityNotice">
            <strong>One jeep can accommodate a maximum of three guests.</strong>
            <span>
              Prices do not include a full-day private car, hotel transfer, fuel,
              or a separate driver outside the jeep service.
            </span>
          </div>
          <div className="jeepGrid">
            {jeepPackages.map((trip) => (
              <article key={trip.name}>
                <span className="capacity">Maximum 3 guests</span>
                <h3>{trip.name}</h3>
                <p className="jeepSummary">{trip.summary}</p>
                <div className="jeepPrice">
                  <strong>{trip.price}</strong>
                  <small>per jeep, net</small>
                </div>
                <div className="jeepFacts">
                  <span><b>Main destination</b> Mount Batur, Kintamani</span>
                  <span><b>Duration / schedule</b> [{trip.placeholder}]</span>
                  <span><b>Availability</b> [ADD OPERATING DAYS]</span>
                  <span><b>Physical activity</b> [ADD PHYSICAL ACTIVITY LEVEL]</span>
                  <span><b>Clothing / equipment</b> [ADD RECOMMENDED CLOTHING OR EQUIPMENT]</span>
                  <span><b>Age restrictions</b> [ADD AGE RESTRICTIONS, IF APPLICABLE]</span>
                </div>
                <h4>Inclusions</h4>
                <ul>
                  {trip.inclusions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="exclusion jeepExclusion">
                  <b>Not included</b>
                  <span>Full-day private car, hotel transfer, fuel, or a separate driver outside the jeep service.</span>
                </div>
                <button className="btn ghost" onClick={() => requestPackage(trip.name)}>
                  Request This Package <Arrow />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="comfort" id="comfort">
        <div className="shell comfortGrid">
          <figure className="comfortPhoto">
            <img
              src="/assets/nusa-diamond-beach.jpg"
              alt="Diamond Beach coastline in Nusa Penida"
              loading="lazy"
            />
            <figcaption>
              <small>Comfort beyond the drive</small>
              <strong>Personal care for your Bali day</strong>
            </figcaption>
          </figure>
          <div>
            <div className="label">Considered comfort</div>
            <h2>
              The small things are <em>already handled.</em>
            </h2>
            <p>Long days feel lighter when useful essentials are within reach.</p>
            <div className="amenities">
              {[
                "Mineral water",
                "Snacks",
                "Phone charger",
                "Tissues & wet wipes",
                "Umbrella",
                "Small first-aid kit",
                "Trash bag",
              ].map((item) => (
                <span key={item}>✓ {item}</span>
              ))}
            </div>
            <div className="special">
              <b>✿</b>
              <span>
                <strong>Sanitary pads are available in the car.</strong>
                <small>A simple comfort detail for guests who need them.</small>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="policySection shell" id="policies">
        <header>
          <div>
            <div className="label">Clear before you book</div>
            <h2>Payment and policies.</h2>
          </div>
          <p>
            Review the official payment details, deposit requirements, and
            cancellation policy before confirming your trip.
          </p>
        </header>
        <div className="policyGrid">
          <article className="paymentCard">
            <span className="policyNumber">01</span>
            <h3>Payment Information</h3>
            <div className="bankDetails">
              <div><small>Bank</small><strong>Bank Mandiri</strong></div>
              <div><small>Account number</small><strong>1750004862859</strong></div>
              <div><small>Account name</small><strong>Marchelyna Lineleyan</strong></div>
            </div>
            <p className="officialNotice">
              For bank-transfer payments, please transfer only to the official
              Bank Mandiri account listed above.
            </p>
            <div className="paymentFacts">
              <div><small>Deposit</small><strong>30% to confirm the reservation</strong></div>
              <div><small>Remaining balance</small><strong>Paid on the day of the trip</strong></div>
              <div><small>Accepted methods</small><strong>Bank transfer · Cash · Card · QRIS</strong></div>
            </div>
            <div className="securityWarning">
              <b>Payment security</b>
              <span>
                For your safety, do not transfer money to any other bank account.
                Please contact us through our official WhatsApp number if you
                receive different payment instructions.
              </span>
            </div>
          </article>
          <article className="cancellationCard">
            <span className="policyNumber">02</span>
            <h3>Cancellation and Rescheduling</h3>
            <div className="timeline">
              <div>
                <span>More than 72 hours before the trip</span>
                <strong>The deposit is refundable.</strong>
              </div>
              <div>
                <span>Within 72 hours of the trip</span>
                <strong>The deposit is non-refundable.</strong>
              </div>
              <div>
                <span>Rescheduling</span>
                <strong>Allowed, subject to availability.</strong>
              </div>
            </div>
            <PlaceholderList
              items={["CONFIRM WHETHER A RESCHEDULING FEE OR TIME LIMIT APPLIES"]}
            />
          </article>
        </div>
      </section>

      <section className="guestInfoSection" id="guest-information">
        <div className="shell">
          <header>
            <div>
              <div className="label">Important Guest Information</div>
              <h2>Know what to expect before you book.</h2>
            </div>
            <p>
              These details form the practical booking guide. Items still awaiting
              confirmation are clearly marked and will not be presented as final policy.
            </p>
          </header>
          <div className="guestInfoGrid">
            {guestInformation.map((group, index) => (
              <article key={group.title}>
                <span className="policyNumber">0{index + 1}</span>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li className={item.startsWith("[") ? "pendingDetail" : ""} key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="safetySection" id="safety">
        <div className="shell safetyGrid">
          <div>
            <div className="label">Guest Safety Information</div>
            <h2>Good trips start with clear expectations.</h2>
            <p>
              Please read this information before requesting or confirming a
              service.
            </p>
          </div>
          <ul>
            {safetyItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="shell destinationWarnings">
          <div>
            <b>Nusa Penida</b>
            <span>
              Sea conditions, harbour operations, steep or uneven access, cliffs,
              and road conditions may affect the itinerary or whether a stop is suitable.
            </span>
          </div>
          <div>
            <b>Mount Batur jeep experiences</b>
            <span>
              Off-road terrain can be rough. Guests who are pregnant or have back,
              joint, mobility, or other medical concerns must disclose them before booking.
            </span>
          </div>
          <div>
            <b>Emergency and insurance</b>
            <span>
              Emergency: Chelyn, +62 858-2375-4807. Travel insurance is recommended; confirm any package-specific coverage in writing before booking.
            </span>
          </div>
        </div>
      </section>

      <section className="trustSection shell" id="reviews">
        <header>
          <div>
            <div className="label">Reviews and Trust</div>
            <h2>Only verified information belongs here.</h2>
          </div>
          <p>
            Reviews, credentials, certifications, and partner details will be
            published only after they can be verified.
          </p>
        </header>
        <div className="trustGrid">
          <article>
            <span className="trustIcon">01</span>
            <h3>Guest reviews</h3>
            <p>No testimonials have been invented or published without a source.</p>
            <b>[ADD VERIFIED GUEST REVIEWS AND REVIEW-PLATFORM LINKS]</b>
          </article>
          <article>
            <span className="trustIcon">02</span>
            <h3>Local perspective</h3>
            <p>Chelyn plans each route around the guest’s timing, interests, comfort, and safety needs.</p>
            <b>[ADD GUIDE EXPERIENCE OR PROFESSIONAL CREDENTIALS, IF APPLICABLE]</b>
          </article>
          <article>
            <span className="trustIcon">03</span>
            <h3>Credentials and partners</h3>
            <p>Business or partner claims will remain unpublished until documentation is available.</p>
            <b>[ADD BUSINESS REGISTRATION OR LICENSE INFORMATION]</b>
            <b>[ADD SAFETY CERTIFICATIONS]</b>
            <b>[ADD VERIFIED HOTEL OR TOURISM PARTNERS]</b>
          </article>
          <article>
            <span className="trustIcon">04</span>
            <h3>Payment security</h3>
            <p>Bank transfers must go only to the official Bank Mandiri account displayed in the Payment Information section.</p>
            <a className="textLink" href="#policies">Review payment details <Arrow /></a>
          </article>
        </div>
      </section>

      <section className="connect shell" id="contact">
        <header>
          <div>
            <div className="label">Contact Link & Ko Bali</div>
            <h2>Tell us what you want to experience.</h2>
          </div>
          <p>
            Share your preferred destinations, schedule, group size, and
            interests. We will create a personalized day-tour plan for you.
          </p>
        </header>
        <div className="contactFacts">
          <div><small>International WhatsApp</small><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">Chelyn · +62 859-5931-3339</a></div>
          <div><small>Indonesia / Tamu lokal</small><a href={ERIKO_WHATSAPP_URL} target="_blank" rel="noreferrer">Eriko · +62 896-3686-7215</a></div>
          <div><small>Email</small><strong>[ADD EMAIL ADDRESS]</strong></div>
          <div><small>Business hours</small><strong>9:00 AM–9:00 PM Bali time (WITA)</strong></div>
          <div><small>Expected response</small><strong>Messages are answered during business hours</strong></div>
          <div><small>Service area</small><strong>Bali, including selected Nusa Penida and Kintamani services</strong></div>
          <div><small>Emergency contact</small><strong>Chelyn · +62 858-2375-4807</strong></div>
        </div>
        <div className="connectHeading">
          <div className="label">Connect With Us</div>
          <p>Scan an official QR code below. Tap or click any image to open it at full size.</p>
        </div>
        <div className="qrGrid">
          {(language === "zh" ? [
            ["WeChat", "/assets/wechat-qr.jpeg", "Scan to connect with us on WeChat.", "WeChat ID: link", "wechat"],
            ["WhatsApp", "/assets/whatsapp-qr.jpeg", "Scan to start a WhatsApp chat with us.", "+62 859-5931-3339", "whatsapp"],
            ["RedNote", "/assets/rednote-qr.jpeg", "Scan to follow us on RedNote.", "RedNote ID: Chelynvoyage", "rednote"],
            ["Instagram", "/assets/instagram-qr.jpeg", "Scan to follow us on Instagram.", "@linkandkobali", "instagram"],
          ] : [
            ["WhatsApp", "/assets/whatsapp-qr.jpeg", "Scan to start a WhatsApp chat with us.", "+62 859-5931-3339", "whatsapp"],
            ["WeChat", "/assets/wechat-qr.jpeg", "Scan to connect with us on WeChat.", "WeChat ID: link", "wechat"],
            ["RedNote", "/assets/rednote-qr.jpeg", "Scan to follow us on RedNote.", "RedNote ID: Chelynvoyage", "rednote"],
            ["Instagram", "/assets/instagram-qr.jpeg", "Scan to follow us on Instagram.", "@linkandkobali", "instagram"],
          ]).map(([name, source, instruction, account, styleName]) => (
            <article key={name}>
              <a
                className={`qrImageFrame ${styleName}`}
                href={source}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open the ${name} QR code at full size`}
              >
                <img src={source} alt={`${name} QR code for Link & Ko Bali`} loading="lazy" />
                <span className="qrZoomHint">Open full size ↗</span>
              </a>
              <h3>{name}</h3>
              <p>{instruction}</p>
              <small>{account}</small>
            </article>
          ))}
        </div>
        <a className="btn primary connectWhatsapp" href={activeWhatsAppUrl} target="_blank" rel="noreferrer">
          Chat on WhatsApp <Arrow />
        </a>
        <a className="btn ghost localWhatsapp" href={ERIKO_WHATSAPP_URL} target="_blank" rel="noreferrer">
          Tamu Indonesia: Chat Eriko <Arrow />
        </a>
      </section>

      <section className="faq shell" id="faq">
        <div>
          <div className="label">Good questions</div>
          <h2>
            Before you
            <br />
            make a request.
          </h2>
          <p>Anything not covered here can be confirmed directly with Chelyn.</p>
        </div>
        <div className="faqList">
          {faqs.map((item, index) => (
            <button
              className={faq === index ? "active" : ""}
              onClick={() => setFaq(faq === index ? -1 : index)}
              key={item[0]}
              aria-expanded={faq === index}
            >
              <span>
                <i>0{index + 1}</i>
                {item[0]}
                <b aria-hidden="true">{faq === index ? "▴" : "▾"}</b>
              </span>
              <small>{item[1]}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="book" id="custom-trip">
        <div className="shell bookGrid">
          <div>
            <div className="label">Plan Your Bali Trip With Us</div>
            <h2>
              Tell us what
              <br />
              your trip needs.
            </h2>
            <p>
              Every guest travels differently. Tell us your preferred
              destinations, available dates, group size, interests, and budget.
              We will help arrange a personalized itinerary based on your needs.
            </p>
            <div className="planningList">
              {[
                "Preferred destinations and activities",
                "Available time and travel schedule",
                "Group size and estimated budget",
                "Children, elderly guests, and accessibility requirements",
                "Pickup and drop-off locations",
                "Dietary needs and special occasions",
              ].map((item) => <span key={item}>✓ {item}</span>)}
            </div>
            <div className="reply">Messages are answered from 9:00 AM to 9:00 PM Bali time (WITA).</div>
            <a className="textLink" href={activeWhatsAppUrl} target="_blank" rel="noreferrer">
              Chat on WhatsApp <Arrow />
            </a>
          </div>
          {sent ? (
            <div className="success" role="status">
              <b>✓</b>
              <h3>Thank you for contacting Link & Ko Bali.</h3>
              <p>
                We will review your request and contact you through WhatsApp or
                email.
              </p>
              <p className="sendReminder">
                WhatsApp has opened with your request details. Tap Send in
                WhatsApp to complete your inquiry.
              </p>
              <button onClick={() => setSent(false)}>Send another request</button>
            </div>
          ) : (
            <form onSubmit={submit}>
              {tripInterest && (
                <div className="selectedPackage">
                  <small>Selected package</small>
                  <strong>{tripInterest}</strong>
                </div>
              )}
              <div className="formRow">
                <label>
                  Full name
                  <input name="fullName" required autoComplete="name" />
                </label>
                <label>
                  WhatsApp number
                  <input name="whatsapp" required type="tel" autoComplete="tel" placeholder="+62…" />
                </label>
              </div>
              <div className="formRow">
                <label>
                  Email address
                  <input name="email" required type="email" autoComplete="email" />
                </label>
                <label>
                  Travel date
                  <input name="travelDate" required type="date" />
                </label>
              </div>
              <div className="formRow">
                <label>
                  Number of adults
                  <input name="adults" required type="number" min="1" />
                </label>
                <label>
                  Number and ages of children
                  <input name="children" placeholder="Example: 2 children, ages 3 and 7" />
                </label>
              </div>
              <label>
                Hotel or pickup location
                <input name="pickup" required />
              </label>
              <div className="formRow">
                <label>
                  Drop-off location
                  <input name="dropoff" placeholder="Same as pickup, or another location" />
                </label>
                <label>
                  Available time or schedule
                  <input name="availableTime" placeholder="Example: 8:00 AM–6:00 PM" />
                </label>
              </div>
              <label>
                Preferred destinations
                <textarea
                  name="destinations"
                  required
                  value={tripInterest}
                  onChange={(event) => setTripInterest(event.target.value)}
                  placeholder="Places or package you are interested in"
                />
              </label>
              <label>
                Activities
                <textarea name="activities" placeholder="Snorkeling, beach, temple, food, photography…" />
              </label>
              <div className="formRow">
                <label>
                  Estimated budget
                  <input name="budget" required placeholder="IDR…" />
                </label>
                <label>
                  Transportation requirements
                  <input name="transport" placeholder="Airport transfer, half day, full day…" />
                </label>
              </div>
              <div className="formRow">
                <label>
                  Dietary requirements
                  <input name="dietary" placeholder="Allergies or preferences" />
                </label>
                <label>
                  Medical or mobility considerations
                  <input name="medical" placeholder="Tell us what support you need" />
                </label>
              </div>
              <label>
                Special occasion
                <input name="occasion" placeholder="Birthday, honeymoon, proposal, or celebration" />
              </label>
              <label>
                Additional requests
                <textarea name="requests" placeholder="Anything else we should know?" />
              </label>
              <label className="safetyCheck">
                <input name="safetyConfirmed" required type="checkbox" />
                <span>
                  I confirm that I have read the safety information and have
                  disclosed any relevant medical, mobility, or accessibility
                  requirements.
                </span>
              </label>
              <div className="formExclusions">
                <b>Before submitting</b>
                <span>
                  Unless specifically included in your final written quotation,
                  additional costs and services remain excluded.
                </span>
              </div>
              <button className="btn primary">
                Request My Custom Plan <Arrow />
              </button>
              <small>
                Submitting this form opens WhatsApp with your details. Your
                reservation is not confirmed until availability, price, and the
                deposit are confirmed.
              </small>
            </form>
          )}
        </div>
      </section>

      <section className="finalCta">
        <div className="shell">
          <div className="label">Ready to Plan Your Bali Experience?</div>
          <h2>Let’s turn your list into a realistic Bali plan.</h2>
          <p>
            Tell us where you would like to go, how many people are travelling,
            and your preferred budget. We will help create a suitable plan for
            your Bali trip.
          </p>
          <div className="actions">
            <a className="btn primary" href="#custom-trip">
              Request a Custom Plan <Arrow />
            </a>
            <a className="btn ghost" href={activeWhatsAppUrl} target="_blank" rel="noreferrer">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer className="shell">
        <a className="brand" href="#top">
          <img
            className="brandLogo"
            src="/assets/link-ko-bali-logo.jpeg"
            alt="Link & Ko Bali logo"
          />
          <span>Link & Ko Bali<i>.</i></span>
        </a>
        <p>
          Bali, Indonesia
          <br />
          Private trips with Chelyn.
        </p>
        <div>
          <a href="#top">Home</a>
          <a href="#nusa-penida">Packages</a>
          <a href="#custom-trip">Custom Tour</a>
          <a href="#safety">Safety</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </div>
        <small>© 2026 Link & Ko Bali</small>
      </footer>
      <a className="chat" href={activeWhatsAppUrl} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        <span>✦</span>
        <b>Chat on WhatsApp</b>
      </a>
    </main></Translated>
    </LanguageContext.Provider>
  );
}
