import mongoose from 'mongoose';

const ThemeSettingSchema = new mongoose.Schema(
  {
    theme: {
      type: String,
      required: true,
      enum: ['clinical', 'emerald', 'sapphire', 'rose', 'dark'],
      default: 'clinical',
    },
    customColors: {
      primary: { type: String, default: null },
      secondary: { type: String, default: null },
      accent: { type: String, default: null },
    },
    updatedBy: {
      type: String,
      default: 'Admin Console',
    },
  },
  {
    timestamps: true,
  }
);

const ThemeSetting = mongoose.model('ThemeSetting', ThemeSettingSchema);
export default ThemeSetting;
