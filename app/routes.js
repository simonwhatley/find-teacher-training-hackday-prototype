const express = require('express')
const router = express.Router()

// Controller modules



const checkHasSearchParams = (req, res, next) => {
  if (!req.session.data.filter?.subject) {
    res.redirect('/')
  } else {
    next()
  }
}

/// ------------------------------------------------------------------------ ///
/// ALL ROUTES
/// ------------------------------------------------------------------------ ///
router.all('*', (req, res, next) => {
  res.locals.referrer = req.query.referrer
  res.locals.query = req.query
  next()
})

router.get('/', async (req, res) => {
  if (process.env.SHOW_START_PAGE === 'true') {
    res.render('start')
  } else {
    res.redirect('/search')
  }
})

/// ------------------------------------------------------------------------ ///
/// SEARCH ROUTES
/// ------------------------------------------------------------------------ ///

router.get('/search', searchController.search_get)
router.post('/search', searchController.search_post)

router.get('/age-groups', searchController.age_groups_get)
router.post('/age-groups', searchController.age_groups_post)

router.get('/primary-subjects', searchController.primary_subjects_get)
router.post('/primary-subjects', searchController.primary_subjects_post)

router.get('/secondary-subjects', searchController.secondary_subjects_get)
router.post('/secondary-subjects', searchController.secondary_subjects_post)

/// ------------------------------------------------------------------------ ///
/// AUTOCOMPLETE ROUTES
/// ------------------------------------------------------------------------ ///

router.get('/location-suggestions', searchController.location_suggestions_json)

router.get('/provider-suggestions', searchController.provider_suggestions_json)

/// ------------------------------------------------------------------------ ///
/// PROTOTYPE ADMIN
/// ------------------------------------------------------------------------ ///

router.get('/admin/clear-data', (req, res) => {
  delete req.session.data
  res.redirect('/')
})

/// ------------------------------------------------------------------------ ///
/// ERRORS
/// ------------------------------------------------------------------------ ///

// page not found - 404
// https://design-system.service.gov.uk/patterns/page-not-found-pages/
router.get('/404', (req, res) => {
  res.render('./404')
})

// internal server error - 500
// https://design-system.service.gov.uk/patterns/problem-with-the-service-pages/
router.get('/500', (req, res) => {
  res.render('./500')
})

// service unavailable
// https://design-system.service.gov.uk/patterns/service-unavailable-pages/
router.get('/503', (req, res) => {
  res.render('./503')
})

// page not found
router.get('*', (req, res) => {
  res.render('./404')
})

/// ------------------------------------------------------------------------ ///
/// END
/// ------------------------------------------------------------------------ ///
module.exports = router
