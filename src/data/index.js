import { FiHome, FiMapPin, FiHeadphones } from "react-icons/fi";
import {
  MdFlight,
  MdHotel,
  MdDirectionsCar,
  MdBeachAccess,
} from "react-icons/md";

/* -------------------------------------------------------------------------- */
/*  Images                                                                    */
/*  Photos load from Unsplash. Swap any URL for your own file in /public,     */
/*  e.g. "/images/dubai.jpg". If a photo fails, <Img /> shows a gradient.     */
/* -------------------------------------------------------------------------- */
const u = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const IMG = {
  hero: u("1464037866556-6812c9d1c72e", 1800),
  offer: u("1514282401047-d79a71a590e8", 1600),
  journey: u("1501555088652-021faa106b9b", 1400),
  plane: u("1436491865332-7a61a109cc05", 1600),
  inspire: u("1570077188670-e3a8d69ac5ff", 1600),
  hotel: u("1566073771259-6a8506099945", 700),
  car: u("1494976388531-d1058494cdd8", 900),
  resort: u("1520250497591-112f2f40a3f4", 1400),
  cityNight: u("1512453979798-5ea266f8880c", 1400),
};

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */
export const navLinks = [
  { to: "/", label: "Home", icon: FiHome },
  { to: "/flights", label: "Flights", icon: MdFlight },
  { to: "/hotels", label: "Hotels", icon: MdHotel },
  { to: "/cars", label: "Cars", icon: MdDirectionsCar },
  { to: "/holidays", label: "Holidays", icon: MdBeachAccess },
  { to: "/destinations", label: "Destinations", icon: FiMapPin },
  { to: "/support", label: "Support", icon: FiHeadphones },
];

/* -------------------------------------------------------------------------- */
/*  Destinations                                                              */
/* -------------------------------------------------------------------------- */
export const destinations = [
  { slug: "dubai", city: "Dubai", country: "UAE", region: "Middle East", from: 389, tag: "Skyline and desert", image: u("1512453979798-5ea266f8880c") },
  { slug: "bangkok", city: "Bangkok", country: "Thailand", region: "Asia", from: 429, tag: "Temples and street food", image: u("1508009603885-50cf7c579365") },
  { slug: "paris", city: "Paris", country: "France", region: "Europe", from: 459, tag: "Museums and cafes", image: u("1502602898657-3e91760cbb34") },
  { slug: "new-york", city: "New York", country: "USA", region: "Americas", from: 489, tag: "Broadway and skyline", image: u("1496442226666-8d4d0e62e6e9") },
  { slug: "istanbul", city: "Istanbul", country: "Turkey", region: "Europe", from: 359, tag: "Two continents, one city", image: u("1524231757912-21f4fe3a7200") },
  { slug: "singapore", city: "Singapore", country: "Singapore", region: "Asia", from: 599, tag: "Gardens and hawker stalls", image: u("1525625293386-3f8f99389edd") },
  { slug: "tokyo", city: "Tokyo", country: "Japan", region: "Asia", from: 628, tag: "Cherry blossom season", image: u("1540959733332-eab4deabeeaf") },
  { slug: "london", city: "London", country: "UK", region: "Europe", from: 489, tag: "Markets and parks", image: u("1513635269975-59663e0ac1ad") },
  { slug: "rome", city: "Rome", country: "Italy", region: "Europe", from: 442, tag: "Ancient streets", image: u("1552832230-c0197dd311b5") },
  { slug: "barcelona", city: "Barcelona", country: "Spain", region: "Europe", from: 418, tag: "Beaches and Gaudi", image: u("1583422409516-2895a77efded") },
  { slug: "bali", city: "Bali", country: "Indonesia", region: "Asia", from: 574, tag: "Rice terraces and surf", image: u("1537996194471-e657df975ab4") },
  { slug: "sydney", city: "Sydney", country: "Australia", region: "Oceania", from: 812, tag: "Harbour and coastline", image: u("1506973035872-a4ec16b8e8d9") },
  { slug: "maldives", city: "Maldives", country: "Maldives", region: "Asia", from: 698, tag: "Overwater villas", image: u("1514282401047-d79a71a590e8") },
  { slug: "santorini", city: "Santorini", country: "Greece", region: "Europe", from: 507, tag: "Whitewashed sunsets", image: u("1570077188670-e3a8d69ac5ff") },
];

export const regions = ["All", "Asia", "Europe", "Middle East", "Americas", "Oceania"];

/* -------------------------------------------------------------------------- */
/*  Airlines (text wordmarks only, no logos)                                  */
/* -------------------------------------------------------------------------- */
export const airlines = [
  { name: "Emirates", code: "EK", color: "#c8102e" },
  { name: "Qatar Airways", code: "QR", color: "#5c0632" },
  { name: "Singapore Airlines", code: "SQ", color: "#f0a30a" },
  { name: "Lufthansa", code: "LH", color: "#05164d" },
  { name: "British Airways", code: "BA", color: "#2e5c99" },
  { name: "Air France", code: "AF", color: "#002157" },
  { name: "Turkish Airlines", code: "TK", color: "#c70a0c" },
  { name: "Etihad Airways", code: "EY", color: "#a08152" },
];

/* -------------------------------------------------------------------------- */
/*  Home page content                                                         */
/* -------------------------------------------------------------------------- */
export const deals = [
  { id: "d1", from: "New York", to: "London", price: 489, was: 699, off: 30, cls: "Economy, round trip", dates: "Mar 20 to Apr 27", image: u("1513635269975-59663e0ac1ad", 700) },
  { id: "d2", from: "Dubai", to: "Bangkok", price: 399, was: 604, off: 34, cls: "Economy, round trip", dates: "Mar 14 to May 14", image: u("1508009603885-50cf7c579365", 700) },
  { id: "d3", from: "Istanbul", to: "Paris", price: 459, was: 612, off: 25, cls: "Economy, round trip", dates: "Mar 10 to May 22", image: u("1502602898657-3e91760cbb34", 700) },
  { id: "d4", from: "Singapore", to: "Tokyo", price: 628, was: 897, off: 30, cls: "Economy, round trip", dates: "Jun 08 to Jun 14", image: u("1540959733332-eab4deabeeaf", 700) },
];

export const features = [
  { title: "Best price guarantee", text: "We search hundreds of airlines and match any lower fare you find.", tone: "amber" },
  { title: "Easy booking", text: "Search, compare and pay in a few taps, on any device.", tone: "blue" },
  { title: "Flexible options", text: "Change or cancel many fares with no hidden fees.", tone: "green" },
  { title: "Trusted by millions", text: "Over 12 million travellers have booked with us.", tone: "sky" },
];

export const testimonials = [
  { name: "Sarah Johnson", country: "United States", rating: 5, text: "I compared six airlines on one screen and found a fare $140 lower than anywhere else. Booking took under five minutes." },
  { name: "David Miller", country: "Canada", rating: 5, text: "My connection was delayed and support rebooked me the same evening. They answered in minutes, not hours." },
  { name: "Priya Sharma", country: "India", rating: 5, text: "The flexible change option saved our family trip. Clear prices and no surprise fees at checkout." },
];

/* -------------------------------------------------------------------------- */
/*  Flights (sample data for JFK to LHR)                                      */
/* -------------------------------------------------------------------------- */
export const flights = [
  { id: "f1", airline: "British Airways", code: "BA", color: "#2e5c99", dep: "19:05", arr: "07:10", nextDay: true, duration: 425, stops: 0, via: null, price: 612, cls: "Economy" },
  { id: "f2", airline: "Emirates", code: "EK", color: "#c8102e", dep: "22:10", arr: "15:35", nextDay: true, duration: 1165, stops: 1, via: "DXB", price: 489, cls: "Economy" },
  { id: "f3", airline: "Qatar Airways", code: "QR", color: "#5c0632", dep: "21:15", arr: "13:20", nextDay: true, duration: 1025, stops: 1, via: "DOH", price: 521, cls: "Economy" },
  { id: "f4", airline: "Lufthansa", code: "LH", color: "#05164d", dep: "17:40", arr: "09:25", nextDay: true, duration: 585, stops: 1, via: "FRA", price: 469, cls: "Economy" },
  { id: "f5", airline: "Turkish Airlines", code: "TK", color: "#c70a0c", dep: "16:55", arr: "12:40", nextDay: true, duration: 825, stops: 1, via: "IST", price: 448, cls: "Economy" },
  { id: "f6", airline: "Air France", code: "AF", color: "#002157", dep: "20:35", arr: "12:50", nextDay: true, duration: 675, stops: 1, via: "CDG", price: 503, cls: "Economy" },
  { id: "f7", airline: "Virgin Atlantic", code: "VS", color: "#d20a2e", dep: "10:15", arr: "22:20", nextDay: false, duration: 425, stops: 0, via: null, price: 585, cls: "Economy" },
  { id: "f8", airline: "Etihad Airways", code: "EY", color: "#a08152", dep: "23:00", arr: "19:25", nextDay: true, duration: 1105, stops: 1, via: "AUH", price: 476, cls: "Economy" },
  { id: "f9", airline: "Delta", code: "DL", color: "#0b2a5e", dep: "07:30", arr: "19:45", nextDay: false, duration: 435, stops: 0, via: null, price: 598, cls: "Economy" },
  { id: "f10", airline: "TAP Air Portugal", code: "TP", color: "#0a8a3c", dep: "13:05", arr: "14:30", nextDay: true, duration: 745, stops: 1, via: "LIS", price: 431, cls: "Economy" },
  { id: "f11", airline: "Kenya Airways", code: "KQ", color: "#a30b17", dep: "06:20", arr: "19:10", nextDay: true, duration: 1550, stops: 2, via: "NBO, AMS", price: 398, cls: "Economy" },
];

/* -------------------------------------------------------------------------- */
/*  Hotels                                                                    */
/* -------------------------------------------------------------------------- */
export const hotelCategories = ["All", "Beach", "City", "Luxury", "Boutique", "Budget"];

export const hotels = [
  { id: "h1", name: "Azure Bay Resort", city: "Maldives", tags: ["Beach", "Luxury"], rating: 4.9, reviews: 1842, price: 420, amenities: ["wifi", "pool", "breakfast", "spa"], image: u("1520250497591-112f2f40a3f4", 1200), blurb: "Overwater villas with a private ladder into the lagoon." },
  { id: "h2", name: "The Meridian Tower", city: "Dubai", tags: ["City", "Luxury"], rating: 4.8, reviews: 2311, price: 285, amenities: ["wifi", "pool", "breakfast", "parking"], image: u("1542314831-068cd1dbfeeb", 900), blurb: "Skyline rooms, rooftop pool and a five-minute walk to the metro." },
  { id: "h3", name: "Rue Claire Boutique", city: "Paris", tags: ["Boutique", "City"], rating: 4.7, reviews: 964, price: 198, amenities: ["wifi", "breakfast"], image: u("1551882547-ff40c63fe5fa", 900), blurb: "Twelve rooms in a restored townhouse near the Marais." },
  { id: "h4", name: "Shibuya Nine Stay", city: "Tokyo", tags: ["City", "Budget"], rating: 4.5, reviews: 3120, price: 92, amenities: ["wifi", "breakfast"], image: u("1564501049412-61c2a3083791", 900), blurb: "Compact, spotless rooms one stop from the famous crossing." },
  { id: "h5", name: "Coral Sands Lodge", city: "Bali", tags: ["Beach", "Boutique"], rating: 4.8, reviews: 1207, price: 134, amenities: ["wifi", "pool", "breakfast", "spa"], image: u("1571896349842-33c89424de2d", 900), blurb: "Bamboo villas steps from the surf, with a daily yoga deck." },
  { id: "h6", name: "Harbour View Hotel", city: "Sydney", tags: ["City"], rating: 4.6, reviews: 1788, price: 218, amenities: ["wifi", "pool", "parking"], image: u("1445019980597-93fa8acb246c", 900), blurb: "Wake up to the Opera House from a corner room." },
  { id: "h7", name: "Blue Domes Suites", city: "Santorini", tags: ["Boutique", "Luxury", "Beach"], rating: 4.9, reviews: 856, price: 365, amenities: ["wifi", "pool", "breakfast", "spa"], image: u("1582719508461-905c673771fd", 900), blurb: "Cave suites with plunge pools facing the caldera." },
  { id: "h8", name: "Old Town Inn", city: "Istanbul", tags: ["Budget", "Boutique"], rating: 4.4, reviews: 2045, price: 64, amenities: ["wifi", "breakfast"], image: u("1455587734955-081b22074882", 900), blurb: "Rooftop breakfast with views of the Blue Mosque." },
  { id: "h9", name: "Skyline Central", city: "New York", tags: ["City", "Budget"], rating: 4.3, reviews: 4210, price: 149, amenities: ["wifi", "parking"], image: u("1566073771259-6a8506099945", 900), blurb: "Midtown location, quiet rooms and 24-hour check-in." },
];

/* -------------------------------------------------------------------------- */
/*  Cars                                                                      */
/* -------------------------------------------------------------------------- */
export const carTypes = ["All", "Economy", "Compact", "SUV", "Luxury", "Electric", "Van"];

export const cars = [
  { id: "c1", name: "Toyota Yaris or similar", type: "Economy", seats: 4, bags: 2, gearbox: "Manual", fuel: "Petrol", price: 28, tag: "Best value", image: u("1494976388531-d1058494cdd8", 800) },
  { id: "c2", name: "VW Golf or similar", type: "Compact", seats: 5, bags: 3, gearbox: "Automatic", fuel: "Petrol", price: 39, tag: "Most popular", image: u("1552519507-da3b142c6e3d", 800) },
  { id: "c3", name: "Nissan Qashqai or similar", type: "SUV", seats: 5, bags: 4, gearbox: "Automatic", fuel: "Hybrid", price: 58, tag: null, image: u("1533473359331-0135ef1b58bf", 800) },
  { id: "c4", name: "Mercedes E-Class or similar", type: "Luxury", seats: 5, bags: 4, gearbox: "Automatic", fuel: "Diesel", price: 96, tag: "Chauffeur available", image: u("1549317661-bd32c8ce0db2", 800) },
  { id: "c5", name: "Tesla Model 3 or similar", type: "Electric", seats: 5, bags: 3, gearbox: "Automatic", fuel: "Electric", price: 72, tag: "Zero emissions", image: u("1560958089-b8a1929cea89", 800) },
  { id: "c6", name: "VW Caravelle or similar", type: "Van", seats: 8, bags: 6, gearbox: "Manual", fuel: "Diesel", price: 88, tag: "Group trips", image: u("1519641471654-76ce0107ad1b", 800) },
  { id: "c7", name: "Kia Picanto or similar", type: "Economy", seats: 4, bags: 1, gearbox: "Automatic", fuel: "Petrol", price: 24, tag: null, image: u("1503376780353-7e6692767b70", 800) },
  { id: "c8", name: "Jeep Compass or similar", type: "SUV", seats: 5, bags: 4, gearbox: "Automatic", fuel: "Petrol", price: 64, tag: null, image: u("1583121274602-3e2820c69888", 800) },
];

/* -------------------------------------------------------------------------- */
/*  Holidays                                                                  */
/* -------------------------------------------------------------------------- */
export const holidayThemes = ["All", "Beach", "City", "Adventure", "Wellness"];

export const holidays = [
  { id: "p1", title: "Maldives overwater escape", place: "Maldives", theme: "Beach", nights: 7, price: 2390, image: u("1514282401047-d79a71a590e8", 1200), includes: ["Flights", "Villa", "Half board", "Seaplane transfer"], highlights: ["Snorkel with reef sharks on day two", "Sunset dolphin cruise", "Private beach dinner"] },
  { id: "p2", title: "Santorini sunsets", place: "Greece", theme: "Beach", nights: 5, price: 1680, image: u("1570077188670-e3a8d69ac5ff", 1200), includes: ["Flights", "Cave suite", "Breakfast", "Transfers"], highlights: ["Caldera sailing with lunch", "Wine tasting in Pyrgos", "Oia sunset terrace"] },
  { id: "p3", title: "Bali reset retreat", place: "Indonesia", theme: "Wellness", nights: 8, price: 1420, image: u("1537996194471-e657df975ab4", 1200), includes: ["Flights", "Jungle villa", "Daily yoga", "Spa credit"], highlights: ["Sunrise yoga above the rice terraces", "Balinese cooking class", "Two spa treatments"] },
  { id: "p4", title: "Tokyo and Kyoto in ten days", place: "Japan", theme: "City", nights: 10, price: 3120, image: u("1540959733332-eab4deabeeaf", 1200), includes: ["Flights", "Hotels", "Rail pass", "Guided day tour"], highlights: ["Bullet train to Kyoto", "Tea ceremony in Gion", "Tsukiji morning food walk"] },
  { id: "p5", title: "Swiss Alps by rail", place: "Switzerland", theme: "Adventure", nights: 6, price: 2260, image: u("1531366936337-7c912a4589a7", 1200), includes: ["Flights", "Chalet stays", "Rail pass", "Breakfast"], highlights: ["Glacier Express window seats", "Cable car to Jungfraujoch", "Lakeside hike in Lauterbrunnen"] },
  { id: "p6", title: "Dubai desert and city", place: "UAE", theme: "Adventure", nights: 4, price: 980, image: u("1512453979798-5ea266f8880c", 1200), includes: ["Flights", "Hotel", "Breakfast", "Desert safari"], highlights: ["Dune drive and camp dinner", "Burj Khalifa at sunset", "Old Dubai souk walk"] },
];

/* -------------------------------------------------------------------------- */
/*  Support                                                                   */
/* -------------------------------------------------------------------------- */
export const faqCategories = ["All", "Bookings", "Payments", "Changes and refunds", "Baggage"];

export const faqs = [
  { id: "q1", cat: "Bookings", q: "How do I find my booking reference?", a: "Your six-character reference is in the confirmation email we sent right after payment. You can also find it under My trips once you sign in." },
  { id: "q2", cat: "Bookings", q: "Can I book for someone else?", a: "Yes. Enter the traveller's name exactly as it appears on their passport. The person booking does not have to be a passenger." },
  { id: "q3", cat: "Payments", q: "Which payment methods do you accept?", a: "We accept Visa, Mastercard, American Express, Apple Pay, Google Pay and bank transfer in selected countries. You are only charged after you confirm the final price." },
  { id: "q4", cat: "Payments", q: "Why was my card charged twice?", a: "A temporary hold can appear next to the final charge. The hold drops off within three to five working days. If both amounts stay, contact us with your booking reference." },
  { id: "q5", cat: "Changes and refunds", q: "Can I change my flight dates?", a: "Fares marked Flexible can be changed for free up to 24 hours before departure. Other fares may carry an airline fee. You will see the exact cost before you confirm any change." },
  { id: "q6", cat: "Changes and refunds", q: "How long do refunds take?", a: "Approved refunds are sent to your original payment method within 7 to 14 working days, depending on your bank." },
  { id: "q7", cat: "Baggage", q: "What is included in my baggage allowance?", a: "Each fare shows its cabin and checked baggage on the results page and again at checkout. Airlines set the weight limits, so check them before you fly." },
  { id: "q8", cat: "Baggage", q: "Can I add extra baggage after booking?", a: "Yes. Open My trips, choose your flight and select Add baggage. Adding it online is usually cheaper than paying at the airport." },
];
