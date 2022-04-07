import React from 'react'
import { Chart as ChartJS} from 'react-chartjs-2'
import { Bar } from 'react-chartjs-2'
const BarChart = () => {
   return(
       <>
        <Bar 
            data={{
                labels:['Red','Blue','Yellow','Green','Purple','Orange']
            }}
            height={400}
            width={600}
            options={{maintainAspectRatio:false}}
        />
       </>
   )
}

export default BarChart 