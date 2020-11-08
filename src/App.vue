<template>
<div class="shadow">
  <div class="container mx-auto px-4">
    <h1 class="font-display text-5xl py-1 text-purple-700">Paskeddy</h1>
    </div>
  </div>
  <div class="container mx-auto px-4">
    <div class="bg-purple-100 p-4 my-4">

    <h2 class="font-semibold mb-3 text-xl text-purple-800">🛠 Config</h2>
    <div class="flex mb-1 items-center">
      <label for="custodyPct" class="w-1/3 block"><span class="font-semibold">Custody percentage</span> (decimal)</label>
      <input min="0" step=".05" type="number" :class="s.input" v-model="custodyPct" id="custodyPct"/></div>
    <div class="flex mb-1 items-center">
      <label for="sleep" class="w-1/3 block"><span class="font-semibold">Sleep</span> (hours per day)</label>
      <input min="0" type="number" :class="s.input" v-model="sleep" id="sleep"/></div>
    <div class="flex mb-1 items-center">
      <label for="school" class="w-1/3 block"><span class="font-semibold">School</span> (hours per weekday)</label>
      <input min="0" type="number" :class="s.input" v-model="school" id="school"/></div>

    <p>In order to schedule for <em>quality time</em>, the total time is calculated by removing 'sleeping' hours and 'school' hours</p>
  </div>
    
    <h2 class="text-4xl mt-8 mb-4 font-semibold text-purple-800 flex justify-between">
      <span>🗓 Schedule</span>
      <span :class="`${schedulePctColor}`">
        {{ scheduleEmoji }}
        <span class="font-bold">{{ schedulePctFormatted }} %</span>
        <span v-if="(custodyPct - schedulePct > 0)" class="font-light">({{ Math.round((schedulePct - custodyPct) * 100) }})</span>
      </span>
    </h2>


    <button class="appearance-none" @click="showTemplates = !showTemplates">
      <h2 class="text-xl mt-8 mb-4 font-semibold text-purple-800">✨ {{ schedule.length ? 'New' : 'Create' }} Schedule from Example {{ schedule.length && !showTemplates ? '➡️' : '✨' }}</h2>
    </button>
    <div v-show="!schedule.length || showTemplates" class="templates grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
       <button
        @click="newFromTemplate(idx)"
        v-for="(sched, idx) in formattedTemplates" 
        :key="idx" 
        class="p-2 border shadow hover:shadow-lg flex flex-col justify-between items-stretch appearance-none text-left"
      >
        <h3 class="font-semibold text-gray-500 leading-tight">{{sched.name}}</h3>
        <div class="flex-1">
        <EventItem v-for="(evt, edx) in sched.events" :key="edx" v-bind="evt"/>
        </div>
        <p class="text-2xl text-right font-bold" :class="`${sched.pctColor}`">{{ sched.pctFormatted }} %</p>
      </button>
    </div>
    
    <div v-if="schedule.length">
      <div v-for="(event, idx) in schedule" :key="idx" class="my-3 flex flex-wrap" :class="event.subtract ? 'bg-orange-100' : 'bg-purple-100' ">
        
          <div class="flex flex-col justify-items-end m-2">
            <label class="text-uppercase text-gray-600" title="subtract?">⬅️
            <input class="shadow" type="checkbox" v-model="event.subtract"/></label>
            <div class="text-2xl">{{event.subtract ? '-' : '+'}}</div>
          </div>
        
        <div class="flex flex-col justify-items-end m-2">
          <label class="text-uppercase text-gray-600">number</label>
          <input :class="s.inputT" type="number" min="1" v-model="event.number"/>
        </div>
        <div class="flex flex-col justify-items-end m-2">
          <label class="text-uppercase text-gray-600"><a href="#lengths">length</a></label>
          <div><select :class="s.select" v-model="event.unit">
            <option v-for="unit in Object.keys(units)" :key="unit">{{unit}}</option>
          </select>
          </div>
        </div>  
        <div class="flex flex-col justify-items-end m-2">
          <div>
            <label title="repeat?">🔄
              <input type="checkbox" class="shadow" @click="toggleEventRepeat(idx)" :checked="event.every"/>
            </label>
            <span v-if="event.every" class="text-uppercase text-gray-600"> every</span>
          </div>
          <div v-if="event.every">
            <input :class="s.inputT" type="number" min="0" v-model="event.every"/>
            {{ event.every > 1 ? 'weeks' : 'week'}}
          </div>
        </div>
        
        <div class="flex flex-col flex-1 justify-items-end m-2">
          <label class="text-uppercase text-gray-600">note</label>
          <input :class="s.select" type="text" v-model="event.label"/>
        </div>
   
        <div class="flex flex-col justify-items-end m-2 items-end">
          <button @click="deleteEvent(idx)" class="appearance-none rounded bg-red-300 p-1 m-1 text-xs hover:bg-red-400">❌&nbsp;delete</button>
          <button @click="duplicateEvent(idx)" class="appearance-none rounded bg-purple-300 p-1 m-1 text-xs hover:bg-purple-400">❇️&nbsp;duplicate</button>
          
        </div>

      </div>
    </div>

    <button @click="addEvent" class="bg-teal-500 py-2 px-6 rounded hover:bg-teal-600 text-2xl text-white my-4">+ Add Event</button>

    
    <dl id="lengths" class="bg-purple-100 p-4 my-4">
      <div>
        <dt class="font-semibold inline">fullDay: </dt>
        <dd class="inline">full day without school (24 - sleep)</dd></div>
      <div>
        <dt class="font-semibold inline">weekend: </dt>
        <dd class="inline">2 full days</dd></div>
      <div>
        <dt class="font-semibold inline">schoolDay: </dt>
        <dd class="inline">24 - sleep - school</dd></div>
      <div>
        <dt class="font-semibold inline">fullWeekAlt: </dt>
        <dd class="inline">7 full days (not accounting for already alotted time that week)</dd></div>
      <div>
        <dt class="font-semibold inline">fullWeek: </dt>
        <dd class="inline">5 full days (assuming extension of parents' weekend)</dd></div>
    </dl>
  </div>
</template>

<script>
import EventItem from "./components/EventItem.vue";

export default {
  name: "App",
  components: {
    EventItem,
  },
  data() {
    return {
      s: {
        input: 'shadow appearance-none border rounded w-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
        inputT: 'shadow appearance-none border rounded w-16 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
        select: 'shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
      },
      childName: 'Tessa',
      custodyPct: 0.4,
      sleep: 10,
      school: 6,
      showTemplates: false,
      schedule: [],
      templates: [{
        name: 'every other weekend',
        events: [{
          label: "",
          unit: "weekend",
          every: 2,
          number: 1,
        }],
      },
      {
        name: 'every weekend',
        events: [{
          label: "",
          unit: "weekend",
          every: 1,
          number: 1,
        }],
      },
      {
        name: 'every other weekend + visits',
        events: [
        {
          label: "3 day weekend",
          unit: "fullDay",
          every: 2,
          number: 3,
        },
        {unit: 'hour', every: 2, number: 4, label: 'sunday dinner alternate weekends'},
        {unit: 'hour', every: 1, number: 4, label: 'weekly weekday dinner'}
        ],
      },
      {
        name: 'every other weekend + holidays',
        events: [{
          label: "",
          unit: "weekend",
          every: 2,
          number: 1,
        },{
          label: 'holidays',
          unit: 'fullWeek',
          number: 9
        }],
      }
      ,{
        name: 'mixy matchy',
        events: [{
          label: "3 day weekend",
          unit: "fullDay",
          every: 2,
          number: 3,
        },
        {unit: 'hour', every: 2, number: 4, label: 'sunday dinner alternate weekends'},
        {label: '3 weeks holidays', unit: 'fullWeek', number: 3},
        {label: 'adjust holidays for 3 day weekend', unit: 'fullDay', number: 3, subtract: true},
        ],
      }]
    };
  },
  computed: {
    fullDay() {
      return 24 - this.sleep;
    },
    // schoolDay
    // the desired number of

    units() {
      return {
        fullDay: this.fullDay,
        weekend: 2 * this.fullDay,
        schoolDay: 24 - this.sleep - this.school,
        fullWeekAlt: this.fullDay * 7,
        fullWeek: this.fullDay * 5,
        hour: 1
      };
    },
    qualityHoursPerWeek() {
      return (5 * this.units.schoolDay) + this.units.weekend;
    },

    targetCustodyHours() {
      return this.qualityHoursPerWeek * 52 * this.custodyPct;
    },
    formattedTemplates(){
      return this.templates.map(template => {
        const pct = this.percentageFromEvents(template.events)
        const pctColor = this.pctColor(pct);
        return {
          ...template,
          pct,
          pctColor,
          pctFormatted: (pct*100).toFixed(1)
        }
      })
    },
    schedulePct(){
      return this.percentageFromEvents(this.schedule)
    },
    schedulePctFormatted(){
      return (this.schedulePct*100).toFixed(1)
    },
    schedulePctColor(){
      return this.pctColor(this.schedulePct);
    },
    scheduleEmoji(){
      return this.schedulePct > 1 
        ? '😬'
        : this.schedulePct + .02 > this.custodyPct && this.schedulePct - .02 < this.custodyPct 
          ? '🙂'
          : ''
    },
  },  
    methods: {
      perYear(evt){
        const num = evt.number || 1
        if (!evt.every) return num;
        return (52 / evt.every) * num;
        // (evt.every 
        //     ? 52 / evt.every || 1 
        //     : 1) * evt.number || 1;
      },
      pctColor(pct){
        if (pct > 1 ) return 'text-red-500'
        if (pct >= this.custodyPct) return 'text-green-600';
        if (pct + .01 >= this.custodyPct) return 'text-green-300';
        if (pct + .05 >= this.custodyPct) return 'text-orange-400';
        if (pct + .15 >= this.custodyPct) return 'text-orange-600';
        return 'text-orange-700';
      },
      eventHours(evt){
        let thisHours = this.units[evt.unit];
        let perYear = this.perYear(evt);
        return perYear * thisHours;
      },
      percentageFromEvents(events){
        let hours = 0;
        events.forEach(evt => {
          if (evt.subtract){
            hours -= this.eventHours(evt);
          } else {
            hours += this.eventHours(evt);
          }
        });
        return hours / (52 * this.qualityHoursPerWeek);
      },
      newFromTemplate(idx){
        this.schedule = this.templates[idx].events.map(evt => ({...evt, subtract: evt.subtract || false }));
        this.showTemplates = false;
      },
      duplicateEvent(idx){
        this.schedule.push({...this.schedule[idx]});
      },
      deleteEvent(idx){
        this.schedule.splice(idx, 1);
      },
      addEvent(){
        this.schedule.push({
          label: "",
          unit: "fullDay",
          every: null,
          number: 1,
          subtract: false
        })
      },
  
      toggleEventRepeat(idx){
        this.schedule[idx].every ? 
          this.schedule[idx].every = null 
          : this.schedule[idx].every = 1;
      }
    
  },
};
</script>
