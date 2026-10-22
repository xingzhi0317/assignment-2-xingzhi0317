function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={task.completed ? 'task completed' : 'task'}>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className="task-text">{task.text}</span>
      </label>
      <button
        type="button"
        className="delete-btn"
        aria-label={`Delete ${task.text}`}
        onClick={() => onDelete(task.id)}
      >
        ×
      </button>
    </li>
  )
}

export default TaskItem
