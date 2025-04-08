const { name } = require("ejs");

document.querySelector('form').addEventListener('submit', (e) => {
  const contactSubmissions = [];
  app.post('/submit-form', (req, res) => {
    contactSubmissions.push({
      id: Date.now(),          // Unique ID (timestamp)
      name: req.body.name,     // From form
      email: req.body.email,   // From form
      message: req.body.message,
      date: new Date()         // Submission time
    });
    res.redirect('/contact?success=true');
  });

  app.get('/submissions', (req, res) => {
    res.json(contactSubmissions);
  });
  const email = document.querySelector('input[type="email"]');
  if (!email.ariaValueMax.includes('@')) {
    e.preventDefault();
    alert('Invalid email!');
  }
})