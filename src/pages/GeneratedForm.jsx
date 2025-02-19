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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-700">
            <h1 className="text-2xl font-bold text-white">Generated Form</h1>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
            {fields.map((field) => (
              <div key={field.id} className="relative">
                <label className="block mb-2 font-medium text-gray-700">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  {...register(field.label, { required: field.required })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                />
                {errors[field.label] && (
                  <span className="absolute -bottom-5 left-0 text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>
            ))}
            <button 
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg mt-8"
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