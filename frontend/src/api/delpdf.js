router.delete('/:uuid', auth, async (req, res) => {
  try {
    const { uuid } = req.params;
    const pdf = await PDF.findOneAndDelete({ uuid, user: req.user.id });
    if (!pdf) return res.status(404).json({ message: 'PDF not found' });

    // Optionally, remove the file from your uploads folder here

    res.json({ message: 'PDF deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
