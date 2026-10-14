export type PolicySection = {
    heading: string;
    body?: string[];
    bullets?: string[];
  };
  
  export type Policy = {
    slug: string;
    title: string;
    tagline: string;
    updated: string;
    sections: PolicySection[];
  };
  
  const contact = {
    email: "vijayampublicationsvja@gmail.com",
    phone: "+91 8885414666",
    address: "Vijayam Publications, Andhra Pradesh, India",
  };
  
  export const policies: Policy[] = [
    {
      slug: "privacypolicy",
      title: "Privacy Policy",
      tagline:
        "How Vijayam Publications collects, uses and protects your personal information.",
      updated: "January 2025",
      sections: [
        {
          heading: "1. Information We Collect",
          body: [
            "We collect only the information required to process your orders and to improve your reading experience.",
          ],
          bullets: [
            "Identity details: name, email address and phone number.",
            "Delivery details: shipping address, landmark and PIN code.",
            "Order details: books purchased, invoice history and payment status.",
            "Technical details: browser type, device type and pages visited on our site.",
          ],
        },
        {
          heading: "2. How We Use Your Information",
          bullets: [
            "To confirm, pack and deliver your book orders.",
            "To send order updates, invoices and delivery notifications.",
            "To respond to enquiries from students, educators and institutions.",
            "To recommend titles relevant to your course or syllabus.",
            "To detect fraudulent orders and keep our store secure.",
          ],
        },
        {
          heading: "3. Payments",
          body: [
            "All payments are processed through trusted third-party payment gateways. We never store your complete card number, CVV or UPI PIN on our servers.",
          ],
        },
        {
          heading: "4. Sharing of Data",
          body: [
            "We do not sell or rent your personal data. Information is shared only with courier partners, payment gateways and accounting services strictly for completing your order, or where disclosure is required by law.",
          ],
        },
        {
          heading: "5. Cookies",
          body: [
            "Our website uses cookies to remember your cart and preferences. You may disable cookies in your browser, though some features such as checkout may not work as expected.",
          ],
        },
        {
          heading: "6. Data Security",
          body: [
            "Orders are transmitted over encrypted connections and access to customer records is restricted to authorised staff only. While we follow industry-standard safeguards, no method of transmission over the internet is completely secure.",
          ],
        },
        {
          heading: "7. Your Rights",
          bullets: [
            "Request a copy of the personal data we hold about you.",
            "Ask us to correct inaccurate details.",
            "Ask us to delete your account data, subject to statutory record-keeping.",
            "Opt out of promotional messages at any time.",
          ],
        },
        {
          heading: "8. Children's Privacy",
          body: [
            "Our store is intended for users aged 16 and above. Younger students should place orders with the help of a parent, guardian or institution.",
          ],
        },
        {
          heading: "9. Contact Us",
          bullets: [
            `Email: ${contact.email}`,
            `Phone: ${contact.phone}`,
            `Address: ${contact.address}`,
          ],
        },
      ],
    },
    {
      slug: "shippingpolicy",
      title: "Shipping Policy",
      tagline: "Dispatch timelines, delivery charges and tracking for every order.",
      updated: "January 2025",
      sections: [
        {
          heading: "1. Order Processing",
          body: [
            "Orders are processed on working days between Monday and Saturday. Prepaid orders placed before 2:00 PM are usually packed the same day; later orders move to the next working day.",
          ],
        },
        {
          heading: "2. Delivery Timelines",
          bullets: [
            "Andhra Pradesh and Telangana: 2 to 4 working days.",
            "Other states in India: 4 to 8 working days.",
            "Remote or hill locations: up to 10 working days.",
            "Bulk institutional orders: 7 to 12 working days depending on quantity.",
          ],
        },
        {
          heading: "3. Shipping Charges",
          body: [
            "Shipping charges are calculated at checkout based on weight and destination. Orders above the free-shipping threshold displayed on the cart page are delivered at no extra cost.",
          ],
        },
        {
          heading: "4. Tracking Your Order",
          body: [
            "Once your parcel leaves our warehouse you will receive a tracking number by email or SMS. Tracking information may take up to 24 hours to appear on the courier website.",
          ],
        },
        {
          heading: "5. Delivery Attempts",
          body: [
            "Couriers normally make up to three delivery attempts. If the parcel cannot be delivered because the address is incomplete or nobody is available, it is returned to us and re-shipping charges will apply.",
          ],
        },
        {
          heading: "6. Damaged or Missing Parcels",
          body: [
            "Please refuse any parcel that arrives torn, wet or tampered with, and inform us within 48 hours with photographs so that we can dispatch a replacement.",
          ],
        },
        {
          heading: "7. Bulk and Institutional Supply",
          body: [
            "Colleges, libraries and distributors can request consolidated shipments and freight quotes by writing to us with the title list and quantities.",
          ],
        },
      ],
    },
    {
      slug: "returnpolicy",
      title: "Return Policy",
      tagline: "Returns, replacements and refunds explained in simple terms.",
      updated: "January 2025",
      sections: [
        {
          heading: "1. Return Window",
          body: [
            "Return or replacement requests must be raised within 7 days of delivery. Requests received after this window cannot be processed.",
          ],
        },
        {
          heading: "2. Eligible Returns",
          bullets: [
            "Wrong title, edition or volume delivered.",
            "Printing defects such as missing, blank or repeated pages.",
            "Books damaged in transit.",
            "Incomplete order or missing items from a set.",
          ],
        },
        {
          heading: "3. Non-Returnable Cases",
          bullets: [
            "Books that are written on, highlighted, stamped or have torn pages.",
            "Items returned without original packaging or invoice.",
            "Digital products, e-books and access codes once activated.",
            "Titles bought during clearance sales, unless defective.",
          ],
        },
        {
          heading: "4. How to Raise a Request",
          bullets: [
            "Email us with your order number and registered phone number.",
            "Attach clear photographs of the book and the outer packaging.",
            "Our team responds within 2 working days with pickup or return instructions.",
          ],
        },
        {
          heading: "5. Refunds",
          body: [
            "Approved refunds are issued to the original payment method within 5 to 7 working days of the returned book reaching our warehouse. Bank processing time may add a few more days.",
          ],
        },
        {
          heading: "6. Replacements",
          body: [
            "Where stock is available we prefer to send a replacement copy at no additional cost. If the title is out of print, a full refund is issued instead.",
          ],
        },
        {
          heading: "7. Order Cancellation",
          body: [
            "Orders can be cancelled free of charge any time before dispatch. Once the parcel has been handed to the courier, the return process applies.",
          ],
        },
      ],
    },
    {
      slug: "cookiepolicy",
      title: "Cookie Policy",
      tagline: "What cookies we use and how you can control them.",
      updated: "January 2025",
      sections: [
        {
          heading: "1. What Are Cookies",
          body: [
            "Cookies are small text files placed on your device when you visit our website. They help the site remember your actions and preferences between pages and visits.",
          ],
        },
        {
          heading: "2. Types of Cookies We Use",
          bullets: [
            "Essential cookies: keep you signed in and preserve your cart.",
            "Preference cookies: remember your theme, language and recently viewed books.",
            "Analytics cookies: tell us which titles and pages are most useful to readers.",
            "Marketing cookies: used sparingly to measure the response to our campaigns.",
          ],
        },
        {
          heading: "3. Third-Party Cookies",
          body: [
            "Payment gateways, embedded maps and video players may set their own cookies. These are governed by the privacy policies of those providers.",
          ],
        },
        {
          heading: "4. Managing Cookies",
          body: [
            "You can delete or block cookies from your browser settings at any time. Blocking essential cookies will prevent checkout and account features from working correctly.",
          ],
        },
        {
          heading: "5. Updates",
          body: [
            "We review this policy periodically. Any change in the cookies we use will be reflected on this page with a revised date.",
          ],
        },
      ],
    },
    {
      slug: "termsofservice",
      title: "Terms of Service",
      tagline: "The rules that govern your use of the Vijayam Publications store.",
      updated: "January 2025",
      sections: [
        {
          heading: "1. Acceptance of Terms",
          body: [
            "By browsing this website or placing an order you agree to these terms. If you do not accept them, please discontinue use of the site.",
          ],
        },
        {
          heading: "2. Accounts",
          bullets: [
            "You are responsible for the accuracy of the details in your account.",
            "Keep your password confidential and inform us of any unauthorised use.",
            "We may suspend accounts used for fraudulent or abusive activity.",
          ],
        },
        {
          heading: "3. Pricing and Availability",
          body: [
            "Prices, editions and stock levels are subject to change without notice. If a title becomes unavailable after you order, we will offer a replacement edition or a full refund.",
          ],
        },
        {
          heading: "4. Intellectual Property",
          body: [
            "All book content, cover designs, logos and page layouts belong to Vijayam Publications or its authors. Reproduction, scanning, photocopying or resale of our material without written permission is prohibited.",
          ],
        },
        {
          heading: "5. Permitted Use",
          bullets: [
            "Use the site only for lawful, personal or institutional purchasing.",
            "Do not attempt to copy, scrape or resell our catalogue data.",
            "Do not upload harmful code or interfere with site security.",
          ],
        },
        {
          heading: "6. Limitation of Liability",
          body: [
            "Our books are academic references prepared with care, but we are not liable for examination outcomes or for indirect losses arising from use of the content. Our maximum liability is limited to the value of the order concerned.",
          ],
        },
        {
          heading: "7. Governing Law",
          body: [
            "These terms are governed by the laws of India, and disputes are subject to the jurisdiction of the courts of Andhra Pradesh.",
          ],
        },
        {
          heading: "8. Contact",
          bullets: [`Email: ${contact.email}`, `Phone: ${contact.phone}`],
        },
      ],
    },
  ];
  
  export function getPolicy(slug: string): Policy | undefined {
    return policies.find((policy) => policy.slug === slug);
  }
  