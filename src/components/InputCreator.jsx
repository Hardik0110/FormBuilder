import React, { useState, useEffect } from 'react';

const InputCreator = ({ onAdd, editingField }) => {
  const [fieldConfig, setFieldConfig] = useState({
    type: 'text',
    label: '',
    placeholder: '',
    options: '',
    showValidation: false,
    validation: {
      required: false,
      min: '',
      max: '',
      maxLength: '',
      pattern: ''
    }
  });


  useEffect(() => { 
    if (editingField) {
      setFieldConfig({
        ...editingField,
        options: editingField.options || '',
        showValidation: !!editingField.validation,
        validation: editingField.validation || {
          required: false,
          min: '',
          max: '',
          maxLength: '',
          pattern: '',
          ...editingField.validation
        }
      });
    }
  }, [editingField]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('validation.')) {
      const validationField = name.split('.')[1];
      setFieldConfig(prev => ({
        ...prev,
        validation: {
          ...prev.validation,
          [validationField]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFieldConfig(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (fieldConfig.type === 'radio' && !fieldConfig.options) {
      alert('Please add at least one option for the radio field');
      return;
    }

    const fieldData = {
      ...fieldConfig,
      validation: fieldConfig.showValidation ? fieldConfig.validation : undefined,
      options: fieldConfig.type === 'radio' ? fieldConfig.options.split(',').map(opt => opt.trim()) : []
    };

    onAdd(fieldData);
    
    if (!editingField) {
      setFieldConfig({
        type: 'text',
        label: '',
        placeholder: '',
        options: '',
        showValidation: false,
        validation: {
          required: false,
          min: '',
          max: '',
          maxLength: '',
          pattern: ''
        }
      });
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-2xl shadow-2xl border border-violet-500/20 transition-all duration-300 hover:border-violet-500/40">
      <h2 className="text-2xl font-bold mb-6 text-white pb-2 border-b border-violet-500/20">
        {editingField ? 'Edit Field' : 'Input Creator'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">Field Type</label>
          <select 
            name="type" 
            value={fieldConfig.type}
            onChange={handleChange}
            className="w-full p-2 border border-violet-500/20 rounded-lg focus:ring-2 
              focus:ring-violet-500 focus:border-violet-500 bg-gray-800 text-white 
              transition-all duration-200"
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="number">Number</option>
            <option value="radio">Radio</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">Label</label>
          <input
            type="text"
            name="label"
            value={fieldConfig.label}
            onChange={handleChange}
            className="w-full p-2 border border-violet-500/20 rounded-lg focus:ring-2 
              focus:ring-violet-500 focus:border-violet-500 bg-gray-800 text-white 
              transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">Placeholder</label>
          <input
            type="text"
            name="placeholder"
            value={fieldConfig.placeholder}
            onChange={handleChange}
            className="w-full p-2 border border-violet-500/20 rounded-lg focus:ring-2 
              focus:ring-violet-500 focus:border-violet-500 bg-gray-800 text-white 
              transition-all duration-200"
          />
        </div>

        {fieldConfig.type === 'radio' && (
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Options (comma-separated)
            </label>
            <input
              type="text"
              name="options"
              value={fieldConfig.options}
              onChange={handleChange}
              placeholder="Option1, Option2, Option3"
              className="w-full p-2 border border-violet-500/20 rounded-lg focus:ring-2 
                focus:ring-violet-500 focus:border-violet-500 bg-gray-800 text-white 
                transition-all duration-200"
            />
          </div>
        )}

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="showValidation"
              checked={fieldConfig.showValidation}
              onChange={handleChange}
              className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-violet-500/20 rounded bg-gray-800"
            />
            <span className="text-sm font-medium text-gray-200">Show Validation Options</span>
          </label>
        </div>

        {fieldConfig.showValidation && (
          <div className="space-y-4 p-4 bg-gray-800 rounded-lg border border-violet-500/20">
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="validation.required"
                  checked={fieldConfig.validation.required}
                  onChange={handleChange}
                  className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-violet-500/20 rounded bg-gray-800"
                />
                <span className="text-sm font-medium text-gray-200">Required</span>
              </label>
            </div>

            {fieldConfig.type === 'number' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Min Value</label>
                  <input
                    type="number"
                    name="validation.min"
                    value={fieldConfig.validation.min}
                    onChange={handleChange}
                    className="w-full p-2 border border-violet-500/20 rounded-lg focus:ring-2 
                      focus:ring-violet-500 focus:border-violet-500 bg-gray-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Max Value</label>
                  <input
                    type="number"
                    name="validation.max"
                    value={fieldConfig.validation.max}
                    onChange={handleChange}
                    className="w-full p-2 border border-violet-500/20 rounded-lg focus:ring-2 
                      focus:ring-violet-500 focus:border-violet-500 bg-gray-800 text-white"
                  />
                </div>
              </>
            )}

            {(fieldConfig.type === 'text' || fieldConfig.type === 'email') && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Max Length</label>
                  <input
                    type="number"
                    name="validation.maxLength"
                    value={fieldConfig.validation.maxLength}
                    onChange={handleChange}
                    className="w-full p-2 border border-violet-500/20 rounded-lg focus:ring-2 
                      focus:ring-violet-500 focus:border-violet-500 bg-gray-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Pattern (regex)</label>
                  <input
                    type="text"
                    name="validation.pattern"
                    value={fieldConfig.validation.pattern}
                    onChange={handleChange}
                    className="w-full p-2 border border-violet-500/20 rounded-lg focus:ring-2 
                      focus:ring-violet-500 focus:border-violet-500 bg-gray-800 text-white"
                  />
                </div>
              </>
            )}
          </div>
        )}

        <button 
          type="submit" 
          className="w-full px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 
            text-white rounded-lg shadow-md hover:from-violet-700 hover:to-purple-700 
            transition-all duration-200 transform hover:scale-[1.02]"
        >
          {editingField ? 'Update Field' : 'Add Field'}
        </button>
      </form>
    </div>
  );
};

export default InputCreator;