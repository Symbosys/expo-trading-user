import { Navbar } from "@/components/Navbar";

const PrivacyPolicy = () => {
  const sections = [
    { 
      id: 'info', 
      title: '1. Information We Collect', 
      color: 'from-blue-400 to-blue-600',
      content: `We collect data to provide and improve our trading services. This includes:\n\n• **Personal Information**: Name, email, phone, address, date of birth, government ID (for KYC verification).\n• **Financial Data**: Bank details, trading history, investment preferences.\n• **Usage Data**: IP address, browser type, pages visited, transaction logs.\n• **Cookies & Tracking**: Session cookies for login, analytics cookies (e.g., Google Analytics) for site performance.\n\nWe only collect what's necessary and obtain consent where required (e.g., via cookie banners).` 
    },
    { 
      id: 'use', 
      title: '2. How We Use Your Data', 
      color: 'from-blue-400 to-blue-600',
      content: `Your data helps us deliver secure, personalized trading experiences:\n\n• Verify identity and prevent fraud.\n• Process trades, deposits, and withdrawals.\n• Send updates, promotions, or regulatory alerts (you can opt out).\n• Analyze trends to improve platform features.\n• Comply with laws (e.g., anti-money laundering).\n\nWe retain data only as long as needed (e.g., 7 years for financial records) or per legal requirements.` 
    },
    { 
      id: 'security', 
      title: '3. Data Security', 
      color: 'from-green-400 to-green-600',
      content: `We use industry-standard measures to protect your data:\n\n• Encryption (TLS/SSL for transmissions, AES-256 at rest).\n• Access controls (multi-factor authentication).\n• Regular audits and vulnerability scans.\n• Employee training on data handling.\n\nNo system is 100% secure, so we can't guarantee absolute protection. Report suspected breaches to security@yourwebsite.com.` 
    },
    { 
      id: 'sharing', 
      title: '4. Data Sharing', 
      color: 'from-green-400 to-green-600',
      content: `We don't sell your data. We share it only when necessary:\n\n• **Service Providers**: With trusted partners (e.g., payment processors like Stripe, cloud hosts like AWS) under strict contracts.\n• **Legal Requirements**: To regulators, courts, or law enforcement if compelled.\n• **Business Transfers**: In mergers/acquisitions (with notice).\n• **Affiliates**: Within our group for operational purposes.\n\nYou can request details on shares via our privacy contact.` 
    },
    { 
      id: 'disclaimer', 
      title: '⚠️ Earnings Disclaimer', 
      color: 'from-orange-400 to-red-600',
      content: 'Past performance isn\'t indicative of future results. Trading involves significant risk of loss—never invest more than you can afford. Our platform provides tools, not financial advice.' 
    },
    { 
      id: 'noGuarantee', 
      title: '❌ No Fixed Income Guarantee', 
      color: 'from-orange-400 to-red-600',
      content: 'We do not promise or guarantee any returns, income, or profits. All trading is speculative; you may lose your entire investment.' 
    },
    { 
      id: 'highRisk', 
      title: '📉 High-Risk Asset Classes', 
      color: 'from-orange-400 to-red-600',
      content: 'Our platform supports high-volatility assets like cryptocurrencies, forex, and options. These can lead to rapid losses due to market swings, leverage, or liquidity issues. Educate yourself before trading.' 
    },
    { 
      id: 'marketRisk', 
      title: '💹 Market Risk Acknowledgment', 
      color: 'from-orange-400 to-red-600',
      content: 'Markets are influenced by unpredictable factors (e.g., news, geopolitics). We aren\'t liable for losses from market movements. Use stop-loss orders and diversify.' 
    },
    { 
      id: 'referral', 
      title: '🔁 Referral & Bonus Programs', 
      color: 'from-purple-400 to-pink-600',
      content: 'Referrals may earn bonuses, but they\'re subject to terms (e.g., minimum trades). Bonuses aren\'t guaranteed and can be revoked for abuse. Taxes apply—consult a professional.' 
    },
    { 
      id: 'addOn', 
      title: '🔄 Suggested Add-on', 
      color: 'from-purple-400 to-pink-600',
      content: 'We may recommend add-ons (e.g., premium analytics), but they\'re optional. Declining won\'t affect core services.' 
    },
    { 
      id: 'contact', 
      title: '📩 Contact Us', 
      color: 'from-indigo-400 to-violet-600',
      content: 'Questions? Email privacy@yourwebsite.com or use our support form. For data rights (access, deletion), submit a request with ID verification. Response within 30 days.' 
    },
  ];

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-4xl mx-auto">
        {/* Enhanced Header with Bold and Larger Font */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
            Privacy Policy
          </h1>
          <p className="text-gray-200 text-xl font-bold">Last Updated: November 22, 2025</p>
          <p className="text-gray-300 text-lg font-semibold mt-2 max-w-2xl mx-auto">
            At [Your Trading Website], we prioritize your privacy and security in every trade.
          </p>
        </div>

        {/* Static Sections with Bold Text, Larger Font, and Colorful Titles */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div
              key={section.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border-2 border-gray-700/50 border-blue-500/40 bg-blue-500/5"
            >
              <div className="p-6">
                <h2 className={`text-2xl font-bold mb-4 flex items-center gap-2 bg-gradient-to-r ${section.color} bg-clip-text text-transparent`}>
                  <span className="text-emerald-400 text-xl">{section.title.startsWith('1.') || section.title.startsWith('2.') || section.title.startsWith('3.') || section.title.startsWith('4.') ? '📋' : section.title.charAt(0)}</span>
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
            Changes to this policy may occur; check back periodically. Major updates will be emailed. Continued use means acceptance.
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default PrivacyPolicy;