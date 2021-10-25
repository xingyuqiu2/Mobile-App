/**
 * Repository class to store the information in Repository screen.
 * Set class variables to default value if parameter is invalid or sent value is empty.
 */
export default class Repository {
  constructor(response) {
    this.repoNames = [];
    this.users = [];
    this.descriptions = [];

    if (!Array.isArray(response)) {
      // handle invalid parameter
      return;
    }

    for (let i = 0; i < response.length; i += 1) {
      const repoInfo = response[i];

      if (Object.prototype.hasOwnProperty.call(repoInfo, 'name') && repoInfo.name) {
        this.repoNames.push(repoInfo.name);
      } else {
        this.repoNames.push('Unknown repo name');
      }

      if (Object.prototype.hasOwnProperty.call(repoInfo, 'owner') && Object.prototype.hasOwnProperty.call(repoInfo.owner, 'login') && repoInfo.owner.login) {
        this.users.push(repoInfo.owner.login);
      } else {
        this.users.push('Unknown username');
      }

      if (Object.prototype.hasOwnProperty.call(repoInfo, 'description') && repoInfo.description) {
        this.descriptions.push(repoInfo.description);
      } else {
        this.descriptions.push('Empty');
      }
    }
  }
}
