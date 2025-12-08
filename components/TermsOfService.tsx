import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface TermsOfServiceProps {
  onBack: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBack }) => {
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
          <h1 className="font-serif text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-gray-500 text-sm mb-8">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <section className="mb-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              By accessing our website and participating in our activities, you agree to comply with and be bound by these Terms of Service. Please read these terms carefully before using our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By accessing and using the PMLS website, attending our events, or participating in our activities, you acknowledge that you have read,
              understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please refrain
              from using our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">2. About PMLS</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              PMLS is a student organization affiliated with the University of Naples "Parthenope" dedicated to promoting education, research,
              and community engagement in machine learning and artificial intelligence. We organize workshops, seminars, projects, and networking
              events for students, researchers, and professionals interested in these fields.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">3. Membership and Participation</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>3.1 Eligibility:</strong> Membership and participation in PMLS activities are generally open to students, faculty,
              and professionals with an interest in machine learning and artificial intelligence. Specific events may have additional eligibility requirements.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>3.2 Code of Conduct:</strong> All members and participants are expected to conduct themselves professionally and respectfully.
              Harassment, discrimination, or disruptive behavior will not be tolerated and may result in removal from events and termination of membership.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>3.3 Registration:</strong> Some events may require advance registration. Registration does not guarantee admission if capacity limits are reached.
              We reserve the right to refuse registration or admission to any individual at our discretion.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">4. Website Use</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>4.1 Permitted Use:</strong> You may use our website for lawful purposes only. You agree not to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon intellectual property rights of PMLS or third parties</li>
              <li>Transmit any harmful code, viruses, or malicious software</li>
              <li>Attempt to gain unauthorized access to our systems or networks</li>
              <li>Engage in any activity that disrupts or interferes with our website or services</li>
              <li>Collect or harvest personal information of other users without consent</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>4.2 Account Security:</strong> If you create an account on our platform, you are responsible for maintaining the confidentiality
              of your account credentials and for all activities that occur under your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">5. Intellectual Property Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>5.1 Our Content:</strong> All content on the PMLS website, including text, graphics, logos, images, videos, and software,
              is the property of PMLS or its content suppliers and is protected by copyright, trademark, and other intellectual property laws.
              You may not reproduce, distribute, modify, or create derivative works without our express written permission.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>5.2 User-Generated Content:</strong> By submitting content to PMLS (including project submissions, comments, or forum posts),
              you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and distribute such content for purposes
              related to our organization's activities.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>5.3 Trademarks:</strong> "Parthenope Machine Learning Society," "PMLS," and related logos are trademarks of our organization.
              Use of these trademarks without permission is strictly prohibited.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">6. Events and Activities</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>6.1 Event Modifications:</strong> We reserve the right to modify, reschedule, or cancel any event at our discretion.
              We will make reasonable efforts to notify registered participants of any changes.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>6.2 Photography and Recording:</strong> Events may be photographed, recorded, or livestreamed for promotional and educational purposes.
              By attending our events, you consent to being photographed or recorded and to the use of such materials by PMLS.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>6.3 Third-Party Speakers:</strong> Opinions expressed by guest speakers or external presenters do not necessarily reflect
              the views of PMLS or the University of Naples "Parthenope."
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">7. Educational Content and Materials</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>7.1 No Professional Advice:</strong> Content provided by PMLS, including tutorials, workshops, and educational materials,
              is for informational and educational purposes only. It does not constitute professional advice and should not be relied upon as such.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>7.2 Accuracy:</strong> While we strive to provide accurate and up-to-date information, we make no warranties regarding
              the completeness, reliability, or accuracy of any content. Technology and best practices evolve rapidly, and materials may become outdated.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">8. Disclaimers and Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>8.1 "As Is" Basis:</strong> Our website and services are provided on an "as is" and "as available" basis without warranties
              of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose,
              or non-infringement.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>8.2 Limitation of Liability:</strong> To the maximum extent permitted by law, PMLS, its officers, members, and affiliates
              shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues,
              whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Your use or inability to use our website or services</li>
              <li>Any unauthorized access to or use of our servers or any personal information stored therein</li>
              <li>Any interruption or cessation of transmission to or from our website</li>
              <li>Any bugs, viruses, or similar harmful code transmitted through our website by third parties</li>
              <li>Any errors or omissions in content or for any loss or damage incurred as a result of your use of any content</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">9. Third-Party Links and Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our website may contain links to third-party websites or services that are not owned or controlled by PMLS. We have no control over,
              and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You acknowledge
              and agree that PMLS shall not be liable for any damage or loss caused by or in connection with the use of any such third-party content or services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">10. Indemnification</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree to indemnify, defend, and hold harmless PMLS, its officers, members, affiliates, and partners from and against any claims,
              liabilities, damages, losses, and expenses, including reasonable legal fees, arising out of or in any way connected with:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Your access to or use of our website and services</li>
              <li>Your violation of these Terms of Service</li>
              <li>Your violation of any rights of another party</li>
              <li>Any content you submit or contribute</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">11. Privacy and Data Protection</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your use of our services is also governed by our Privacy Policy, which is incorporated into these Terms of Service by reference.
              Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">12. Modifications to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to modify these Terms of Service at any time. Material changes will be posted on this page with an updated
              "Last Updated" date. Your continued use of our website and services after any modifications indicates your acceptance of the updated terms.
              We encourage you to review these terms periodically.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">13. Termination</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to terminate or suspend your access to our website and services, without prior notice or liability, for any reason,
              including but not limited to breach of these Terms of Service. Upon termination, your right to use our services will immediately cease.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">14. Governing Law and Dispute Resolution</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms of Service shall be governed by and construed in accordance with the laws of Italy, without regard to its conflict of law provisions.
              Any disputes arising from or relating to these terms or our services shall be subject to the exclusive jurisdiction of the courts of Naples, Italy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">15. Severability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If any provision of these Terms of Service is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue
              in full force and effect. The invalid or unenforceable provision shall be replaced with a valid provision that most closely matches
              the intent of the original provision.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">16. Entire Agreement</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms of Service, together with our Privacy Policy, constitute the entire agreement between you and PMLS regarding the use
              of our website and services, and supersede any prior agreements or understandings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">17. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions, concerns, or feedback regarding these Terms of Service, please contact us at:
            </p>
            <ul className="list-none text-gray-700 space-y-2">
              <li><strong>Email:</strong> <a href="mailto:parthenope.ml.society@gmail.com" className="text-pmlsRed hover:underline">parthenope.mls@gmail.com</a></li>
            </ul>
          </section>

          <section className="mb-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              Thank you for being part of the Parthenope Machine Learning Society community. We look forward to your participation in our activities
              and your contributions to advancing machine learning education and research.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
};

export default TermsOfService;
