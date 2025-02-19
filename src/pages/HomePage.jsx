// src/pages/HomePage.jsx
import React, { useState } from 'react';
import Layout from '../components/Layout';
import InputCreator from '../components/InputCreator';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const HomePage = () => {
  const [formFields, setFormFields] = useState([]);
  const [editingField, setEditingField] = useState(null);

  const handleAddField = (newField) => {
    if (editingField) {
      setFormFields(formFields.map(field => 
        field.id === editingField.id ? { ...newField, id: field.id } : field
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
      <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-2/3 p-6">
          <Layout 
            fields={formFields} 
            onDelete={handleDeleteField}
            onEdit={handleEditField}
            onMove={handleMoveField}
          />
        </div>
        <div className="w-1/3 p-6 border-l border-gray-200 shadow-lg bg-white">
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