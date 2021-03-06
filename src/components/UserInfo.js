export default class UserInfo {
  constructor ({userNameSelector, userJobSelector, userAvatarSelector}) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo () {
    const userData = {userName: this._userName.textContent, userJob: this._userJob.textContent};
    return userData;
  }

  setUserInfo ({userName, userJob}) {
    if (userName) {
      this._userName.textContent = userName;
    }
    if (userJob) {
      this._userJob.textContent = userJob;
    }
  }

  setUserAvatar (userAvatar) {
    if (userAvatar) {
      this._userAvatar.src = userAvatar;
    }
  }
}