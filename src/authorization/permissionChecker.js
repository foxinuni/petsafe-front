export default class PermissionChecker {
  constructor(currentUser) {
    this.currentUser = currentUser;
    this.userRol = currentUser ? currentUser?.rol?.permissions : null;
  }

  match(permission) {
    if (!permission) {
      return true;
    }
    if (permission instanceof Array) {
      return this.rolesMatchOneOf(
        permission.reduce((previous, current) => previous + current.bit, 0),
      );
    }
    return this.rolesMatchOneOf(permission.bit);
  }

  rolesMatchOneOf(perm) {
    if (!this.userRol || !perm) {
      return false;
    }
    if (this.userRol === 1) {
      return true;
    }

    return perm & this.userRol;
  }

  get isAuthenticated() {
    return !!this.currentUser;
  }
}
