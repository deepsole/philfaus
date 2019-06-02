const express = require("express");
const Driver = require('../models/driver');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.post('', checkAuth, (req, res, next) => {
  const driver = new Driver({
    fname: req.body.fname,
    lname: req.body.lname,
    address: req.body.address,
    license: req.body.license,
    phone: req.body.phone,
    amount: req.body.amount,
    weekAmount: req.body.weekAmount,
    carMake: req.body.carMake,
    carModel: req.body.carModel,
    carChasis: req.body.carChasis,
    carReg: req.body.carReg,
    date: req.body.date
  });
  driver.save().then(createdDriver => {
    res.status(201).json({
      message: 'New Driver Added duccessfully',
      driverId: createdDriver._id
    });
  })
  .catch(error => {
    res.status(500).json({
      message: 'Creating a Driver failed'
    })
  })
});

router.put('/:id', checkAuth, (req, res, next) => {
  const driver = new Driver({
    _id: req.body.id,
    fname: req.body.fname,
    lname: req.body.lname,
    address: req.body.address,
    license: req.body.license,
    phone: req.body.phone,
    amount: req.body.amount,
    weekAmount: req.body.weekAmount,
    carMake: req.body.carMake,
    carModel: req.body.carModel,
    carChasis: req.body.carChasis,
    carReg: req.body.carReg,
    date: req.body.date
  });
  Driver.updateOne({_id: req.params.id}, driver).then(result => {
    if (result.nModified > 0) {
    res.status(200).json({ message: 'Driver updated successfully!'});
  } else {
    res.status(401).json({ message: 'Not authorized!'});
}
})
.catch(error => {
  res.status(500).json({
    message: 'Could not update driver!'
  })
});
});


router.get('', (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const driverQuery = Driver.find();
  let fetchedDrivers;
  if (pageSize && currentPage) {
    driverQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  driverQuery.then(documents => {
    fetchedDrivers = documents;
    return Driver.count();
  })
    .then(count => {
      res.status(200).json({
        message: 'Driver fetched successfully',
        drivers: fetchedDrivers,
        maxDrivers: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching driver failed!'
      })
    })
});

router.get('/:id', (req, res, next) => {
  Driver.findById(req.params.id).then(driver => {
    if (driver) {
      res.status(200).json(driver);
    } else {
      res.status(400).json({message: 'Driver not found!'});
    }

  }).catch(error => {
    res.status(500).json({
      message: 'Fetching driver failed!'
    })
  });
});


router.delete('/:id', checkAuth, (req, res, next) => {
  Driver.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Driver deleted!'});
  });
});


module.exports = router;
