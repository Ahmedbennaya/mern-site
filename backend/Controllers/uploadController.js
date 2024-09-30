export const uploadImage = (req, res) => {
    try {
      // The uploaded file's information will be available in `req.file`
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      // Send back the file URL from Cloudinary
      res.json({
        message: 'File uploaded successfully',
        url: file.path, // Cloudinary URL
        public_id: file.filename, // Cloudinary public ID
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error uploading file' });
    }
  };
  