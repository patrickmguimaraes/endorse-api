const allRoles = {
  public: ['public-files'],
  user: ['autoManagement', 'private-files'],
  admin: ['getUsers', 'manageUsers'],
};

export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));
