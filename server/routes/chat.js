const express = require('express');
const router = express.Router();

// Placeholder — OpenAI integration added in Phase 4
router.post('/', (req, res) => {
  res.json({ message: 'Chat endpoint ready' });
});

module.exports = router;
