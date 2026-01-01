import { Navbar } from "@/components/Navbar";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";


const TermsOfService = () => {
  const sections = [
    {
      id: 'acceptance',
      title: '1. Acceptance of Terms',
      color: 'from-blue-400 to-blue-600',
      content: `By accessing or using [Your Trading Website] (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, you must not use the Service. These Terms form a legally binding agreement between you and [Your Company Name] ("we," "us," or "our"). We may update these Terms at any time—continued use constitutes acceptance.`
    },
    {
      id: 'eligibility',
      title: '2. Eligibility',
      color: 'from-blue-400 to-blue-600',
      content: `You must be at least 18 years old (or the age of majority in your jurisdiction) and legally capable of entering contracts to use the Service. You represent that you are not a restricted person under applicable laws (e.g., U.S. sanctions lists). We may require verification of your eligibility at any time.`
    },
    {
      id: 'nature',
      title: '3. Nature of the Service',
      color: 'from-green-400 to-green-600',
      content: `The Service provides a platform for trading [e.g., cryptocurrencies, stocks, forex] and related tools. It is not a broker, advisor, or custodian—we do not hold funds or execute trades on your behalf. All activities are at your own risk, and we provide no guarantees of availability or performance.`
    },
    {
      id: 'responsibilities',
      title: '4. User Responsibilities',
      color: 'from-green-400 to-green-600',
      content: `You agree to:\n\n• Provide accurate information during registration and KYC.\n• Comply with all applicable laws, including anti-money laundering regulations.\n• Secure your account (e.g., use strong passwords, enable 2FA).\n• Not engage in abusive practices like market manipulation or unauthorized API use.\n\nYou are solely responsible for your trades and losses.`
    },
    {
      id: 'risk',
      title: '5. Risk Disclosure',
      color: 'from-orange-400 to-red-600',
      content: `Trading involves substantial risk of loss and is not suitable for all investors. You may lose more than your initial investment due to volatility, leverage, or errors. We do not provide financial advice—consult professionals. Past performance does not predict future results.`
    },
    {
      id: 'earnings',
      title: '6. Earnings, ROI & Rewards',
      color: 'from-orange-400 to-red-600',
      content: `Any projected earnings, ROI, or rewards (e.g., bonuses) are illustrative only and not guaranteed. Actual results vary based on markets and your actions. Rewards programs are subject to terms and may be revoked for non-compliance.`
    },
    {
      id: 'refund',
      title: '7. Refund & Withdrawal Policy',
      color: 'from-purple-400 to-pink-600',
      content: `To request a refund of your investment amount, you must contact Customer Support and submit an official refund request through the company’s registered email.\n\n• If you invested an amount (e.g., 1000 USDT) and request a refund after a specific period (e.g., 2 months), the company will prepare a settlement based on ROI and referral; the remaining wallet balance will be refunded to you. This process takes 5 to 10 days to complete.\n\n• All withdrawals are subject to a 10% deduction, covering applicable fees and platform charges.\n\n• The minimum withdrawal amount is 10 USDT.`
    },
    {
      id: 'ai',
      title: '8. Use of AI and Automation',
      color: 'from-purple-400 to-pink-600',
      content: `You may use AI tools or bots via our API, but they must comply with these Terms and rate limits. We are not liable for losses from automated trading errors. Prohibited: High-frequency trading that disrupts the platform.`
    },
    {
      id: 'privacy',
      title: '9. Privacy',
      color: 'from-indigo-400 to-violet-600',
      content: `Your privacy is governed by our Privacy Policy [link to /privacy], incorporated herein. By using the Service, you consent to data collection and processing as described therein.`
    },
    {
      id: 'ip',
      title: '10. Intellectual Property',
      color: 'from-indigo-400 to-violet-600',
      content: `All content, logos, and software on the Service are our property or licensed to us. You are granted a limited, non-exclusive license for personal use. Do not copy, modify, or distribute without permission. User-generated content grants us a perpetual license to use.`
    },
    {
      id: 'modification',
      title: '11. Modification of Terms',
      color: 'from-emerald-400 to-teal-600',
      content: `We may modify these Terms at any time by posting updates on the Service. Significant changes will be notified via email or in-app alerts. Continued use after changes constitutes acceptance.`
    },
    {
      id: 'termination',
      title: '12. Termination',
      color: 'from-emerald-400 to-teal-600',
      content: `We may suspend or terminate your access for violations, at our discretion. Upon termination, you must cease using the Service, and outstanding obligations (e.g., fees) remain due. Sections surviving termination include risk disclosures, IP, and limitations of liability.`
    },
    {
      id: 'contact',
      title: '13. Contact Information',
      color: 'from-emerald-400 to-teal-600',
      content: `For questions about these Terms, contact us at support@yourtradingwebsite.com or [address/phone]. Governing law: [e.g., Delaware, USA]. Disputes resolved via arbitration in [location].`
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-12">
        <div className="max-w-4xl mx-auto mt-16 px-2 sm:px-4 lg:px-0">
          {/* Enhanced Header with Bold and Larger Font */}
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
              Terms of Service
            </h1>
            <p className="text-gray-200 text-xl font-bold">Last Updated: November 22, 2025</p>
            <p className="text-gray-300 text-lg font-semibold mt-2 max-w-2xl mx-auto">
              Welcome to [Your Trading Website]. These Terms govern your use of our trading platform.
            </p>
          </div>

          {/* Static Sections with Bold Text, Larger Font, and Colorful Titles */}
          <div className="space-y-6">
            {sections.map((section) => (
              <div
                key={section.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border-2 border-gray-700/50"
              >
                <div className="p-6">
                  <h2 className={`text-2xl font-bold mb-4 flex items-center gap-2 bg-gradient-to-r ${section.color} bg-clip-text text-transparent`}>
                    <span className="text-emerald-400 text-xl">📋</span>
                    {section.title}
                  </h2>
                  <p className="text-gray-200 leading-relaxed whitespace-pre-line text-base font-semibold">
                    {section.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Footer Note with Bold and Larger Font */}
          <div className="mt-16 text-center">
            <p className="text-gray-400 text-base font-bold bg-gray-800/30 rounded-lg p-4 border border-gray-600/50">
              These Terms are governed by the laws of [Jurisdiction]. If any provision is invalid, the rest remain in effect.
            </p>
          </div>
        </div>
      </div>
      {/* FOOTER IMPLEMENTATION */}
      <Footer />
    </>
  );
};

export default TermsOfService;