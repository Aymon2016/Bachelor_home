
const router = require('express').Router();

router.get('/signup', (req, res) => {

    const data = {
        code: 201,
        message: "singup successfull",


    }
    res.status(201).json({ data })
})



module.exports = router;