/**
 * Profile class to store the information in profile screen.
 * Set class variables to default value if parameter is invalid or sent value is empty.
 */
export default class Profile {
  constructor(response) {
    this.avatarUrl = Object.prototype.hasOwnProperty.call(response, 'avatarUrl') && response.avatarUrl ? response.avatarUrl : '';
    this.name = Object.prototype.hasOwnProperty.call(response, 'name') && response.name ? response.name : 'Unknown name';
    this.userName = Object.prototype.hasOwnProperty.call(response, 'login') && response.login ? response.login : 'Unknown username';
    this.bio = Object.prototype.hasOwnProperty.call(response, 'bio') && response.bio ? response.bio : 'Empty';
    this.websiteUrl = Object.prototype.hasOwnProperty.call(response, 'websiteUrl') && response.websiteUrl ? response.websiteUrl : 'Empty';
    this.email = Object.prototype.hasOwnProperty.call(response, 'email') && response.email ? response.email : 'Empty';
    this.reposCount = Object.prototype.hasOwnProperty.call(response, 'repositories') && Object.prototype.hasOwnProperty.call(response.repositories, 'totalCount')
      ? response.repositories.totalCount : 'Unknown';
    this.followersCount = Object.prototype.hasOwnProperty.call(response, 'followers') && Object.prototype.hasOwnProperty.call(response.followers, 'totalCount')
      ? response.followers.totalCount : 'Unknown';
    this.followingCount = Object.prototype.hasOwnProperty.call(response, 'following') && Object.prototype.hasOwnProperty.call(response.following, 'totalCount')
      ? response.following.totalCount : 'Unknown';
    this.createdAt = Object.prototype.hasOwnProperty.call(response, 'createdAt') && response.createdAt ? response.createdAt : 'Unknown';
  }
}
