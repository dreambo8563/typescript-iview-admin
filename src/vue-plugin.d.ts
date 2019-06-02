import Vue from "vue";

declare module "*.js";

declare module "vue/types/vue" {
  // Global properties can be declared
  // on the `VueConstructor` interface
  interface VueConstructor {
    $config: any;
    locale?: any;
  }
}

// ComponentOptions is declared in types/options.d.ts
declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    $config?: any;
  }
}
declare module "vue/types/vue" {
  // 3. Declare augmentation for Vue
  interface Vue {
    $config: any;
  }

  interface VueConfiguration {
    lang?: string;
  }
}
