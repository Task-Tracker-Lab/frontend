import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { type AppAbility } from '../ui/AbilityProvider';

export function createBuilder() {
  return new AbilityBuilder<AppAbility>(createMongoAbility);
}
