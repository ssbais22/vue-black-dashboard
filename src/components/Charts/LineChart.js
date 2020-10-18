import { Line, mixins } from 'vue-chartjs';
export default {
  name: 'line-chart',
  extends: Line,
  mixins: [mixins.reactiveProp],
  options: {
    scales: {
    yAxes: [{
       gridLines: {
         drawBorder: false,
         color: 'rgba(29,140,248,0.0)',
         zeroLineColor: "transparent",
       },
       ticks: {
         suggestedMin: 0,
         suggestedMax: 160,
         maintainAspectRatio: false,
         fontColor: "#9a9a9a"
       }
     }],
 
     xAxes: [{      
       gridLines: {
         drawBorder: false,
         color: 'rgba(225,78,202,0.1)',
         zeroLineColor: "transparent",
       },
       ticks: {
         padding: 20,
         fontColor: "#9a9a9a"
       }
     }]
   }
  },
  props: {
    extraOptions: Object,
    gradientColors: {
      type: Array,
      default: () => ['rgba(72,72,176,0.2)', 'rgba(72,72,176,0.0)', 'rgba(119,52,169,0)'],
      validator: val => {
        return val.length > 2;
      }
    },
    gradientStops: {
      type: Array,
   
      validator: val => {
        return val.length > 2;
      }
    }
  },

  data() {
    return {
      ctx: null
    };
  },
  methods: {
    updateGradients(chartData) {
      if(!chartData) return;
      const ctx = this.ctx || document.getElementById(this.chartId).getContext('2d');
      const gradientStroke = ctx.createLinearGradient(0, 800, 0, 10);
      var options = {
        scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero:true
                      },
                      scaleLabel: {
                           display: true,
                           labelString: 'Amount',
                           fontSize: 20 
                        }
                  }]            
              }  
      };

      var myBarChart = new Chart(ctx, {
        type: 'line',     
        options: options
      });

    
    }
  },
  mounted() {
    this.$watch('chartData', (newVal, oldVal) => {
     // this.updateGradients(this.chartData);
      if (!oldVal) {
        this.renderChart(
          this.chartData,
          this.extraOptions
        );
      }
    }, { immediate: true });
  }
};
