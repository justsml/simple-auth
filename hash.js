const bcrypt = require('bcryptjs')

module.exports = {hash}

function hash(str) {
  return new Promise((resolve, reject) => {
    const salt = bcrypt.genSaltSync(12)
    return bcrypt.hash(str, salt, (err, hash) => {
      if (err) return reject(err)
      resolve(hash)
    })
  })
}
