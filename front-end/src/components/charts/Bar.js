import React from "react";
import ChartComponent, { Chart } from "react-chartjs-2";

import { barChartOptions } from "./config";

export default class Bar extends React.Component {
  componentWillMount() {
    if (this.props.shadow) {
      Chart.defaults.barWithShadow = Chart.defaults.bar;
      Chart.controllers.barWithShadow = Chart.controllers.bar.extend({
        draw: function(ease) {
          Chart.controllers.bar.prototype.draw.call(this, ease);
          var ctx = this.chart.ctx;
          ctx.save();
          ctx.shadowColor = "rgba(0,0,0,0.2)";
          ctx.shadowBlur = 7;
          ctx.shadowOffsetX = 5;
          ctx.shadowOffsetY = 7;
          ctx.responsive = true;
          Chart.controllers.bar.prototype.draw.apply(this, arguments);
          ctx.restore();
        }
      });
      Chart.defaults.horizontalBarWithShadow = Chart.defaults.horizontalBar;
      Chart.controllers.horizontalBarWithShadow = Chart.controllers.horizontalBar.extend(
        {
          draw: function(ease) {
            Chart.controllers.horizontalBar.prototype.draw.call(this, ease);
            var ctx = this.chart.ctx;
            ctx.save();
            ctx.shadowColor = "rgba(0,0,0,0.15)";
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 10;
            ctx.responsive = true;
            Chart.controllers.horizontalBar.prototype.draw.apply(
              this,
              arguments
            );
            ctx.restore();
          }
        }
      );
    }
  }

  render() {
    const { data, shadow, horizontal } = this.props;
    return (
      <ChartComponent
        ref={ref => (this.chart_instance = ref && ref.chart_instance)}
        type={`${horizontal ? "horizontalBar" : "bar"}${
          shadow ? "WithShadow" : ""
        }`}
        options={{
          ...barChartOptions
        }}
        data={data}
      />
    );
  }
}
