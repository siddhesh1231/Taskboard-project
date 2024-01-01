import React from 'react';
import { useDrag } from 'react-dnd';

const Task = ({ task, listId, onTaskMove, onTaskComplete }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <li ref={drag} className={`task ${isDragging ? 'dragging' : ''}`}>
      <div>{task.name}</div>
      <button onClick={() => onTaskComplete(task.id, listId)}>Complete</button>
    </li>
  );
};

export default Task;
