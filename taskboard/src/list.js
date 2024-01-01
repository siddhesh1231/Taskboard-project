import React from 'react';
import { useDrop } from 'react-dnd';
import Task from './task';

const List = ({ list, onTaskMove, onTaskComplete }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => onTaskMove(item.id, list.id),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={`list ${isOver ? 'drag-over' : ''}`}>
      <h2>{list.name}</h2>
      <ul>
        {list.tasks.map(task => (
        <task
            key={task.id}
            task={task}
            listId={list.id}
            onTaskMove={onTaskMove}
            onTaskComplete={onTaskComplete}
          />
        ))}
      </ul>
    </div>
  );
};

export default List;
