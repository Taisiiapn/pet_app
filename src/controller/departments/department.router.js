const logger = require('../../config/logger');
const controller = require('./department.controller')


module.exports = {

    departmentsRootRoute: (req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        controller.renderDepartments((error, html) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'text/html' })
                logger.error(error)
            } else {
                res.end(html)
            }
        })
    },

    addDepartmentRoute: (req, res) => {

        let query = req.query

        const parameters = Object.assign({});

        if(query.error) {
            parameters.error = query.error;
        }
        if(query.body) {
            parameters.values = JSON.parse(query.body);
        }

        controller.renderCreateDepartment(parameters, (error, html) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'text/html' })
                logger.error(error)
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(html)
            }
        })
    },

    editDepartmentRoute: (req, res) => {

        const { departmentId } = req.params
        const query = req.query


        controller.renderEditDepartment(departmentId, query, (error, html) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'text/html' })
                logger.error(error)
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(html)
            }
        })
    },

    deleteDepartmentAction: (req, res) => {

        const { departmentId } = req.params

        controller.deleteDepartment(departmentId, (error) => {
            if (error) {
                res.writeHead(500, { 'Content-Type': 'text/plain'});
                res.end(error.message)
                logger.error(error)
            } else {
                res.writeHead(301, { 'Location':  '/departments' });
                res.end();
            }
        }) 
    },

    addDepartmentAction: (req, res) => {

        const body = req.body

            controller.addDepartment(body, (error, validationError) => {
                if (error) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' }); 
                    res.end(error.message);
                    return logger.error(error)
                } 
                if (validationError) {
                    
                    const bodyJSON = JSON.stringify(body)

                    const redirectUrl = `create?body=${bodyJSON}&error=${validationError.message}`
                    res.writeHead(301, { 'Location':  redirectUrl });
                    return res.end();
                }
                
                res.writeHead(301, { 'Location':  '/departments' });
                res.end();
                
            })
    },

    editDepartmentAction: (req, res) => {

        const { departmentId } = req.params
        
        const body = req.body

            controller.editDepartment(departmentId, body, (error, validationError) => {
                if (error) {
                    res.writeHead(500, { 'Content-Type': 'text/plain'});
                    res.end(error.message)
                    return logger.error(error);
                }

                if (validationError) {
                    // bad validation case 
                    
                    const bodyJSON = JSON.stringify(body)

                    const redirectUrl = `update?body=${bodyJSON}&error=${validationError.message}`
                    res.writeHead(301, { 'Location':  redirectUrl });
                    return res.end();
                }

                res.writeHead(301, { 'Location':  '/departments' });
                res.end();
            })
    }

}