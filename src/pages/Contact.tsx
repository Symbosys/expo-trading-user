import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Clock, Mail, MapPin, MessageSquare, Phone, Shield, Loader2, CheckCircle, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateEnquiry } from "@/api/hooks/enquiry";
import { createEnquirySchema } from "@/validator/enquiry";
import { ZodError } from "zod";

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const mutation = useCreateEnquiry();

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "support@expotradex.com",
      link: "mailto:support@expotradex.com",
    },
    {
      icon: Mail,
      label: "Alternative Email",
      value: "tradexexpo@gmail.com",
      link: "mailto:tradexexpo@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "9296115827",
      link: "tel:9296115827",
    },
    {
      icon: MapPin,
      label: "Address",
      value: "Harmu Housing Colony, Ranchi, Jharkhand, India",
      link: "#",
    },
  ];

  const supportTopics = [
    {
      icon: MessageSquare,
      title: "General Inquiries",
      description: "Questions about our platform, content, or services"
    },
    {
      icon: Shield,
      title: "Technical Support",
      description: "Access issues, technical problems, or platform errors"
    },
    {
      icon: Mail,
      title: "Partnership",
      description: "Business collaboration and partnership opportunities"
    },
  ];

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "message") {
      const charCount = value.length;
      setWordCount(charCount);

      // Prevent exceeding 250 characters
      if (charCount > 250) {
        return;
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFieldErrors({});

    try {
      const validatedData = createEnquirySchema.parse(formData);

      mutation.mutate(validatedData, {
        onSuccess: () => {
          setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
          });
          setShowSuccessModal(true);
        },
        onError: (error: any) => {
          setFieldErrors({ submit: error.message });
        },
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as string;
          errors[path] = err.message;
        });
        setFieldErrors(errors);
      }
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <section className="py-20 px-4 bg-gradient-to-b from-background to-card mt-16">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Contact <span className="gradient-text">ExpoTradeX</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Thank you for your interest in ExpoTradeX. We are here to assist you with general inquiries, platform-related questions, and support regarding our educational content and services.
            </p>
          </div>

          {/* Contact Information Section */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-center">Get In <span className="gradient-text">Touch</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <a
                    key={index}
                    href={info.link}
                    className="group"
                  >
                    <Card className="glass-card p-6 h-full">
                      <div className="mb-4">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{info.label}</p>
                      <p className="text-lg font-bold text-foreground break-words">{info.value}</p>
                    </Card>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Business Hours */}
          <div className="mb-20">
            <div className="bg-gray-100 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border-2 border-gray-200 dark:border-gray-700/50 p-8">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-7 h-7 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Business Hours</h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300 font-semibold">Monday to Saturday</p>
                  <p className="text-lg text-gray-700 dark:text-gray-300">10:00 AM – 6:00 PM (IST)</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 italic">
                    We aim to respond to all genuine inquiries within a reasonable timeframe.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Support Topics */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 dark:from-blue-400 to-purple-600 dark:to-purple-500 bg-clip-text text-transparent">
              Support Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {supportTopics.map((topic, index) => {
                const Icon = topic.icon;
                return (
                  <div
                    key={index}
                    className="bg-gray-100 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border-2 border-gray-200 dark:border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300 p-8"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{topic.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{topic.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 bg-emerald-50 dark:bg-gray-800/50 border-2 border-emerald-200 dark:border-emerald-500/30 rounded-xl p-8">
              <p className="text-gray-900 dark:text-emerald-300 leading-relaxed">
                <span className="font-bold">Please note:</span> ExpoTradeX does not provide financial or investment advice. All queries are handled for informational and support purposes only.
              </p>
            </div>
          </div>

          {/* Transparency & Responsibility */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-emerald-600 dark:from-emerald-400 via-blue-600 dark:via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Transparency & Responsibility
            </h2>
            <div className="bg-gray-100 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border-2 border-gray-200 dark:border-gray-700/50 p-12">
              <div className="space-y-6">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  ExpoTradeX is committed to clear communication and ethical practices. Trading and financial markets involve risk, and users are responsible for their own decisions.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Any information shared by our team is strictly educational in nature. We do not offer personalized trading recommendations or profit-related guidance.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-300 dark:border-gray-700">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">✓</p>
                    <p className="font-semibold text-gray-900 dark:text-white">Clear Communication</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">✓</p>
                    <p className="font-semibold text-gray-900 dark:text-white">Ethical Practices</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">✓</p>
                    <p className="font-semibold text-gray-900 dark:text-white">User Responsibility</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">
                Send Us a <span className="gradient-text">Message</span>
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            <Card className="glass-card p-8 lg:p-12 max-w-3xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                {fieldErrors.submit && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-lg p-4">
                    <p className="text-red-700 dark:text-red-400 font-semibold">{fieldErrors.submit}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={`w-full px-4 py-3 rounded-lg bg-card/50 border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all ${fieldErrors.name ? "border-red-500 focus:border-red-500" : "border-primary/20 focus:border-primary"
                        }`}
                      required
                    />
                    {fieldErrors.name && <p className="text-red-500 text-sm mt-1">{fieldErrors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={`w-full px-4 py-3 rounded-lg bg-card/50 border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all ${fieldErrors.email ? "border-red-500 focus:border-red-500" : "border-primary/20 focus:border-primary"
                        }`}
                      required
                    />
                    {fieldErrors.email && <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="9999999999"
                      className={`w-full px-4 py-3 rounded-lg bg-card/50 border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all ${fieldErrors.phone ? "border-red-500 focus:border-red-500" : "border-primary/20 focus:border-primary"
                        }`}
                      required
                    />
                    {fieldErrors.phone && <p className="text-red-500 text-sm mt-1">{fieldErrors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    className={`w-full px-4 py-3 rounded-lg bg-card/50 border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all ${fieldErrors.subject ? "border-red-500 focus:border-red-500" : "border-primary/20 focus:border-primary"
                      }`}
                    required
                  />
                  {fieldErrors.subject && <p className="text-red-500 text-sm mt-1">{fieldErrors.subject}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    rows={6}
                    className={`w-full px-4 py-3 rounded-lg bg-card/50 border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none ${fieldErrors.message ? "border-red-500 focus:border-red-500" : "border-primary/20 focus:border-primary"
                      }`}
                    required
                  />
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      {fieldErrors.message && <p className="text-red-500 text-sm">{fieldErrors.message}</p>}
                    </div>
                    <p className={`text-xs font-medium ${wordCount > 240 ? "text-amber-600" : wordCount > 250 ? "text-red-600" : "text-muted-foreground"}`}>
                      {wordCount}/250 characters
                    </p>
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  <Button
                    type="submit"
                    disabled={mutation.isPending}
                    className="bg-gradient-primary glow px-8 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="mb-20 bg-gradient-to-r from-emerald-50 dark:from-emerald-900/20 to-blue-50 dark:to-blue-900/20 border-2 border-emerald-200 dark:border-emerald-500/30 rounded-xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Have More Questions?
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Check out our comprehensive resources and educational content to learn more about trading and our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/about">
                <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:opacity-90 gap-2">
                  Learn About Us <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <a href="mailto:support@expotradex.com">
                <Button size="lg" variant="outline">
                  Email Support
                </Button>
              </a>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              ExpoTradeX – Support, Transparency, and Responsible Communication.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              We're committed to providing excellent support and maintaining the highest ethical standards.
            </p>
          </div>
        </div>
      </section>

      <Footer />

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="glass-card p-8 lg:p-12 max-w-md w-full mx-4 relative">
            <button
              onClick={handleModalClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
              </div>

              <h2 className="text-2xl lg:text-3xl font-bold mb-3 text-foreground">
                Message Sent Successfully!
              </h2>

              <p className="text-muted-foreground mb-2 leading-relaxed">
                Thank you for reaching out to us. Your enquiry has been received and we'll get back to you as soon as possible.
              </p>

              <p className="text-sm text-muted-foreground mb-8">
                We appreciate your interest in ExpoTradeX!
              </p>

              <Button
                onClick={handleModalClose}
                className="bg-gradient-primary glow px-8 w-full"
              >
                Go to Home
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
