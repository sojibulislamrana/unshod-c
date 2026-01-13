
import React from 'react';

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p>
          Welcome to UniShop! These terms and conditions outline the rules and regulations for the use of UniShop's Website.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-8">License</h2>
        <p>
          Unless otherwise stated, UniShop and/or its licensors own the intellectual property rights for all material on UniShop. 
          All intellectual property rights are reserved. You may access this from UniShop for your own personal use subjected to 
          restrictions set in these terms and conditions.
        </p>

        <h2 className="text-2xl font-semibold text-foreground mt-8">You must not:</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Republish material from UniShop</li>
          <li>Sell, rent or sub-license material from UniShop</li>
          <li>Reproduce, duplicate or copy material from UniShop</li>
          <li>Redistribute content from UniShop</li>
        </ul>

        <h2 className="text-2xl font-semibold text-foreground mt-8">Disclaimer</h2>
        <p>
          To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website.
        </p>
      </div>
    </div>
  );
}
