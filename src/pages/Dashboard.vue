<template>
  <div>
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
                <h5 class="card-category">{{$t('dashboard.totalShipments')}}</h5>
                <h2 class="card-title">{{$t('dashboard.performance')}}</h2>
              </div>
              <div class="col-sm-6">
                <div class="btn-group btn-group-toggle"
                     :class="isRTL ? 'float-left' : 'float-right'"
                     data-toggle="buttons">
                    <select name="products" id="products"  @change="onProductChange($event)"> 
                     <option :value="option"   :key="option"  v-for="(option) in bigLineChart.products " >  {{option}}</option>
                    </select>
                </div>
              </div>              
            </div>
          </template>
          <div class="chart-area">
            <line-chart style="height:400px"
                        ref="bigChart"
                        chart-id="big-line-chart"
                        :chart-data="bigLineChart.chartData"
                        :gradient-colors="bigLineChart.gradientColors"
                        :options="bigLineChart.options"
                        :gradient-stops="bigLineChart.gradientStops"
                        :extra-options="bigLineChart.extraOptions">
            </line-chart>
          </div>          
        </card>     
      </div>
      <div class="col-12">        
        <card class="card" :header-classes="{'text-right': isRTL}">
          <div class="table-responsive">               
            <product-table></product-table>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{$t('dashboard.totalShipments')}}</h5>
            <h3 class="card-title"><i class="tim-icons icon-bell-55 text-primary "></i> 763,215</h3>
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%"
                        chart-id="purple-line-chart"
                        :chart-data="purpleLineChart.chartData"
                        :gradient-colors="purpleLineChart.gradientColors"
                        :gradient-stops="purpleLineChart.gradientStops"
                        :extra-options="purpleLineChart.extraOptions">
            </line-chart>
          </div>
        </card>
      </div>
      <div class="col-lg-4" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{$t('dashboard.dailySales')}}</h5>
            <h3 class="card-title"><i class="tim-icons icon-delivery-fast text-info "></i> 3,500€</h3>
          </template>
          <div class="chart-area">
            <bar-chart style="height: 100%"
                       chart-id="blue-bar-chart"
                       :chart-data="blueBarChart.chartData"
                       :gradient-stops="blueBarChart.gradientStops"
                       :extra-options="blueBarChart.extraOptions">
            </bar-chart>
          </div>
        </card>
      </div>
      <div class="col-lg-4" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{$t('dashboard.completedTasks')}}</h5>
            <h3 class="card-title"><i class="tim-icons icon-send text-success "></i> 12,100K</h3>
          </template>
          <div class="chart-area">
             <div style="height: 40%">
            <line-chart  chart-id="green-line-chart"
                        :chart-data="greenLineChart.chartData"
                        :gradient-stops="greenLineChart.gradientStops"
                        :extra-options="greenLineChart.extraOptions">
            </line-chart>
              </div>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-md-12">
        <card type="tasks" :header-classes="{'text-right': isRTL}">
          <template slot="header">
            <h6 class="title d-inline">{{$t('dashboard.tasks', {count: 5})}}</h6>
            <p class="card-category d-inline">{{$t('dashboard.today')}}</p>
            <base-dropdown menu-on-right=""
                           tag="div"
                           title-classes="btn btn-link btn-icon"
                           aria-label="Settings menu"
                           :class="{'float-left': isRTL}">
              <i slot="title" class="tim-icons icon-settings-gear-63"></i>
              <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.action')}}</a>
              <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.anotherAction')}}</a>
              <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.somethingElse')}}</a>
            </base-dropdown>
          </template>
          <div class="table-full-width table-responsive">
            <task-list></task-list>
          </div>
        </card>
      </div>
      <div class="col-lg-6 col-md-12">
        <card class="card" :header-classes="{'text-right': isRTL}">
          <h4 slot="header" class="card-title">{{$t('dashboard.simpleTable')}}</h4>
          <div class="table-responsive">
            <user-table></user-table>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';
  import * as chartConfigs from '@/components/Charts/config';
  import TaskList from './Dashboard/TaskList';
  import UserTable from './Dashboard/UserTable';
  import ProductTable from './Dashboard/ProductTable';
  import config from '@/config';
  import axios from  'axios';
  export default {
    components: {
      LineChart,
      BarChart,
      TaskList,
      UserTable,
      ProductTable
    },
    data() {
      return {
        bigLineChart: {
          products:[],
          allData: [],
          activeIndex: 0,
          chartData: {
            datasets: [],
            labels: [],
          },
          extraOptions: chartConfigs.purpleChartOptions,
          gradientColors: config.colors.primaryGradient,
          categories: []
        },
        purpleLineChart: {
          extraOptions: chartConfigs.purpleChartOptions,
          chartData: {
            labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
            datasets: [{
              label: "Data",
              fill: true,
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [80, 100, 70, 80, 120, 80],
            }]
          },
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.2, 0],
        },
        greenLineChart: {
          extraOptions: chartConfigs.greenChartOptions,
          chartData: {
            labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV'],
            datasets: [{
              label: "My First dataset",
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.danger,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [90, 27, 60, 12, 80],
            }]
          },
          gradientColors: ['rgba(66,134,121,0.15)', 'rgba(66,134,121,0.0)', 'rgba(66,134,121,0)'],
          gradientStops: [1, 0.4, 0],
        },
        blueBarChart: {
          extraOptions: chartConfigs.barChartOptions,
          chartData: {
            labels: ['USA', 'GER', 'AUS', 'UK', 'RO', 'BR'],
            datasets: [{
              label: "Countries",
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [53, 20, 10, 80, 100, 45],
            }]
          },
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.4, 0],
        }
      }
    },
    computed: {
      enableRTL() {
        return this.$route.query.enableRTL;
      },
      isRTL() {
        return this.$rtl.isRTL;
      },
      bigLineChartCategories() {
        return this.$t('dashboard.chartCategories');
      }
    },
    methods: {
      onProductChange(event){
        let chartData ;
         var months = [];
        let allDataSets = [];
        let colors = ['red',config.colors.primary,'blue','white','grey'];
        let ref = this.$refs.bigChart;
        let allMonths = [];
        let chart = this.bigLineChart;   
        let product = event.target.value;
        let recordCount = 0;

          for(var i = 0;i<chart.allData.data.dms.length;i++){
            var color = colors[recordCount];
            allDataSets.push({
              borderColor: color,
              label: chart.allData.data.dms[i],
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: color,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: color,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: chart.allData.data.allData[event.target.value][chart.allData.data.dms[i]]
            });
            recordCount++;
          }
          for(var i = 0;i<chart.allData.data.months.length;i++){
              allMonths.push(chart.allData.data.months[i]);
          }
          chartData = { datasets: allDataSets, labels: allMonths };                   
          ref.updateGradients(chartData);
          chart.chartData = chartData;
          chart.chartData.datasets = allDataSets;
          chart.chartData.labels = allMonths;
                          
            
      },
      initBigChart(index) {
        let chartData ;
        let allDataSets = [];
        let colors = ['red',config.colors.primary,'blue','white','grey'];
        let ref = this.$refs.bigChart;
        let allMonths = [];
        let chart = this.bigLineChart;   
        let product = this.bigLineChartCategories[index];
        let recordCount = 0;

          axios.get('http://localhost:5001/monthsdata')
                .then(function (response) {
                    // handle success
                    chart.allData = response.data;
                    chart.products = response.data.data.products;
                   for(var i = 0;i<response.data.data.dms.length;i++){
                      var color = colors[recordCount];
                      allDataSets.push({
                        borderColor: color,
                        label: response.data.data.dms[i],
                        borderWidth: 2,
                        borderDash: [],
                        borderDashOffset: 0.0,
                        pointBackgroundColor: color,
                        pointBorderColor: 'rgba(255,255,255,0)',
                        pointHoverBackgroundColor: color,
                        pointBorderWidth: 20,
                        pointHoverRadius: 4,
                        pointHoverBorderWidth: 15,
                        pointRadius: 4,
                        data: response.data.data.allData[product][response.data.data.dms[i]]
                      });
                      recordCount++;
                    }
                    for(var i = 0;i<response.data.data.months.length;i++){
                        allMonths.push(response.data.data.months[i]);
                    }
                   chartData = { datasets: allDataSets, labels: allMonths };                   
                   ref.updateGradients(chartData);
                   chart.chartData = chartData;
                   chart.chartData.datasets = allDataSets;
                   chart.chartData.labels = allMonths;
                   chart.activeIndex = index;
                  
                }).catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
              }
            },
    mounted() {
      this.i18n = this.$i18n;
      if (this.enableRTL) {
        this.i18n.locale = 'ar';
        this.$rtl.enableRTL();
      }
      this.initBigChart(0);
    },
    beforeDestroy() {
      if (this.$rtl.isRTL) {
        this.i18n.locale = 'en';
        this.$rtl.disableRTL();
      }
    }
  };
</script>
<style>
</style>
