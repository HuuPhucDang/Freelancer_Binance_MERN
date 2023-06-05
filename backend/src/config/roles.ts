const allRoles = {
  user: ["selfUpdate"],
  admin: ["getUser", "manageUsers", "selfUpdate"],
};

export const roles: string[] = Object.keys(allRoles);
export const roleRights: Map<string, string[]> = new Map(
  Object.entries(allRoles)
);
