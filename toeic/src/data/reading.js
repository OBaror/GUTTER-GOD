export const readingPassages = [
  {
    id: 1,
    title: "IT System Update Notice",
    text: `Dear All Staff,

We are writing to inform you that our company's IT systems will undergo a major update this weekend. The maintenance window will begin on Saturday, November 15th at 10:00 PM and is expected to be completed by Sunday, November 16th at 6:00 AM.

During this period, the following services will be temporarily unavailable: email server, company intranet, cloud storage platform, and the customer relationship management (CRM) system.

The IT department recommends that all employees save their work and log out of all systems before leaving on Friday evening. Any documents that are needed over the weekend should be downloaded and saved locally before the maintenance begins.

After the update, employees will notice several improvements including faster system response times, enhanced security features, and a new user interface for the file management system.

If you experience any technical difficulties after the update is complete, please contact the IT help desk at extension 4400 or send an email to itsupport@company.com.

We apologize for any inconvenience this may cause and thank you for your patience and cooperation.

Best regards,
The IT Department`,
    questions: [
      {
        id: 1,
        question: "When will the maintenance begin?",
        options: ["Friday at 10:00 PM", "Saturday at 10:00 PM", "Sunday at 6:00 AM", "Saturday at 6:00 AM"],
        correct: 1,
        explanation: "Le texte dit: 'The maintenance window will begin on Saturday, November 15th at 10:00 PM'."
      },
      {
        id: 2,
        question: "Which service will NOT be available during maintenance?",
        options: ["Phone system", "Email server", "Printer network", "Security cameras"],
        correct: 1,
        explanation: "Le texte liste: 'email server, company intranet, cloud storage platform, and the CRM system'."
      },
      {
        id: 3,
        question: "What does the IT department recommend employees do before Friday evening?",
        options: ["Work from home", "Contact the help desk", "Save their work and log out", "Download all company files"],
        correct: 2,
        explanation: "Le texte dit: 'save their work and log out of all systems before leaving on Friday evening'."
      },
      {
        id: 4,
        question: "What is one improvement employees will notice after the update?",
        options: ["Lower costs", "Faster system response times", "More storage space", "New computer equipment"],
        correct: 1,
        explanation: "Le texte mentionne: 'faster system response times, enhanced security features, and a new user interface'."
      },
      {
        id: 5,
        question: "How can employees get help after the update?",
        options: ["Visit the IT office", "Call extension 4400", "Send a letter", "Restart their computer"],
        correct: 1,
        explanation: "Le texte dit: 'contact the IT help desk at extension 4400 or send an email to itsupport@company.com'."
      }
    ],
    category: "IT Notice",
    level: "A2",
    wordCount: 198
  },
  {
    id: 2,
    title: "Meeting Room Booking Policy",
    text: `COMPANY MEMORANDUM

To: All Employees
From: Office Management
Subject: Updated Meeting Room Booking Policy
Date: October 1

Following feedback from staff, we have revised our meeting room booking policy. Please read the following guidelines carefully.

BOOKING PROCEDURE
All meeting rooms must be booked in advance using the online calendar system. Walk-in use of meeting rooms is no longer permitted. Rooms can be booked up to two weeks in advance and for a maximum of four hours per session.

CANCELLATION POLICY
If you need to cancel a booking, please do so at least two hours before the scheduled time. Rooms that are not cancelled in advance and remain unused will be recorded. Employees with three or more unused bookings in a month will lose their booking privileges for 30 days.

EQUIPMENT
Each meeting room is equipped with a projector, whiteboard, and video conferencing system. Please report any technical issues to the IT department immediately. Do not attempt to repair equipment yourself.

GENERAL RULES
Food and drinks are permitted in Rooms A and B only. Rooms must be left clean and tidy after each use. The last person to leave must ensure all equipment is switched off.

For questions about this policy, contact office@company.com.`,
    questions: [
      {
        id: 1,
        question: "How far in advance can meeting rooms be booked?",
        options: ["One week", "Two weeks", "One month", "One day"],
        correct: 1,
        explanation: "Le texte dit: 'Rooms can be booked up to two weeks in advance'."
      },
      {
        id: 2,
        question: "What happens if an employee has three unused bookings in a month?",
        options: ["They receive a warning", "They must pay a fine", "They lose booking privileges for 30 days", "They must see a manager"],
        correct: 2,
        explanation: "Le texte dit: 'Employees with three or more unused bookings in a month will lose their booking privileges for 30 days'."
      },
      {
        id: 3,
        question: "Where are food and drinks allowed?",
        options: ["In all meeting rooms", "Only in Room A", "In Rooms A and B", "Nowhere in the building"],
        correct: 2,
        explanation: "Le texte dit: 'Food and drinks are permitted in Rooms A and B only'."
      },
      {
        id: 4,
        question: "What must the last person leaving a room do?",
        options: ["Lock the door", "Call the office", "Switch off all equipment", "Fill out a report"],
        correct: 2,
        explanation: "Le texte dit: 'The last person to leave must ensure all equipment is switched off'."
      }
    ],
    category: "Business Memo",
    level: "A2",
    wordCount: 214
  },
  {
    id: 3,
    title: "Software Development Team Report",
    text: `Q3 PERFORMANCE REPORT
Software Development Department

EXECUTIVE SUMMARY
The Software Development team achieved significant milestones during the third quarter. Despite facing initial challenges with the new agile methodology, the team successfully delivered four major product updates and reduced bug resolution time by 35%.

PROJECT HIGHLIGHTS
Project Alpha, our flagship mobile application update, was launched on schedule on August 15th. The new version includes improved performance, a redesigned user interface, and three new features requested by customers. Initial feedback from users has been overwhelmingly positive, with app store ratings increasing from 3.8 to 4.6 out of 5.

Project Beta, the internal employee management system, encountered delays due to integration issues with the existing HR database. The project is now 12 days behind schedule. The team is working overtime to minimize the impact and expects to complete the project by October 30th.

TEAM DEVELOPMENT
Seven team members completed advanced certification courses in cloud computing and cybersecurity this quarter. These qualifications will strengthen our capabilities for upcoming projects involving cloud migration.

NEXT QUARTER GOALS
For Q4, the team will focus on completing Project Beta, beginning the cloud migration initiative, and improving code review processes to reduce future delays.

Prepared by: Sarah Chen, Development Manager`,
    questions: [
      {
        id: 1,
        question: "By how much did bug resolution time improve?",
        options: ["25%", "35%", "45%", "12%"],
        correct: 1,
        explanation: "Le texte dit: 'reduced bug resolution time by 35%'."
      },
      {
        id: 2,
        question: "What happened to the app store rating after the Project Alpha launch?",
        options: ["It decreased from 4.6 to 3.8", "It increased from 3.8 to 4.6", "It stayed the same", "It reached 5 out of 5"],
        correct: 1,
        explanation: "Le texte dit: 'app store ratings increasing from 3.8 to 4.6 out of 5'."
      },
      {
        id: 3,
        question: "Why was Project Beta delayed?",
        options: ["Lack of staff", "Budget problems", "Integration issues with the HR database", "Customer feedback"],
        correct: 2,
        explanation: "Le texte dit: 'encountered delays due to integration issues with the existing HR database'."
      },
      {
        id: 4,
        question: "What certifications did team members complete?",
        options: ["Project management and leadership", "Cloud computing and cybersecurity", "Data analysis and AI", "Web design and marketing"],
        correct: 1,
        explanation: "Le texte dit: 'advanced certification courses in cloud computing and cybersecurity'."
      },
      {
        id: 5,
        question: "Who wrote this report?",
        options: ["The CEO", "Sarah Chen, Development Manager", "The HR Department", "A consultant"],
        correct: 1,
        explanation: "Le bas du rapport indique: 'Prepared by: Sarah Chen, Development Manager'."
      }
    ],
    category: "Business Report",
    level: "B1",
    wordCount: 253
  },
  {
    id: 4,
    title: "Job Advertisement for IT Manager",
    text: `JOB OPPORTUNITY
IT Infrastructure Manager
TechCorp Solutions – Paris, France

About the Role
TechCorp Solutions is seeking an experienced IT Infrastructure Manager to lead our technical operations team. This is a full-time position based at our Paris headquarters, with occasional travel to our regional offices.

Key Responsibilities
• Oversee the daily management and maintenance of all IT systems, networks, and servers
• Develop and implement IT policies and security procedures
• Manage a team of 8 IT specialists and coordinate with external vendors
• Plan and execute infrastructure upgrades and cloud migration projects
• Prepare monthly reports on system performance and incidents for senior management
• Manage the annual IT budget of €500,000

Required Qualifications
• Bachelor's degree in Computer Science, Information Technology, or related field
• Minimum 5 years of experience in IT management
• Strong knowledge of network administration, cloud platforms (AWS or Azure), and cybersecurity
• Excellent leadership and communication skills
• Fluency in English required; French is an advantage

Salary and Benefits
Competitive salary between €55,000 and €70,000 per year, depending on experience. Benefits include health insurance, 25 days of paid vacation, hybrid work options (3 days in office, 2 days remote), and professional development budget.

How to Apply
Submit your CV and cover letter to careers@techcorp.fr by November 30th. Only shortlisted candidates will be contacted.`,
    questions: [
      {
        id: 1,
        question: "How many IT specialists will the manager oversee?",
        options: ["5", "6", "8", "10"],
        correct: 2,
        explanation: "Le texte dit: 'Manage a team of 8 IT specialists'."
      },
      {
        id: 2,
        question: "What is the minimum experience required for this position?",
        options: ["3 years", "5 years", "7 years", "10 years"],
        correct: 1,
        explanation: "Le texte dit: 'Minimum 5 years of experience in IT management'."
      },
      {
        id: 3,
        question: "What is the annual IT budget this manager will control?",
        options: ["€55,000", "€70,000", "€500,000", "€250,000"],
        correct: 2,
        explanation: "Le texte dit: 'Manage the annual IT budget of €500,000'."
      },
      {
        id: 4,
        question: "What are the hybrid work conditions?",
        options: ["Full remote", "Full time in office", "3 days in office, 2 days remote", "2 days in office, 3 days remote"],
        correct: 2,
        explanation: "Le texte dit: 'hybrid work options (3 days in office, 2 days remote)'."
      },
      {
        id: 5,
        question: "What is the application deadline?",
        options: ["October 30th", "November 15th", "November 30th", "December 1st"],
        correct: 2,
        explanation: "Le texte dit: 'Submit your CV and cover letter to careers@techcorp.fr by November 30th'."
      }
    ],
    category: "Job Advertisement",
    level: "B1",
    wordCount: 267
  },
  {
    id: 5,
    title: "Company Newsletter: Digital Transformation",
    text: `TECHCORP QUARTERLY NEWSLETTER
Special Feature: Our Digital Transformation Journey

Dear Colleagues,

As we approach the end of another successful year, we are excited to share updates on our digital transformation initiative, which has been underway for the past 18 months.

When we launched this initiative, our goal was clear: to modernize our operations, improve efficiency, and better serve our clients. We are pleased to report that we are making excellent progress.

KEY ACHIEVEMENTS THIS YEAR
Our cloud migration is now 70% complete. Moving to cloud-based infrastructure has already reduced our IT operating costs by 22% and improved system availability to 99.8%. The remaining 30% of systems will be migrated in Q1 of next year.

We have also successfully implemented a new AI-powered customer service tool that handles approximately 40% of routine customer inquiries automatically. This has allowed our customer service representatives to focus on more complex issues, resulting in a 28% improvement in customer satisfaction scores.

WHAT'S COMING NEXT
In 2025, we will launch a new integrated enterprise resource planning (ERP) system that will connect all departments – from finance to HR to operations. This single platform will replace six separate legacy systems, significantly reducing data duplication and improving cross-department collaboration.

We will also introduce data analytics dashboards for all department managers, enabling real-time visibility into key performance indicators.

Thank you for your continued support and adaptability during this exciting period of change.

Best regards,
Marc Dupont, Chief Technology Officer`,
    questions: [
      {
        id: 1,
        question: "By how much have IT operating costs been reduced?",
        options: ["15%", "22%", "28%", "40%"],
        correct: 1,
        explanation: "Le texte dit: 'reduced our IT operating costs by 22%'."
      },
      {
        id: 2,
        question: "What percentage of cloud migration is complete?",
        options: ["30%", "50%", "70%", "99.8%"],
        correct: 2,
        explanation: "Le texte dit: 'Our cloud migration is now 70% complete'."
      },
      {
        id: 3,
        question: "How many legacy systems will the new ERP replace?",
        options: ["Three", "Four", "Five", "Six"],
        correct: 3,
        explanation: "Le texte dit: 'This single platform will replace six separate legacy systems'."
      },
      {
        id: 4,
        question: "What does the AI customer service tool handle?",
        options: ["All customer inquiries", "40% of routine customer inquiries", "Complex technical issues", "Employee requests"],
        correct: 1,
        explanation: "Le texte dit: 'handles approximately 40% of routine customer inquiries automatically'."
      }
    ],
    category: "Company Newsletter",
    level: "B1",
    wordCount: 289
  },
  {
    id: 6,
    title: "Business Email: Project Update",
    text: `From: Pierre Martin <p.martin@globaltech.com>
To: Emma Wilson <e.wilson@globaltech.com>
Subject: Project Phoenix - Status Update
Date: Thursday, October 10

Dear Emma,

I hope this email finds you well. I am writing to provide you with a status update on Project Phoenix ahead of tomorrow's executive presentation.

As discussed in last week's meeting, our team has completed the first two phases of the project on schedule. Phase 1 (requirements analysis) was finalized on September 30th, and Phase 2 (system design) was completed last Monday, three days ahead of the original deadline.

However, I need to draw your attention to a potential issue with Phase 3. Two of our key developers are currently sick and we are experiencing a staffing shortage. As a result, the Phase 3 completion date may need to be pushed back by approximately one week, from October 25th to November 1st.

I have taken the following steps to mitigate this risk:
1. Contacted a freelance developer who can start work immediately
2. Redistributed some tasks among the remaining team members
3. Identified non-critical tasks that can be delayed without affecting the main timeline

I believe we can still deliver the project within budget. The current spending is €45,000 against a budget of €60,000, leaving us with €15,000 for any unforeseen costs.

Please let me know if you would like to discuss this further before the presentation. I am available by phone or email at any time.

Kind regards,
Pierre Martin
Senior Project Manager`,
    questions: [
      {
        id: 1,
        question: "Why might Phase 3 be delayed?",
        options: ["Budget problems", "Two key developers are sick", "Equipment failure", "Client changes"],
        correct: 1,
        explanation: "Le texte dit: 'Two of our key developers are currently sick and we are experiencing a staffing shortage'."
      },
      {
        id: 2,
        question: "When was Phase 2 completed?",
        options: ["September 30th", "Last Monday", "October 25th", "November 1st"],
        correct: 1,
        explanation: "Le texte dit: 'Phase 2 (system design) was completed last Monday'."
      },
      {
        id: 3,
        question: "How much of the budget has been spent so far?",
        options: ["€15,000", "€45,000", "€60,000", "€75,000"],
        correct: 1,
        explanation: "Le texte dit: 'The current spending is €45,000 against a budget of €60,000'."
      },
      {
        id: 4,
        question: "What is one action Pierre has taken to mitigate the risk?",
        options: ["Requested more budget", "Contacted a freelance developer", "Cancelled the project", "Hired two new employees"],
        correct: 1,
        explanation: "Le texte dit: 'Contacted a freelance developer who can start work immediately'."
      }
    ],
    category: "Business Email",
    level: "B1",
    wordCount: 276
  },
  {
    id: 7,
    title: "Office Safety Regulations Notice",
    text: `IMPORTANT NOTICE
Fire Safety and Emergency Procedures

All employees are required to familiarize themselves with the updated fire safety and emergency procedures. This notice replaces all previous versions and takes effect immediately.

FIRE ALARM PROCEDURE
In the event of a fire alarm, all employees must stop what they are doing immediately and proceed calmly to the nearest emergency exit. Do not use elevators. Do not stop to collect personal belongings. The assembly point is in the car park on the south side of the building, clearly marked with green signs.

Floor wardens are responsible for ensuring that all persons on their floor evacuate the building. A list of floor wardens is posted on each floor near the elevator.

FIRE EXTINGUISHER LOCATIONS
Fire extinguishers are located at the end of each corridor on every floor. All employees are encouraged to attend the optional fire extinguisher training session offered by the Safety Department each quarter.

EMERGENCY CONTACTS
In an emergency, dial 112 (European emergency number) or contact building security at extension 100. Do not call the main reception line in emergencies.

REPORTING HAZARDS
If you identify any potential fire hazard, such as blocked emergency exits, faulty electrical equipment, or inappropriate storage of flammable materials, report it immediately to the Safety Department at safety@company.com or call extension 200.

Annual fire drills will continue to be held twice per year. Participation is mandatory for all staff.`,
    questions: [
      {
        id: 1,
        question: "Where is the assembly point located?",
        options: ["In the lobby", "On the roof", "In the car park on the south side", "At the main entrance"],
        correct: 2,
        explanation: "Le texte dit: 'The assembly point is in the car park on the south side of the building'."
      },
      {
        id: 2,
        question: "What should employees NOT do during a fire alarm?",
        options: ["Use the emergency exits", "Walk calmly", "Use elevators", "Go to the assembly point"],
        correct: 2,
        explanation: "Le texte dit: 'Do not use elevators'."
      },
      {
        id: 3,
        question: "How often are fire drills held?",
        options: ["Once per year", "Twice per year", "Every quarter", "Every month"],
        correct: 1,
        explanation: "Le texte dit: 'Annual fire drills will continue to be held twice per year'."
      },
      {
        id: 4,
        question: "What number should employees call in an emergency?",
        options: ["100", "112", "200", "999"],
        correct: 1,
        explanation: "Le texte dit: 'In an emergency, dial 112 (European emergency number)'."
      }
    ],
    category: "Safety Notice",
    level: "A2",
    wordCount: 238
  },
  {
    id: 8,
    title: "Conference Announcement",
    text: `ANNUAL TECHNOLOGY SUMMIT 2025
Innovation in the Digital Age

We are pleased to announce that registration is now open for the Annual Technology Summit 2025, to be held on March 18-20 at the Paris Convention Centre.

This year's theme, "Innovation in the Digital Age," will explore the latest developments in artificial intelligence, cybersecurity, cloud computing, and digital transformation strategies for businesses of all sizes.

KEYNOTE SPEAKERS
This year's summit features an impressive lineup of industry leaders:
• Dr. Isabelle Moreau, Professor of AI Ethics at Sciences Po
• James Harrison, Chief Innovation Officer at GlobalTech Inc.
• Yuki Tanaka, Founder of CyberShield Security

PROGRAM HIGHLIGHTS
Day 1: Opening ceremony, AI in Business panel discussion, and networking dinner
Day 2: Workshops on cloud migration strategies, cybersecurity best practices, and data governance
Day 3: Start-up showcase, future technology trends presentation, and closing ceremony

REGISTRATION INFORMATION
Early bird registration (before January 31st): €299 per person
Standard registration (February 1st onwards): €450 per person
Group discount: 15% off for groups of 5 or more

Registration includes access to all sessions, workshop materials, breakfast and lunch on all three days, and the networking dinner on Day 1.

To register, visit www.techsummit2025.fr or contact us at info@techsummit2025.fr.

Limited spaces available – we recommend registering early to avoid disappointment.`,
    questions: [
      {
        id: 1,
        question: "How long does the Technology Summit last?",
        options: ["One day", "Two days", "Three days", "One week"],
        correct: 2,
        explanation: "Le texte dit: 'to be held on March 18-20', soit 3 jours."
      },
      {
        id: 2,
        question: "What is the early bird registration price?",
        options: ["€199", "€299", "€450", "€380"],
        correct: 1,
        explanation: "Le texte dit: 'Early bird registration (before January 31st): €299 per person'."
      },
      {
        id: 3,
        question: "What discount is available for large groups?",
        options: ["10%", "15%", "20%", "25%"],
        correct: 1,
        explanation: "Le texte dit: 'Group discount: 15% off for groups of 5 or more'."
      },
      {
        id: 4,
        question: "What is included in the registration fee?",
        options: ["Accommodation and flights", "Access to all sessions and meals", "Only workshop access", "Just the opening ceremony"],
        correct: 1,
        explanation: "Le texte dit: 'access to all sessions, workshop materials, breakfast and lunch on all three days, and the networking dinner'."
      },
      {
        id: 5,
        question: "Who is the Founder of CyberShield Security?",
        options: ["Dr. Isabelle Moreau", "James Harrison", "Yuki Tanaka", "Marc Dupont"],
        correct: 2,
        explanation: "Le texte dit: 'Yuki Tanaka, Founder of CyberShield Security'."
      }
    ],
    category: "Conference Notice",
    level: "B1",
    wordCount: 262
  }
];

export const readingCategories = ["IT Notice", "Business Memo", "Business Report", "Job Advertisement", "Company Newsletter", "Business Email", "Safety Notice", "Conference Notice"];
