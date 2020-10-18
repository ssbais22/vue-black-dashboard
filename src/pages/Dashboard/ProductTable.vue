<template>
  <div>
    <div style="float: right">
      <select name="months" id="months" @change="onMonthChange($event)">
        <option :value="option" :key="option" v-for="option in monthsFilter">
          {{ option }}
        </option>
      </select>
    </div>
    <div class="row">
      <h4 slot="header" style="min-width: 400px; width: 92%" class="card-title">
        {{ $t("dashboard.simpleTable") }}
      </h4>
    </div>
    <table class="table tablesorter" :class="tableClass">
      <thead :class="theadClasses">
        <tr>
          <slot name="columns">
            <th v-for="column in columns" :key="column">{{ column }}</th>
          </slot>
        </tr>
      </thead>
      <tbody :class="tbodyClasses">
        <tr v-for="(item, index) in data" :key="index">
          <slot :row="item">
            <td
              v-for="(column, index) in columns"
              :key="index"
             
            >
              {{item[column] }}
            </td>
          </slot>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { BaseTable } from "@/components";
import axios from "axios";
export default {
  name: "product-table",
  extends: BaseTable,
  components: {
    BaseTable,
  },
  data() {
    return {
      monthsFilter: [],
      allData: [],
    };
  },
  computed: {},
  methods: {
    onMonthChange(event) {
      let month = event.target.value;
      this.data = this.allData[month];
    },
    initTable() {
      let me = this;
      axios
        .get("http://localhost:5001/monthlydata")
        .then(function (response) {
          // handle success
          me.data = response.data.data.allData[response.data.data.months[0]];
          me.allData = response.data.data.allData;
          for (var i = 0; i < response.data.data.months.length; i++) {
            me.monthsFilter.push(response.data.data.months[i]);
          }
          for (var i = 0; i < response.data.data.dms.length; i++) {
            me.columns.push(response.data.data.dms[i]);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
  },
  mounted() {
    this.initTable();
  },
  beforeDestroy() {},
};
</script>
<style>
</style>
