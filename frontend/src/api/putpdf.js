router.put('/:uuid', auth, async (req, res) => {
  try {
    const { newName } = req.body;
    const { uuid } = req.params;

    const pdf = await PDF.findOne({ uuid, user: req.user.id });
    if (!pdf) return res.status(404).json({ message: 'PDF not found' });

    pdf.originalName = newName;
    await pdf.save();

    res.json(pdf);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
