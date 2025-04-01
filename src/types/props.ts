import type { Component } from 'vue';

export type PropsPolymorphic = {
  as?: keyof HTMLElementTagNameMap | (string & {}) | Component;
};
