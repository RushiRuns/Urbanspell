import React, { useState, useEffect } from "react";
import InfiniteCarousel from "./components/InfiniteCarousel";
import {
  X,
  CheckCircle,
  Clock,
  Users,
  Target,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Download,
  Phone,
  Mail,
  Check,
  ArrowRight,
  Calendar,
  MessageSquare,
  Shield,
  Zap,
} from "lucide-react";

const App = () => {

  const [showApplyModal, setShowApplyModal] = useState(false);

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);


  // Scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-up");
        }
      });
    }, observerOptions);

    const animateElements = document.querySelectorAll(".animate-on-scroll");
    animateElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Testimonial slider functionality
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // Keyboard navigation for testimonials
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  // Screenshot slideshow data
  const screenshots = [
    {
      src: "/downloads/Screenshot-1.jpg",
      alt: "Client testimonial screenshot 1",
    },
    {
      src: "/downloads/Screenshot-2.jpg",
      alt: "Client testimonial screenshot 2",
    },
    {
      src: "/downloads/Screenshot-3.jpg",
      alt: "Client testimonial screenshot 3",
    },
    {
      src: "/downloads/Screenshot-4.jpg",
      alt: "Client testimonial screenshot 4",
    },
  ];

  // Auto-play carousel for screenshots
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentScreenshotIndex((prev) => (prev + 1) % screenshots.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPlaying, screenshots.length]);

  // Intersection observer for autoplay control
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target.id === "screenshot-carousel") {
          setIsPlaying(entry.isIntersecting);
        }
      });
    }, observerOptions);

    const carouselElement = document.getElementById("screenshot-carousel");
    if (carouselElement) {
      observer.observe(carouselElement);
    }

    return () => observer.disconnect();
  }, []);



  const testimonials = [
    {
      name: "Bansari Ranpura",
      role: "Client",
      linkedin: "https://linkedin.com/in/bansari-ranpura",
      text: "Before Krishna, our efforts were scattered. She sat with us, simplified the plan, and gave us a cadence the team could follow without burnout. The biggest change was clarity and confidence—everyone knew what to do next. It felt like having a coach who actually cares and gets results.",
      rating: 5,
      avatar: "./public/downloads/profile.jpeg",
    },
    {
      name: "Kalpesh Desai",
      role: "Founder",
      linkedin: "https://linkedin.com/in/kalpesh-desai",
      text: "Clear thinking, clean execution. Krishna helped us tighten our positioning, align sales & marketing, and set up ABM outreach with proper follow-ups. Her process is structured yet flexible for our team's reality. We'd happily recommend her coaching & consultation to any B2B company that wants results without drama.",
      rating: 5,
      avatar: "./public/downloads/profile.jpeg",
    },
    {
      name: "Mishit Vora",
      role: "Founder",
      linkedin: "https://linkedin.com/in/mishit-vora",
      text: "I reached out to Krishna for help with direction and growth. She quickly diagnosed the gaps and gave me a simple, prioritized roadmap—offers, messaging, outreach, and follow-ups. What I liked most was the clarity + accountability: I knew exactly what to do this week and what to measure. The guidance was practical and easy to execute. I'd recommend Krishna's coaching and consultation to any founder who wants momentum without the noise.",
      rating: 5,
      avatar: "./public/downloads/profile.jpeg",
    },
    {
      name: "Albin Joseph",
      role: "Marketing Manager",
      linkedin: "https://linkedin.com/in/albin-joseph",
      text: "Working with Krishna was genuinely refreshing. She brought smart, creative outreach methods and paired them with structured, practical execution. When a roadblock showed up, she found innovative, no-drama solutions and kept momentum high. Overall, a great experience — highly recommended.",
      rating: 5,
      avatar: "./public/downloads/profile.jpeg",
    },
  ];

  const faqData = [
    {
      question: "How much time will this take each week?",
      answer:
        "Approximately 3–4 hours per week in most cases (1 hour live + ~2–3 hours of focused tasks). We structure tasks to be bite-sized and high-impact so you can keep client work running simultaneously.",
    },
    {
      question: "What language and timezones do you cover?",
      answer:
        "Delivery is in English. Primary live slots are IST; we also run 2 global windows suitable for GMT/EST participants.",
    },
    {
      question: "What tools will I need and are there extra costs?",
      answer:
        "Mostly free/cheap tools: Gmail, LinkedIn, Notion, Canva, Google Sheets. If you use a paid cold-email sender, that cost is separate.",
    },
    {
      question: "Is there a refund?",
      answer:
        "We don't offer refunds — we offer an action-based guarantee. If you meet the scorecard but still don't hit activity targets, we provide extra 1:1 calls or a free rollover.",
    },
    {
      question: "What support do I get after the program?",
      answer:
        "30-day chat support + optional alumni calls. Community access remains for 365 days.",
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      tag: "Cohort",
      priceINR: "₹24,999",
      priceUSD: "$399",
      installmentINR: "₹8,333 x 3",
      installmentUSD: "$133 x 3",
      liveCalls: "8 (group)",
      asyncReviews: "8",
      features: [
        "Target pace: 3–5 meetings/week",
        "LinkedIn Profile OS 2.0 + Offer",
        "Messaging & Hooks",
        "List & Personal Notes",
        "Two-Lane Cadence (light)",
        "AOHL v1",
        "Pilot + RMO: Signal Trap",
        "Warm-Seat Sequence",
        "Scale + ICP Drift Radar",
      ],
    },
    {
      name: "Pro Plus",
      tag: "1:1",
      priceINR: "₹49,999",
      priceUSD: "$899–$1,200",
      installmentINR: "₹16,666 x 3",
      installmentUSD: "$300–$400 x 3",
      liveCalls: "8 (1:1)",
      asyncReviews: "16",
      popular: true,
      features: [
        "Target pace: 5–7 meetings/week",
        "LinkedIn OS 2.0 (reviewed) + Offer",
        "Messaging + AI Outreach Agent",
        "Data with QC + AI Research Agent",
        "Two-Lane Cadence (full)",
        "AOHL v2 + Lead Magnet & Landing",
        "RMO: Micro-Audit Bait + Silent Calendar",
        "Warm-Seat (plus primer Loom-Lite)",
        "Scale + ICP Drift Radar",
      ],
    },
    {
      name: "Team",
      tag: "3 seats",
      priceINR: "₹84,999",
      priceUSD: "$400–$700",
      installmentINR: "+₹12k–₹20k x 2",
      installmentUSD: "+$200–$350 x 2",
      liveCalls: "—",
      asyncReviews: "—",
      features: [
        "Target pace: 4–7 meetings/week per person",
        "Pod Profile OS + Offer roles",
        "Messaging guild + hooks",
        "Shared Data Factory + AI Research",
        "Two-Lane Pod Cadence",
        "AOHL v3 + Magnet + Landing",
        "RMO: Shortlist Flip + Silent Calendar",
        "Warm-Seat + Objection Clinics",
        "Scale rituals + ICP Drift Radar",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:py-5">
            <div className="text-2xl font-bold text-gray-900">Urbanspell</div>
            <a
              href="mailto:urbanspell20@gmail.com"
              className="bg-gradient-to-r from-primary to-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center w-full">
            {/* Left Column - Text Content */}
            <div className="space-y-6 md:pl-8 lg:pl-12">
              <span className="text-[#2967eb] font-bold text-2xl">
                {" "}
                URBANSPELL ABM ACADEMY
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Learn the Skills in 2026 That Put ₹10L+ Monthly in Your Pocket.
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Top agencies using these skills are scaling revenue faster than
                ads or cold outreach ever did.
              </p>
              <div className="space-y-4">
                <a
                  href="#Pricing"
                  className="bg-gradient-to-r from-primary to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2"
                >
                  Apply now
                  <ArrowRight className="w-5 h-5" />
                </a>

                <div className="text-sm text-gray-500 space-y-1">
                  <p>
                    Limited cohort seats • Next cohort: Sep-A • Action-based
                    guarantee included
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="order-first md:order-last">
              <div className="relative">
                <img
                  src="/downloads/krishna.jpeg"
                  alt="Business woman"
                  className="w-full max-w-md mx-auto h-[clamp(520px,72vh,840px)] object-contain object-top rounded-2xl shadow-2xl md:max-w-lg"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Success Stories Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Client Success Stories
            </h2>
            <p className="text-lg text-secondary">
              See how we've helped businesses grow
            </p>
          </div>
          <InfiniteCarousel screenshots={screenshots} />
        </div>
      </section>

      {/* Stats Card Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose UrbanSpell?
            </h2>
            <p className="text-gray-600">Our track record speak for itself</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl shadow-md text-center bg-blue-50">
              <div className="text-4xl font-bold text-gray-900 mb-2">10 M+</div>
              <p className="text-gray-600">Client Revenue Generated</p>
            </div>
            <div className="p-6 rounded-xl shadow-md text-center bg-green-50">
              <div className="text-4xl font-bold text-gray-900 mb-2">400+</div>
              <p className="text-gray-600">Clients Served</p>
            </div>
            <div className="p-6 rounded-xl shadow-md text-center bg-yellow-50">
              <div className="text-4xl font-bold text-gray-900 mb-2">98%</div>
              <p className="text-gray-600">Client Satisfaction Rate</p>
            </div>
            <div className="p-6 rounded-xl shadow-md text-center bg-purple-50">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                45 Days
              </div>
              <p className="text-gray-600">to Results</p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-on-scroll opacity-0">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Complete Growth System
              </h2>
              <p className="text-gray-600">
                Everything needed to scale from ₹2L to ₹5L+ per month
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <span>8 live sessions (group or 1:1)</span>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <span>16 async reviews (Loom / notes)</span>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <span>
                  Templates: Landing Page, emails, LinkedIn DMs, objection bank,
                  discovery script, KPI sheet
                </span>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <span>30 mini case-study formats to use as social proof</span>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <span>
                  Community/chat support (business-hours) — 365 days access
                </span>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <span>
                  DWY Add-on (optional): 1 LP rewrite + 2 sequence rewrites + 10
                  profile edits
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[45px]">
          <div className="flex flex-wrap justify-center gap-4">
            <div className="group relative">
              <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Action-based guarantee
              </div>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Follow the scorecard and we'll extend support if targets aren't
                met.
              </div>
            </div>

            <div className="group relative">
              <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" />
                8-week implementation
              </div>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Structured, time-boxed program with deliverables each week.
              </div>
            </div>

            <div className="group relative">
              <div className="bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Live + async feedback
              </div>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Weekly calls + Loom/notes reviews for uninterrupted momentum.
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Program Snapshot */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="animate-on-scroll opacity-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Program snapshot
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>
                    <strong>Length:</strong> 8 weeks
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-primary" />
                  <span>
                    <strong>Weekly time:</strong> ~3–4 hrs (1 hr live + ~2–3 hrs
                    tasks)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>
                    <strong>Cadence:</strong> Mon: 60-min live call → Wed & Fri:
                    async Loom reviews
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <span>
                    <strong>Format:</strong> Cohort or 1:1 or Teams
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-primary" />
                  <span>
                    <strong>Tools:</strong> Gmail, LinkedIn, Notion, Canva,
                    Sheets
                  </span>
                </div>
              </div>

              <div className="mt-8 p-6 bg-green-50 rounded-xl">
                <h4 className="font-semibold text-green-800 mb-3">
                  Who it's for:
                </h4>
                <p className="text-green-700">
                  Founders / agency owners who can prospect 30–45 mins/day
                </p>
              </div>

              <div className="mt-4 p-6 bg-red-50 rounded-xl">
                <h4 className="font-semibold text-red-800 mb-3">
                  Who it's not for:
                </h4>
                <p className="text-red-700">
                  "Set-and-forget"; won't publish/message; won't follow the
                  scorecard
                </p>
              </div>
            </div>

            {/* Charts Section */}
            <div className="space-y-8 animate-on-scroll opacity-0">
              {/* Calls per Week Chart */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-semibold mb-4">
                  Expected Appointments per Week
                </h4>
                <div className="h-32 bg-white rounded-lg p-4 flex items-end justify-between">
                  {[0, 2, 2, 4, 3, 5, 6, 7].map((calls, week) => (
                    <div
                      key={week}
                      className="flex flex-col items-center gap-2"
                    >
                      <div
                        className="bg-primary rounded-t"
                        style={{ height: `${calls * 12}px`, width: "20px" }}
                      ></div>
                      <span className="text-xs text-gray-600">W{week + 1}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Target: 5–10 booked calls/week by Weeks 6–8
                </p>
              </div>

              {/* Seat Fill Progress */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-semibold mb-4">Cohort Availability</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Sep-A Cohort</span>
                      <span>9/12 filled</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Oct-A Cohort</span>
                      <span>3/12 filled</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: "25%" }}
                      ></div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-red-600 mt-2">
                  Seats fill fast — updated weekly
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Action-Based Guarantee */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-on-scroll opacity-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Action-based Guarantee
            </h2>
            <div className="bg-white p-8 rounded-xl shadow-sm border">
              <p className="text-lg mb-6">
                If you attend calls, submit 2 tasks/week, prospect 30–45
                mins/day (5 days/week) and still don't reach the activity
                target, you get 4 extra 1:1 calls or a free rollover into the
                next cohort.
              </p>

              <h4 className="font-semibold mb-4">Scorecard requirements:</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Attendance ✔</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>2 task submissions / week ✔</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Prospecting log (daily) ✔</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>KPI updates (weekly) ✔</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <a
                  href="/downloads/UrbanSpell_Scorecard_Starter.xlsx"
                  download="UrbanSpell_Scorecard_Starter.xlsx"
                  className="inline-flex items-center gap-2 text-primary hover:text-blue-600 font-medium transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Scorecard File
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-gray-600">Real results from real businesses</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Main Slider Container */}
            <div className="relative bg-gradient-to-r from-primary to-blue-600 rounded-2xl shadow-2xl overflow-hidden min-h-[400px] flex items-center">
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 hover:scale-110 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 hover:scale-110 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Testimonial Content */}
              <div
                key={currentSlide}
                className="w-full px-16 py-12 text-center text-white relative animate-fade-up"
              >
                {/* Name and Platform */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {testimonials[currentSlide].name}
                  </h3>
                  <p className="text-sm text-white/80">
                    {testimonials[currentSlide].role}
                  </p>
                </div>

                {/* Quote Marks and Content */}
                <div className="relative">
                  <p className="text-lg leading-relaxed italic px-8 relative z-10">
                    {testimonials[currentSlide].text}
                  </p>
                </div>
              </div>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-primary scale-125 opacity-100"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white" id="Pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-on-scroll opacity-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Pricing</h2>
            
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-on-scroll opacity-0 ${
                plan.popular ? "ring-2 ring-primary" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-sm text-gray-500 mb-4">{plan.tag}</div>


                  <div className="mb-6">
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {plan.priceINR}
                    </div>
                    <div className="text-lg text-gray-500 mb-2">
                      {plan.priceUSD}
                    </div>
                    {plan.installmentINR && (
                      <div className="text-sm text-gray-400">
                        or {plan.installmentINR}
                      </div>
                    )}
                    {plan.installmentUSD && (
                      <div className="text-sm text-gray-400">
                        or {plan.installmentUSD}
                      </div>
                    )}
                  </div>
                  <a
                    href={
                      plan.name === "Starter"
                        ? "https://rzp.io/rzp/CWaDN3w"
                        : plan.name === "Pro Plus"
                        ? "https://rzp.io/rzp/propplusplan"
                        : "https://rzp.io/rzp/JhtwIfjH"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-300 inline-flex items-center justify-center ${
                      plan.popular
                        ? "bg-gradient-to-r from-primary to-blue-600 text-white hover:shadow-lg hover:-translate-y-0.5"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    Get started
                  </a>
                </div>

                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Prices shown are per cohort. USD range for Pro depends on scope.
            EMI/instalment available.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-on-scroll opacity-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border"
                >
                  <button
                    onClick={() =>
                      setExpandedFaq(expandedFaq === index ? null : index)
                    }
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <h4 className="font-semibold text-gray-900">
                      {faq.question}
                    </h4>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  {expandedFaq === index && (
                    <div className="px-6 pb-6 border-t border-gray-100">
                      <p className="text-gray-600 pt-4">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">urbanspell</div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a
                    href="mailto:urbanspell@gmail.com"
                    className="hover:text-white transition-colors"
                  >
                    urbanspell@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a
                    href="https://wa.me/917083802198"
                    className="hover:text-white transition-colors"
                  >
                    +91-7083802198
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-gray-300">
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Terms
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Disclaimer
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Disclaimer</h4>
              <p className="text-gray-300 text-sm">
                No income guarantees; outcomes require action per scorecard.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 UrbanSpell. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
