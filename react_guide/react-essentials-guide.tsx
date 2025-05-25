import React, { useState, useEffect, useReducer, useRef, useContext, createContext, useMemo, useCallback } from 'react';

// Context for state management
const ThemeContext = createContext();

// Custom Hook Example
const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => setCount(prev => prev + 1), []);
  const decrement = useCallback(() => setCount(prev => prev - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  
  return { count, increment, decrement, reset };
};

// Reducer for complex state management
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case 'TOGGLE_TODO':
      return state.map(todo => 
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
};

// Child Component with Props
const UserCard = ({ user, onEdit, children }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border">
      <h3 className="font-bold text-lg">{user.name}</h3>
      <p className="text-gray-600">{user.email}</p>
      <button 
        onClick={() => onEdit(user.id)}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Edit
      </button>
      {children}
    </div>
  );
};

// Form Component with Controlled Inputs
const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
      setFormData({ name: '', email: '', message: '' });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
      <div>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>
      
      <div>
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>
      
      <div>
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          className={`w-full p-2 border rounded ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
      </div>
      
      <button 
        type="button"
        onClick={handleSubmit}
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
      >
        Submit
      </button>
    </div>
  );
};

// Main App Component
export default function ReactEssentialsGuide() {
  // useState - Basic state management
  const [activeTab, setActiveTab] = useState('basics');
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ]);
  const [theme, setTheme] = useState('light');
  
  // useReducer - Complex state management
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [newTodo, setNewTodo] = useState('');
  
  // useRef - DOM references and persistent values
  const inputRef = useRef(null);
  const renderCount = useRef(0);
  
  // Custom hook usage
  const { count, increment, decrement, reset } = useCounter(0);
  
  // useEffect - Side effects and lifecycle
  useEffect(() => {
    renderCount.current += 1;
  });
  
  useEffect(() => {
    const savedTheme = localStorage?.getItem('theme') || 'light';
    setTheme(savedTheme);
  }, []);
  
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);
  
  // useMemo - Performance optimization
  const expensiveCalculation = useMemo(() => {
    console.log('Calculating expensive value...');
    return users.reduce((acc, user) => acc + user.name.length, 0);
  }, [users]);
  
  // useCallback - Memoized functions
  const handleUserEdit = useCallback((userId) => {
    alert(`Editing user ${userId}`);
  }, []);
  
  const addTodo = useCallback(() => {
    if (newTodo.trim()) {
      dispatch({ type: 'ADD_TODO', payload: newTodo.trim() });
      setNewTodo('');
      inputRef.current?.focus();
    }
  }, [newTodo]);
  
  const handleFormSubmit = useCallback((formData) => {
    alert(`Form submitted: ${JSON.stringify(formData, null, 2)}`);
  }, []);
  
  // Event handlers
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };
  
  // Conditional rendering helper
  const renderTabContent = () => {
    switch (activeTab) {
      case 'basics':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">React Basics</h3>
            
            <div className="bg-blue-50 p-4 rounded">
              <h4 className="font-semibold mb-2">State Management (useState)</h4>
              <p>Current count: {count}</p>
              <div className="space-x-2 mt-2">
                <button onClick={increment} className="px-3 py-1 bg-blue-500 text-white rounded">+</button>
                <button onClick={decrement} className="px-3 py-1 bg-red-500 text-white rounded">-</button>
                <button onClick={reset} className="px-3 py-1 bg-gray-500 text-white rounded">Reset</button>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded">
              <h4 className="font-semibold mb-2">Props & Component Composition</h4>
              <div className="grid gap-4 md:grid-cols-2">
                {users.map(user => (
                  <UserCard key={user.id} user={user} onEdit={handleUserEdit}>
                    <p className="text-sm text-gray-500 mt-2">Additional content via children</p>
                  </UserCard>
                ))}
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded">
              <h4 className="font-semibold mb-2">Refs & DOM Manipulation</h4>
              <p>Component has rendered {renderCount.current} times</p>
              <button 
                onClick={() => inputRef.current?.focus()}
                className="mt-2 px-3 py-1 bg-purple-500 text-white rounded"
              >
                Focus Input Below
              </button>
            </div>
          </div>
        );
        
      case 'advanced':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Advanced Concepts</h3>
            
            <div className="bg-yellow-50 p-4 rounded">
              <h4 className="font-semibold mb-2">useReducer - Complex State</h4>
              <div className="flex gap-2 mb-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add a todo..."
                  className="flex-1 p-2 border rounded"
                />
                <button onClick={addTodo} className="px-4 py-2 bg-yellow-500 text-white rounded">
                  Add
                </button>
              </div>
              
              <div className="space-y-2">
                {todos.map(todo => (
                  <div key={todo.id} className="flex items-center gap-2 p-2 bg-white rounded">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
                    />
                    <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                      {todo.text}
                    </span>
                    <button
                      onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
                      className="ml-auto text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded">
              <h4 className="font-semibold mb-2">Performance (useMemo & useCallback)</h4>
              <p>Expensive calculation result: {expensiveCalculation}</p>
              <p className="text-sm text-gray-600 mt-2">
                This value is memoized and only recalculates when users array changes
              </p>
            </div>
          </div>
        );
        
      case 'forms':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Forms & Input Handling</h3>
            <ContactForm onSubmit={handleFormSubmit} />
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`min-h-screen p-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">React Essentials Guide</h1>
            <p className="text-gray-600">Complete reference for React confidence</p>
            
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Toggle Theme ({theme})
              </button>
            </div>
          </header>
          
          {/* Tab Navigation */}
          <nav className="flex justify-center gap-4 mb-6">
            {['basics', 'advanced', 'forms'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded capitalize ${
                  activeTab === tab 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
          
          {/* Tab Content */}
          <main className="bg-white rounded-lg shadow-lg p-6">
            {renderTabContent()}
          </main>
          
          {/* Key Concepts Summary */}
          <footer className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Key React Concepts Covered</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-blue-600">Core Hooks</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>useState - Component state</li>
                  <li>useEffect - Side effects & lifecycle</li>
                  <li>useContext - Context consumption</li>
                  <li>useRef - DOM refs & persistent values</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-600">Advanced Patterns</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>useReducer - Complex state logic</li>
                  <li>useMemo - Expensive calculations</li>
                  <li>useCallback - Memoized functions</li>
                  <li>Custom hooks - Reusable logic</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-purple-600">Component Patterns</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Props & children</li>
                  <li>Conditional rendering</li>
                  <li>List rendering with keys</li>
                  <li>Event handling</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-600">Forms & Input</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Controlled components</li>
                  <li>Form validation</li>
                  <li>Input handling patterns</li>
                  <li>Form submission</li>
                </ul>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}