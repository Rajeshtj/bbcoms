let creds = {
    url: 'https://spl9-pt99-2.parentlink.net',
    user: 'spl9support',
    password: 'pw'
  }
  
  if (process.env.ENV == 'DEV') {
    creds = {
      url: 'https://spl9-pt99-2.parentlink.net',
      user: 'spl9support',
      password: 'pw'
    }
  }

  if (process.env.ENV == 'QA') {
    
    creds = {
      url: 'https://spl9-pt99-2.parentlink.net',
      user: 'spl9support',
      password: 'pw'
    }
  }

  if (process.env.ENV == 'STAGE') {
    creds = {
      url: 'https://spl9-pt99-2.parentlink.net',
      user: 'spl9support',
      password: 'pw'
    }
  }
  
  module.exports = creds