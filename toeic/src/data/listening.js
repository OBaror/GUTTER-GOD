export const listeningExercises = [
  {
    id: 1,
    title: "IT Department Meeting",
    transcript: `Good morning everyone. Thank you for joining this Monday morning briefing. I have three main items on today's agenda. First, I want to remind everyone that the server maintenance is scheduled for this Friday evening starting at eight PM. All systems will be offline for approximately four hours. Please make sure to save your work and close all applications before you leave on Friday. Second, we have received approval to purchase ten new laptop computers for the development team. The procurement process will begin next week. If you need a new laptop, please submit your request to me by Wednesday. Third, I am pleased to announce that our help desk response time has improved by forty percent this month. This is excellent work by the team. That is all for today. If you have questions, please see me after the meeting.`,
    questions: [
      {
        id: 1,
        question: "When is the server maintenance scheduled?",
        options: ["Thursday evening", "Friday evening at 8 PM", "Saturday morning", "Monday at 8 AM"],
        correct: 1,
        explanation: "Le transcript dit: 'the server maintenance is scheduled for this Friday evening starting at eight PM'."
      },
      {
        id: 2,
        question: "How many new laptops will be purchased?",
        options: ["Five", "Eight", "Ten", "Twelve"],
        correct: 2,
        explanation: "Le transcript dit: 'we have received approval to purchase ten new laptop computers'."
      },
      {
        id: 3,
        question: "By how much has help desk response time improved?",
        options: ["20%", "30%", "40%", "50%"],
        correct: 2,
        explanation: "Le transcript dit: 'our help desk response time has improved by forty percent this month'."
      }
    ],
    type: "talk",
    level: "A2"
  },
  {
    id: 2,
    title: "Office Voicemail Message",
    transcript: `Hello, this is a message for David Chen. My name is Sandra Williams from the IT helpdesk. I am calling regarding your support ticket number five three seven two about the email synchronization problem you reported yesterday. We have identified the issue. It appears that your email client needs to be updated to the latest version. I will need approximately twenty minutes of your time to fix this remotely. Could you please call me back at extension two four zero zero to arrange a convenient time? I am available today between two and five PM, or tomorrow from nine AM to twelve noon. I look forward to hearing from you. Thank you and have a great day.`,
    questions: [
      {
        id: 1,
        question: "Why is Sandra calling?",
        options: ["To schedule a meeting", "Regarding a support ticket about email problems", "To announce a system update", "To confirm a delivery"],
        correct: 1,
        explanation: "Sandra appelle concernant le ticket de support sur le problème de synchronisation email."
      },
      {
        id: 2,
        question: "What is the solution to David's problem?",
        options: ["Replace the computer", "Update the email client", "Reset the password", "Change the email address"],
        correct: 1,
        explanation: "Le transcript dit: 'your email client needs to be updated to the latest version'."
      },
      {
        id: 3,
        question: "When is Sandra available today?",
        options: ["9 AM to 12 noon", "1 PM to 4 PM", "2 PM to 5 PM", "All day"],
        correct: 2,
        explanation: "Le transcript dit: 'I am available today between two and five PM'."
      }
    ],
    type: "announcement",
    level: "A2"
  },
  {
    id: 3,
    title: "Project Team Conversation",
    transcript: `Woman: Hi Mark, do you have a minute? I need to talk to you about the client presentation next week.
Man: Of course, Sarah. What's on your mind?
Woman: Well, I was reviewing the slides this morning and I noticed we are missing the cost analysis section. Did you finish that?
Man: Oh, I meant to tell you about that. I sent it to you by email last Thursday, but perhaps it went to your spam folder.
Woman: Let me check... You're right, here it is. Sorry about that. It looks good. But I have one more concern. The client asked us to include a comparison with our competitors. We don't have that yet.
Man: I know. I planned to work on it this afternoon. I should have it ready by tomorrow morning. Is that okay?
Woman: That works for me. Can you also make sure all the charts use the company colors? The last presentation had some inconsistencies.
Man: Absolutely. I'll fix those at the same time. Shall we meet Thursday afternoon to do a final review?
Woman: Thursday at three PM would be perfect. I'll send you a calendar invitation.`,
    questions: [
      {
        id: 1,
        question: "What is missing from the presentation?",
        options: ["The introduction", "The cost analysis section", "The contact information", "The timeline"],
        correct: 1,
        explanation: "Sarah dit: 'we are missing the cost analysis section'."
      },
      {
        id: 2,
        question: "Why didn't Sarah receive the email?",
        options: ["Mark forgot to send it", "It went to her spam folder", "She deleted it", "The email address was wrong"],
        correct: 1,
        explanation: "Mark dit: 'perhaps it went to your spam folder'."
      },
      {
        id: 3,
        question: "When will they have a final review meeting?",
        options: ["Thursday at 2 PM", "Thursday at 3 PM", "Friday morning", "Next Monday"],
        correct: 1,
        explanation: "Sarah dit: 'Thursday at three PM would be perfect'."
      }
    ],
    type: "conversation",
    level: "B1"
  },
  {
    id: 4,
    title: "Company Announcement: New Policy",
    transcript: `Attention all GlobalTech employees. This is an important announcement from the Human Resources Department. Starting on the first of next month, the company will introduce a new flexible working policy. Under this policy, employees will have the option to work from home up to three days per week. However, all employees must be in the office on Tuesdays and Thursdays for team collaboration days. To participate in the flexible working program, you must complete a short online registration form available on the company intranet by the fifteenth of this month. Managers will approve all requests within five business days. Please note that participation in this program requires a satisfactory performance review. Employees on performance improvement plans are not eligible at this time. For more information, please contact the HR department at hr@globaltech.com or attend one of our information sessions, which will be held every Tuesday at noon in Conference Room B throughout this month.`,
    questions: [
      {
        id: 1,
        question: "How many days per week can employees work from home?",
        options: ["One day", "Two days", "Three days", "Four days"],
        correct: 2,
        explanation: "L'annonce dit: 'employees will have the option to work from home up to three days per week'."
      },
      {
        id: 2,
        question: "Which days must employees be in the office?",
        options: ["Mondays and Fridays", "Tuesdays and Thursdays", "Wednesdays only", "Every day"],
        correct: 1,
        explanation: "L'annonce dit: 'all employees must be in the office on Tuesdays and Thursdays'."
      },
      {
        id: 3,
        question: "What is the deadline for the registration form?",
        options: ["The first of the month", "The fifteenth of the month", "The last day of the month", "Within five business days"],
        correct: 1,
        explanation: "L'annonce dit: 'you must complete a short online registration form... by the fifteenth of this month'."
      }
    ],
    type: "announcement",
    level: "A2"
  },
  {
    id: 5,
    title: "Client Meeting Discussion",
    transcript: `Man: Good afternoon everyone. Thank you for joining us today. I know you're all busy, so I'll get straight to the point. We've been reviewing your current IT infrastructure and we've identified several areas where we can help you improve efficiency and reduce costs.
Woman: That sounds interesting. What specifically did you find?
Man: Well, first of all, your current data backup system is outdated. You're backing up data only once per day, which means if there's a system failure in the afternoon, you could lose an entire morning's work. We recommend implementing continuous backup solutions.
Woman: How much would that cost?
Man: The initial setup cost is around fifteen thousand euros, but you'd save approximately eight thousand euros per year in potential data recovery costs. The investment pays for itself in less than two years.
Woman: What about our server infrastructure?
Man: That's our second point. Three of your servers are more than seven years old and are running at ninety percent capacity. We strongly recommend upgrading these before you experience a serious outage.
Woman: I see. Can you prepare a detailed proposal with all costs and timelines?
Man: Of course. We'll have that ready for you by end of week.`,
    questions: [
      {
        id: 1,
        question: "How often does the client currently back up their data?",
        options: ["Once per week", "Twice per day", "Once per day", "Continuously"],
        correct: 2,
        explanation: "Le transcript dit: 'You're backing up data only once per day'."
      },
      {
        id: 2,
        question: "How much does the continuous backup solution cost to set up?",
        options: ["€8,000", "€15,000", "€23,000", "€7,500"],
        correct: 1,
        explanation: "Le transcript dit: 'The initial setup cost is around fifteen thousand euros'."
      },
      {
        id: 3,
        question: "What is the problem with the servers?",
        options: ["They are too expensive", "They are more than 7 years old and running at 90% capacity", "They are incompatible with new software", "They are located in the wrong building"],
        correct: 1,
        explanation: "Le transcript dit: 'Three of your servers are more than seven years old and are running at ninety percent capacity'."
      }
    ],
    type: "conversation",
    level: "B1"
  },
  {
    id: 6,
    title: "Training Session Introduction",
    transcript: `Welcome to the Introduction to Cybersecurity workshop. My name is Professor Leclerc and I will be your instructor for this two-day training program. Before we begin, let me tell you what to expect. Today we will cover the fundamentals of cybersecurity, including common threats such as phishing, malware, and ransomware. We will also look at basic protective measures that every employee should know. Tomorrow, we will focus on more advanced topics including network security protocols, data encryption standards, and incident response procedures. All of the course materials are available on the training portal. Please make sure you have your login credentials ready. There will be a short quiz at the end of each section to help you assess your understanding. These quizzes are not graded but I encourage you to take them seriously as they will prepare you for the final assessment on Friday. The final assessment is mandatory for all participants and you will need a score of at least seventy percent to receive your certificate. If you have any questions during the session, please raise your hand and I will be happy to help. Let's begin.`,
    questions: [
      {
        id: 1,
        question: "How long is the training program?",
        options: ["One day", "Two days", "One week", "Two weeks"],
        correct: 1,
        explanation: "Le transcript dit: 'this two-day training program'."
      },
      {
        id: 2,
        question: "What score is needed to receive the certificate?",
        options: ["60%", "65%", "70%", "80%"],
        correct: 2,
        explanation: "Le transcript dit: 'you will need a score of at least seventy percent to receive your certificate'."
      },
      {
        id: 3,
        question: "What topic will be covered on the second day?",
        options: ["Common threats like phishing", "Network security protocols", "Password management", "Email security"],
        correct: 1,
        explanation: "Le transcript dit: 'Tomorrow, we will focus on... network security protocols, data encryption standards'."
      }
    ],
    type: "talk",
    level: "B1"
  },
  {
    id: 7,
    title: "Airport Announcement",
    transcript: `Ladies and gentlemen, your attention please. This is a gate change announcement for passengers traveling on GlobalAir flight GA four seven five to London Heathrow. This flight has been moved from Gate C twelve to Gate B eight. Please make your way to Gate B eight as soon as possible. The new gate is located on the lower level, accessible by escalator near the main departure hall. Boarding for this flight will begin in thirty minutes at fifteen forty-five. Passengers requiring special assistance should proceed to the gate immediately and speak to a member of our ground staff. Please have your boarding pass and identification ready. We apologize for any inconvenience this gate change may cause. Thank you for flying with GlobalAir and we wish you a pleasant journey.`,
    questions: [
      {
        id: 1,
        question: "What is the flight number mentioned in the announcement?",
        options: ["GA 457", "GA 475", "GA 547", "GA 745"],
        correct: 1,
        explanation: "L'annonce dit: 'flight GA four seven five' = GA 475."
      },
      {
        id: 2,
        question: "What is the new gate number?",
        options: ["C12", "B8", "B12", "C8"],
        correct: 1,
        explanation: "L'annonce dit: 'moved from Gate C twelve to Gate B eight'."
      },
      {
        id: 3,
        question: "When will boarding begin?",
        options: ["15:15", "15:30", "15:45", "16:00"],
        correct: 2,
        explanation: "L'annonce dit: 'Boarding for this flight will begin... at fifteen forty-five' = 15h45."
      }
    ],
    type: "announcement",
    level: "A2"
  },
  {
    id: 8,
    title: "Radio Business News",
    transcript: `And now for your business news update. Global technology company TechVision has announced plans to expand its European operations with the opening of a new research and development center in Dublin, Ireland. The company says the new facility will create approximately five hundred jobs over the next three years. TechVision Chief Executive Officer Michael Park stated that Europe remains a key strategic market and that the Dublin center will focus on artificial intelligence and machine learning research. In other news, online retail giant ShopWorld has reported a thirty-two percent increase in revenue for the third quarter, driven largely by growth in its cloud services division. The company's profits rose to four point seven billion dollars, exceeding analyst expectations. ShopWorld shares climbed six percent on the news. Finally, the annual International Technology Forum begins in Singapore today, bringing together over ten thousand industry professionals from eighty countries. Key topics on this year's agenda include sustainable technology, digital privacy regulations, and the future of remote work. We will have full coverage throughout the day. Stay tuned to Business Radio for the latest updates.`,
    questions: [
      {
        id: 1,
        question: "How many jobs will TechVision create in Dublin?",
        options: ["200", "350", "500", "750"],
        correct: 2,
        explanation: "Le transcript dit: 'the new facility will create approximately five hundred jobs'."
      },
      {
        id: 2,
        question: "By how much did ShopWorld's revenue increase?",
        options: ["22%", "32%", "42%", "62%"],
        correct: 1,
        explanation: "Le transcript dit: 'reported a thirty-two percent increase in revenue'."
      },
      {
        id: 3,
        question: "How many professionals are attending the International Technology Forum?",
        options: ["1,000", "5,000", "8,000", "10,000"],
        correct: 3,
        explanation: "Le transcript dit: 'bringing together over ten thousand industry professionals'."
      }
    ],
    type: "talk",
    level: "B1"
  },
  {
    id: 9,
    title: "Job Interview Conversation",
    transcript: `Interviewer: Good morning, Ms. Rodriguez. Thank you for coming in today. Please have a seat.
Candidate: Thank you. I'm very pleased to be here.
Interviewer: I've reviewed your CV and I'm impressed with your background. Can you tell me why you want to work for InnovateTech?
Candidate: Certainly. I've been following your company for the past two years and I really admire the innovative products you develop. I believe my five years of experience in software development would be a valuable contribution to your team.
Interviewer: That's great to hear. Can you describe a challenging project you've worked on?
Candidate: Of course. In my previous role, I led a team of six developers to migrate our entire legacy system to cloud infrastructure. It was a twelve-month project with a very tight deadline. We encountered several technical challenges, but through good teamwork and careful planning, we delivered the project on time and ten percent under budget.
Interviewer: Excellent. And what are your salary expectations?
Candidate: Based on my research and experience, I'm looking for something in the range of sixty to seventy thousand euros per year. Is that within your budget for this position?
Interviewer: Yes, that falls within our range. We would also offer health benefits, a performance bonus, and thirty days of annual leave.`,
    questions: [
      {
        id: 1,
        question: "How many developers did the candidate lead in the cloud migration project?",
        options: ["Four", "Five", "Six", "Eight"],
        correct: 2,
        explanation: "La candidate dit: 'I led a team of six developers'."
      },
      {
        id: 2,
        question: "How was the project delivered?",
        options: ["Late and over budget", "On time but over budget", "On time and 10% under budget", "Early and under budget"],
        correct: 2,
        explanation: "La candidate dit: 'we delivered the project on time and ten percent under budget'."
      },
      {
        id: 3,
        question: "What salary range is the candidate requesting?",
        options: ["€50,000-€60,000", "€60,000-€70,000", "€70,000-€80,000", "€55,000-€65,000"],
        correct: 1,
        explanation: "La candidate dit: 'I'm looking for something in the range of sixty to seventy thousand euros per year'."
      }
    ],
    type: "conversation",
    level: "B1"
  },
  {
    id: 10,
    title: "Product Launch Announcement",
    transcript: `Good afternoon. Welcome to the official launch of CloudSync Pro, our company's most advanced data management solution to date. I'm delighted to introduce this product, which is the result of three years of development and feedback from over two hundred business clients. CloudSync Pro offers several industry-leading features. First, it provides real-time synchronization across all devices with a maximum latency of just fifty milliseconds. Second, it includes advanced security features including end-to-end encryption and two-factor authentication. Third, it integrates seamlessly with over one hundred popular business applications including Microsoft Office, Google Workspace, and Salesforce. The product will be available in three subscription tiers. The Basic plan at twenty euros per user per month supports up to fifty users. The Professional plan at thirty-five euros per user per month supports unlimited users and includes priority customer support. The Enterprise plan is customized for large organizations and pricing is available upon request. We are offering a thirty-day free trial with no credit card required. To sign up, visit cloudsyncpro.com starting from midnight tonight. Thank you, and we look forward to helping your business grow.`,
    questions: [
      {
        id: 1,
        question: "How long was CloudSync Pro in development?",
        options: ["One year", "Two years", "Three years", "Five years"],
        correct: 2,
        explanation: "L'annonce dit: 'three years of development and feedback from over two hundred business clients'."
      },
      {
        id: 2,
        question: "What is the price of the Professional plan per user per month?",
        options: ["€20", "€25", "€35", "€50"],
        correct: 2,
        explanation: "L'annonce dit: 'The Professional plan at thirty-five euros per user per month'."
      },
      {
        id: 3,
        question: "How long is the free trial?",
        options: ["7 days", "14 days", "21 days", "30 days"],
        correct: 3,
        explanation: "L'annonce dit: 'We are offering a thirty-day free trial'."
      }
    ],
    type: "talk",
    level: "B1"
  }
];

export const listeningTypes = ["conversation", "announcement", "talk"];
