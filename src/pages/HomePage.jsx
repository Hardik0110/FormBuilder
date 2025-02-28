import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = React.lazy(() => import('../components/Layout'));
const InputCreator = React.lazy(() => import('../components/InputCreator'));

const HomePage = () => {
  const [formFields, setFormFields] = useState([]);
  const [editingField, setEditingField] = useState(null);

  const handleAddField = useCallback((newField) => {
    if (!newField.label || !newField.type) {
      toast.error('Please fill in all required fields');
      return;
    }
  
    if (newField.type === 'radio' && (!newField.options || newField.options.length === 0)) {
      toast.error('Please add at least one option for radio button');
      return;
    }
  
    if (editingField) {
      setFormFields(prevFields => 
        prevFields.map(field =>
          field.id === editingField.id ? { ...newField, id: editingField.id } : field
        )
      );
      setEditingField(null);
      toast.success('Field updated successfully!');
    } else {
      setFormFields(prevFields => [...prevFields, { ...newField, id: Date.now() }]);
      toast.success('Field added successfully!');
    }
  }, [editingField]);

  const handleDeleteField = useCallback((id) => {
    setFormFields(prevFields => prevFields.filter(field => field.id !== id));
    toast.info('Field deleted');
  }, []);

  const handleEditField = useCallback((id) => {
    const fieldToEdit = formFields.find(field => field.id === id);
    setEditingField(fieldToEdit);
  }, [formFields]);

  const handleMoveField = useCallback((dragIndex, hoverIndex) => {
    setFormFields(prevFields => {
      const newFields = [...prevFields];
      const draggedField = newFields[dragIndex];
      newFields.splice(dragIndex, 1);
      newFields.splice(hoverIndex, 0, draggedField);
      return newFields;
    });
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-r from-violet-900 via-indigo-900 to-purple-900 p-6 
        overflow-hidden animate-gradient-x">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-2xl 
              border border-violet-500/20 overflow-hidden transition-all duration-300 
              hover:border-violet-500/40 animate-fadeIn">
              <React.Suspense fallback={<div className="p-8 text-center text-white">Loading layout...</div>}>
                <Layout
                  fields={formFields}
                  onDelete={handleDeleteField}
                  onEdit={handleEditField}
                  onMove={handleMoveField}
                />
              </React.Suspense>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-2xl 
              border border-violet-500/20 overflow-hidden transition-all duration-300 
              hover:border-violet-500/40 animate-slideIn">
              <React.Suspense fallback={<div className="p-8 text-center text-white">Loading creator...</div>}>
                <InputCreator
                  onAdd={handleAddField}
                  editingField={editingField}
                />
              </React.Suspense>
            </div>
          </div>
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
    </DndProvider>
  );
};

export default React.memo(HomePage);
