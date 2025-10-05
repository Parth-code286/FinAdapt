<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="font-family: 'Segoe UI', sans-serif; line-height: 1.6; background: #f9f9f9; color: #333; padding: 40px; max-width: 900px; margin: auto;">

  <h1 style="color: #2c3e50;">💰 Expense Tracker</h1>
  <p>A powerful full-stack application to track your income and expenses with beautiful <strong>live charts</strong>, real-time analytics, and a smooth user experience.</p>

  <h2 style="color: #2c3e50;">📌 Features</h2>

  <div style="background: #fff; padding: 20px; margin: 20px 0; border-left: 5px solid #3498db; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
    <h3>📊 Live-Updating Graphs</h3>
    <p>Track your monthly income and expenses dynamically using responsive line and bar charts powered by <strong>Chart.js</strong>.</p>
    <img src="assets/demo-line-chart.gif" alt="Live Graph Demo"
         style="width: 100%; max-width: 600px; border: 1px solid #ddd; border-radius: 8px; margin: 10px 0;" />
  </div>

  <div style="background: #fff; padding: 20px; margin: 20px 0; border-left: 5px solid #3498db; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
    <h3>🥧 Pie Charts</h3>
    <p>Visualize category-wise expense breakdown using animated pie charts, helping you understand your spending habits better.</p>
    <img src="assets/pie-chart-demo.gif" alt="Pie Chart Demo"
         style="width: 100%; max-width: 600px; border: 1px solid #ddd; border-radius: 8px; margin: 10px 0;" />
  </div>

  <div style="background: #fff; padding: 20px; margin: 20px 0; border-left: 5px solid #3498db; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
    <h3>✅ Expense & Income Management</h3>
    <ul>
      <li>Add, edit, and delete income/expense entries</li>
      <li>Real-time data persistence with MongoDB</li>
      <li>Toast notifications for actions</li>
    </ul>
  </div>

  <h2 style="color: #2c3e50;">🔧 Tech Stack</h2>
  <ul>
    <li><strong>Frontend:</strong> React, Tailwind CSS, Chart.js</li>
    <li><strong>Backend:</strong> Node.js, Express.js</li>
    <li><strong>Database:</strong> MongoDB</li>
    <li><strong>Auth:</strong> JWT-based secure routes</li>
  </ul>

  <h2 style="color: #2c3e50;">🛠️ Setup Instructions</h2>
  <pre style="background: #eee; padding: 10px; border-radius: 5px;"><code>
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker

# For Backend
cd backend
npm install
npm run dev

# For Frontend
cd ../frontend
npm install
npm run dev
  </code></pre>

  <h2 style="color: #2c3e50;">📂 Folder Structure</h2>
  <pre style="background: #eee; padding: 10px; border-radius: 5px;"><code>
expense-tracker/
├── backend/
│   └── controllers, routes, models, middleware
├── frontend/
│   └── components, pages, hooks, utils
├── README.html
  </code></pre>


  <h2 style="color: #2c3e50;">📜 License</h2>
  <p>MIT License © 2025 Parth Nandwalkar</p>

</body>
</html>
