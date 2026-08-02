import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,             
  Legend
} from "recharts";

function LineChartComponent({ data, xKey, yKey }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        
        {/* التعديل هنا: إضافة type="category" أو allowDuplicatedCategory={false} */}
        <XAxis 
          dataKey={xKey} 
          interval="preserveStartEnd" // بيمنع تداخل السنوات وبيظهر البداية والنهاية
        />
        
        <YAxis />
        <Tooltip />
        <Legend />
        
        <Line
          type="monotone"
          dataKey={yKey}
          stroke="#0d6efd"
          strokeWidth={3}
          connectNulls={true} // عشان يوصل النقاط حتى لو في سنوات مفقودة
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineChartComponent; 