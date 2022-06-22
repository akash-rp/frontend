<template>
  <div class="flex flex-col items-start">
    <div>
      <div class="settings flex flex-col">
        <label class="phplabel" for="timezone">Timezone</label>
        <a-select
          ref="select"
          v-model:value="php['Timezone']"
          show-search
          style="width: 300px"
          :options="timeZones"
          :disabled="iniDisabled"
        ></a-select>
      </div>
      <div class="settings flex flex-col">
        <label for="maxET" class="phplabel">Max Execution Time</label>
        <a-input-number
          id="maxET"
          v-model:value="php['MaxExecutionTime']"
          addon-after="Seconds"
          :disabled="iniDisabled"
        />
      </div>
      <div class="settings flex flex-col">
        <label for="maxFU" class="phplabel">Max File Upload</label>
        <a-input-number
          id="maxFU"
          v-model:value="php['MaxFileUploads']"
          :disabled="iniDisabled"
        />
      </div>
      <div class="settings flex flex-col">
        <label for="maxIT" class="phplabel">Max Input Time</label>
        <a-input-number
          id="maxIT"
          v-model:value="php['MaxInputTime']"
          addon-after="Seconds"
          :disabled="iniDisabled"
        />
      </div>
      <div class="settings flex flex-col">
        <label for="maxIV" class="phplabel">Max Input Vars</label>
        <a-input-number
          id="maxIV"
          v-model:value="php['MaxInputVars']"
          :disabled="iniDisabled"
        />
      </div>
      <div class="settings flex flex-col">
        <label for="memoryLimit" class="phplabel">Memory Limit</label>
        <a-input-number
          id="memoryLimit"
          v-model:value="php['MemoryLimit']"
          addon-after="MB"
          :disabled="iniDisabled"
        />
      </div>
    </div>
    <div>
      <div class="settings flex flex-col">
        <label for="postmax" class="phplabel">Post Max Size</label>
        <a-input-number
          id="postmax"
          v-model:value="php['PostMaxSize']"
          addon-after="MB"
          :disabled="iniDisabled"
        />
      </div>
      <div class="settings flex flex-col">
        <label for="sessionCL" class="phplabel">Session Cookie Lifetime</label>
        <a-input-number
          id="sessionCL"
          v-model:value="php['SessionCookieLifetime']"
          addon-after="Seconds"
          :disabled="iniDisabled"
        />
      </div>
      <div class="settings flex flex-col">
        <label for="sessionGC" class="phplabel">Session Gc Maxlifetime</label>
        <a-input-number
          id="sessionGc"
          v-model:value="php['SessionGcMaxlifetime']"
          addon-after="Seconds"
          :disabled="iniDisabled"
        />
      </div>
      <div class="settings flex flex-col">
        <label for="uploadMF" class="phplabel">Upload Max Filesize</label>
        <a-input-number
          id="uploadMF"
          v-model:value="php['UploadMaxFilesize']"
          addon-after="MB"
          :disabled="iniDisabled"
        />
      </div>
      <div class="settings flex flex-col">
        <label for="uploadMF" class="phplabel">Open Basedir</label>
        <a-input
          id="openbasedir"
          v-model:value="php['OpenBaseDir']"
          :disabled="iniDisabled"
        />
      </div>
      <div class="settings flex flex-row items-center">
        <label for="shortOT" class="mr-2">Short Open Tag</label>

        <a-switch
          v-model:checked="php['ShortOpenTag']"
          checked-children="ON"
          un-checked-children="OFF"
          id="shortOT"
          class=""
          checkedValue="On"
          :disabled="iniDisabled"
        />
      </div>
    </div>
  </div>
  <a-button
    type="primary"
    class="mt-4"
    @click="updatePhpIni"
    :loading="iniDisabled"
    >Update</a-button
  >
</template>

<script>
import { Select } from "ant-design-vue";
import "ant-design-vue/lib/select/style/index.css";
import { Button } from "ant-design-vue";
import "ant-design-vue/lib/button/style/index.css";
import { Input } from "ant-design-vue";
import "ant-design-vue/lib/input/style/index.css";
import { Checkbox } from "ant-design-vue";
import "ant-design-vue/lib/checkbox/style/index.css";
import { Switch } from "ant-design-vue";
import "ant-design-vue/lib/switch/style/index.css";
export default {
  components: {
    ASelect: Select,
    AButton: Button,
    AInput: Input,
    ACheckbox: Checkbox,
    ASwitch: Switch,
  },
  data() {
    return {
      timezone: "",
      timeZones: [],
      php: "",
      iniDisabled: false,
    };
  },

  methods: {
    getPHPini() {
      this.$axios
        .get(
          "/site/" + this.$route.params.siteid + "/getPHPini"
        )
        .then((res) => {
          this.php = res.data;
        })
        .catch(() => {
          this.$toast.error("Failed to get PHP ini data");
        });
    },
    updatePhpIni() {
      this.iniDisabled = true;
      this.$axios
        .post(
          "/site/" +
            this.$route.params.siteid +
            "/updatePhpIni",
          {
            php: this.php,
          }
        )
        .then((res) => {
          this.php = res.data;
          this.toast.success("PHP ini settings updated");
        })
        .catch(() => {
          this.toast.error("Failed to update php ini settings");
        })
        .finally(() => {
          this.iniDisabled = false;
        });
    },
  },
  created() {
    this.getPHPini();
    var timezone =
      "Africa/Abidjan\tAfrica/Accra\tAfrica/Addis_Ababa\tAfrica/Algiers\tAfrica/Asmara\tAfrica/Bamako\tAfrica/Bangui\tAfrica/Banjul\tAfrica/Bissau\tAfrica/Blantyre\tAfrica/Brazzaville\tAfrica/Bujumbura\tAfrica/Cairo\tAfrica/Casablanca\tAfrica/Ceuta\tAfrica/Conakry\tAfrica/Dakar\tAfrica/Dar_es_Salaam\tAfrica/Djibouti\tAfrica/Douala\tAfrica/El_Aaiun\tAfrica/Freetown\tAfrica/Gaborone\tAfrica/Harare\tAfrica/Johannesburg\tAfrica/Juba\tAfrica/Kampala\tAfrica/Khartoum\tAfrica/Kigali\tAfrica/Kinshasa\tAfrica/Lagos\tAfrica/Libreville\tAfrica/Lome\tAfrica/Luanda\tAfrica/Lubumbashi\tAfrica/Lusaka\tAfrica/Malabo\tAfrica/Maputo\tAfrica/Maseru\tAfrica/Mbabane\tAfrica/Mogadishu\tAfrica/Monrovia\tAfrica/Nairobi\tAfrica/Ndjamena\tAfrica/Niamey\tAfrica/Nouakchott\tAfrica/Ouagadougou\tAfrica/Porto-Novo\tAfrica/Sao_Tome\tAfrica/Tripoli\tAfrica/Tunis\tAfrica/Windhoek\tAmerica/Adak\tAmerica/Anchorage\tAmerica/Anguilla\tAmerica/Antigua\t\tAmerica/Araguaina\tAmerica/Argentina/Buenos_Aires\tAmerica/Argentina/Catamarca\tAmerica/Argentina/Cordoba\t\tAmerica/Argentina/Jujuy\tAmerica/Argentina/La_Rioja\tAmerica/Argentina/Mendoza\tAmerica/Argentina/Rio_Gallegos\t\tAmerica/Argentina/Salta\tAmerica/Argentina/San_Juan\tAmerica/Argentina/San_Luis\tAmerica/Argentina/Tucuman\t\tAmerica/Argentina/Ushuaia\tAmerica/Aruba\tAmerica/Asuncion\tAmerica/Atikokan\t\tAmerica/Bahia\tAmerica/Bahia_Banderas\tAmerica/Barbados\tAmerica/Belem\t\tAmerica/Belize\tAmerica/Blanc-Sablon\tAmerica/Boa_Vista\tAmerica/Bogota\t\tAmerica/Boise\tAmerica/Cambridge_Bay\tAmerica/Campo_Grande\tAmerica/Cancun\t\tAmerica/Caracas\tAmerica/Cayenne\tAmerica/Cayman\tAmerica/Chicago\t\tAmerica/Chihuahua\tAmerica/Costa_Rica\tAmerica/Creston\tAmerica/Cuiaba\t\tAmerica/Curacao\tAmerica/Danmarkshavn\tAmerica/Dawson\tAmerica/Dawson_Creek\tAmerica/Denver\tAmerica/Detroit\tAmerica/Dominica\tAmerica/Edmonton\tAmerica/Eirunepe\tAmerica/El_Salvador\tAmerica/Fort_Nelson\tAmerica/Fortaleza\tAmerica/Glace_Bay\tAmerica/Goose_Bay\tAmerica/Grand_Turk\tAmerica/Grenada\tAmerica/Guadeloupe\tAmerica/Guatemala\tAmerica/Guayaquil\tAmerica/Guyana\tAmerica/Halifax\tAmerica/Havana\tAmerica/Hermosillo\tAmerica/Indiana/Indianapolis\tAmerica/Indiana/Knox\tAmerica/Indiana/Marengo\tAmerica/Indiana/Petersburg\tAmerica/Indiana/Tell_City\tAmerica/Indiana/Vevay\tAmerica/Indiana/Vincennes\tAmerica/Indiana/Winamac\tAmerica/Inuvik\tAmerica/Iqaluit\tAmerica/Jamaica\tAmerica/Juneau\tAmerica/Kentucky/Louisville\tAmerica/Kentucky/Monticello\tAmerica/Kralendijk\tAmerica/La_Paz\tAmerica/Lima\tAmerica/Los_Angeles\tAmerica/Lower_Princes\tAmerica/Maceio\tAmerica/Managua\tAmerica/Manaus\tAmerica/Marigot\tAmerica/Martinique\tAmerica/Matamoros\tAmerica/Mazatlan\tAmerica/Menominee\tAmerica/Merida\tAmerica/Metlakatla\tAmerica/Mexico_City\tAmerica/Miquelon\tAmerica/Moncton\tAmerica/Monterrey\tAmerica/Montevideo\tAmerica/Montserrat\tAmerica/Nassau\tAmerica/New_York\tAmerica/Nipigon\tAmerica/Nome\tAmerica/Noronha\tAmerica/North_Dakota/Beulah\tAmerica/North_Dakota/Center\tAmerica/North_Dakota/New_Salem\tAmerica/Nuuk\tAmerica/Ojinaga\tAmerica/Panama\tAmerica/Pangnirtung\tAmerica/Paramaribo\tAmerica/Phoenix\tAmerica/Port-au-Prince\tAmerica/Port_of_Spain\tAmerica/Porto_Velho\tAmerica/Puerto_Rico\tAmerica/Punta_Arenas\tAmerica/Rainy_River\tAmerica/Rankin_Inlet\tAmerica/Recife\tAmerica/Regina\tAmerica/Resolute\tAmerica/Rio_Branco\tAmerica/Santarem\tAmerica/Santiago\tAmerica/Santo_Domingo\tAmerica/Sao_Paulo\tAmerica/Scoresbysund\tAmerica/Sitka\tAmerica/St_Barthelemy\tAmerica/St_Johns\tAmerica/St_Kitts\tAmerica/St_Lucia\tAmerica/St_Thomas\tAmerica/St_Vincent\tAmerica/Swift_Current\tAmerica/Tegucigalpa\tAmerica/Thule\tAmerica/Thunder_Bay\tAmerica/Tijuana\tAmerica/Toronto\tAmerica/Tortola\tAmerica/Vancouver\tAmerica/Whitehorse\tAmerica/Winnipeg\tAmerica/Yakutat\tAmerica/Yellowknife\tAntarctica/Casey\tAntarctica/Davis\tAntarctica/DumontDUrville\tAntarctica/Macquarie\tAntarctica/Mawson\tAntarctica/McMurdo\tAntarctica/Palmer\tAntarctica/Rothera\tAntarctica/Syowa\tAntarctica/Troll\tAntarctica/Vostok\tArctic/Longyearbyen\tAsia/Aden\tAsia/Almaty\tAsia/Amman\tAsia/Anadyr\t\tAsia/Aqtau\tAsia/Aqtobe\tAsia/Ashgabat\tAsia/Atyrau\tAsia/Baghdad\tAsia/Bahrain\tAsia/Baku\tAsia/Bangkok\tAsia/Barnaul\tAsia/Beirut\tAsia/Bishkek\tAsia/Brunei\tAsia/Chita\tAsia/Choibalsan\tAsia/Colombo\tAsia/Damascus\tAsia/Dhaka\tAsia/Dili\tAsia/Dubai\tAsia/Dushanbe\tAsia/Famagusta\tAsia/Gaza\tAsia/Hebron\tAsia/Ho_Chi_Minh\tAsia/Hong_Kong\tAsia/Hovd\tAsia/Irkutsk\tAsia/Jakarta\tAsia/Jayapura\tAsia/Jerusalem\tAsia/Kabul\tAsia/Kamchatka\tAsia/Karachi\tAsia/Kathmandu\tAsia/Khandyga\tAsia/Kolkata\tAsia/Krasnoyarsk\tAsia/Kuala_Lumpur\tAsia/Kuching\tAsia/Kuwait\tAsia/Macau\tAsia/Magadan\tAsia/Makassar\tAsia/Manila\tAsia/Muscat\tAsia/Nicosia\tAsia/Novokuznetsk\tAsia/Novosibirsk\tAsia/Omsk\tAsia/Oral\tAsia/Phnom_Penh\tAsia/Pontianak\tAsia/Pyongyang\tAsia/Qatar\tAsia/Qostanay\tAsia/Qyzylorda\tAsia/Riyadh\tAsia/Sakhalin\tAsia/Samarkand\tAsia/Seoul\tAsia/Shanghai\tAsia/Singapore\tAsia/Srednekolymsk\tAsia/Taipei\tAsia/Tashkent\tAsia/Tbilisi\tAsia/Tehran\tAsia/Thimphu\tAsia/Tokyo\tAsia/Tomsk\tAsia/Ulaanbaatar\tAsia/Urumqi\tAsia/Ust-Nera\tAsia/Vientiane\tAsia/Vladivostok\tAsia/Yakutsk\tAsia/Yangon\tAsia/Yekaterinburg\tAsia/Yerevan\tAtlantic/Azores\tAtlantic/Bermuda\tAtlantic/Canary\tAtlantic/Cape_Verde\tAtlantic/Faroe\tAtlantic/Madeira\tAtlantic/Reykjavik\tAtlantic/South_Georgia\tAtlantic/St_Helena\tAtlantic/Stanley\tAustralia/Adelaide\tAustralia/Brisbane\tAustralia/Broken_Hill\tAustralia/Darwin\tAustralia/Eucla\tAustralia/Hobart\tAustralia/Lindeman\tAustralia/Lord_Howe\tAustralia/Melbourne\tAustralia/Perth\tAustralia/Sydney\tEurope/Amsterdam\tEurope/Andorra\tEurope/Astrakhan\tEurope/Athens\tEurope/Belgrade\tEurope/Berlin\tEurope/Bratislava\tEurope/Brussels\tEurope/Bucharest\tEurope/Budapest\tEurope/Busingen\tEurope/Chisinau\tEurope/Copenhagen\tEurope/Dublin\tEurope/Gibraltar\tEurope/Guernsey\tEurope/Helsinki\tEurope/Isle_of_Man\tEurope/Istanbul\tEurope/Jersey\tEurope/Kaliningrad\tEurope/Kiev\tEurope/Kirov\tEurope/Lisbon\tEurope/Ljubljana\tEurope/London\tEurope/Luxembourg\tEurope/Madrid\tEurope/Malta\tEurope/Mariehamn\tEurope/Minsk\tEurope/Monaco\tEurope/Moscow\tEurope/Oslo\tEurope/Paris\tEurope/Podgorica\tEurope/Prague\tEurope/Riga\tEurope/Rome\tEurope/Samara\tEurope/San_Marino\tEurope/Sarajevo\tEurope/Saratov\tEurope/Simferopol\tEurope/Skopje\tEurope/Sofia\tEurope/Stockholm\tEurope/Tallinn\tEurope/Tirane\tEurope/Ulyanovsk\tEurope/Uzhgorod\tEurope/Vaduz\tEurope/Vatican\tEurope/Vienna\tEurope/Vilnius\tEurope/Volgograd\tEurope/Warsaw\tEurope/Zagreb\tEurope/Zaporozhye\tEurope/Zurich\tIndian/Antananarivo\tIndian/Chagos\tIndian/Christmas\tIndian/Cocos\tIndian/Comoro\tIndian/Kerguelen\tIndian/Mahe\tIndian/Maldives\tIndian/Mauritius\tIndian/Mayotte\tIndian/Reunion\tPacific/Apia\tPacific/Auckland\tPacific/Bougainville\tPacific/Chatham\tPacific/Chuuk\tPacific/Easter\tPacific/Efate\tPacific/Fakaofo\tPacific/Fiji\tPacific/Funafuti\tPacific/Galapagos\tPacific/Gambier\tPacific/Guadalcanal\tPacific/Guam\tPacific/Honolulu\tPacific/Kanton\tPacific/Kiritimati\tPacific/Kosrae\tPacific/Kwajalein\tPacific/Majuro\tPacific/Marquesas\tPacific/Midway\tPacific/Nauru\tPacific/Niue\tPacific/Norfolk\tPacific/Noumea\tPacific/Pago_Pago\tPacific/Palau\tPacific/Pitcairn\tPacific/Pohnpei\tPacific/Port_Moresby\tPacific/Rarotonga\tPacific/Saipan\tPacific/Tahiti\tPacific/Tarawa\tPacific/Tongatapu\tPacific/Wake\tPacific/Wallis\tUTC";
    var timezoneArray = timezone.split("\t");
    this.timeZones = timezoneArray.filter((e) => e);
    this.timeZones = this.timeZones.map((e) => {
      return {
        value: e,
        label: e,
      };
    });
  },
};
</script>

<style lang="scss" scoped></style>
