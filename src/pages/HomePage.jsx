import React, { useState } from 'react';
import Layout from '../components/Layout';
import InputCreator from '../components/InputCreator';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const HomePage = () => {
  const [formFields, setFormFields] = useState([]);
  const [editingField, setEditingField] = useState(null);

  const handleAddField = (newField) => {
    if (!newField.label || !newField.type) {
      alert('Please fill in all required fields');
      return;
    }
  
    if (newField.type === 'radio' && (!newField.options || newField.options.length === 0)) {
      alert('Please add at least one option for radio button');
      return;
    }
  
    if (editingField) {
      setFormFields(formFields.map(field =>
        field.id === editingField.id ? { ...newField, id: editingField.id } : field
      ));
      setEditingField(null);
    } else {
      setFormFields([...formFields, { ...newField, id: Date.now() }]);
    }
  };

  const handleDeleteField = (id) => {
    setFormFields(formFields.filter(field => field.id !== id));
  };

  const handleEditField = (id) => {
    const fieldToEdit = formFields.find(field => field.id === id);
    setEditingField(fieldToEdit);
  };

  const handleMoveField = (dragIndex, hoverIndex) => {
    const newFields = [...formFields];
    const draggedField = newFields[dragIndex];
    newFields.splice(dragIndex, 1);
    newFields.splice(hoverIndex, 0, draggedField);
    setFormFields(newFields);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen bg-gradient-to-r from-violet-900 via-indigo-900 to-purple-900 p-6">
        <div className="w-2/3 p-6 bg-gray-900 rounded-2xl shadow-2xl backdrop-blur-lg border border-violet-500/20 overflow-hidden transition-all duration-300 hover:border-violet-500/40 animate-fadeIn">
          <Layout
            fields={formFields}
            onDelete={handleDeleteField}
            onEdit={handleEditField}
            onMove={handleMoveField}
          />
        </div>
        <div className="w-1/3 p-6 bg-gray-900 rounded-2xl shadow-2xl backdrop-blur-lg border border-violet-500/20 ml-6 transition-all duration-300 hover:border-violet-500/40 animate-slideIn">
          <InputCreator
            onAdd={handleAddField}
            editingField={editingField}
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default HomePage;
