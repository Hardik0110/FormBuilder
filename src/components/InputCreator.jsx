import React, { useState, useEffect } from 'react';

const InputCreator = ({ onAdd, editingField }) => {
 const [fieldConfig, setFieldConfig] = useState({
   type: 'text',
   label: '',
   placeholder: '',
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
   const fieldData = {
     ...fieldConfig,
     validation: fieldConfig.showValidation ? fieldConfig.validation : undefined
   }
   onAdd(fieldData);
   if (!editingField) {
     setFieldConfig({
       type: 'text',
       label: '',
       placeholder: '',
       showValidation: false,
       validation: {
         required: false,
         min: '',
         max: '',
         maxLength: '',
         pattern: ''
       }
     })
   }
 };

 return (
   <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl border border-gray-700 backdrop-blur-lg">
     <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent pb-2 border-b border-gray-700">
       {editingField ? 'Edit Field' : 'Input Creator'}
     </h2>
     <form onSubmit={handleSubmit} className="space-y-6">
       <div>
         <label className="block text-sm font-medium text-violet-300 mb-2">Field Type</label>
         <select 
           name="type" 
           value={fieldConfig.type}
           onChange={handleChange}
           className="w-full p-2.5 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-gray-100 transition-all duration-200 backdrop-blur-sm"
         >
           <option value="text">Text</option>
           <option value="email">Email</option>
           <option value="number">Number</option>
           <option value="radio">Radio</option>
         </select>
       </div>

       <div>
         <label className="block text-sm font-medium text-violet-300 mb-2">Label</label>
         <input
           type="text"
           name="label"
           value={fieldConfig.label}
           onChange={handleChange}
           className="w-full p-2.5 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-gray-100 transition-all duration-200 backdrop-blur-sm"
         />
       </div>

       <div>
         <label className="block text-sm font-medium text-violet-300 mb-2">Placeholder</label>
         <input
           type="text"
           name="placeholder"
           value={fieldConfig.placeholder}
           onChange={handleChange}
           className="w-full p-2.5 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-gray-100 transition-all duration-200 backdrop-blur-sm"
         />
       </div>

       <div>
         <label className="flex items-center space-x-2 cursor-pointer group">
           <input
             type="checkbox"
             name="showValidation"
             checked={fieldConfig.showValidation}
             onChange={handleChange}
             className="h-4 w-4 text-violet-500 focus:ring-violet-500 border-gray-600 rounded bg-gray-800"
           />
           <span className="text-sm font-medium text-violet-300 group-hover:text-violet-200 transition-colors">
             Show Validation Options
           </span>
         </label>
       </div>

       {fieldConfig.showValidation && (
         <div className="space-y-4 p-6 bg-gray-800/30 rounded-xl border border-gray-700 backdrop-blur-sm">
           <div>
             <label className="flex items-center space-x-2 cursor-pointer group">
               <input
                 type="checkbox"
                 name="validation.required"
                 checked={fieldConfig.validation.required}
                 onChange={handleChange}
                 className="h-4 w-4 text-violet-500 focus:ring-violet-500 border-gray-600 rounded bg-gray-800"
               />
               <span className="text-sm font-medium text-violet-300 group-hover:text-violet-200 transition-colors">
                 Required
               </span>
             </label>
           </div>

           {fieldConfig.type === 'number' && (
             <>
               <div>
                 <label className="block text-sm font-medium text-violet-300 mb-2">Min Value</label>
                 <input
                   type="number"
                   name="validation.min"
                   value={fieldConfig.validation.min}
                   onChange={handleChange}
                   className="w-full p-2.5 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-gray-100 transition-all duration-200 backdrop-blur-sm"
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-violet-300 mb-2">Max Value</label>
                 <input
                   type="number"
                   name="validation.max"
                   value={fieldConfig.validation.max}
                   onChange={handleChange}
                   className="w-full p-2.5 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-gray-100 transition-all duration-200 backdrop-blur-sm"
                 />
               </div>
             </>
           )}

           {(fieldConfig.type === 'text' || fieldConfig.type === 'email') && (
             <>
               <div>
                 <label className="block text-sm font-medium text-violet-300 mb-2">Max Length</label>
                 <input
                   type="number"
                   name="validation.maxLength"
                   value={fieldConfig.validation.maxLength}
                   onChange={handleChange}
                   className="w-full p-2.5 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-gray-100 transition-all duration-200 backdrop-blur-sm"
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-violet-300 mb-2">Pattern (regex)</label>
                 <input
                   type="text"
                   name="validation.pattern"
                   value={fieldConfig.validation.pattern}
                   onChange={handleChange}
                   className="w-full p-2.5 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-gray-100 transition-all duration-200 backdrop-blur-sm"
                 />
               </div>
             </>
           )}
         </div>
       )}

       <button 
         type="submit" 
         className="w-full px-4 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg shadow-lg hover:from-violet-600 hover:to-fuchsia-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(167,139,250,0.5)] font-medium focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-gray-900"
       >
         {editingField ? 'Update Field' : 'Add Field'}
       </button>
     </form>
   </div>
 );
};

export default InputCreator;