import slack from 'slack-node'
const slackClient = new slack(process.env.slack_api_token)

const changeUserProfile = (userId, text, emoji) => {
  return new Promise((resolve, reject) => {
    const profile = `{"status_text":"${text}","status_emoji": "${emoji}"}`
    const apiCallData = { user: userId, profile: profile}
    slackClient.api('users.profile.set', apiCallData, (err, response) => {
      if (err) {
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

const getUserData = (userId) => {
  return new Promise((resolve, reject) => {
    slackClient.api('users.info', {user: userId}, (err, response) => {
      if (err) {
        reject(err)
      } else {
        resolve(response.user.profile)
      }
    })
  })
}

const exchangeCodeForToken = (code) => {
  return new Promise((resolve, reject) => {
    const data = {
      client_id: process.env.slack_app_client_id,
      client_secret: process.env.slack_app_client_secret,
      code,
      redirect_uri: process.env.slack_app_redirect_uri,
    }

    slackClient.api('oauth.access', data, (err, response) => {
      if (err) {
        reject(err)
      } else {
        resolve(response)
      }
    })
  })
}

export {
  changeUserProfile,
  getUserData,
  exchangeCodeForToken
}