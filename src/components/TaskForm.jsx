import { useState } from 'react'

function TaskForm({ onAdd }) {
  const [text, setText] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (text.trim() === '') return
    onAdd(text.trim())
    setText('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        placeholder="Add a new task"
        aria-label="New task"
        onChange={(event) => setText(event.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  )
}

export default TaskForm
