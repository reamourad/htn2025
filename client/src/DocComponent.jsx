import React from "react";

export const DocComponent = () => {
  return (
    <div className="flex flex-col w-full max-w-2xl gap-4">
      <div className="collapse bg-base-100 border border-base-300 rounded-lg">
        <input type="radio" name="faq-accordion" defaultChecked />
        <div className="collapse-title font-semibold text-lg">
          How do I create an account?
        </div>
        <div className="collapse-content text-sm">
          Click the "Sign Up" button in the top right corner and follow the registration process.
        </div>
      </div>

      <div className="collapse bg-base-100 border border-base-300 rounded-lg">
        <input type="radio" name="faq-accordion" />
        <div className="collapse-title font-semibold text-lg">
          I forgot my password. What should I do?
        </div>
        <div className="collapse-content text-sm">
          Click on "Forgot Password" on the login page and follow the instructions sent to your email.
        </div>
      </div>

      <div className="collapse bg-base-100 border border-base-300 rounded-lg">
        <input type="radio" name="faq-accordion" />
        <div className="collapse-title font-semibold text-lg">
          How do I update my profile information?
        </div>
        <div className="collapse-content text-sm">
          Go to "My Account" settings and select "Edit Profile" to make changes.
        </div>
      </div>
    </div>
  );
};


export default DocComponent;