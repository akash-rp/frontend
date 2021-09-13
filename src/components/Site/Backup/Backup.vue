<template>
  <section>
    <h1 class="font-bold text-3xl">Backups</h1>
    <button class="bg-blue-700 rounded py-4 px-5 text-white mt-6">
      Take Backup Now
    </button>
    <div class="mt-6">
      <h2 class="font-bold text-2xl">Local Backups</h2>
      <div class="toggle checkcross flex items-center">
        <p class="text-2xl block mr-6 text-gray-700">Automated Backups</p>
        <input id="checkcross" type="checkbox" v-model="automatic" />
        <label class="toggle-item bg-gray-200" for="checkcross">
          <div class="check"></div>
        </label>
      </div>
      <div class="mt-6">
        <span class="text-2xl mr-4 text-gray-700 w-52 inline-block"
          >Backup Frequency</span
        >
        <div
          class="custom-select inline-block w-44"
          :tabindex="tabindex"
          @blur="open = false"
        >
          <div
            class="selected bg-gray-200"
            :class="{ open: open }"
            @click.self="open = !open"
          >
            {{ selected }}
          </div>
          <div class="items mt-2" :class="{ selectHide: !open }">
            <div
              v-for="(option, i) of backupFrequncy"
              :key="i"
              @click="
                selected = option;
                open = false;
                $emit('input', option);
              "
              class="hover:bg-gray-100"
            >
              <p>
                {{ option }}
              </p>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <span class="text-2xl mr-4 text-gray-700 w-52 inline-block"
            >Backup Time</span
          >
          <div
            class="custom-select inline-block w-24"
            :tabindex="tabindex"
            @blur="openHour = false"
          >
            <div
              class="selected bg-gray-200 hour"
              :class="{ open: open }"
              @click.self="openHour = !openHour"
            >
              {{ selectedHour }}
            </div>
            <div
              class="items mt-2 h-40 overflow-auto w-24"
              :class="{ selectHide: !openHour }"
            >
              <div
                v-for="(option, i) of time['hour']"
                :key="i"
                @click="
                  selectedHour = option;
                  openHour = false;
                  $emit('input', option);
                "
                class="hover:bg-gray-100"
              >
                <p>
                  {{ option }}
                </p>
              </div>
            </div>
          </div>
          <span class="mx-2 text-3xl">:</span>
          <div
            class="custom-select inline-block w-24"
            :tabindex="tabindex"
            @blur="openMinute = false"
          >
            <div
              class="selected bg-gray-200 minute"
              :class="{ open: open }"
              @click.self="openMinute = !openMinute"
            >
              {{ selectedMinute }}
            </div>
            <div
              class="items mt-2 h-40 overflow-auto w-24"
              :class="{ selectHide: !openMinute }"
            >
              <div
                v-for="(option, i) of time['minute']"
                :key="i"
                @click="
                  selectedMinute = option;
                  openMinute = false;
                  $emit('input', option);
                "
                class="hover:bg-gray-100"
              >
                <p>
                  {{ option }}
                </p>
              </div>
            </div>
          </div>
          <span class="text-2xl text-gray-700 mx-2">UTC</span>
          <div
            class="custom-select inline-block"
            :class="{
              'w-44': selected == '1 Week',
              'w-24': selected != '1 Week',
            }"
            :tabindex="tabindex"
            @blur="openDay = false"
            v-if="selected == '1 Week' || selected == '1 Month'"
          >
            <div
              class="selected bg-gray-200 day"
              :class="{ open: open }"
              @click.self="openDay = !openDay"
            >
              {{ selectedDay }}
            </div>
            <div
              class="items mt-2 h-40 overflow-auto"
              :class="{
                selectHide: !openDay,
                'w-44': selected == '1 Week',
                'w-24': selected != '1 Week',
              }"
            >
              <div
                v-for="(option, i) of time['day']"
                :key="i"
                @click="
                  selectedDay = option;
                  openDay = false;
                  $emit('input', option);
                "
                class="hover:bg-gray-100"
              >
                <p>
                  {{ option }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-6">
        <span class="text-2xl text-gray-700 mr-4 w-52 inline-block"
          >Backup Retention</span
        >
        <div
          class="custom-select inline-block w-44"
          :tabindex="tabindex"
          @blur="openRetention = false"
        >
          <div
            class="selected bg-gray-200"
            :class="{ open: open }"
            @click.self="openRetention = !openRetention"
          >
            {{ selectedRetention }}
          </div>
          <div class="items mt-2" :class="{ selectHide: !openRetention }">
            <div
              v-for="(option, i) of backupRetention"
              :key="i"
              @click="
                selectedRetention = option;
                openRetention = false;
                $emit('input', option);
              "
              class="hover:bg-gray-100"
            >
              <p>
                {{ option }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <button class="bg-blue-700 text-white py-4 px-5 rounded">Update</button>
    </div>
    <div class="mt-6">
      <h1 class="font-bold text-2xl">Remote Backup</h1>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      tabindex: 1,
      selected: "None",
      open: false,
      selectedRetention: "None",
      openRetention: false,
      backupFrequncy: [
        "1 Hour",
        "2 Hours",
        "3 Hours",
        "6 Hours",
        "12 Hours",
        "1 Day",
        "3 Days",
        "1 Week",
        "1 Month",
      ],
      backupRetention: [
        "1 Day",
        "3 Days",
        "1 Week",
        "2 Weeks",
        "1 Month",
        "2 Months",
      ],
      openMinute: false,
      openHour: false,
      selectedMinute: "00",
      selectedHour: "00",
      automatic: false,
      openDay: false,
      selectedDay: "--",
      time: { hour: [], minute: [], day: [] },
    };
  },
  created() {
    this.getBackup();
    this.minute();
    this.hour();
  },
  methods: {
    getBackup() {
      fetch("http://localhost/site/" + this.$route.params.siteid + "/getbackup")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.automatic = data.automatic;
          this.selected = data.frequency;
        });
    },
    minute() {
      for (let i = 0; i < 61; i++) {
        let num = i.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        });
        this.time.minute.push(num);
      }
    },
    hour() {
      for (let i = 0; i < 25; i++) {
        let num = i.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        });
        this.time.hour.push(num);
      }
    },
  },
  watch: {
    selected() {
      if (this.selected == "1 Week") {
        this.time.day = [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ];
      }
      if (this.selected == "1 Month") {
        this.time.day = [];
        for (let i = 1; i <= 28; i++) {
          let num = i.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          });
          this.time.day.push(num);
        }
      }
    },
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  &:before,
  &:after {
    content: "";
    position: absolute;
  }
}

#checkcross {
  //   height: 40px;
  //   left: 0;
  //   opacity: 0;
  //   position: absolute;
  //   top: 0;
  //   width: 40px;
  display: none;
}

// .toggle {
//   position: relative;
//   display: block;
// }

label.toggle-item {
  width: 7em;
  height: 3em;
  display: inline-block;
  border-radius: 50px;
  position: relative;
  transition: all 0.3s ease;
  transform-origin: 20% center;
  cursor: pointer;
  &:before {
    display: block;
    transition: all 0.2s ease;
    width: 2.3em;
    height: 2.3em;
    top: 0.25em;
    left: 0.25em;
    border-radius: 2em;
    border: 2px solid #88cf8f;
    transition: 0.3s ease;
  }
}

.checkcross {
  label:before {
    content: none;
  }
  .check {
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    position: absolute;
    background: #c34a4a;

    transition: 0.4s ease;
    top: 2.5px;
    &:before,
    &:after {
      height: 3px;
      border-radius: 10px;
      background: #fff;
      transition: 0.4s ease;
    }

    &:before {
      width: 20px;
      transform: rotate(-45deg) translate(-6px, 9px);
    }
    &:after {
      width: 20px;
      transform: rotate(45deg) translate(9px, 6px);
    }
    left: 2.5px;
  }
}

#checkcross:checked + label {
  .check {
    transform: rotate(360deg);
    background: #8bc34a;

    &:before {
      width: 14px;
      transform: rotate(-45deg) translate(-3px, 14px);
    }
    &:after {
      width: 10px;
      transform: rotate(45deg) translate(12px, 8px);
    }
    left: 43px;
  }
}

.minute::before {
  content: "Minute";
  top: -23px;
  color: gray;
  left: 0;
}

.hour::before {
  content: "Hour";
  top: -23px;
  color: gray;
  left: 0;
}

.day::before {
  content: "Day";
  top: -23px;
  color: gray;
  left: 0;
}
</style>
