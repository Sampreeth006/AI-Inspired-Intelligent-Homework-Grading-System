#📚 AI-Inspired Homework Grading System

🧠 AI-Inspired Homework Grading System is a smart web-based platform that simplifies the process of creating, submitting, and evaluating assignments. It enables instructors to design homework, automate grading, and analyze student performance through real-time analytics and interactive dashboards.

🧩 About

- The Homework Grader is a modern web application designed to streamline the assignment workflow for both instructors and students. It integrates assignment creation, submission management, automated grading, and performance analytics into one interactive platform.
- Instructors can create assignments with customizable question types, marks, and time limits, while students can attempt homework through a timed interface that provides instant feedback and leaderboard-based performance insights.
- The system demonstrates modern front-end development practices including modular architecture, real-time UI updates, automated testing, and data visualization.

🚀 Features

📝 Assignment Creator
Teachers can create assignments with:
- Custom titles and time limits
- Multiple question types (MCQ, one-word, descriptive)
- Configurable marks and ideal answers
⏱ Timed Submission System
Students can attempt assignments within a countdown timer. Submissions are automatically processed when the time expires.
⚡ Automated Grading
The system automatically evaluates student responses and calculates scores based on predefined solutions.
📊 Performance Analytics
Displays:
Leaderboard of top-performing students
Class average score
Interactive charts for performance insights

🔐 Role-Based Access
Separate dashboards for:
Teachers – Create assignments and view analytics
Students – Attempt homework and view results

📁 Export Results
Teachers can export graded results in JSON format for record keeping and analysis.

🧰 Tech Stack

- Frontend - React.js, JavaScript
- UI Design	- Tailwind CSS
- Data Visualization	- Recharts
- Testing	- Jest, Selenium
- Storage	Browser - LocalStorage
- Architecture	- MVC

📂 Project Structure
```
Homework-Grader
│
├── src
│   ├── components
│   ├── services
│   │   ├── grader.js
│   │   └── storage.js
│   └── App.js
│
├── public
│
├── package.json
└── README.md
```

⚙️ How It Works

- Login and Role Selection: Users log in and select their role as either Teacher or Student.
- Create Assignments: Teachers create assignments by adding questions, marks, and solutions.
- Attempt Homework: Students select available assignments and complete them within the time limit.
- Automatic Evaluation: The system evaluates responses instantly and calculates scores.
- Performance Analytics: Results are displayed through leaderboards and charts for quick analysis.

🎯 Purpose
- The goal of this project is to simplify assignment management by providing an integrated system that automates grading and delivers instant performance insights.
- It demonstrates how modern web technologies can be used to build interactive educational tools that improve both teaching efficiency and student learning experience.

👨‍💻 Developer

**Sampreeth Mysore Prabhu Shankar**  
🎓 MS Computer and Information Science — George Mason University  
📧 smysorep@gmu.edu

📜 License
- This project is developed for educational and academic purposes. You are welcome to explore, modify, and extend it for learning and experimentation.
