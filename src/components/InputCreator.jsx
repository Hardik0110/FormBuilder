// src/components/InputCreator.jsx
import React, { useState, useEffect } from 'react';

const InputCreator = ({ onAdd, editingField }) => {
  const [fieldConfig, setFieldConfig] = useState({
    type: 'text',
    label: '',
    placeholder: '',
    required: false
  });

  useEffect(() => {
    if (editingField) {
      setFieldConfig(editingField);
    }
  }, [editingField]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFieldConfig(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(fieldConfig);
    if (!editingField) {
      setFieldConfig({
        type: 'text',
        label: '',
        placeholder: '',
        required: false
      });
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 pb-2 border-b border-gray-200">
        {editingField ? 'Edit Field' : 'Input Creator'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Field Type</label>
          <select 
            name="type" 
            value={fieldConfig.type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 
              focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="number">Number</option>
            <option value="select">Select</option>
            <option value="radio">Radio</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
          <input
            type="text"
            name="label"
            value={fieldConfig.label}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 
              focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Placeholder</label>
          <input
            type="text"
            name="placeholder"
            value={fieldConfig.placeholder}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 
              focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="required"
              checked={fieldConfig.required}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm font-medium text-gray-700">Required</span>
          </label>
        </div>

        <button 
          type="submit" 
          className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 
            text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 
            transition-all duration-200 transform hover:-translate-y-1"
        >
          {editingField ? 'Update Field' : 'Add Field'}
        </button>
      </form>
    </div>
  );
};

export default InputCreator;