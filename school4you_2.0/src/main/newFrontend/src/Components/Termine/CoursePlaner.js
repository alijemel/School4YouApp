import React, { Component } from 'react';
import moment from 'moment'
import PlanerControl from './PlanerControl';
import PlanerControl2 from './PlanerControl_v2';
import PlanerControl3 from './PlanerControl_v3'


class CoursePlaner extends Component {

    
        timeTable=()=> {
            this.props.history.push(`/timetable/${this.props.match.params.classId}`)
        }
    

    

    

    render() {

       
        let weekDays = ['Mo', 'Di', 'Mi','Do','Fr','Sa','So' ]

    //    let today= moment(new Date()).format('YYYY-MM-DD')
    let dayTest = new Date()
    dayTest.setDate(dayTest.getDate() + 0)
    let todayNumberTest = dayTest.getDay()

       let todayNumber = (new Date()).getDay()

       let myWeek = []
       
       

       //MODULO 6 TO ALWAYS IGNOIRE SONNTAG 
       for( var i = 0 ; i < 6; i++) {
           myWeek[i] = weekDays[(todayNumberTest-1)%6]
           todayNumberTest ++
       }

       console.log(myWeek)

       let date = moment(new Date()).add(0,'days')

       
       
       let firstDate = {
          dayName : myWeek[0],
          date : date.format('YYYY-MM-DD')
       }
       if(myWeek[0] === 'Sa') {
           date = date.add(2, 'days')
       } else {
           date = date.add(1, 'days')
       }
       let secondDate = {
        dayName : myWeek[1],
        date : date.format('YYYY-MM-DD')
     }
     if(myWeek[1] === 'Sa') {
        date = date.add(2, 'days')
    } else {
        date = date.add(1, 'days')
    }
       let thirdDate = {
        dayName : myWeek[2],
        date : date.format('YYYY-MM-DD')
     }
     if(myWeek[2] === 'Sa') {
        date = date.add(2, 'days')
    } else {
        date = date.add(1, 'days')
    }
       let fourthDate = {
        dayName : myWeek[3],
        date : date.format('YYYY-MM-DD')
     }
     if(myWeek[3] === 'Sa') {
        date = date.add(2, 'days')
    } else {
        date = date.add(1, 'days')
    }
       let fithDate = {
        dayName : myWeek[4],
        date : date.format('YYYY-MM-DD')
     }
     if(myWeek[4] === 'Sa') {
        date = date.add(2, 'days')
    } else {
        date = date.add(1, 'days')
    }
       let sixthDate = {
        dayName : myWeek[5],
        date : date.format('YYYY-MM-DD')
     }
     if(myWeek[5] === 'Sa') {
        date = date.add(2, 'days')
    } else {
        date = date.add(1, 'days')
    }
       let seventhDate = {
        dayName : myWeek[6],
        date : date.format('YYYY-MM-DD')
     }
     
     
       let myDates = []; myDates.push(firstDate);  myDates.push(secondDate);  myDates.push(thirdDate);  myDates.push(fourthDate);  myDates.push(fithDate);  myDates.push(sixthDate);
        //  myDates.push(seventhDate);
console.log(myDates)


let slots = ['08:00 _ 10:00' , '10:00 _ 12:00', '12:00 _ 14:00','14:00 _ 16:00']

let myTimeTable = 
<div>
    <table class="table table-bordered table-striped">
        <thead className="thead-dark">

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
        <tbody className="alert alert-dark">

            {
                myDates.map((date,j) => {
                    return (
                        <tr>
                             <th classname="text-monospace" scope="row">{date.dayName}.{date.date}</th>
                             {
                                 
                                 
                                 slots.map((slot, index) => {
                                     
                                    //  console.log(j)
                                    //  console.log(index)
                                     return (
                                    //  <th scope="row">{date.dayName}{date.date}{slot}</th>
                                    //  <th scope="row">
                                    
                                         <PlanerControl3
                                         
                                         
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

                <h3 className="text-monospace m-3">Course Planer Klasse {this.props.match.params.classId} </h3>

                <button onClick={this.timeTable} className="mt-5 mb-5 btn btn-block btn-sm btn-warning">Wochenplan Übersicht anzeigen</button>

                {myTimeTable}
                

                
                
            </div>
        )
    }
}

export default CoursePlaner