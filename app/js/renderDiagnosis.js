export function renderDiagnosis(container, diagnosis) {
  const recommendation = diagnosis.recommendationPackage;
  const confidence = diagnosis.confidenceProfile;

  container.innerHTML = `
    <section class="diagnosis-card">
      <h2>Diagnosis</h2>

      <p><strong>Primary hypothesis:</strong> ${
        diagnosis.primaryHypothesis?.label || "None"
      }</p>

      <p><strong>Primary strategy:</strong> ${
        recommendation.primary.label
      }</p>

      <p><strong>Recommendation mode:</strong> ${
        recommendation.modeLabel
      }</p>

      <p><strong>Confidence:</strong> ${
        confidence.overall.label
      } (${confidence.overall.score})</p>

      <h3>Likely Issues</h3>
      <ul>
        ${
          diagnosis.likelyIssues.length
            ? diagnosis.likelyIssues.map(issue => `<li>${issue}</li>`).join("")
            : "<li>None detected</li>"
        }
      </ul>

      <h3>Recommendation</h3>
      <p>${recommendation.primary.message}</p>

      ${
        recommendation.tacticalLevers?.length
          ? `
            <h3>Tactical Levers</h3>
            <ul>
              ${recommendation.tacticalLevers
                .map(
                  lever => `
                    <li>
                      <strong>${lever.label}</strong><br>
                      ${lever.description}
                    </li>
                  `
                )
                .join("")}
            </ul>
          `
          : ""
      }

      ${
        recommendation.safetyCaveats.length
          ? `
            <h3>Safety Caveats</h3>
            <ul>
              ${recommendation.safetyCaveats
                .map(caveat => `<li>${caveat}</li>`)
                .join("")}
            </ul>
          `
          : ""
      }

      <p><strong>Next review:</strong> ${
        recommendation.nextReviewPoint
      }</p>
    </section>
  `;
}