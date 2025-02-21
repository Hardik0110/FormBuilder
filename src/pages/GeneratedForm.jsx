import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const GeneratedForm = () => {
  const [fields, setFields] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const formConfig = JSON.parse(localStorage.getItem('formConfig') || '[]');
    setFields(formConfig);
  }, []);

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-900 via-indigo-900 to-purple-900 py-12 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-900 shadow-2xl rounded-2xl overflow-hidden border border-violet-500/20 transition-all duration-300 hover:border-violet-500/40">
          <div className="px-8 py-6 bg-gradient-to-r from-violet-800 to-purple-800 border-b border-violet-500/20">
            <h1 className="text-2xl font-bold text-white">Generated Form</h1>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
            {fields.map((field) => (
              <div key={field.id} className="relative animate-slideIn">
                <label className="block mb-2 font-medium text-gray-200">
                  {field.label}
                  {field.validation?.required && <span className="text-purple-400 ml-1">*</span>}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  {...register(field.label, {
                    required: field.validation?.required,
                    min: field.validation?.min,
                    max: field.validation?.max,
                    maxLength: field.validation?.maxLength,
                    pattern: field.validation?.pattern ? {
                      value: new RegExp(field.validation.pattern),
                      message: "Pattern doesn't match"
                    } : undefined
                  })}
                  className="w-full p-2.5 border border-violet-500/20 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-800 text-white placeholder-gray-400 transition-all duration-200"
                />
                {errors[field.label] && (
                  <span className="absolute -bottom-5 left-0 text-purple-400 text-sm">
                    {errors[field.label].message || "This field is required"}
                  </span>
                )}
              </div>
            ))}
            <button 
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg mt-8 transform hover:scale-[1.02]"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};


export default GeneratedForm;