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
      className={`p-5 border border-gray-300 rounded-2xl shadow-xl hover:shadow-2xl 
        transition-all duration-300 ${isDragging ? 'opacity-50 scale-95' : ''} 
        bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 cursor-grab active:cursor-grabbing`}
      data-handler-id={handlerId}
    >
      <div className="flex justify-between items-center">
        <span className="font-semibold text-gray-900 text-lg tracking-wide">{field.label}</span>
        <div className="space-x-3">
          <button 
            onClick={() => onEdit(field.id)}
            className="px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 
              text-white rounded-full shadow-lg hover:from-blue-500 hover:to-blue-700 
              transition-all duration-300 hover:scale-105 active:animate-ping"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(field.id)}
            className="px-4 py-2 bg-gradient-to-r from-red-400 to-red-600 
              text-white rounded-full shadow-lg hover:from-red-500 hover:to-red-700 
              transition-all duration-300 hover:scale-105 active:animate-bounce"
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
  return (
    <div className="mt-3 p-3 bg-white rounded-xl border border-gray-300 shadow-md">
      <span className="text-sm text-gray-700 font-medium">Type: {field.type}</span>
      {field.validation?.required && (
        <span className="ml-2 text-red-500 text-sm font-semibold">*Required</span>
      )}
    </div>
  );
}

export default FormField;
