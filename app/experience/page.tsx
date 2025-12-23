'use client';
import Timeline from '../components/timeline';
import CSSWaves from '../components/CSSWaves';

export default function Experience() {
  return (
    <CSSWaves className="relative min-h-screen">
      <div className="min-h-screen py-20">
        <div className="max-w-6xl mx-auto px-4">
          <Timeline 
            title="experience" 
          items={[
            {
              title: "president",
              subtitle: "Florida Elite Athletics",
              date: "2025 - present",
              description: "Help under served athletes around South Florida get the resources needed to succeed.",
              expandedDescription: [
                "Help under served athletes around South Florida get the resources needed to succeed.",
                "Work with a team of 4 to create dreams come true for kids in the community of Broward County."
              ]
            },
            {
              title: "founder",
              subtitle: "jtutors",
              date: "sept 2024 - present",
              description: "Led and managed a team of three, coordinating meetings, scheduling, and individualized lesson planning.",
              expandedDescription: [
                "Led and managed a team of three, driving efficient coordination of meetings, scheduling, and individualized lesson planning to ensure seamless weekly execution of tutoring programs.",
                "Delivered measurable results for 62+ students in mathematics, with SAT students achieving an average 20-percentile score increase and classroom students improving by an average of 20% in overall grades."
              ]
            },
            {
              title: "software engineer intern",
              subtitle: "blackstone",
              date: "apr 2024 - sept 2024",
              description: "Invited as 1 of 20 university students to gain insight and mentorship from engineers at Blackstone.",
              expandedDescription: [
                "Invited as 1 of 20 university students to participate in gaining valuable insight and mentorship from engineers at Blackstone.",
                "Optimized Python-based back-end for the finance department, refactoring critical data pipelines and improving database queries, which reduced end-of-day report generation time by 30% and increased the reliability of financial data processing."
              ]
            },
            {
              title: "software engineer intern",
              subtitle: "Capitol Steel Structures",
              tech: ["python", "mongodb", "django", "html", "css", "stripe"],
              date: "jan 2023 - aug 2023",
              description: "Designed and implemented an ecommerce platform using MongoDB and Django.",
              expandedDescription: [
                "Solely designed and implemented a comprehensive customer database using MongoDB and Django, streamlining data management and operational workflows to support increased client volume.",
                "Built and launched the company's first e-commerce website using Python, HTML/CSS, and Stripe for payment processing, enabling online sales of steel products and generating $273,000 in revenue in the first year."
              ]
            },
            {
              title: "division lead",
              subtitle: "mdc esports",
              date: "jan 2023 - dec 2023",
              description: "Orchestrated and coordinated all project phases, managing large-scale events with up to 30 attendees.",
              expandedDescription: [
                "Orchestrated and coordinated all project phases, managing large-scale events with up to 30 attendees and ensuring flawless execution through strategic design and scheduling.",
                "Directed and supervised a 12-member team in a previously unranked program, elevating it to national recognition, achieving Top 200 in the United States and Top 50 in the Southeast, while demonstrating strong leadership and organizational skills."
              ]
            }
          ]} 
        /> 
        </div>
      </div>
    </CSSWaves>
  );
}
