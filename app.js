const express = require('express');
const passport = require('./config/discord');
const userRoutes = require('./routes/userRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const bodyParser = require('body-parser');

const app = express();

// Middleware pro JSON parsování
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Inicializace Discord OAuth2 Passport
app.use(passport.initialize());

// API routes pro uživatele a ticket systém
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);

// Route pro přihlášení přes Discord
app.get('/auth/discord', passport.authenticate('discord'));

app.get('/auth/discord/callback',
    passport.authenticate('discord', { failureRedirect: '/' }),
    (req, res) => {
        // Úspěšné přihlášení, přesměrování na dashboard
        res.redirect('/dashboard');
    }
);

// Server start
app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
