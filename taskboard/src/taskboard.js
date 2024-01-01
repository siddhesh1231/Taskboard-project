import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from './list';

const TaskBoard = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    // Fetch lists from the server when the component mounts
    axios.get('/lists')
      .then(response => setLists(response.data))
      .catch(error => console.error('Error fetching lists:', error));
  }, []);

  const handleTaskMove = (taskId, newListId) => {
    // Update task's listId in the database
    axios.put(`/tasks/${taskId}`, { listId: newListId })
      .then(response => {
        // Update state to reflect the change
        setLists(prevLists => {
          return prevLists.map(list => {
            if (list.id === newListId) {
              return {
                ...list,
                tasks: [...list.tasks, response.data],
              };
            } else if (list.id === response.data.oldListId) {
              return {
                ...list,
                tasks: list.tasks.filter(task => task.id !== response.data.id),
              };
            }
            return list;
          });
        });
      })
      .catch(error => console.error('Error updating task:', error));
  };

  const handleTaskComplete = (taskId, listId) => {
    // Remove completed task from the list and update the database
    axios.delete(`/tasks/${taskId}`)
      .then(() => {
        setLists(prevLists => {
          return prevLists.map(list => {
            if (list.id === listId) {
              return {
                ...list,
                tasks: list.tasks.filter(task => task.id !== taskId),
              };
            }
            return list;
          });
        });
      })
      .catch(error => console.error('Error completing task:', error));
  };

  return (
    <div className="task-board">
      <div className="lists-container">
        {lists.map(list => (
          <List
            key={list.id}
            list={list}
            onTaskMove={handleTaskMove}
            onTaskComplete={handleTaskComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
