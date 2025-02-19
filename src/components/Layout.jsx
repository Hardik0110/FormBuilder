import React from 'react';
import { useDrop } from 'react-dnd';
import FormField from './FormField';

const Layout = ({ fields, onDelete, onEdit, onMove }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'FORM_FIELD',
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  }));

  return (
    <div 
      ref={drop} 
      className={`min-h-full p-6 bg-white rounded-lg shadow-xl border border-gray-200
        ${isOver ? 'bg-blue-50' : ''}`}
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 pb-2 border-b border-gray-200">
        Form Layout
      </h2>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <FormField
            key={field.id}
            index={index}
            field={field}
            onDelete={onDelete}
            onEdit={onEdit}
            onMove={onMove}
          />
        ))}
      </div>
      {fields.length > 0 && (
        <button 
          className="mt-6 px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 
            text-white rounded-lg shadow-md hover:from-green-600 hover:to-green-700 
            transition-all duration-200 transform hover:-translate-y-1"
          onClick={() => {
            localStorage.setItem('formConfig', JSON.stringify(fields));
            window.location.href = '/generated-form';
          }}
        >
          Generate Form
        </button>
      )}
    </div>
  );
};

export default Layout;