import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-3 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">Legal & Compliance</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">Privacy Policy</h1>
          <p className="text-xs text-brand-muted">Last updated: October 2026</p>
        </div>

        <div className="prose prose-purple max-w-none text-sm text-brand-body leading-relaxed space-y-6 pt-6 border-t border-brand-lavender-border">
          <section className="space-y-2">
            <h3 className="text-lg font-bold text-brand-navy">1. Information We Collect</h3>
            <p>
              When you submit a contact inquiry, quote request, or register an account on PrimeWeb Studio, we collect personal information such as your full name, email address, phone number, company name, and project specifications.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-bold text-brand-navy">2. How We Use Your Information</h3>
            <p>
              We utilize collected information exclusively to evaluate project requirements, prepare proposals, deliver technical software development services, provide customer support, and communicate project status updates. We do not sell, rent, or trade your personal data to third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-bold text-brand-navy">3. Data Security</h3>
            <p>
              We apply industry-standard security measures including encrypted HTTP communication (SSL/TLS), bcrypt password hashing, and secure HTTP-only cookies to protect your personal information against unauthorized access or disclosure.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-bold text-brand-navy">4. Cookies and Session Storage</h3>
            <p>
              We use necessary session cookies to maintain authenticated access for clients and administrators. You may configure your browser to decline cookies, but certain dashboard features may become unavailable.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-bold text-brand-navy">5. Contact Us Regarding Privacy</h3>
            <p>
              If you have any questions about this Privacy Policy or wish to request data deletion, please contact us at <a href="mailto:contact@primewebstudio.com" className="text-brand-primary font-medium">contact@primewebstudio.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
