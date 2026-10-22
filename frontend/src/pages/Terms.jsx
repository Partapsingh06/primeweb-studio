import React from 'react';

const Terms = () => {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-3 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">Terms of Service</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">Terms and Conditions</h1>
          <p className="text-xs text-brand-muted">Last updated: October 2026</p>
        </div>

        <div className="prose prose-purple max-w-none text-sm text-brand-body leading-relaxed space-y-6 pt-6 border-t border-brand-lavender-border">
          <section className="space-y-2">
            <h3 className="text-lg font-bold text-brand-navy">1. Engagement Overview</h3>
            <p>
              By accessing PrimeWeb Studio's website or contracting our web development services, you agree to adhere to these terms and conditions. All project agreements are governed by custom scopes of work and mutual agreements.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-bold text-brand-navy">2. Project Scopes and Estimates</h3>
            <p>
              Prices displayed on our public website represent illustrative starting rates. Final costs, project deliverables, and delivery schedules are agreed upon formally in written project proposals.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-bold text-brand-navy">3. Intellectual Property Rights</h3>
            <p>
              Upon receipt of final payment for a contracted project, full ownership of custom code and graphic assets developed for the client is transferred to the client, excluding open-source libraries and frameworks licensed under standard licenses (e.g. MIT, Apache).
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-lg font-bold text-brand-navy">4. Account Responsibilities</h3>
            <p>
              Clients registering an account on our platform are responsible for maintaining the confidentiality of their credentials and notifying us immediately of any unauthorized access.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
