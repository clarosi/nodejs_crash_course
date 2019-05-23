const express = require('express');
const router = express.Router();

const MEMBERS = require('../../members.json');

// Get all members
router.get('/', (req, res) => {
  //res.sendFile(path.join(__dirname, 'public', 'index.html'));
  res.json(MEMBERS);
});

// Get single member
router.get('/:id', (req, res) => {
  const memberId = parseInt(req.params.id);
  const found = MEMBERS.some(member => member.id === memberId);

  if (found) {
    return res.json(MEMBERS.find(member => member.id === memberId));
  }
  res.status(400).json({ message: `MemberId ${memberId} not found.` });
});

// Add member
router.post('/', (req, res) => {
  const newMember = req.body;
  newMember.id = MEMBERS.length + 1;
  MEMBERS.push(newMember);
  // validation codes here...
  res.status(201).json(MEMBERS);
});

// Update member
router.put('/:id', (req, res) => {
  const memberId = parseInt(req.params.id);
  const found = MEMBERS.some(member => member.id === memberId);

  if (found) {
    MEMBERS.forEach(member => {
      if (member.id === memberId) {
        const { name, age } = req.body;
        member.name = name;
        member.age = age;
        return;
      }
    });
    return res.status(201).json({
      message: `MemberId ${memberId} successfully updated.`,
      members: MEMBERS
    });
  }
  res.status(400).json({ message: `MemberId ${memberId} not found.` });
});

module.exports = router;
