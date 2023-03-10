const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'trial1',
  password: 'password',
  port: 5432,
})
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY student_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const student_id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE student_id = $1', [student_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { name, age, gender } = request.body

  pool.query('INSERT INTO users (name, age, gender) VALUES ($1, $2, $3)', [name, age, gender], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const updateUser = (request, response) => {
  const student_id = parseInt(request.params.id)
  const { name, age, gender } = request.body

  pool.query(
    'UPDATE users SET name = $1, age = $2, gender = $3 WHERE student_id = $4',
    [name, age, gender, student_id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${student_id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const student_id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE student_id = $1', [student_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${student_id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}