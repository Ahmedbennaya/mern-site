import Preference from '../Model/preferenceModel.js';

// Save cookie preferences
export const savePreferences = async (req, res) => {
  const { userId, preference } = req.body;

  try {
    let existingPref = await Preference.findOne({ userId });
    if (existingPref) {
      existingPref.preference = preference;
      await existingPref.save();
    } else {
      const newPref = new Preference({ userId, preference });
      await newPref.save();
    }

    res.status(200).json({ message: 'Preferences saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving preferences' });
  }
};
