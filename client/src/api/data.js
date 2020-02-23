import axios from 'axios';

let getDataResponse = async () => {
  let response = await axios.get('http://localhost:4567/data')
  return new DataResponse(response);
}

let getSports = async () => {
  const response = await getDataResponse();
  return response.data.sports.map(o => { return { id: o.id, desc: o.desc }; });
}

let getEvents = async (sportId) => {
  const intSportId = parseInt(sportId);
  const response = await getDataResponse();
  let events = response.getSport(intSportId).comp.reduce((acc, val) => {
    return acc.concat(val.events.map(o => { return { id: o.id, desc: o.desc } }))
  }, [])
  let sportDesc = response.getSport(intSportId).desc
  return { sportDesc, events }
}

let getOutcomes = async (sportId, eventId) => {
  const intSportId = parseInt(sportId);
  const intEventId = parseInt(eventId);
  const response = await getDataResponse();
  let outcomes = response.getEvent(intSportId, intEventId).markets.reduce((acc, val) => {
    acc.push({ marketDesc: val.desc, o: val.o.map(o => { return { d: o.d, pr: o.pr, prd: o.prd, po: o.po } }) })
    return acc
  }, []);
  let eventDesc = response.getEvent(intSportId, intEventId).desc;
  return { eventDesc, outcomes }
}

function DataResponse(response) {
  this.data = response.data;

  this.getSport = function (intSportId) {
    return this.data.sports.find(o => o.id === intSportId);
  }

  this.getEvent = function (intSportId, intEventId) {
    return this.getSport(intSportId).comp.reduce((acc, val) => {
      return acc.concat(val.events)
    }, []).find(o => o.id === intEventId)
  }
}

export { getSports, getEvents, getOutcomes }