import React, { useEffect } from 'react'

export const TermsPage = () => {
    // document title
    useEffect(() => {
        document.title = "Terms and Conditions - Redhope"
    }, []);
    return (
        <div className='container'>
            <h1 className='mb-4'>Terms and Conditions</h1>
            <p><strong>Effective Date:</strong> 18/04/2025</p>
            <p>Welcome to Redhope! By using our website, you agree to comply with and be bound by the following terms and conditions. Please review them carefully.</p>

            <h4>1. Use of Our Services</h4>
            <ul>
                <li>You must be at least 18 years old to use our services.</li>
                <li>Users must provide accurate and truthful information.</li>
                <li>We reserve the right to refuse service to anyone for any reason.</li>
            </ul>

            <h4>2. User Responsibilities</h4>
            <ul>
                <li>Users must respect and comply with all applicable laws and regulations.</li>
                <li>Donors must ensure they meet the eligibility criteria before donating blood.</li>
                <li>Recipients must use donor information solely for the intended purpose.</li>
            </ul>

            <h4>3. Limitation of Liability</h4>
            <p>We do not guarantee the availability, accuracy, or reliability of donor and recipient information. We are not responsible for any consequences resulting from blood donation or recipient actions.</p>

            <h4>4. Privacy and Data Protection</h4>
            <p>Our Privacy Policy explains how we collect and use your data. By using our website, you consent to our data practices.</p>

            <h4>5. Modifications to Terms</h4>
            <p>We reserve the right to update or modify these terms at any time. Continued use of our services constitutes acceptance of the revised terms.</p>

            <h4>6. Termination</h4>
            <p>We may suspend or terminate your access to our website if you violate these terms or engage in inappropriate conduct.</p>

            <h4>7. Contact Us</h4>
            <p>If you have any questions about these Terms and Conditions, please contact us at <a href="mailto:redhope.phoenix@gmail.com?subject=Enqury%20about%20Redhope" className='ph-url-colored'>redhope.phoenix@gmail.com</a>.</p>
        </div>
    )
}
