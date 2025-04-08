const express = require('express');
const path = require('path');
const app = express();

// Temporary storage for contact form submissions
const contactSubmissions = [];

// Middleware setup
app.set('views', path.join(__dirname, 'views'));  // Set views directory
app.set('view engine', 'ejs');                   // Set EJS as template engine
app.use(express.static('public'));               // Serve static files
app.use(express.urlencoded({ extended: true })); // Parse form data

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// Contact routes
app.get('/contact', (req, res) => {
  const success = req.query.success === 'true';
  res.render('contact', { 
    title: 'Contact',
    success 
  });
});

app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body;
  
  // Basic validation
  if (!name || !email || !message) {
    return res.redirect('/contact?success=false');
  }

  contactSubmissions.push({
    id: Date.now(),
    name,
    email,
    message,
    date: new Date().toISOString()
  });

  res.redirect('/contact?success=true');
});

// Projects route - corrected
app.get('/projects', (req, res) => {
  const projects = [
    { 
      name: "Portfolio Site", 
      description: "Built with Node.js and EJS",
      technologies: ["Node.js", "Express", "EJS"]
    },
    { 
      name: "Task App", 
      description: "A simple task manager",
      technologies: ["JavaScript", "HTML", "CSS"]
    }
  ];
  
  res.render('projects', { 
    title: 'My Projects',
    projects 
  });
});

// Blog route - corrected
app.get('/blog', (req, res) => {
  const blogPosts = [
    { 
      title: "Trying to learn programming languages which are new to me", 
      content: "I have come to know thatNode.js is a powerful JavaScript runtime...",
      date: "02-07-2025",
      author: "Luke Kyaw"
    },
    { 
      title: "CSS Grid Layouts", 
      content: "I have learnt that CSS Grid makes responsive design easy...",
      date: "02-07-2025",
      author: "Luke Kyaw"
    }
  ];
  
  res.render('blog', { 
    title: 'Blog Posts',
    blogPosts 
  });
});

// Display all submissions (for testing)
app.get('/submissions', (req, res) => {
  res.json(contactSubmissions);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});