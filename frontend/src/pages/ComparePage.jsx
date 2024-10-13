import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const ComparePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const file = location.state?.file;
  const downloadUrl = location.state?.downloadUrl;
  const [fileContent, setFileContent] = useState(null);
  const [editedContent, setEditedContent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [rowCount, setRowCount] = useState(-2);

  useEffect(() => {
    if (!file || !downloadUrl) {
      console.log("No file or download URL found");
      return;
    }

    fetch(downloadUrl)
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target.result;
          setFileContent(content);
          setEditedContent(content);
          setRowCount(Math.max(0, content.split('\n').length - 2));
        };
        reader.readAsText(blob);
      })
      .catch(error => {
        console.error("Error fetching file content:", error);
      });
  }, [file, downloadUrl]);

  const handleCellEdit = (rowIndex, cellIndex, newValue) => {
    const rows = editedContent.split('\n');
    const cells = rows[rowIndex].split(',');
    cells[cellIndex] = newValue;
    rows[rowIndex] = cells.join(',');
    setEditedContent(rows.join('\n'));
  };

  const handleSaveChanges = () => {
    setFileContent(editedContent);
    setIsEditing(false);
  };

  const handleDownload = () => {
    const blob = new Blob([fileContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name || 'excel_file.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderExcelContent = () => {
    if (!editedContent) {
      return <p className="text-gray-600">Loading Excel content...</p>;
    }

    const rows = editedContent.split('\n').map((row, rowIndex) => {
      const cells = row.split(',');
      return (
        <tr key={rowIndex}>
          {cells.map((cell, cellIndex) => (
            <td key={cellIndex} className="border px-4 py-2">
              {isEditing ? (
                <input
                  type="text"
                  value={cell}
                  onChange={(e) => handleCellEdit(rowIndex, cellIndex, e.target.value)}
                  className="w-full p-1 border rounded"
                />
              ) : (
                cell
              )}
            </td>
          ))}
        </tr>
      );
    });

    return (
      <div className="overflow-x-auto">
        <p className="text-gray-700 mb-2">Number of rows: {rowCount}</p>
        <table className="min-w-full bg-white">
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Uploaded Invoice</h2>
          {file && (
            <img
              src={URL.createObjectURL(file)}
              alt="Uploaded Invoice"
              className="max-w-full h-auto rounded-lg shadow-md"
            />
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Processed Excel Data</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            {renderExcelContent()}
            <div className="mt-4 space-x-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveChanges}
                    className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Edit
                </button>
              )}
              <button
                onClick={handleDownload}
                className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Download Excel File
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-8 text-center">
        <button
          onClick={() => navigate(-1)}
          className="py-2 px-6 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Back to Results
        </button>
      </div>
    </div>
  );
};