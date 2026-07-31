import React from 'react';

export default function ReturnPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8 sm:p-12 border border-slate-100">
        
        {/* Header Section */}
        <div className="border-b border-slate-200 pb-6 mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Refund & Return Policy
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          
          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-bold text-slate-950 mb-3">1. Digital Products Nature</h2>
            <p className="text-slate-600 leading-relaxed">
              Because our website provides digital educational content (including online courses, downloadable guides, software templates, and video masterclasses), physical returns are not possible. Instead, we offer a digital refund policy under specific conditions to protect our instructors' intellectual property.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-bold text-slate-950 mb-3">2. Online Courses (14-Day Window)</h2>
            <p className="text-slate-600 leading-relaxed mb-3">
              We want you to love your learning experience. You are eligible to request a full refund for any course purchase within <strong>14 days</strong> of the purchase date, provided you meet the following criteria:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>You have watched or consumed less than <strong>20%</strong> of the total course content.</li>
              <li>You have not downloaded the complete supplementary source code or offline materials.</li>
              <li>You have not completed the course or generated a Certificate of Completion.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-bold text-slate-950 mb-3">3. Non-Refundable Digital Goods</h2>
            <p className="text-slate-600 leading-relaxed mb-3">
              Certain digital items are completely non-refundable once purchased or accessed due to their immediate download nature:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Standalone digital downloads (PDF eBooks, cheat sheets, asset packs).</li>
              <li>One-on-one live coaching sessions or scheduled private tutoring sessions.</li>
              <li>Bundles or items explicitly marked as "Final Sale" at check-out.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-bold text-slate-950 mb-3">4. Subscription Cancellations</h2>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Monthly or annual membership subscriptions can be cancelled at any time through your account dashboard settings.</li>
              <li>Upon cancellation, you will retain access to the subscription platform until the end of your current billing cycle.</li>
              <li>We do not issue partial or prorated refunds for the remaining days of a subscription period.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-bold text-slate-950 mb-3">5. Refund Processing Time</h2>
            <p className="text-slate-600 leading-relaxed">
              Approved refunds are credited back to the original payment method used during checkout (such as credit card, debit card, or payment processor account). Please allow <strong>5 to 10 business days</strong> for the transaction to securely post to your bank statement.
            </p>
          </section>

          {/* Contact Box */}
          <section className="bg-slate-50 border border-slate-200 rounded-lg p-5 mt-6">
            <h2 className="text-lg font-bold text-slate-900 mb-2">How to Request a Refund</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              To submit a refund claim, please email our support team with your full name, registered account email address, and transaction receipt identifier.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 text-sm font-medium">
              <a href="mailto:billing@yourwebsite.com" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
                ✉️ vijayampublicationsonline@gmail.com
              </a>
              <span className="hidden sm:inline text-slate-300">|</span>
              <span className="text-slate-600">⏱️ Review Period: Requests evaluated within 2 business days</span>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
