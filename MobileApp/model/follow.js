export default class Follow {
  constructor(response) {
    this.avatarUrls = [];
    this.names = [];
    this.usernames = [];

    if (!Array.isArray(response)) {
      // handle invalid parameter
      return;
    }

    for (let i = 0; i < response.length; i += 1) {
      const followInfo = response[i];

      if (Object.prototype.hasOwnProperty.call(followInfo, 'avatarUrl') && followInfo.avatarUrl) {
        this.avatarUrls.push(followInfo.avatarUrl);
      } else {
        this.avatarUrls.push('');
      }

      if (Object.prototype.hasOwnProperty.call(followInfo, 'name') && followInfo.name) {
        this.names.push(followInfo.name);
      } else {
        this.names.push('Unknown name');
      }

      if (Object.prototype.hasOwnProperty.call(followInfo, 'login') && followInfo.login) {
        this.usernames.push(followInfo.login);
      } else {
        this.usernames.push('Unknown username');
      }
    }
  }
}
