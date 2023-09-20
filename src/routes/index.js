
const router = require('express').Router();
// Admin auth controllers
const { controllers: adminAuthController } = require('../api/v1/adminAuth');
// auth controllers
const { controllers: authsController } = require('../api/v1/auth');
// token generator controllers
const { controllers: tokensController } = require('../api/v1/token');
// members controllers
const { controllers: membersController } = require('../api/v1/members');
// Accounts controllers
const { controllers: transectionsController } = require('../api/v1/transections');
// Meals controllers
const { controllers: mealsController } = require('../api/v1/meals');
// product controllers
const { controllers: productsController } = require('../api/v1/products');
// Notices controllers
const { controllers: noticesController } = require('../api/v1/notices');
// Reports controllers
const { controllers: monthlyReportsController } = require('../api/v1/reports');


const authenticate = require('../middleware/auth/authenticate')
const authorize = require('../middleware/auth/authorize')

// Admin Auth routes
router
    .post('/api/v1/auth/signup', adminAuthController.signup)


// Auth routes 
router
    .post('/api/v1/signup', authenticate, authorize, authsController.signup)
    .post('/api/v1/signin', authsController.signin)
    .post('/api/v1/signout', authenticate, authsController.signout)


// Acess token generate routes 
router
    .post('/api/v1/refresh_token', tokensController.generateAccessToken)


// Member routes 
router
    .get('/api/v1/members', authenticate, membersController.findAll)
    .get('/api/v1/members/:id', authenticate, membersController.findSingle)
    .patch('/api/v1/members/:id', authenticate, membersController.updateMember)
    .delete('/api/v1/members/:id', authenticate, membersController.removeMember)
    .patch('/api/v1/members/:id/change_password', membersController.changePassword)


// transection routes 

// Note: deposite create kore just handle korte cassi.
router
    .post('/api/v1/transections/members/:member_id', authenticate, transectionsController.create)
    .get('/api/v1/transections/:id', authenticate, transectionsController.findSingle)
    .get('/api/v1/transections/members/:member_id', authenticate, transectionsController.findAllOfMember)
    .patch('/api/v1/transections/:id', authenticate, transectionsController.update)


// Meals routes 
router
    .post('/api/v1/meals', authenticate, mealsController.createMeal)
    .patch('/api/v1/meals/:id', authenticate, mealsController.updateMeal)
    .delete('/api/v1/meals/:id', authenticate, mealsController.removeMeal)
    .get('/api/v1/meals/', authenticate, mealsController.findAll)
    .get('/api/v1/meals/:id', authenticate, mealsController.findSingle)
    .get('/api/v1/members/:member_id/meals', authenticate, mealsController.findAllOfMember)


// products routes 
router
    .post('/api/v1/products', authenticate, productsController.create)
    .patch('/api/v1/products/:id', authenticate, productsController.updateProduct)
    .delete('/api/v1/products/:id', authenticate, productsController.removeProduct)
    .get('/api/v1/products', authenticate, productsController.findAll)
    .get('/api/v1/products/:id', authenticate, productsController.findSingle)


// Notices routes 
router
    .post('/api/v1/notices', authenticate, noticesController.create)
    .patch('/api/v1/notices/:id', authenticate, noticesController.updateNotice)
    .delete('/api/v1/notices/:id', authenticate, noticesController.removeNotice)
    .get('/api/v1/notices', authenticate, noticesController.findAll)
    .get('/api/v1/notices/:id', authenticate, noticesController.findSingle)

// Reports routes 
router

    .get('/api/v1/monthly_reports', authenticate, monthlyReportsController.homeReports)
    .get('/api/v1/monthly_reports/members/:member_id', authenticate, monthlyReportsController.singleMemberReport)

module.exports = router;