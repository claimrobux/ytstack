import React, { useState, useEffect } from 'react';
import { Youtube, Rocket, Clock, DollarSign, ShieldCheck, Zap, Lock, Shield, Cloud, Headphones as HeadphonesIcon, CheckCircle2, XCircle, ChevronDown, CreditCard, Mail, Clock3, Wallet, AlertCircle, Star, Quote, PlaySquare, ArrowRight, CreditCard as CardIcon, Bitcoin, Palette as Paypal, Copy, X } from 'lucide-react';
import { saveEmailSignup } from './utils/supabase';
import PrivacyPolicy from './components/PrivacyPolicy';
import RefundPolicy from './components/RefundPolicy';
import TermsOfService from './components/TermsOfService';
import PurchaseNotification from './components/PurchaseNotification';

type PlanType = '30day' | 'instant';

type FAQItem = {
  id: number;
  question: string;
  answer: string;
  icon: React.ReactNode;
};

type Review = {
  id: number;
  name: string;
  date: string;
  rating: number;
  comment: string;
  avatar: string;
};

type Purchase = {
  id: number;
  name: string;
  timeAgo: string;
};

function App() {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('instant');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showRefundPolicy, setShowRefundPolicy] = useState(false);
  const [showTermsOfService, setShowTermsOfService] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [stockMessage, setStockMessage] = useState('Only 2 channels left in stock!');
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });
  const [agreedToTos, setAgreedToTos] = useState(false);
  const [tosError, setTosError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPurchase, setCurrentPurchase] = useState<Purchase | null>(null);
  
  const analyticsImages = [
    'https://i.imgur.com/sctbNPZ.png',
    'https://i.imgur.com/OUVbaCn.png',
    'https://i.imgur.com/KgB8xab.png',
    'https://i.imgur.com/4LNycx7.png'
  ];

  const recentPurchases: Purchase[] = [
    { id: 1, name: "Alex M.", timeAgo: "2 minutes ago" },
    { id: 2, name: "Sarah K.", timeAgo: "2 minutes ago" },
    { id: 3, name: "John D.", timeAgo: "3 minutes ago" },
    { id: 4, name: "Emma R.", timeAgo: "2 minutes ago" },
    { id: 5, name: "Michael S.", timeAgo: "3 minutes ago" }
  ];

  useEffect(() => {
    let currentIndex = 0;
    const showNextPurchase = () => {
      setCurrentPurchase(recentPurchases[currentIndex]);
      currentIndex = (currentIndex + 1) % recentPurchases.length;
    };

    // Show first purchase immediately
    showNextPurchase();

    // Show new purchase every 15-20 seconds
    const interval = setInterval(() => {
      showNextPurchase();
    }, Math.random() * 5000 + 15000); // Random interval between 15-20 seconds

    return () => clearInterval(interval);
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowContactPopup(true);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('support@ytstack.net');
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleClosePopup = () => {
    setShowContactPopup(false);
  };

  const validateForm = () => {
    let isValid = true;
    setEmailError('');
    setTosError('');
    
    if (!email) {
      setEmailError('Please enter your email');
      isValid = false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    if (!agreedToTos) {
      setTosError('Please agree to the Terms of Service');
      isValid = false;
    }

    return isValid;
  };

  const handleBuyNowClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const result = await saveEmailSignup(email, agreedToTos, selectedPlan);
      
      if (result.success) {
        if (result.duplicate) {
          setSubmitMessage('Email already registered. Redirecting to checkout...');
        } else {
          setSubmitMessage('Email saved! Redirecting to checkout...');
        }
        
        // Redirect to Stripe after a short delay
        setTimeout(() => {
          const stripeUrl = selectedPlan === 'instant' 
            ? 'https://buy.stripe.com/4gw022gIC2zAbny001'
            : 'https://buy.stripe.com/4gwdSSakecaa1MY28a';
          window.location.href = stripeUrl;
        }, 1500);
      } else {
        setSubmitMessage(`Error: ${result.message}`);
        setIsSubmitting(false);
      }
    } catch (error) {
      setSubmitMessage('Failed to save email. Please try again.');
      setIsSubmitting(false);
    }
  };

  const reviews: Review[] = [
    {
      id: 1,
      name: "xGaming_Pro",
      date: "3 days ago",
      rating: 5,
      comment: "yo this is actually legit!! got my channel in like 8hrs and already made $43 from my old fortnite vids lol. gonna start uploading minecraft content soon",
      avatar: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%234f46e5' width='100' height='100'/><text fill='white' x='50' y='50' font-family='Arial' font-size='40' text-anchor='middle' dy='.3em'>X</text></svg>"
    },
    {
      id: 2,
      name: "TechieGal",
      date: "1 week ago",
      rating: 4,
      comment: "transfer took about 15hrs which was longer than expected but support helped me thru discord. everything working good now tho and already got my first payment 💪",
      avatar: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%23ec4899' width='100' height='100'/><text fill='white' x='50' y='50' font-family='Arial' font-size='40' text-anchor='middle' dy='.3em'>T</text></svg>"
    },
    {
      id: 3,
      name: "cryptobro_123",
      date: "2 weeks ago",
      rating: 5,
      comment: "been looking for somethin like this for ages!! finally found a legit seller. bought 2 channels already n probably gonna get another 1 next month when i get paid",
      avatar: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%2306b6d4' width='100' height='100'/><text fill='white' x='50' y='50' font-family='Arial' font-size='40' text-anchor='middle' dy='.3em'>C</text></svg>"
    }
  ];

  const comparisonData = [
    {
      feature: "Monetization Ready",
      premonetized: "Instant Access",
      fresh: "1K subs & 4K hours needed"
    },
    {
      feature: "Time to Earn",
      premonetized: "Start Immediately",
      fresh: "3-6 months average"
    },
    {
      feature: "Revenue Streams",
      premonetized: "All Features Unlocked",
      fresh: "Basic Features Only"
    },
    {
      feature: "Algorithm Boost",
      premonetized: "Established Channel",
      fresh: "New Channel"
    }
  ];

  const faqData: FAQItem[] = [
    {
      id: 1,
      icon: <Youtube className="w-5 h-5 text-red-500" />,
      question: "What is a pre-monetized YouTube channel?",
      answer: "A pre-monetized channel is a YouTube account that already meets the requirements for monetization (1,000+ subscribers & 4,000+ watch hours or 10,000,000+ shorts views). You can start earning from day one."
    },
    {
      id: 2,
      icon: <Mail className="w-5 h-5 text-blue-500" />,
      question: "Can I change the email on the channel?",
      answer: "Yes! You'll be asked to provide your Gmail during checkout. Ownership is securely transferred to that Gmail via Brand Account management."
    },
    {
      id: 3,
      icon: <Clock3 className="w-5 h-5 text-green-500" />,
      question: "How long does the transfer take?",
      answer: "Transfers are usually completed within 1–12 hours, but we guarantee delivery within 24 hours."
    },
    {
      id: 4,
      icon: <ShieldCheck className="w-5 h-5 text-purple-500" />,
      question: "Is this safe and within YouTube's terms?",
      answer: "Yes. Ownership is transferred properly through Brand Account access. You're not violating YouTube's terms as long as you follow standard monetization policies after transfer."
    },
    {
      id: 5,
      icon: <Wallet className="w-5 h-5 text-orange-500" />,
      question: "What payment methods do you accept?",
      answer: "We accept credit/debit cards, crypto (on request), and other custom methods depending on your region."
    },
    {
      id: 6,
      icon: <AlertCircle className="w-5 h-5 text-yellow-500" />,
      question: "What happens if I don't provide the correct Gmail?",
      answer: "Please double-check your Gmail before submitting. If you enter the wrong one, contact us immediately so we can fix it before transfer."
    },
    {
      id: 7,
      icon: <PlaySquare className="w-5 h-5 text-pink-500" />,
      question: "Do YouTube Shorts actually make money?",
      answer: "Absolutely — but only if your channel is monetized. YouTube requires 10 million Shorts views in 90 days just to unlock monetization on a new account. That means if one of your videos goes viral before you're approved, you could miss out on $2,000–$2,500 in ad revenue. With a pre-monetized channel, you earn on every view from the start."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const slideshow = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % analyticsImages.length);
    }, 5000);

    return () => clearInterval(slideshow);
  }, []);

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const bannerItem = (icon: React.ReactNode, text: string) => (
    <span className="inline-flex items-center text-white px-6">
      {icon}
      <span className="ml-2">{text}</span>
    </span>
  );

  return (
    <div className="min-h-screen bg-gray-50 page-load-animation">
      {/* Purchase Notifications */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {currentPurchase && (
          <PurchaseNotification
            name={currentPurchase.name}
            timeAgo={currentPurchase.timeAgo}
            onClose={() => setCurrentPurchase(null)}
          />
        )}
      </div>

      {showContactPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full m-4 relative animate-fade-in">
            <button 
              onClick={handleClosePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-xl font-semibold mb-4">Contact Support</h3>
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg mb-4">
              <span className="text-gray-700">support@ytstack.net</span>
              <button
                onClick={handleCopyEmail}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Copy className="h-4 w-4" />
                <span>{copySuccess ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-gray-600 text-sm">
              Our support team typically responds within 24 hours.
            </p>
          </div>
        </div>
      )}

      {showPrivacyPolicy && (
        <PrivacyPolicy onClose={() => setShowPrivacyPolicy(false)} />
      )}

      {showRefundPolicy && (
        <RefundPolicy onClose={() => setShowRefundPolicy(false)} />
      )}

      {showTermsOfService && (
        <TermsOfService onClose={() => setShowTermsOfService(false)} />
      )}
      
      {/* Top Banner */}
      <div className="bg-gray-900 py-2 banner-container">
        <div className="scroll-banner">
          {[1, 2, 3].map((_, i) => (
            <React.Fragment key={i}>
              {bannerItem(<CheckCircle2 className="w-4 h-4 text-green-400" />, "OVER 20,300+ ORDERS DELIVERED")}
              {bannerItem(<AlertCircle className="w-4 h-4 text-red-400" />, "LIMITED OFFER ENDING SOON")}
              {bannerItem(<Star className="w-4 h-4 text-yellow-400" />, "TRUSTED BY THOUSANDS OF CREATORS")}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <img src="https://i.imgur.com/YGmguQv.png" alt="YTStack Logo" className="h-6" />
            </div>
            <nav className="hidden md:flex flex-1 justify-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 font-medium">How It Works</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium">Pricing</a>
              <a href="#faq" className="text-gray-600 hover:text-gray-900 font-medium">FAQ</a>
            </nav>
            <div className="flex-1 flex justify-end items-center space-x-4">
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSckBgZnPO-BaIgLW72BZKviCd3P4BQBxF5-TGzBzMb8pbcOUA/viewform?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:text-blue-700 font-medium hidden md:block"
              >
                Become an Affiliate
              </a>
              <a href="#" onClick={handleContactClick} className="text-gray-600 hover:text-gray-900 font-medium hidden md:block">
                Support
              </a>
              <a 
                href="#features"
                className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Sale Banner */}
      <div className="bg-red-600 text-white py-2 text-center">
        <p className="text-sm md:text-base font-medium">
          🚨 LAUNCH SALE: 50% OFF! Limited Offer Ends in {timeLeft.hours}:{timeLeft.minutes.toString().padStart(2, '0')}:{timeLeft.seconds.toString().padStart(2, '0')}
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Features Section */}
        <section id="features" className="scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left Column */}
            <div className="flex flex-col space-y-6">
              <h2 className="text-3xl font-bold">Pre-Monetized YouTube Account</h2>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setSelectedPlan('30day');
                    setStockMessage('Only 1 channel left in stock!');
                  }}
                  className={`flex-1 py-3 px-4 rounded-lg text-center transition-colors relative ${
                    selectedPlan === '30day'
                      ? 'bg-gray-100 border-2 border-red-600'
                      : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Save $450
                  </div>
                  <Clock className="h-5 w-5 mx-auto mb-1 text-gray-600" />
                  <div className="font-semibold text-sm">30 Day AdSense Change</div>
                  <div className="text-sm text-gray-500 line-through">$900.00</div>
                  <div className="text-xl font-bold text-red-600">$449.99</div>
                </button>
                
                <button
                  onClick={() => {
                    setSelectedPlan('instant');
                    setStockMessage('Only 2 channels left in stock!');
                  }}
                  className={`flex-1 py-3 px-4 rounded-lg text-center transition-colors relative ${
                    selectedPlan === 'instant'
                      ? 'bg-gray-100 border-2 border-red-600'
                      : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Save $480
                  </div>
                  <Rocket className="h-5 w-5 mx-auto mb-1 text-gray-600" />
                  <div className="font-semibold text-sm">Instant AdSense Change</div>
                  <div className="text-sm text-gray-500 line-through">$960.00</div>
                  <div className="text-xl font-bold text-red-600">$479.99</div>
                </button>
              </div>

              {/* Stock Indicator */}
              <div className="bg-red-50 border border-red-200 rounded-lg py-2 px-4 flex items-center justify-center">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <p className="text-red-700 font-medium text-sm">{stockMessage}</p>
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Your Gmail Address (for channel transfer) - Use this same email during checkout
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your Gmail address"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                {emailError && (
                  <p className="text-red-600 text-sm">{emailError}</p>
                )}
              </div>

              {/* Terms of Service Checkbox */}
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="tos"
                    checked={agreedToTos}
                    onChange={(e) => {
                      setAgreedToTos(e.target.checked);
                      setTosError('');
                    }}
                    className="mt-1"
                  />
                  <label htmlFor="tos" className="text-sm text-gray-600">
                    I agree to the{' '}
                    <button
                      type="button"
                      onClick={() => setShowTermsOfService(true)}
                      className="text-blue-600 hover:text-blue-700 underline"
                    >
                      Terms of Service
                    </button>
                  </label>
                </div>
                {tosError && (
                  <p className="text-red-600 text-sm">{tosError}</p>
                )}
              </div>

              <a 
                href="#"
                onClick={handleBuyNowClick}
                className={`block w-full py-4 rounded-lg text-lg font-semibold transition-colors text-center ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-red-600 hover:bg-red-700 shake-animation'
                } text-white`}
              >
                {isSubmitting ? 'Processing...' : 'Buy Now'}
              </a>

              {submitMessage && (
                <div className={`text-center text-sm p-2 rounded ${
                  submitMessage.includes('Error') || submitMessage.includes('Failed')
                    ? 'text-red-600 bg-red-50' 
                    : 'text-green-600 bg-green-50'
                }`}>
                  {submitMessage}
                </div>
              )}

              <div className="bg-white p-6 rounded-lg shadow-sm flex-grow">
                <h3 className="font-semibold text-lg mb-4">What's Included:</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                    <DollarSign className="h-5 w-5 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Revenue-Ready from Day One</h4>
                      <p className="text-gray-600 text-sm">No wait time, start earning as soon as you upload!</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Rocket className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">Shorts-Friendly Earnings</h4>
                      <p className="text-gray-600 text-sm">Optimized for Shorts, bypassing the 10M view requirement!</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                    <Zap className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {selectedPlan === 'instant' 
                          ? "Your Own AdSense Access"
                          : "AdSense Access in 30 Days"}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {selectedPlan === 'instant' 
                          ? "Link your AdSense account instantly without the 32 day wait!"
                          : "Start earning immediately, and link your AdSense in 30 days!"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex items-start justify-center sticky top-24">
              <div className="relative w-[400px]">
                {/* iPhone 15 Frame */}
                <div className="relative w-full pb-[200%] bg-black rounded-[3rem] shadow-2xl overflow-hidden">
                  {/* Screen Content */}
                  <div className="absolute inset-[3%] rounded-[2.5rem] overflow-hidden bg-black">
                    {/* Dynamic Island */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[25%] h-[3%] bg-black rounded-b-2xl z-10"></div>
                    {/* Slideshow */}
                    <div className="w-full h-full">
                      {analyticsImages.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`Analytics Screenshot ${index + 1}`}
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                            currentImageIndex === index ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="mt-20 scroll-mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">1. Provide Your Gmail</h3>
              <p className="text-gray-600">Enter the Gmail address where you want the channel transferred.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">2. Complete Payment</h3>
              <p className="text-gray-600">Choose your preferred payment method and complete the purchase.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Youtube className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">3. Get Your Channel</h3>
              <p className="text-gray-600">Receive your monetized channel within 24 hours and start earning.</p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="mt-20 scroll-mt-20">
          {/* Comparison Chart */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">Pre-Monetized vs Fresh Channel</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-lg font-medium text-gray-600">Feature</div>
              <div className="text-lg font-medium text-green-600">Pre-Monetized</div>
              <div className="text-lg font-medium text-red-600">Fresh Channel</div>
            </div>
            <div className="space-y-6">
              {comparisonData.map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4 border-t border-gray-200">
                  <div className="font-medium text-gray-700">{item.feature}</div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-green-600">{item.premonetized}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <span className="text-red-600">{item.fresh}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="mt-20 scroll-mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-900">{review.name}</h4>
                    <p className="text-sm text-gray-500">{review.date}
                    </p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="relative">
                  <Quote className="w-8 h-8 text-gray-200 absolute -top-4 -left-2 -z-10" />
                  <p className="text-gray-600 relative z-10">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mt-20 scroll-mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqData.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    {faq.icon}
                    <span className="font-medium text-gray-900">{faq.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      expandedFAQ === faq.id ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`px-6 overflow-hidden transition-all duration-200 ease-in-out ${
                    expandedFAQ === faq.id ? 'max-h-40 py-4' : 'max-h-0'
                  }`}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Support Section */}
        <section id="support" className="mt-20 scroll-mt-20">
          
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <h2 className="text-3xl font-bold mb-6">Need Help?</h2>
            <p className="text-gray-600 mb-8">Our support team is available 24/7 to assist you with any questions.</p>
            <div className="flex justify-center">
              <a href="#" onClick={handleContactClick} className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <Mail className="h-5 w-5" />
                <span>Email Support</span>
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="col-span-1 md:col-span-2">
              <img src="https://i.imgur.com/dv7Tz4k.png" alt="YTStack Logo" className="h-8 mb-4" />
              <p className="text-gray-400 text-sm">
                Your trusted source for pre-monetized YouTube channels. Start earning from day one with our verified channels.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="#features" className="block text-gray-400 hover:text-white transition-colors">Features</a>
                <a href="#how-it-works" className="block text-gray-400 hover:text-white transition-colors">How It Works</a>
                <a href="#pricing" className="block text-gray-400 hover:text-white transition-colors">Pricing</a>
                <a href="#faq" className="block text-gray-400 hover:text-white transition-colors">FAQ</a>
              </div>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <div className="space-y-2">
                <button onClick={() => setShowPrivacyPolicy(true)} className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</button>
                <button onClick={() => setShowRefundPolicy(true)} className="block text-gray-400 hover:text-white transition-colors">Refund Policy</button>
                <button onClick={() => setShowTermsOfService(true)} className="block text-gray-400 hover:text-white transition-colors">Terms of Service</button>
                <a href="#" onClick={handleContactClick} className="block text-gray-400 hover:text-white transition-colors">Contact Us</a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            © 2025 YTStack. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;