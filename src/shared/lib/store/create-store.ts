'use client';

import { create, StateCreator, StoreMutatorIdentifier } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { createSelectors } from './create-selectors';

type Mutators = [StoreMutatorIdentifier, unknown][];

export type StoreCreator<TStore, TMutators extends Mutators = []> = StateCreator<
  TStore,
  TMutators,
  [],
  TStore
>;

type ChainedCreator<TStore> = StateCreator<TStore, Mutators, Mutators, TStore>;

type StoreMiddleware<TStore> = (creator: ChainedCreator<TStore>) => ChainedCreator<TStore>;

type ImmerCreator<TStore> = StateCreator<TStore, [['zustand/immer', never]], [], TStore>;

export const createStore = <TStore extends object>(
  creator: ImmerCreator<TStore>,
  middlewares: StoreMiddleware<TStore>[] = []
) => {
  const enhancedCreator = middlewares.reduceRight<ChainedCreator<TStore>>(
    (accumulator, middleware) => middleware(accumulator),
    immer(creator) as ChainedCreator<TStore>
  );

  return createSelectors(create<TStore>()(enhancedCreator));
};

export type { StoreMiddleware, StoreMutatorIdentifier };
