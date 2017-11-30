<template>
  <!-- Configure "view" prop for QLayout -->
  <q-layout ref="layout" view="hHh Lpr lFf">
    <q-toolbar slot="header">

      <q-btn flat @click="$refs.layout.toggleLeft()" >
        <q-icon name="menu" />
      </q-btn>

      <q-toolbar-title>
        Title
      </q-toolbar-title>
    </q-toolbar>

    <!-- <q-tabs slot="navigation">
      <q-route-tab slot="title" icon="view_quilt" to="/layout/about" replace hide="icon" label="About" />
      <q-route-tab slot="title" icon="view_day" to="/layout/toolbar" replace hide="icon" label="Toolbar" />
      <q-route-tab slot="title" icon="view_day" to="/layout/tabs" replace label="Tabs" />
      <q-route-tab slot="title" icon="input" to="/layout/drawer" replace label="Drawer" />
    </q-tabs> -->

    <div slot="left">
      <q-list no-border link inset-delimiter>
        <q-list-header>Essential Links</q-list-header>
        <q-side-link item to="/" exact>
          <q-item-side icon="home" />
          <q-item-main label="Dashboard" />
        </q-side-link>

        <q-side-link item to="/events">
          <q-item-side icon="directions run" />
          <q-item-main label="Events" sublabel="Current, past and future" />
        </q-side-link>

        <q-side-link item to="/people">
          <q-item-side icon="face" />
          <q-item-main label="People" sublabel="Manage all participants" />
        </q-side-link>

        <q-side-link item to="/reports" exact>
          <q-item-side icon="multiline chart" />
          <q-item-main label="Reports" sublabel="Run, View, Print" />
        </q-side-link>

        <q-side-link item to="/settings" exact>
          <q-item-side icon="settings" />
          <q-item-main label="Settings" sublabel="Account-wide settings and defaults" />
        </q-side-link>

      </q-list>
    </div>

    <breadcrumbs />
    <!-- Right Side Panel
    <div slot="right">
      ...
    </div>
    -->

    <router-view />

    <!-- Footer
    <q-toolbar slot="footer">
      ...
    </q-toolbar>
    -->
  </q-layout>
</template>

<script>
import {
  QLayout,
  QToolbar,
  QToolbarTitle,
  QTabs,
  QList,
  QListHeader,
  QItem,
  QItemMain,
  QItemSide,
  QRouteTab,
  QIcon,
  QBtn,
  QSideLink,
} from 'quasar'
import Breadcrumbs from '../breadcrumbs'

export default {
  data () {
    return {}
  },

  components: {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QTabs,
    QList,
    QListHeader,
    QItem,
    QItemMain,
    QItemSide,
    QRouteTab,
    QIcon,
    QBtn,
    QSideLink,
    Breadcrumbs,
  }
}
</script>

<style>
</style>
