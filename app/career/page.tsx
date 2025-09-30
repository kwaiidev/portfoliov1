import Timeline from '@/app/components/timeline';

export default function Career() {
  const experiences = [
    {
      title: "software engineer intern",
      subtitle: "blackstone",
      date: "2024",
      description: [
        "invited as 1 of 20 university students to participate in gaining valuable insight and mentorship from engineers at blackstone.",
        "optimized Python-based back-end for the finance department, refactoring critical data pipelines and improving database queries, which reduced end-of-day report generation time by 30% and increased the reliability of financial data processing."
      ]
    },
    {
      title: "software engineer intern",
      subtitle: "Capitol Steel Structures",
      date: "2023",
      description: [
        "solely designed and implemented a comprehensive customer database using MongoDB and Django, streamlining data management and operational workflows to support increased client volume.",
        "Built and launched the company's first e-commerce website using Python, HTML/CSS, and Stripe for payment processing, enabling online sales of steel products and generating $273,000 in revenue in the first year"
      ]
    },
    {
      title: "founder",
      subtitle: "jtutors",
      date: "2022-2024",
      description: [
        "Led and managed a team of three, driving efficient coordination of meetings, scheduling, and individualized lesson planning to ensure seamless weekly execution of tutoring programs.",
        "Delivered measurable results for 62+ students in mathematics, with SAT students achieving an average 20-percentile score increase and classroom students improving by an average of 20% in overall grades."
      ]
    },
    {
      title: "division lead",
      subtitle: "mdc esports",
      date: "2021-2023",
      description: [
        "orchestrated and coordinated all project phases, managing large-scale events with up to 30 attendees and ensuring flawless execution through strategic design and scheduling.",
        "directed and supervised a 12-member team in a previously unranked program, elevating it to national recognition, achieving Top 200 in the United States and Top 50 in the Southeast, while demonstrating strong leadership and organizational skills."
      ]
    },
    {
        title: "president",
        subtitle: "Florida Elite Athletics",
        date: "2020-2022",
        description: [
            "Help under served athletes around South Florida get the resources needed to succeed."
        ]
    }
  ];

  return <Timeline title="experience" items={experiences} />;
}
