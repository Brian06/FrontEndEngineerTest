var axios = require('axios');
var utils = require('./utils');

module.exports = function (app) {
  let apiUrlBase = "/api/v1";

  app.get(`${apiUrlBase}/get-report/:_email`, (req, res) =>  {
    const email = req.params._email;
    axios.get(`https://www.beenverified.com/hk/dd/email?email=${email}`)
    .then(response => {
      let parserNames = utils.getNames(response.data);
      let parserEmails = utils.getEmails(response.data);
      let parserJobs = utils.getJobs(response.data);
      let parserSocials = utils.getSocials(response.data);
      let report = { "names": parserNames, "emails": parserEmails, "jobs": parserJobs, "socials": parserSocials };
      res.json(report);
    })
    .catch(error => {
      res.status(500).send('Internal Server Error');
    });
  })
}