const allRoles = {
  user: ["updateAvatar", "updateNickname"],
  admin: ["getUser", "manageUsers"],
};

export const roles: string[] = Object.keys(allRoles);
export const roleRights: Map<string, string[]> = new Map(
  Object.entries(allRoles)
);
