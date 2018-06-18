function getNames(data) {
  let parserNames = [];
  if (data.names.length) {
    data.names.forEach(name => {
      parserNames.push(name.full);
    });
  }
  return parserNames;
}

function getEmails(data) {
  let parserEmails = [];
  if (data.emails.length) {
    data.emails.forEach(email => {
      parserEmails.push(email.email_address);
    });
  }
  return parserEmails;
}

function getJobs(data) {
  let parserJobs = [];
  if (data.jobs.length) {
    data.jobs.forEach(job => {
      let companyAndTittle = { "company": job.company, "title": job.title };
      parserJobs.push(companyAndTittle);
    });
  }
  return parserJobs;
}

function getSocials(data) {
  let parserSocials = [];
  if (data.social.length) {
    data.social.forEach(social => {
      let socialAndLink = { "type": social.type, "url": social.url };
      parserSocials.push(socialAndLink);
    });
  }
  return parserSocials;
}

module.exports = {
  getNames: getNames,
  getEmails: getEmails,
  getJobs: getJobs,
  getSocials: getSocials
};