import Preference from '../Model/preferenceModel.js';

// Save cookie preferences
export const savePreferences = async (req, res) => {
  const { userId, preference } = req.body;

  try {
    // Check if the preference for the user already exists
    let existingPref = await Preference.findOne({ userId });
    
    if (existingPref) {
      // Update existing preferences
      existingPref.preference = preference;
      await existingPref.save();
    } else {
      // Create a new preference document
      const newPref = new Preference({ userId, preference });
      await newPref.save();
    }

    res.status(200).json({ message: 'Preferences saved successfully' });
  } catch (error) {
    console.error('Error saving preferences:', error);
    res.status(500).json({ error: 'An error occurred while saving preferences' });
  }
};
