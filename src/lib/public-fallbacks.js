const fallbackMenuCategories = []

const fallbackMenuItems = []

function buildFallbackCategories() {
  return fallbackMenuCategories.map((category) => ({
    ...category,
    items: fallbackMenuItems.filter((item) => item.category.slug === category.slug),
  }))
}

export const fallbackSiteSettings = {
  restaurantName: 'RajaMahendravaram PalavuCentre',
  tagline: 'Rooted in Konaseema',
  restaurantDescription: 'Authentic flavors, traditional recipes, unforgettable taste.',
  logoUrl: '',
  heroMedia: [
    {
      type: 'image',
      url: '/hero-bg.jpg',
    },
  ],
  cta: {
    primary: {
      label: 'Order Online',
      href: '/menu',
    },
    secondary: {
      label: 'Contact Us',
      href: '/contact',
    },
  },
  contact: {
    address: 'Hyderabad, Telangana',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.3160399884!2d78.24323!3d17.412608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1234567890',
    mapLink: 'https://maps.google.com/?q=Hyderabad,Telangana',
    phone: '9966655997',
    email: 'rajamahendravarampalavu@gmail.com',
    hours: 'Monday - Sunday, 12:00 PM - 11:00 PM',
    whatsappNumber: '919966655997',
    floatingWhatsappEnabled: true,
  },
  seo: {
    cuisineType: 'Godavari, Konaseema, Andhra',
    city: 'Hyderabad',
    areaKeywords: ['Hyderabad', 'Godavari cuisine', 'Konaseema food', 'Andhra restaurant'],
    metaTitle: 'RajaMahendravaram PalavuCentre | Authentic Godavari Cuisine in Hyderabad',
    metaDescription:
      'Order traditional Godavari biryanis, curries, and catering from RajaMahendravaram PalavuCentre in Hyderabad.',
    metaKeywords: [
      'RajaMahendravaram PalavuCentre',
      'Godavari cuisine',
      'Konaseema food',
      'Andhra restaurant Hyderabad',
    ],
    googleReviewUrl: 'https://g.page/r/YOUR_GOOGLE_BUSINESS_ID/review',
  },
  ordering: {
    deliveryFee: 0,
    freeDeliveryThreshold: 0,
    deliveryFeePaise: 0,
    freeDeliveryThresholdPaise: 0,
    taxPercent: 5,
    currency: 'INR',
  },
  socialLinks: [
    {
      id: 1,
      platform: 'whatsapp',
      label: 'WhatsApp',
      url: 'https://wa.me/919966655997',
      isActive: true,
      sortOrder: 1,
    },
    {
      id: 2,
      platform: 'instagram',
      label: 'Instagram',
      url: 'https://instagram.com/palavucentre',
      isActive: true,
      sortOrder: 2,
    },
    {
      id: 3,
      platform: 'facebook',
      label: 'Facebook',
      url: 'https://facebook.com/palavucentre',
      isActive: true,
      sortOrder: 3,
    },
  ],
}

export const fallbackMenuData = {
  categories: buildFallbackCategories(),
  categoryMap: {
    all: 'All',
    ...Object.fromEntries(fallbackMenuCategories.map((category) => [category.slug, category.name])),
  },
  groupedItems: {
    all: fallbackMenuItems,
    ...Object.fromEntries(
      fallbackMenuCategories.map((category) => [
        category.slug,
        fallbackMenuItems.filter((item) => item.category.slug === category.slug),
      ]),
    ),
  },
  items: fallbackMenuItems,
}

export const fallbackGalleryItems = []

export const fallbackReviews = []

export const fallbackOffers = []
