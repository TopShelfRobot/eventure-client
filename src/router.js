import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}

const router = new VueRouter({

  routes: [
    {
      path: '/login',
      component: load('pages/login'),
    },
    { 
      path: '/', 
      component: load('layouts/master'),
      meta: { 
        requiresAuth: true,
        bc: {display: 'Dashboard'}
      },
      children: [
        {
          path: '', 
          component: load('pages/dashboard'),
          meta: { }
        },
        {
          path: '/register',
          component: load('pages/register/register'),
          meta: {}
        },
        /**
         * EVENTS
         */
        {
          path: '/events', 
          component: load('pages/events/eventure-main'),
          meta: {
            bc: {display: 'Eventures'},
          },
          children: [
            {path: '', component: load('pages/events/eventure-index')},
            {
              path: ':eventSlug',
              component: load('pages/events/eventure-detail'),
              children: [
                { path: 'listings', name: 'eventure.listings', component: load('pages/events/eventure-detail-listings'), },
                { path: 'listings/:listingSlug', name: 'listing.detail', component: load('pages/events/listing-detail'), 
                  meta: {bc: {display: "Listing"}}
                },
                {path: 'participants', name: 'eventure.participants', component: load('pages/events/eventure-detail-participants')},
                {path: 'registrations', name: 'eventure.registrations', component: load('pages/events/eventure-detail-registrations')},
                {path: 'accounting', name: 'eventure.accounting', component: load('pages/events/eventure-detail-accounting')},
                {path: 'settings', name: 'eventure.settings', component: load('pages/events/eventure-detail-settings')},
                {path: '', name: 'eventure.home', component: load('pages/events/eventure-detail-home')},
              ]
            },
          ]
        },
        /**
         * PEOPLE
         */
        {
          path: '/people',
          component: load('pages/person/index'),
          meta: {
            bc: {display: 'People'}
          },
          children: [
            {path: ':personId', name: 'person.detail', component: load('pages/person/person-detail'), meta: {bc: {display: 'Detail'}}},
            {path: '', name: 'person.home', component: load('pages/person/person-list')},
          ]
        }
      ]
    },

    // Always leave this last one
    { path: '*', component: load('Error404') } // Not found
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isInitialized = router.app.$store.getters['auth/isInitialized']

  if (!isInitialized) {
    router.app.$store.dispatch('auth/initialize')
  }
  
  const isAuthenticated = router.app.$store.getters['auth/isAuthenticated']

  if (requiresAuth && !isAuthenticated) {
    return next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }

  return next()
})

export default router
