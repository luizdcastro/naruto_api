const getAllShinobis = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      shinobis,
    },
  });
};
