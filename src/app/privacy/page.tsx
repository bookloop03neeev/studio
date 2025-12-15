
export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 md:py-20">
      <div className="prose prose-lg mx-auto max-w-none text-foreground/90">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-4">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        
        <p>
          Your privacy is important to us. It is BookLoop's policy to respect your privacy regarding any information we may collect from you across our website.
        </p>

        <h2 className="text-2xl font-bold font-headline text-primary">Information We Collect</h2>
        <p>
          We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
        </p>
        <p>
          The personal information that we may collect includes your name, email address, and any other information you choose to provide. When you create an account, we also store your user credentials securely.
        </p>

        <h2 className="text-2xl font-bold font-headline text-primary">How We Use Your Information</h2>
        <p>
          We use the information we collect in various ways, including to:
        </p>
        <ul>
          <li>Provide, operate, and maintain our website</li>
          <li>Improve, personalize, and expand our website</li>
          <li>Understand and analyze how you use our website</li>
          <li>Develop new products, services, features, and functionality</li>
          <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
          <li>Send you emails</li>
          <li>Find and prevent fraud</li>
        </ul>

        <h2 className="text-2xl font-bold font-headline text-primary">Security</h2>
        <p>
          The security of your personal information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
        </p>
        
        <h2 className="text-2xl font-bold font-headline text-primary">Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
        </p>
      </div>
    </div>
  );
}
