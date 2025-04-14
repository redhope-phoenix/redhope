import React, { useEffect } from 'react'

export const PrivacyPolicyPage = () => {
    // document title
    useEffect(() => {
        document.title = "Privacy policy - Redhope"
    }, []);
    return (
        <div className='container'>
            <h1 className='mb-4'>Privacy Policy</h1>
            <p><strong>Effective Date:</strong> 18/04/2025</p>
            <p>Welcome to Redhope ("we," "our," or "us"). Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.</p>

            <h4>1. Information We Collect</h4>
            <ul>
                <li><strong>Personal Information:</strong> Name, phone number, email address, blood type, and location.</li>
                <li><strong>Health Information:</strong> Blood donation history and eligibility.</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our website.</li>
            </ul>

            <h4>2. How We Use Your Information</h4>
            <ul>
                <li>Connect blood donors with recipients in need.</li>
                <li>Share donor contact details with recipients upon consent.</li>
                <li>Improve and personalize our services.</li>
                <li>Communicate updates, notifications, or urgent requests.</li>
            </ul>

            <h4>3. Information Sharing and Disclosure</h4>
            <ul>
                <li>Donor contact details are only shared with recipients upon explicit consent.</li>
                <li>We do not sell or rent personal data to third parties.</li>
                <li>We may share data if required by law or to protect rights, property, or safety.</li>
            </ul>

            <h4>4. Data Security</h4>
            <p>We implement appropriate security measures to protect your personal data from unauthorized access, alteration, or disclosure. However, no online platform can guarantee absolute security.</p>

            <h4>5. Your Rights and Choices</h4>
            <ul>
                <li>Access, update, or delete your personal information.</li>
                <li>Withdraw consent for data sharing at any time.</li>
                <li>Request information about how your data is used.</li>
            </ul>

            <h4>6. Changes to This Privacy Policy</h4>
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.</p>

            <h4>7. Contact Us</h4>
            <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:redhope.phoenix@gmail.com?subject=Enqury%20about%20Redhope" className='ph-url-colored'>redhope.phoenix@gmail.com</a>.</p>
        </div>
    )
}
