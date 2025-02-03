"use client";

export default function InfoCard({caption , value }) {
  return (
    <div className="module">
      <div className="content-chart">
        <div className="chart-square">
          <img
            src={`/${caption}.svg`}
            loading="lazy"
            alt={caption}
            className="icon"
            style={{
              width: '40px',          // Set the desired width
              height: '40px',         // Set the desired height
              borderRadius: '8px',    // Optional: Add rounded corners
              padding: '8px'          // Optional: Add padding around the SVG
            }}
          />
          <div className="light-fill"></div>
        </div>
        <div className="div-block">
          <div className="caption">{caption}</div>
          <div className="numbers-wrapper">
            <h3 className="number">{value}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
