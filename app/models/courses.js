const path = require('path')
const fs = require('fs')

const organisationModel = require('./organisations')

exports.findMany = (params) => {
  let courses = []

  console.log(params);

  // get all accredited bodies
  const organisations = organisationModel.findMany({
    isAccreditedBody: true
  })

  console.log(organisations.length);

  // put courses into memory
  organisations.forEach((organisation, i) => {
    const directoryPath = path.join(__dirname, '../data/courses/' + organisation.id)

    let documents = fs.readdirSync(directoryPath, 'utf8')
    // Only get JSON documents
    documents = documents.filter(doc => doc.match(/.*\.(json)/ig))

    documents.forEach((filename) => {
      const raw = fs.readFileSync(directoryPath + '/' + filename)
      const data = JSON.parse(raw)
      courses.push(data)
    })
  })




  // filter courses

  // if (params.organisationId) {
  //   const directoryPath = path.join(__dirname, '../data/courses/' + params.organisationId)
  //
  //   // to prevent errors when an organisation doesn't have any courses
  //   // create an empty course directory for the organisation
  //   if (!fs.existsSync(directoryPath)) {
  //     fs.mkdirSync(directoryPath)
  //   }
  //
  //   let documents = fs.readdirSync(directoryPath, 'utf8')
  //
  //   // Only get JSON documents
  //   documents = documents.filter(doc => doc.match(/.*\.(json)/ig))
  //
  //   documents.forEach((filename) => {
  //     const raw = fs.readFileSync(directoryPath + '/' + filename)
  //     const data = JSON.parse(raw)
  //     courses.push(data)
  //   })
  // }
  //
  if (params.cycleId) {
    courses = courses.filter(course => course.cycle === params.cycleId)
  }
  //
  // if (params.courseCode) {
  //   courses = courses.filter(course => course.code === params.courseCode)
  // }

  console.log(courses.length);

  return courses
}

exports.findOne = (params) => {
  let course = {}

  if (params.organisationId && params.courseId) {
    const directoryPath = path.join(__dirname, '../data/courses/' + params.organisationId)

    const filePath = directoryPath + '/' + params.courseId + '.json'

    const raw = fs.readFileSync(filePath)
    course = JSON.parse(raw)
  }

  return course
}
