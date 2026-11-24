import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20261123_191629 from './20261123_191629';
import * as migration_20261124_195014_add_user_role from './20261124_195014_add_user_role';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20261123_191629.up,
    down: migration_20261123_191629.down,
    name: '20261123_191629',
  },
  {
    up: migration_20261124_195014_add_user_role.up,
    down: migration_20261124_195014_add_user_role.down,
    name: '20261124_195014_add_user_role'
  },
];
