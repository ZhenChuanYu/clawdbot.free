import { motion } from 'framer-motion'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          <p className="text-gray-500 mb-12">Last updated: December 28, 2025</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to Grok API. By accessing or using our platform, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our services.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Grok API is a developer platform that provides access to xAI's Grok 4.1 AI model services. We are not affiliated with, endorsed by, or officially connected to xAI.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Grok API provides a platform that enables users to access xAI's Grok 4.1 AI model through official API services. Our services include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>API access to xAI's Grok 4.1 model</li>
                <li>Developer tools and documentation</li>
                <li>Community support and resources</li>
                <li>Usage monitoring and analytics</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Registration</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                To use our services, you must create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Be responsible for all activities under your account</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Account Eligibility</h3>
              <p className="text-gray-700 leading-relaxed">
                You must be at least 18 years old to use our services. By creating an account, you represent that you meet this age requirement.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Acceptable Use</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree not to use our services to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit harmful or malicious code</li>
                <li>Engage in fraudulent activities</li>
                <li>Harass, abuse, or harm others</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use the service for any illegal or unethical purposes</li>
                <li>Resell or redistribute API access without authorization</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. API Usage and Limitations</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 API Access</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your use of the Grok API through our platform is subject to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Rate limits and usage quotas based on your subscription plan</li>
                <li>xAI's API terms and conditions</li>
                <li>Our fair use policy</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">5.2 Service Availability</h3>
              <p className="text-gray-700 leading-relaxed">
                While we strive for high availability, we do not guarantee uninterrupted access to our services. We may perform maintenance, updates, or experience downtime without prior notice.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Payment and Billing</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">6.1 Fees</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Access to our services requires payment of fees as outlined in your chosen subscription plan. You agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Pay all applicable fees on time</li>
                <li>Provide valid payment information</li>
                <li>Authorize us to charge your payment method</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">6.2 Refunds</h3>
              <p className="text-gray-700 leading-relaxed">
                Fees are generally non-refundable except as required by law or as explicitly stated in your subscription agreement.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Intellectual Property</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">7.1 Our Rights</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                All content, features, and functionality of our platform are owned by Grok API and are protected by intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">7.2 Your Content</h3>
              <p className="text-gray-700 leading-relaxed">
                You retain ownership of any content you submit through our platform. However, you grant us a license to use, process, and transmit your content as necessary to provide our services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Third-Party Services</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our platform integrates with xAI's Grok API. Your use of the API is subject to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>xAI's Terms of Service</li>
                <li>xAI's Privacy Policy</li>
                <li>xAI's API usage policies</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                We are not responsible for xAI's services or any changes to their API.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Disclaimer of Warranties</h2>
              <p className="text-gray-700 leading-relaxed">
                OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, GROK API SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF OUR SERVICES.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Indemnification</h2>
              <p className="text-gray-700 leading-relaxed">
                You agree to indemnify and hold harmless Grok API from any claims, damages, or expenses arising from your use of our services or violation of these Terms.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Termination</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may suspend or terminate your account at any time for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Violation of these Terms</li>
                <li>Non-payment of fees</li>
                <li>Fraudulent or illegal activity</li>
                <li>Any reason at our sole discretion</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify you of significant changes. Your continued use of our services after changes constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700">Email: support@grok.api</p>
                <p className="text-gray-700 mt-2">Website: https://grok.api</p>
              </div>
            </section>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
              <p className="text-sm text-gray-700">
                <strong>Important Notice:</strong> Grok API is an independent developer platform. We are not affiliated with, endorsed by, or officially connected to xAI. We provide access to xAI's official Grok API services to support our infrastructure and operational costs.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
