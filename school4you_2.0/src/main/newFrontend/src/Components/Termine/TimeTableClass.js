import React, { Component } from 'react';
import moment from 'moment'
import TimeTableField from './TimeTableField';
import TimeTableFieldTeacher from './TimeTableFieldTeacher';
import SickNotesNotifications from '../UserBuilder/SickNotesNotifications';

class TimeTableClass extends Component {

    state={
        week : 0
    }

    
    
   addDays = (days) =>{
        var date = new Date();
        date.setDate(date.getDate() + days);
        return date;
    }

    nextWeek =()=> {
        this.setState({week : this.state.week+1})
    }
    prevWeek =()=> {
        this.setState({week : this.state.week-1})
    }

    render() {

        let today = new Date().toISOString().slice(0, 10)
        
    



        let curr = this.addDays(7 * this.state.week)
let week = []

for (let i = 1; i <= 6; i++) {
  let first = curr.getDate() - curr.getDay() + i 
  let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
  week.push(day)
}

let weekDays = ['Mo', 'Di', 'Mi','Do','Fr','Sa','So' ]
let slots =['08:00 _ 10:00' , '10:00 _ 12:00', '12:00 _ 14:00','14:00 _ 16:00']

let myDates =[]

let firstDate = {
    dayName : weekDays[0],
    date : week[0]
 }
 let secondDate = {
  dayName : weekDays[1],
  date : week[1]
}
 let thirdDate = {
  dayName : weekDays[2],
  date : week[2]
}
 let fourthDate = {
  dayName : weekDays[3],
  date : week[3]
}
 let fithDate = {
  dayName : weekDays[4],
  date : week[4]
}
 let sixthDate = {
  dayName : weekDays[5],
  date : week[5]
}
myDates.push(firstDate);  myDates.push(secondDate);  myDates.push(thirdDate);  myDates.push(fourthDate);  myDates.push(fithDate);  myDates.push(sixthDate);  
console.log(myDates)

let timetable = 
<div >

    <button onClick={this.prevWeek} type="button" class="btn btn-info m-3 btn-sm"> prev</button>
    <button onClick={this.nextWeek} type="button" class="btn btn-info btn-sm"> next</button>

    <table className="table table-bordered table-striped">
        <thead className="thead-light">
            <tr>
                <th>Planer</th>
                {
                    slots.map((slot, index) => {
                        return (
                        <th key={index}>{slot}</th>
                        )
                    })
                }
            </tr>
        </thead>

        <tbody>
             {
                 myDates.map((date,j) => {
                     return( 
                         <tr key={j}>

                     <th scope="row">{date.dayName} {date.date}</th>

                     {
                         slots.map((slot, index) => {

                            if(!this.props.isTeacher) {
                                return (

                                

                                    <TimeTableField key={index}
                                    week={this.state.week}
                                    classId={this.props.match.params.classId}
                                    studentId={this.props.match.params.studentId}
                                    teacherId={this.props.match.params.teacherId}
                                    date={date.date} 
                                    slot={slot}
                                    />
   
                
                                )

                            } else {
                                return (
                                    <TimeTableFieldTeacher
                                    key={index}
                                    week={this.state.week}
                                    teacherId={this.props.match.params.teacherId}
                                    date={date.date} 
                                    today={today}
                                    slot={slot}

                                    />
                                )
                            }

                             
                             
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
                <h3>Timetable {this.props.match.params.classId}</h3>
        {this.state.week > 1 && <h4>Woche + {this.state.week}</h4>}
        {this.state.week === 1 && <h4>Nächste Woche </h4>}

        {this.state.week < -1 && <h4>Woche {this.state.week}</h4>}
        {this.state.week === -1 && <h4>Letzte Woche</h4>}
        {this.state.week === 0 && <h4>Aktuelle Woche</h4>}
        

                {timetable}

                <SickNotesNotifications 
                classId={this.props.match.params.classId}
                role ={sessionStorage.getItem('role').toLocaleUpperCase()}/>



                
                
            </div>
        )
    }
}

export default TimeTableClass