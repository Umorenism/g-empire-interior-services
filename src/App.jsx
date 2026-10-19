import React, { useState, useEffect, useMemo } from 'react';
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  CheckCircle,
  Search,
  Sliders,
  Sparkles,
  ChevronRight,
  Plus,
  Trash2,
  Send,
  X,
  Eye,
  Menu,
  Check,
  Building,
  ArrowRight,
  MessageSquare,
  Award,
  ShieldCheck,
  Star,
  RefreshCw,
  Home,
  Sofa,
  Layers,
  Palette,
  Calculator,
  Grid,
  Filter,
  CheckCircle2,
  ThumbsUp,
  Image as ImageIcon,
  Share2,
  DollarSign
} from 'lucide-react';

// --- COMPANY DETAILS ---
const COMPANY_DETAILS = {
  name: 'G Empire',
  tagline: 'World-Class Interior & Exterior Design, Screeding, POP, Painting & Premium Furniture Services',
  phone: '08108457702',
  whatsappRaw: '2348108457702',
  email: 'gideonmoses2@gmail.com',
  hours: 'Monday – Sunday (8:00 AM – 8:00 PM)',
  location: 'Lekki Phase 1, Lagos & Abuja Branch, Nigeria'
};

// --- CATEGORIES ---
const CATEGORIES = [
  { id: 'all', name: 'All Services & Catalog', icon: Sparkles },
  { id: 'furniture', name: 'Luxury Furniture', icon: Sofa },
  { id: 'screeding_pop', name: 'Screeding & POP Ceiling', icon: Layers },
  { id: 'painting', name: 'Painting & Wall Finishes', icon: Palette },
  { id: 'interior', name: 'Interior Setup', icon: Home },
  { id: 'exterior', name: 'Exterior Architecture', icon: Building }
];

// --- EXTENDED CATALOG ITEMS WITH GALLERY IMAGES ---
const CATALOG_ITEMS = [
  {
    id: 1,
    title: 'Royal Chesterfield Leather Sofa Set',
    category: 'furniture',
    price: 1850000,
    priceUnit: 'per set (3+2+1)',
    badge: 'Best Seller',
    rating: 4.9,
    reviews: 28,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Handcrafted premium leather 6-seater Chesterfield sofa set with deep button tufting and hardwood mahogany framing. Designed for regal living spaces.',
    specs: ['Top-grain Italian Leather', 'Solid Hardwood Mahogany Frame', 'High-Density Memory Cushioning', '5-Year Structural Warranty'],
    estimatedTime: '7-14 Days Delivery'
  },
  {
    id: 2,
    title: '3D Suspended POP Ceiling with LED Recesses',
    category: 'screeding_pop',
    price: 8500,
    priceUnit: 'per sqm (materials + expert labor)',
    badge: 'Featured',
    rating: 5.0,
    reviews: 42,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Custom suspended POP plaster ceiling installation featuring modern geometric cutouts, perimeter warm LED troughs, and seamless jointing.',
    specs: ['High-Grade Imported Plaster', 'Galvanized Steel Channels', 'Integrated LED Strip Troughs', 'Moisture & Fire Resistant'],
    estimatedTime: '3-5 Days per 100 sqm'
  },
  {
    id: 3,
    title: 'Mirror Glass Wall Screeding & Skim Coating',
    category: 'screeding_pop',
    price: 3200,
    priceUnit: 'per sqm (2 coats + sanding)',
    badge: 'Must Have',
    rating: 4.8,
    reviews: 56,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Flawless acrylic wall leveling and dustless skim coating service. Eliminates all plaster defects for a silky mirror-smooth paint finish.',
    specs: ['Premium Acrylic Screed Putty', 'Double Coat Application', 'Electric Dustless Sanding', 'Zero Cracks Guarantee'],
    estimatedTime: '1-2 Days per room'
  },
  {
    id: 4,
    title: 'Italian Stucco Marble Decorative Wall Paint',
    category: 'painting',
    price: 14500,
    priceUnit: 'per sqm',
    badge: 'Luxury',
    rating: 4.9,
    reviews: 31,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'High-end Venetian Stucco decorative plaster mimicking real polished Italian marble. Waterproof, washable, and stain-resistant.',
    specs: ['Imported Italian Wax & Plaster', 'High-Gloss Polished Marble Finish', '100% Washable & UV Resistant', 'Over 20 Custom Color Tones'],
    estimatedTime: '2-3 Days per wall'
  },
  {
    id: 5,
    title: 'Weatherproof Exterior Textured Wall Coating',
    category: 'painting',
    price: 6800,
    priceUnit: 'per sqm',
    badge: 'Popular',
    rating: 4.9,
    reviews: 19,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Heavy-duty exterior acrylic textured coating engineered to withstand tropical humidity, heavy rainfall, and harsh UV rays without cracking.',
    specs: ['Anti-Fungal & Anti-Algae Formulation', 'Elastic Crack-Bridging Tech', '10-Year Weatherproofing Warranty', 'Satin & Matte Textures'],
    estimatedTime: '5-7 Days per building'
  },
  {
    id: 6,
    title: 'Executive Calacatta Marble Top 8-Seater Dining Set',
    category: 'furniture',
    price: 2400000,
    priceUnit: 'complete set with 8 luxury chairs',
    badge: 'New Arrival',
    rating: 5.0,
    reviews: 15,
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Sealed natural Calacatta gold marble top dining table supported by gold electroplated 304 stainless steel framing, paired with ergonomic velvet chairs.',
    specs: ['Heat & Stain Resistant Marble', '304 Brushed Gold Stainless Steel Base', 'Stain-Guard Velvet Upholstery', 'Custom Table Lengths Available'],
    estimatedTime: '10-14 Days Delivery'
  },
  {
    id: 7,
    title: 'Modern Minimalist TV Wall Console with Fluted Panels',
    category: 'furniture',
    price: 750000,
    priceUnit: 'per unit',
    badge: 'Trending',
    rating: 4.8,
    reviews: 38,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Floating TV wall background featuring acoustic fluted wood slats, soft-close drawers, hidden wire conduit system, and warm backlighting.',
    specs: ['High-Moisture Resistance HDF Board', 'Natural Wood Veneer Finish', 'Blum Soft-Close Hardware', 'Integrated LED Cable Slots'],
    estimatedTime: '4-7 Days Installation'
  },
  {
    id: 8,
    title: 'Full Turnkey Living Room Architectural Transformation',
    category: 'interior',
    price: 4500000,
    priceUnit: 'complete package starting rate',
    badge: 'Full Package',
    rating: 5.0,
    reviews: 24,
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Complete living room makeover: Includes wall screeding, Italian Stucco accent wall, 3D POP ceiling installation, bespoke furniture procurement, and architectural lighting.',
    specs: ['Photorealistic 3D Render Design', 'Full Site Execution & Project Management', 'Custom Furniture Setup', 'Turnkey Workmanship Guarantee'],
    estimatedTime: '3-4 Weeks Execution'
  },
  {
    id: 9,
    title: 'Modern Facade Exterior Cladding & Lighting Design',
    category: 'exterior',
    price: 3800000,
    priceUnit: 'estimated package price',
    badge: 'Exterior Spec',
    rating: 4.9,
    reviews: 12,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Transform your building curb appeal with composite wood wall cladding, architectural IP67 exterior spotlighting, natural stone feature panels, and weather paint.',
    specs: ['Waterproof WPC Panels', 'Architectural Outdoor Spotlights', 'Anti-Corrosion Sub-framing', '3D Exterior Render Plan'],
    estimatedTime: '2-3 Weeks'
  }
];

// --- ESTIMATOR SERVICES DATA ---
const ESTIMATOR_SERVICES = [
  { id: 'screed', name: 'Wall Screeding & Smoothing', unit: 'sqm', pricePerUnit: 3200, category: 'screeding_pop' },
  { id: 'pop', name: '3D Suspended POP Ceiling Installation', unit: 'sqm', pricePerUnit: 8500, category: 'screeding_pop' },
  { id: 'paint_interior', name: 'Premium Interior Satin Painting', unit: 'sqm', pricePerUnit: 2500, category: 'painting' },
  { id: 'stucco', name: 'Italian Stucco Marble Decorative Wall', unit: 'sqm', pricePerUnit: 14500, category: 'painting' },
  { id: 'sofa', name: 'Custom Luxury Living Room Sofa', unit: 'unit', pricePerUnit: 1250000, category: 'furniture' },
  { id: 'tv_console', name: 'Floating TV Console + Fluted Panel', unit: 'unit', pricePerUnit: 750000, category: 'furniture' },
  { id: 'dining', name: 'Marble Top 8-Seater Dining Table Set', unit: 'unit', pricePerUnit: 2400000, category: 'furniture' }
];

// --- TESTIMONIALS DATA ---
const INITIAL_REVIEWS = [
  {
    id: 1,
    name: 'Chief Olabisi Adeleke',
    location: 'Lekki Phase 1, Lagos',
    rating: 5,
    date: '2 weeks ago',
    comment: 'G Empire handled the full wall screeding and 3D POP ceiling in my duplex. Their mirror-finish screeding is truly smooth without a single wall defect. Delivered right on schedule!'
  },
  {
    id: 2,
    name: 'Engr. Emeka Nwosu',
    location: 'Maitama, Abuja',
    rating: 5,
    date: '1 month ago',
    comment: 'The Italian Stucco marble painting in my living room is a masterwork. Everyone who enters asks where I bought real marble walls from. Exceptional craftsmanship from Gideon and his team.'
  },
  {
    id: 3,
    name: 'Dr. (Mrs) Zainab Bello',
    location: 'Ikeja GRA, Lagos',
    rating: 5,
    date: '1 month ago',
    comment: 'Purchased the Royal Chesterfield leather sofa set and custom TV console. Solid hardwood quality and top Italian leather. Direct factory pricing with zero middleman markup.'
  }
];

// --- BEFORE / AFTER PROJECTS DATA ---
const PROJECTS_SHOWCASE = [
  {
    id: 1,
    title: 'Lekki Phase 1 Modern Mansion Makeover',
    beforeImg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    description: 'Full interior revamp featuring double-layer wall screeding, geometric POP suspended ceiling, Italian Stucco accent wall, and custom velvet furniture.'
  },
  {
    id: 2,
    title: 'Maitama Villa Facade Architectural Elevation',
    beforeImg: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    afterImg: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    description: 'Weatherproof textured exterior coating combined with dark composite WPC wood cladding and warm IP67 LED spotlights.'
  }
];

// Utility: Format currency to Nigerian Naira (₦)
const formatNaira = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(amount).replace('NGN', '₦');
};

export default function App() {
  // Navigation & Active Section State
  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog', 'calculator', 'projects', 'about', 'contact'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceMaxFilter, setPriceMaxFilter] = useState(5000000);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Skeleton Loader State
  const [isLoading, setIsLoading] = useState(false);

  // Modals
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductImgIndex, setSelectedProductImgIndex] = useState(0);
  const [reviewsModalOpen, setReviewsModalOpen] = useState(false);
  const [leaveReviewModalOpen, setLeaveReviewModalOpen] = useState(false);

  // Toast Notifications
  const [toastMessage, setToastMessage] = useState(null);

  // Reviews List
  const [reviewsList, setReviewsList] = useState(INITIAL_REVIEWS);
  const [newReview, setNewReview] = useState({ name: '', location: '', rating: 5, comment: '' });

  // Quote Shortlist / Cart State
  const [quoteList, setQuoteList] = useState([]);

  // Cost Calculator State
  const [calculatorInputs, setCalculatorInputs] = useState({
    screed: 150,
    pop: 120,
    paint_interior: 150,
    stucco: 20,
    sofa: 1,
    tv_console: 1,
    dining: 0
  });

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'All Services (Full Turnkey)',
    message: ''
  });

  // Helper function for showing toasts
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Dynamic filter change with simulated skeleton loading
  const handleCategoryChange = (catId) => {
    setIsLoading(true);
    setSelectedCategory(catId);
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };

  // Filter and Sort Catalog
  const filteredCatalog = useMemo(() => {
    let result = CATALOG_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = item.price <= priceMaxFilter;
      return matchesCategory && matchesSearch && matchesPrice;
    });

    if (sortBy === 'low_to_high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high_to_low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popular') {
      result.sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  }, [selectedCategory, searchQuery, priceMaxFilter, sortBy]);

  // Quote List Operations
  const addToQuote = (item) => {
    if (!quoteList.find(q => q.id === item.id)) {
      setQuoteList([...quoteList, item]);
      showToast(`"${item.title}" added to your quote shortlist!`);
    } else {
      showToast(`"${item.title}" is already in your quote shortlist.`);
    }
  };

  const removeFromQuote = (itemId) => {
    setQuoteList(quoteList.filter(q => q.id !== itemId));
    showToast('Item removed from quote shortlist.');
  };

  // Calculated Services Total
  const estimatedTotalCost = useMemo(() => {
    return ESTIMATOR_SERVICES.reduce((sum, service) => {
      const qty = calculatorInputs[service.id] || 0;
      return sum + (qty * service.pricePerUnit);
    }, 0);
  }, [calculatorInputs]);

  // WhatsApp Link Generator
  const getWhatsAppLink = (customText) => {
    const defaultText = customText || `Hello G Empire! I am interested in your world-class interior, screeding, POP ceiling, and furniture services. Please assist me.`;
    return `https://wa.me/${COMPANY_DETAILS.whatsappRaw}?text=${encodeURIComponent(defaultText)}`;
  };

  // Send Shortlist Quote via WhatsApp
  const sendQuoteViaWhatsApp = () => {
    let text = `*G EMPIRE CUSTOM QUOTE REQUEST*\n`;
    text += `Client Name: ${contactForm.name || 'Valued Customer'}\n`;
    text += `Phone: ${contactForm.phone || 'Not specified'}\n\n`;
    text += `*CALCULATED SERVICES BREAKDOWN:*\n`;

    ESTIMATOR_SERVICES.forEach(s => {
      const qty = calculatorInputs[s.id] || 0;
      if (qty > 0) {
        text += `• ${s.name}: ${qty} ${s.unit} = ${formatNaira(qty * s.pricePerUnit)}\n`;
      }
    });

    if (quoteList.length > 0) {
      text += `\n*SELECTED CATALOG ITEMS:* (${quoteList.length} items)\n`;
      quoteList.forEach(item => {
        text += `• ${item.title} (${formatNaira(item.price)})\n`;
      });
    }

    const grandTotal = estimatedTotalCost + quoteList.reduce((acc, curr) => acc + curr.price, 0);
    text += `\n*ESTIMATED GRAND TOTAL: ${formatNaira(grandTotal)}*\n`;
    text += `\nPlease review and schedule a physical site inspection for my project!`;

    window.open(getWhatsAppLink(text), '_blank');
  };

  // Handle Form Submission to Formspree / Email
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const subject = `New Inquiry from ${contactForm.name || 'Website Visitor'} - G Empire`;
    let body = `Full Name: ${contactForm.name}\nPhone: ${contactForm.phone}\nEmail: ${contactForm.email}\nService Interested: ${contactForm.service}\n\nProject Message:\n${contactForm.message}\n\n`;

    if (quoteList.length > 0) {
      body += `Shortlisted Catalog Items:\n` + quoteList.map(i => `- ${i.title} (${formatNaira(i.price)})`).join('\n') + `\n\n`;
    }

    body += `Estimated Cost Tool Calculation: ${formatNaira(estimatedTotalCost)}`;

    window.location.href = `mailto:${COMPANY_DETAILS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    showToast('Form prepared! Opening your mail client...');
  };

  // Submit Review Form
  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    const created = {
      id: Date.now(),
      name: newReview.name,
      location: newReview.location || 'Nigeria',
      rating: Number(newReview.rating),
      date: 'Just now',
      comment: newReview.comment
    };

    setReviewsList([created, ...reviewsList]);
    setNewReview({ name: '', location: '', rating: 5, comment: '' });
    setLeaveReviewModalOpen(false);
    showToast('Thank you! Your review has been recorded.');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-amber-100 selection:text-amber-900 flex flex-col justify-between">
      
      {/* --- TOAST NOTIFICATION CONTAINER --- */}
      {toastMessage && (
        <div className="fixed top-24 right-5 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-slideIn text-xs sm:text-sm font-medium">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        {/* --- TOP ANNOUNCEMENT BAR --- */}
        <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex items-center space-x-6">
              <span className="flex items-center gap-1.5 font-medium text-amber-400">
                <Clock className="w-3.5 h-3.5" />
                {COMPANY_DETAILS.hours}
              </span>
              <span className="hidden md:flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {COMPANY_DETAILS.location}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <a href={`tel:${COMPANY_DETAILS.phone}`} className="hover:text-amber-400 transition-colors flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" />
                {COMPANY_DETAILS.phone}
              </a>
              <span className="text-slate-700">|</span>
              <a href={`mailto:${COMPANY_DETAILS.email}`} className="hover:text-amber-400 transition-colors flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                {COMPANY_DETAILS.email}
              </a>
            </div>
          </div>
        </div>

        {/* --- MAIN HEADER NAVIGATION --- */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 transition-all">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('catalog')}>
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 flex items-center justify-center text-white shadow-md shadow-amber-500/20 font-black text-xl tracking-wider">
                GE
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-2xl tracking-tight text-slate-900 font-serif">G EMPIRE</span>
                  <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-widest hidden sm:inline-block border border-amber-300">
                    World Class
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">Interiors • Screeding • POP • Furniture</p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm text-slate-600">
              <button
                onClick={() => setActiveTab('catalog')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'catalog' ? 'bg-amber-50 text-amber-800 font-bold' : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                Catalog & Services
              </button>
              <button
                onClick={() => setActiveTab('calculator')}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTab === 'calculator' ? 'bg-amber-50 text-amber-800 font-bold' : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <Calculator className="w-4 h-4 text-amber-600" />
                Cost Estimator
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'projects' ? 'bg-amber-50 text-amber-800 font-bold' : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                Project Gallery
              </button>
              <button
                onClick={() => setReviewsModalOpen(true)}
                className="px-4 py-2 rounded-lg transition-all hover:bg-slate-100 text-slate-700 flex items-center gap-1"
              >
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                Reviews ({reviewsList.length})
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'about' ? 'bg-amber-50 text-amber-800 font-bold' : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                About Us
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'contact' ? 'bg-amber-50 text-amber-800 font-bold' : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                Contact
              </button>
            </nav>

            {/* Header Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Quote Shortlist Badge */}
              <button 
                onClick={() => setActiveTab('calculator')}
                className="relative p-2.5 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
                title="View Shortlisted Quote Items"
              >
                <Sparkles className="w-5 h-5 text-amber-600" />
                {quoteList.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-amber-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                    {quoteList.length}
                  </span>
                )}
              </button>

              <a
                href={getWhatsAppLink('Hello G Empire, I would like to inquire about your design, screeding, POP and furniture services.')}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all transform hover:-translate-y-0.5"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                WhatsApp Chat
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none border border-slate-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3 animate-fadeIn">
              <button
                onClick={() => { setActiveTab('catalog'); setMobileMenuOpen(false); }}
                className="block w-full text-left py-2 font-semibold text-slate-800 border-b border-slate-100"
              >
                Catalog & Services
              </button>
              <button
                onClick={() => { setActiveTab('calculator'); setMobileMenuOpen(false); }}
                className="block w-full text-left py-2 font-semibold text-amber-700 border-b border-slate-100 flex items-center justify-between"
              >
                <span>Cost Estimator & Quote</span>
                <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded-full font-bold">Tool</span>
              </button>
              <button
                onClick={() => { setActiveTab('projects'); setMobileMenuOpen(false); }}
                className="block w-full text-left py-2 font-semibold text-slate-800 border-b border-slate-100"
              >
                Project Gallery
              </button>
              <button
                onClick={() => { setReviewsModalOpen(true); setMobileMenuOpen(false); }}
                className="block w-full text-left py-2 font-semibold text-slate-800 border-b border-slate-100"
              >
                Client Reviews ({reviewsList.length})
              </button>
              <button
                onClick={() => { setActiveTab('about'); setMobileMenuOpen(false); }}
                className="block w-full text-left py-2 font-semibold text-slate-800 border-b border-slate-100"
              >
                About G Empire
              </button>
              <button
                onClick={() => { setActiveTab('contact'); setMobileMenuOpen(false); }}
                className="block w-full text-left py-2 font-semibold text-slate-800"
              >
                Contact Us
              </button>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full text-center bg-emerald-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  WhatsApp Us ({COMPANY_DETAILS.phone})
                </a>
              </div>
            </div>
          )}
        </header>

        {/* --- HERO BANNER SECTION --- */}
        <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/70 via-slate-50 to-white pt-10 pb-16 border-b border-slate-200/60">
          <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 -z-10 w-80 h-80 bg-slate-200/60 rounded-full blur-2xl pointer-events-none transform -translate-x-1/3 translate-y-1/3"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Hero Left Content */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-300 text-amber-900 px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wide">
                  <Award className="w-4 h-4 text-amber-700" />
                  Nigeria's Premier Interior Finishing & Luxury Furniture Hub
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight tracking-tight font-serif">
                  Elevate Your Property with <br className="hidden sm:inline" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600">
                    World-Class Interiors & Craftsmanship
                  </span>
                </h1>

                <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed">
                  From flawless mirror wall screeding and 3D POP ceilings to bespoke handcrafted leather furniture and Italian Stucco decorative paints — <strong>G Empire</strong> delivers timeless luxury across Nigeria.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <button
                    onClick={() => {
                      setActiveTab('catalog');
                      window.scrollTo({ top: 600, behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white font-extrabold px-8 py-4 rounded-xl shadow-lg shadow-amber-600/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    Explore Catalog
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => setActiveTab('calculator')}
                    className="w-full sm:w-auto bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold px-7 py-4 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <Calculator className="w-5 h-5 text-amber-600" />
                    Instant Cost Calculator
                  </button>
                </div>

                {/* Stat Badges */}
                <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/80 text-left">
                  <div>
                    <p className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">500+</p>
                    <p className="text-xs text-slate-500 font-medium">Completed Projects</p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">100%</p>
                    <p className="text-xs text-slate-500 font-medium">Flawless Finish Guarantee</p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">Mon - Sun</p>
                    <p className="text-xs text-slate-500 font-medium">Open Daily (8am-8pm)</p>
                  </div>
                </div>
              </div>

              {/* Hero Right Visual Showcase */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                    <img
                      src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80"
                      alt="G Empire Luxury Design"
                      className="w-full h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                      <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2.5 py-1 rounded-full w-max mb-2 uppercase tracking-wider">
                        Featured Showcase
                      </span>
                      <h3 className="text-xl font-bold font-serif">Lekki Duplex Living Room</h3>
                      <p className="text-xs text-slate-300 mt-1">3D POP Ceiling • Venetian Stucco • Bespoke Leather Sofa</p>
                    </div>
                  </div>

                  {/* Floating Badge */}
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-200 flex items-center gap-3 max-w-xs">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-slate-900">Direct Factory Pricing</p>
                      <p className="text-[11px] text-slate-500">Transparent Nigerian Naira rates with no middlemen.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- MAIN PAGE TAB SWITCHING --- */}
        <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12">

          {/* ================= SECTION 1: CATALOG & SERVICES ================= */}
          {activeTab === 'catalog' && (
            <div className="space-y-8">
              
              {/* Section Title & Skeleton Toggle */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-200">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
                    Explore Services & Catalog
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Browse custom luxury furniture, mirror screeding packages, POP ceiling concepts, and Italian paints.
                  </p>
                </div>

                {/* Skeleton Simulation & Refresh Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => setIsLoading(false), 500);
                    }}
                    className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-xl font-semibold flex items-center gap-1.5 transition-colors border border-slate-200"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                    Refresh Catalog
                  </button>
                </div>
              </div>

              {/* Category Filter Horizontal Buttons */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 ${
                        isSelected
                          ? 'bg-slate-900 text-white shadow-md'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                      {cat.name}
                    </button>
                  );
                })}
              </div>

              {/* Search, Price & Sorting Controls Bar */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                
                {/* Search input */}
                <div className="md:col-span-5 relative">
                  <Search className="w-5 h-5 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search furniture, screeding, POP ceiling, stucco..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:bg-white transition-all font-medium"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Sorting Select */}
                <div className="md:col-span-3">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="featured">Sort by Featured</option>
                    <option value="low_to_high">Price: Low to High</option>
                    <option value="high_to_low">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>

                {/* Price Slider */}
                <div className="md:col-span-4 flex flex-col justify-center px-1">
                  <div className="flex justify-between text-xs text-slate-600 font-semibold mb-1">
                    <span>Max Price:</span>
                    <span className="text-amber-700 font-bold">{formatNaira(priceMaxFilter)}</span>
                  </div>
                  <input
                    type="range"
                    min={5000}
                    max={5000000}
                    step={10000}
                    value={priceMaxFilter}
                    onChange={(e) => setPriceMaxFilter(Number(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                </div>

              </div>

              {/* CATALOG GRID OR SKELETON LOADER */}
              {isLoading ? (
                /* --- SKELETON LOADING STATE --- */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((sk) => (
                    <div key={sk} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-4 space-y-4 animate-pulse">
                      <div className="w-full h-52 bg-slate-200 rounded-xl"></div>
                      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                      <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                      <div className="h-10 bg-slate-200 rounded-xl w-full"></div>
                    </div>
                  ))}
                </div>
              ) : filteredCatalog.length === 0 ? (
                /* --- NO RESULTS STATE --- */
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
                    <Search className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">No Matching Items Found</h3>
                  <p className="text-sm text-slate-500 max-w-md mx-auto">
                    Try adjusting your search terms, selecting another category, or resetting your budget slider.
                  </p>
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setPriceMaxFilter(5000000); }}
                    className="bg-slate-900 text-white text-xs font-bold px-5 py-3 rounded-xl hover:bg-slate-800 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                /* --- PRODUCT CARDS GRID --- */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCatalog.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                    >
                      {/* Card Image Header */}
                      <div className="relative h-56 overflow-hidden bg-slate-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 flex flex-col gap-1">
                          <span className="bg-slate-900/90 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
                            {item.category.replace('_', ' & ')}
                          </span>
                          {item.badge && (
                            <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                              {item.badge}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => {
                            setSelectedProduct(item);
                            setSelectedProductImgIndex(0);
                          }}
                          className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-slate-900 px-3 py-1.5 rounded-xl text-xs font-bold shadow-md backdrop-blur-md flex items-center gap-1.5 transition-all"
                        >
                          <Eye className="w-4 h-4 text-amber-600" />
                          Quick View
                        </button>
                      </div>

                      {/* Card Content */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-xs text-amber-700 font-semibold">{item.estimatedTime}</span>
                            <div className="flex items-center text-xs font-bold text-slate-700">
                              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 mr-1" />
                              {item.rating} <span className="text-slate-400 font-normal ml-1">({item.reviews})</span>
                            </div>
                          </div>

                          <h3 className="font-bold text-slate-900 text-base leading-snug font-serif group-hover:text-amber-700 transition-colors">
                            {item.title}
                          </h3>

                          <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        {/* Pricing & CTA */}
                        <div className="pt-3 border-t border-slate-100 space-y-3">
                          <div className="flex items-baseline justify-between">
                            <div>
                              <p className="text-[10px] text-slate-400 uppercase font-bold">Price</p>
                              <p className="text-lg font-black text-slate-900 font-serif">
                                {formatNaira(item.price)}
                              </p>
                            </div>
                            <span className="text-[11px] text-slate-500 font-medium">{item.priceUnit}</span>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => addToQuote(item)}
                              className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                                quoteList.some(q => q.id === item.id)
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                              }`}
                            >
                              {quoteList.some(q => q.id === item.id) ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-amber-700" />
                                  Shortlisted
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3.5 h-3.5" />
                                  Add to Quote
                                </>
                              )}
                            </button>

                            <a
                              href={getWhatsAppLink(`Hello G Empire! I am interested in inquiring about: ${item.title} (${formatNaira(item.price)}).`)}
                              target="_blank"
                              rel="noreferrer"
                              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all shadow-sm"
                            >
                              <MessageSquare className="w-3.5 h-3.5 fill-current" />
                              Inquire
                            </a>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* ================= SECTION 2: COST ESTIMATOR & QUOTE TOOL ================= */}
          {activeTab === 'calculator' && (
            <div className="space-y-8 animate-fadeIn">
              
              <div className="max-w-3xl">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
                  Interactive Calculation Tool
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-serif mt-2">
                  Instant Cost Calculator & Quote Builder
                </h2>
                <p className="text-sm text-slate-600 mt-2">
                  Adjust wall screeding square meters (sqm), POP ceiling sizes, painting coverage, and luxury furniture items to get an instant cost calculation in Nigerian Naira (₦).
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Calculator Service Inputs */}
                <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                  <h3 className="text-lg font-bold text-slate-900 border-b pb-3 flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-amber-600" />
                    Configure Service Quantities
                  </h3>

                  <div className="space-y-5">
                    {ESTIMATOR_SERVICES.map((s) => {
                      const currentVal = calculatorInputs[s.id] || 0;
                      return (
                        <div key={s.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-300 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-bold text-slate-900 text-sm">{s.name}</h4>
                              <p className="text-xs text-slate-500">Rate: {formatNaira(s.pricePerUnit)} per {s.unit}</p>
                            </div>
                            <span className="font-extrabold text-slate-900 text-sm font-serif">
                              {formatNaira(currentVal * s.pricePerUnit)}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 pt-2">
                            <input
                              type="range"
                              min={0}
                              max={s.unit === 'sqm' ? 1000 : 10}
                              step={s.unit === 'sqm' ? 10 : 1}
                              value={currentVal}
                              onChange={(e) => setCalculatorInputs({
                                ...calculatorInputs,
                                [s.id]: Number(e.target.value)
                              })}
                              className="w-full accent-amber-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                            />
                            <div className="flex items-center gap-1 shrink-0">
                              <input
                                type="number"
                                min={0}
                                value={currentVal}
                                onChange={(e) => setCalculatorInputs({
                                  ...calculatorInputs,
                                  [s.id]: Math.max(0, Number(e.target.value))
                                })}
                                className="w-20 px-2 py-1 bg-white border border-slate-300 rounded-lg text-center font-bold text-sm"
                              />
                              <span className="text-xs text-slate-500 font-medium">{s.unit}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Estimate Summary Box */}
                <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 sticky top-28">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">Quote Summary</span>
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700">Official Estimate</span>
                    </div>
                    <h3 className="text-2xl font-bold font-serif text-white mt-1">Project Total</h3>
                  </div>

                  {/* Calculated breakdown */}
                  <div className="space-y-3 text-xs max-h-60 overflow-y-auto pr-2 scrollbar-thin">
                    <p className="font-bold text-slate-400 uppercase text-[10px]">Configured Services:</p>
                    {ESTIMATOR_SERVICES.filter(s => (calculatorInputs[s.id] || 0) > 0).map(s => (
                      <div key={s.id} className="flex justify-between items-center border-b border-slate-800 pb-2">
                        <span className="text-slate-300">{s.name} ({calculatorInputs[s.id]} {s.unit})</span>
                        <span className="font-bold text-amber-300">{formatNaira(calculatorInputs[s.id] * s.pricePerUnit)}</span>
                      </div>
                    ))}

                    {/* Shortlisted catalog items */}
                    {quoteList.length > 0 && (
                      <div className="pt-2">
                        <p className="font-bold text-slate-400 uppercase text-[10px] mb-2">Shortlisted Catalog Items ({quoteList.length}):</p>
                        {quoteList.map(item => (
                          <div key={item.id} className="flex justify-between items-center border-b border-slate-800 pb-2">
                            <div className="flex items-center gap-1.5 truncate max-w-[180px]">
                              <button onClick={() => removeFromQuote(item.id)} className="text-slate-500 hover:text-red-400">
                                <X className="w-3.5 h-3.5" />
                              </button>
                              <span className="text-slate-300 truncate">{item.title}</span>
                            </div>
                            <span className="font-bold text-amber-300">{formatNaira(item.price)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Grand Total */}
                  <div className="pt-4 border-t border-slate-800">
                    <span className="text-xs text-slate-400 block uppercase font-medium">Estimated Grand Total</span>
                    <p className="text-3xl font-black text-amber-400 font-serif mt-1">
                      {formatNaira(estimatedTotalCost + quoteList.reduce((acc, curr) => acc + curr.price, 0))}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      *Note: Final quote subject to physical site measurement and material finishes.
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3 pt-2">
                    <button
                      onClick={sendQuoteViaWhatsApp}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                      Send Quote to WhatsApp
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('contact');
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                      }}
                      className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded-xl text-sm transition-colors text-center"
                    >
                      Book Physical Site Inspection
                    </button>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ================= SECTION 3: PROJECT GALLERY / BEFORE & AFTER ================= */}
          {activeTab === 'projects' && (
            <div className="space-y-8 animate-fadeIn">
              
              <div className="max-w-3xl">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
                  Real Projects
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-serif mt-2">
                  Project Gallery & Showcase
                </h2>
                <p className="text-sm text-slate-600 mt-2">
                  See how G Empire converts raw concrete into world-class architectural living sanctuaries across Nigeria.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {PROJECTS_SHOWCASE.map((proj) => (
                  <div key={proj.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                    <h3 className="text-xl font-bold text-slate-900 font-serif">{proj.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="relative rounded-2xl overflow-hidden group">
                        <img src={proj.beforeImg} alt="Before Work" className="w-full h-48 object-cover grayscale" />
                        <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                          Before
                        </span>
                      </div>

                      <div className="relative rounded-2xl overflow-hidden group">
                        <img src={proj.afterImg} alt="After G Empire Work" className="w-full h-48 object-cover" />
                        <span className="absolute top-2 left-2 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                          After (G Empire)
                        </span>
                      </div>
                    </div>

                    <a
                      href={getWhatsAppLink(`Hello G Empire, I loved your project "${proj.title}". I want a similar design for my house.`)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 pt-2"
                    >
                      Request Similar Project Design
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ================= SECTION 4: ABOUT G EMPIRE ================= */}
          {activeTab === 'about' && (
            <div className="space-y-10 animate-fadeIn">
              
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
                    About G Empire
                  </span>
                  <h2 className="text-3xl font-extrabold text-slate-900 font-serif leading-tight">
                    Uncompromising Quality in Interior & Architectural Finishes
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    G Empire is a full-service interior/exterior finish contractor and custom luxury furniture maker operating across Nigeria. Founded on the core principles of structural precision, aesthetic perfection, and lasting client trust, we specialize in:
                  </p>

                  <ul className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                      Double-coat acrylic wall screeding & dustless skim coating.
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                      3D suspended POP plaster ceiling engineering with recessed LEDs.
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                      Italian Stucco marble wall paint & weather-proof exterior finishes.
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                      Bespoke luxury leather sofas, dining tables & TV consoles.
                    </li>
                  </ul>

                  <div className="pt-4 flex items-center gap-4">
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm transition-all"
                    >
                      Speak with Director
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6">
                    <h3 className="text-lg font-bold font-serif text-amber-400">Why Nigerian Property Owners Choose Us</h3>
                    
                    <div className="space-y-4">
                      <div className="border-b border-slate-800 pb-3">
                        <p className="font-bold text-sm text-white">Direct Factory Prices</p>
                        <p className="text-xs text-slate-400 mt-1">We source raw materials directly to ensure competitive Nigerian Naira rates.</p>
                      </div>

                      <div className="border-b border-slate-800 pb-3">
                        <p className="font-bold text-sm text-white">Strict Timelines</p>
                        <p className="text-xs text-slate-400 mt-1">Prompt delivery without ever compromising on screeding or POP quality.</p>
                      </div>

                      <div>
                        <p className="font-bold text-sm text-white">Open Mon - Sun</p>
                        <p className="text-xs text-slate-400 mt-1">Our site inspectors are available any day of the week (8am - 8pm).</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ================= SECTION 5: CONTACT & ORDER FORM ================= */}
          {activeTab === 'contact' && (
            <div className="space-y-8 animate-fadeIn">
              
              <div className="max-w-3xl">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
                  Get In Touch
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-serif mt-2">
                  Contact G Empire Today
                </h2>
                <p className="text-sm text-slate-600 mt-2">
                  Have a project inquiry or site inspection request? Send us a message or chat with us on WhatsApp!
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Form sending to gideonmoses2@gmail.com */}
                <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900 font-serif mb-2">Send Direct Inquiry</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Chief Adeleke"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number (WhatsApp)</label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 08108457702"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="yourname@gmail.com"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Service Interested In</label>
                      <select
                        value={contactForm.service}
                        onChange={(e) => setContactForm({ ...contactForm, service: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                      >
                        <option value="All Services (Full Turnkey)">All Services (Full Interior Finish)</option>
                        <option value="Furniture Services">Luxury Furniture Order</option>
                        <option value="Screeding & POP">Wall Screeding & 3D POP Ceiling</option>
                        <option value="Painting">Italian Stucco & Painting</option>
                        <option value="Exterior Architecture">Exterior Architectural Finish</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Project Details / Message</label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Tell us about your property location, room dimensions, or furniture choices..."
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4 text-amber-400" />
                      Send Message to gideonmoses2@gmail.com
                    </button>
                  </form>
                </div>

                {/* Company Info Box */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-amber-50/80 rounded-3xl p-6 sm:p-8 border border-amber-200 space-y-5">
                    <h3 className="text-lg font-bold text-amber-900 font-serif">Contact Information</h3>

                    <div className="space-y-4 text-xs sm:text-sm text-slate-800">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                          <Phone className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">Phone & WhatsApp</p>
                          <p className="text-slate-600 mt-0.5">{COMPANY_DETAILS.phone}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">Direct Email</p>
                          <p className="text-slate-600 mt-0.5">{COMPANY_DETAILS.email}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">Operating Hours</p>
                          <p className="text-slate-600 mt-0.5">{COMPANY_DETAILS.hours}</p>
                        </div>
                      </div>
                    </div>

                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all mt-4"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                      Instant WhatsApp Chat
                    </a>
                  </div>
                </div>

              </div>

            </div>
          )}

        </main>
      </div>

      {/* ================= QUICK VIEW PRODUCT MODAL ================= */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative max-h-[90vh] flex flex-col">
            
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 bg-slate-900/70 hover:bg-slate-900 text-white p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
              
              {/* Product Gallery Tabs */}
              <div className="space-y-3">
                <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img
                    src={selectedProduct.gallery ? selectedProduct.gallery[selectedProductImgIndex] : selectedProduct.image}
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                </div>

                {selectedProduct.gallery && selectedProduct.gallery.length > 1 && (
                  <div className="flex gap-2">
                    {selectedProduct.gallery.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedProductImgIndex(idx)}
                        className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedProductImgIndex === idx ? 'border-amber-600 scale-105' : 'border-transparent opacity-70'
                        }`}
                      >
                        <img src={imgUrl} alt="thumbnail" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {selectedProduct.category.replace('_', ' & ')}
                </span>

                <h3 className="text-2xl font-bold font-serif text-slate-900 mt-2">
                  {selectedProduct.title}
                </h3>

                <p className="text-2xl font-black text-amber-700 font-serif mt-2">
                  {formatNaira(selectedProduct.price)} <span className="text-xs font-normal text-slate-500">({selectedProduct.priceUnit})</span>
                </p>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Specifications */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
                <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">Specifications:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProduct.specs.map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    addToQuote(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add to Quote Shortlist
                </button>

                <a
                  href={getWhatsAppLink(`Hello G Empire! I am viewing ${selectedProduct.title} (${formatNaira(selectedProduct.price)}). Can I place an order?`)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  Order on WhatsApp
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ================= CLIENT REVIEWS MODAL ================= */}
      {reviewsModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative max-h-[85vh] flex flex-col p-6 sm:p-8">
            
            <button
              onClick={() => setReviewsModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div>
                <h3 className="text-xl font-bold font-serif text-slate-900">Client Reviews</h3>
                <p className="text-xs text-slate-500">Verified feedback from property owners across Nigeria</p>
              </div>

              <button
                onClick={() => {
                  setReviewsModalOpen(false);
                  setLeaveReviewModalOpen(true);
                }}
                className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors"
              >
                Write Review
              </button>
            </div>

            <div className="overflow-y-auto space-y-4 pr-1 scrollbar-thin">
              {reviewsList.map((rev) => (
                <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{rev.name}</h4>
                      <p className="text-[11px] text-slate-400">{rev.location} • {rev.date}</p>
                    </div>

                    <div className="flex text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* ================= LEAVE A REVIEW MODAL ================= */}
      {leaveReviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 relative p-6 sm:p-8">
            
            <button
              onClick={() => setLeaveReviewModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-slate-100 text-slate-700 p-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold font-serif text-slate-900 mb-4">Leave a Review</h3>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chief Adeleke"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  placeholder="e.g. Lekki Phase 1, Lagos"
                  value={newReview.location}
                  onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Star Rating</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                >
                  <option value={5}>5 Stars - Excellent</option>
                  <option value={4}>4 Stars - Very Good</option>
                  <option value={3}>3 Stars - Good</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Review</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell us about your experience with G Empire screeding, POP or furniture..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl text-xs"
              >
                Submit Review
              </button>
            </form>

          </div>
        </div>
      )}

      {/* --- FLOATING WHATSAPP WIDGET --- */}
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 group transition-all transform hover:scale-105"
        title="Instant WhatsApp Support (Mon-Sun)"
      >
        <div className="relative">
          <MessageSquare className="w-6 h-6 fill-current" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full animate-ping"></span>
        </div>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-xs font-extrabold pr-2">
          Chat with G Empire
        </span>
      </a>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-20 py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black text-base">
                GE
              </div>
              <span className="font-bold text-xl text-white font-serif tracking-tight">G EMPIRE</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              World-class interior & exterior design contractor. Mirror wall screeding, 3D POP ceilings, decorative stucco, and handcrafted luxury furniture.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setActiveTab('catalog')} className="hover:text-amber-400 transition-colors">Catalog & Services</button></li>
              <li><button onClick={() => setActiveTab('calculator')} className="hover:text-amber-400 transition-colors">Cost Estimator</button></li>
              <li><button onClick={() => setActiveTab('projects')} className="hover:text-amber-400 transition-colors">Project Gallery</button></li>
              <li><button onClick={() => setReviewsModalOpen(true)} className="hover:text-amber-400 transition-colors">Client Reviews</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Core Expertise</h4>
            <ul className="space-y-2 text-xs">
              <li>Acrylic Wall Screeding</li>
              <li>3D Suspended POP Ceilings</li>
              <li>Italian Venetian Stucco</li>
              <li>Custom Executive Furniture</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Direct Contact</h4>
            <div className="space-y-2 text-xs">
              <p>Phone / WhatsApp: <a href={`tel:${COMPANY_DETAILS.phone}`} className="text-amber-400 font-bold">{COMPANY_DETAILS.phone}</a></p>
              <p>Email: <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-amber-400 font-bold">{COMPANY_DETAILS.email}</a></p>
              <p>Hours: {COMPANY_DETAILS.hours}</p>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} G Empire Interiors. All Rights Reserved. Delivered with World-Class Nigerian Standards.
        </div>
      </footer>

    </div>
  );
}