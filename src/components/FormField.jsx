// src/components/FormField.jsx
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const FormField = ({ field, index, onDelete, onEdit, onMove }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'FORM_FIELD',
    item: { id: field.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop({
    accept: 'FORM_FIELD',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div 
      ref={ref}
      className={`p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg 
        transition-all duration-200 ${isDragging ? 'opacity-50' : ''} 
        bg-gradient-to-r from-white to-gray-50 cursor-move`}
      data-handler-id={handlerId}
    >
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-800">{field.label}</span>
        <div className="space-x-2">
          <button 
            onClick={() => onEdit(field.id)}
            className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 
              text-white rounded-md shadow hover:from-blue-600 hover:to-blue-700 
              transition-all duration-200"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(field.id)}
            className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 
              text-white rounded-md shadow hover:from-red-600 hover:to-red-700 
              transition-all duration-200"
          >
            Delete
          </button>
        </div>
      </div>
      {renderField(field)}
    </div>
  );
};

const renderField = (field) => {
  const baseInputClass = "mt-2 w-full p-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed";
  
  switch (field.type) {
    case 'text':
    case 'email':
    case 'number':
      return (
        <input
          type={field.type}
          placeholder={field.placeholder}
          className={baseInputClass}
          disabled
        />
      );
    case 'select':
      return (
        <select className={baseInputClass} disabled>
          <option value="">{field.placeholder}</option>
        </select>
      );
    case 'radio':
      return (
        <div className="mt-2">
          <label className="inline-flex items-center">
            <input type="radio" className="text-blue-600" disabled />
            <span className="ml-2 text-gray-700">{field.placeholder}</span>
          </label>
        </div>
      );
    default:
      return null;
  }
};

export default FormField;