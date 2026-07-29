import React from 'react';

export default function ShoppingPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8 sm:p-12 border border-slate-100">
        
        {/* Header Section */}
        <div className="border-b border-slate-200 pb-6 mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Shopping & Terms Policy
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          
          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-bold text-slate-950 mb-3">1. Digital Product Delivery</h2>
            <p className="text-slate-600 leading-relaxed mb-3">
              All our educational materials, courses, and memberships are digital products. We do not ship physical goods.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Access links are sent immediately via email after checkout.</li>
              <li>Courses are accessible via your student dashboard right away.</li>
              <li>Downloadable files (PDFs, code) are available instantly.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-bold text-slate-950 mb-3">2. Refund and Cancellation Policy</h2>
            <p className="text-slate-600 leading-relaxed mb-3">
              We want you to be satisfied with your learning experience, but we must protect our instructors' intellectual property.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Course Access:</strong> Eligible for a full refund within 14 days of purchase if less than 20% of the content has been consumed.</li>
              <li><strong>Instant Downloads:</strong> Non-refundable once the file has been downloaded.</li>
              <li><strong>Subscriptions:</strong> Cancel anytime through your dashboard to stop future recurring charges.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-bold text-slate-950 mb-3">3. Age Requirements & Account Security</h2>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>You must be at least 13 years old to purchase any product on this website.</li>
              <li>Sharing account login credentials with others is strictly prohibited.</li>
              <li>Each purchase grants a single-user license for personal educational use only.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-bold text-slate-950 mb-3">4. Pricing and Currency</h2>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>All prices are displayed clearly before checkout and are subject to change without notice.</li>
              <li>Applicable local sales taxes or VAT are calculated and added at checkout based on your location.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="bg-slate-50 border border-slate-200 rounded-lg p-5">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Need Help with an Order?</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              If you experienced a technical issue during checkout, did not receive your access link, or need to request a refund, please reach out to our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 text-sm font-medium">
              <a href="mailto:support@yourwebsite.com" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
                ✉️ support@yourwebsite.com
              </a>
              <span className="hidden sm:inline text-slate-300">|</span>
              <span className="text-slate-600">⏱️ Response Time: Within 24-48 hours</span>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
