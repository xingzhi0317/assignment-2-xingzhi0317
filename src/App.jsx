import { useState } from 'react'
import './App.css'
import menuIcon from './assets/menu_icon.png'
import searchIcon from './assets/search_icon.png'
import inboxIcon from './assets/inbox_icon.png'
import calendarIcon from './assets/calendar_icon.png'
import upcomingIcon from './assets/upcoming_icon.png'
import TaskCounter from './components/TaskCounter'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

const FILTERS = ['All', 'Active', 'Completed']

const initialTasks = [
  { id: 1, text: 'Call Mom', completed: false },
  { id: 2, text: 'Buy the new issue of Scientific American', completed: false },
  { id: 3, text: 'Return the textbook to Josie', completed: false },
  { id: 4, text: 'Buy the new album by Rake', completed: false },
  { id: 5, text: 'Buy a gift card for Dad', completed: false },
]

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [filter, setFilter] = useState('All')
  const [nextId, setNextId] = useState(initialTasks.length + 1)

  const addTask = (text) => {
    setTasks([...tasks, { id: nextId, text, completed: false }])
    setNextId(nextId + 1)
  }

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const completedCount = tasks.filter((task) => task.completed).length

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'Active') return !task.completed
    if (filter === 'Completed') return task.completed
    return true
  })

  return (
    <>
      <header>
        <img src={menuIcon} alt="Menu" />
        <label className="search">
          <img src={searchIcon} alt="" />
          <input type="text" placeholder="Quick find" />
        </label>
        <TaskCounter total={tasks.length} completed={completedCount} />
      </header>

      <div className="layout">
        <nav aria-label="Task categories">
          <ul>
            <li className="active">
              <img src={inboxIcon} alt="" />
              Inbox <span>{tasks.length}</span>
            </li>
            <li>
              <img src={calendarIcon} alt="" />
              Today <span>{tasks.length}</span>
            </li>
            <li>
              <img src={upcomingIcon} alt="" />
              Upcoming
            </li>
          </ul>
        </nav>

        <main>
          <h1>Inbox</h1>
          <div className="filters">
            {FILTERS.map((name, index) => (
              <span key={name}>
                {index > 0 && <span className="separator">|</span>}
                <button
                  type="button"
                  className={filter === name ? 'filter-btn active' : 'filter-btn'}
                  onClick={() => setFilter(name)}
                >
                  {name}
                </button>
              </span>
            ))}
          </div>
          <TaskForm onAdd={addTask} />
          <TaskList
            tasks={visibleTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        </main>
      </div>
    </>
  )
}

export default App
