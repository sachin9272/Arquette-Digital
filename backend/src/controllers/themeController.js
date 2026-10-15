const ThemeSetting = require('../models/ThemeSetting');

// Get active theme
exports.getActiveTheme = async (req, res, next) => {
  try {
    let setting = await ThemeSetting.findOne().sort({ updatedAt: -1 });

    if (!setting) {
      setting = await ThemeSetting.create({
        theme: 'clinical',
        updatedBy: 'System Init',
      });
    }

    res.status(200).json({
      success: true,
      data: setting,
    });
  } catch (error) {
    next(error);
  }
};

// Update active theme (Admin only)
exports.updateTheme = async (req, res, next) => {
  try {
    const { theme, customColors, updatedBy } = req.body;

    const validThemes = ['clinical', 'emerald', 'sapphire', 'rose', 'dark'];
    if (theme && !validThemes.includes(theme)) {
      return res.status(400).json({
        success: false,
        message: `Invalid theme. Must be one of: ${validThemes.join(', ')}`,
      });
    }

    let setting = await ThemeSetting.findOne().sort({ updatedAt: -1 });

    if (!setting) {
      setting = new ThemeSetting({
        theme: theme || 'clinical',
        customColors: customColors || {},
        updatedBy: updatedBy || 'Admin Console',
      });
    } else {
      if (theme) setting.theme = theme;
      if (customColors !== undefined) setting.customColors = customColors;
      setting.updatedBy = updatedBy || 'Admin Console';
    }

    await setting.save();

    res.status(200).json({
      success: true,
      message: `Active website theme updated to '${setting.theme}' successfully.`,
      data: setting,
    });
  } catch (error) {
    next(error);
  }
};
