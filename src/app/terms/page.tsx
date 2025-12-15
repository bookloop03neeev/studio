
export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 md:py-20">
      <div className="prose prose-lg mx-auto max-w-none text-foreground/90">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-4">
          Terms of Service
        </h1>
        <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        
        <p>
          Welcome to BookLoop! These terms and conditions outline the rules and regulations for the use of BookLoop's Website. By accessing this website we assume you accept these terms and conditions. Do not continue to use BookLoop if you do not agree to take all of the terms and conditions stated on this page.
        </p>

        <h2 className="text-2xl font-bold font-headline text-primary">License</h2>
        <p>
          Unless otherwise stated, BookLoop and/or its licensors own the intellectual property rights for all material on BookLoop. All intellectual property rights are reserved. You may access this from BookLoop for your own personal use subjected to restrictions set in these terms and conditions.
        </p>
        <p>You must not:</p>
        <ul>
          <li>Republish material from BookLoop</li>
          <li>Sell, rent or sub-license material from BookLoop</li>
          <li>Reproduce, duplicate or copy material from BookLoop</li>
          <li>Redistribute content from BookLoop</li>
        </ul>

        <h2 className="text-2xl font-bold font-headline text-primary">User Content</h2>
        <p>
          Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. BookLoop does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of BookLoop, its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions.
        </p>

        <h2 className="text-2xl font-bold font-headline text-primary">Disclaimer</h2>
        <p>
          To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
        </p>
        <ul>
            <li>limit or exclude our or your liability for death or personal injury;</li>
            <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
            <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
            <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
        </ul>
        <p>
            The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.
        </p>
      </div>
    </div>
  );
}
