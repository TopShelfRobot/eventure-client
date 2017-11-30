import {schema} from 'normalizr'

export const registration = new schema.Entity('registrations')
export const registrations = [registration]

export const group = new schema.Entity('groups')
export const groups = [group]

export const listing = new schema.Entity('listings')
export const listings = [listing]

export const eventure = new schema.Entity('eventures')
export const eventures = [eventure]

eventure.define({listings, registrations})
listing.define({eventure, groups, registrations})
group.define({listing, eventure, registrations})
registration.define({group, listing, eventure})
