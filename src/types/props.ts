import type { Component, IntrinsicElementAttributes } from 'vue';

export type PropsPolymorphic = {
  as?: keyof IntrinsicElementAttributes | (string & {}) | Component;
};
