import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { UserPreferences as UserPreferencesType } from '../../types';
import { useAuth } from '../../context/AuthContext';
import Button from './Button';
import Card from './Card';

const UserPreferences: React.FC = () => {
  const { user, updatePreferences } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferencesType>(
    user?.preferences || {
      theme: 'light',
      fontSize: 'medium',
      alertSound: true,
      chartRefreshRate: 3000
    }
  );

  const handleChange = (key: keyof UserPreferencesType, value: any) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    updatePreferences(newPreferences);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center"
      >
        <Settings className="h-4 w-4 mr-2" />
        Preferences
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 z-50">
          <Card>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Theme
                </label>
                <select
                  value={preferences.theme}
                  onChange={(e) => handleChange('theme', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Font Size
                </label>
                <select
                  value={preferences.fontSize}
                  onChange={(e) => handleChange('fontSize', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={preferences.alertSound}
                    onChange={(e) => handleChange('alertSound', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Enable Alert Sounds</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chart Refresh Rate (seconds)
                </label>
                <select
                  value={preferences.chartRefreshRate}
                  onChange={(e) => handleChange('chartRefreshRate', Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value={1000}>1</option>
                  <option value={3000}>3</option>
                  <option value={5000}>5</option>
                  <option value={10000}>10</option>
                </select>
              </div>

              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                fullWidth
              >
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default UserPreferences;