import React, { Component } from 'react';
import moment from 'moment'
import PlanerControl from './PlanerControl';
import PlanerControl2 from './PlanerControl_v2';
import PlanerControl3 from './PlanerControl_v3'


class CourseTeacherPlaner extends Component {

    

    render() {

        let weekDays = ['Mo', 'Di', 'Mi','Do','Fr','Sa','So' ]

       let today= moment(new Date()).format('YYYY-MM-DD')
       let todayNumber = (new Date()).getDay()

       let myWeek = []
       
       

       //MODULO 6 TO ALWAYS IGNOIRE SONNTAG 
       for( var i = 0 ; i < 7; i++) {
           myWeek[i] = weekDays[(todayNumber-1)%6]
           todayNumber ++
       }
       
       let firstDate = {
          dayName : myWeek[0],
          date : moment(new Date()).format('YYYY-MM-DD')
       }
       let secondDate = {
        dayName : myWeek[1],
        date : moment(new Date()).add(1, 'days').format('YYYY-MM-DD')
     }
       let thirdDate = {
        dayName : myWeek[2],
        date : moment(new Date()).add(2, 'days').format('YYYY-MM-DD')
     }
       let fourthDate = {
        dayName : myWeek[3],
        date : moment(new Date()).add(3, 'days').format('YYYY-MM-DD')
     }
       let fithDate = {
        dayName : myWeek[4],
        date : moment(new Date()).add(4, 'days').format('YYYY-MM-DD')
     }
       let sixthDate = {
        dayName : myWeek[5],
        date : moment(new Date()).add(5, 'days').format('YYYY-MM-DD')
     }
       let seventhDate = {
        dayName : myWeek[6],
        date : moment(new Date()).add(6, 'days').format('YYYY-MM-DD')
     }
     
       let myDates = []; myDates.push(firstDate);  myDates.push(secondDate);  myDates.push(thirdDate);  myDates.push(fourthDate);  myDates.push(fithDate);  myDates.push(sixthDate);  myDates.push(seventhDate);
console.log(myDates)


let slots = ['08:00 _ 10:00' , '10:00 _ 12:00', '12:00 _ 14:00','14:00 _ 16:00']

let myTimeTable = 
<div>
    <table class="table table-bordered table-striped">
        <thead className="thead-light">

            <tr>
                <th>:)</th>
                {
                    slots.map((slot,index) => {
                        return (
                        <th>{slot}</th>
                        )
                    })
                }
                
             </tr>

        </thead>
        <tbody>

            {
                myDates.map((date,j) => {
                    return (
                        <tr>
                             <th scope="row">{date.dayName}.{date.date}</th>
                             {
                                 
                                 
                                 slots.map((slot, index) => {
                                     
                                    //  console.log(j)
                                    //  console.log(index)
                                     return (
                                    //  <th scope="row">{date.dayName}{date.date}{slot}</th>
                                    //  <th scope="row">
                                    
                                         <PlanerControl2
                                         
                                        classId={this.props.match.params.classId}
                                        teacherId={this.props.match.params.teacherId}
                                        unavailable={[]}
                                        date={date.date} dayName={date.dayName}
                                        slot={slot}
                                         />
                                    //  </th>
                                     )
                                 })
                             }
                             
            

                             
                        </tr>
                    )
                })

            }
        </tbody>
    </table>

</div>







        return (
            <div>


                course planer...classe 
                {this.props.match.params.classId}... teacher
                {this.props.match.params.teacherId}...
                {today}
                {todayNumber}
                {myTimeTable}
                

                
                
            </div>
        )
    }
}

export default CourseTeacherPlaner