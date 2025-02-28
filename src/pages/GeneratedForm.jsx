import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GeneratedForm = () => {
  const [fields, setFields] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    try {
      const formConfig = JSON.parse(localStorage.getItem('formConfig') || '[]');
      setFields(formConfig);
    } catch (error) {
      toast.error('Error loading form configuration');
      console.error('Error parsing form config:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const onSubmit = useCallback(async (data) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', data);
      toast.success('Form submitted successfully!');
      reset();
    } catch (error) {
      toast.error('Error submitting form');
      console.error('Form submission error:', error);
    }
  }, [reset]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-violet-900 via-indigo-900 to-purple-900 
        flex items-center justify-center">
        <div className="animate-pulse text-white text-xl">Loading form...</div>
      </div>
    );
  }

  if (fields.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-violet-900 via-indigo-900 to-purple-900 
        flex items-center justify-center p-4">
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-8 text-center 
          border border-violet-500/20 max-w-md w-full animate-fadeIn">
          <h2 className="text-2xl font-bold text-white mb-4">No Form Configuration Found</h2>
          <p className="text-gray-300 mb-6">Please go back and create a form first.</p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 
              text-white rounded-lg hover:from-violet-700 hover:to-purple-700 
              transition-all duration-300 transform hover:scale-105"
          >
            Create Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-900 via-indigo-900 to-purple-900 
      py-12 px-4 sm:px-6 lg:px-8 animate-gradient-x">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-900/80 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden 
          border border-violet-500/20 transition-all duration-300 hover:border-violet-500/40 animate-fadeIn">
          <div className="px-8 py-6 bg-gradient-to-r from-violet-800/50 to-purple-800/50 
            border-b border-violet-500/20">
            <h1 className="text-2xl font-bold text-white">Generated Form</h1>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
            {fields.map((field) => (
              <div key={field.id} className="relative group animate-slideIn">
                <label className="block mb-2 font-medium text-gray-200 group-hover:text-white 
                  transition-colors duration-200">
                  {field.label}
                  {field.validation?.required && 
                    <span className="text-purple-400 ml-1 animate-pulse">*</span>}
                </label>
                {field.type === 'radio' ? (
                  <div className="space-y-2">
                    {field.options.map((option, idx) => (
                      <label key={idx} className="flex items-center space-x-3 text-gray-300 
                        hover:text-white transition-colors duration-200">
                        <input
                          type="radio"
                          value={option}
                          {...register(field.label, {
                            required: field.validation?.required
                          })}
                          className="form-radio text-purple-600 focus:ring-purple-500 
                            border-violet-500/20 bg-gray-800"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                ) : (
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
                    className="w-full p-3 border border-violet-500/20 rounded-lg 
                      focus:ring-2 focus:ring-violet-500 focus:border-violet-500 
                      bg-gray-800/50 backdrop-blur-sm text-white placeholder-gray-400 
                      transition-all duration-200 hover:border-violet-500/40"
                  />
                )}
                {errors[field.label] && (
                  <span className="absolute -bottom-5 left-0 text-purple-400 text-sm 
                    animate-fadeIn">
                    {errors[field.label].message || "This field is required"}
                  </span>
                )}
              </div>
            ))}
            <button 
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 
                text-white rounded-lg hover:from-violet-700 hover:to-purple-700 
                transition-all duration-300 transform hover:scale-[1.02] 
                focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 
                shadow-lg mt-8 font-medium"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default React.memo(GeneratedForm);