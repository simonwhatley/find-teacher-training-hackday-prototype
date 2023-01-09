const path = require('path')
const fs = require('fs')
const { v4: uuid } = require('uuid')

exports.seed = () => {
  locations()
}


const locations = () => {
  const oDirectoryPath = path.join(__dirname, '../data/seed/organisations/')

  let oDocuments = fs.readdirSync(oDirectoryPath, 'utf8')

  // Only get JSON documents
  oDocuments = oDocuments.filter(doc => doc.match(/.*\.(json)/ig))

  // let i = 1
  // oDocuments.forEach((oFileName) => {
  //
  //   const oFilePath = oDirectoryPath + '/' + oFileName
  //   const oRaw = fs.readFileSync(oFilePath)
  //   const organisation = JSON.parse(oRaw)
  //
  //   if (organisation.isAccreditedBody) {
  //     console.log(i, '----------------------------------------');
  //     console.log(organisation);
  //     i += 1
  //     console.log('----------------------------------------');
  //   }
  //
  // })

}
