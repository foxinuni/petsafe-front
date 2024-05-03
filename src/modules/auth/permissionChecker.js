export default class PermissionChecker {
  constructor(currentUser) {
    this.currentUser = currentUser;
    this.userRol = currentUser
      ? currentUser.rol.permissions
      : null;
  }

  match(permission) {
    if (!permission) {
      return true;
    }
    return this.rolesMatchOneOf(permission.bit);
  }

  rolesMatchOneOf(perm) {
    console.log(`preguntando por permiso: ${perm}`);
    if (!this.userRol || !perm) {
      return false;
    }
    if (this.userRol === 1) {
      return true;
    }

    return perm & this.userRol;
  }

  get isEmptyPermissions() {
    if (!this.isAuthenticated) {
      return false;
    }

    return !this.userRol;
  }

  get isAuthenticated() {
    return !!this.currentUser;
  }

  get isEmailVerified() {
    return true;
  }
}
