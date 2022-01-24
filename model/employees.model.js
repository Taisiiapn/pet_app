const { Client } = require('pg')
const { parseOptionalStringValueToColumnRecord, parseOptionalNumberValueToColumnRecord } = require('./utils')

const client = new Client({
    user: 'postgres',
    password: 'qwertyuiop',
    host: 'localhost',
    port: 5432,
    database: 'js_test'
})

client.connect()

module.exports = {

    getEmployeesByDepartmentId: (depId, cb) => {

        
        client.query(`SELECT *
                        FROM employee
                        WHERE departmentid='${depId}';`, 
            (err, res) => {
                if (err) {
                    console.error('err', err.message)
                    cb(new Error('internal server error'))
                } else {
                    cb(null, res.rows)
                }
        })
    },

    getEmployeeById: (id, cb) => {

        
        client.query(`SELECT name, salary, birthday, email
                        FROM employee
                        WHERE id='${id}';`, 
            (err, res) => {
                if (err) {
                    console.error('err', err.message)
                    cb(new Error('internal server error'))
                } else {
                    console.log('getEmployeeById', res.rows)
                    
                    if (res.rows.length === 0) {
                        cb(new Error(`Employee with id - ${id}, nothing found!`))
                    } else {
                        cb(null, res.rows)
                    }

                }
        })
    },

    addEmployee: (values, cb) => {

        const { name, salary, departmentid, birthday, email } = values

        const salaryParsed = parseOptionalNumberValueToColumnRecord(salary)
        const birthdayParsed = parseOptionalStringValueToColumnRecord(birthday)
       
        client.query(`INSERT INTO employee(name, salary, departmentid, birthday, email) 
                        VALUES ('${name}', ${salaryParsed}, '${departmentid}', ${birthdayParsed}, '${email}');`,     
        (err, res) => {
                if (err) {
                    console.error('err addEmployee model' , err.message)
                    cb(new Error('internal server error'))
                } else {
                    cb(null);
                }
        })
    },

    editEmployee: (id, values, cb) => {

        const { name, salary, birthday, email } = values

        const salaryParsed = parseOptionalNumberValueToColumnRecord(salary)
        const birthdayParsed = parseOptionalStringValueToColumnRecord(birthday)
        
        client.query(`UPDATE employee 
                        SET name = '${name}',
                            salary = ${salaryParsed},
                            birthday = ${birthdayParsed},
                            email = '${email}'
                        WHERE id = '${id}';`, 
            (err, res) => {
                if (err) {
                    cb(new Error('internal server error'))
                } else {
                    cb(null);
                }
        })
        
    },

    deleteEmployee: (employeeId, cb) => {
        client.query(`DELETE FROM employee 
                        WHERE id = '${employeeId}';`, 
            (err, res) => {
                if (err) {
                    cb(new Error('internal server error'))
                } else {
                    cb(null);
                }
        })
    },

    isTheSameEmailExists: (values, cb) => {

        const { email } = values

        client.query(`SELECT email
                        FROM employee
                        WHERE email ILIKE '${email}';`, 
            
        (err, res) => {
            if (err) {

                cb(new Error('internal server error'))

            } else {

                if(res.rows.length !== 0) {
                    cb(null, true)
                } else {
                    cb(null, false)
                }
                
            }
        })
    },

    isTheSameEmailExistsWithDifferentId: (employeeId, values, cb) => {

        const { email } = values

        client.query(`SELECT *
                        FROM employee
                        WHERE email ILIKE '${email}'
                        AND id != '${employeeId}';`, 
            
        (err, res) => {
            if (err) {

                cb(new Error('internal server error'))

            } else {

                if(res.rows.length !== 0) {
                    cb(null, true)
                } else {
                    cb(null, false)
                }
                
            }
        })
    }

}