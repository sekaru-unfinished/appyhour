import { isBefore, isAfter } from 'date-fns'

export const sortOnNow = (places) => {
  let sortedPlaces = []

  places.forEach(p => {
    p.deals.forEach(d => {
      // check the day is valid
      let dayValid = !d.days || (isDaysRange(d.days) && isInDayRange(d.days)) || new Date().getDay()===getDayIndex(d.days)

      if(d.time) {
        // make the start time a date
        let startHour = get24Hour(d.time.split("-")[0])
        let startDate = new Date()
        startDate.setHours(startHour, 0, 0, 0)

        // make the end time a date
        let endDate = new Date()
        let endHour = get24Hour(d.time.split("-")[1])
        endDate.setHours(endHour, 0, 0, 0)

        let onNow = !isBefore(new Date(), startDate) && !isAfter(new Date(), endDate) && dayValid
        if(onNow) d.relevant = true
      } else {
        // no time, just a day
        if(d.days && dayValid) d.relevant = true
      }
    })

    // check if any relevant deals
    if(p.deals.find(d => d.relevant)) sortedPlaces.push(p)
  })

  return sortedPlaces
}

// get the time in 24 hour format
const get24Hour = (time) => {
  return time.indexOf("am")!==-1 ? time.split("am")[0] : Number(time.split("pm")[0])+12
}

// is the days a range (e.g. mon-fri)
const isDaysRange = (days) => {
  return days.indexOf("-")!==-1
}

// get the index of the day
const getDayIndex = (day) => {
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(day.substring(0, 3))
}

// is today within a range
const isInDayRange = (range) => {
  let start = getDayIndex(range.split("-")[0])
  let end = getDayIndex(range.split("-")[1])

  return new Date().getDay()>=start && new Date().getDay()<=end
}

// filter based on search
export const filter = (search, place) => {
  place.searchVal = place.location + " " + place.name

  if(search.length===0) return true
  return place.searchVal.toLowerCase().indexOf(search.toLowerCase())!==-1
}