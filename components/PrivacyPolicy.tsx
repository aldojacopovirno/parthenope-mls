import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-pmlsRed transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>

        <article className="prose prose-lg max-w-none">
          <h1 className="font-serif text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-500 text-sm mb-8">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <section className="mb-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              We are committed to protecting your privacy and ensuring the security of your personal data.
              This policy describes how we collect, use, and safeguard your information when you interact with our organization and website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may collect the following categories of information:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Contact Information:</strong> First name, last name, email address, and phone number when you contact us or register for our events.</li>
              <li><strong>Academic Information:</strong> University affiliation, field of study, and academic year (when relevant to society activities).</li>
              <li><strong>Technical Data:</strong> Information automatically collected when you visit our website, including IP address, browser type, device information, and pages visited.</li>
              <li><strong>Communication Data:</strong> Records of your correspondence with us, including inquiries and feedback.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We process your personal information for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>To organize and manage events, workshops, and society activities</li>
              <li>To communicate with you regarding events, updates, and opportunities</li>
              <li>To respond to your inquiries and provide support</li>
              <li>To improve our services and enhance our website functionality</li>
              <li>To send newsletters and updates (only with your explicit consent)</li>
              <li>To maintain membership records and facilitate community engagement</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">3. Legal Basis for Processing</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We process your personal data based on the following legal grounds:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Consent:</strong> When you provide explicit consent for specific processing activities</li>
              <li><strong>Contract Performance:</strong> When necessary for your participation in events or activities</li>
              <li><strong>Legitimate Interests:</strong> To improve our services and communicate with our community members</li>
              <li><strong>Legal Obligations:</strong> When required by applicable laws and regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">4. Data Sharing and Disclosure</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell, rent, or trade your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Service Providers:</strong> With trusted vendors who assist us in operating our website and conducting our activities, under strict confidentiality agreements</li>
              <li><strong>University Partners:</strong> With our affiliated university for institutional purposes and collaborative activities</li>
              <li><strong>Legal Requirements:</strong> When required by law, regulation, or legal process</li>
              <li><strong>With Your Consent:</strong> In any other circumstances with your explicit permission</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">5. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected,
              or as required by applicable laws and regulations. When data is no longer needed, it is securely deleted or anonymized.
              Specific retention periods depend on the nature of the data and our legal obligations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">6. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Under the General Data Protection Regulation (GDPR) and applicable data protection laws, you have the following rights:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Right of Access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your personal data under certain circumstances</li>
              <li><strong>Right to Restriction:</strong> Request limitation of processing activities</li>
              <li><strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format</li>
              <li><strong>Right to Object:</strong> Object to processing of your data for specific purposes</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw your consent at any time where processing is based on consent</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              To exercise any of these rights, please contact us using the information provided in the Contact section below.
              We will respond to your request within the timeframe required by applicable law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">7. Cookies and Similar Technologies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our website may use cookies and similar tracking technologies to enhance user experience and analyze website performance.
              Cookies are small text files stored on your device. You can manage cookie preferences through your browser settings.
              Please note that disabling certain cookies may affect website functionality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">8. Data Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We implement appropriate technical and organizational security measures to protect your personal data against
              unauthorized access, alteration, disclosure, or destruction. These measures include encryption, access controls,
              and regular security assessments. However, no method of transmission over the Internet or electronic storage
              is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">9. Third-Party Links</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our website may contain links to external websites operated by third parties. We are not responsible for the
              privacy practices or content of these external sites. We encourage you to review the privacy policies of any
              third-party websites you visit.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">10. International Data Transfers</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your personal information may be transferred to and processed in countries outside the European Economic Area (EEA).
              When such transfers occur, we ensure appropriate safeguards are in place to protect your data in accordance with
              applicable data protection laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">11. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information
              from children. If you become aware that a child has provided us with personal information, please contact us, and
              we will take steps to delete such information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">12. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to update this Privacy Policy periodically to reflect changes in our practices or applicable
              laws. Material changes will be posted on this page with an updated "Last Updated" date. We encourage you to review
              this policy regularly to stay informed about how we protect your information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">13. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data processing practices,
              please contact us at:
            </p>
            <ul className="list-none text-gray-700 space-y-2">
              <li><strong>Email:</strong> <a href="mailto:parthenope.ml.society@gmail.com" className="text-pmlsRed hover:underline">parthenope.mls@gmail.com</a></li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">14. Supervisory Authority</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the right to lodge a complaint with your local data protection supervisory authority if you believe
              that our processing of your personal data violates applicable data protection laws. For matters within Italy,
              you may contact the Italian Data Protection Authority (Garante per la Protezione dei Dati Personali).
            </p>
          </section>
        </article>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
