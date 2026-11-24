export interface WeddingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venueName: string;
  address: string;
  description: string;
  image: string;
  dressCode?: string;
}

export interface LoveStoryChapter {
  year: string;
  title: string;
  text: string;
  image: string;
  location?: string;
}

export interface GalleryItem {
  src: string;
  videoSrc?: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  category?: 'portrait' | 'candid' | 'editorial' | 'celebration';
}

export interface WeddingConfig {
  hasRealMediaAssets: boolean;
  couple: {
    bride: {
      firstName: string;
      fullName: string;
      parents: string;
    };
    groom: {
      firstName: string;
      fullName: string;
      parents: string;
    };
    monogram: string;
    initials: string;
    hashtag: string;
    invitationSubtitle: string;
  };
  families: {
    groomFamily: string;
    brideFamily: string;
    invitationMessage: string;
    blessingQuote: string;
  };
  weddingDate: string; // ISO 8601 with Asia/Kolkata timezone
  displayDate: string;
  mainTime: string;
  events: WeddingEvent[];
  venue: {
    name: string;
    tagline: string;
    address: string;
    city: string;
    state: string;
    country: string;
    lat: number;
    lng: number;
    mapsEmbedUrl: string;
    directionsUrl: string;
    photos: string[];
    airportNote: string;
  };
  loveStory: LoveStoryChapter[];
  gallery: GalleryItem[];
  videos: {
    heroVideo: {
      src: string;
      poster: string;
      webm?: string;
    };
    storyVideo: {
      src: string;
      poster: string;
      webm?: string;
    };
  };
  music: {
    src: string;
    title: string;
    artist: string;
  };
  rsvp: {
    whatsappNumber: string; // international format without + or spaces e.g. 919876543210
    whatsappMessagePrefix: string;
    googleAppsScriptEndpoint?: string;
    maxGuests: number;
    deadline: string;
  };
  seo: {
    title: string;
    description: string;
    ogImage: string;
    canonicalUrl: string;
  };
}

export const weddingConfig: WeddingConfig = {
  // Set to true once photos/videos are added to /public/media/
  hasRealMediaAssets: true,
  couple: {
    bride: {
      firstName: "Kiara",
      fullName: "Kiara Advani",
      parents: "Mrs. Genevieve & Mr. Jagdeep Advani",
    },
    groom: {
      firstName: "Sidharth",
      fullName: "Sidharth Malhotra",
      parents: "Mrs. Rimma & Mr. Sunil Malhotra",
    },
    monogram: "S & K",
    initials: "S · K",
    hashtag: "#ForeverSidharthKiara",
    invitationSubtitle: "Request the pleasure of your company at the wedding celebrations",
  },
  families: {
    groomFamily: "The Malhotra Family",
    brideFamily: "The Advani Family",
    invitationMessage:
      "With hearts full of love and gratitude, we invite you to celebrate the union of Sidharth and Kiara as they begin their greatest adventure together.",
    blessingQuote:
      "Two souls with but a single thought, two hearts that beat as one.",
  },
  // Dec 12, 2026, 17:30 IST
  weddingDate: "2026-12-12T17:30:00+05:30",
  displayDate: "Saturday, Twelfth of December, Two Thousand Twenty-Six",
  mainTime: "Five-Thirty in the Evening",
  events: [
    {
      id: "haldi",
      title: "The Haldi Ceremony",
      date: "Friday, December 11, 2026",
      time: "10:30 AM onwards",
      venueName: "The Courtyard Gardens",
      address: "The Leela Palace, Udaipur",
      description:
        "A sunlit morning filled with auspicious turmeric blessings, acoustic folk melodies, and shared laughter amidst cascading marigolds.",
      image: "/media/event-haldi.jpg",
      dressCode: "Sunshine Yellow, Ochre & Bohemian Festive",
    },
    {
      id: "mehendi",
      title: "The Mehendi Soirée",
      date: "Friday, December 11, 2026",
      time: "4:00 PM onwards",
      venueName: "Zanana Terrace by the Lake",
      address: "The Leela Palace, Udaipur",
      description:
        "Intricate henna artistry by twilight, bespoke cocktails, live sufi renditions, and savory heritage delicacies by the tranquil Pichola lake.",
      image: "/media/event-mehendi.jpg",
      dressCode: "Pastel Florals, Mint Greens & Regal Chanderi",
    },
    {
      id: "sangeet",
      title: "The Royal Sangeet",
      date: "Friday, December 11, 2026",
      time: "8:00 PM onwards",
      venueName: "The Grand Mewar Ballroom",
      address: "The Leela Palace, Udaipur",
      description:
        "An electric evening of orchestrated performances, timeless romance, live percussion, and an unforgettable dance floor under crystal chandeliers.",
      image: "/media/event-sangeet.jpg",
      dressCode: "Glimmering Metallics, Midnight Velvets & Indo-Western",
    },
    {
      id: "wedding",
      title: "The Pheras & Wedding",
      date: "Saturday, December 12, 2026",
      time: "5:30 PM onwards",
      venueName: "The Lakefront Mandap",
      address: "The Leela Palace, Udaipur",
      description:
        "Vows whispered beside sacred fire as the setting sun paints Lake Pichola gold, followed by the varmala and heartfelt family blessings.",
      image: "/media/event-wedding.jpg",
      dressCode: "Regal Indian Heritage, Ivory, Old Rose & Gold",
    },
    {
      id: "reception",
      title: "The Grand Reception",
      date: "Saturday, December 12, 2026",
      time: "8:30 PM onwards",
      venueName: "The Royal Amphitheatre",
      address: "The Leela Palace, Udaipur",
      description:
        "A black-tie dinner under the starry Rajasthani sky with champagne toasts, live jazz, a curated multi-course banquet, and midnight fireworks.",
      image: "/media/event-reception.jpg",
      dressCode: "Black Tie, Elegant Tuxedos & Haute Couture Sarees",
    },
  ],
  venue: {
    name: "The Leela Palace, Udaipur",
    tagline: "A jewel poised delicately on the tranquil waters of Lake Pichola",
    address: "Lake Pichola, PO Box 125, Udaipur, Rajasthan 313001, India",
    city: "Udaipur",
    state: "Rajasthan",
    country: "India",
    lat: 24.5779,
    lng: 73.6781,
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3628.2778393529243!2d73.675549075362!3d24.577884978113426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e5658e469b2d%3A0xebe77b21e069152b!2sThe%20Leela%20Palace%20Udaipur!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    directionsUrl: "https://maps.google.com/?q=The+Leela+Palace+Udaipur",
    photos: [
      "/media/venue-01.jpg",
      "/media/venue-02.jpg",
      "/media/venue-03.jpg",
    ],
    airportNote:
      "Maharana Pratap Airport (UDR) is approximately 45 minutes by car. Private boat transfers will greet guests at the Lake Pichola jetty.",
  },
  loveStory: [
    {
      year: "2019",
      title: "The Unplanned Encounter",
      text: "A rainy October evening in a vintage bookstore in Colaba. Two hands reached for the exact same poetry collection by Pablo Neruda. A shared cup of spiced pour-over coffee turned into four hours of discovering shared passions, unspoken dreams, and an inexplicable sense of coming home.",
      image: "/media/story-01-first-meet.jpg",
      location: "Bombay",
    },
    {
      year: "2021",
      title: "Adventures Across Continents",
      text: "From midnight drives along Amalfi's serpentine cliffs to getting joyfully lost in Kyoto's quiet bamboo groves. Every travel destination mirrored our growing bond — fearless, adventurous, and filled with quiet moments of gratitude.",
      image: "/media/story-02-first-date.jpg",
      location: "Positano & Kyoto",
    },
    {
      year: "2023",
      title: "Building Our Sanctuary",
      text: "Adopted Leo, our spirited golden retriever, and nurtured our first apartment together. Between burnt Sunday brunches and endless conversations on the balcony under Mumbai stars, we realized that 'home' was never a place — it was each other.",
      image: "/media/story-03-adventures.png",
      location: "Bandra, Mumbai",
    },
    {
      year: "2025",
      title: "The Secret Proposal",
      text: "Surrounded by candlelight and an intimate acoustic cello playing our song atop a private cliff in Udaipur at dusk. As Sidharth went down on one knee with tears of joy, Kiara answered with the easiest and most certain 'Yes' of her life.",
      image: "/media/story-04-proposal.png",
      location: "Lake Pichola, Udaipur",
    },
    {
      year: "2026",
      title: "The Forever Chapter",
      text: "Now, surrounded by those who have loved and guided us across every step of our journey, we step into the greatest chapter of all. Our forever officially begins here.",
      image: "/media/story-05-engaged.png",
      location: "The Journey Continues",
    },
  ],
  gallery: [
    {
      src: "/media/story-01-first-meet.jpg",
      videoSrc: "/videos/reelform.mp4",
      width: 1080,
      height: 1920,
      alt: "Sidharth & Kiara · Reel I - The Royal Grand Entrance",
      caption: "An intimate portrait before the royal celebration",
      category: "portrait",
    },
    {
      src: "/media/story-02-first-date.jpg",
      videoSrc: "/videos/reel2.mp4",
      width: 1080,
      height: 1920,
      alt: "Sidharth & Kiara · Reel II - Unscripted Joy by Lake Pichola",
      caption: "Unscripted sunset and laughter by Lake Pichola",
      category: "candid",
    },
    {
      src: "/media/story-03-adventures.png",
      videoSrc: "/videos/reel3.mp4",
      width: 1080,
      height: 1920,
      alt: "Sidharth & Kiara · Reel III - Heritage Jewels & Sacred Vows",
      caption: "Timeless details and antique gold heirloom jewels",
      category: "editorial",
    },
    {
      src: "/media/story-04-proposal.png",
      videoSrc: "/videos/reel4.mp4",
      width: 1080,
      height: 1920,
      alt: "Sidharth & Kiara · Reel IV - Whispered Promises at Twilight",
      caption: "Whispered promises under the golden evening sky",
      category: "portrait",
    },
    {
      src: "/media/gallery-06.jpg",
      width: 1400,
      height: 1900,
      alt: "Sidharth & Kiara · Together Forever Cake Cutting",
      caption: "Together Forever — Sweetest celebration under royal candlelight",
      category: "editorial",
    },
    {
      src: "/media/gallery-07.jpg",
      width: 1400,
      height: 1400,
      alt: "Sidharth & Kiara · Golden Glow Haldi Ceremony",
      caption: "Golden moments, marigolds, and laughter bathed in auspicious Haldi",
      category: "candid",
    },
    {
      src: "/media/gallery-08.jpg",
      width: 1800,
      height: 1200,
      alt: "Sidharth & Kiara · Coastal Getaway & Endless Horizons",
      caption: "Coastal drives, ocean breeze, and a lifetime of shared adventures",
      category: "celebration",
    },
  ],
  videos: {
    heroVideo: {
      src: "/media/hero-video.mp4",
      poster: "/media/hero-poster.jpg",
    },
    storyVideo: {
      src: "",
      poster: "/media/cinematic-film-bg.jpg",
    },
  },
  music: {
    src: "/videos/background-video.mp4",
    title: "Sidharth & Kiara's Wedding Celebration Song",
    artist: "Original Sound Track",
  },
  rsvp: {
    whatsappNumber: "919876543210",
    whatsappMessagePrefix: "Namaste! I would love to RSVP for Sidharth & Kiara's Wedding:",
    googleAppsScriptEndpoint: "",
    maxGuests: 4,
    deadline: "November 20, 2026",
  },
  seo: {
    title: "Sidharth & Kiara | Wedding Celebrations | December 12, 2026",
    description:
      "Join us in celebrating the union of Sidharth Malhotra & Kiara Advani at The Leela Palace, Udaipur. Wedding details, itinerary, RSVP, and our journey.",
    ogImage: "/media/og-image.jpg",
    canonicalUrl: "https://sidharthandkiara.com",
  },
};
