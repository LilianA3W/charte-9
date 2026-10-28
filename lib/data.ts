// Contenu de la maquette (placeholders identiques à ceux de la charte Figma).

export const NAV = [
  { label: "L’entreprise", href: "#entreprise" },
  { label: "Notre activité", href: "#services" },
  { label: "Nos réalisations", href: "#realisations" },
  { label: "Contact", href: "#contact" },
] as const;

export const QUICK_ACCESS = [
  { icon: "calendar", title: "Prendre rendez-vous", text: "Réservation en ligne", href: "#contact", highlight: true },
  { icon: "scissors", title: "Nos prestations", text: "Coupe, couleur, soins", href: "#services", highlight: false },
  { icon: "tag", title: "Tarifs", text: "Grille des prestations", href: "#services", highlight: false },
  { icon: "pin", title: "Nous trouver", text: "Adresse et horaires", href: "#contact", highlight: false },
] as const;

export const SERVICES = [
  { icon: "scissors", title: "Coupe & coiffage" },
  { icon: "drops", title: "Coloration & balayage" },
  { icon: "sparkles", title: "Soins du visage" },
  { icon: "heart", title: "Mariage & événements" },
] as const;

export const QUALIFICATIONS = [
  { name: "QualiPAC", src: "/charte9-figma/qualipac.png" },
  { name: "Qualisol", src: "/charte9-figma/qualisol.png" },
  { name: "Qualigaz", src: "/charte9-figma/qualigaz.png" },
  { name: "Qualibat", src: "/charte9-figma/qualibat.png" },
  { name: "Maître artisan", src: "/charte9-figma/maitre-artisan.png" },
  { name: "Eco artisan", src: "/charte9-figma/eco-artisan.png" },
] as const;

const IMG = "/charte9-unsplash";

export const PROJECTS = [
  { image: `${IMG}/03-realisation-1.jpg`, alt: "Brushing sur cheveux blonds", tags: ["Lorem", "Ipsum"] },
  { image: `${IMG}/04-realisation-2.jpg`, alt: "Soin du visage au masque", tags: ["Dolor", "Sit"] },
  { image: `${IMG}/05-realisation-3.jpg`, alt: "Pose d’extensions de cils", tags: ["Amet", "Elit", "Ut"] },
] as const;

export const NEWS_FEATURED = {
  image: `${IMG}/06-actualite-a-la-une.jpg`,
  alt: "Intérieur d’un salon de coiffure",
  date: "15 mars 2025",
  title: "Lorem ipsum dolor sit amet consectetur",
};

export const NEWS = [
  { image: `${IMG}/07-actualite-2.jpg`, alt: "Brushing en salon", date: "12 mars 2025" },
  { image: `${IMG}/08-actualite-3.jpg`, alt: "Soin du visage", date: "05 février 2025" },
  { image: `${IMG}/09-actualite-4.jpg`, alt: "Coiffeuse en salon", date: "12 janvier 2025" },
] as const;

export const HERO_TEXT =
  "Lorem ipsum dolor sit amet consectetur. Nunc vel accumsan et non. Sed venenatis malesuada diam mattis morbi.";
export const LOREM_SHORT =
  "Lorem ipsum dolor sit amet consectetur. Turpis purus elementum nibh in facilisis.";
export const LOREM_MEDIUM =
  "Lorem ipsum dolor sit amet consectetur. Mollis aenean tristique egestas sit convallis nunc tristique lacus. Metus...";
export const LOREM_LONG =
  "Lorem ipsum dolor sit amet consectetur. Nunc vel accumsan et non. Sed venenatis malesuada diam mattis morbi. Amet lacus dignissim sodales ut eu sem integer vitae justo.";
