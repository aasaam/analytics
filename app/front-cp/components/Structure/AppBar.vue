<template>
  <v-app-bar
    :clipped-left="
      ($vuetify.rtl === false) & $vuetify.breakpoint.lgAndUp ? true : false
    "
    :clipped-right="$vuetify.rtl & $vuetify.breakpoint.lgAndUp ? true : false"
    app
    dark
    clipped
    flat
    :color="$vuetify.theme.dark ? '' : 'primary'"
  >
    <v-app-bar-nav-icon
      @click="drawerState = !drawerState"
    ></v-app-bar-nav-icon>
    <v-toolbar-title class="ml-0 pl-4">
      <span class="hidden-sm-and-down"> {{ $t('projectName') }} </span>
    </v-toolbar-title>
    <v-spacer />
    <v-btn :to="localePath('dashboard')" text>
      <v-icon>mdi-apps</v-icon>
    </v-btn>
    <v-btn text class="ml-1 mr-1" @click="changeTheme">
      <v-icon v-if="$vuetify.theme.dark">mdi-weather-night</v-icon>
      <v-icon v-if="!$vuetify.theme.dark"> mdi-white-balance-sunny </v-icon>
    </v-btn>

    <!-- <v-btn icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn> -->
    <template v-if="$i18n.locales.length > 1">
      <LangSwitcher />
    </template>

    <ToolbarMenu />
  </v-app-bar>
</template>
<script>
export default {
  name: 'AppBar',
  computed: {
    drawerState: {
      get() {
        return this.$store.getters.drawerState;
      },
      set(v) {
        return this.$store.commit('TOGGLE_DRAWER_STATE', v);
      },
    },
  },
  methods: {
    changeTheme() {
      this.$store.commit('helper/SWITCH_DARK');
      this.$vuetify.theme.dark = this.$store.state.helper.darkMode;
    },
  },
};
</script>
