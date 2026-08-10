"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  LanguageContext,
  Locale,
  Translated,
  translateText,
} from "./i18n";

const WHATSAPP_NUMBER = "6285959313339";

const WHATSAPP_URL =
  `https://wa.me/${WHATSAPP_NUMBER}?text=` +
  encodeURIComponent(
    "Hi Eriko, I found Link & Ko Bali and would like to plan a trip.",
  );

const ID_WHATSAPP_URL =
  `https://wa.me/${WHATSAPP_NUMBER}?text=` +
  encodeURIComponent(
    "Halo Eriko, saya menemukan Link & Ko Bali dan ingin merencanakan perjalanan di Bali.",
  );

const CHINESE_WHATSAPP_URL =
  `https://wa.me/${WHATSAPP_NUMBER}?text=` +
  encodeURIComponent(
    "你好 Eriko，我在 Link & Ko Bali 网站上看到你们，想咨询巴厘岛行程。",
  );

const RUSSIAN_WHATSAPP_URL =
  `https://wa.me/${WHATSAPP_NUMBER}?text=` +
  encodeURIComponent(
    "Здравствуйте, Eriko! Я нашёл(ла) Link & Ko Bali и хочу спланировать поездку по Бали.",
  );

const JAPANESE_WHATSAPP_URL =
  `https://wa.me/${WHATSAPP_NUMBER}?text=` +
  encodeURIComponent(
    "こんにちはEriko。Link & Ko Baliのウェブサイトを見て、バリ旅行の相談をしたいです。",
  );

const KOREAN_WHATSAPP_URL =
  `https://wa.me/${WHATSAPP_NUMBER}?text=` +
  encodeURIComponent(
    "안녕하세요 Eriko. Link & Ko Bali 웹사이트를 보고 발리 여행을 상담하고 싶습니다.",
  );

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
  availability?: string;
  destinationsTitle?: string;
  destinations?: string[];
  inclusions: string[];
  notices?: string[];
};

const nusaPackages: TourPackage[] = [
  {
    name: "Nusa Penida Snorkeling Package",
    summary:
      "A one-day Nusa Penida sea experience combining return transfers, four snorkeling locations, and lunch.",
    mainDestination: "Nusa Penida",
    price: "IDR 1,350,000",
    priceBasis: "Per person",
    duration: "One-day trip",
    startFinish: "Departure and return time confirmed via WhatsApp",
    guestRange: "Solo guests and groups welcome",
    availability: "Daily",
    departure:
      "Selected departures are from Sanur or Matahari Terbit Harbour. The exact meeting point is confirmed after booking.",
    activities: ["Fast-boat journey", "Snorkeling", "Lunch"],
    transport:
      "Return fast-boat transportation and package transportation are included as listed. Free hotel pickup and drop-off are available in the Kuta area where included in the package.",
    meals: "Lunch and mineral water are included.",
    tickets:
      "Only entrance tickets specifically listed in the final package confirmation are included.",
    guide:
      "This is a partner package and does not include a Link & Ko private driver or tour guide. Contact us on WhatsApp if you need additional transportation or assistance.",
    destinationsTitle: "Snorkeling locations",
    destinations: ["Manta Bay", "Gamat Bay", "Crystal Bay", "Wall Bay"],
    inclusions: [
      "Kuta-area hotel pickup and drop-off where included",
      "Return fast-boat transfer",
      "Snorkeling at four locations",
      "Snorkeling equipment",
      "Towel",
      "Lunch",
      "Mineral water",
    ],
    notices: [
      "Snorkeling locations are subject to weather, sea conditions, harbour operations, and safety considerations.",
      "Manta sightings cannot be guaranteed.",
      "Contact us on WhatsApp for child pricing and any additional service requests.",
    ],
  },
  {
    name: "Combination West and East One-Day Island Tour",
    summary:
      "A one-day sightseeing route covering selected highlights on both the west and east sides of Nusa Penida.",
    mainDestination: "West and East Nusa Penida",
    price: "IDR 1,499,000",
    priceBasis: "Per person",
    duration: "One-day trip",
    startFinish: "Departure and return time confirmed via WhatsApp",
    guestRange: "Solo guests and groups welcome",
    availability: "Daily",
    activities: ["Island sightseeing", "Beach and viewpoint stops", "Lunch"],
    transport:
      "Return fast boat and private transportation in Nusa Penida are included. Free hotel pickup and drop-off are available in the Kuta area where included in the package.",
    meals: "À la carte lunch and mineral water are included.",
    tickets: "Entrance fees for the listed destinations are included.",
    guide:
      "This is a partner package and does not include a Link & Ko private driver or tour guide. Contact us on WhatsApp if you need additional transportation or assistance.",
    destinations: [
      "Kelingking Beach",
      "Broken Beach",
      "Diamond Beach",
      "Tree House",
    ],
    inclusions: [
      "Kuta-area hotel pickup and drop-off where included",
      "Return fast-boat transfer",
      "Private transportation in Nusa Penida",
      "À la carte lunch",
      "Entrance fees",
      "Mineral water",
    ],
    notices: [
      "The itinerary may be adjusted because of traffic, weather, harbour operations, road conditions, timing, or safety considerations.",
      "Contact us on WhatsApp for child pricing and group requests.",
    ],
  },
  {
    name: "West Nusa Penida Island Tour",
    summary:
      "A one-day west-coast sightseeing route featuring cliffs, natural formations, and Crystal Bay.",
    mainDestination: "West Nusa Penida",
    price: "IDR 1,350,000",
    priceBasis: "Per person",
    duration: "One-day trip",
    startFinish: "Departure and return time confirmed via WhatsApp",
    guestRange: "Solo guests and groups welcome",
    availability: "Daily",
    activities: ["Island sightseeing", "Beach and cliff viewpoints", "Lunch"],
    transport:
      "Return fast boat and private transportation in Nusa Penida are included. Free hotel pickup and drop-off are available in the Kuta area where included in the package.",
    meals: "Restaurant lunch and mineral water are included.",
    tickets: "Entrance tickets for the listed destinations are included.",
    guide:
      "This is a partner package and does not include a Link & Ko private driver or tour guide. Contact us on WhatsApp if you need additional transportation or assistance.",
    destinations: [
      "Angel’s Billabong",
      "Broken Beach",
      "Kelingking Cliff",
      "Crystal Bay",
    ],
    inclusions: [
      "Kuta-area hotel pickup and drop-off where included",
      "Return fast-boat transfer",
      "Nusa Penida island tour",
      "Lunch at a restaurant",
      "Private transportation in Nusa Penida",
      "Fuel",
      "Entrance tickets for the listed destinations",
      "Mineral water",
    ],
    notices: [
      "Contact us on WhatsApp for child pricing and group requests.",
    ],
  },
  {
    name: "East Nusa Penida Island Tour",
    summary:
      "A one-day east-coast sightseeing route featuring beaches, the Tree House, and Thousand Islands Viewpoint.",
    mainDestination: "East Nusa Penida",
    price: "IDR 1,450,000",
    priceBasis: "Per person",
    duration: "One-day trip",
    startFinish: "Departure and return time confirmed via WhatsApp",
    guestRange: "Solo guests and groups welcome",
    availability: "Daily",
    activities: ["Island sightseeing", "Beach and viewpoint stops", "Lunch"],
    transport:
      "Return fast boat and private transportation in Nusa Penida are included. Free hotel pickup and drop-off are available in the Kuta area where included in the package.",
    meals: "Restaurant lunch and mineral water are included.",
    tickets: "Entrance tickets for the listed destinations are included.",
    guide:
      "This is a partner package and does not include a Link & Ko private driver or tour guide. Contact us on WhatsApp if you need additional transportation or assistance.",
    destinations: [
      "Diamond Beach",
      "Atuh Beach",
      "Tree House",
      "Thousand Islands Viewpoint",
    ],
    inclusions: [
      "Kuta-area hotel pickup and drop-off where included",
      "Return fast-boat transfer",
      "Nusa Penida island tour",
      "Lunch at a restaurant",
      "Private transportation in Nusa Penida",
      "Fuel",
      "Entrance tickets for the listed destinations",
      "Mineral water",
    ],
    notices: [
      "Contact us on WhatsApp for child pricing and group requests.",
    ],
  },
  {
    name: "Nusa Penida Special Package",
    summary:
      "A one-day combined snorkeling and west-island sightseeing experience for guests who want both sea and land activities.",
    mainDestination: "Nusa Penida",
    price: "IDR 1,650,000",
    priceBasis: "Per person",
    duration: "One-day trip",
    startFinish: "Departure and return time confirmed via WhatsApp",
    guestRange: "Solo guests and groups welcome",
    availability: "Daily",
    activities: ["Snorkeling", "Island sightseeing", "Lunch"],
    transport:
      "Return fast boat and private transportation in Nusa Penida are included. Free hotel pickup and drop-off are available in the Kuta area where included in the package.",
    meals: "Restaurant lunch and mineral water are included.",
    tickets: "Entrance tickets for the listed destinations are included.",
    guide:
      "This is a partner package and does not include a Link & Ko private driver or tour guide. Contact us on WhatsApp if you need additional transportation or assistance.",
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
      "Kuta-area hotel pickup and drop-off where included",
      "Return fast-boat transfer",
      "Snorkeling at four locations",
      "Island tour covering selected west-coast destinations",
      "Lunch at a restaurant",
      "Private transportation in Nusa Penida",
      "Fuel",
      "Entrance tickets for the listed destinations",
      "Mineral water",
    ],
    notices: [
      "Snorkeling and island-tour locations may be changed or cancelled because of weather, sea conditions, road conditions, timing, harbour operations, or safety concerns.",
      "Manta sightings cannot be guaranteed.",
      "Contact us on WhatsApp for child pricing and group requests.",
    ],
  },
];

const seranganPackage: TourPackage = {
  name: "West Nusa Penida Tour from Serangan Harbour",
  summary:
    "A one-day West Nusa Penida package departing from Serangan Harbour, including return boat transportation, island transportation, lunch, and selected Caspla Beach Club facilities.",
  mainDestination: "West Nusa Penida",
  price: "IDR 1,499,000",
  badge: "Daily Departure",
  departure: "Serangan Harbour → private jetty in Nusa Penida",
  duration: "One-day trip",
  startFinish: "Departure and return time confirmed via WhatsApp",
  priceBasis: "Package price",
  guestRange: "Solo guests and groups welcome. Contact us for group pricing.",
  availability: "Daily",
  activities: [
    "Island sightseeing",
    "Lunch",
    "Caspla Beach Club access",
    "Included water-sport activities",
  ],
  transport:
    "Return boat transportation and private transportation in Nusa Penida are included. Hotel pickup and drop-off are not included and can be arranged separately.",
  meals: "Lunch is included.",
  tickets: "Nusa Penida entrance fee is included.",
  guide:
    "This is a Nusa Penida partner package and does not include a Link & Ko private driver or tour guide. Additional Link & Ko transportation can be arranged separately.",
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
    "Private transportation in Nusa Penida",
    "Return boat ticket from Serangan Harbour",
    "Lunch",
    "West Nusa Penida tour",
    "Nusa Penida entrance fee",
    "Caspla Beach Club access",
    "Swimming-pool access",
    "Air-conditioned toilet facilities",
    "Boat waiting area",
    "Included water-sport activities",
  ],
  notices: [
    "Hotel pickup and drop-off are not included in this package and can be arranged separately.",
    "Contact us on WhatsApp for group pricing, child pricing, and additional transportation.",
  ],
};

const jeepPackages = [
  {
    name: "Afternoon Jeep Trip",
    summary:
      "An afternoon off-road visit to the Black Lava and Black Sand areas.",
    price: "IDR 940,000",
    inclusions: [
      "Black Lava",
      "Black Sand",
      "Mount Batur area entrance tickets",
    ],
  },
  {
    name: "Sunset Jeep Trip",
    summary:
      "A sunset-focused jeep experience with Black Lava, Black Sand, coffee, and snacks.",
    price: "IDR 1,120,000",
    inclusions: [
      "Sunset Point",
      "Black Lava",
      "Black Sand",
      "Coffee and snacks",
      "Mount Batur area entrance tickets",
    ],
  },
  {
    name: "Sunrise Jeep Trip",
    summary:
      "An early-morning jeep experience covering sunrise, Black Lava, coffee, and breakfast.",
    price: "IDR 1,120,000",
    inclusions: [
      "Sunrise viewpoint",
      "Black Lava",
      "Coffee break",
      "Breakfast",
      "Mount Batur area entrance tickets",
    ],
  },
];

const faqs = [
  [
    "Can I customize a tour?",
    "Yes. Share your preferred destinations, dates, group size, and budget, and we'll prepare a plan and confirm the details in writing.",
  ],
  [
    "Are the tours private?",
    "Our private transportation services are private. Nusa Penida, fast-boat, jeep, and partner activities may use separate local operators. Contact us on WhatsApp to confirm your selected package.",
  ],
  [
    "What is included in the price?",
    "Each package card lists its inclusions. Your final written quotation confirms exactly what is included before payment.",
  ],
  [
    "Are there additional charges?",
    "Unless specifically included, parking, toll fees, meals, activities, entrance tickets, hotel transfers, and additional transportation may be paid separately by the guest.",
  ],
  [
    "Is transportation included?",
    "It depends on the service. Nusa Penida packages include the transportation specifically listed in the package. Link & Ko private transportation can also be arranged separately.",
  ],
  [
    "Where will I be picked up?",
    "Free hotel pickup and drop-off are available in the Kuta area where included in the selected package. For other locations, contact us on WhatsApp for availability and pricing.",
  ],
  [
    "Can children join?",
    "Yes. Please send us the children's ages on WhatsApp so we can confirm availability, suitability, and current child pricing for your selected package.",
  ],
  [
    "Are the tours suitable for elderly guests?",
    "It depends on the route and activity. Let us know about mobility needs before booking so we can help you choose a suitable option.",
  ],
  [
    "What happens during bad weather?",
    "Routes, departure times, snorkeling locations, boat operations, or activities may change for safety. We will confirm any important updates through WhatsApp.",
  ],
  [
    "What should I wear?",
    "Comfortable clothing, suitable footwear, and sun protection are recommended. Activity-specific preparation can be confirmed on WhatsApp.",
  ],
  [
    "Do I need travel insurance?",
    "Travel insurance is recommended, especially for boat trips and outdoor activities.",
  ],
  [
    "Can you accommodate dietary restrictions?",
    "Tell us in your request and we'll confirm what can be accommodated.",
  ],
  [
    "How do I pay?",
    "A 30% deposit confirms your booking; the balance is due on the trip day. Bank transfer, cash, card, and QRIS are accepted. Bank transfers should be made only to the official Bank Mandiri account shown on this website.",
  ],
  [
    "What is the cancellation policy?",
    "Cancel more than 72 hours before the trip and your deposit is refundable. Within 72 hours it is non-refundable. Refunds are processed within 3 business days. Rescheduling is subject to availability.",
  ],
  [
    "How quickly will I receive my custom plan?",
    "Messages are answered during business hours, 9:00 AM–9:00 PM Bali time (WITA).",
  ],
];

const safetyItems = [
  "Follow the instructions of the driver, boat crew, jeep operator, activity operator, and local authorities.",
  "Tour schedules and destinations may change because of weather, sea conditions, traffic, road conditions, harbour operations, volcanic activity, government restrictions, or other safety concerns.",
  "Guests should inform us or the relevant activity operator of any important medical, mobility, pregnancy, allergy, or accessibility considerations before participating.",
  "Bring any personal medication you may need.",
  "Children must remain under the supervision of a parent or responsible adult.",
  "Wear suitable clothing and footwear for your selected activities.",
  "Safety equipment must be worn when required by the activity operator.",
  "Unsafe behaviour may result in removal from an activity.",
  "Snorkeling locations and manta sightings cannot be guaranteed.",
  "Guests are responsible for personal belongings unless otherwise required by applicable law.",
  "In an emergency during your trip, contact us on WhatsApp immediately.",
  "Travel insurance is recommended.",
];

const guestInformation = [
  {
    title: "Booking and confirmation",
    items: [
      "Submit a package or custom-tour request through the form or WhatsApp.",
      "We confirm availability, itinerary, price, and inclusions in writing.",
      "A 30% deposit confirms your reservation. The balance is due on the day of the trip.",
      "Messages are answered during business hours, 9:00 AM–9:00 PM Bali time (WITA).",
    ],
  },
  {
    title: "Changes, refunds, and timing",
    items: [
      "Cancellation more than 72 hours before the trip: deposit refundable.",
      "Cancellation within 72 hours: deposit non-refundable.",
      "Refunds are processed within 3 business days.",
      "Rescheduling is allowed, subject to availability.",
    ],
  },
  {
    title: "Pickup and preparation",
    items: [
      "Nusa Penida departure and return times are confirmed through WhatsApp.",
      "Free hotel pickup and drop-off are available in the Kuta area where included in the package.",
      "Other pickup or drop-off locations may be arranged separately.",
    ],
  },
  {
    title: "Language and special requests",
    items: [
      "English, Indonesian, Simplified Chinese, Russian, Japanese, and Korean are available on the website.",
      "Tell us about dietary, mobility, family, or special-event requests before confirmation.",
    ],
  },
  {
    title: "Partner packages",
    items: [
      "Nusa Penida and Mount Batur jeep experiences are sold as partner packages.",
      "They do not automatically include a Link & Ko private driver or tour guide.",
      "Additional Link & Ko transportation can be requested separately.",
    ],
  },
  {
    title: "Contact",
    items: [
      "Official WhatsApp: +62 859-5931-3339 (Eriko).",
      "Business hours: 9:00 AM–9:00 PM Bali time (WITA).",
      "Messages are answered during business hours.",
    ],
  },
];

const Arrow = () => <span aria-hidden="true">↗</span>;

function TourCard({
  tour,
  onRequest,
}: {
  tour: TourPackage;
  onRequest: (name: string) => void;
}) {
  return (
    <Translated>
      <article className="tourCard">
        <div className="tourTop">
          <div>
            {tour.badge && <span className="badge">{tour.badge}</span>}
            <h3>{tour.name}</h3>
            <p className="tourSummary">{tour.summary}</p>
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

        <div
          className="tourFacts"
          aria-label={`${tour.name} key details`}
        >
          <div>
            <small>Main destination</small>
            <strong>{tour.mainDestination}</strong>
          </div>

          {tour.duration && (
            <div>
              <small>Duration</small>
              <strong>{tour.duration}</strong>
            </div>
          )}

          {tour.startFinish && (
            <div>
              <small>Schedule</small>
              <strong>{tour.startFinish}</strong>
            </div>
          )}

          {tour.priceBasis && (
            <div>
              <small>Price basis</small>
              <strong>{tour.priceBasis}</strong>
            </div>
          )}

          {tour.guestRange && (
            <div>
              <small>Guest numbers</small>
              <strong>{tour.guestRange}</strong>
            </div>
          )}

          {tour.availability && (
            <div>
              <small>Availability</small>
              <strong>{tour.availability}</strong>
            </div>
          )}
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
          <div>
            <b>Transportation</b>
            <span>{tour.transport}</span>
          </div>

          <div>
            <b>Meals / refreshments</b>
            <span>{tour.meals}</span>
          </div>

          <div>
            <b>Entrance tickets</b>
            <span>{tour.tickets}</span>
          </div>

          <div>
            <b>Link & Ko driver / guide</b>
            <span>{tour.guide}</span>
          </div>
        </div>

        <div className="exclusion">
          <b>Exclusions</b>
          <span>
            Anything not specifically listed under Inclusions or confirmed in
            your final written quotation.
          </span>
        </div>

        {tour.notices?.map((notice) => (
          <p className="safetyNote" key={notice}>
            {notice}
          </p>
        ))}

        <button
          className="btn primary requestBtn"
          onClick={() => onRequest(tour.name)}
        >
          Request This Package <Arrow />
        </button>
      </article>
    </Translated>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Locale>("en");
  const [menu, setMenu] = useState(false);
  const [faq, setFaq] = useState(0);
  const [sent, setSent] = useState(false);
  const [tripInterest, setTripInterest] = useState("");

  useEffect(() => {
    document.documentElement.lang =
      language === "zh" ? "zh-CN" : language;
  }, [language]);

  function requestPackage(name: string) {
    setTripInterest(name);
    setSent(false);

    window.setTimeout(() => {
      document
        .getElementById("custom-trip")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const lines =
      language === "id"
        ? [
            "Halo Eriko, saya menemukan Link & Ko Bali dan ingin meminta rencana perjalanan khusus.",
            "",
            `Nama: ${form.get("fullName") || ""}`,
            `WhatsApp: ${form.get("whatsapp") || ""}`,
            `Email: ${form.get("email") || ""}`,
            `Tanggal perjalanan: ${form.get("travelDate") || ""}`,
            `Jumlah dewasa: ${form.get("adults") || ""}`,
            `Anak / usia: ${form.get("children") || "Tidak ada"}`,
            `Hotel / penjemputan: ${form.get("pickup") || ""}`,
            `Lokasi pengantaran: ${
              form.get("dropoff") || "Sama dengan penjemputan"
            }`,
            `Waktu / jadwal: ${form.get("availableTime") || ""}`,
            `Destinasi pilihan: ${translateText(
              String(form.get("destinations") || ""),
              "id",
            )}`,
            `Aktivitas: ${form.get("activities") || ""}`,
            `Perkiraan anggaran: ${form.get("budget") || ""}`,
            `Transportasi: ${form.get("transport") || ""}`,
            `Kebutuhan makanan: ${
              form.get("dietary") || "Tidak ada"
            }`,
            `Pertimbangan medis / mobilitas: ${
              form.get("medical") || "Tidak ada"
            }`,
            `Acara khusus: ${form.get("occasion") || "Tidak ada"}`,
            `Permintaan tambahan: ${
              form.get("requests") || "Tidak ada"
            }`,
          ]
        : language === "zh"
          ? [
              "你好 Eriko，我在 Link & Ko Bali 网站上看到你们，想申请定制巴厘岛行程。",
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
              `喜欢的目的地：${translateText(
                String(form.get("destinations") || ""),
                "zh",
              )}`,
              `活动：${form.get("activities") || ""}`,
              `预算：${form.get("budget") || ""}`,
              `交通需求：${form.get("transport") || ""}`,
              `饮食需求：${form.get("dietary") || "无"}`,
              `医疗／行动需求：${form.get("medical") || "无"}`,
              `特别纪念日：${form.get("occasion") || "无"}`,
              `其他需求：${form.get("requests") || "无"}`,
            ]
          : language === "ru"
            ? [
                "Здравствуйте, Eriko! Я нашёл(ла) Link & Ko Bali и хочу запросить индивидуальный план поездки.",
                "",
                `Имя: ${form.get("fullName") || ""}`,
                `WhatsApp: ${form.get("whatsapp") || ""}`,
                `Электронная почта: ${form.get("email") || ""}`,
                `Дата поездки: ${form.get("travelDate") || ""}`,
                `Количество взрослых: ${form.get("adults") || ""}`,
                `Дети / возраст: ${form.get("children") || "Нет"}`,
                `Отель / место трансфера: ${form.get("pickup") || ""}`,
                `Место высадки: ${
                  form.get("dropoff") || "То же место"
                }`,
                `Время / расписание: ${
                  form.get("availableTime") || ""
                }`,
                `Желаемые места: ${translateText(
                  String(form.get("destinations") || ""),
                  "ru",
                )}`,
                `Активности: ${form.get("activities") || ""}`,
                `Примерный бюджет: ${form.get("budget") || ""}`,
                `Транспорт: ${form.get("transport") || ""}`,
                `Требования к питанию: ${
                  form.get("dietary") || "Нет"
                }`,
                `Медицинские особенности / подвижность: ${
                  form.get("medical") || "Нет"
                }`,
                `Особое событие: ${form.get("occasion") || "Нет"}`,
                `Дополнительные пожелания: ${
                  form.get("requests") || "Нет"
                }`,
              ]
            : language === "ja"
              ? [
                  "こんにちはEriko。Link & Ko Baliのウェブサイトを見て、カスタム旅行プランを依頼したいです。",
                  "",
                  `氏名：${form.get("fullName") || ""}`,
                  `WhatsApp：${form.get("whatsapp") || ""}`,
                  `メール：${form.get("email") || ""}`,
                  `旅行日：${form.get("travelDate") || ""}`,
                  `大人の人数：${form.get("adults") || ""}`,
                  `子ども／年齢：${form.get("children") || "なし"}`,
                  `ホテル／送迎場所：${form.get("pickup") || ""}`,
                  `降車場所：${
                    form.get("dropoff") || "送迎場所と同じ"
                  }`,
                  `利用可能な時間／日程：${
                    form.get("availableTime") || ""
                  }`,
                  `希望する目的地：${translateText(
                    String(form.get("destinations") || ""),
                    "ja",
                  )}`,
                  `アクティビティ：${form.get("activities") || ""}`,
                  `ご予算：${form.get("budget") || ""}`,
                  `交通のご要望：${form.get("transport") || ""}`,
                  `食事のご要望：${form.get("dietary") || "なし"}`,
                  `医療／移動面の配慮事項：${
                    form.get("medical") || "なし"
                  }`,
                  `特別な日：${form.get("occasion") || "なし"}`,
                  `その他のご要望：${
                    form.get("requests") || "なし"
                  }`,
                ]
              : language === "ko"
                ? [
                    "안녕하세요 Eriko. Link & Ko Bali 웹사이트를 보고 맞춤 발리 여행 플랜을 요청하고 싶습니다.",
                    "",
                    `성명: ${form.get("fullName") || ""}`,
                    `WhatsApp: ${form.get("whatsapp") || ""}`,
                    `이메일: ${form.get("email") || ""}`,
                    `여행 날짜: ${form.get("travelDate") || ""}`,
                    `성인 인원: ${form.get("adults") || ""}`,
                    `어린이 / 나이: ${form.get("children") || "없음"}`,
                    `호텔 / 픽업 장소: ${form.get("pickup") || ""}`,
                    `샌딩 장소: ${
                      form.get("dropoff") || "픽업 장소와 동일"
                    }`,
                    `이용 가능 시간 / 일정: ${
                      form.get("availableTime") || ""
                    }`,
                    `희망 목적지: ${translateText(
                      String(form.get("destinations") || ""),
                      "ko",
                    )}`,
                    `활동: ${form.get("activities") || ""}`,
                    `예상 예산: ${form.get("budget") || ""}`,
                    `교통 관련 요청: ${form.get("transport") || ""}`,
                    `식단 요청: ${form.get("dietary") || "없음"}`,
                    `의료 / 이동 관련 고려 사항: ${
                      form.get("medical") || "없음"
                    }`,
                    `특별한 날: ${form.get("occasion") || "없음"}`,
                    `추가 요청: ${form.get("requests") || "없음"}`,
                  ]
                : [
                    "Hi Eriko, I found Link & Ko Bali and would like to request a custom trip plan.",
                    "",
                    `Name: ${form.get("fullName") || ""}`,
                    `WhatsApp: ${form.get("whatsapp") || ""}`,
                    `Email: ${form.get("email") || ""}`,
                    `Travel date: ${form.get("travelDate") || ""}`,
                    `Adults: ${form.get("adults") || ""}`,
                    `Children / ages: ${
                      form.get("children") || "None"
                    }`,
                    `Hotel / pickup: ${form.get("pickup") || ""}`,
                    `Drop-off location: ${
                      form.get("dropoff") || "Same as pickup"
                    }`,
                    `Available time / schedule: ${
                      form.get("availableTime") || ""
                    }`,
                    `Preferred destinations: ${
                      form.get("destinations") || ""
                    }`,
                    `Activities: ${form.get("activities") || ""}`,
                    `Estimated budget: ${form.get("budget") || ""}`,
                    `Transportation: ${form.get("transport") || ""}`,
                    `Dietary requirements: ${
                      form.get("dietary") || "None stated"
                    }`,
                    `Medical / mobility considerations: ${
                      form.get("medical") || "None stated"
                    }`,
                    `Special occasion: ${
                      form.get("occasion") || "None"
                    }`,
                    `Additional requests: ${
                      form.get("requests") || "None"
                    }`,
                  ];

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        lines.join("\n"),
      )}`,
      "_blank",
      "noopener,noreferrer",
    );

    setSent(true);
  }

  const activeWhatsAppUrl =
    language === "id"
      ? ID_WHATSAPP_URL
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
      <Translated>
        <main>
          <style jsx global>{`
            html,
            body {
              overflow-x: hidden;
              width: 100%;
              position: relative;
            }

            .languageSwitch {
              flex-wrap: wrap;
              max-width: 100%;
              row-gap: 4px;
            }
          `}</style>

          <nav
            className="nav shell"
            aria-label="Primary navigation"
          >
            <a
              className="brand"
              href="#top"
              aria-label="Link & Ko Bali home"
            >
              <img
                className="brandLogo"
                src="/assets/link-ko-bali-logo.jpeg"
                alt="Link & Ko Bali logo"
              />
              <span>
                Link & Ko Bali<i>.</i>
              </span>
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

              <a
                href="#nusa-penida"
                onClick={() => setMenu(false)}
              >
                Tours
              </a>

              <a
                href="#custom-trip"
                onClick={() => setMenu(false)}
              >
                Custom Tour
              </a>

              <a
                href="#safety"
                onClick={() => setMenu(false)}
              >
                Safety
              </a>

              <a href="#faq" onClick={() => setMenu(false)}>
                FAQ
              </a>

              <a
                href="#contact"
                onClick={() => setMenu(false)}
              >
                Contact
              </a>
            </div>

            <div className="navActions">
              <div
                className="languageSwitch"
                aria-label="Language selection"
              >
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

              <a
                className="navCta"
                href={activeWhatsAppUrl}
                target="_blank"
                rel="noreferrer"
              >
                Chat with Eriko <Arrow />
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
              Private driving, transportation, and selected Bali tour
              packages designed to make your trip simple and comfortable.
              Solo travellers, couples, families, and groups are welcome.
            </p>

            <div className="actions">
              <a
                className="btn primary"
                href="#custom-trip"
              >
                Request a Custom Tour Plan <Arrow />
              </a>

              <a
                className="btn ghost"
                href="#nusa-penida"
              >
                View Tour Packages
              </a>
            </div>

            <div
              className="heroPhoto"
              role="img"
              aria-label="Aerial view of Kelingking Beach, Nusa Penida"
            >
              <div className="heroPhotoCard">
                <span>Nusa Penida · Bali</span>
                <strong>Travel Bali with confidence</strong>
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
            <div className="label">
              About the Tour Service
            </div>

            <div className="storyGrid">
              <h2>
                Personal planning with <em>local care.</em>
              </h2>

              <div>
                <p>
                  Link & Ko Bali is built around women-first
                  comfort, but every traveller is welcome,
                  including solo travellers, couples, families,
                  and groups.
                </p>

                <p>
                  We provide private transportation and also
                  offer selected partner packages for Nusa
                  Penida and Mount Batur. Package details,
                  availability, price, and inclusions are
                  confirmed in writing before payment.
                </p>

                <div className="aboutPoints">
                  <span>
                    <b>Flexible</b> Choose transportation, a
                    package, or build a custom day.
                  </span>

                  <span>
                    <b>Clear</b> See prices, inclusions,
                    exclusions, and important booking details.
                  </span>

                  <span>
                    <b>Personal</b> Tell us your schedule,
                    destinations, group size, and budget.
                  </span>

                  <span>
                    <b>Inclusive</b> Women-first care, with all
                    guests welcome.
                  </span>
                </div>

                <a
                  className="textLink"
                  href="#custom-trip"
                >
                  Request a Custom Plan <Arrow />
                </a>
              </div>
            </div>
          </section>

          <section className="services" id="transport">
            <div className="shell">
              <header>
                <div>
                  <div className="label">
                    Bali Private Transportation
                  </div>
                  <h2>Choose the time you need.</h2>
                </div>

                <p>
                  Prices shown below are starting prices. Your
                  final quotation depends on the destination,
                  itinerary, travel distance, duration, and
                  requirements.
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

                    <a href="#custom-trip">
                      Request a Custom Plan <Arrow />
                    </a>
                  </article>
                ))}
              </div>

              <div className="overtimeBar">
                <div>
                  <small>Overtime</small>
                  <strong>
                    IDR 35,000 per additional hour
                  </strong>
                </div>

                <p>
                  Final transportation pricing depends on the
                  destination, itinerary, travel distance, and
                  requested service.
                </p>
              </div>

              <div className="costGrid">
                <div>
                  <h3>Paid separately by the guest</h3>

                  <p>
                    Unless specifically stated as included:
                  </p>

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
                    <li>
                      Toyota Raize 2023; other vehicles
                      available by request
                    </li>
                    <li>
                      Maximum four guests with the female-driver
                      service
                    </li>
                    <li>Fuel is included</li>
                    <li>Service area: Bali, Indonesia</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section
            className="packages shell"
            id="nusa-penida"
          >
            <header>
              <div>
                <div className="label">
                  Nusa Penida Tour Packages
                </div>

                <h2>Compare before you choose.</h2>
              </div>

              <p>
                Nusa Penida packages operate daily. Departure
                time, return time, availability, and final
                booking details are confirmed through WhatsApp.
              </p>
            </header>

            <div
              className="destinationGallery"
              aria-label="Nusa Penida destination gallery"
            >
              {[
                [
                  "/assets/nusa-kelingking.jpg",
                  "Kelingking Beach",
                ],
                [
                  "/assets/nusa-broken-beach.jpg",
                  "Broken Beach",
                ],
                [
                  "/assets/nusa-diamond-beach.jpg",
                  "Diamond Beach",
                ],
              ].map(([source, caption]) => (
                <figure key={caption}>
                  <img
                    src={source}
                    alt={`${caption}, Nusa Penida`}
                    loading="lazy"
                  />

                  <figcaption>
                    {caption}
                    <small>Nusa Penida</small>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div
              className="comparisonWrap"
              aria-label="Nusa Penida package comparison"
            >
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
                    <td>IDR 1,499,000</td>
                    <td>West + east island highlights</td>
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
                <TourCard
                  key={tour.name}
                  tour={tour}
                  onRequest={requestPackage}
                />
              ))}
            </div>

            <div className="separatePackage">
              <div className="sectionIntro">
                <div className="label">
                  Separate departure route
                </div>

                <h2>Serangan Harbour package.</h2>

                <p>
                  This package departs from Serangan Harbour.
                  Hotel pickup and drop-off are not included and
                  can be arranged separately.
                </p>
              </div>

              <TourCard
                tour={seranganPackage}
                onRequest={requestPackage}
              />
            </div>
          </section>

          <section
            className="jeepSection"
            id="kintamani"
          >
            <div className="shell">
              <header>
                <div>
                  <div className="label">
                    Kintamani Mount Batur Jeep Experiences
                  </div>

                  <h2>Three ways to see the mountain.</h2>
                </div>

                <p>
                  These are Mount Batur jeep partner packages.
                  They do not include a Link & Ko private car,
                  private driver, or tour guide unless separately
                  arranged.
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
                  <strong>
                    Jeep experiences with volcanic views
                  </strong>
                </figcaption>
              </figure>

              <div className="capacityNotice">
                <strong>
                  One jeep can accommodate a maximum of three
                  guests.
                </strong>

                <span>
                  Contact us on WhatsApp for availability,
                  additional transportation, and group
                  arrangements.
                </span>
              </div>

              <div className="jeepGrid">
                {jeepPackages.map((trip) => (
                  <article key={trip.name}>
                    <span className="capacity">
                      Maximum 3 guests per jeep
                    </span>

                    <h3>{trip.name}</h3>

                    <p className="jeepSummary">
                      {trip.summary}
                    </p>

                    <div className="jeepPrice">
                      <small>Starting from</small>
                      <strong>{trip.price}</strong>
                      <small>per jeep</small>
                    </div>

                    <div className="jeepFacts">
                      <span>
                        <b>Main destination</b> Mount Batur,
                        Kintamani
                      </span>

                      <span>
                        <b>Availability</b> Daily
                      </span>
                    </div>

                    <h4>Inclusions</h4>

                    <ul>
                      {trip.inclusions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>

                    <div className="exclusion jeepExclusion">
                      <b>Not included</b>

                      <span>
                        Link & Ko private car, hotel transfer,
                        fuel for a separate vehicle, or Link & Ko
                        private driver / tour guide unless
                        separately arranged.
                      </span>
                    </div>

                    <button
                      className="btn ghost"
                      onClick={() =>
                        requestPackage(trip.name)
                      }
                    >
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
                  <strong>
                    Personal care for your Bali day
                  </strong>
                </figcaption>
              </figure>

              <div>
                <div className="label">
                  Considered comfort
                </div>

                <h2>
                  The small things are{" "}
                  <em>already handled.</em>
                </h2>

                <p>
                  These comfort items are provided with Link &
                  Ko private-driver services. Availability may
                  differ for third-party partner packages.
                </p>

                <div className="amenities">
                  {[
                    "Mineral water",
                    "Snacks",
                    "Phone charger",
                    "Tissues & wet wipes",
                    "Umbrella",
                    "Small first-aid kit",
                    "Trash bag",
                    "Sanitary pads",
                  ].map((item) => (
                    <span key={item}>✓ {item}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            className="policySection shell"
            id="policies"
          >
            <header>
              <div>
                <div className="label">
                  Clear before you book
                </div>

                <h2>Payment and policies.</h2>
              </div>

              <p>
                Review the official payment details, deposit
                requirements, and cancellation policy before
                confirming your trip.
              </p>
            </header>

            <div className="policyGrid">
              <article className="paymentCard">
                <span className="policyNumber">01</span>

                <h3>Payment Information</h3>

                <div className="bankDetails">
                  <div>
                    <small>Bank</small>
                    <strong>Bank Mandiri</strong>
                  </div>

                  <div>
                    <small>Account number</small>
                    <strong>1750004862859</strong>
                  </div>

                  <div>
                    <small>Account name</small>
                    <strong>
                      Marchelyna Lineleyan
                    </strong>
                  </div>
                </div>

                <p className="officialNotice">
                  For bank-transfer payments, please transfer
                  only to the official Bank Mandiri account
                  listed above.
                </p>

                <div className="paymentFacts">
                  <div>
                    <small>Deposit</small>
                    <strong>
                      30% to confirm the reservation
                    </strong>
                  </div>

                  <div>
                    <small>Remaining balance</small>
                    <strong>
                      Paid on the day of the trip
                    </strong>
                  </div>

                  <div>
                    <small>Accepted methods</small>
                    <strong>
                      Bank transfer · Cash · Card · QRIS
                    </strong>
                  </div>
                </div>

                <div className="securityWarning">
                  <b>Payment security</b>

                  <span>
                    For your safety, do not transfer money to
                    any other bank account. Contact us through
                    our official WhatsApp if you receive
                    different payment instructions.
                  </span>
                </div>
              </article>

              <article className="cancellationCard">
                <span className="policyNumber">02</span>

                <h3>
                  Cancellation and Rescheduling
                </h3>

                <div className="timeline">
                  <div>
                    <span>
                      More than 72 hours before the trip
                    </span>
                    <strong>
                      The deposit is refundable.
                    </strong>
                  </div>

                  <div>
                    <span>
                      Within 72 hours of the trip
                    </span>
                    <strong>
                      The deposit is non-refundable.
                    </strong>
                  </div>

                  <div>
                    <span>Refund processing time</span>
                    <strong>
                      Within 3 business days
                    </strong>
                  </div>

                  <div>
                    <span>Rescheduling</span>
                    <strong>
                      Allowed, subject to availability.
                    </strong>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section
            className="guestInfoSection"
            id="guest-information"
          >
            <div className="shell">
              <header>
                <div>
                  <div className="label">
                    Important Guest Information
                  </div>

                  <h2>
                    Know what to expect before you book.
                  </h2>
                </div>

                <p>
                  Questions not covered here can be confirmed
                  directly on WhatsApp.
                </p>
              </header>

              <div className="guestInfoGrid">
                {guestInformation.map(
                  (group, index) => (
                    <article key={group.title}>
                      <span className="policyNumber">
                        0{index + 1}
                      </span>

                      <h3>{group.title}</h3>

                      <ul>
                        {group.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </article>
                  ),
                )}
              </div>
            </div>
          </section>

          <section
            className="safetySection"
            id="safety"
          >
            <div className="shell safetyGrid">
              <div>
                <div className="label">
                  Guest Safety Information
                </div>

                <h2>
                  Good trips start with clear expectations.
                </h2>

                <p>
                  Please read this information before
                  requesting or confirming a service.
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
                  Sea conditions, harbour operations, steep or
                  uneven access, cliffs, traffic, and road
                  conditions may affect the itinerary.
                </span>
              </div>

              <div>
                <b>Mount Batur jeep experiences</b>

                <span>
                  Jeep experiences use off-road terrain.
                  Activity availability and route conditions may
                  change depending on local conditions.
                </span>
              </div>

              <div>
                <b>Emergency and insurance</b>

                <span>
                  In an emergency, contact us through WhatsApp.
                  Travel insurance is recommended.
                </span>
              </div>
            </div>
          </section>

          <section
            className="trustSection shell"
            id="reviews"
          >
            <header>
              <div>
                <div className="label">
                  Reviews and Trust
                </div>

                <h2>
                  Clear information before you book.
                </h2>
              </div>

              <p>
                We publish service, package, and payment
                information clearly so guests can confirm the
                details before making a reservation.
              </p>
            </header>

            <div className="trustGrid">
              <article>
                <span className="trustIcon">01</span>

                <h3>Custom planning</h3>

                <p>
                  Tell us your timing, interests, group size,
                  pickup location, and budget.
                </p>
              </article>

              <article>
                <span className="trustIcon">02</span>

                <h3>Flexible services</h3>

                <p>
                  Choose private transportation, a partner
                  package, or request a custom Bali itinerary.
                </p>
              </article>

              <article>
                <span className="trustIcon">03</span>

                <h3>Partner packages</h3>

                <p>
                  Nusa Penida and Mount Batur packages are
                  clearly separated from Link & Ko private
                  driver services.
                </p>
              </article>

              <article>
                <span className="trustIcon">04</span>

                <h3>Payment security</h3>

                <p>
                  Bank transfers must go only to the official
                  Bank Mandiri account displayed in the Payment
                  Information section.
                </p>

                <a
                  className="textLink"
                  href="#policies"
                >
                  Review payment details <Arrow />
                </a>
              </article>
            </div>
          </section>

          <section
            className="connect shell"
            id="contact"
          >
            <header>
              <div>
                <div className="label">
                  Contact Link & Ko Bali
                </div>

                <h2>
                  Tell us what you want to experience.
                </h2>
              </div>

              <p>
                Share your preferred destinations, schedule,
                group size, interests, and budget, and we'll
                help you plan the right option.
              </p>
            </header>

            <div className="contactFacts">
              <div>
                <small>WhatsApp</small>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  Eriko · +62 859-5931-3339
                </a>
              </div>

              <div>
                <small>Business hours</small>
                <strong>
                  9:00 AM–9:00 PM Bali time (WITA)
                </strong>
              </div>

              <div>
                <small>Expected response</small>
                <strong>
                  Messages are answered during business hours
                </strong>
              </div>

              <div>
                <small>Service area</small>
                <strong>
                  Bali, including selected Nusa Penida and
                  Kintamani services
                </strong>
              </div>
            </div>

            <div className="connectHeading">
              <div className="label">
                Connect With Us
              </div>

              <p>
                Scan an official QR code below. Tap or click any
                image to open it at full size.
              </p>
            </div>

            <div className="qrGrid">
              {(language === "zh"
                ? [
                    [
                      "WeChat",
                      "/assets/wechat-qr.jpeg",
                      "Scan to connect with us on WeChat.",
                      "WeChat ID: link",
                      "wechat",
                    ],
                    [
                      "WhatsApp",
                      "/assets/whatsapp-qr.jpeg",
                      "Scan to start a WhatsApp chat with us.",
                      "+62 859-5931-3339",
                      "whatsapp",
                    ],
                    [
                      "RedNote",
                      "/assets/rednote-qr.jpeg",
                      "Scan to follow us on RedNote.",
                      "RedNote ID: Chelynvoyage",
                      "rednote",
                    ],
                    [
                      "Instagram",
                      "/assets/instagram-qr.jpeg",
                      "Scan to follow us on Instagram.",
                      "@linkandkobali",
                      "instagram",
                    ],
                  ]
                : [
                    [
                      "WhatsApp",
                      "/assets/whatsapp-qr.jpeg",
                      "Scan to start a WhatsApp chat with us.",
                      "+62 859-5931-3339",
                      "whatsapp",
                    ],
                    [
                      "WeChat",
                      "/assets/wechat-qr.jpeg",
                      "Scan to connect with us on WeChat.",
                      "WeChat ID: link",
                      "wechat",
                    ],
                    [
                      "RedNote",
                      "/assets/rednote-qr.jpeg",
                      "Scan to follow us on RedNote.",
                      "RedNote ID: Chelynvoyage",
                      "rednote",
                    ],
                    [
                      "Instagram",
                      "/assets/instagram-qr.jpeg",
                      "Scan to follow us on Instagram.",
                      "@linkandkobali",
                      "instagram",
                    ],
                  ]
              ).map(
                ([
                  name,
                  source,
                  instruction,
                  account,
                  styleName,
                ]) => (
                  <article key={name}>
                    <a
                      className={`qrImageFrame ${styleName}`}
                      href={source}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open the ${name} QR code at full size`}
                    >
                      <img
                        src={source}
                        alt={`${name} QR code for Link & Ko Bali`}
                        loading="lazy"
                      />

                      <span className="qrZoomHint">
                        Open full size ↗
                      </span>
                    </a>

                    <h3>{name}</h3>
                    <p>{instruction}</p>
                    <small>{account}</small>
                  </article>
                ),
              )}
            </div>

            <a
              className="btn primary connectWhatsapp"
              href={activeWhatsAppUrl}
              target="_blank"
              rel="noreferrer"
            >
              Chat with Eriko <Arrow />
            </a>
          </section>

          <section className="faq shell" id="faq">
            <div>
              <div className="label">
                Good questions
              </div>

              <h2>
                Before you
                <br />
                make a request.
              </h2>

              <p>
                Anything else? Message us on WhatsApp.
              </p>
            </div>

            <div className="faqList">
              {faqs.map((item, index) => (
                <button
                  className={
                    faq === index ? "active" : ""
                  }
                  onClick={() =>
                    setFaq(
                      faq === index ? -1 : index,
                    )
                  }
                  key={item[0]}
                  aria-expanded={faq === index}
                >
                  <span>
                    <i>0{index + 1}</i>
                    {item[0]}
                    <b aria-hidden="true">
                      {faq === index ? "▴" : "▾"}
                    </b>
                  </span>

                  <small>{item[1]}</small>
                </button>
              ))}
            </div>
          </section>

          <section className="book" id="custom-trip">
            <div className="shell bookGrid">
              <div>
                <div className="label">
                  Plan Your Bali Trip With Us
                </div>

                <h2>
                  Tell us what
                  <br />
                  your trip needs.
                </h2>

                <p>
                  Every guest travels differently. Tell us your
                  preferred destinations, dates, group size,
                  schedule, and budget, and we'll help arrange
                  an option based on your needs.
                </p>

                <div className="planningList">
                  {[
                    "Preferred destinations and activities",
                    "Available time and travel schedule",
                    "Group size and estimated budget",
                    "Pickup and drop-off locations",
                    "Transportation requirements",
                    "Dietary needs and special occasions",
                  ].map((item) => (
                    <span key={item}>✓ {item}</span>
                  ))}
                </div>

                <div className="reply">
                  Messages are answered from 9:00 AM to 9:00 PM
                  Bali time (WITA).
                </div>

                <a
                  className="textLink"
                  href={activeWhatsAppUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Chat with Eriko <Arrow />
                </a>
              </div>

              {sent ? (
                <div
                  className="success"
                  role="status"
                >
                  <b>✓</b>

                  <h3>
                    Your WhatsApp request is ready.
                  </h3>

                  <p>
                    WhatsApp has opened with your trip details.
                    Please tap Send in WhatsApp to submit your
                    inquiry to Link & Ko Bali.
                  </p>

                  <p className="sendReminder">
                    Your booking is not confirmed until
                    availability, price, inclusions, and the
                    deposit have been confirmed.
                  </p>

                  <button
                    onClick={() => setSent(false)}
                  >
                    Send another request
                  </button>
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
                      <input
                        name="fullName"
                        required
                        autoComplete="name"
                      />
                    </label>

                    <label>
                      WhatsApp number
                      <input
                        name="whatsapp"
                        required
                        type="tel"
                        autoComplete="tel"
                        placeholder="+62…"
                      />
                    </label>
                  </div>

                  <div className="formRow">
                    <label>
                      Email address
                      <input
                        name="email"
                        required
                        type="email"
                        autoComplete="email"
                      />
                    </label>

                    <label>
                      Travel date
                      <input
                        name="travelDate"
                        required
                        type="date"
                      />
                    </label>
                  </div>

                  <div className="formRow">
                    <label>
                      Number of adults
                      <input
                        name="adults"
                        required
                        type="number"
                        min="1"
                      />
                    </label>

                    <label>
                      Number and ages of children
                      <input
                        name="children"
                        placeholder="Example: 2 children, ages 3 and 7"
                      />
                    </label>
                  </div>

                  <label>
                    Hotel or pickup location
                    <input name="pickup" required />
                  </label>

                  <div className="formRow">
                    <label>
                      Drop-off location
                      <input
                        name="dropoff"
                        placeholder="Same as pickup, or another location"
                      />
                    </label>

                    <label>
                      Available time or schedule
                      <input
                        name="availableTime"
                        placeholder="Example: 8:00 AM–6:00 PM"
                      />
                    </label>
                  </div>

                  <label>
                    Preferred destinations
                    <textarea
                      name="destinations"
                      required
                      value={tripInterest}
                      onChange={(event) =>
                        setTripInterest(
                          event.target.value,
                        )
                      }
                      placeholder="Places or package you are interested in"
                    />
                  </label>

                  <label>
                    Activities
                    <textarea
                      name="activities"
                      placeholder="Snorkeling, beach, temple, food, photography…"
                    />
                  </label>

                  <div className="formRow">
                    <label>
                      Estimated budget
                      <input
                        name="budget"
                        required
                        placeholder="IDR…"
                      />
                    </label>

                    <label>
                      Transportation requirements
                      <input
                        name="transport"
                        placeholder="Airport transfer, half day, full day…"
                      />
                    </label>
                  </div>

                  <div className="formRow">
                    <label>
                      Dietary requirements
                      <input
                        name="dietary"
                        placeholder="Allergies or preferences"
                      />
                    </label>

                    <label>
                      Medical or mobility considerations
                      <input
                        name="medical"
                        placeholder="Optional information relevant to your trip"
                      />
                    </label>
                  </div>

                  <label>
                    Special occasion
                    <input
                      name="occasion"
                      placeholder="Birthday, honeymoon, proposal, or celebration"
                    />
                  </label>

                  <label>
                    Additional requests
                    <textarea
                      name="requests"
                      placeholder="Anything else we should know?"
                    />
                  </label>

                  <label className="safetyCheck">
                    <input
                      name="safetyConfirmed"
                      required
                      type="checkbox"
                    />

                    <span>
                      I confirm that I have read the safety
                      information and provided any important
                      information relevant to my selected
                      activities.
                    </span>
                  </label>

                  <div className="formExclusions">
                    <b>Before submitting</b>

                    <span>
                      Unless specifically included in your final
                      written quotation, additional costs and
                      services remain excluded.
                    </span>
                  </div>

                  <button className="btn primary">
                    Request My Custom Plan <Arrow />
                  </button>

                  <small>
                    Submitting this form opens WhatsApp with
                    your details. Please tap Send in WhatsApp to
                    complete your inquiry. Your reservation is
                    not confirmed until availability, price,
                    inclusions, and the deposit are confirmed.
                  </small>
                </form>
              )}
            </div>
          </section>

          <section className="finalCta">
            <div className="shell">
              <div className="label">
                Ready to Plan Your Bali Experience?
              </div>

              <h2>
                Let's turn your list into a realistic Bali
                plan.
              </h2>

              <p>
                Tell us where you would like to go, how many
                people are travelling, your preferred schedule,
                and your budget, and we'll help you choose the
                right service.
              </p>

              <div className="actions">
                <a
                  className="btn primary"
                  href="#custom-trip"
                >
                  Request a Custom Plan <Arrow />
                </a>

                <a
                  className="btn ghost"
                  href={activeWhatsAppUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Chat with Eriko
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

              <span>
                Link & Ko Bali<i>.</i>
              </span>
            </a>

            <p>
              Bali, Indonesia
              <br />
              Private trips, transportation, and selected tour
              packages.
            </p>

            <div>
              <a href="#top">Home</a>
              <a href="#nusa-penida">Packages</a>
              <a href="#custom-trip">
                Custom Tour
              </a>
              <a href="#safety">Safety</a>
              <a href="#faq">FAQ</a>
              <a href="#contact">Contact</a>
            </div>

            <small>
              © 2026 Link & Ko Bali
            </small>
          </footer>

          <a
            className="chat"
            href={activeWhatsAppUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat with Eriko"
          >
            <span>✦</span>
            <b>Chat with Eriko</b>
          </a>
        </main>
      </Translated>
    </LanguageContext.Provider>
  );
}
