import {
    PieChart,
    Pie,
    Tooltip,
    Cell,
    ResponsiveContainer,
    Legend
} from "recharts";

const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AA336A",
    "#6A5ACD"
];

function PieChartComponent({ data, nameKey, valueKey }) {

    return (

        <ResponsiveContainer width="100%" height={400}>

            <PieChart>

                <Pie
                    data={data}
                    dataKey={valueKey}
                    nameKey={nameKey}
                    outerRadius={140}
                    label
                >

                    {

                        data.map((entry, index) => (

                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                            />

                        ))

                    }

                </Pie>

                <Tooltip />

                <Legend />

            </PieChart>

        </ResponsiveContainer>

    );

}

export default PieChartComponent;