// src/app/not-found.js
import "@/styles/dashboard.css"

export default function NotFound() {
    return (
      <div className="utility-page-wrap">
        <div className="utility-page-content w-form">
          <img
            src="https://assets.website-files.com/6057ab51530cb39d3fdac75d/61829f1c7219191b99cca9a9_404%20Page%20Icon-min.png"
            alt="404 Icon"
            className="utility-page-icon"
          />
          <h2 className="heading">Page Not Found</h2>
          <div className="message">The page you are looking for doesn't exist or has been moved.</div>
          <a href="/" className="back-to-home text-primary-blue w-inline-block">
            <img
              src="https://assets.website-files.com/6057ab51530cb39d3fdac75d/605882ca05647eaa4efc7001_arrow-left.svg"
              alt="Back Icon"
              className="back-icon"
            />
            <div>Back to Home</div>
          </a>
        </div>
      </div>
    );
  }
  