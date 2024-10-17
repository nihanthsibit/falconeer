import { SetMetadata } from "@nestjs/common/decorators/core/set-metadata.decorator";
import { role_id } from "src/constants";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: role_id[]) => SetMetadata(ROLES_KEY, roles);