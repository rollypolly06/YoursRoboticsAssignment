import React, { useState, useRef } from 'react';
import { Trash } from 'lucide-react';

import { uploadFile } from '../api'; // Your backend function

export default function FileUploader() {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const fileInputRef = useRef(null);

  // --- Drag and Drop Handlers ---
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    }
  };

  // --- Click Handlers ---
  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
    // Reset the input value so the user can select the same file again if they remove it
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // --- UI Interactions ---
  const removeFile = (indexToRemove) => {
    setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async () => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    try {
      await uploadFile(files);
      alert("Files uploaded successfully!");
      setFiles([]); // Clear list on success
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload files.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto font-sans">
      {/* Drag & Drop Zone */}
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
        className={`
          border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors duration-200
          ${isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
          }
        `}
      >
        <p className="text-gray-600 m-0 pointer-events-none">
          "Drag & Drop files here, or click to select"
        </p>
        
        {/* Hidden File Input */}
        <input 
          type="file" 
          multiple 
          ref={fileInputRef} 
          onChange={handleFileSelect} 
          className="hidden" 
        />
      </div>

      {/* File Preview List */}
      {files.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-semibold mb-3">
            Selected Files:
          </h4>
          <div className='flex flex-col gap-1'>
            {files.map((file, index) => (
              <div 
              key={`${file.name}-${index}`} 
              className="flex items-center justify-between p-2 bg-light rounded-md"
              >
                <span className="text-sm truncate w-11/12">
                  {file.name}
                </span>
                <Trash 
                  onClick={() => removeFile(index)}
                  className="text-muted hover:text-red-300 hover:cursor-pointer font-bold focus:outline-none"
                  aria-label={`Remove ${file.name}`}
                  />
              </div>
            ))}
          </div>

          {/* Upload Button */}
          <button 
            onClick={handleSubmit} 
            disabled={isUploading}
            className={`
              mt-5 w-full py-2 px-4 rounded-md text-white font-bold transition-colors duration-200
              ${isUploading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:ring-offset-2'
              }
            `}
          >
            {isUploading ? 'Uploading...' : `Upload ${files.length} File(s)`}
          </button>
        </div>
      )}
    </div>
  );
}